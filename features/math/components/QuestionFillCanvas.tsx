import { Question, ShapeElement } from '@/services/types/math.types';
import { Canvas } from '@shopify/react-native-skia';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  AnimatedShapeElement,
  AnimatedTextOverlay,
  DEFAULT_Z_INDEX,
  OverlayImage,
  RenderLayer,
  RenderLine,
  SCALE
} from './shared/BaseElements';

interface _Props {
  question: Question;
  userInputs: Record<number, string>;
  activeInputId: number | null;
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  offsetY?: number;
}

const QuestionFillCanvas: React.FC<_Props> = ({
  question,
  userInputs,
  activeInputId,
  onSelectInput,
  offsetY = 0
}) => {
  const tapGesture = useMemo(() => Gesture.Tap().onEnd((e) => {
    let foundInputId: number | null = null;
    let absolutePos: { x: number, y: number } | undefined = undefined;

    const sorted = [...question.elements].sort((a, b) => {
      const az = a.zIndex ?? DEFAULT_Z_INDEX[a.type];
      const bz = b.zIndex ?? DEFAULT_Z_INDEX[b.type];
      return bz - az;
    });

    const adjustedY = e.y - offsetY;

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
            y: e.absoluteY - (e.y - (cy + offsetY))
          };
          break;
        }
      }
    }

    if (onSelectInput) {
      onSelectInput(foundInputId, absolutePos);
    }
  }).runOnJS(true), [question, onSelectInput, offsetY]);

  const layers = useMemo(() => {
    const allElements: any[] = question.elements.map(el => ({
      ...el,
      effectiveZIndex: el.zIndex ?? DEFAULT_Z_INDEX[el.type]
    }));

    allElements.sort((a, b) => a.effectiveZIndex - b.effectiveZIndex);

    const groupedLayers: RenderLayer[] = [];
    allElements.forEach((el) => {
      const zIndex = el.effectiveZIndex;
      const lastLayer = groupedLayers[groupedLayers.length - 1];
      const isCanvasType = el.type === 'shape' || el.type === 'line';

      if (isCanvasType && lastLayer?.type === 'canvas' && lastLayer.zIndex === zIndex) {
        lastLayer.elements.push(el);
      } else if (isCanvasType) {
        groupedLayers.push({ type: 'canvas', elements: [el], zIndex });
      } else if (el.type === 'text') {
        groupedLayers.push({ type: 'text', elements: [el], zIndex });
      } else if (el.type === 'image') {
        groupedLayers.push({ type: 'image', elements: [el], zIndex });
      }
    });

    return groupedLayers;
  }, [question.elements]);

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={[StyleSheet.absoluteFill, { top: offsetY }]}>
        {layers.map((layer, layerIdx) => {
          const layerKey = `layer-${layer.type}-${layer.zIndex}-${layerIdx}`;

          if (layer.type === 'canvas') {
            return (
              <View key={layerKey} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex }]} pointerEvents="none">
                <Canvas style={StyleSheet.absoluteFill}>
                  {layer.elements.map((el) => (
                    el.type === 'line' ? (
                      <RenderLine key={`line-${el.id}`} line={el} />
                    ) : (
                      <AnimatedShapeElement key={`shape-${el.id}`} shape={el} isFocused={el.id === activeInputId} />
                    )
                  ))}
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

          if (layer.type === 'image') {
            return (
              <View key={layerKey} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex }]} pointerEvents="none">
                {layer.elements.map(el => <OverlayImage key={`img-${el.id}`} imageEl={el} />)}
              </View>
            );
          }

          return null;
        })}
      </View>
    </GestureDetector>
  );
};

export default memo(QuestionFillCanvas);
