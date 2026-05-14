import { COLOR, SIZE, SPACING } from '@/constants/theme';
import QuestionCanvas from '@/features/math/components/QuestionCanvas';
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

  return (
    <View style={[styles.resultCard, { backgroundColor }]}>
      <View style={styles.resultCardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Câu {index + 1} {question.title || ""}</Text>
          <View style={[styles.badge, { backgroundColor: result.isCorrect ? COLOR.bgSuccess : COLOR.bgError }]}>
            <Text style={[styles.badgeText, { color: result.isCorrect ? COLOR.success : COLOR.error }]}>
              {result.isCorrect ? "Chính xác" : "Chưa đúng"}
            </Text>
          </View>
        </View>
        {result.finalScore > 0 && <Text style={styles.scoreText}>{result.finalScore}đ</Text>}
      </View>

      <View style={styles.cardContentWrapper}>
        <Text style={styles.cardContent}>{question.content}</Text>
      </View>

      <View style={[styles.canvasWrapper, { height: canvasHeight }]}>
        <QuestionCanvas
          question={question}
          userInputs={userAnswers}
          activeInputId={null}
          mode="review"
          reviewConnections={userConnections}
          onSelectInput={() => { }}
          offsetY={offsetY}
        />
      </View>

      <View style={styles.explanationBox}>
        <Text style={styles.explanationTitle}>
          <Ionicons name="bulb-outline" size={16} color={COLOR.primary} /> Giải thích
        </Text>
        <Text style={styles.explanationText}>
          {result.isCorrect
            ? "Tuyệt vời! Bạn đã hoàn thành đúng yêu cầu của câu hỏi này."
            : "Bạn hãy xem lại các đường nối màu đỏ hoặc các ô số màu đỏ để biết lỗi sai nhé."}
        </Text>
      </View>
    </View>
  );
});

export default MatchResultItem;

const styles = StyleSheet.create({
  resultCard: {
    marginBottom: SPACING.sm,
    paddingTop: SPACING.md,
  },
  resultCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 8,
  },
  badgeText: {
    fontSize: SIZE.sm,
    fontWeight: 'bold',
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.text,
    marginRight: 8,
  },
  scoreText: {
    fontSize: SIZE.md,
    fontStyle: 'italic',
    color: COLOR.text,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
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
