import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionSelect } from '@/services/types/question.types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface _Props {
  questionSelects: QuestionSelect[];
  userAnswers: Record<number, string>;
  onAnswerChange: (selectId: number, value: string) => void;
  viewMode?: ViewMode;
}

const QuestionSelectView: React.FC<_Props> = ({
  questionSelects,
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

  const renderOption = (questionSelect: QuestionSelect, option: string) => {
    const currentVal = userAnswers[questionSelect.id] || '';
    const selectedOptions = currentVal ? currentVal.split(',') : [];
    const isSelected = selectedOptions.includes(option);

    const correctAnswers = Array.isArray(questionSelect.answer) ? questionSelect.answer : [questionSelect.answer];
    const isCorrect = correctAnswers.includes(option);

    const isLong = option.length > 2;

    const getOptionStyles = () => {
      let borderColor: string = COLOR.transparent;
      let bgColor: string = COLOR.transparent;

      if (isReview) {
        if (isSelected) {
          borderColor = isCorrect ? COLOR.success : COLOR.error;
          bgColor = isCorrect ? COLOR.bgSuccess : COLOR.bgError;
        }
      } else if (isSelected) {
        borderColor = COLOR.focus;
      }

      return {
        borderColor,
        backgroundColor: bgColor
      };
    };

    const optionStyles = getOptionStyles();

    return (
      <TouchableOpacity
        key={option}
        activeOpacity={0.7}
        disabled={isReview}
        onPress={() => handleToggleOption(questionSelect, option)}
        style={[
          styles.optionContainer,
          isLong ? styles.rectOption : styles.circleOption,
          optionStyles
        ]}
      >
        <Text style={[
          styles.optionText,
          (isReview && !isSelected && isCorrect) && { textDecorationLine: 'underline' }
        ]}>{option}</Text>
      </TouchableOpacity>
    );
  };

  const renderExplanation = (questionSelect: QuestionSelect) => {
    if (!isReview) return null;

    const currentVal = userAnswers[questionSelect.id] || '';
    const userSelections = currentVal ? currentVal.split(',') : [];
    const correctAnswers = Array.isArray(questionSelect.answer) ? questionSelect.answer : [questionSelect.answer];

    const isWrong = userSelections.some(val => !correctAnswers.includes(val));
    const isMissing = correctAnswers.some(ans => !userSelections.includes(ans));

    if (!isWrong && !isMissing) return (
      <Text style={styles.correctText}>
        Chính xác
      </Text>
    );

    if (Array.isArray(questionSelect.answer)) { // ValueType.MULTI
      const missing = correctAnswers.filter(ans => !userSelections.includes(ans));
      const correctlySelected = correctAnswers.filter(ans => userSelections.includes(ans));
      const wrongCount = userSelections.filter(val => !correctAnswers.includes(val)).length;

      if (missing.length > 0) {
        return (
          <Text style={styles.explanationText}>
            Đáp án đúng gồm: {correctlySelected.length > 0 && <><Text>{correctlySelected.join(', ')}</Text>, </>}<Text style={styles.boldText}>{missing.join(', ')}</Text>
          </Text>
        );
      }
      return (
        <Text style={styles.explanationText}>
          Bạn đã chọn thừa {wrongCount} đáp án.
        </Text>
      );
    } else { // ValueType.SINGLE
      return (
        <Text style={styles.explanationText}>
          Đáp án đúng là: <Text style={styles.boldText}>{questionSelect.answer}</Text>
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      {questionSelects.map((questionSelect) => (
        <View key={questionSelect.id} style={styles.selectGroup}>
          <View style={styles.row}>
            {questionSelect.group ? (
              <Text style={styles.groupText}>{questionSelect.group}) </Text>
            ) : null}
            <View style={styles.optionsList}>
              {questionSelect.options.map(opt => renderOption(questionSelect, opt))}
            </View>
          </View>
          {renderExplanation(questionSelect)}
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
    marginTop: SPACING.xs,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
