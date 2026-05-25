import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { LabelFormat, ViewMode } from '@/enums/math.enum';
import { QuestionQuiz, QuestionQuizOption } from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MarkdownView } from '@/app/components/shared/MarkdownView';

interface _Props {
  questionQuiz: QuestionQuiz;
  userAnswers: Record<number, string>;
  onAnswerChange: (quizId: number, value: string) => void;
  viewMode?: ViewMode;
}

const QuestionQuizView: React.FC<_Props> = ({
  questionQuiz,
  userAnswers,
  onAnswerChange,
  viewMode = ViewMode.EDIT
}) => {
  const isReview = viewMode === ViewMode.REVIEW;

  const handleToggleOption = (question: QuestionQuiz, optionIdx: string) => {
    if (isReview) return;

    const currentVal = userAnswers[question.id] || '';
    const isMulti = question.options.filter(o => o.isCorrect).length > 1;

    if (isMulti) {
      let quizOptions = currentVal ? currentVal.split(',') : [];
      if (quizOptions.includes(optionIdx)) {
        quizOptions = quizOptions.filter(o => o !== optionIdx);
      } else {
        quizOptions.push(optionIdx);
      }
      onAnswerChange(question.id, quizOptions.join(','));
    } else {
      onAnswerChange(question.id, optionIdx);
    }
  };

  const getOptionStyles = (
    labelFormat: LabelFormat,
    isChoice: boolean,
    isCorrect: boolean
  ) => {
    let borderColor: string = 'rgba(0,0,0,0.08)';
    let bgColor: string = COLOR.white;
    let borderWidth = 1;

    if (isReview) {
      if (isChoice) {
        borderColor = isCorrect ? COLOR.success : COLOR.error;
        bgColor = isCorrect ? COLOR.bgSuccess : COLOR.bgError;
      }
    } else {
      if (isChoice) {
        borderColor = COLOR.focus;
        bgColor = COLOR.bgFocus;
      }
    }

    return {
      borderColor,
      backgroundColor: bgColor,
      borderWidth,
    };
  };

  const renderOption = (question: QuestionQuiz, option: QuestionQuizOption, index: number) => {
    const currentVal = userAnswers[question.id] || '';
    const quizOptions = currentVal ? currentVal.split(',') : [];

    const optionIdx = index.toString();
    const isChoice = quizOptions.includes(optionIdx);

    const isCorrect = !!option.isCorrect;

    const labelFormat = question.labelFormat || LabelFormat.HIDE;
    const isMulti = question.options.filter(o => o.isCorrect).length > 1;

    const optionStyles = getOptionStyles(labelFormat, isChoice, isCorrect);

    return (
      <TouchableOpacity
        key={optionIdx}
        activeOpacity={0.7}
        disabled={isReview}
        onPress={() => handleToggleOption(question, optionIdx)}
        style={[
          styles.optionContainer,
          optionStyles
        ]}
      >
        {labelFormat === LabelFormat.INPUT && (
          <View style={styles.inputIconContainer}>
            {isMulti ? (
              isChoice ? (
                <Ionicons
                  name="checkbox"
                  size={24}
                  color={isReview ? (isCorrect ? COLOR.success : COLOR.error) : COLOR.focus}
                />
              ) : (
                <Ionicons
                  name="square-outline"
                  size={24}
                  color={COLOR.textSecondary}
                />
              )
            ) : (
              isChoice ? (
                <Ionicons
                  name="radio-button-on"
                  size={24}
                  color={isReview ? (isCorrect ? COLOR.success : COLOR.error) : COLOR.focus}
                />
              ) : (
                <Ionicons
                  name="radio-button-off"
                  size={24}
                  color={COLOR.textSecondary}
                />
              )
            )}
          </View>
        )}

        {labelFormat === LabelFormat.ALPHABET && (
          <Text style={styles.prefixText}>
            {String.fromCharCode(97 + index)}.
          </Text>
        )}

        {labelFormat === LabelFormat.NUMBER && (
          <Text style={styles.prefixText}>
            {index + 1}.
          </Text>
        )}

        <View style={styles.optionContentWrapper}>
          <Text style={[
            styles.optionText,
            labelFormat === LabelFormat.INPUT ? styles.optionTextWithInput : null,
          ]}>
            {option.value}
          </Text>
          {option.image && (
            <Image
              source={{ uri: option.image }}
              style={styles.optionImage}
              resizeMode="contain"
            />
          )}
        </View>

        {isReview && isCorrect && (
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={COLOR.success}
            style={styles.rightCheckmark}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderExplanation = (question: QuestionQuiz) => {
    if (!isReview) return null;

    const hasExplain = question.explain && question.explain.trim() !== '';

    if (!hasExplain) return null;

    return (
      <View style={styles.explanationBox}>
        <Text style={styles.explanationTitle}>
          <Ionicons name="bulb-outline" size={16} color={COLOR.focus} /> Giải thích
        </Text>
        {hasExplain && (
          <MarkdownView
            text={question.explain!}
            style={styles.explanationText}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.quizGroup}>
        <View style={styles.optionsList}>
          {questionQuiz.options.map((opt, idx) => renderOption(questionQuiz, opt, idx))}
        </View>
        {renderExplanation(questionQuiz)}
      </View>
    </View>
  );
};

export default QuestionQuizView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
  },
  quizGroup: {
    marginBottom: SPACING.md,
  },
  optionsList: {
    flexDirection: 'column',
    width: '100%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    backgroundColor: COLOR.white,
    // Add subtle shadow
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIconContainer: {
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixText: {
    fontSize: SIZE.md,
    color: COLOR.black,
    marginRight: SPACING.sm,
  },
  optionText: {
    flex: 1,
    fontSize: SIZE.md,
    color: COLOR.black,
    fontWeight: 'normal',
    lineHeight: 22,
  },
  optionContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionImage: {
    width: 60,
    height: 60,
    marginLeft: SPACING.sm,
    borderRadius: 6,
  },
  optionTextWithInput: {
    fontWeight: 'normal',
  },
  rightCheckmark: {
    marginLeft: SPACING.xs,
  },
  explanationBox: {
    marginTop: SPACING.sm,
  },
  explanationTitle: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: COLOR.focus
  },
  explanationText: {
    fontSize: SIZE.md,
    color: COLOR.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
