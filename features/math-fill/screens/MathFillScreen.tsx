import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MATH_FILL_MOCKS } from '../mock/math-fill.mock';
import { MathFillCanvas } from '../components/MathFillCanvas';
import VirtualKeyboard from '../components/VirtualKeyboard';
import { ShapeElement } from '../types/math-fill.types';
import OptionsPicker from '../components/OptionsPicker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MathFillScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<number, Record<number, string>>>({});
  const [activeInputId, setActiveInputId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const currentQuestion = MATH_FILL_MOCKS[currentIndex];
  const userInputs = allAnswers[currentQuestion.id] || {};

  const handleKeyPress = (key: string) => {
    if (activeInputId === null) return;
    setAllAnswers(prev => {
      const qAnswers = prev[currentQuestion.id] || {};
      const currentVal = qAnswers[activeInputId] || '';
      let newVal = currentVal + key;
      const maxLength = currentQuestion.inputLength || 2;
      if (newVal.length > maxLength) {
        newVal = newVal.slice(1);
      }
      return { 
        ...prev, 
        [currentQuestion.id]: { ...qAnswers, [activeInputId]: newVal } 
      };
    });
  };

  const handleDelete = () => {
    if (activeInputId === null) return;
    setAllAnswers(prev => {
      const qAnswers = prev[currentQuestion.id] || {};
      const currentVal = qAnswers[activeInputId] || '';
      return { 
        ...prev, 
        [currentQuestion.id]: { ...qAnswers, [activeInputId]: currentVal.slice(0, -1) } 
      };
    });
  };

  const handleCheck = () => {
    setActiveInputId(null);
    let isCorrect = true;

    for (const el of currentQuestion.elements) {
      if (el.type === 'shape') {
        const shape = el as ShapeElement;
        if (shape.isInput && shape.value && shape.value.trim() !== '') {
          const userVal = userInputs[shape.id] || '';
          if (userVal !== shape.value) {
            isCorrect = false;
            break;
          }
        }
      }
    }

    if (!isCorrect) {
      Alert.alert('Chưa đúng', 'Hãy thử lại nhé!');
      return;
    }

    for (const rule of currentQuestion.validations) {
      if (rule.formula) {
        try {
          let evalStr = rule.formula;
          const matches = evalStr.match(/#(\d+)/g) || [];
          
          for (const match of matches) {
            const id = parseInt(match.substring(1));
            const val = userInputs[id] || '';
            evalStr = evalStr.replace(match, `Number("${val}")`);
          }

          const result = new Function(`return ${evalStr}`)();
          if (!result) {
            isCorrect = false;
            break;
          }
        } catch (e) {
          console.error('Validation error:', e);
          isCorrect = false;
          break;
        }
      }
    }

    if (isCorrect) {
      Alert.alert('Tuyệt vời!', 'Bạn đã trả lời đúng.');
    } else {
      Alert.alert('Chưa đúng', 'Hãy thử lại nhé!');
    }
  };

  const handleNext = () => {
    if (currentIndex < MATH_FILL_MOCKS.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const onScrollEnd = useCallback((e: any) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setActiveInputId(null);
    }
  }, [currentIndex]);

  const renderQuestionItem = ({ item, index }: { item: typeof MATH_FILL_MOCKS[0], index: number }) => {
    const qInputs = allAnswers[item.id] || {};
    return (
      <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
        <MathFillCanvas 
          question={item}
          userInputs={qInputs}
          activeInputId={index === currentIndex ? activeInputId : null}
          onSelectInput={(id) => setActiveInputId(id)}
        />
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.content}>{currentQuestion.content}</Text>
      </View>
      
      <View style={styles.body}>
        <FlatList
          ref={flatListRef}
          data={MATH_FILL_MOCKS}
          renderItem={renderQuestionItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          keyExtractor={(item) => item.id.toString()}
          scrollEventThrottle={16}
          // Tối ưu hóa: render trước các câu lân cận để tránh lag
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={3}
          removeClippedSubviews={false} // Quan trọng để giữ Canvas không bị unmount quá sớm
        />
        
        {activeInputId !== null && (() => {
          const activeEl = currentQuestion.elements.find(el => el.id === activeInputId) as ShapeElement;
          
          if (activeEl?.valueOptions) {
            try {
              const options = JSON.parse(activeEl.valueOptions);
              if (Array.isArray(options)) {
                return (
                  <OptionsPicker 
                    options={options}
                    position={activeEl.position}
                    shapeWidth={activeEl.width || activeEl.size || 100}
                    shapeHeight={activeEl.height || activeEl.size || 100}
                    textSize={activeEl.textSize || 40}
                    onSelect={(val) => {
                      setAllAnswers(prev => ({
                        ...prev,
                        [currentQuestion.id]: { ...(prev[currentQuestion.id] || {}), [activeInputId]: val }
                      }));
                      setActiveInputId(null);
                    }}
                  />
                );
              }
            } catch (e) {
              console.error('Lỗi parse valueOptions:', e);
            }
          }
          return null;
        })()}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.btn, currentIndex === 0 && styles.disabledBtn]} 
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Text style={styles.btnText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.checkBtn]} onPress={handleCheck}>
          <Text style={styles.checkBtnText}>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, currentIndex === MATH_FILL_MOCKS.length - 1 && styles.disabledBtn]} 
          onPress={handleNext}
          disabled={currentIndex === MATH_FILL_MOCKS.length - 1}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>

      {activeInputId !== null && !((currentQuestion.elements.find(el => el.id === activeInputId) as any)?.valueOptions) && (
        <VirtualKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete} />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 80,
    justifyContent: 'center',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
  },
  checkBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default MathFillScreen;
