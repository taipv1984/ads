import { Question, ShapeElement } from '@/services/types/question.types';
import { getEffectiveZIndex, groupElementsIntoLayers } from '@/utils/math.util';
import { Canvas } from '@shopify/react-native-skia';
import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  AnimatedShapeElement,
  AnimatedTextOverlay,
  getColor,
  RenderLine,
  SCALE
} from './shared/BaseElements';
import { ViewMode } from '@/services/types/system.type';

interface _Props {
  question: Question;
  userInputs: Record<number, string>;
  activeInputId: number | null;
  viewMode?: ViewMode;
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  offsetY?: number;
}

const QuestionFillCanvas: React.FC<_Props> = ({
  question,
  userInputs,
  activeInputId,
  viewMode = ViewMode.edit,
  onSelectInput,
  offsetY = 0
}) => {
  const isReview = viewMode === ViewMode.review;
  const tapGesture = useMemo(() => Gesture.Tap()
    .enabled(!isReview)
    .onEnd((e) => {
      let foundInputId: number | null = null;
      let absolutePos: { x: number, y: number } | undefined = undefined;

      const sorted = [...(question.elements || [])].sort((a, b) => {
        const az = getEffectiveZIndex(a);
        const bz = getEffectiveZIndex(b);
        return bz - az;
      });

      const adjustedY = e.y;

      for (const el of sorted) {
        if (el.type === 'shape' && (el as ShapeElement).isInput) {
          const cx = el.position.x * SCALE;
          const cy = el.position.y * SCALE;
          const shape = el as ShapeElement;
          const w = (shape.width || shape.size || 100) * SCALE;
          const h = (shape.height || shape.size || 100) * SCALE;
          const halfW = w / 2;
          const halfH = h / 2;

          if (e.x >= cx - halfW && e.x <= cx + halfW &&
            adjustedY >= cy - halfH && adjustedY <= cy + halfH) {
            foundInputId = el.id;
            absolutePos = {
              x: e.absoluteX - (e.x - cx),
              y: e.absoluteY - (e.y - cy)
            };
            break;
          }
        }
      }

      if (onSelectInput) {
        onSelectInput(foundInputId, absolutePos);
      }
    }).runOnJS(true), [question, onSelectInput]);

  const layers = useMemo(() => {
    return groupElementsIntoLayers(question.elements || []);
  }, [question.elements]);

  return (
    <View style={[StyleSheet.absoluteFill, { top: offsetY }]}>
      <GestureDetector gesture={tapGesture}>
        <View style={StyleSheet.absoluteFill}>
          {layers.map((layer, layerIdx) => {
            const layerKey = `layer-${layer.type}-${layer.zIndex}-${layerIdx}`;

            if (layer.type === 'canvas') {
              return (
                <View key={layerKey} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex }]} pointerEvents="none">
                  <Canvas style={StyleSheet.absoluteFill}>
                    {layer.elements.map((el) => {
                      if (el.type === 'line') {
                        return <RenderLine key={`line-${el.id}`} line={el as any} />;
                      }
                      if (el.type === 'shape') {
                        return (
                          <AnimatedShapeElement
                            key={`shape-${el.id}`}
                            shape={el as any}
                            isFocused={el.id === activeInputId}
                            reviewStatus={isReview && (el as any).isInput ? (userInputs[el.id] === (el as any).value ? 'correct' : 'incorrect') : 'none'}
                          />
                        );
                      }
                      return null;
                    })}
                  </Canvas>
                  {layer.elements.map(el => {
                    if (el.type !== 'shape') return null;
                    const shape = el as ShapeElement;
                    const textToRender = shape.isInput ? (userInputs[shape.id] || '') : (shape.value || '');
                    if (textToRender === '' && !shape.isInput) return null;
                    return (
                      <View key={`overlay-${el.id}`} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex + 0.1 }]} pointerEvents="none">
                        <AnimatedTextOverlay shape={shape} textToRender={textToRender} />
                      </View>
                    );
                  })}
                </View>
              );
            }

            if (layer.type === 'text') {
              return (
                <React.Fragment key={layerKey}>
                  {layer.elements.map(el => {
                    if (el.type !== 'text') return null;
                    const textEl = el as any; // Cast or use specific type
                    const fs = (textEl.fontSize || 40) * SCALE;
                    return (
                      <View
                        key={`text-${el.id}`}
                        style={[styles.textContainer, { left: textEl.position.x * SCALE, top: textEl.position.y * SCALE - fs / 2, zIndex: layer.zIndex }]}
                        pointerEvents="none"
                      >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                          <Text style={{ fontSize: fs, color: getColor(textEl.color), fontWeight: 'bold' }}>
                            {textEl.content}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </React.Fragment>
              );
            }

            return null;
          })}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    pointerEvents: 'none',
  }
});

export default memo(QuestionFillCanvas);
