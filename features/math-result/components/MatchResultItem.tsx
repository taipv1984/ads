import { MarkdownView } from '@/components/shared/MarkdownView';
import { COLOR, SIZE, SPACING } from '@/constants/theme';
import { QuestionType, ViewMode } from '@/enums/math.enum';
import QuestionCanvas from '@/features/math/components/QuestionCanvas';
import QuestionChoiceView from '@/features/math/components/QuestionChoiceView';
import QuestionConnectView from '@/features/math/components/QuestionConnectView';
import QuestionExplanation from '@/features/math/components/QuestionExplanation';
import QuestionFormView from '@/features/math/components/QuestionFormView';
import QuestionQuizView from '@/features/math/components/QuestionQuizView';
import QuestionSortView from '@/features/math/components/QuestionSortView';
import QuestionTableView from '@/features/math/components/QuestionTableView';
import { Question, QuestionChoice, QuestionConnect, QuestionForm, QuestionQuiz, QuestionSort, QuestionTable } from '@/services/types/question.types';
import { getCanvasLayout } from '@/utils/math.util';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image as RNImage, StyleSheet, Text, View } from 'react-native';

// Component hiển thị ảnh tự động điều chỉnh chiều cao theo tỷ lệ
const AutoHeightImage = React.memo(({ uri }: { uri: string }) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  React.useEffect(() => {
    if (uri) {
      RNImage.getSize(uri, (width, height) => {
        setAspectRatio(width / height);
      }, (error) => {
        console.error('Không lấy được kích thước ảnh:', error);
      });
    }
  }, [uri]);
  return (
    <RNImage
      source={{ uri }}
      style={{ width: '100%', aspectRatio }}
      resizeMode="contain"
    />
  );
});

interface _Props {
  question: Question;
  index: number;
  userAnswers: Record<number, string>;
  userConnections: { from: number, to: number }[];
  result: {
    isCorrect: boolean;
    finalScore: number;
  };
  backgroundColor?: string;
}

const MatchResultItem = React.memo(({
  question,
  index,
  userAnswers,
  userConnections,
  result,
  backgroundColor = COLOR.white
}: _Props) => {
  const { height: canvasHeight, offsetY } = getCanvasLayout('elements' in question ? question.elements || [] : []);

  const renderResultContent = () => {
    switch (question.type) {
      case QuestionType.FILL:
      case QuestionType.MATCH:
        return (
          <>
            <View style={[styles.canvasWrapper, { height: canvasHeight }]}>
              <QuestionCanvas
                question={question}
                userInputs={userAnswers}
                activeInputId={null}
                reviewConnections={userConnections}
                onSelectInput={() => { }}
                offsetY={offsetY}
                viewMode={ViewMode.REVIEW}
              />
            </View>
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                <Ionicons name="bulb-outline" size={16} color={COLOR.primary} /> Giải thích
              </Text>
              <Text style={styles.explanationText}>
                {result.isCorrect //todo
                  ? "Tuyệt vời! Bạn đã hoàn thành đúng yêu cầu của câu hỏi này."
                  : "Bạn hãy xem lại các đường nối màu đỏ hoặc các ô số màu đỏ để biết lỗi sai nhé."}
              </Text>
            </View>
          </>
        );
      case QuestionType.CHOICE:
        return (
          <QuestionChoiceView
            questionChoice={question as QuestionChoice}
            userAnswers={userAnswers}
            onAnswerChange={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      case QuestionType.SORT:
        return (
          <QuestionSortView
            questionSort={question as QuestionSort}
            userAnswers={userAnswers}
            onAnswerChange={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      case QuestionType.QUIZ:
        return (
          <QuestionQuizView
            questionQuiz={question as QuestionQuiz}
            userAnswers={userAnswers}
            onAnswerChange={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      case QuestionType.FORM:
        return (
          <QuestionFormView
            questionForm={question as QuestionForm}
            userAnswers={userAnswers}
            onAnswerChange={() => { }}
            activeInputId={null}
            onSelectInput={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      case QuestionType.CONNECT:
        return (
          <QuestionConnectView
            questionConnect={question as QuestionConnect}
            userAnswers={userAnswers}
            userConnections={userConnections}
            onAnswerChange={() => { }}
            onConnectionsChange={() => { }}
            activeInputId={null}
            onSelectInput={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      case QuestionType.TABLE:
        return (
          <QuestionTableView
            questionTable={question as QuestionTable}
            userAnswers={userAnswers}
            onAnswerChange={() => { }}
            activeInputId={null}
            onSelectInput={() => { }}
            viewMode={ViewMode.REVIEW}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.resultCard, { backgroundColor }]}>
      <View style={styles.resultCardHeader}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.questionLabel}>
            <Text style={[styles.questionLabelText, { color: result.isCorrect ? COLOR.success : COLOR.error }]}>
              Câu {index + 1}
            </Text>
          </View>
          {result.finalScore > 0 && (
            <Text style={[styles.scoreText, { color: result.isCorrect ? COLOR.success : COLOR.error }]}>
              {result.finalScore}đ
            </Text>
          )}
        </View>
      </View>

      {question.question && question.question !== "" && (
        <View style={styles.cardContentWrapper}>
          <MarkdownView style={styles.cardContent} text={question.question} />
        </View>
      )}

      {question.image && (
        <View style={styles.imageWrapper}>
          <AutoHeightImage uri={question.image} />
        </View>
      )}

      {renderResultContent()}

      <QuestionExplanation explain={question.explain} isAnswered={true} />
    </View>
  );
});

export default MatchResultItem;

const styles = StyleSheet.create({
  resultCard: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  resultCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  questionLabel: {
    flexDirection: 'row',
  },
  questionLabelText: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreText: {
    fontSize: SIZE.md,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  cardContentWrapper: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
  },
  cardContent: {
    fontSize: SIZE.md,
    color: COLOR.text,
    lineHeight: 22,
  },
  canvasWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  explanationBox: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    marginTop: SPACING.xs,
  },
  explanationTitle: {
    fontSize: SIZE.md,
    fontWeight: 'bold',
    color: COLOR.text,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: SIZE.md,
    color: COLOR.text,
    lineHeight: 22,
  },
  imageWrapper: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
});
