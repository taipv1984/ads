import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { GAME_CONFIG } from '../../../game_config';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCALE = SCREEN_WIDTH / GAME_CONFIG.virtualWidth;

interface OptionsPickerProps {
  options: string[];
  onSelect: (val: string) => void;
  position: { x: number, y: number }; // Virtual center
  shapeWidth: number; // Virtual width
  shapeHeight: number; // Virtual height
  textSize: number; // Virtual textSize
}

const OPTION_HEIGHT = 42; 
const PICKER_WIDTH = 150; 
const ARROW_SIZE = 10; 

const OptionsPicker: React.FC<OptionsPickerProps> = ({ options, onSelect, position, shapeWidth, shapeHeight, textSize }) => {
  const scaledCX = position.x * SCALE;
  const scaledCY = position.y * SCALE;
  const scaledW = shapeWidth * SCALE;
  const scaledH = shapeHeight * SCALE;
  const scaledFS = textSize * SCALE;
  
  const pickerHeight = options.length * OPTION_HEIGHT;
  
  const shapeTopEdge = scaledCY - scaledH / 2;
  const shapeBottomEdge = scaledCY + scaledH / 2;

  // Cập nhật tọa độ top (+2px cho Below và -2px cho Above để chạm khít không đè viền)
  let top = shapeBottomEdge + ARROW_SIZE + 2; 
  let showAbove = false;
  
  if (top + pickerHeight > SCREEN_HEIGHT - 160) {
    top = shapeTopEdge - pickerHeight - ARROW_SIZE - 2;
    showAbove = true;
  }

  // Căn X
  let left = scaledCX - PICKER_WIDTH / 2;
  if (left < 10) left = 10;
  if (left + PICKER_WIDTH > SCREEN_WIDTH - 10) {
    left = SCREEN_WIDTH - PICKER_WIDTH - 10;
  }

  return (
    <View style={[styles.container, { top, left, width: PICKER_WIDTH, height: pickerHeight }]}>
      <View style={[
        styles.arrow, 
        showAbove ? styles.arrowDown : styles.arrowUp,
        { left: (scaledCX - left) - ARROW_SIZE } 
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
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FF9800',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 10000,
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
    top: -ARROW_SIZE - 2, 
    borderBottomWidth: ARROW_SIZE,
    borderBottomColor: '#FF9800',
  },
  arrowDown: {
    bottom: -ARROW_SIZE - 2, 
    borderTopWidth: ARROW_SIZE,
    borderTopColor: '#FF9800',
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
    backgroundColor: '#f0f0f0', 
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontWeight: 'bold',
    color: '#333',
  }
});

export default OptionsPicker;
