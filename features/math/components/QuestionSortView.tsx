import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionSort, QuestionSortGroup } from '@/services/types/question.types';
import { MarkdownView } from '@/components/shared/MarkdownView';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Sortable, { useItemContext } from 'react-native-sortables';

interface _Props {
    questionSort: QuestionSort;
    userAnswers: Record<number, string>;
    onAnswerChange: (groupIndex: number, value: string) => void;
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

        return { borderColor, borderWidth, backgroundColor: bgColor };
    });

    return (
        <Animated.View style={[
            styles.optionContainer,
            isLong ? styles.rectOption : styles.circleOption,
            animatedStyle,
        ]}>
            <Text style={[
                styles.optionText,
                !isReview && isGroupChanged && { color: COLOR.text },
                isReview && !isOptionCorrect && { textDecorationLine: 'line-through', color: COLOR.textSecondary }
            ]}>
                {option}
            </Text>
        </Animated.View>
    );
};

const QuestionSortView: React.FC<_Props> = ({
    questionSort,
    userAnswers,
    onAnswerChange,
    viewMode = ViewMode.EDIT
}) => {
    const isReview = viewMode === ViewMode.REVIEW;
    const multiGroup = questionSort.groups.length > 1;

    // Track which group indices have been reordered
    const [changedGroups, setChangedGroups] = React.useState<Record<number, boolean>>(() => {
        const initial: Record<number, boolean> = {};
        questionSort.groups.forEach((g, i) => {
            const currentVal = userAnswers[i];
            if (currentVal && currentVal !== g.options.join(',')) {
                initial[i] = true;
            }
        });
        return initial;
    });

    const renderOption = (groupIndex: number, group: QuestionSortGroup, option: string) => {
        const currentVal = userAnswers[groupIndex] || group.options.join(',');
        const sortOptions = currentVal.split(',');
        const currentIndex = sortOptions.indexOf(option);
        const correctIndex = group.answer.split(',').indexOf(option);
        const isOptionCorrect = currentIndex === correctIndex;
        const isLong = option.length > 2;

        return (
            <SortableItem
                key={option}
                option={option}
                isReview={isReview}
                isOptionCorrect={isOptionCorrect}
                isLong={isLong}
                isGroupChanged={!!changedGroups[groupIndex]}
            />
        );
    };

    const renderExplanation = (groupIndex: number, group: QuestionSortGroup) => {
        if (!isReview) return null;
        const currentVal = userAnswers[groupIndex] || group.options.join(',');
        const isCorrect = currentVal === group.answer;
        if (isCorrect) return <Text style={styles.correctText}>Đúng</Text>;
        return (
            <Text style={styles.explanationText}>
                Đáp án đúng là: <Text style={styles.boldText}>{group.answer.split(',').join(', ')}</Text>
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            {questionSort.groups.map((group, groupIndex) => {
                const showKey = multiGroup && !!group.key;
                const hasLabel = !!group.label;
                const pullLeft = hasLabel || !showKey;
                const currentVal = userAnswers[groupIndex];
                const items = currentVal ? currentVal.split(',') : group.options;

                return (
                    <View key={group.key} style={styles.sortGroup}>
                        <View style={hasLabel ? styles.labelLayout : styles.row}>
                            {hasLabel ? (
                                <View style={styles.row}>
                                    {showKey && <Text style={styles.groupText}>{group.key})</Text>}
                                    <MarkdownView style={styles.labelText} text={group.label!} />
                                </View>
                            ) : (
                                showKey && <Text style={styles.groupText}>{group.key})</Text>
                            )}
                            <View style={[
                                hasLabel ? styles.optionsListWithLabel : null,
                                pullLeft && !hasLabel ? styles.optionsListPullLeft : null
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
                                        if (newOptions.join(',') !== items.join(',')) {
                                            setChangedGroups(prev => ({ ...prev, [groupIndex]: true }));
                                        }
                                        onAnswerChange(groupIndex, newOptions.join(','));
                                    }}
                                >
                                    {items.map(opt => renderOption(groupIndex, group, opt))}
                                </Sortable.Flex>
                            </View>
                        </View>
                        {renderExplanation(groupIndex, group)}
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
