import { INPUT_HEIGHT, INPUT_WIDTH } from '@/constants/math.const';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { TextInputStyle } from '@/enums/math.enum';
import {
  CheckboxInput,
  ImageInput,
  LabelView,
  LineView,
  QuestionInput,
  RadioInput,
  SelectInput,
  TextInput
} from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput as RNTextInput, Text, TouchableOpacity, View } from 'react-native';
import ImageView from './ImageView';
import { SelectInputItem } from './SelectInputItem';

export const getZIndex = (input: QuestionInput): number => {
  switch (input.type) {
    case 'line': return -2;
    case 'image': return -1;
    case 'label': return 0;
    default: return input.zIndex ?? 1;
  }
};

export const resolveInputStyle = (input: { style?: any; width?: number; height?: number }): any => {
  const rawStyle = (input.style ?? {}) as any;
  const mergedStyle = { ...rawStyle };

  if (input.width !== undefined) {
    mergedStyle.width = input.width;
  }
  if (input.height !== undefined) {
    mergedStyle.height = input.height;
  }
  mergedStyle.alignItems = 'center';

  return mergedStyle;
};

export interface _Props {
  input: QuestionInput;
  userAnswers: Record<number, string>;
  onAnswerChange: (id: number, val: string) => void;
  isReview?: boolean;
  activeInputId?: number | null;
  onSelectInput?: (id: number) => void;
  currentSelectInputId?: number;
  selectInputModalVisible?: boolean;
  handleSelectPress?: (input: SelectInput, pos: any) => void;
  inputLength?: number;
  onInputLayout?: (ref: number) => void;
  inputRefCallback?: (refId: number, refElement: any) => void;
}

