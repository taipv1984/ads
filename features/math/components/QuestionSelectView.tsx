import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionSelect } from '@/services/types/question.types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface _Props {
  selects: QuestionSelect[];
  userAnswers: Record<number, string>;
  onAnswerChange: (selectId: number, value: string) => void;
  viewMode?: ViewMode;
}

const QuestionSelectView: React.FC<_Props> = ({
  selects,
  userAnswers,
  onAnswerChange,
  viewMode = ViewMode.EDIT
}) => {
  const isReview = viewMode === ViewMode.REVIEW;

  const handleToggleOption = (select: QuestionSelect, option: string) => {
    if (isReview) return;

    const currentVal = userAnswers[select.id] || '';
    const isMulti = Array.isArray(select.answer);

    if (isMulti) {
      let selectedOptions = currentVal ? currentVal.split(',') : [];
      if (selectedOptions.includes(option)) {
        selectedOptions = selectedOptions.filter(o => o !== option);
      } else {
        selectedOptions.push(option);
      }
      onAnswerChange(select.id, selectedOptions.join(','));
    } else {
      onAnswerChange(select.id, option);
    }
  };

  const renderOption = (select: QuestionSelect, option: string) => {
    const currentVal = userAnswers[select.id] || '';
    const selectedOptions = currentVal ? currentVal.split(',') : [];
    const isSelected = selectedOptions.includes(option);

    const correctAnswers = Array.isArray(select.answer) ? select.answer : [select.answer];
    const isCorrect = correctAnswers.includes(option);

    const isLong = option.length > 2;

    const getOptionStyles = () => {
      let bColor: string = COLOR.transparent;
      let bGColor: string = COLOR.transparent;

      if (isReview) {
        if (isSelected) {
          bColor = isCorrect ? COLOR.success : COLOR.error;
          bGColor = isCorrect ? COLOR.bgSuccess : COLOR.bgError;
        }
      } else if (isSelected) {
        bColor = COLOR.focus;
      }

      return {
        borderColor: bColor,
        backgroundColor: bGColor
      };
    };

    const dynamicStyles = getOptionStyles();

    return (
      <TouchableOpacity
        key={option}
        activeOpacity={0.7}
        disabled={isReview}
        onPress={() => handleToggleOption(select, option)}
        style={[
          styles.optionContainer,
          isLong ? styles.rectOption : styles.circleOption,
          dynamicStyles
        ]}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    );
  };

  const renderExplanation = (select: QuestionSelect) => {
    if (!isReview) return null;

    const currentVal = userAnswers[select.id] || '';
    const userSelections = currentVal ? currentVal.split(',') : [];
    const correctAnswers = Array.isArray(select.answer) ? select.answer : [select.answer];

    const isWrong = userSelections.some(val => !correctAnswers.includes(val));
    const isMissing = correctAnswers.some(ans => !userSelections.includes(ans));

    if (!isWrong && !isMissing) return (
      <Text style={styles.correctText}>
        Chính xác
      </Text>
    );

    if (Array.isArray(select.answer)) {
      // ValueType.MULTI
      const missing = correctAnswers.filter(ans => !userSelections.includes(ans));
      if (missing.length > 0) {
        return (
          <Text style={styles.explanationText}>
            Đáp án còn thiếu là: <Text style={styles.boldText}>{missing.join(', ')}</Text>
          </Text>
        );
      }
      return (
        <Text style={styles.explanationText}>
          Bạn đã chọn dư hoặc sai đáp án.
        </Text>
      );
    } else {
      // ValueType.SINGLE
      return (
        <Text style={styles.explanationText}>
          Đáp án đúng là: <Text style={styles.boldText}>{select.answer}</Text>
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      {selects.map((select) => (
        <View key={select.id} style={styles.selectGroup}>
          <View style={styles.row}>
            {select.group ? (
              <Text style={styles.groupText}>{select.group}) </Text>
            ) : null}
            <View style={styles.optionsList}>
              {select.options.map(opt => renderOption(select, opt))}
            </View>
          </View>
          {renderExplanation(select)}
        </View>
      ))}
    </View>
  );
};

export default QuestionSelectView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  selectGroup: {
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    marginRight: SPACING.xs,
  },
  optionsList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  optionContainer: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.sm,
    minWidth: 40,
    minHeight: 40,
  },
  circleOption: {
    borderRadius: 30,
  },
  rectOption: {
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
  },
  optionText: {
    fontSize: SIZE.md,
    color: COLOR.black,
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: SIZE.md,
    color: COLOR.error,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  correctText: {
    fontSize: SIZE.md,
    color: COLOR.success,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
