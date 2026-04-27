import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOR, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';

interface Props {
  currentIndex: number;
  totalQuestions: number;
  isChecked: boolean;
  onPrev: () => void;
  onNext: () => void;
  onCheck: () => void;
  onReset: () => void;
  results: {
    correctCount: number;
    totalPairs: number;
    totalConns: number;
  };
}

const EquationNavBar: React.FC<Props> = ({ 
  currentIndex, 
  totalQuestions, 
  isChecked, 
  onPrev, 
  onNext, 
  onCheck,
  onReset,
  results 
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <View style={styles.container}>
      {/* Kết quả hiển thị dưới nút kiểm tra (như yc) */}
      {isChecked && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Kết quả: <Text style={styles.highlight}>{results.correctCount}/{results.totalPairs}</Text> câu đúng
          </Text>
          {results.correctCount === results.totalPairs ? (
            <Text style={styles.congrats}>🎉 Tuyệt vời! Bé giỏi lắm!</Text>
          ) : (
            <Text style={styles.keepGoing}>Cố gắng lên nhé! 💪</Text>
          )}
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.navButton, isFirst && styles.disabled]} 
          onPress={onPrev}
          disabled={isFirst}
        >
          <Text style={styles.navButtonText}>← Trước</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.checkButton, isChecked && styles.checkedButton]} 
          onPress={onCheck}
        >
          <Text style={styles.checkButtonText}>{isChecked ? 'Đã Kiểm Tra' : 'Kiểm Tra ✅'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, isLast && styles.disabled]} 
          onPress={onNext}
          disabled={isLast}
        >
          <Text style={styles.navButtonText}>Tiếp →</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetText}>Làm lại câu này ↺</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    ...SHADOWS.medium,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.text,
  },
  highlight: {
    color: COLOR.primary,
    fontSize: 22,
  },
  congrats: {
    color: COLOR.success,
    fontWeight: '600',
    marginTop: 4,
  },
  keepGoing: {
    color: COLOR.secondary,
    fontWeight: '600',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  navButtonText: {
    fontWeight: '600',
    color: COLOR.text,
  },
  checkButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLOR.primary,
    borderRadius: 25,
    ...SHADOWS.small,
  },
  checkedButton: {
    backgroundColor: COLOR.success,
  },
  checkButtonText: {
    color: COLOR.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.3,
  },
  resetButton: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  resetText: {
    color: COLOR.textSecondary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default EquationNavBar;
