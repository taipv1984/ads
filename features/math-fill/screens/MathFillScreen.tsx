import BottomNavigation from '@/app/components/common/BottomNavigation';
import OptionPicker from '@/app/components/common/OptionPicker';
import VirtualKeyboard from '@/app/components/common/VirtualKeyboard';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Image as RNImage, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MATH_FILL_MOCKS } from '../../../services/mocks/math-fill.mock';
import { ShapeElement } from '../../../services/types/math-fill.types';
import { MathFillCanvas } from '../components/MathFillCanvas';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Component hiển thị ảnh tự động điều chỉnh chiều cao theo tỷ lệ
const AutoHeightImage = ({ uri }: { uri: string }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  React.useEffect(() => {
    if (uri) {
      RNImage.getSize(uri, (width, height) => {
        setAspectRatio(width / height);
      }, (error) => {
        console.error('Không lấy được kích thước ảnh:', error);
      });
    }
  }, [uri]);

  return (
    <RNImage
      source={{ uri }}
      style={{ width: '100%', aspectRatio }}
      resizeMode="contain"
    />
  );
};

const MathFillScreen: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<number, Record<number, string>>>({});
  const [activeInputId, setActiveInputId] = useState<number | null>(null);
  const [pickerPosition, setPickerPosition] = useState<{ x: number, y: number } | null>(null);
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
      setPickerPosition(null);
    }
  }, [currentIndex]);

  // Hàm tính toán layout động cho Canvas dựa trên các phần tử
  const getCanvasLayout = useCallback((elements: any[]) => {
    let minY = Infinity;
    let maxY = -Infinity;

    elements.forEach(el => {
      let elementTop: number | undefined = undefined;
      let elementBottom: number | undefined = undefined;
      if (el.type === 'shape') {
        const h = el.height || el.size || 100;
        elementTop = el.position.y - h / 2;
        elementBottom = el.position.y + h / 2;
      } else if (el.type === 'text') {
        const h = el.fontSize || 40;
        elementTop = el.position.y - h / 2;
        elementBottom = el.position.y + h / 2;
      } else if (el.type === 'image') {
        elementTop = el.position.y - el.height / 2;
        elementBottom = el.position.y + el.height / 2;
      } else if (el.type === 'line') {
        const sw = el.strokeWidth || 5;
        // Thêm khoảng đệm cho mũi tên nếu có
        const arrowBuffer = el.lineType === 'arrow' ? 40 : 0;
        elementTop = Math.min(el.start.y, el.end.y) - sw - arrowBuffer;
        elementBottom = Math.max(el.start.y, el.end.y) + sw + arrowBuffer;

        if (el.controlPoints) {
          el.controlPoints.forEach((p: any) => {
            elementTop = Math.min(elementTop as number, p.y - sw);
            elementBottom = Math.max(elementBottom as number, p.y + sw);
          });
        }
      }
      if (elementTop !== undefined) minY = Math.min(minY, elementTop);
      if (elementBottom !== undefined) maxY = Math.max(maxY, elementBottom);
    });

    if (minY === Infinity) return { height: 300, offsetY: 0 };

    const SCALE = SCREEN_WIDTH / 1080;
    // Chiều cao nội dung thực tế (không cần buffer lớn)
    const contentHeight = (maxY - minY) * SCALE + SPACING.lg;
    const padding = SPACING.md;

    return {
      height: contentHeight + padding * 2,
      offsetY: padding - minY * SCALE
    };
  }, []);

  const renderQuestionItem = ({ item, index }: { item: typeof MATH_FILL_MOCKS[0], index: number }) => {
    const qInputs = allAnswers[item.id] || {};
    const { height: canvasHeight, offsetY } = getCanvasLayout(item.elements);

    return (
      <ScrollView
        style={{ width: SCREEN_WIDTH }}
        contentContainerStyle={{ paddingBottom: SPACING.lg }}
      >
        {/* Câu hỏi header */}
        <Text style={styles.questionTitle}>
          Câu {index + 1}: <Text style={styles.questionContentText}>{item.content}</Text>
        </Text>

        {item.imagePath && (
          <View style={styles.imageWrapper}>
            <AutoHeightImage uri={item.imagePath} />
          </View>
        )}

        {item.extraData && (
          <View style={styles.extraDataContainer}>
            {item.extraData.split('<br/>').map((line, i) => (
              <Text key={i} style={styles.extraDataText}>{line.trim()}</Text>
            ))}
          </View>
        )}

        {/* Canvas với viền đen */}
        <View style={[styles.canvasContainer, { height: canvasHeight }]}>
          <MathFillCanvas
            question={item}
            userInputs={qInputs}
            activeInputId={index === currentIndex ? activeInputId : null}
            onSelectInput={(id, absPos) => {
              setActiveInputId(id);
              if (absPos) setPickerPosition(absPos);
            }}
            offsetY={offsetY}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.root} edges={['top']}>
        {/* Header chuẩn với nút Check bên phải */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLOR.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Math Fill</Text>
          </View>

          <TouchableOpacity style={styles.headerCheckButton} onPress={handleCheck}>
            <Text style={styles.headerCheckText}>Check</Text>
          </TouchableOpacity>
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
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={3}
            removeClippedSubviews={false}
            getItemLayout={(data, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
          />


        </View>

        <BottomNavigation
          currentIndex={currentIndex}
          total={MATH_FILL_MOCKS.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        {activeInputId !== null && !((currentQuestion.elements.find(el => el.id === activeInputId) as any)?.valueOptions) && (
          <VirtualKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete} />
        )}
      </SafeAreaView>

      {/* OptionsPicker được đưa ra root để dùng tọa độ tuyệt đối */}
      {activeInputId !== null && pickerPosition && (() => {
        const activeEl = currentQuestion.elements.find(el => el.id === activeInputId) as ShapeElement;
        if (activeEl?.valueOptions) {
          try {
            const options = JSON.parse(activeEl.valueOptions);
            if (Array.isArray(options)) {
              return (
                <OptionPicker
                  options={options}
                  position={pickerPosition} // Sử dụng tọa độ tuyệt đối
                  shapeWidth={activeEl.width || activeEl.size || 100}
                  shapeHeight={activeEl.height || activeEl.size || 100}
                  textSize={activeEl.textSize || 40}
                  onSelect={(val) => {
                    setAllAnswers(prev => ({
                      ...prev,
                      [currentQuestion.id]: { ...(prev[currentQuestion.id] || {}), [activeInputId]: val }
                    }));
                    setActiveInputId(null);
                    setPickerPosition(null);
                  }}
                  onClose={() => {
                    setActiveInputId(null);
                    setPickerPosition(null);
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  root: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: COLOR.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    ...SHADOWS.small,
  },
  backButton: {
    width: 24,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLOR.white,
    fontSize: 20,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    marginLeft: SPACING.xs,
  },
  headerCheckButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  headerCheckText: {
    color: COLOR.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    position: 'relative',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100', // Cam đậm
    padding: SPACING.md
  },
  questionContentText: {
    fontWeight: 'normal',
    color: '#333',
  },
  imageWrapper: {
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: SPACING.md
  },
  headerImage: {
    width: '100%',
  },
  canvasContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: 'rgba(245, 246, 228, 1)',
    overflow: 'hidden',
  },
  extraDataContainer: {
    marginTop: 16,
    padding: SPACING.md,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  extraDataText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 4,
  },
});

export default MathFillScreen;
