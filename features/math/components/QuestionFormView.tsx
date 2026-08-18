import { INPUT_HEIGHT } from '@/constants/math.const';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { TextInputStyle, ViewMode } from '@/enums/math.enum';
import { useConnectLines } from '@/hooks/useConnectLines';
import {
  CheckboxInput, ImageView, LabelView, LineView, QuestionForm, QuestionInput,
  RadioInput, SelectInput, TextInput
} from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useRef, useState } from 'react';
import {
  Dimensions, Image, Modal, Platform,
  TextInput as RNTextInput, ScrollView,
  StatusBar,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import ConnectLinesOverlay from './ConnectLinesOverlay';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
    case 'line': return -2;
    case 'image': return -1;
    case 'label': return 0;
    default: return input.zIndex ?? 1;
  }
};

const resolveInputStyle = (input: { style?: any; width?: number; height?: number }): any => {
  const rawStyle = (input.style ?? {}) as any;
  const mergedStyle = { ...rawStyle };

  if (input.width !== undefined) {
    mergedStyle.width = input.width;
  }
  if (input.height !== undefined) {
    mergedStyle.height = input.height;
  }

  return mergedStyle;
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

const SelectInputItem: React.FC<{
  selInput: SelectInput;
  userAnswers: Record<number, string>;
  isReview: boolean;
  isFocused: boolean;
  commonStyle: any;
  onSelectPress: (input: SelectInput, pos: { x: number, y: number, width: number, height: number }) => void;
  inputRef?: (ref: any) => void;
}> = memo(({ selInput, userAnswers, isReview, isFocused, commonStyle, onSelectPress, inputRef }) => {
  const val = selInput.id ? (userAnswers[selInput.id] || '') : '';
  const inputWidth = selInput.width || 80;
  const inputHeight = selInput.height || INPUT_HEIGHT;
  const selectRef = React.useRef<any>(null);

  const handlePress = () => {
    selectRef.current?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      onSelectPress(selInput, { x: pageX, y: pageY, width, height });
    });
  };

  const borderColor = isFocused ? COLOR.focus : COLOR.gray;
  const textColor = val ? COLOR.focus : COLOR.text;

  return (
    <TouchableOpacity
      ref={(ref) => {
        selectRef.current = ref;
        inputRef?.(ref);
      }}
      activeOpacity={0.7}
      disabled={isReview}
      onPress={handlePress}
      style={[
        commonStyle,
        {
          width: inputWidth, height: inputHeight, borderWidth: 1, borderColor: borderColor, borderRadius: 3,
          justifyContent: 'center', alignItems: 'center',
          backgroundColor: COLOR.white, flexDirection: 'row'
        }
      ]}
    >
      <Text style={{ fontSize: SIZE.md, color: textColor, flex: 1, textAlign: 'center', fontWeight: val ? 'bold' : 'normal' }}>
        {val || '?'}
      </Text>
      <Ionicons name="caret-down" size={16} color={COLOR.textSecondary} style={{ paddingRight: 4 }} />
    </TouchableOpacity>
  );
});

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
  const renderInput = (input: QuestionInput, inputIndex: number, rowIndex: number, colIndex: number, groupIndex: number) => {
    const inputId = 'id' in input ? (input as any).id : undefined;
    const key = inputId !== undefined
      ? `input-${groupIndex}-${colIndex}-${rowIndex}-${inputIndex}-${input.type}-${inputId}`
      : `input-${groupIndex}-${colIndex}-${rowIndex}-${inputIndex}-${input.type}`;
    const zIndex = getZIndex(input);

    let content = null;
    const inputStyle = resolveInputStyle(input as any);
    const commonStyle: any = [{ zIndex }, inputStyle];

    switch (input.type) {
      case 'label': {
        const lbl = input as LabelView;
        const labelStyle = resolveInputStyle(lbl as any) as any;
        const containerStyle = {
          ...(labelStyle.width !== undefined ? { width: labelStyle.width } : {}),
          ...(labelStyle.height !== undefined ? { height: labelStyle.height } : {}),
          justifyContent: 'center',
          alignItems: 'center',
        };
        const textStyle = {
          color: labelStyle.textColor ?? labelStyle.color ?? COLOR.text,
          fontSize: SIZE.md,
          fontWeight: labelStyle.fontWeight ?? 'normal',
          ...(labelStyle.textAlign ? { textAlign: labelStyle.textAlign } : {}),
        };

        content = (
          <View
            style={[commonStyle, containerStyle]}
            key={key}
          >
            <Text style={[textStyle]}>
              {lbl.label}
            </Text>
          </View>
        );
        break;
      }
      case 'number':
      case 'text': {
        const txtInput = input as TextInput;
        const isEnabled = txtInput.isEnabled !== false;
        const val = isEnabled
          ? (txtInput.id ? (userAnswers[txtInput.id] || '') : '')
          : (txtInput.value ?? '');
        const isFocused = activeInputId === txtInput.id && !isReview;
        const inputTextColor = isFocused
          ? COLOR.focus
          : ((txtInput.style as any)?.color || COLOR.text);
        const isDotInput = txtInput.inputStyle === TextInputStyle.DOT;
        const isLineInput = txtInput.inputStyle === TextInputStyle.LINE;
        const isBottomLine = isDotInput || isLineInput;

        let customStyle: any = {
          borderWidth: 1, borderColor: COLOR.gray, borderRadius: 3,
          backgroundColor: COLOR.bgFocus
        };

        if (isBottomLine) {
          customStyle = {
            ...customStyle,
            borderWidth: 0, borderStyle: 'solid',
            borderRadius: 0
          };
        }

        if (isFocused) {
          customStyle.borderColor = COLOR.focus;
          customStyle.backgroundColor = COLOR.bgFocus;
        }

        // Apply review mode styling if applicable
        if (isReview && txtInput.id) {
          customStyle.borderColor = COLOR.textSecondary;
        }

        const inputLength = questionForm.inputLength ?? 1
        const inputWidth = txtInput.width || Math.max(40, inputLength * 20);
        const inputHeight = txtInput.height || INPUT_HEIGHT;

        if (txtInput.type === 'number') {
          content = (
            <View
              key={key}
              ref={(ref) => {
                if (txtInput.ref) {
                  inputRefs.current[txtInput.ref] = ref;
                }
              }}
              onLayout={() => {
                if (txtInput.ref) onInputLayout(txtInput.ref);
              }}
              collapsable={false}
              style={[
                commonStyle,
                customStyle,
                {
                  width: inputWidth,
                  height: inputHeight,
                  justifyContent: 'center',
                },
                inputStyle,
                isFocused ? { zIndex: 12 } : {}
              ]}
            >
              {(isDotInput || isLineInput) && (
                <View style={{
                  position: 'absolute',
                  left: 4,
                  right: 4,
                  bottom: 8,
                  alignItems: 'center',
                }}>
                  {isLineInput ? (
                    <View style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray),
                    }} />
                  ) : (
                    <View style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      overflow: 'hidden',
                      // borderWidth: 1,
                    }}>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <View
                          key={index}
                          style={{
                            width: 2,
                            height: 2,
                            borderRadius: 2,
                            backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray),
                            marginRight: index < 9 ? 2 : 0,
                          }}
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}
              <RNTextInput
                editable={!isReview && isEnabled}
                value={val}
                onChangeText={(text) => txtInput.id && onAnswerChange(txtInput.id, text)}
                onFocus={() => txtInput.id && onSelectInput(txtInput.id)}
                textAlign={txtInput.textAlign || 'center'}
                keyboardType="number-pad"
                maxLength={inputLength}
                style={{
                  color: inputTextColor,
                  fontSize: SIZE.md,
                  fontWeight: 'bold',
                  padding: 4,
                  margin: 0,
                }}
              />
            </View>
          );
        } else {
          content = (
            <View
              key={key}
              ref={(ref) => {
                if (txtInput.ref) {
                  inputRefs.current[txtInput.ref] = ref;
                }
              }}
              onLayout={() => {
                if (txtInput.ref) onInputLayout(txtInput.ref);
              }}
              collapsable={false}
              style={[
                commonStyle,
                customStyle,
                {
                  width: inputWidth,
                  height: inputHeight,
                  justifyContent: 'center',
                },
                inputStyle,
                isFocused ? { zIndex: 12 } : {}
              ]}
            >
              {(isDotInput || isLineInput) && (
                <View style={{
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: 8,
                  alignItems: 'center',
                }}>
                  {isLineInput ? (
                    <View style={{
                      width: '100%',
                      height: 2,
                      backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray),
                    }} />
                  ) : (
                    <View style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <View
                          key={index}
                          style={{
                            width: 3,
                            height: 3,
                            borderRadius: 1.5,
                            backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray),
                            marginRight: index < 9 ? 2 : 0,
                          }}
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}
              <RNTextInput
                editable={!isReview && isEnabled}
                value={val}
                onChangeText={(text) => txtInput.id && onAnswerChange(txtInput.id, text)}
                onFocus={() => txtInput.id && onSelectInput(txtInput.id)}
                textAlign={txtInput.textAlign || 'center'}
                keyboardType="default"
                maxLength={inputLength}
                style={{
                  color: inputTextColor,
                  fontSize: SIZE.md,
                  fontWeight: 'bold',
                  padding: 4,
                }}
              />
            </View>
          );
        }
        break;
      }
      case 'select': {
        const selInput = input as SelectInput;
        const isFocused = currentSelectInput?.id === selInput.id && selectModalVisible;
        content = (
          <SelectInputItem
            key={key}
            selInput={selInput}
            userAnswers={userAnswers}
            isReview={isReview}
            isFocused={isFocused}
            commonStyle={commonStyle}
            onSelectPress={handleSelectPress}
            inputRef={(ref) => {
              if (selInput.ref) {
                inputRefs.current[selInput.ref] = ref;
              }
            }}
          />
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
        const imageStyle = resolveInputStyle(imgInput as any) as any;
        content = (
          <FormImageView
            key={key}
            uri={imgInput.uri}
            width={imageStyle.width}
            height={imageStyle.height}
            style={commonStyle}
          />
        );
        break;
      }
      case 'line': {
        const lineInput = input as LineView;
        const strokeColor = lineInput.color || COLOR.black;
        const strokeWidth = lineInput.stroke || 1;
        content = (
          <View
            key={key}
            style={[
              commonStyle,
              {
                width: '100%',
                marginVertical: SPACING.xs,
              }
            ]}
          >
            <View style={{ height: strokeWidth, backgroundColor: strokeColor, width: '100%' }} />
          </View>
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

  const renderSelectModal = () => {
    if (!currentSelectInput || !selectPosition) return null;

    let options: string[] = [];
    if (currentSelectInput.valueOptions) {
      try {
        options = JSON.parse(currentSelectInput.valueOptions);
      } catch (e) {
        options = currentSelectInput.valueOptions.split(',');
      }
    }

    const spaceBelow = SCREEN_HEIGHT - (selectPosition.y + selectPosition.height);
    const spaceAbove = selectPosition.y;
    const itemHeight = INPUT_HEIGHT;
    const listHeight = Math.min(200, options.length * itemHeight);

    // On Android, pageY includes the status bar, but Modal top 0 might be below the status bar, causing a gap.
    const statusBarOffset = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;
    const adjustedY = selectPosition.y - statusBarOffset;

    const dropdownMinWidth = 80;
    const dropdownWidth = Math.max(dropdownMinWidth, selectPosition.width);
    const dropdownLeft = selectPosition.x + (selectPosition.width / 2) - (dropdownWidth / 2);

    let dropdownStyle: any = {
      position: 'absolute',
      left: dropdownLeft,
      width: dropdownWidth,
      backgroundColor: COLOR.white,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: COLOR.focus,
      overflow: 'hidden',
      maxHeight: 200,
    };

    if (spaceBelow >= listHeight || spaceBelow > spaceAbove) {
      dropdownStyle.top = adjustedY + selectPosition.height;
    } else {
      dropdownStyle.bottom = SCREEN_HEIGHT - adjustedY;
    }

    return (
      <Modal
        visible={selectModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setSelectModalVisible(false)}
        >
          <View style={dropdownStyle}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
              {options.map((opt, idx) => {
                const isSelected = currentSelectInput?.id ? userAnswers[currentSelectInput.id] === opt : false;
                return (
                  <TouchableOpacity
                    key={`opt-${idx}`}
                    style={{
                      height: INPUT_HEIGHT,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: idx < options.length - 1 ? 1 : 0,
                      borderBottomColor: COLOR.grayLight,
                      backgroundColor: isSelected ? COLOR.grayLight : 'transparent',
                    }}
                    onPress={() => handleSelectOption(opt)}
                  >
                    <Text style={{
                      fontSize: SIZE.md,
                      color: COLOR.text,
                      textAlign: 'center'
                    }}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
      {renderSelectModal()}
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
