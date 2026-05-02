import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface _Props {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const Dot = ({ active }: { active: boolean }) => {
  const width = useSharedValue(active ? 20 : 8);

  useEffect(() => {
    width.value = withSpring(active ? 20 : 8, { damping: 20, stiffness: 200 });
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: active ? COLOR.primary : '#BDBDBD',
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const BottomNavigation: React.FC<_Props> = ({
  currentIndex,
  total,
  onNext,
  onPrev,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const maxDots = 4;
  const getVisibleDots = () => {
    if (total <= maxDots) return Array.from({ length: total }, (_, i) => i);

    let start = Math.max(0, currentIndex - Math.floor(maxDots / 2));
    if (start + maxDots > total) {
      start = total - maxDots;
    }
    return Array.from({ length: maxDots }, (_, i) => start + i);
  };

  const visibleDots = getVisibleDots();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={[styles.navBtn, isFirst && styles.navBtnDisabled]}
        onPress={onPrev}
        disabled={isFirst}
        activeOpacity={0.8}
      >
        <View style={styles.btnContent}>
          <Ionicons name="chevron-back" size={20} color={COLOR.white} />
          <Text style={styles.navBtnText}>Trước</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.dots}>
        {visibleDots.map((i) => (
          <Dot key={i} active={i === currentIndex} />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.navBtn, isLast && styles.navBtnDisabled]}
        onPress={onNext}
        disabled={isLast}
        activeOpacity={0.8}
      >
        <View style={styles.btnContent}>
          <Text style={styles.navBtnText}>Tiếp</Text>
          <Ionicons name="chevron-forward" size={20} color={COLOR.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    backgroundColor: COLOR.white,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    ...SHADOWS.small,
  },
  navBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLOR.primary,
    minWidth: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: {
    opacity: 0.35,
  },
  navBtnText: {
    fontSize: 16,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLOR.white,
    marginHorizontal: 4,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default BottomNavigation;
