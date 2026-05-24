import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionChoice, QuestionChoiceGroup } from '@/services/types/question.types';
import { renderFormattedText } from '@/utils/render.util';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface _Props {
  questionChoice: QuestionChoice;
  userAnswers: Record<number, string>;
  onAnswerChange: (groupIndex: number, value: string) => void;
  viewMode?: ViewMode;
}

const QuestionChoiceView: React.FC<_Props> = ({
  questionChoice,
  userAnswers,
  onAnswerChange,
  viewMode = ViewMode.EDIT
}) => {
  const isReview = viewMode === ViewMode.REVIEW;
  const multiGroup = questionChoice.groups.length > 1;

  const handleToggleOption = (groupIndex: number, group: QuestionChoiceGroup, option: string) => {
    if (isReview) return;

    const currentVal = userAnswers[groupIndex] || '';
    const isMulti = group.answer.includes(',');

    if (isMulti) {
      let selected = currentVal ? currentVal.split(',') : [];
      if (selected.includes(option)) {
        selected = selected.filter(o => o !== option);
      } else {
        selected.push(option);
      }
      onAnswerChange(groupIndex, selected.join(','));
    } else {
      onAnswerChange(groupIndex, option);
    }
  };

  const renderOption = (groupIndex: number, group: QuestionChoiceGroup, option: string) => {
    const currentVal = userAnswers[groupIndex] || '';
    const selected = currentVal ? currentVal.split(',') : [];
    const isChoice = selected.includes(option);

    const correctAnswers = group.answer.split(',');
    const isCorrect = correctAnswers.includes(option);
    const isLong = option.length > 2;

    const getBorderColor = () => {
      if (isReview && isChoice) return isCorrect ? COLOR.success : COLOR.error;
      if (!isReview && isChoice) return COLOR.focus;
      return COLOR.transparent;
    };
    const getBgColor = () => {
      if (isReview && isChoice) return isCorrect ? COLOR.bgSuccess : COLOR.bgError;
      return COLOR.transparent;
    };

    return (
      <TouchableOpacity
        key={option}
        activeOpacity={0.7}
        disabled={isReview}
        onPress={() => handleToggleOption(groupIndex, group, option)}
        style={[
          styles.optionContainer,
          isLong ? styles.rectOption : styles.circleOption,
          { borderColor: getBorderColor(), backgroundColor: getBgColor() }
        ]}
      >
        <Text style={[
          styles.optionText,
          (isReview && !isChoice && isCorrect) && { textDecorationLine: 'underline' }
        ]}>{option}</Text>
      </TouchableOpacity>
    );
  };

  const renderExplanation = (groupIndex: number, group: QuestionChoiceGroup) => {
    if (!isReview) return null;

    const currentVal = userAnswers[groupIndex] || '';
    const userChoices = currentVal ? currentVal.split(',') : [];
    const correctAnswers = group.answer.split(',');

    const isWrong = userChoices.some(v => !correctAnswers.includes(v));
    const isMissing = correctAnswers.some(a => !userChoices.includes(a));

    if (!isWrong && !isMissing) return (
      <Text style={styles.correctText}>Chính xác</Text>
    );

    if (group.answer.includes(',')) {
      const missing = correctAnswers.filter(a => !userChoices.includes(a));
      const already = correctAnswers.filter(a => userChoices.includes(a));
      const wrongCount = userChoices.filter(v => !correctAnswers.includes(v)).length;

      if (missing.length > 0) {
        return (
          <Text style={styles.explanationText}>
            Đáp án đúng gồm: {already.length > 0 && <><Text>{already.join(', ')}</Text>, </>}
            <Text style={styles.boldText}>{missing.join(', ')}</Text>
          </Text>
        );
      }
      return <Text style={styles.explanationText}>Bạn đã chọn thừa {wrongCount} đáp án.</Text>;
    }

    return (
      <Text style={styles.explanationText}>
        Đáp án đúng là: <Text style={styles.boldText}>{group.answer}</Text>
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {questionChoice.groups.map((group, groupIndex) => {
        const showKey = multiGroup && !!group.key;
        const hasLabel = !!group.label;
        const pullLeft = hasLabel || !showKey;

        return (
          <View key={group.key} style={styles.choiceGroup}>
            <View style={hasLabel ? styles.labelLayout : styles.row}>
              {hasLabel ? (
                <View style={styles.row}>
                  {showKey && <Text style={styles.groupText}>{group.key})</Text>}
                  <Text style={styles.labelText}>{renderFormattedText(group.label!)}</Text>
                </View>
              ) : (
                showKey && <Text style={styles.groupText}>{group.key})</Text>
              )}
              <View style={[
                styles.optionsList,
                hasLabel ? styles.optionsListWithLabel : null,
                pullLeft && !hasLabel ? styles.optionsListPullLeft : null
              ]}>
                {group.options.map(opt => renderOption(groupIndex, group, opt))}
              </View>
            </View>
            {renderExplanation(groupIndex, group)}
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
