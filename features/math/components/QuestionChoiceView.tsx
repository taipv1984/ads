import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionChoice } from '@/services/types/question.types';
import { renderFormattedText } from '@/utils/render.util';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface _Props {
  questionChoices: QuestionChoice[];
  userAnswers: Record<number, string>;
  onAnswerChange: (choiceId: number, value: string) => void;
  viewMode?: ViewMode;
}

const QuestionChoiceView: React.FC<_Props> = ({
  questionChoices,
  userAnswers,
  onAnswerChange,
  viewMode = ViewMode.EDIT
}) => {
  const isReview = viewMode === ViewMode.REVIEW;

  const handleToggleOption = (qChoice: QuestionChoice, option: string) => {
    if (isReview) return;

    const currentVal = userAnswers[qChoice.id] || '';
    const isMulti = qChoice.answer.includes(',');

    if (isMulti) {
      let choiceOptions = currentVal ? currentVal.split(',') : [];
      if (choiceOptions.includes(option)) {
        choiceOptions = choiceOptions.filter(o => o !== option);
      } else {
        choiceOptions.push(option);
      }
      onAnswerChange(qChoice.id, choiceOptions.join(','));
    } else {
      onAnswerChange(qChoice.id, option);
    }
  };

  const renderOption = (qChoice: QuestionChoice, option: string) => {
    const currentVal = userAnswers[qChoice.id] || '';
    const choiceOptions = currentVal ? currentVal.split(',') : [];
    const isChoice = choiceOptions.includes(option);

    const correctAnswers = qChoice.answer.split(',');
    const isCorrect = correctAnswers.includes(option);

    const isLong = option.length > 2;

    const getOptionStyles = () => {
      let borderColor: string = COLOR.transparent;
      let bgColor: string = COLOR.transparent;

      if (isReview) {
        if (isChoice) {
          borderColor = isCorrect ? COLOR.success : COLOR.error;
          bgColor = isCorrect ? COLOR.bgSuccess : COLOR.bgError;
        }
      } else if (isChoice) {
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
        onPress={() => handleToggleOption(qChoice, option)}
        style={[
          styles.optionContainer,
          isLong ? styles.rectOption : styles.circleOption,
          optionStyles
        ]}
      >
        <Text style={[
          styles.optionText,
          (isReview && !isChoice && isCorrect) && { textDecorationLine: 'underline' }
        ]}>{option}</Text>
      </TouchableOpacity>
    );
  };

  const renderExplanation = (qChoice: QuestionChoice) => {
    if (!isReview) return null;

    const currentVal = userAnswers[qChoice.id] || '';
    const userChoices = currentVal ? currentVal.split(',') : [];
    const correctAnswers = qChoice.answer.split(',');

    const isWrong = userChoices.some(val => !correctAnswers.includes(val));
    const isMissing = correctAnswers.some(ans => !userChoices.includes(ans));

    if (!isWrong && !isMissing) return (
      <Text style={styles.correctText}>
        Chính xác
      </Text>
    );

    if (qChoice.answer.includes(',')) { // ValueType.MULTI
      const missing = correctAnswers.filter(ans => !userChoices.includes(ans));
      const correctlyChoice = correctAnswers.filter(ans => userChoices.includes(ans));
      const wrongCount = userChoices.filter(val => !correctAnswers.includes(val)).length;

      if (missing.length > 0) {
        return (
          <Text style={styles.explanationText}>
            Đáp án đúng gồm: {correctlyChoice.length > 0 && <><Text>{correctlyChoice.join(', ')}</Text>, </>}<Text style={styles.boldText}>{missing.join(', ')}</Text>
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
          Đáp án đúng là: <Text style={styles.boldText}>{qChoice.answer}</Text>
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      {questionChoices.map((qChoice) => {
        const isGroupShown = questionChoices.length > 1 && !!qChoice.group;
        const pullLeft = !!qChoice.label || !isGroupShown;

        return (
          <View key={qChoice.id} style={styles.choiceGroup}>
            <View style={qChoice.label ? styles.labelLayout : styles.row}>
              {qChoice.label ? (
                <View style={styles.row}>
                  {isGroupShown ? (
                    <Text style={styles.groupText}>{qChoice.group}) </Text>
                  ) : null}
                  <Text style={styles.labelText}>{renderFormattedText(qChoice.label)}</Text>
                </View>
              ) : (
                isGroupShown ? (
                  <Text style={styles.groupText}>{qChoice.group}) </Text>
                ) : null
              )}
              <View style={[
                styles.optionsList,
                qChoice.label ? styles.optionsListWithLabel : null,
                pullLeft && !qChoice.label ? styles.optionsListPullLeft : null
              ]}>
                {qChoice.options.map(opt => renderOption(qChoice, opt))}
              </View>
            </View>
            {renderExplanation(qChoice)}
          </View>
        );
      })}
    </View>
  );
};

export default QuestionChoiceView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
  },
  choiceGroup: {
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupText: {
    fontSize: SIZE.md,
    marginRight: SPACING.xs,
  },
  labelLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  labelText: {
    fontSize: SIZE.md,
    color: COLOR.black,
  },
  optionsList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  optionsListWithLabel: {
    marginLeft: -SPACING.sm,
    marginTop: SPACING.xs,
  },
  optionsListPullLeft: {
    marginLeft: -SPACING.sm,
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
