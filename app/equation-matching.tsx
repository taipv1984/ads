import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEquationGame } from '../features/equation-matching/hooks/useEquationGame';
import { EQUATION_QUESTIONS } from '../services/mocks/equation-matching.mock';
import EquationCanvas from '../features/equation-matching/components/EquationCanvas';
import EquationNavBar from '../features/equation-matching/components/EquationNavBar';
import { COLOR, SPACING } from '@/constants/theme';

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Screen 
          options={{ 
            title: 'Nối Phép Tính', 
            headerShown: true,
            headerStyle: { backgroundColor: COLOR.background },
            headerTintColor: COLOR.text,
          }} 
        />

        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.title}>{currentQuestion.title}</Text>
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>
              Câu {currentIndex + 1} / {EQUATION_QUESTIONS.length}
            </Text>
          </View>
        </View>

        {/* Game Area - Bọc trong ScrollView để cuộn được */}
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

        {/* Bottom Navigation & Results */}
        <EquationNavBar 
          currentIndex={currentIndex}
          totalQuestions={EQUATION_QUESTIONS.length}
          isChecked={currentChecked}
          onPrev={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          onNext={() => setCurrentIndex(prev => Math.min(EQUATION_QUESTIONS.length - 1, prev + 1))}
          onCheck={checkResult}
          onReset={resetCurrent}
          results={results}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1', // COLOR.background
  },
  header: {
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    flex: 1,
    marginRight: 8,
  },
  indicator: {
    backgroundColor: '#FF814A',
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
});
