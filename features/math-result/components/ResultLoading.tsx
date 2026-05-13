import { COLOR, SPACING } from '@/constants/theme';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';

interface _Props {
  children: React.ReactNode;
  delay?: number;
  loadingText?: string;
  trigger?: any; // Bất kỳ sự thay đổi nào của giá trị này sẽ kích hoạt loading lại
}

/**
 * Component hỗ trợ render trì hoãn để tránh block UI thread
 * Đặc biệt hữu ích khi render nhiều Canvas Skia cùng lúc
 */
const ResultLoading: React.FC<_Props> = ({
  children,
  delay = 300,
  loadingText = 'Đang tải dữ liệu...',
  trigger
}) => {
  const [isReady, setIsReady] = useState(false);
  const [prevTrigger, setPrevTrigger] = useState(trigger);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Reset isReady ngay lập tức trong quá trình render nếu trigger thay đổi
  // Điều này giúp tránh hiện tượng "nhấp nháy" (hiển thị nội dung cũ trước khi hiện loading)
  if (trigger !== prevTrigger) {
    setPrevTrigger(trigger);
    setIsReady(false);
    fadeAnim.setValue(0);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [trigger, delay, fadeAnim]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLOR.primary} size="large" />
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>
    );
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLOR.textSecondary,
    fontStyle: 'italic',
  },
});

export default ResultLoading;
