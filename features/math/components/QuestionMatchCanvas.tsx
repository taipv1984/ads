import { COLOR } from '@/constants/theme';
import { ElementGroup, ValueType, ViewMode } from '@/enums/math.enum';
import { ImageElement, LineElement, Question, ShapeElement, TextElement } from '@/services/types/question.types';
import { calcExpression, getAnchorElements, getMatchValueType, groupElementsIntoLayers } from '@/utils/math.util';
import { Canvas, Group, Line, Path, Skia } from '@shopify/react-native-skia';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, SharedValue, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import {
  AnimatedShapeElement,
  AnimatedTextOverlay,
  getColor,
  OverlayImage,
  RenderLine,
  SCALE
} from './shared/BaseElements';

interface Props {
  question: Question;
  userInputs: Record<number, string>;
  viewMode?: ViewMode;
  connections?: { from: number, to: number }[]; // Thêm prop này để nhận dữ liệu hiện tại
  reviewConnections?: { from: number, to: number }[];
  onConnectionsChange?: (connections: { from: number, to: number }[]) => void;
  offsetY?: number;
}

const AnimatedAnchor = memo(({
  shape,
  activeAnchorIdx,
  hoverAnchorIdx,
  index,
  isConnected
}: {
  shape: ShapeElement,
  activeAnchorIdx: SharedValue<number>,
  hoverAnchorIdx: SharedValue<number>,
  index: number,
  isConnected: boolean
}) => {
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
  viewMode = ViewMode.EDIT,
  connections: parentConnections,
  reviewConnections,
  onConnectionsChange,
  offsetY = 0
}) => {
  const [internalConnections, setInternalConnections] = useState<{ from: number, to: number }[]>(parentConnections || []);
  const lastSyncedConnections = React.useRef<string>('');

  // Ensure connections is always an array
  const currentConnections = (viewMode === ViewMode.REVIEW ? reviewConnections : internalConnections) || [];
  const isReview = viewMode === ViewMode.REVIEW;
  const valueType = useMemo(() => getMatchValueType(question.elements || []), [question.elements]);

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
    return getAnchorElements(question.elements);
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
    // Chỉ khởi tạo lại khi câu hỏi thay đổi hoặc có sự thay đổi lớn từ bên ngoài (như Reset)
    // Sử dụng một bản so sánh nhẹ nhàng hơn JSON.stringify nếu có thể
    const parentLength = parentConnections?.length || 0;
    const internalLength = internalConnections.length;

    if (parentLength !== internalLength || (parentLength > 0 && parentConnections !== internalConnections)) {
      setInternalConnections(parentConnections || []);
      lastSyncedConnections.current = JSON.stringify(parentConnections || []);
    }
  }, [question.id, parentConnections]); // Chỉ theo dõi ID và ref của parentConnections

  const handleConnect = React.useCallback((fromIdx: number, toIdx: number) => {
    if (isReview) return;
    const fromEl = anchorElements[fromIdx];
    const toEl = anchorElements[toIdx];
    if (!fromEl || !toEl) return;

    setInternalConnections(prev => {
      const valueType = getMatchValueType(question.elements);
      let newConnections = [...prev];

      if (valueType === ValueType.SINGLE) {
        newConnections = prev.filter(c =>
          c.from !== fromEl.id && c.from !== toEl.id &&
          c.to !== fromEl.id && c.to !== toEl.id
        );
      } else {
        const isFromMaster = fromEl.group === 'master';
        const isToMaster = toEl.group === 'master';
        if ((isFromMaster && isToMaster) || (!isFromMaster && !isToMaster)) return prev;
        const slaveId = isFromMaster ? toEl.id : fromEl.id;
        newConnections = newConnections.filter(c => c.to !== slaveId && c.from !== slaveId);
        if (newConnections.some(c => (c.from === fromEl.id && c.to === toEl.id) || (c.from === toEl.id && c.to === fromEl.id))) return prev;
      }

      newConnections.push({ from: fromEl.id, to: toEl.id });
      return newConnections;
    });
  }, [question.elements, anchorElements, isReview]);

  // Đồng bộ hóa kết nối ra bên ngoài thông qua useEffect
  useEffect(() => {
    if (isReview || !onConnectionsChange) return;

    // Debounce hoặc chỉ đồng bộ khi dữ liệu thực sự khác biệt
    const currentStr = JSON.stringify(internalConnections);
    if (currentStr !== lastSyncedConnections.current) {
      // Sử dụng requestAnimationFrame hoặc delay nhỏ để không làm nghẽn UI thread
      const timeout = setTimeout(() => {
        lastSyncedConnections.current = currentStr;
        onConnectionsChange(internalConnections);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [internalConnections, onConnectionsChange, isReview, question.id]);

  const dragPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    if (isDragging.value) {
      path.moveTo(startX.value, startY.value);
      path.lineTo(curX.value, curY.value);
    }
    return path;
  });

  const panGesture = useMemo(() => Gesture.Pan()
    .enabled(!isReview)
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

        const targetGroup = groups[i];

        // LOGIC KẾT NỐI TỔNG QUÁT (General Case)
        if (valueType === ValueType.MULTI) {
          // Trong chế độ multi, ít nhất một bên phải là master
          if (sourceGroup !== ElementGroup.MASTER && targetGroup !== ElementGroup.MASTER) continue;
        }

        // Luôn ngăn nối cùng nhóm
        if (sourceGroup && targetGroup === sourceGroup) continue;

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

        const targetGroup = groups[i];

        // LOGIC KẾT NỐI TỔNG QUÁT
        if (valueType === ValueType.MULTI) {
          if (sourceGroup !== ElementGroup.MASTER && targetGroup !== ElementGroup.MASTER) continue;
        }
        if (sourceGroup && targetGroup === sourceGroup) continue;

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
    return groupElementsIntoLayers(question.elements || [], anchorElements, true);
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
                      if (el.type === 'line') {
                        const lineEl = el as LineElement;
                        return <RenderLine key={`line-${lineEl.id}`} line={lineEl} />;
                      }
                      if (el.type === 'shape') {
                        const shape = el as ShapeElement & { anchorIdx?: number };
                        if (shape.isAnchor) {
                          const isConnected = Array.isArray(currentConnections) && currentConnections.some(c => c.from === shape.id || c.to === shape.id);
                          return (
                            <AnimatedAnchor
                              key={`anchor-${shape.id}`}
                              shape={shape}
                              activeAnchorIdx={activeAnchorIdx}
                              hoverAnchorIdx={hoverAnchorIdx}
                              index={shape.anchorIdx ?? -1}
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
                            {Array.isArray(currentConnections) && currentConnections.map((c, i) => {
                              const fromA = anchorElements.find(a => a.id === c.from);
                              const toA = anchorElements.find(a => a.id === c.to);
                              if (!fromA || !toA) return null;

                              let lineColor: string = COLOR.focus;
                              if (isReview) {
                                const isCorrect = calcExpression(fromA.value || '') === calcExpression(toA.value || '');
                                lineColor = isCorrect ? COLOR.success : COLOR.error;
                              }

                              return (
                                <Line
                                  key={`conn-${i}`}
                                  p1={{ x: fromA.position.x * SCALE, y: fromA.position.y * SCALE }}
                                  p2={{ x: toA.position.x * SCALE, y: toA.position.y * SCALE }}
                                  color={lineColor}
                                  strokeWidth={6 * SCALE}
                                  style="stroke"
                                  strokeCap="round"
                                />
                              );
                            })}
                            <Path path={dragPath} color={COLOR.focus} strokeWidth={6 * SCALE} style="stroke" strokeCap="round" />
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
                    const textEl = el as TextElement;
                    const fs = (textEl.fontSize || 40) * SCALE;
                    return (
                      <View
                        key={`text-${textEl.id}`}
                        style={[styles.textContainer, { left: textEl.position.x * SCALE, top: textEl.position.y * SCALE - fs / 2, zIndex: layer.zIndex }]}
                        pointerEvents="none"
                      >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                          <Text style={{ fontSize: fs, color: getColor(textEl.color), fontWeight: 'bold' }}>
                            {textEl.label}
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
                  {layer.elements.map(el => {
                    const imgEl = el as ImageElement;
                    return <OverlayImage key={`img-${imgEl.id}`} imageEl={imgEl} />;
                  })}
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
