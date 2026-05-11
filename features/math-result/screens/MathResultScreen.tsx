import { COLOR, SHADOWS, SPACING } from '@/constants/theme';
import { useMathQuiz } from '@/features/math/context/MathQuizContext';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchResultItem from '../components/MatchResultItem';
import ScoreFeedbackSection from '../components/ScoreFeedbackSection';

const MathResultScreen = () => {
  const router = useRouter();
  const { questions, userAnswers, userConnections, results, resetQuiz } = useMathQuiz();
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'incorrect'>('all');

  const totalScore = Object.values(results).reduce((acc, curr) => acc + curr.finalScore, 0);
  const maxScore = questions.reduce((acc, curr) => acc + (curr.score || 0), 0);
  const correctCount = Object.values(results).filter(r => r.isCorrect).length;
  const incorrectCount = questions.length - correctCount;

  // Quy đổi điểm về hệ 10 để lấy feedback
  const normalizedScore = maxScore > 0 ? (totalScore / maxScore) * 10 : 0;

  const scoreColor = useMemo(() => {
    if (normalizedScore < 5) return '#F44336'; // Đỏ
    if (normalizedScore <= 8) return '#FF9800'; // Cam
    return '#4CAF50'; // Xanh lá
  }, [normalizedScore]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (filterMode === 'all') return true;
      const result = results[q.id];
      if (filterMode === 'correct') return result?.isCorrect;
      if (filterMode === 'incorrect') return !result?.isCorrect;
      return true;
    });
  }, [questions, results, filterMode]);

  const handleFinish = () => {
    resetQuiz();
    router.replace('/math');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.backButton} />
          <Text style={styles.headerTitle}>Kết quả bài làm</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.summaryCard}>
            <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
              <Text style={[styles.totalScore, { color: scoreColor }]}>{totalScore}</Text>
            </View>

            <ScoreFeedbackSection score={normalizedScore} />
          </View>

          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={() => setFilterMode('all')}>
              <Text style={[styles.sectionTitle, filterMode === 'all' && styles.activeSectionTitle]}>Chi tiết</Text>
            </TouchableOpacity>

            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { backgroundColor: '#E8F5E9' },
                  filterMode === 'correct' && { borderColor: '#4CAF50', borderWidth: 2 }
                ]}
                onPress={() => setFilterMode('correct')}
              >
                <Text style={[
                  styles.filterButtonText,
                  { color: '#4CAF50' },
                  filterMode === 'correct' && { fontSize: 14 }
                ]}>Chính xác {correctCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { backgroundColor: '#FFEBEE' },
                  filterMode === 'incorrect' && { borderColor: '#F44336', borderWidth: 2 }
                ]}
                onPress={() => setFilterMode('incorrect')}
              >
                <Text style={[
                  styles.filterButtonText,
                  { color: '#F44336' },
                  filterMode === 'incorrect' && { fontSize: 14 }
                ]}>Chưa đúng {incorrectCount}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex(origQ => origQ.id === q.id);
            const backgroundColor = idx % 2 === 0 ? '#ffffff' : '#F5F5F5';
            
            return (
              <MatchResultItem
                key={q.id}
                question={q}
                index={originalIndex}
                userAnswers={userAnswers[q.id] || {}}
                userConnections={userConnections[q.id] || []}
                result={results[q.id] || { isCorrect: false, correctCount: 0, totalCount: 1, finalScore: 0 }}
                backgroundColor={backgroundColor}
              />
            );
          })}

          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MathResultScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: COLOR.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLOR.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 44,
  },
  scrollContent: {
    paddingVertical: SPACING.md,
  },
  summaryCard: {
    backgroundColor: COLOR.white,
    borderRadius: 20,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    ...SHADOWS.md,
    marginBottom: SPACING.lg,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 65,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: '#FFF',
  },
  totalScore: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  activeSectionTitle: {
    color: '#000000',
  },
  filterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: COLOR.primary,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.xl * 1.5,
    ...SHADOWS.md,
  },
  finishButtonText: {
    color: COLOR.white,
    fontSize: 18,
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  }
});
