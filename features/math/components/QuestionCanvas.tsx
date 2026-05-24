import { QuestionType, ViewMode } from '@/enums/math.enum';
import { QuestionFill, QuestionMatch } from '@/services/types/question.types';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionFillCanvas from './QuestionFillCanvas';
import QuestionMatchCanvas from './QuestionMatchCanvas';

interface _Props {
  question: QuestionMatch | QuestionFill;
  userInputs: Record<number, string>;
  activeInputId: number | null;
  viewMode?: ViewMode;
  connections?: { from: number, to: number }[];
  reviewConnections?: { from: number, to: number }[];
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  onConnectionsChange?: (id: number, connections: { from: number, to: number }[]) => void;
  offsetY?: number;
}

const QuestionCanvas: React.FC<_Props> = (props) => {
  const { question } = props;

  const renderCanvas = () => {
    switch (question.type) {
      case QuestionType.MATCH:
        return <QuestionMatchCanvas
          {...props as any}
          onConnectionsChange={props.onConnectionsChange ? (conns) => props.onConnectionsChange!(question.id, conns) : undefined}
        />;
      case QuestionType.FILL:
        return <QuestionFillCanvas {...props as any} />;
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
  }
});

export default memo(QuestionCanvas);
