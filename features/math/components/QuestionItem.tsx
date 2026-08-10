import { MarkdownView } from '@/components/shared/MarkdownView';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { QuestionType, ViewMode } from '@/enums/math.enum';
import { Question, QuestionChoice, QuestionForm, QuestionQuiz, QuestionSort } from '@/services/types/question.types';
import { getCanvasLayout } from '@/utils/math.util';
import React, { memo, useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import QuestionCanvas from './QuestionCanvas';
import QuestionChoiceView from './QuestionChoiceView';
import QuestionFormView from './QuestionFormView';
import QuestionQuizView from './QuestionQuizView';
import QuestionSortView from './QuestionSortView';
import QuestionExplanation from './QuestionExplanation';

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
  const { height: canvasHeight, offsetY } = getCanvasLayout('elements' in question ? question.elements || [] : []);
  const hasAnswered = userAnswers && Object.keys(userAnswers).length > 0;
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
      case QuestionType.CHOICE:
        return (
          <QuestionChoiceView
            questionChoice={question as QuestionChoice}
            userAnswers={userAnswers}
            onAnswerChange={(choiceId, val) => updateAnswer(question.id, choiceId, val)}
            viewMode={ViewMode.EDIT}
          />
        );
      case QuestionType.SORT:
        return (
          <QuestionSortView
            questionSort={question as QuestionSort}
            userAnswers={userAnswers}
            onAnswerChange={(sortId, val) => updateAnswer(question.id, sortId, val)}
            viewMode={ViewMode.EDIT}
          />
        );
      case QuestionType.QUIZ:
        return (
          <QuestionQuizView
            questionQuiz={question as QuestionQuiz}
            userAnswers={userAnswers}
            onAnswerChange={(quizId, val) => updateAnswer(question.id, quizId, val)}
            viewMode={ViewMode.EDIT}
          />
        );
      case QuestionType.FORM:
        return (
          <QuestionFormView
            questionForm={question as QuestionForm}
            userAnswers={userAnswers}
            onAnswerChange={(formId, val) => updateAnswer(question.id, formId, val)}
            activeInputId={index === currentIndex ? activeInputId : null}
            onSelectInput={onSelectInput}
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
      <View style={styles.questionTitle}>
        {question.question && question.question != "" && (
          <MarkdownView style={styles.questionContentText} text={"**Câu " + (index + 1) + ":**  " + question.question!} />
        )}
      </View>

      {question.image && (
        <View style={styles.imageWrapper}>
          <AutoHeightImage uri={question.image} />
        </View>
      )}

      {renderQuestionContent()}

      <QuestionExplanation explain={question.explain} isAnswered={hasAnswered} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionTitle: {
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
    // borderWidth: 1, //dev
  },
  questionContentText: {
    fontSize: SIZE.md,
    fontWeight: 'normal',
    color: COLOR.text,
  },
  imageWrapper: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    // borderWidth: 1, //dev
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
