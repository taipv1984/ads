import { SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { useDrawConnectLines } from '@/hooks/useDrawConnectLines';
import { QuestionForm, QuestionInput, SelectInput } from '@/services/types/question.types';
import React, { memo, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import ConnectLinesOverlay from './ConnectLinesOverlay';
import FormGroupsRender from './FormGroupsRender';
import { FormInputItem } from './FormInputItem';
import { SelectInputModal } from './SelectInputModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface _Props {
  questionForm: QuestionForm;
  userAnswers: Record<number, string>;
  onAnswerChange: (inputId: number, value: string) => void;
  activeInputId: number | null;
  onSelectInput: (id: number | null) => void;
  viewMode?: ViewMode;
}

const QuestionFormView: React.FC<_Props> = ({
  questionForm,
  userAnswers,
  onAnswerChange,
  activeInputId,
  onSelectInput,
  viewMode = ViewMode.EDIT
}) => {
  const isReview = viewMode === ViewMode.REVIEW;
  const [selectInputModalVisible, setSelectInputModalVisible] = useState(false);
  const [currentSelectInput, setCurrentSelectInput] = useState<SelectInput | null>(null);
  const inputRefs = useRef<Record<number, any>>({});
  const [selectPosition, setSelectPosition] = useState<{ x: number, y: number, width: number, height: number } | null>(null);

  const containerRef = useRef<any>(null);
  const { lineData, onInputLayout } = useDrawConnectLines(
    questionForm.connectLines,
    inputRefs,
    containerRef,
    questionForm.id,
  );

  const handleSelectPress = (input: SelectInput, pos: { x: number, y: number, width: number, height: number }) => {
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

  // Toggle layout helpers used by line rendering
  const renderInput = (input: QuestionInput, inputIndex: number, rowIndex: number, colIndex: number, groupIndex: number) => {
    const inputId = 'id' in input ? (input as any).id : undefined;
    const key = inputId !== undefined
      ? `input-${groupIndex}-${colIndex}-${rowIndex}-${inputIndex}-${input.type}-${inputId}`
      : `input-${groupIndex}-${colIndex}-${rowIndex}-${inputIndex}-${input.type}`;

    return (
      <FormInputItem
        key={key}
        input={input}
        userAnswers={userAnswers}
        onAnswerChange={onAnswerChange}
        isReview={isReview}
        activeInputId={activeInputId}
        onSelectInput={onSelectInput}
        currentSelectInputId={currentSelectInput?.id}
        selectInputModalVisible={selectInputModalVisible}
        handleSelectPress={handleSelectPress}
        inputLength={questionForm.inputLength}
        onInputLayout={onInputLayout}
        inputRefCallback={(refId, refElement) => {
          if (refId) {
            inputRefs.current[refId] = refElement;
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View ref={containerRef} style={styles.formContent} collapsable={false}>
        <FormGroupsRender groups={questionForm.groups} renderInput={renderInput} />
        <ConnectLinesOverlay lineData={lineData} />
      </View>
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
  absoluteContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export default memo(QuestionFormView);
