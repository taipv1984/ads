import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionSort } from '@/services/types/question.types';
import { renderFormattedText } from '@/utils/render.util';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Sortable, { useItemContext } from 'react-native-sortables';

interface _Props {
    questionSorts: QuestionSort[];
    userAnswers: Record<number, string>;
    onAnswerChange: (sortId: number, value: string) => void;
    viewMode?: ViewMode;
}

interface SortableItemProps {
    option: string;
    isReview: boolean;
    isOptionCorrect: boolean;
    isLong: boolean;
    isGroupChanged: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ option, isReview, isOptionCorrect, isLong, isGroupChanged }) => {
    const { isActive } = useItemContext();

    const animatedStyle = useAnimatedStyle(() => {
        let borderColor: string = COLOR.transparent;
        let borderWidth: number = 2;
        let bgColor: string = COLOR.transparent;

        if (isReview) {
            borderColor = COLOR.transparent;
            bgColor = COLOR.transparent;
        } else {
            if (isActive.value) {
                borderColor = COLOR.focus;
                borderWidth = 2;
            } else if (isGroupChanged) {
                borderColor = COLOR.focus;
                borderWidth = 1;
            } else {
                borderColor = COLOR.transparent;
                borderWidth = 2;
            }
            bgColor = isGroupChanged ? COLOR.bgFocus : COLOR.grayLight;
        }

        return {
            borderColor,
            borderWidth,
            backgroundColor: bgColor,
        };
    });

    return (
        <Animated.View
            style={[
                styles.optionContainer,
                isLong ? styles.rectOption : styles.circleOption,
                animatedStyle,
            ]}
        >
            <Text
                style={[
                    styles.optionText,
                    !isReview && isGroupChanged && { color: COLOR.text },
                    isReview && !isOptionCorrect && {
                        textDecorationLine: 'line-through',
                        color: COLOR.textSecondary
                    }
                ]}
            >
                {option}
            </Text>
        </Animated.View>
    );
};

const QuestionSortView: React.FC<_Props> = ({
    questionSorts,
    userAnswers,
    onAnswerChange,
    viewMode = ViewMode.EDIT
}) => {
    const isReview = viewMode === ViewMode.REVIEW;

    // Track which groups have had their options reordered (isChange)
    const [changedGroups, setChangedGroups] = React.useState<Record<number, boolean>>(() => {
        const initial: Record<number, boolean> = {};
        questionSorts.forEach(qSort => {
            const currentVal = userAnswers[qSort.id];
            if (currentVal && currentVal !== qSort.options.join(',')) {
                initial[qSort.id] = true;
            }
        });
        return initial;
    });

    const renderOption = (qSort: QuestionSort, option: string, isGroupChanged: boolean) => {
        const currentVal = userAnswers[qSort.id] || qSort.options.join(',');

        // Find the index of the option in the current answer sequence
        const sortOptions = currentVal.split(',');
        const currentIndex = sortOptions.indexOf(option);

        // Find the index of the option in the correct answer sequence
        const correctAnswers = qSort.answer.split(',');
        const correctIndex = correctAnswers.indexOf(option);

        const isOptionCorrect = currentIndex === correctIndex;
        const isLong = option.length > 2;

        return (
            <SortableItem
                key={option}
                option={option}
                isReview={isReview}
                isOptionCorrect={isOptionCorrect}
                isLong={isLong}
                isGroupChanged={isGroupChanged}
            />
        );
    };

    const renderExplanation = (qSort: QuestionSort) => {
        if (!isReview) return null;

        const currentVal = userAnswers[qSort.id] || qSort.options.join(',');
        const isCorrect = currentVal === qSort.answer;

        if (isCorrect) return (
            <Text style={styles.correctText}>
                Chính xác
            </Text>
        );

        return (
            <Text style={styles.explanationText}>
                Đáp án đúng là: <Text style={styles.boldText}>{qSort.answer.split(',').join(', ')}</Text>
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            {questionSorts.map((qSort) => {
                const isGroupShown = questionSorts.length > 1 && !!qSort.group;
                const pullLeft = !!qSort.label || !isGroupShown;

                const currentVal = userAnswers[qSort.id];
                const items = currentVal ? currentVal.split(',') : qSort.options;
                const isChanged = !!changedGroups[qSort.id];

                return (
                    <View key={qSort.id} style={styles.sortGroup}>
                        <View style={qSort.label ? styles.labelLayout : styles.row}>
                            {qSort.label ? (
                                <View style={styles.row}>
                                    {isGroupShown ? (
                                        <Text style={styles.groupText}>{qSort.group}) </Text>
                                    ) : null}
                                    <Text style={styles.labelText}>{renderFormattedText(qSort.label)}</Text>
                                </View>
                            ) : (
                                isGroupShown ? (
                                    <Text style={styles.groupText}>{qSort.group}) </Text>
                                ) : null
                            )}

                            <View style={[
                                qSort.label ? styles.optionsListWithLabel : null,
                                pullLeft && !qSort.label ? styles.optionsListPullLeft : null
                            ]}>
                                <Sortable.Flex
                                    sortEnabled={!isReview}
                                    flexDirection="row"
                                    flexWrap="wrap"
                                    gap={SPACING.sm}
                                    showDropIndicator={true}
                                    dropIndicatorStyle={styles.dropIndicator}
                                    onDragEnd={({ order }) => {
                                        const newOptions = order(items);
                                        const isChangedOrder = newOptions.join(',') !== items.join(',');
                                        if (isChangedOrder) {
                                            setChangedGroups(prev => ({
                                                ...prev,
                                                [qSort.id]: true
                                            }));
                                        }
                                        onAnswerChange(qSort.id, newOptions.join(','));
                                    }}
                                >
                                    {items.map(opt => renderOption(qSort, opt, isChanged))}
                                </Sortable.Flex>
                            </View>
                        </View>
                        {renderExplanation(qSort)}
                    </View>
                );
            })}
        </View>
    );
};

export default QuestionSortView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.md,
    },
    sortGroup: {
        marginTop: SPACING.xs,
        marginBottom: SPACING.md
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupText: {
        fontSize: SIZE.md,
        marginRight: SPACING.xs,
        color: COLOR.text,
    },
    labelLayout: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    labelText: {
        fontSize: SIZE.md,
        color: COLOR.text,
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
        marginHorizontal: SPACING.xs,
        marginBottom: SPACING.xs,
        minWidth: 40,
        minHeight: 40,
        borderRadius: 6,
    },
    circleOption: {
        borderRadius: 6,
    },
    rectOption: {
        borderRadius: 6,
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
    dropIndicator: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLOR.textSecondary,
        backgroundColor: COLOR.transparent,
        borderRadius: 6,
    }
});
