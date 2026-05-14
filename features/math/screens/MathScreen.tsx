import BottomNavigation from '@/app/components/shared/BottomNavigation';
import OptionPicker from '@/app/components/shared/OptionPicker';
import VirtualKeyboard from '@/app/components/shared/VirtualKeyboard';
import { COLOR, SHADOWS, SIZE, SPACING } from '@/constants/theme';
import { QUESTION_MOCKS } from '@/services/mocks/question.mock';
import { ShapeElement } from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, FlatList, Image as RNImage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calcQuestionScore, checkQuestionCompletion, getCanvasLayout } from '@/utils/math.util';
import QuestionItem from '../components/QuestionItem';
import GradeConfirmModal from '../components/modal/SubmitExamConfirmModal';
import { useMathQuiz } from '../context/MathQuizContext';

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

const MathScreen: React.FC = () => {
  const router = useRouter();
  const {
    questions,
    setQuestions,
    userAnswers,
    userConnections,
    updateAnswer,
    updateConnections,
    submitQuiz
  } = useMathQuiz();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeInputId, setActiveInputId] = useState<number | null>(null);
  const [pickerPosition, setPickerPosition] = useState<{ x: number, y: number } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [incompleteQuestions, setIncompleteQuestions] = useState<number[]>([]);

  const flatListRef = useRef<FlatList>(null);

  // Initialize questions
  React.useEffect(() => {
    setQuestions(QUESTION_MOCKS);
  }, []);

  const currentQuestion = questions[currentIndex] || QUESTION_MOCKS[currentIndex];
  const qInputs = userAnswers[currentQuestion.id] || {};

  const handleKeyPress = (key: string) => {
    if (activeInputId === null) return;
    const currentVal = qInputs[activeInputId] || '';
    let newVal = currentVal + key;
    const maxLength = currentQuestion.inputLength || 2;
    if (newVal.length > maxLength) {
      newVal = newVal.slice(1);
    }
    updateAnswer(currentQuestion.id, activeInputId, newVal);
  };

  const handleDelete = () => {
    if (activeInputId === null) return;
    const currentVal = qInputs[activeInputId] || '';
    updateAnswer(currentQuestion.id, activeInputId, currentVal.slice(0, -1));
  };

  const handleCheck = () => {
    setActiveInputId(null);
    const incomplete = questions.reduce((acc, q, idx) => {
      const completed = checkQuestionCompletion(
        q,
        userAnswers[q.id] || {},
        userConnections[q.id] || []
      );
      if (!completed) acc.push(idx);
      return acc;
    }, [] as number[]);

    setIncompleteQuestions(incomplete);
    setShowConfirmModal(true);
  };

  const handleConfirmGrade = () => {
    submitQuiz(calcQuestionScore);
    setShowConfirmModal(false);
    router.push('/math-result');
  };

  const handleReviewIncomplete = (index: number) => {
    setShowConfirmModal(false);
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleNext = () => {
    if (currentIndex < QUESTION_MOCKS.length - 1) {
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
  const getCanvasLayoutCallback = useCallback((elements: any[]) => {
    return getCanvasLayout(elements);
  }, []);

  const handleConnectionsChange = useCallback((id: number, conns: { from: number, to: number }[]) => {
    updateConnections(id, conns);
  }, [updateConnections]);

  const renderQuestionItem = useCallback(({ item, index }: { item: any, index: number }) => {
    return (
      <QuestionItem
        item={item}
        index={index}
        currentIndex={currentIndex}
        userAnswers={userAnswers[item.id] || {}}
        userConnections={userConnections[item.id] || []}
        activeInputId={activeInputId}
        onSelectInput={(id, absPos) => {
          setActiveInputId(id);
          if (absPos) setPickerPosition(absPos);
        }}
        onConnectionsChange={handleConnectionsChange}
        AutoHeightImage={AutoHeightImage}
      />
    );
  }, [currentIndex, userAnswers, userConnections, activeInputId, handleConnectionsChange]);

  return (
    <View style={styles.container}>
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
            data={QUESTION_MOCKS}
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
          total={QUESTION_MOCKS.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        {activeInputId !== null && !((currentQuestion.elements?.find(el => el.id === activeInputId) as any)?.valueOptions) && (
          <VirtualKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete} />
        )}
      </SafeAreaView>

      {/* OptionsPicker được đưa ra root để dùng tọa độ tuyệt đối */}
      {activeInputId !== null && pickerPosition && (() => {
        const activeEl = currentQuestion.elements?.find(el => el.id === activeInputId) as ShapeElement;
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
                    updateAnswer(currentQuestion.id, activeInputId, val);
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
      {/* Modal xác nhận chấm điểm */}
      <GradeConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmGrade}
        onReview={handleReviewIncomplete}
        incompleteQuestions={incompleteQuestions}
        totalQuestions={questions.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    marginLeft: SPACING.xs,
  },
  headerCheckButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  headerCheckText: {
    color: COLOR.white,
    fontSize: SIZE.lg,
    fontWeight: 'bold',
  },
});

export default MathScreen;
