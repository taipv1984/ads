import { Question } from '@/services/types/math.types';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionFillCanvas from './QuestionFillCanvas';
import QuestionMatchCanvas from './QuestionMatchCanvas';

interface Props {
  question: Question;
  userInputs: Record<number, string>;
  activeInputId: number | null;
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  onConnectionsChange?: (connections: { from: number, to: number }[]) => void;
  offsetY?: number;
}

const QuestionCanvas: React.FC<Props> = (props) => {
  const { question } = props;

  return (
    <View style={styles.container}>
      {question.type === 'match' ? (
        <QuestionMatchCanvas {...props} />
      ) : (
        <QuestionFillCanvas {...props} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 246, 228, 1)',
  }
});

export default memo(QuestionCanvas);
