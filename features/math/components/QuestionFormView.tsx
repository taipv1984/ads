import { MarkdownView } from '@/components/shared/MarkdownView';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { TextInputStyle, ViewMode } from '@/enums/math.enum';
import { BlankView, CheckboxInput, ImageView, LabelView, LineView, QuestionForm, QuestionInput, RadioInput, SelectInput, TextInput } from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useState } from 'react';
import { Dimensions, Image, Modal, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface _Props {
  questionForm: QuestionForm;
  userAnswers: Record<number, string>;
  onAnswerChange: (inputId: number, value: string) => void;
  activeInputId: number | null;
  onSelectInput: (id: number | null) => void;
  viewMode?: ViewMode;
}

const getZIndex = (input: QuestionInput): number => {
  switch (input.type) {
    case 'blank': return -3;
    case 'line': return -2;
    case 'image': return -1;
    case 'label': return 0;
    default: return input.zIndex ?? 1;
  }
};

const FormImageView: React.FC<{
  uri: string;
  width?: number;
  height?: number;
  style?: any;
}> = ({ uri, width, height, style }) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(SCREEN_WIDTH - SPACING.md * 2);

  React.useEffect(() => {
    if (uri && !hasError) {
      Image.getSize(
        uri,
        (w, h) => {
          setAspectRatio(w / h);
        },
        () => {
          setHasError(true);
        }
      );
    }
  }, [uri, hasError]);

  if (!uri) return null;

  const source = hasError ? require('@/assets/images/no-image.png') : { uri };

  if (aspectRatio) {
    let imgWidth = width || 100;
    let imgHeight = height || imgWidth / aspectRatio;

    if (imgWidth > containerWidth) {
      imgWidth = containerWidth;
      imgHeight = imgWidth / aspectRatio;
    }

    return (
      <View
        style={style}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Image
          source={source}
          style={{ width: imgWidth, height: imgHeight }}
          resizeMode="contain"
          onError={() => setHasError(true)}
        />
      </View>
    );
  }

  const fallbackWidth = width || 100;
  const fallbackHeight = height || 100;
  return (
    <View style={style}>
      <Image
        source={source}
        style={{ width: fallbackWidth, height: fallbackHeight }}
        resizeMode="contain"
        onError={() => setHasError(true)}
      />
    </View>
  );
};

