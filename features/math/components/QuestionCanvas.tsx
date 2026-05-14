import { Question, QuestionType } from '@/services/types/question.types';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import QuestionFillCanvas from './QuestionFillCanvas';
import QuestionMatchCanvas from './QuestionMatchCanvas';
import { ViewMode } from '@/services/types/system.type';

interface _Props {
  question: Question;
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
      case QuestionType.match:
        return <QuestionMatchCanvas
          {...props}
          onConnectionsChange={props.onConnectionsChange ? (conns) => props.onConnectionsChange!(question.id, conns) : undefined}
        />;
      case QuestionType.fill:
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
    // backgroundColor: '#f2f2f2'
  }
});

export default memo(QuestionCanvas);
