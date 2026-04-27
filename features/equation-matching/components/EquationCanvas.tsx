import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, Line, Path, Skia, Group, Shadow } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, runOnJS, useDerivedValue } from 'react-native-reanimated';
import { EquationQuestion, Connection, EquationItemData } from '../types/equation.types';
import EquationItem, { ITEM_WIDTH, ITEM_HEIGHT } from './EquationItem';
import { COLOR } from '@/constants/theme';

const { width } = Dimensions.get('window');

// Layout constants
const LEFT_COL_X = width * 0.04;
const RIGHT_COL_X = width * 0.96 - ITEM_WIDTH;
const VERTICAL_GAP = 75; 
const START_Y = 20;

interface Props {
  question: EquationQuestion;
  connections: Connection[];
  isChecked: boolean;
  onConnect: (from: EquationItemData, to: EquationItemData) => void;
}

export const EquationCanvas: React.FC<Props> = ({ question, connections, isChecked, onConnect }) => {
  const [localActiveId, setLocalActiveId] = useState<string | null>(null);

  // Shared values cho dragging
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const curX = useSharedValue(0);
  const curY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const activeIdSV = useSharedValue<string | null>(null);

  // Vị trí các item
  const itemPositions = useMemo(() => {
    const pos: Record<string, { x: number, y: number, side: 'left' | 'right' }> = {};
    question.leftItems.forEach((item, index) => {
      pos[item.id] = { x: LEFT_COL_X, y: START_Y + index * VERTICAL_GAP, side: 'left' };
    });
    question.rightItems.forEach((item, index) => {
      pos[item.id] = { x: RIGHT_COL_X, y: START_Y + index * VERTICAL_GAP, side: 'right' };
    });
    return pos;
  }, [question]);

  const posSV = useSharedValue(itemPositions);
  useEffect(() => {
    posSV.value = itemPositions;
  }, [itemPositions]);

  // Helper cho anchor
  const getAnchor = (id: string) => {
    const pos = itemPositions[id];
    if (!pos) return { x: 0, y: 0 };
    return pos.side === 'left' 
      ? { x: pos.x + ITEM_WIDTH, y: pos.y + ITEM_HEIGHT / 2 }
      : { x: pos.x, y: pos.y + ITEM_HEIGHT / 2 };
  };

  // Hàm handleConnect phải định nghĩa trước khi dùng trong gesture
  const handleConnect = (fId: string, tId: string) => {
    const allItems = [...question.leftItems, ...question.rightItems];
    const fromItem = allItems.find(i => i.id === fId);
    const toItem = allItems.find(i => i.id === tId);
    if (fromItem && toItem) onConnect(fromItem, toItem);
  };

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      'worklet';
      const currentPos = posSV.value;
      let foundId: string | null = null;

      for (const id in currentPos) {
        const p = currentPos[id];
        if (e.x >= p.x && e.x <= p.x + ITEM_WIDTH && 
            e.y >= p.y && e.y <= p.y + ITEM_HEIGHT) {
          foundId = id;
          break;
        }
      }

      if (foundId) {
        activeIdSV.value = foundId;
        runOnJS(setLocalActiveId)(foundId);
        
        const p = currentPos[foundId];
        const ax = p.side === 'left' ? p.x + ITEM_WIDTH : p.x;
        const ay = p.y + ITEM_HEIGHT / 2;
        
        startX.value = ax;
        startY.value = ay;
        curX.value = ax;
        curY.value = ay;
        isDragging.value = true;
      }
    })
    .onUpdate((e) => {
      'worklet';
      if (!isDragging.value) return;
      curX.value = e.x;
      curY.value = e.y;
    })
    .onEnd((e) => {
      'worklet';
      if (!isDragging.value || !activeIdSV.value) return;

      const fromId = activeIdSV.value;
      const currentPos = posSV.value;
      const fromSide = currentPos[fromId].side;
      let toId: string | null = null;

      for (const id in currentPos) {
        const p = currentPos[id];
        if (p.side !== fromSide && 
            e.x >= p.x && e.x <= p.x + ITEM_WIDTH && 
            e.y >= p.y && e.y <= p.y + ITEM_HEIGHT) {
          toId = id;
          break;
        }
      }

      if (toId) {
        runOnJS(handleConnect)(fromId, toId);
      }

      isDragging.value = false;
      activeIdSV.value = null;
      runOnJS(setLocalActiveId)(null);
    });

  const dragPath = useDerivedValue(() => {
    'worklet';
    const path = Skia.Path.Make();
    if (!isDragging.value) return path;
    path.moveTo(startX.value, startY.value);
    path.lineTo(curX.value, curY.value);
    return path;
  });

  const totalHeight = useMemo(() => {
    const count = Math.max(question.leftItems.length, question.rightItems.length);
    return START_Y + count * VERTICAL_GAP + 40;
  }, [question]);

  return (
    <View style={[styles.container, { height: totalHeight }]}>
      <GestureDetector gesture={panGesture}>
        <View style={StyleSheet.absoluteFill}>
          <Canvas style={StyleSheet.absoluteFill}>
            {connections.map((conn, idx) => {
              const start = getAnchor(conn.fromId);
              const end = getAnchor(conn.toId);
              let color = '#333';
              if (isChecked) {
                color = conn.isCorrect ? COLOR.success : COLOR.error;
              }
              return (
                <Group key={`${conn.fromId}-${conn.toId}-${idx}`}>
                  <Line p1={start} p2={end} color={color} strokeWidth={3} strokeCap="round" />
                  {isChecked && (
                    <Line p1={start} p2={end} color={color + '33'} strokeWidth={10} strokeCap="round" />
                  )}
                </Group>
              );
            })}

            <Path path={dragPath} color="#666" strokeWidth={3} strokeCap="round" style="stroke">
              <Shadow dx={0} dy={0} blur={4} color="rgba(0,0,0,0.2)" />
            </Path>
          </Canvas>

          {question.leftItems.map((item) => (
            <View 
              key={item.id} 
              style={[styles.itemWrapper, { left: itemPositions[item.id].x, top: itemPositions[item.id].y }]}
              pointerEvents="none"
            >
              <EquationItem 
                item={item} 
                isSelected={localActiveId === item.id}
                isConnected={connections.some(c => c.fromId === item.id || c.toId === item.id)}
                isCorrect={isChecked ? connections.find(c => c.fromId === item.id)?.isCorrect : null}
              />
            </View>
          ))}

          {question.rightItems.map((item) => (
            <View 
              key={item.id} 
              style={[styles.itemWrapper, { left: itemPositions[item.id].x, top: itemPositions[item.id].y }]}
              pointerEvents="none"
            >
              <EquationItem 
                item={item} 
                isSelected={localActiveId === item.id}
                isConnected={connections.some(c => c.fromId === item.id || c.toId === item.id)}
                isCorrect={isChecked ? connections.find(c => c.toId === item.id)?.isCorrect : null}
              />
            </View>
          ))}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    position: 'absolute',
  }
});

export default EquationCanvas;
