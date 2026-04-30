import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLOR, SHADOWS } from '@/constants/theme';

import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const PADDING = 12;
const GAP = 8;
// We have 6 columns (5 numbers + 1 delete key column)
// Total gaps = 5
const KEY_WIDTH = (width - PADDING * 2 - GAP * 5) / 6;
const KEY_HEIGHT = 56;

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, onDelete }) => {
  const row1 = ['0', '1', '2', '3', '4'];
  const row2 = ['5', '6', '7', '8', '9'];

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
      
      {/* Delete Key merged from col 6 of row 1 and row 2 */}
      <TouchableOpacity style={styles.deleteKey} onPress={onDelete}>
        <Text style={styles.deleteKeyText}>⌫</Text>
      </TouchableOpacity>
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
    backgroundColor: '#EAECEE',
    padding: PADDING,
    gap: GAP,
    paddingBottom: PADDING, // Adjusted padding to balance top padding
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    borderRadius: 8,
    ...SHADOWS.small,
  },
  keyText: {
    fontSize: 26,
    fontWeight: '500',
    color: '#1A1D20',
  },
  deleteKey: {
    width: KEY_WIDTH,
    height: KEY_HEIGHT * 2 + GAP,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D8DC',
    borderRadius: 8,
    ...SHADOWS.small,
  },
  deleteKeyText: {
    fontSize: 24,
    color: '#1A1D20',
  }
});

export default VirtualKeyboard;
