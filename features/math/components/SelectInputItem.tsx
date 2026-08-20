import { INPUT_HEIGHT } from '@/constants/math.const';
import { COLOR, SIZE } from '@/constants/theme';
import { SelectInput } from '@/services/types/question.types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface SelectInputItemProps {
  selInput: SelectInput;
  userAnswers: Record<number, string>;
  isReview: boolean;
  isFocused: boolean;
  commonStyle?: any;
  onSelectPress: (input: SelectInput, pos: { x: number; y: number; width: number; height: number }) => void;
  inputRef?: (ref: any) => void;
}

export const SelectInputItem: React.FC<SelectInputItemProps> = memo(({
  selInput,
  userAnswers,
  isReview,
  isFocused,
  commonStyle,
  onSelectPress,
  inputRef,
}) => {
  const val = selInput.id ? (userAnswers[selInput.id] || '') : '';
  const inputWidth = selInput.width || 80;
  const inputHeight = selInput.height || INPUT_HEIGHT;
  const selectRef = React.useRef<any>(null);

  const handlePress = () => {
    selectRef.current?.measure((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
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
          width: inputWidth,
          height: inputHeight,
          borderWidth: 1,
          borderColor,
          borderRadius: 3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.white,
          flexDirection: 'row',
        },
      ]}
    >
      <Text
        style={{
          fontSize: SIZE.md,
          color: textColor,
          flex: 1,
          textAlign: 'center',
          fontWeight: val ? 'bold' : 'normal',
        }}
      >
        {val || '?'}
      </Text>
      <Ionicons name="caret-down" size={16} color={COLOR.textSecondary} style={{ paddingRight: 4 }} />
    </TouchableOpacity>
  );
});
