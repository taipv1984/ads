import { COLOR, SPACING } from '@/constants/theme';
import { getScoreFeedback } from '@/features/math/utils/math.util';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface _Props {
  score: number;
}

const ScoreFeedbackSection = ({ score }: _Props) => {
  const feedback = getScoreFeedback(score);

  // Tính số sao (0-10 scale)
  // score < 2 -> 0 sao
  // 2 <= score < 4 -> 1 sao
  // 4 <= score < 6 -> 3 sao
  // 6 <= score < 8 -> 3 sao
  // 8 <= score < 9 -> 4 sao
  // 9 <= score <= 10 -> 5 sao
  const starCount = useMemo(() => {
    if (score < 2) return 0;
    if (score < 4) return 1;
    if (score < 6) return 2;
    if (score < 7) return 3;
    if (score < 8) return 4;
    return 5;
  }, [score]);

  return (
    <View style={styles.feedbackContainer}>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Ionicons
            key={s}
            name={s <= starCount ? "star" : "star-outline"}
            size={36}
            color={s <= starCount ? "#FFD700" : "#EEE"}
            style={styles.starIcon}
          />
        ))}
      </View>
      <Text style={styles.feedbackTitle}>{feedback.title}</Text>
      <Text style={styles.feedbackMessage}>{feedback.message}</Text>
    </View>
  );
};

export default ScoreFeedbackSection;

const styles = StyleSheet.create({
  feedbackContainer: {
    alignItems: 'center',
    width: '100%',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLOR.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  feedbackMessage: {
    fontSize: 16,
    color: COLOR.text,
    textAlign: 'center',
    lineHeight: 20,
  },
});
