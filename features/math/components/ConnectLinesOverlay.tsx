import { COLOR, SIZE } from '@/constants/theme';
import { ConnectLineGeometry } from '@/hooks/useConnectLines';
import { ConnectLine } from '@/services/types/question.types';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface _Props {
  lineData?: Array<ConnectLine & ConnectLineGeometry>;
}

const getConnectLineLabelPosition = (
  midpoint: { x: number; y: number },
  sourcePoint: { x: number; y: number },
  targetPoint: { x: number; y: number },
  labelText: string,
  labelOffset: number = 15,
  labelAnchor: 'first' | 'center' | 'last' = 'center',
) => {
  const dx = targetPoint.x - sourcePoint.x;
  const dy = targetPoint.y - sourcePoint.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  const anchorRatio = labelAnchor === 'first' ? 0.25 : labelAnchor === 'last' ? 0.75 : 0.5;
  const anchorOffset = (anchorRatio - 0.5) * length;
  const anchorX = midpoint.x + ux * anchorOffset;
  const anchorY = midpoint.y + uy * anchorOffset;

  const labelHeight = 24;
  const labelWidth = Math.min(88, Math.max(28, labelText.length * 9 + 12));

  const normalX = -uy;
  const normalY = ux;
  const upwardNormalX = normalY > 0 ? -normalX : normalX;
  const upwardNormalY = normalY > 0 ? -normalY : normalY;

  const left = anchorX + upwardNormalX * labelOffset - labelWidth / 2;
  const top = anchorY + upwardNormalY * labelOffset - labelHeight / 2;

  return {
    left,
    top,
    labelWidth,
    labelHeight,
  };
};

const ConnectLineItem: React.FC<ConnectLine & ConnectLineGeometry> = memo(({
  sourcePoint, midpoint, targetPoint, distance, angle, label, labelOffset, labelAnchor = 'center',
  color = COLOR.gray, stroke = 1, style = 'solid'
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const strokeWidth = stroke ?? 1;
  const isDashed = style === 'dashed' || style === 'dotted';
  const labelPosition = label && label.trim() !== ''
    ? getConnectLineLabelPosition(midpoint, sourcePoint, targetPoint, label, labelOffset, labelAnchor)
    : null;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <>
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

      {labelPosition && (
        <View
          style={{
            position: 'absolute',
            left: labelPosition.left,
            top: labelPosition.top,
            width: labelPosition.labelWidth,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            zIndex: 2,
          }}
        >
          <Text style={{ color: color, fontSize: SIZE.md }}>{label}</Text>
        </View>
      )}
    </>
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
