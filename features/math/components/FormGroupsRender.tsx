import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { FormGroup, QuestionInput } from '@/services/types/question.types';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface _Props {
  groups?: FormGroup[];
  renderInput: (input: QuestionInput, inputIndex: number, rowIndex: number, colIndex: number, groupIndex: number) => React.ReactNode;
}

const FormGroupsRender: React.FC<_Props> = ({ groups, renderInput }) => {
  if (!groups || groups.length === 0) return null;

  return (
    <View style={styles.groupsContainer}>
      {groups.map((group, gIdx) => (
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

const styles = StyleSheet.create({
  groupsContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  groupWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    alignItems: 'flex-start',
  },
  groupLabelContainer: {
    width: '100%',
    marginBottom: SPACING.md,
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
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default memo(FormGroupsRender);
