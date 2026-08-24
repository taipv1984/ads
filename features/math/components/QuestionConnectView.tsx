import { COLOR, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { useDragConnectLines } from '@/hooks/useDragConnectLines';
import { ConnectLineGeometry } from '@/hooks/useDrawConnectLines';
import {
  ConnectLine,
  TextInput as ConnectTextInput,
  QuestionConnect,
  QuestionForm,
  QuestionInput,
  SelectInput,
} from '@/services/types/question.types';
import { getAngleDeg, getDistance, getMidpoint } from '@/utils/point.util';
import React, { memo, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ConnectLinesOverlay from './ConnectLinesOverlay';
import FormGroupsRender from './FormGroupsRender';
import { FormInputItem } from './FormInputItem';
import { SelectInputModal } from './SelectInputModal';

interface _Props {
  questionForm?: QuestionForm;
  questionConnect?: QuestionConnect;
  userAnswers: Record<number, string>;
  userConnections: Array<{ from: number; to: number }>;
  onAnswerChange: (inputId: number, value: string) => void;
  onConnectionsChange: (conns: Array<{ from: number; to: number }>) => void;
  activeInputId: number | null;
  onSelectInput: (id: number | null) => void;
  viewMode?: ViewMode;
}

const QuestionConnectView: React.FC<_Props> = ({
  questionForm,
  questionConnect,
  userAnswers,
  userConnections = [],
  onAnswerChange,
  onConnectionsChange,
  activeInputId,
  onSelectInput,
  viewMode = ViewMode.EDIT,
}) => {
  const isReview = viewMode === ViewMode.REVIEW;
  const question = questionForm || questionConnect;

  const correctConnections = question && 'correctConnections' in question ? question.correctConnections ?? [] : [];
  const [selectInputModalVisible, setSelectInputModalVisible] = useState(false);
  const [currentSelectInput, setCurrentSelectInput] = useState<SelectInput | null>(null);
  const [selectPosition, setSelectPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const inputRefs = useRef<Record<number, any>>({});
  const containerRef = useRef<any>(null);

  // Flatten all inputs from question form groups
  const allInputs = useMemo<QuestionInput[]>(() => {
    const inputs: QuestionInput[] = [];
    if (!question) return inputs;
    question.groups?.forEach((g) => {
      g.columns.forEach((c) => {
        c.rows.forEach((r) => {
          inputs.push(...r.inputs);
        });
      });
    });
    return inputs;
  }, [question]);

  // Whether any input belongs to `main` group. If true, use main-sub rules.
  const hasMainGroup = useMemo(() => allInputs.some((i) => i.group === 'main'), [allInputs]);

  // Hook for drag gesture & line calculations
  const {
    panResponder,
    dragLine,
    activeSourceId,
    hoverTargetId,
    onInputLayout,
    inputLayouts,
    onSelectSourceInput,
  } = useDragConnectLines({
    inputRefs,
    allInputs,
    containerRef,
    userConnections,
    onConnectionsChange,
    isReview,
  });

  const handleSelectPress = (input: SelectInput, pos: { x: number; y: number; width: number; height: number }) => {
    if (isReview) return;
    setCurrentSelectInput(input);
    setSelectPosition(pos);
    setSelectInputModalVisible(true);
  };

  const handleSelectOption = (value: string) => {
    if (currentSelectInput && currentSelectInput.id) {
      onAnswerChange(currentSelectInput.id, value);
    }
    setSelectInputModalVisible(false);
    setCurrentSelectInput(null);
  };

  const handleResetConnections = () => {
    if (isReview) return;
    onConnectionsChange([]);
  };

  // Build line geometry data for ConnectLinesOverlay
  const lineData = useMemo(() => {
    const lines: Array<ConnectLine & ConnectLineGeometry> = [];
    const correctAns = correctConnections;

    userConnections.forEach((conn, index) => {
      const srcLayout = inputLayouts[conn.from];
      const tgtLayout = inputLayouts[conn.to];
      if (!srcLayout || !tgtLayout) return;

      const sourcePoint = {
        x: srcLayout.x + srcLayout.width / 2,
        y: srcLayout.y + srcLayout.height / 2,
      };
      const targetPoint = {
        x: tgtLayout.x + tgtLayout.width / 2,
        y: tgtLayout.y + tgtLayout.height / 2,
      };

      const midpoint = getMidpoint(sourcePoint, targetPoint);
      const distance = getDistance(sourcePoint, targetPoint);
      const angle = getAngleDeg(sourcePoint, targetPoint);

      let lineColor: string = COLOR.primary;
      if (isReview) {
        const isMatched = correctAns.some((ans) => {
          if (hasMainGroup) {
            return ans.sourceRef === conn.from && ans.targetRef === conn.to;
          } else {
            return (
              (ans.sourceRef === conn.from && ans.targetRef === conn.to) ||
              (ans.sourceRef === conn.to && ans.targetRef === conn.from)
            );
          }
        });
        lineColor = isMatched ? COLOR.success : COLOR.error; // Green for correct, Red for incorrect
      }

      lines.push({
        id: `user-conn-${conn.from}-${conn.to}-${index}`,
        source: { ref: conn.from, x: 'center', y: 'center' },
        target: { ref: conn.to, x: 'center', y: 'center' },
        color: lineColor,
        stroke: 3,
        sourcePoint,
        targetPoint,
        midpoint,
        distance,
        angle,
      });
    });

    // If active dragLine exists, render it as draft line
    if (dragLine) {
      const midpoint = getMidpoint(dragLine.sourcePoint, dragLine.targetPoint);
      lines.push({
        id: 'drag-active-line',
        source: { ref: 0, x: 'center', y: 'center' },
        target: { ref: 0, x: 'center', y: 'center' },
        color: COLOR.info, // Indigo/draft color from theme
        stroke: 3,
        sourcePoint: dragLine.sourcePoint,
        targetPoint: dragLine.targetPoint,
        midpoint,
        distance: dragLine.distance,
        angle: dragLine.angle,
      });
    }

    return lines;
  }, [userConnections, inputLayouts, dragLine, isReview, question]);

  const renderInput = (
    input: QuestionInput,
    inputIndex: number,
    rowIndex: number,
    colIndex: number,
    groupIndex: number
  ) => {
    const inputId = 'id' in input ? (input as any).id : undefined;
    const inputRef = input.ref;
    const key =
      inputId !== undefined
        ? `input-${groupIndex}-${colIndex}-${rowIndex}-${inputIndex}-${input.type}-${inputId}`
        : `input-${groupIndex}-${colIndex}-${rowIndex}-${inputIndex}-${input.type}-${inputRef}`;

    const isHovered = inputRef !== undefined && hoverTargetId === inputRef;
    const isActiveSource = inputRef !== undefined && activeSourceId === inputRef;

    // If this input is a TextInput (type 'text' or 'number'), ensure it's disabled
    const inputConnect: QuestionInput =
      input.type === 'text' || input.type === 'number'
        ? ({ ...(input as ConnectTextInput), isEnabled: false } as QuestionInput)
        : input;

    return (
      <View
        key={key}
        ref={(ref) => {
          if (inputRef !== undefined) {
            inputRefs.current[inputRef] = ref;
          }
        }}
        onLayout={() => {
          if (inputRef !== undefined) {
            onInputLayout(inputRef);
          }
        }}
        onTouchStart={(evt) => {
          if (inputRef !== undefined) {
            const { pageX, pageY } = evt.nativeEvent;
            onSelectSourceInput(inputRef, pageX, pageY);
          }
        }}
        collapsable={false}
        style={[
          styles.inputItemWrapper,
          // Prefer hovered (target) style when both hovered and active source coincide
          isHovered ? styles.hoveredInputStyle : isActiveSource ? styles.activeSourceInputStyle : undefined,
        ]}
      >
        <View pointerEvents="none">
          <FormInputItem
            input={inputConnect}
            userAnswers={userAnswers}
            onAnswerChange={onAnswerChange}
            isReview={isReview}
            activeInputId={activeInputId}
            onSelectInput={onSelectInput}
            currentSelectInputId={currentSelectInput?.id}
            selectInputModalVisible={selectInputModalVisible}
            handleSelectPress={handleSelectPress}
            inputLength={999}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        ref={containerRef}
        style={styles.formContent}
        collapsable={false}
        {...panResponder.panHandlers}
      >
        <FormGroupsRender groups={question?.groups} renderInput={renderInput} />
        <ConnectLinesOverlay lineData={lineData} />
      </View>
      {userConnections && userConnections.length > 0 && (
        <View style={styles.resetWrapper}>
          <TouchableOpacity accessibilityLabel="Reset connections" onPress={handleResetConnections} style={styles.resetButton}>
            <Text style={styles.resetIcon}>↺</Text>
          </TouchableOpacity>
        </View>
      )}
      <SelectInputModal
        visible={selectInputModalVisible}
        onClose={() => setSelectInputModalVisible(false)}
        currentSelectInput={currentSelectInput}
        selectPosition={selectPosition}
        userAnswers={userAnswers}
        onSelectOption={handleSelectOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
  },
  formContent: {
    position: 'relative',
    zIndex: 0,
    overflow: 'visible',
  },
  inputItemWrapper: {
    borderRadius: SPACING.borderRadius,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: SPACING.xs,
    zIndex: 2,
  },
  hoveredInputStyle: {
    transform: [{ scale: 1.1 }],
    zIndex: 3,
    borderRadius: SPACING.borderRadius,
  },
  activeSourceInputStyle: {
    transform: [{ scale: 1.1 }],
    zIndex: 3,
    borderRadius: SPACING.borderRadius,
  },
  resetWrapper: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  resetIcon: {
    fontSize: 20,
    color: COLOR.primary,
  },
});

export default memo(QuestionConnectView);
