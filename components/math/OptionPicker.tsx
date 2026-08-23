import { COLOR, SPACING } from '@/constants/theme';
import { GAME_CONFIG } from '@/game_config';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCALE = SCREEN_WIDTH / GAME_CONFIG.virtualWidth;

interface _Props {
  options: string[];
  onSelect: (val: string) => void;
  onClose?: () => void;
  position: { x: number, y: number }; // Virtual center
  shapeWidth: number; // Virtual width
  shapeHeight: number; // Virtual height
  textSize: number; // Virtual textSize
}

const OPTION_HEIGHT = 42;
const PICKER_WIDTH = 150;
const ARROW_SIZE = 10;

const OptionPicker: React.FC<_Props> = ({ options, onSelect, onClose, position, shapeWidth, shapeHeight, textSize }) => {
  // position.x và position.y lúc này đã là tọa độ pixel tuyệt đối trên màn hình
  const scaledCX = position.x;
  const scaledCY = position.y;

  // Chiều rộng và cao của shape vẫn là virtual, cần scale để tính toán cạnh biên
  const scaledW = shapeWidth * SCALE;
  const scaledH = shapeHeight * SCALE;
  const scaledFS = textSize * SCALE;

  const pickerHeight = options.length * OPTION_HEIGHT;

  const shapeTopEdge = scaledCY - scaledH / 2;
  const shapeBottomEdge = scaledCY + scaledH / 2;

  // 1. Tính toán vị trí Y (Top)
  // Mặc định xuất hiện phía dưới shape
  let top = shapeBottomEdge + ARROW_SIZE + 5; // Đẩy xuống thêm 2px để mũi tên không đè lên shape
  let showAbove = false;

  // Nếu bị che ở phía dưới màn hình (gần cạnh dưới), đẩy lên trên
  if (top + pickerHeight > SCREEN_HEIGHT - 100) {
    // Khi ở trên, hạ xuống một chút để mũi tên chạm khít cạnh trên
    top = shapeTopEdge - pickerHeight - ARROW_SIZE + 3;
    showAbove = true;
  }

  // 2. Tính toán vị trí X (Left)
  // Mặc định căn giữa theo shape
  let left = scaledCX - PICKER_WIDTH / 2;

  // Kiểm tra tràn mép trái/phải và dịch chuyển (translation)
  const padding = 15;
  if (left < padding) {
    left = padding;
  } else if (left + PICKER_WIDTH > SCREEN_WIDTH - padding) {
    left = SCREEN_WIDTH - PICKER_WIDTH - padding;
  }

  // 3. Tính toán vị trí của mũi tên bên trong Picker
  // Mũi tên phải luôn trỏ vào tâm của Shape (scaledCX)
  // Vị trí của mũi tên relative với Picker = (Tâm shape - Left của Picker) - Nửa chiều rộng mũi tên
  const arrowLeft = (scaledCX - left) - ARROW_SIZE;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={[styles.container, { top, left, width: PICKER_WIDTH, height: pickerHeight }]}>
        <View style={[
          styles.arrow,
          showAbove ? styles.arrowDown : styles.arrowUp,
          { left: arrowLeft }
        ]} />

        <View style={styles.content}>
          {options.map((opt, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.optionBtn,
                index < options.length - 1 && styles.borderBottom,
                pressed && styles.pressedBtn
              ]}
              onPress={() => onSelect(opt)}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.optionText, { fontSize: Math.min(scaledFS, 20) }]}
              >
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLOR.white,
    borderRadius: SPACING.borderRadius,
    borderWidth: 2,
    borderColor: COLOR.primary,
    elevation: 10,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 9999,
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowUp: {
    top: -ARROW_SIZE - 1, // Khớp với viền 2px
    borderBottomWidth: ARROW_SIZE,
    borderBottomColor: COLOR.primary,
  },
  arrowDown: {
    bottom: -ARROW_SIZE - 1, // Khớp với viền 2px
    borderTopWidth: ARROW_SIZE,
    borderTopColor: COLOR.primary,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  optionBtn: {
    height: OPTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  pressedBtn: {
    backgroundColor: COLOR.grayLight,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  optionText: {
    fontWeight: 'bold',
    color: COLOR.text,
  }
});

export default OptionPicker;
