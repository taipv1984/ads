import { MarkdownView } from '@/components/shared/MarkdownView';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface _Props {
  explain?: string;
  isAnswered: boolean;
}

const QuestionExplanation: React.FC<_Props> = ({ explain, isAnswered }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasExplain = explain && explain.trim() !== '';

  if (!hasExplain || !isAnswered) return null;

  return (
    <View style={styles.explanationBox}>
      <TouchableOpacity
        style={styles.explanationHeader}
        activeOpacity={0.7}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Ionicons name="bulb-outline" size={18} color={COLOR.focus} />
        <Text style={styles.explanationTitle}>Giải thích</Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={COLOR.focus}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {isExpanded && (
        <MarkdownView
          text={explain!}
          style={styles.explanationText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  explanationBox: {
    marginTop: SPACING.md,
    marginHorizontal: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLOR.bgFocus,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  explanationTitle: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.focus,
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  explanationText: {
    fontSize: SIZE.md,
    color: COLOR.text,
    lineHeight: 22,
    marginTop: SPACING.sm,
  },
});

export default QuestionExplanation;
