import { COLOR } from '@/constants/theme';
import { Canvas, Circle, Group, Line, Path, RoundedRect, Skia } from '@shopify/react-native-skia';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Dimensions, Image as RNImage, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { GAME_CONFIG } from '../../../game_config';
import { ImageElement, LineElement, Question, ShapeElement, TextElement } from '../../../services/types/math-fill.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCALE = SCREEN_WIDTH / GAME_CONFIG.virtualWidth;

interface MathFillCanvasProps {
  question: Question;
  userInputs: Record<number, string>;
  activeInputId: number | null;
  onSelectInput: (id: number | null, absPos?: { x: number, y: number }) => void;
  offsetY?: number;
}

const getColor = (c?: string, fallback: string = 'black') => c ? ((COLOR as any)[c] || c) : fallback;

const createPath = (shape: ShapeElement) => {
  const path = Skia.Path.Make();
  const cx = shape.position.x * SCALE;
  const cy = shape.position.y * SCALE;
  const s = (shape.size || 100) * SCALE;
  const half = s / 2;

  if (shape.shapeType === 'diamond') {
    path.moveTo(cx, cy - half);
    path.lineTo(cx + half, cy);
    path.lineTo(cx, cy + half);
    path.lineTo(cx - half, cy);
    path.close();
  } else if (shape.shapeType === 'triangle') {
    path.moveTo(cx, cy - half);
    path.lineTo(cx + half, cy + half);
    path.lineTo(cx - half, cy + half);
    path.close();
  }
  return path;
};

// Memoized Sub-components
const AnimatedShapeElement = memo(({ shape, isFocused }: { shape: ShapeElement, isFocused: boolean }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.05 : 1, { mass: 0.5, damping: 10 });
  }, [isFocused]);

  const cx = shape.position.x * SCALE;
  const cy = shape.position.y * SCALE;
  const w = (shape.width || shape.size || 100) * SCALE;
  const h = (shape.height || shape.size || 100) * SCALE;

  const strokeColor = isFocused ? '#FF9800' : getColor(shape.borderColor);
  const strokeWidth = isFocused ? 6 * SCALE : (shape.borderWidth || 4) * SCALE;
  const bgColor = getColor(shape.bgColor, 'white');
  const origin = { x: cx, y: cy };

  let content = null;
  if (shape.shapeType === 'circle') {
    content = (
      <Group>
        <Circle cx={cx} cy={cy} r={w / 2} color={bgColor} />
        <Circle cx={cx} cy={cy} r={w / 2} color={strokeColor} style="stroke" strokeWidth={strokeWidth} />
      </Group>
    );
  } else if (shape.shapeType === 'square' || shape.shapeType === 'rect') {
    content = (
      <Group>
        <RoundedRect x={cx - w / 2} y={cy - h / 2} width={w} height={h} r={3 * SCALE} color={bgColor} />
        <RoundedRect x={cx - w / 2} y={cy - h / 2} width={w} height={h} r={3 * SCALE} color={strokeColor} style="stroke" strokeWidth={strokeWidth} />
      </Group>
    );
  } else if (shape.shapeType === 'diamond' || shape.shapeType === 'triangle') {
    const path = createPath(shape);
    content = (
      <Group>
        <Path path={path} color={bgColor} />
        <Path path={path} color={strokeColor} style="stroke" strokeWidth={strokeWidth} />
      </Group>
    );
  }

  const transform = useDerivedValue(() => [{ scale: scale.value }]);

  return (
    <Group transform={transform} origin={origin}>
      {content}
    </Group>
  );
});

const RenderLine = memo(({ line }: { line: LineElement }) => {
  const p1 = { x: line.start.x * SCALE, y: line.start.y * SCALE };
  const p2 = { x: line.end.x * SCALE, y: line.end.y * SCALE };
  const color = getColor(line.color);
  const strokeWidth = (line.strokeWidth || 4) * SCALE;

  if (line.lineType === 'straight' || line.lineType === 'arrow') {
    const mainLine = (
      <Line
        key={`main-${line.id}`}
        p1={p1}
        p2={p2}
        color={color}
        strokeWidth={strokeWidth}
        strokeCap="round"
      />
    );

    if (line.lineType === 'arrow') {
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const arrowSize = 35 * SCALE;
      const arrowAngle = Math.PI / 6; // 30 degrees

      const path = Skia.Path.Make();
      // Tip of the arrow
      path.moveTo(p2.x, p2.y);
      // Left wing
      path.lineTo(
        p2.x - arrowSize * Math.cos(angle - arrowAngle),
        p2.y - arrowSize * Math.sin(angle - arrowAngle)
      );
      // Right wing
      path.lineTo(
        p2.x - arrowSize * Math.cos(angle + arrowAngle),
        p2.y - arrowSize * Math.sin(angle + arrowAngle)
      );
      path.close();

      return (
        <Group>
          {mainLine}
          <Path
            path={path}
            color={color}
            style="fill"
          />
        </Group>
      );
    }
    return mainLine;
  } else if (line.lineType === 'curve' && line.controlPoints) {
    const path = Skia.Path.Make();
    path.moveTo(p1.x, p1.y);
    if (line.controlPoints.length >= 2) {
      path.cubicTo(
        line.controlPoints[0].x * SCALE, line.controlPoints[0].y * SCALE,
        line.controlPoints[1].x * SCALE, line.controlPoints[1].y * SCALE,
        p2.x, p2.y
      );
    }
    return (
      <Path
        path={path}
        color={color}
        style="stroke"
        strokeWidth={strokeWidth}
        strokeCap="round"
      />
    );
  }
  return null;
});

