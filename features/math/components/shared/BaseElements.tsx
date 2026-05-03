import { COLOR } from '@/constants/theme';
import { GAME_CONFIG } from '@/game_config';
import { ImageElement, LineElement, ShapeElement } from '@/services/types/math.types';
import { Circle, Group, Line, Path, RoundedRect, Skia } from '@shopify/react-native-skia';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Image as RNImage, StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const SCALE = SCREEN_WIDTH / GAME_CONFIG.virtualWidth;

export const DEFAULT_Z_INDEX: Record<string, number> = {
  line: 1,
  image: 2,
  shape: 3,
  text: 4,
};

export type RenderLayer = {
  type: 'canvas' | 'text' | 'image';
  elements: any[];
  zIndex: number;
};

export const getColor = (c?: string, fallback: string = 'black') => {
  'worklet';
  return c ? ((COLOR as any)[c] || c) : fallback;
};

export const createPath = (shape: ShapeElement) => {
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
export const AnimatedShapeElement = memo(({ shape, isFocused, externalScale }: { shape: ShapeElement, isFocused: SharedValue<boolean> | boolean, externalScale?: any }) => {
  const internalScale = useSharedValue(1);

  const isFocusedValue = useDerivedValue(() => {
    if (typeof isFocused === 'object' && 'value' in isFocused) {
      return isFocused.value;
    }
    return isFocused;
  });

  useEffect(() => {
    // Nếu là giá trị boolean tĩnh, vẫn dùng useEffect để cập nhật internalScale
    if (typeof isFocused === 'boolean') {
      internalScale.value = withSpring(isFocused ? 1.05 : 1, { mass: 0.5, damping: 10 });
    }
  }, [isFocused]);

  // Nếu dùng externalScale thì ưu tiên, không thì dùng logic scale tự động dựa trên isFocused
  const derivedScale = useDerivedValue(() => {
    if (externalScale) return externalScale.value;
    return withSpring(isFocusedValue.value ? 1.05 : 1, { mass: 0.5, damping: 10 });
  });

  const activeScale = derivedScale;

  const cx = shape.position.x * SCALE;
  const cy = shape.position.y * SCALE;
  const w = (shape.width || shape.size || 100) * SCALE;
  const h = (shape.height || shape.size || 100) * SCALE;

  const strokeColor = useDerivedValue(() => {
    const focused = isFocusedValue.value;
    // Đối với Anchor, màu viền LUÔN LUÔN giữ nguyên theo dữ liệu (mặc định là đen)
    if (shape.isAnchor) {
      return getColor(shape.borderColor, 'black');
    }

    // Đối với các ô nhập liệu (Fill), vẫn giữ màu cam khi focused
    return focused ? '#FF9800' : getColor(shape.borderColor);
  });

  const strokeWidth = useDerivedValue(() => {
    const focused = isFocusedValue.value;
    // Sử dụng ?? để chấp nhận giá trị 0
    if (shape.isAnchor) {
      return (shape.borderWidth ?? 4) * SCALE;
    }

    return focused ? 6 * SCALE : (shape.borderWidth ?? 4) * SCALE;
  });
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

  const transform = useDerivedValue(() => [{ scale: activeScale.value }]);

  return (
    <Group transform={transform} origin={origin}>
      {content}
    </Group>
  );
});

export const RenderLine = memo(({ line }: { line: LineElement }) => {
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
      path.moveTo(p2.x, p2.y);
      path.lineTo(
        p2.x - arrowSize * Math.cos(angle - arrowAngle),
        p2.y - arrowSize * Math.sin(angle - arrowAngle)
      );
      path.lineTo(
        p2.x - arrowSize * Math.cos(angle + arrowAngle),
        p2.y - arrowSize * Math.sin(angle + arrowAngle)
      );
      path.close();

      return (
        <Group>
          {mainLine}
          <Path path={path} color={color} style="fill" />
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

export const AnimatedTextOverlay = memo(({ shape, textToRender }: { shape: ShapeElement, textToRender: string }) => {
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

export const OverlayImage = memo(({ imageEl }: { imageEl: ImageElement }) => {
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

const styles = StyleSheet.create({
  absoluteCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeText: {
    fontWeight: 'bold',
  },
});
