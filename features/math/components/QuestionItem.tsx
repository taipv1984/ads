import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { QuestionType, ViewMode } from '@/enums/math.enum';
import { Question } from '@/services/types/question.types';
import { getCanvasLayout } from '@/utils/math.util';
import React, { memo, useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import QuestionCanvas from './QuestionCanvas';
import QuestionSelectView from './QuestionSelectView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface _Props {
  question: Question;
  index: number;
  currentIndex: number;
  userAnswers: Record<number, string>;
  userConnections: { from: number, to: number }[];
  activeInputId: number | null;
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  onConnectionsChange: (id: number, conns: { from: number, to: number }[]) => void;
  updateAnswer: (questionId: number, shapeId: number, value: string) => void;
  AutoHeightImage: React.FC<{ uri: string }>;
}

const QuestionItem: React.FC<_Props> = ({
  question,
  index,
  currentIndex,
  userAnswers,
  userConnections,
  activeInputId,
  onSelectInput,
  onConnectionsChange,
  updateAnswer,
  AutoHeightImage
}) => {
  const { height: canvasHeight, offsetY } = getCanvasLayout(question.elements || []);

  const handleConnectionsChangeLocal = useCallback((id: number, conns: { from: number, to: number }[]) => {
    onConnectionsChange(id, conns);
  }, [onConnectionsChange]);

  const renderQuestionContent = () => {
    switch (question.type) {
      case QuestionType.FILL:
      case QuestionType.MATCH:
        return question.elements && question.elements.length > 0 ? (
          <View style={[styles.canvasContainer, { height: canvasHeight }]}>
            <QuestionCanvas
              question={question}
              userInputs={userAnswers}
              connections={userConnections}
              activeInputId={index === currentIndex ? activeInputId : null}
              onSelectInput={onSelectInput}
              onConnectionsChange={handleConnectionsChangeLocal}
              offsetY={offsetY}
              viewMode={ViewMode.EDIT}
            />
          </View>
        ) : null;
      case QuestionType.SELECT:
        return (
          <QuestionSelectView
            questionSelects={question.selects || []}
            userAnswers={userAnswers}
            onAnswerChange={(selectId, val) => updateAnswer(question.id, selectId, val)}
            viewMode={ViewMode.EDIT}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={{ width: SCREEN_WIDTH }}
      contentContainerStyle={{ paddingBottom: SPACING.lg }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.questionTitle}>
        Câu {index + 1}: {question.label && question.label != "" && <Text style={styles.questionContentText}>{question.label}</Text>}
      </Text>

      {question.imagePath && (
        <View style={styles.imageWrapper}>
          <AutoHeightImage uri={question.imagePath} />
        </View>
      )}

      {renderQuestionContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionTitle: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    padding: SPACING.md
  },
  questionContentText: {
    fontWeight: 'normal',
    color: COLOR.text,
  },
  imageWrapper: {
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'white'
  },
  canvasContainer: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default memo(QuestionItem, (prev, next) => {
  // Chỉ re-render nếu các dữ liệu thực sự thay đổi
  return (
    prev.question.id === next.question.id &&
    prev.currentIndex === next.currentIndex &&
    prev.activeInputId === next.activeInputId &&
    prev.userAnswers === next.userAnswers &&
    prev.userConnections === next.userConnections
  );
});
