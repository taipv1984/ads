import { COLOR } from '@/constants/theme';
import { Question, ShapeElement } from '@/services/types/math.types';
import { Canvas, Circle, Group, Line, Path, Shadow, Skia } from '@shopify/react-native-skia';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import {
  AnimatedShapeElement,
  AnimatedTextOverlay,
  DEFAULT_Z_INDEX,
  getColor,
  OverlayImage,
  RenderLayer,
  RenderLine,
  SCALE
} from './shared/BaseElements';

interface Props {
  question: Question;
  userInputs: Record<number, string>;
  onConnectionsChange?: (connections: { from: number, to: number }[]) => void;
  offsetY?: number;
}

const AnimatedAnchor = memo(({ shape, activeAnchorIdx, hoverAnchorIdx, index, isConnected }: { shape: ShapeElement, activeAnchorIdx: any, hoverAnchorIdx: any, index: number, isConnected: boolean }) => {
  const scale = useDerivedValue(() => {
    const activeIdx = activeAnchorIdx?.value ?? -1;
    const hoverIdx = hoverAnchorIdx?.value ?? -1;
    const isActive = activeIdx === index;
    const isHovered = hoverIdx === index;
    return withSpring(isActive || isHovered ? 1.2 : 1, { mass: 0.5, damping: 10 });
  });

  return (
    <AnimatedShapeElement 
      shape={shape} 
      isFocused={isConnected} 
      externalScale={scale}
    />
  );
});

