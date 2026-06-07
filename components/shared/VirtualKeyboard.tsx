import { MINUS, PLUS } from '@/constants/math.const';
import { COLOR, SHADOWS, SIZE, SPACING } from '@/constants/theme';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const PADDING_H = 4;
const PADDING_V = SPACING.sm;
const GAP = SPACING.xs;
// We have 9 columns
const KEY_WIDTH = (width - PADDING_H * 2 - GAP * 8) / 9;
const KEY_HEIGHT = 44;

interface _Props {
  onKeyPress: (key: string) => void;
}

const VirtualKeyboard: React.FC<_Props> = ({ onKeyPress }) => {
  const row1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const row2 = ['0', PLUS, MINUS, 'Đ', 'S', '>', '<', '=', '✓'];

  return (
    <Animated.View
      entering={SlideInDown.duration(300)}
      exiting={SlideOutDown.duration(200)}
      style={styles.container}
    >
      <View style={styles.keysContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          {row1.map((key) => (
            <TouchableOpacity key={key} style={styles.key} onPress={() => onKeyPress(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Row 2 */}
        <View style={styles.row}>
          {row2.map((key) => (
            <TouchableOpacity key={key} style={styles.key} onPress={() => onKeyPress(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#D5D8DC',
    paddingVertical: PADDING_V,
    paddingHorizontal: PADDING_H,
    paddingBottom: PADDING_V,
    ...SHADOWS.medium,
    zIndex: 9999,
  },
  keysContainer: {
    flex: 1,
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  key: {
    width: KEY_WIDTH,
    height: KEY_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    ...SHADOWS.small,
  },
  keyText: {
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    color: COLOR.black,
  }
});

export default VirtualKeyboard;
