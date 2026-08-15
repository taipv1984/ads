import { COLOR } from '@/constants/theme';
import { ConnectLineGeometry } from '@/hooks/useConnectLines';
import { ConnectLine } from '@/services/types/question.types';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface _Props {
  lineData?: Array<ConnectLine & ConnectLineGeometry>;
}

const ConnectLineItem: React.FC<ConnectLine & ConnectLineGeometry> = memo(({
  sourcePoint, distance, angle,
  color = COLOR.gray, stroke = 1, style = 'solid'
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
        left: sourcePoint.x,
        top: sourcePoint.y - strokeWidth / 2,
        width: distance,
        height: strokeWidth,
        backgroundColor: isDashed ? 'transparent' : color,
        borderBottomColor: color,
        borderBottomWidth: isDashed ? strokeWidth : 0,
        borderStyle: style === 'dashed' ? 'dashed' : style === 'dotted' ? 'dotted' : 'solid',
        transformOrigin: 'left center',
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
        line.sourcePoint.x === other?.sourcePoint.x &&
        line.sourcePoint.y === other?.sourcePoint.y &&
        line.targetPoint.x === other?.targetPoint.x &&
        line.targetPoint.y === other?.targetPoint.y
      );
    });
  },
);

export default ConnectLinesOverlay;
