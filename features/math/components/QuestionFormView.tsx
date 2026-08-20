import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { useConnectLines } from '@/hooks/useConnectLines';
import {
  QuestionForm, QuestionInput,
  SelectInput
} from '@/services/types/question.types';
import React, { memo, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet, Text,
  View
} from 'react-native';
import ConnectLinesOverlay from './ConnectLinesOverlay';
import { SelectInputModal } from './SelectInputModal';
import { FormInputItem } from './FormInputItem';

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

  // ── ConnectLines: tự động vẽ sau khi TextInput layout xong ────────────────
  // containerRef trỏ vào formContent View — cần để tính offset page → local coords
  const containerRef = useRef<any>(null);
  const { lineData, onInputLayout } = useConnectLines(
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

  const renderGroups = () => {
    if (!questionForm.groups || questionForm.groups.length === 0) return null;

    return (
      <View style={styles.groupsContainer}>
        {questionForm.groups.map((group, gIdx) => (
          <React.Fragment key={`group-${gIdx}`}>
            {group.label && (
              <View style={styles.groupLabelContainer}>
                <Text style={styles.groupLabelText}>{group.label}</Text>
              </View>
            )}
            <View style={[styles.groupWrapper, group.style]}>
              <View style={styles.columnsContainer}>
                {group.columns.map((col, cIdx) => (
                  <View key={`col-${cIdx}`} style={[styles.columnWrapper, col.style]}>
                    {col.rows.map((row, rIdx) => (
                      <View key={`row-${rIdx}`} style={[styles.rowWrapper, row.style]}>
                        {row.inputs.map((input, inputIndex) => renderInput(input, inputIndex, rIdx, cIdx, gIdx))}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </React.Fragment>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/*
        formContent: position relative + ref để:
        1. overlay (absoluteFillObject) canh đúng vùng form
        2. hook đo offset page→local khi tính tọa độ đường nối
      */}
      <View ref={containerRef} style={styles.formContent} collapsable={false}>
        {renderGroups()}
        {/* Overlay vẽ đường nối, pointerEvents=none nên không chặn touch */}
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
  groupsContainer: {
    width: '100%',
    flexDirection: 'column',
    // borderWidth: 1, //dev
  },
  groupWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
  },
  groupLabelContainer: {
    width: '100%',
    marginBottom: SPACING.sm,
    // borderWidth: 1, //dev
  },
  groupLabelText: {
    fontSize: SIZE.md,
    color: COLOR.text,
  },
  columnsContainer: {
    flex: 1,
    gap: SPACING.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 96,
    // borderWidth: 1, //dev
    // borderColor: 'red', //dev
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // borderWidth: 1, //dev
    // borderColor: 'green', //dev
  },
  absoluteContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export default memo(QuestionFormView);
