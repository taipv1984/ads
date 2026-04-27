import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { EquationItemData } from '../types/equation.types';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface Props {
  item: EquationItemData;
  isSelected?: boolean;
  isConnected?: boolean;
  isCorrect?: boolean | null; // null if not checked
}

export const ITEM_WIDTH = width * 0.42; 
export const ITEM_HEIGHT = 60; 

const EquationItem: React.FC<Props> = ({ item, isSelected, isConnected, isCorrect }) => {
  const isLeft = item.side === 'left';
  
  let borderColor = isLeft ? '#FF814A' : '#1E88E5';
  let bgColor = COLOR.white;
  let textColor = COLOR.text;

  if (isSelected) {
    bgColor = isLeft ? '#FFF3E0' : '#E3F2FD';
  }

  if (isCorrect === true) {
    borderColor = COLOR.success;
    bgColor = '#E8F5E9';
  } else if (isCorrect === false) {
    borderColor = COLOR.error;
    bgColor = '#FFEBEE';
  }

  return (
    <View style={[
      styles.container, 
      { borderColor },
      isSelected && styles.selected,
      { backgroundColor: bgColor }
    ]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{isLeft ? '🐱' : '🐟'}</Text>
        <View style={styles.expressionContainer}>
          <Text 
            numberOfLines={1} 
            adjustsFontSizeToFit 
            style={[styles.expression, { color: textColor }]}
          >
            {item.expression}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginVertical: 4,
    ...SHADOWS.small,
  },
  selected: {
    ...SHADOWS.medium,
    transform: [{ scale: 1.02 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 26,
    marginRight: 8,
  },
  expressionContainer: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
    borderRadius: 6,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expression: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EquationItem;
