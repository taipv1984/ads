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
  source?: { x: string; y: string },
  target?: { x: string; y: string },
) => {
  const dx = targetPoint.x - sourcePoint.x;
  const dy = targetPoint.y - sourcePoint.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  const labelHeight = 22;
  const labelWidth = Math.min(88, Math.max(28, labelText.length * 9 + 12));
  const closeGap = 8;
  const sideGap = 10;

  // Calculate the shift along the line to center on the visible segment.
  // The circle has a radius of 25px when its anchor is 'center'.
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  const padSource = source?.x === 'center' ? 25 : 0;
  const padTarget = target?.x === 'center' ? 25 : 0;
  const shiftDist = (padSource - padTarget) / 2;

  const shiftX = shiftDist * ux;
  const shiftY = shiftDist * uy;

  let left = 0;
  let top = 0;

  if (absDx >= absDy) {
    // Keep short labels close to the connector, just above the line.
    left = midpoint.x + shiftX - labelWidth / 2;
    top = midpoint.y + shiftY - labelHeight - closeGap;
  } else {
    // Keep vertical connector labels offset to the side, but close to the line.
    const signX = dx >= 0 ? 1 : -1;
    left = midpoint.x + shiftX + signX * sideGap - labelWidth / 2;
    top = midpoint.y + shiftY - labelHeight / 2;
  }

  return {
    left,
    top,
    labelWidth,
    labelHeight,
  };
};

const ConnectLineItem: React.FC<ConnectLine & ConnectLineGeometry> = memo(({
  sourcePoint, midpoint, targetPoint, distance, angle, label, source, target,
  color = COLOR.gray, stroke = 1, style = 'solid'
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const strokeWidth = stroke ?? 1;
  const isDashed = style === 'dashed' || style === 'dotted';
  const labelPosition = label && label.trim() !== ''
    ? getConnectLineLabelPosition(midpoint, sourcePoint, targetPoint, label, source, target)
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
            height: labelPosition.labelHeight,
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
