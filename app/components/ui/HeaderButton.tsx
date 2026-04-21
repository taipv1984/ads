import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR, SHADOWS } from '@/constants/theme';

interface _Props {
  icon: any;
  onPress?: () => void;
  badge?: number | string;
}

const HeaderButton = ({ icon, onPress, badge }: _Props) => (
  <TouchableOpacity style={styles.iconButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color={COLOR.primary} />
    {badge !== undefined && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default HeaderButton;

const styles = StyleSheet.create({
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLOR.white,
    borderWidth: 1.5,
    borderColor: COLOR.border,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4500',
    minWidth: 18,
    height: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLOR.white,
  },
  badgeText: {
    color: COLOR.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