export const FormInputItem: React.FC<_Props> = ({
  input,
  userAnswers,
  onAnswerChange,
  isReview = false,
  activeInputId,
  onSelectInput,
  currentSelectInputId,
  selectInputModalVisible,
  handleSelectPress,
  inputLength = 2,
  onInputLayout,
  inputRefCallback,
}) => {
  const zIndex = getZIndex(input);
  const inputStyle = resolveInputStyle(input as any);
  const commonStyle: any = [{ zIndex }, inputStyle];

  switch (input.type) {
    case 'label': {
      const lbl = input as LabelView;
      const labelStyle = resolveInputStyle(lbl as any) as any;
      const textStyle = {
        ...(lbl.textStyle ?? {}),
        color: lbl.textStyle?.color ?? labelStyle.textColor ?? labelStyle.color ?? COLOR.text,
        fontSize: lbl.textStyle?.fontSize ?? SIZE.md,
        fontWeight: lbl.textStyle?.fontWeight ?? labelStyle.fontWeight ?? 'normal',
        ...(labelStyle.textAlign ? { textAlign: labelStyle.textAlign } : {}),
      };

      return (
        <View style={commonStyle}>
          <Text style={[textStyle]}>{lbl.label}</Text>
        </View>
      );
    }
    case 'number':
    case 'text': {
      const txtInput = input as TextInput;
      const isEnabled = txtInput.isEnabled !== false;
      const val = isEnabled
        ? (txtInput.id ? (userAnswers[txtInput.id] || '') : '')
        : (txtInput.value ?? '');
      const isFocused = activeInputId === txtInput.id && !isReview;

      const isCorrect = val === txtInput.value;
      const inputTextColor = isFocused
        ? COLOR.focus
        : (isReview && txtInput.id && isEnabled
          ? (isCorrect ? COLOR.success : COLOR.error)
          : (txtInput.textStyle?.color as string | undefined) ?? COLOR.text);
      const isDotInput = txtInput.inputStyle === TextInputStyle.DOT;
      const isLineView = txtInput.inputStyle === TextInputStyle.LINE;
      const isBottomLine = isDotInput || isLineView;

      let customStyle: any = {
        borderWidth: 1, borderColor: COLOR.gray, borderRadius: 3,
        backgroundColor: COLOR.white
      };

      if (isBottomLine) {
        customStyle = {
          ...customStyle,
          borderWidth: 0, borderStyle: 'solid', borderRadius: 0
        };
      }

      if (isFocused) {
        customStyle.borderColor = COLOR.focus;
        customStyle.backgroundColor = COLOR.bgFocus;
      }

      if (isReview && txtInput.id && isEnabled) {
        customStyle.borderColor = isCorrect ? COLOR.success : COLOR.error;
        customStyle.backgroundColor = isCorrect ? COLOR.bgSuccess : COLOR.bgError;
      } else if (isReview && txtInput.id) {
        customStyle.borderColor = COLOR.textSecondary;
      }

      const reviewIndicatorColor = isFocused
        ? COLOR.focus
        : (isReview && txtInput.id && isEnabled
          ? (isCorrect ? COLOR.success : COLOR.error)
          : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray));

      const inputWidth = txtInput.width || Math.max(INPUT_WIDTH, inputLength * INPUT_WIDTH / 2);
      const inputHeight = txtInput.height || INPUT_HEIGHT;

      if (txtInput.type === 'number') {
        return (
          <View
            ref={(ref) => {
              if (txtInput.ref && inputRefCallback) inputRefCallback(txtInput.ref, ref);
            }}
            onLayout={() => {
              if (txtInput.ref && onInputLayout) onInputLayout(txtInput.ref);
            }}
            collapsable={false}
            style={[
              commonStyle, customStyle,
              { width: inputWidth, height: inputHeight, justifyContent: 'center' },
              inputStyle, isFocused ? { zIndex: 12 } : {}
            ]}
          >
            {(isDotInput || isLineView) && (
              <View style={{ position: 'absolute', left: 4, right: 4, bottom: 8, alignItems: 'center' }}>
                {isLineView ? (
                  <View style={{ width: '100%', height: 1, backgroundColor: reviewIndicatorColor }} />
                ) : (
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <View key={index} style={{ width: 2, height: 2, borderRadius: 2, backgroundColor: reviewIndicatorColor, marginRight: index < 9 ? 2 : 0 }} />
                    ))}
                  </View>
                )}
              </View>
            )}
            <RNTextInput
              editable={!isReview && isEnabled}
              value={val}
              onChangeText={(text) => txtInput.id && onAnswerChange(txtInput.id, text)}
              onFocus={() => txtInput.id && onSelectInput && onSelectInput(txtInput.id)}
              textAlign={txtInput.textAlign || 'center'}
              keyboardType="number-pad"
              maxLength={inputLength > 0 ? inputLength : undefined}
              style={[
                { color: inputTextColor, fontSize: SIZE.md, fontWeight: 'bold', padding: 4, margin: 0 },
                txtInput.textStyle,
              ]}
            />
          </View>
        );
      } else {
        return (
          <View
            ref={(ref) => {
              if (txtInput.ref && inputRefCallback) inputRefCallback(txtInput.ref, ref);
            }}
            onLayout={() => {
              if (txtInput.ref && onInputLayout) onInputLayout(txtInput.ref);
            }}
            collapsable={false}
            style={[
              commonStyle, customStyle,
              { width: inputWidth, height: inputHeight, justifyContent: 'center' },
              inputStyle, isFocused ? { zIndex: 12 } : {}
            ]}
          >
            {(isDotInput || isLineView) && (
              <View style={{ position: 'absolute', left: 10, right: 10, bottom: 8, alignItems: 'center' }}>
                {isLineView ? (
                  <View style={{ width: '100%', height: 2, backgroundColor: reviewIndicatorColor }} />
                ) : (
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <View key={index} style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: reviewIndicatorColor, marginRight: index < 9 ? 2 : 0 }} />
                    ))}
                  </View>
                )}
              </View>
            )}
            <RNTextInput
              editable={!isReview && isEnabled}
              value={val}
              onChangeText={(text) => txtInput.id && onAnswerChange(txtInput.id, text)}
              onFocus={() => txtInput.id && onSelectInput && onSelectInput(txtInput.id)}
              textAlign={txtInput.textAlign || 'center'}
              keyboardType="default"
              maxLength={inputLength > 0 ? inputLength : undefined}
              style={[
                { color: inputTextColor, fontSize: SIZE.md, fontWeight: 'bold', padding: 4 },
                txtInput.textStyle,
              ]}
            />
          </View>
        );
      }
    }
    case 'select': {
      const selInput = input as SelectInput;
      const isFocused = currentSelectInputId === selInput.id && selectInputModalVisible;
      return (
        <SelectInputItem
          selInput={selInput}
          userAnswers={userAnswers}
          isReview={isReview}
          isFocused={!!isFocused}
          commonStyle={commonStyle}
          onSelectPress={(sel, pos) => handleSelectPress && handleSelectPress(sel, pos)}
          inputRef={(ref) => {
            if (selInput.ref && inputRefCallback) inputRefCallback(selInput.ref, ref);
          }}
        />
      );
    }
    case 'radio':
    case 'checkbox': {
      const rcInput = input as (RadioInput | CheckboxInput);
      const currentVal = rcInput.id ? (userAnswers[rcInput.id] || '') : '';
      const isChecked = currentVal === rcInput.value;
      const isRadio = rcInput.type === 'radio';
      const inputHeight = rcInput.height || INPUT_HEIGHT;
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isReview}
          onPress={() => rcInput.id && rcInput.value && onAnswerChange(rcInput.id, rcInput.value)}
          style={{
            flexDirection: rcInput.textAlign === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            height: inputHeight,
          }}
        >
          <Ionicons
            name={isRadio
              ? (isChecked ? 'radio-button-on' : 'radio-button-off')
              : (isChecked ? 'checkbox' : 'square-outline')}
            size={24}
            color={isChecked ? COLOR.focus : COLOR.textSecondary}
          />
          {rcInput.label ? (
            <Text style={[
              {
                fontSize: SIZE.md,
                color: COLOR.text,
                marginLeft: rcInput.textAlign === 'right' ? 0 : SPACING.xs,
                marginRight: rcInput.textAlign === 'right' ? SPACING.xs : 0,
              },
              rcInput.textStyle,
            ]}>
              {rcInput.label}
            </Text>
          ) : null}
        </TouchableOpacity>
      );
    }
    case 'image': {
      const imgInput = input as ImageInput;
      if (!imgInput.uri && !imgInput.source) return null;
      const imageStyle = resolveInputStyle(imgInput as any) as any;
      return (
        <ImageView
          uri={imgInput.uri}
          source={imgInput.source}
          width={imageStyle.width}
          height={imageStyle.height}
          style={commonStyle}
        />
      );
    }
    case 'line': {
      const lineView = input as LineView;
      const strokeColor = lineView.color || COLOR.black;
      const strokeWidth = lineView.stroke || 1;
      return (
        <View
          style={[
            commonStyle,
            { width: '100%', marginVertical: SPACING.xs }
          ]}
        >
          <View style={{ height: strokeWidth, backgroundColor: strokeColor, width: '100%' }} />
        </View>
      );
    }
    default:
      return null;
  }
};
