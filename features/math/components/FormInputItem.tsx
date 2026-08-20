import { INPUT_HEIGHT, INPUT_WIDTH } from '@/constants/math.const';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { TextInputStyle } from '@/enums/math.enum';
import {
  CheckboxInput, ImageView,
  LabelView,
  LineView,
  QuestionInput,
  RadioInput,
  SelectInput,
  TextInput
} from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, TextInput as RNTextInput, Text, TouchableOpacity, View } from 'react-native';
import { SelectInputItem } from './SelectInputItem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  return mergedStyle;
};

export const FormImageView: React.FC<{
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
        (w, h) => setAspectRatio(w / h),
        () => setHasError(true)
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
  inputLength = 1,
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

      return (
        <View style={[commonStyle, containerStyle]}>
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
      const inputTextColor = isFocused ? COLOR.focus : ((txtInput.style as any)?.color || COLOR.text);
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
          borderWidth: 0, borderStyle: 'solid', borderRadius: 0
        };
      }

      if (isFocused) {
        customStyle.borderColor = COLOR.focus;
        customStyle.backgroundColor = COLOR.bgFocus;
      }

      if (isReview && txtInput.id) {
        customStyle.borderColor = COLOR.textSecondary;
      }

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
            {(isDotInput || isLineInput) && (
              <View style={{ position: 'absolute', left: 4, right: 4, bottom: 8, alignItems: 'center' }}>
                {isLineInput ? (
                  <View style={{ width: '100%', height: 1, backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray) }} />
                ) : (
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <View key={index} style={{ width: 2, height: 2, borderRadius: 2, backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray), marginRight: index < 9 ? 2 : 0 }} />
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
              maxLength={inputLength}
              style={{ color: inputTextColor, fontSize: SIZE.md, fontWeight: 'bold', padding: 4, margin: 0 }}
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
            {(isDotInput || isLineInput) && (
              <View style={{ position: 'absolute', left: 10, right: 10, bottom: 8, alignItems: 'center' }}>
                {isLineInput ? (
                  <View style={{ width: '100%', height: 2, backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray) }} />
                ) : (
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <View key={index} style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: isFocused ? COLOR.focus : (isReview && txtInput.id ? COLOR.textSecondary : COLOR.gray), marginRight: index < 9 ? 2 : 0 }} />
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
              maxLength={inputLength}
              style={{ color: inputTextColor, fontSize: SIZE.md, fontWeight: 'bold', padding: 4 }}
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
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isReview}
          onPress={() => rcInput.id && rcInput.value && onAnswerChange(rcInput.id, rcInput.value)}
          style={{
            flexDirection: rcInput.textAlign === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            paddingHorizontal: SPACING.xs,
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
            <Text style={{
              fontSize: SIZE.md,
              color: COLOR.text,
              marginLeft: rcInput.textAlign === 'right' ? 0 : SPACING.xs,
              marginRight: rcInput.textAlign === 'right' ? SPACING.xs : 0,
            }}>
              {rcInput.label}
            </Text>
          ) : null}
        </TouchableOpacity>
      );
    }
    case 'image': {
      const imgInput = input as ImageView;
      if (!imgInput.uri) return null;
      const imageStyle = resolveInputStyle(imgInput as any) as any;
      return (
        <FormImageView
          uri={imgInput.uri}
          width={imageStyle.width}
          height={imageStyle.height}
          style={commonStyle}
        />
      );
    }
    case 'line': {
      const lineInput = input as LineView;
      const strokeColor = lineInput.color || COLOR.black;
      const strokeWidth = lineInput.stroke || 1;
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
