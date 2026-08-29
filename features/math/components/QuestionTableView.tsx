import { CELL_HEIGHT } from '@/constants/math.const';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { ViewMode } from '@/enums/math.enum';
import { QuestionTable, SelectInput, TableCell } from '@/services/types/question.types';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormInputItem } from './FormInputItem';
import { SelectInputModal } from './SelectInputModal';

interface _Props {
  questionTable: QuestionTable;
  userAnswers: Record<number, string>;
  onAnswerChange: (id: number, answer: string) => void;
  activeInputId?: number | null;
  onSelectInput?: (id: number) => void;
  viewMode?: ViewMode;
}

const QuestionTableView: React.FC<_Props> = ({
  questionTable,
  userAnswers,
  onAnswerChange,
  activeInputId,
  onSelectInput = () => { },
  viewMode = ViewMode.EDIT,
}) => {
  const isReview = viewMode === ViewMode.REVIEW;
  const {
    columnCount = 1,
    borderWidth = 1,
    borderColor = COLOR.gray,
    borderStyle = 'solid'
  } = questionTable;
  const rows = questionTable.rows;

  const [selectInputModalVisible, setSelectInputModalVisible] = useState(false);
  const [currentSelectInput, setCurrentSelectInput] = useState<SelectInput | null>(null);
  const [selectPosition, setSelectPosition] = useState<{ x: number, y: number, width: number, height: number } | null>(null);

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

  const flatCells = useMemo(() => {
    const numRows = rows.length;
    const occupiedMatrix: boolean[][] = Array.from({ length: numRows }, () =>
      Array(columnCount).fill(false)
    );

    const cellsWithPosition: (TableCell & {
      rowIndex: number;
      colIndex: number;
      renderedColspan: number;
      renderedRowspan: number;
    })[] = [];

    rows.forEach((row, rowIndex) => {
      let colIndex = 0;
      row.cells.forEach((cell) => {
        while (colIndex < columnCount && occupiedMatrix[rowIndex][colIndex]) {
          colIndex++;
        }

        const colspan = cell.colspan || 1;
        const rowspan = cell.rowspan || 1;

        for (let r = 0; r < rowspan; r++) {
          for (let c = 0; c < colspan; c++) {
            if (rowIndex + r < numRows && colIndex + c < columnCount) {
              occupiedMatrix[rowIndex + r][colIndex + c] = true;
            }
          }
        }

        cellsWithPosition.push({
          ...cell,
          rowIndex,
          colIndex,
          renderedColspan: colspan,
          renderedRowspan: rowspan,
        });

        colIndex += colspan;
      });
    });
    return cellsWithPosition;
  }, [rows, columnCount]);

  const numRows = rows.length;
  const containerHeight = numRows * CELL_HEIGHT;

  const renderCellContent = (cell: typeof flatCells[0]) => {
    if (cell.label) {
      return <Text style={[styles.labelText, cell.textStyle]}>{cell.label}</Text>;
    }
    if (cell.input) {
      return (
        <FormInputItem
          input={cell.input}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
          isReview={isReview}
          activeInputId={activeInputId}
          onSelectInput={onSelectInput}
          currentSelectInputId={currentSelectInput?.id}
          selectInputModalVisible={selectInputModalVisible}
          handleSelectPress={handleSelectPress}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={{ minHeight: containerHeight }}>
        <View style={[
          styles.tableContainer,
          {
            height: containerHeight,
            ...(borderWidth > 0 ? {
              borderTopWidth: borderWidth,
              borderLeftWidth: borderWidth,
              borderColor: borderColor,
              borderStyle: borderStyle,
            } : {})
          }
        ]}>
          {flatCells.map((cell, index) => {
            const leftPercent = (cell.colIndex / columnCount) * 100;
            const widthPercent = (cell.renderedColspan / columnCount) * 100;
            const top = cell.rowIndex * CELL_HEIGHT;
            const height = cell.renderedRowspan * CELL_HEIGHT;
            return (
              <View
                key={`cell_${index}`}
                style={[
                  styles.cellBase,
                  {
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    top,
                    height,
                    ...(borderWidth > 0 ? {
                      borderRightWidth: borderWidth,
                      borderBottomWidth: borderWidth,
                      borderColor: borderColor,
                      borderStyle: borderStyle,
                    } : {})
                  },
                  cell.style
                ]}
              >
                {renderCellContent(cell)}
              </View>
            );
          })}
        </View>
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
  tableContainer: {
    width: '100%',
    position: 'relative',
    alignSelf: 'center',
  },
  cellBase: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: COLOR.white,
  },
  headerText: {
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  labelText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.text,
  },
});

export default QuestionTableView;