const AnimatedTextOverlay = memo(({ shape, textToRender }: { shape: ShapeElement, textToRender: string }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (textToRender !== '' && shape.isInput) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 100 }),
        withSpring(1, { damping: 10, mass: 0.5 })
      );
    }
  }, [textToRender]);

  const cx = shape.position.x * SCALE;
  const cy = shape.position.y * SCALE;
  const w = (shape.width || shape.size || 100) * SCALE;
  const h = (shape.height || shape.size || 100) * SCALE;
  const yOffset = shape.shapeType === 'triangle' ? (h / 5) : 0;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const align = shape.textAlign || 'center';
  const padding = 10 * SCALE;

  return (
    <View
      style={[
        styles.absoluteCenter,
        {
          left: cx - w / 2,
          top: cy - h / 2 + yOffset,
          width: w,
          height: h,
          alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
          paddingHorizontal: (align === 'left' || align === 'right') ? padding : 0,
        }
      ]}
      pointerEvents="none"
    >
      <Animated.Text
        style={[
          styles.shapeText,
          {
            color: getColor(shape.textColor),
            fontSize: (shape.textSize || 40) * SCALE,
            textAlign: align
          },
          animatedStyle
        ]}
      >
        {textToRender}
      </Animated.Text>
    </View>
  );
});

const OverlayImage = memo(({ imageEl }: { imageEl: ImageElement }) => {
  const [hasError, setHasError] = useState(false);
  const cx = imageEl.position.x * SCALE;
  const cy = imageEl.position.y * SCALE;
  const w = imageEl.width * SCALE;
  const h = imageEl.height * SCALE;

  let source = hasError ? require('@/assets/images/no-image.png') : { uri: imageEl.url };

  return (
    <View
      style={{
        position: 'absolute',
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
      }}
      pointerEvents="none"
    >
      <RNImage
        source={source}
        onError={() => setHasError(true)}
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
      />
    </View>
  );
});

// Group elements into layers for optimized rendering
type RenderLayer = {
  type: 'canvas' | 'text' | 'image';
  elements: any[];
  zIndex: number;
};

export const MathFillCanvas: React.FC<MathFillCanvasProps> = ({
  question,
  userInputs,
  activeInputId,
  onSelectInput,
  offsetY = 0
}) => {

  const tapGesture = useMemo(() => Gesture.Tap().onEnd((e) => {
    let foundInputId: number | null = null;
    let absolutePos: { x: number, y: number } | undefined = undefined;

    const sorted = [...question.elements].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

    // Hiệu chỉnh tọa độ chạm dựa trên offsetY
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

          // Tính toán tọa độ tuyệt đối của tâm Shape trên màn hình
          // e.absoluteX/Y là vị trí ngón tay chạm trên màn hình
          // e.x/y là vị trí ngón tay chạm so với container
          // Tâm của shape so với container là (cx, cy + offsetY)
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
    const sorted = [...question.elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    const groupedLayers: RenderLayer[] = [];

    sorted.forEach((el) => {
      const zIndex = el.zIndex || 0;
      const lastLayer = groupedLayers[groupedLayers.length - 1];

      if ((el.type === 'shape' || el.type === 'line') && lastLayer?.type === 'canvas' && lastLayer.zIndex === zIndex) {
        lastLayer.elements.push(el);
      } else if (el.type === 'shape' || el.type === 'line') {
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
    <View style={styles.container}>
      <GestureDetector gesture={tapGesture}>
        <View style={[StyleSheet.absoluteFill, { top: offsetY }]}>
          {layers.map((layer, layerIdx) => {
            const layerKey = `layer-${layer.type}-${layer.zIndex}-${layerIdx}`;

            if (layer.type === 'canvas') {
              return (
                <View key={layerKey} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex }]} pointerEvents="none">
                  <Canvas style={StyleSheet.absoluteFill}>
                    {layer.elements.map(el => (
                      el.type === 'line' ? (
                        <RenderLine key={`line-${el.id}`} line={el} />
                      ) : (
                        <AnimatedShapeElement key={`shape-${el.id}`} shape={el} isFocused={el.id === activeInputId} />
                      )
                    ))}
                  </Canvas>
                  {/* Text Overlays */}
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
                        key={`text-${el.id}`}
                        style={[styles.textContainer, { left: textEl.position.x * SCALE, top: textEl.position.y * SCALE - fs / 2, zIndex: layer.zIndex }]}
                        pointerEvents="none"
                      >
                        <Text style={{ fontSize: fs, color: getColor(textEl.color), fontWeight: 'bold' }}>
                          {textEl.content}
                        </Text>
                      </View>
                    );
                  })}
                </React.Fragment>
              );
            }

            if (layer.type === 'image') {
              return (
                <React.Fragment key={layerKey}>
                  {layer.elements.map(el => (
                    <View key={`img-${el.id}`} style={[StyleSheet.absoluteFill, { zIndex: layer.zIndex }]} pointerEvents="none">
                      <OverlayImage imageEl={el} />
                    </View>
                  ))}
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 246, 228, 1)',
  },
  absoluteCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeText: {
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    pointerEvents: 'none',
  }
});

export default memo(MathFillCanvas);