const QuestionFormView: React.FC<_Props> = ({
  questionForm,
  userAnswers,
  onAnswerChange,
  activeInputId,
  onSelectInput,
  viewMode = ViewMode.EDIT
}) => {
  const isReview = viewMode === ViewMode.REVIEW;
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [currentSelectInput, setCurrentSelectInput] = useState<SelectInput | null>(null);

  const handleSelectPress = (input: SelectInput) => {
    if (isReview) return;
    setCurrentSelectInput(input);
    setSelectModalVisible(true);
  };

  const handleSelectOption = (value: string) => {
    if (currentSelectInput && currentSelectInput.id) {
      onAnswerChange(currentSelectInput.id, value);
    }
    setSelectModalVisible(false);
    setCurrentSelectInput(null);
  };

  // Toggle layout helpers used by line rendering
  const renderInput = (input: QuestionInput) => {
    const inputId = 'id' in input ? (input as any).id : undefined;
    const key = `input-${input.type}-${inputId || Math.random()}`;
    const zIndex = getZIndex(input);

    let content = null;
    const commonStyle = { zIndex };

    switch (input.type) {
      case 'label': {
        const lbl = input as LabelView;
        content = (
          <View style={commonStyle} key={key}>
            <MarkdownView text={lbl.label} style={{ color: lbl.color || COLOR.text, fontSize: SIZE.md }} />
          </View>
        );
        break;
      }
      case 'number':
      case 'text': {
        const txtInput = input as TextInput;
        const val = txtInput.id ? (userAnswers[txtInput.id] || '') : '';
        const isFocused = activeInputId === txtInput.id && !isReview;

        let borderStyle: any = { borderWidth: 1, borderColor: COLOR.textSecondary, borderRadius: 4, backgroundColor: COLOR.white };
        if (txtInput.style === TextInputStyle.DOT) {
          borderStyle = { borderBottomWidth: 2, borderStyle: 'dotted', borderColor: COLOR.textSecondary, backgroundColor: 'transparent' };
        } else if (txtInput.style === TextInputStyle.LINE) {
          borderStyle = { borderBottomWidth: 1, borderStyle: 'solid', borderColor: COLOR.textSecondary, backgroundColor: 'transparent' };
        } else if (txtInput.style === TextInputStyle.CIRCLE) {
          borderStyle = { borderWidth: 1, borderColor: COLOR.textSecondary, borderRadius: 999, backgroundColor: COLOR.white };
        } else if (txtInput.style === TextInputStyle.BLANK) {
          borderStyle = { borderWidth: 0, backgroundColor: 'transparent' };
        }

        if (isFocused) {
          borderStyle.borderColor = COLOR.focus;
          if (txtInput.style === TextInputStyle.BOX || txtInput.style === TextInputStyle.CIRCLE) {
            borderStyle.backgroundColor = COLOR.bgFocus;
          }
        }

        // Apply review mode styling if applicable
        if (isReview && txtInput.id) {
          // If we had a correct answer to compare, we would do it here. 
          // Assuming userAnswers has the final submitted answer.
          borderStyle.borderColor = COLOR.textSecondary;
        }

        const inputWidth = txtInput.width || Math.max(40, (questionForm.inputLength || 1) * 20);
        const inputHeight = txtInput.height || 40;

        if (txtInput.type === 'number') {
          content = (
            <TouchableOpacity
              key={key}
              activeOpacity={0.7}
              disabled={isReview}
              onPress={() => txtInput.id && onSelectInput(txtInput.id)}
              style={[
                commonStyle,
                borderStyle,
                { width: inputWidth, height: inputHeight, justifyContent: 'center', alignItems: 'center' }
              ]}
            >
              <Text style={{
                color: isFocused ? COLOR.focus : (txtInput.textColor || COLOR.text),
                fontSize: SIZE.md,
                fontWeight: 'bold',
                textAlign: txtInput.textAlign || 'center'
              }}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        } else {
          content = (
            <View key={key} style={[commonStyle, borderStyle, { width: inputWidth, height: inputHeight, justifyContent: 'center' }]}>
              <RNTextInput
                editable={!isReview}
                value={val}
                onChangeText={(text) => txtInput.id && onAnswerChange(txtInput.id, text)}
                onFocus={() => txtInput.id && onSelectInput(txtInput.id)}
                textAlign={txtInput.textAlign || 'center'}
                style={{
                  color: isFocused ? COLOR.focus : (txtInput.textColor || COLOR.text),
                  fontSize: SIZE.md,
                  fontWeight: 'bold',
                  flex: 1,
                  padding: 0,
                  margin: 0
                }}
              />
            </View>
          );
        }
        break;
      }
      case 'select': {
        const selInput = input as SelectInput;
        const val = selInput.id ? (userAnswers[selInput.id] || '') : '';
        const inputWidth = selInput.width || 80;
        const inputHeight = selInput.height || 40;

        content = (
          <TouchableOpacity
            key={key}
            activeOpacity={0.7}
            disabled={isReview}
            onPress={() => handleSelectPress(selInput)}
            style={[
              commonStyle,
              { width: inputWidth, height: inputHeight, borderWidth: 1, borderColor: COLOR.textSecondary, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.white, flexDirection: 'row' }
            ]}
          >
            <Text style={{ fontSize: SIZE.md, color: COLOR.text, flex: 1, textAlign: 'center' }}>
              {val || 'Chọn'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={COLOR.textSecondary} style={{ paddingRight: 4 }} />
          </TouchableOpacity>
        );
        break;
      }
      case 'radio':
      case 'checkbox': {
        const rcInput = input as (RadioInput | CheckboxInput);
        const currentVal = rcInput.id ? (userAnswers[rcInput.id] || '') : '';
        const isChecked = currentVal === rcInput.value;
        const isRadio = rcInput.type === 'radio';

        content = (
          <TouchableOpacity
            key={key}
            activeOpacity={0.7}
            disabled={isReview}
            onPress={() => rcInput.id && rcInput.value && onAnswerChange(rcInput.id, rcInput.value)}
            style={[
              commonStyle,
              { flexDirection: rcInput.textAlign === 'right' ? 'row-reverse' : 'row', alignItems: 'center', marginHorizontal: SPACING.xs }
            ]}
          >
            <Ionicons
              name={isRadio ? (isChecked ? "radio-button-on" : "radio-button-off") : (isChecked ? "checkbox" : "square-outline")}
              size={24}
              color={isChecked ? COLOR.focus : COLOR.textSecondary}
            />
            {rcInput.label && (
              <Text style={{ fontSize: SIZE.md, color: COLOR.text, marginHorizontal: SPACING.xs }}>
                {rcInput.label}
              </Text>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case 'image': {
        const imgInput = input as ImageView;
        if (!imgInput.uri) return null;
        content = (
          <FormImageView
            key={key}
            uri={imgInput.uri}
            width={imgInput.width}
            height={imgInput.height}
            style={commonStyle}
          />
        );
        break;
      }
      case 'line': {
        const lineInput = input as LineView;
        const strokeColor = lineInput.color || COLOR.black;
        const strokeWidth = lineInput.strokeWidth || 2;
        content = (
          <View key={key} style={[commonStyle, { width: '100%', height: strokeWidth, backgroundColor: strokeColor, marginVertical: SPACING.xs }]} />
        );
        break;
      }
      case 'blank': {
        const blankInput = input as BlankView;
        content = (
          <View key={key} style={[commonStyle, { width: '100%', height: blankInput.height || SPACING.md, backgroundColor: 'transparent' }]} />
        );
        break;
      }
      default:
        break;
    }
    return content;
  };

  const renderGroups = () => {
    if (!questionForm.groups || questionForm.groups.length === 0) return null;

    return (
      <View style={styles.groupsContainer}>
        {questionForm.groups.map((group, gIdx) => (
          <View key={`group-${gIdx}`} style={[styles.groupWrapper, group.style]}>
            {group.label && (
              <View style={styles.groupLabelContainer}>
                <Text style={styles.groupLabelText}>{group.label}</Text>
              </View>
            )}
            <View style={styles.columnsContainer}>
              {group.columns.map((col, cIdx) => (
                <View key={`col-${cIdx}`} style={[styles.columnWrapper, col.style]}>
                  {col.rows.map((row, rIdx) => (
                    <View key={`row-${rIdx}`} style={styles.rowWrapper}>
                      {row.map((input) => renderInput(input))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderSelectModal = () => {
    if (!currentSelectInput) return null;

    let options: string[] = [];
    if (currentSelectInput.valueOptions) {
      try {
        options = JSON.parse(currentSelectInput.valueOptions);
      } catch (e) {
        options = currentSelectInput.valueOptions.split(',');
      }
    }

    return (
      <Modal
        visible={selectModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn đáp án</Text>
              <TouchableOpacity onPress={() => setSelectModalVisible(false)}>
                <Ionicons name="close-circle" size={24} color={COLOR.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 250, width: '100%' }} showsVerticalScrollIndicator={false}>
              {options.map((opt, idx) => (
                <TouchableOpacity
                  key={`opt-${idx}`}
                  style={styles.modalOption}
                  onPress={() => handleSelectOption(opt)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.modalOptionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setSelectModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderGroups()}
      {renderSelectModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  groupsContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  groupWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
  },
  groupLabelContainer: {
    marginRight: SPACING.sm,
    paddingTop: SPACING.xs,
  },
  groupLabelText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 100,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
    marginVertical: 2,
  },
  absoluteContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: SPACING.lg,
    alignItems: 'center',
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
    paddingBottom: SPACING.sm,
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    color: COLOR.primary,
  },
  modalOption: {
    width: '100%',
    paddingVertical: SPACING.md,
    backgroundColor: COLOR.background,
    borderRadius: 10,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.grayLight,
  },
  modalOptionText: {
    fontSize: SIZE.md,
    fontWeight: '600',
    color: COLOR.text,
  },
  modalCancelButton: {
    width: '100%',
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
    backgroundColor: COLOR.grayLight,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.textSecondary,
  }
});

export default memo(QuestionFormView);
