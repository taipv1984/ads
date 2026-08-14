import { ConnectLineGeometry } from '@/hooks/useConnectLines';
import { ConnectLine } from '@/services/types/question.types';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface _Props {
  lineData?: Array<ConnectLine & ConnectLineGeometry>;
}

const ConnectLineItem: React.FC<ConnectLine & ConnectLineGeometry> = memo(({
  midpoint, distance, angle,
  color = '#000000', stroke = 1, style = 'solid'
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const strokeWidth = stroke ?? 2;
  const isDashed = style === 'dashed' || style === 'dotted';

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: midpoint.x - distance / 2,
        top: midpoint.y - strokeWidth / 2,
        width: distance,
        height: strokeWidth,
        backgroundColor: isDashed ? 'transparent' : color,
        borderBottomColor: color,
        borderBottomWidth: isDashed ? strokeWidth : 0,
        borderStyle: style === 'dashed' ? 'dashed' : style === 'dotted' ? 'dotted' : 'solid',
        transformOrigin: 'center',
        transform: [{ rotate: `${angle}deg` }],
        zIndex: 1,
        opacity,
      }}
    />
  );
});

/**
 * ConnectLinesOverlay — Container cho tất cả đường nối.
 *
 * - `absoluteFillObject`: phủ toàn bộ parent container
 * - `pointerEvents='none'`: không chặn touch vào các TextInput bên dưới
 * - `React.memo` với deep compare: chỉ re-render khi lineData thực sự thay đổi
 */
const ConnectLinesOverlay: React.FC<_Props> = memo(
  ({ lineData = [] }) => {
    if (!lineData.length) return null;

    return (
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {lineData.map((line) => (
          <ConnectLineItem
            key={line.id}
            {...line}
          />
        ))}
      </View>
    );
  },
  // Custom comparator: chỉ re-render khi lineData thay đổi về mặt giá trị
  (prev, next) => {
    const prevLines = prev.lineData ?? [];
    const nextLines = next.lineData ?? [];

    if (prevLines.length !== nextLines.length) return false;
    return prevLines.every((line, i) => {
      const other = nextLines[i];
      return (
        line.id === other?.id &&
        line.distance === other?.distance &&
        line.angle === other?.angle &&
        line.color === other?.color &&
        line.stroke === other?.stroke &&
        line.style === other?.style &&
        line.midpoint.x === other?.midpoint.x &&
        line.midpoint.y === other?.midpoint.y
      );
    });
  },
);

export default ConnectLinesOverlay;
