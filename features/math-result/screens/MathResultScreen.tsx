import { COLOR, SHADOWS, SIZE, SPACING } from '@/constants/theme';
import { useMathQuiz } from '@/features/math/context/MathQuizContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchResultItem from '../components/MatchResultItem';
import ResultLoading from '../components/ResultLoading';
import ScoreFeedbackSection from '../components/ScoreFeedbackSection';

const MathResultScreen = () => {
  const router = useRouter();
  const { questions, userAnswers, userConnections, results, resetQuiz } = useMathQuiz();
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'incorrect'>('all');

  const { totalScore, maxScore, correctCount, incorrectCount } = useMemo(() => {
    const total = Object.values(results).reduce((acc, curr) => acc + curr.finalScore, 0);
    const max = questions.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const correct = Object.values(results).filter(r => r.isCorrect).length;
    const incorrect = questions.length - correct;
    return { totalScore: total, maxScore: max, correctCount: correct, incorrectCount: incorrect };
  }, [questions, results]);

  const resultScore = useMemo(() => maxScore > 0 ? (totalScore / maxScore) * 10 : 0, [totalScore, maxScore]);

  const scoreColor = useMemo(() => {
    if (resultScore < 5) return COLOR.error;
    return COLOR.success;
  }, [resultScore]);

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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color={COLOR.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kết quả bài làm</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.summaryCard}>
            <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
              <Text style={[styles.totalScore, { color: scoreColor }]}>{totalScore}</Text>
            </View>

            <ScoreFeedbackSection score={resultScore} />
          </View>

          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={() => setFilterMode('all')}>
              <Text style={[styles.sectionTitle, filterMode === 'all' && styles.activeSectionTitle]}>Chi tiết</Text>
            </TouchableOpacity>

            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { backgroundColor: COLOR.bgSuccess },
                  filterMode === 'correct' && { borderColor: COLOR.success, borderWidth: 2 }
                ]}
                onPress={() => setFilterMode('correct')}
              >
                <Text style={[
                  styles.filterButtonText,
                  { color: COLOR.success },
                  filterMode === 'correct' && { fontSize: SIZE.sm }
                ]}>Chính xác {correctCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { backgroundColor: COLOR.bgError },
                  filterMode === 'incorrect' && { borderColor: COLOR.error, borderWidth: 2 }
                ]}
                onPress={() => setFilterMode('incorrect')}
              >
                <Text style={[
                  styles.filterButtonText,
                  { color: COLOR.error },
                  filterMode === 'incorrect' && { fontSize: SIZE.sm }
                ]}>Chưa đúng {incorrectCount}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ResultLoading
            trigger={filterMode}
            delay={150}
          >
            {filteredQuestions.map((q, idx) => {
              const originalIndex = questions.findIndex(origQ => origQ.id === q.id);
              const backgroundColor = idx % 2 === 0 ? COLOR.white : COLOR.grayLight;

              return (
                <MatchResultItem
                  key={q.id}
                  question={q}
                  index={originalIndex}
                  userAnswers={userAnswers[q.id] || {}}
                  userConnections={userConnections[q.id] || []}
                  result={results[q.id] || { isCorrect: false, finalScore: 0 }}
                  backgroundColor={backgroundColor}
                />
              );
            })}
            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>Hoàn thành</Text>
            </TouchableOpacity>
          </ResultLoading>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MathResultScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: COLOR.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    color: COLOR.white,
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 44
  },
  headerRight: {
    width: 0,
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
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: COLOR.white,
  },
  totalScore: {
    fontSize: 40,
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
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  activeSectionTitle: {
    color: COLOR.black,
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
    borderColor: COLOR.transparent,
  },
  filterButtonText: {
    fontSize: SIZE.sm,
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
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    includeFontPadding: false,
    textAlignVertical: 'center',
  }
});
