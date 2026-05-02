import { COLOR, SHADOWS, SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EquationCanvas from '../features/equation-matching/components/EquationCanvas';
import { useEquationGame } from '../features/equation-matching/hooks/useEquationGame';
import { EQUATION_QUESTIONS } from '../services/mocks/equation-matching.mock';
import QuestionNav from './components/common/BottomNavigation';

// --- Result Modal ---
function ResultModal({ visible, results, onClose }: {
  visible: boolean;
  results: { correctCount: number; totalPairs: number };
  onClose: () => void;
}) {
  const isPerfect = results.correctCount === results.totalPairs;
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>
            {isPerfect ? '🎉 Xuất sắc!' : '📋 Kết quả'}
          </Text>
          <View style={styles.modalBody}>
            <Text style={styles.resultText}>
              Bé đã làm đúng <Text style={styles.highlight}>{results.correctCount}/{results.totalPairs}</Text> câu.
            </Text>
            <Text style={isPerfect ? styles.congrats : styles.keepGoing}>
              {isPerfect ? 'Tuyệt vời! Bé giỏi lắm!' : 'Cố gắng lên nhé! 💪'}
            </Text>
          </View>
          <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
            <Text style={styles.modalBtnText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function EquationMatchingScreen() {
  const {
    currentIndex,
    setCurrentIndex,
    currentQuestion,
    currentConns,
    currentChecked,
    addConnection,
    resetCurrent,
    checkResult,
    results
  } = useEquationGame(EQUATION_QUESTIONS);

  const [modalVisible, setModalVisible] = useState(false);

  const handleCheck = () => {
    checkResult();
    setModalVisible(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Screen
          options={{
            title: 'Nối Phép Tính',
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerCheckButton}
                onPress={handleCheck}
              >
                <Text style={styles.headerCheckText}>Kiểm tra</Text>
              </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: COLOR.primary },
            headerTintColor: COLOR.white,
          }}
        />

        {/* Header Title with Reset Button */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentQuestion.title}</Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={resetCurrent}
              activeOpacity={0.7}
            >
              <Ionicons name="reload" size={22} color={COLOR.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              Câu {currentIndex + 1} / {EQUATION_QUESTIONS.length}
            </Text>
          </View>
        </View>

        {/* Game Area */}
        <ScrollView
          style={styles.gameArea}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <EquationCanvas
            question={currentQuestion}
            connections={currentConns}
            isChecked={currentChecked}
            onConnect={addConnection}
          />
        </ScrollView>

        {/* Bottom Navigation */}
        <QuestionNav
          currentIndex={currentIndex}
          total={EQUATION_QUESTIONS.length}
          onNext={() => setCurrentIndex(prev => Math.min(EQUATION_QUESTIONS.length - 1, prev + 1))}
          onPrev={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
        />

        <ResultModal
          visible={modalVisible}
          results={results}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  headerCheckButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  headerCheckText: {
    color: COLOR.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    ...SHADOWS.small,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginRight: 8,
  },
  resetBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: COLOR.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  indicatorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Modal styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.medium,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalBody: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultText: {
    fontSize: 18,
    color: COLOR.text,
    textAlign: 'center',
  },
  highlight: {
    color: COLOR.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  congrats: {
    color: COLOR.success,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  keepGoing: {
    color: COLOR.secondary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  modalBtn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
