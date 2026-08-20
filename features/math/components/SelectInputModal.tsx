import { INPUT_HEIGHT } from '@/constants/math.const';
import { COLOR, SIZE } from '@/constants/theme';
import { SelectInput } from '@/services/types/question.types';
import React from 'react';
import { Dimensions, Modal, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface _Props {
  visible: boolean;
  onClose: () => void;
  currentSelectInput: SelectInput | null;
  selectPosition: { x: number, y: number, width: number, height: number } | null;
  userAnswers: Record<number, string>;
  onSelectOption: (value: string) => void;
}

export const SelectInputModal: React.FC<_Props> = ({
  visible,
  onClose,
  currentSelectInput,
  selectPosition,
  userAnswers,
  onSelectOption
}) => {
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
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={dropdownStyle}>
          <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
            {options.map((opt, idx) => {
              const isSelected = currentSelectInput.id ? userAnswers[currentSelectInput.id] === opt : false;
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
                  onPress={() => onSelectOption(opt)}
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