const QuestionMatchCanvas: React.FC<Props> = ({
  question,
  userInputs,
  onConnectionsChange,
  offsetY = 0
}) => {
  const [connections, setConnections] = useState<{ from: number, to: number }[]>([]);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const curX = useSharedValue(0);
  const curY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const activeAnchorIdx = useSharedValue(-1);
  const hoverAnchorIdx = useSharedValue(-1);

  const anchorXs = useSharedValue<number[]>([]);
  const anchorYs = useSharedValue<number[]>([]);
  const anchorRs = useSharedValue<number[]>([]);
  const anchorGroups = useSharedValue<string[]>([]);

  const anchorElements = useMemo(() => {
    return (question.elements || []).filter(el => el.type === 'shape' && (el as ShapeElement).isAnchor) as ShapeElement[];
  }, [question.elements]);

  useEffect(() => {
    if (anchorElements.length > 0) {
      anchorXs.value = anchorElements.map(a => a.position.x * SCALE);
      anchorYs.value = anchorElements.map(a => a.position.y * SCALE);
      anchorRs.value = anchorElements.map(a => ((a.size || 40) / 2) * SCALE);
      anchorGroups.value = anchorElements.map(a => a.group || '');
    } else {
      anchorXs.value = [];
      anchorYs.value = [];
      anchorRs.value = [];
      anchorGroups.value = [];
    }
    setConnections([]);
  }, [anchorElements]);

  const handleConnect = React.useCallback((from: number, to: number) => {
    setConnections(prev => {
      const newConnections = prev.filter(c => c.from !== from && c.from !== to && c.to !== from && c.to !== to);
      newConnections.push({ from, to });
      if (onConnectionsChange) onConnectionsChange(newConnections);
      return newConnections;
    });
  }, [onConnectionsChange]);

  const dragPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    if (isDragging.value) {
      path.moveTo(startX.value, startY.value);
      path.lineTo(curX.value, curY.value);
    }
    return path;
  });

  const panGesture = useMemo(() => Gesture.Pan()
    .onBegin(e => {
      'worklet';
      const xs = anchorXs.value;
      const ys = anchorYs.value;
      const rs = anchorRs.value;
      let found = -1;
      for (let i = 0; i < xs.length; i++) {
        const dx = e.x - xs[i];
        const dy = e.y - ys[i];
        if (Math.sqrt(dx * dx + dy * dy) <= rs[i] * 1.5) {
          found = i;
          break;
        }
      }
      if (found >= 0) {
        startX.value = xs[found];
        startY.value = ys[found];
        curX.value = xs[found];
        curY.value = ys[found];
        isDragging.value = true;
        activeAnchorIdx.value = found;
      }
    })
    .onUpdate(e => {
      'worklet';
      if (!isDragging.value) return;
      const xs = anchorXs.value;
      const ys = anchorYs.value;
      const rs = anchorRs.value;
      const groups = anchorGroups.value;
      const adjY = e.y;

      // LUÔN cập nhật đầu đường kẻ theo ngón tay để cảm giác kéo mượt mà
      curX.value = e.x;
      curY.value = adjY;

      let targetFound = -1;
      const sourceGroup = groups[activeAnchorIdx.value];

      for (let i = 0; i < xs.length; i++) {
        if (i === activeAnchorIdx.value) continue;
        
        // KIỂM TRA NHÓM
        if (sourceGroup && groups[i] === sourceGroup) continue;

        const dx = e.x - xs[i];
        const dy = adjY - ys[i];
        // Kiểm tra xem có đang "hover" qua điểm neo nào không
        if (Math.sqrt(dx * dx + dy * dy) <= rs[i] * 2) {
          targetFound = i;
          break;
        }
      }
      hoverAnchorIdx.value = targetFound;
    })
    .onEnd(e => {
      'worklet';
      if (!isDragging.value) return;
      const xs = anchorXs.value;
      const ys = anchorYs.value;
      const rs = anchorRs.value;
      const groups = anchorGroups.value;
      let targetIdx = -1;
      const adjY = e.y;
      const sourceGroup = groups[activeAnchorIdx.value];

      for (let i = 0; i < xs.length; i++) {
        if (i === activeAnchorIdx.value) continue;
        
        // KIỂM TRA NHÓM
        if (sourceGroup && groups[i] === sourceGroup) continue;

        const dx = e.x - xs[i];
        const dy = adjY - ys[i];
        if (Math.sqrt(dx * dx + dy * dy) <= rs[i] * 2) {
          targetIdx = i;
          break;
        }
      }
      if (targetIdx >= 0) runOnJS(handleConnect)(activeAnchorIdx.value, targetIdx);
      isDragging.value = false;
      activeAnchorIdx.value = -1;
      hoverAnchorIdx.value = -1;
    }), [handleConnect, anchorElements]);

  const layers = useMemo(() => {
    const allElements: any[] = [
      ...(question.elements || []).map(el => {
        const effectiveZIndex = el.zIndex ?? DEFAULT_Z_INDEX[el.type];
        if (el.type === 'shape' && (el as ShapeElement).isAnchor) {
          const anchorIdx = anchorElements.findIndex(a => a.id === el.id);
          return { ...el, effectiveZIndex, anchorIdx };
        }
        return { ...el, effectiveZIndex };
      }),
      { type: 'user-connections', effectiveZIndex: DEFAULT_Z_INDEX.line }
    ];

    allElements.sort((a, b) => a.effectiveZIndex - b.effectiveZIndex);

    const groupedLayers: RenderLayer[] = [];
    allElements.forEach((el) => {
      const zIndex = el.effectiveZIndex;
      const lastLayer = groupedLayers[groupedLayers.length - 1];
      const isCanvasType = el.type === 'shape' || el.type === 'line' || el.type === 'user-connections';

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
  }, [question.elements, anchorElements]);

  return (
    <View style={[StyleSheet.absoluteFill, { top: offsetY }]}>
      <GestureDetector gesture={panGesture}>
        <View style={StyleSheet.absoluteFill}>
          {layers.map((layer, layerIdx) => {
          const layerKey = `layer-${layer.type}-${layer.zIndex}-${layerIdx}`;

          if (layer.type === 'canvas') {
            return (
              <View key={layerKey} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex }]} pointerEvents="none">
                <Canvas style={StyleSheet.absoluteFill}>
                  {layer.elements.map((el) => {
                    if (el.type === 'line') return <RenderLine key={`line-${el.id}`} line={el} />;
                    if (el.type === 'shape') {
                      if (el.isAnchor) {
                        const isConnected = connections.some(c => c.from === el.anchorIdx || c.to === el.anchorIdx);
                        return (
                          <AnimatedAnchor
                            key={`anchor-${el.id}`}
                            shape={el}
                            activeAnchorIdx={activeAnchorIdx}
                            hoverAnchorIdx={hoverAnchorIdx}
                            index={el.anchorIdx}
                            isConnected={isConnected}
                          />
                        );
                      }
                      return <AnimatedShapeElement key={`shape-${el.id}`} shape={el} isFocused={false} />;
                    }
                    if (el.type === 'user-connections') {
                      if (anchorElements.length === 0) return null;
                      return (
                        <Group key="user-conns-group">
                          {connections.map((c, i) => {
                            const fromA = anchorElements[c.from];
                            const toA = anchorElements[c.to];
                            if (!fromA || !toA) return null;
                            return (
                              <Line
                                key={`conn-${i}`}
                                p1={{ x: fromA.position.x * SCALE, y: fromA.position.y * SCALE }}
                                p2={{ x: toA.position.x * SCALE, y: toA.position.y * SCALE }}
                                color={COLOR.primary}
                                strokeWidth={6 * SCALE}
                                style="stroke"
                                strokeCap="round"
                              >
                                <Shadow dx={0} dy={0} blur={8} color="rgba(0,0,0,0.2)" />
                              </Line>
                            );
                          })}
                          <Path path={dragPath} color={COLOR.primary} strokeWidth={6 * SCALE} style="stroke" strokeCap="round">
                            <Shadow dx={0} dy={0} blur={8} color="rgba(0,0,0,0.2)" />
                          </Path>
                        </Group>
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
                  const fs = (el.fontSize || 40) * SCALE;
                  return (
                    <View
                      key={`text-${el.id}`}
                      style={[styles.textContainer, { left: el.position.x * SCALE, top: el.position.y * SCALE - fs / 2, zIndex: layer.zIndex }]}
                      pointerEvents="none"
                    >
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: fs, color: getColor(el.color), fontWeight: 'bold' }}>
                          {el.content}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </React.Fragment>
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
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    pointerEvents: 'none',
  }
});

export default memo(QuestionMatchCanvas);
