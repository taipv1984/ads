import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { QuestionType, ViewMode } from '@/enums/math.enum';
import QuestionCanvas from '@/features/math/components/QuestionCanvas';
import QuestionSelectView from '@/features/math/components/QuestionSelectView';
import { Question } from '@/services/types/question.types';
import { getCanvasLayout } from '@/utils/math.util';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface _Props {
  question: Question;
  index: number;
  userAnswers: Record<number, string>;
  userConnections: { from: number, to: number }[];
  result: {
    isCorrect: boolean;
    finalScore: number;
  };
  backgroundColor?: string;
}

const MatchResultItem = React.memo(({
  question,
  index,
  userAnswers,
  userConnections,
  result,
  backgroundColor = COLOR.white
}: _Props) => {
  const { height: canvasHeight, offsetY } = getCanvasLayout(question.elements || []);

  const renderResultContent = () => {
    switch (question.type) {
      case QuestionType.FILL:
      case QuestionType.MATCH:
        return (
          <>
            <View style={[styles.canvasWrapper, { height: canvasHeight }]}>
              <QuestionCanvas
                question={question}
                userInputs={userAnswers}
                activeInputId={null}
                reviewConnections={userConnections}
                onSelectInput={() => { }}
                offsetY={offsetY}
                viewMode={ViewMode.REVIEW}
              />
            </View>
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                <Ionicons name="bulb-outline" size={16} color={COLOR.primary} /> Giải thích
              </Text>
              <Text style={styles.explanationText}>
                {result.isCorrect //todo
                  ? "Tuyệt vời! Bạn đã hoàn thành đúng yêu cầu của câu hỏi này."
                  : "Bạn hãy xem lại các đường nối màu đỏ hoặc các ô số màu đỏ để biết lỗi sai nhé."}
              </Text>
            </View>
          </>
        );
      case QuestionType.SELECT:
        return (
          <QuestionSelectView
            questionSelects={question.selects || []}
            userAnswers={userAnswers}
            onAnswerChange={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.resultCard, { backgroundColor }]}>
      <View style={styles.resultCardHeader}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.questionLabel}>
            <Text style={[styles.questionLabelText, { color: result.isCorrect ? COLOR.success : COLOR.error }]}>
              Câu {index + 1}:
            </Text>
          </View>
          {result.finalScore > 0 && (
            <Text style={[styles.scoreText, { color: result.isCorrect ? COLOR.success : COLOR.error }]}>
              {result.finalScore}đ
            </Text>
          )}
        </View>
      </View>

      {question.label && question.label !== "" && (
        <View style={styles.cardContentWrapper}>
          <Text style={styles.cardContent}>{question.label}</Text>
        </View>
      )}

      {renderResultContent()}
    </View>
  );
});

export default MatchResultItem;

const styles = StyleSheet.create({
  resultCard: {
    paddingTop: SPACING.md,
  },
  resultCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  questionLabel: {
    flexDirection: 'row',
  },
  questionLabelText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreText: {
    fontSize: SIZE.md,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  cardContentWrapper: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
  },
  cardContent: {
    fontSize: SIZE.md,
    color: COLOR.text,
    lineHeight: 22,
  },
  canvasWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  explanationBox: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    marginTop: SPACING.xs,
  },
  explanationTitle: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.text,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: SIZE.md,
    color: COLOR.text,
    lineHeight: 22,
  },
});
