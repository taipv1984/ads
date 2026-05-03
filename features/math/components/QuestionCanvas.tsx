import { Question } from '@/services/types/math.types';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionFillCanvas from './QuestionFillCanvas';
import QuestionMatchCanvas from './QuestionMatchCanvas';

interface _Props {
  question: Question;
  userInputs: Record<number, string>;
  activeInputId: number | null;
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  onConnectionsChange?: (connections: { from: number, to: number }[]) => void;
  offsetY?: number;
}

const QuestionCanvas: React.FC<_Props> = (props) => {
  const { question } = props;

  const renderCanvas = () => {
    switch (question.type) {
      case 'match':
        return <QuestionMatchCanvas {...props} />;
      case 'fill':
        return <QuestionFillCanvas {...props} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderCanvas()}
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
