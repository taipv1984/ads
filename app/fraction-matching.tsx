import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text as RNText, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Canvas, Oval, Line, RoundedRect, Shadow, Path, Skia, Group, Fill } from '@shopify/react-native-skia';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, withSpring, useDerivedValue, runOnJS } from 'react-native-reanimated';
import { Stack } from 'expo-router';
import { FRACTION_QUESTIONS, QuestionData, CandidateData } from '@/services/mocks/fraction-matching.mock';

const { width } = Dimensions.get('window');

// ─── Layout constants ─────────────────────────────────────────────────────────
const NODE_W    = 64;
const NODE_H    = 64;
const OVAL_W    = 72;
const OVAL_H    = 88;
const SNAP_R    = 80;
const LINE_W    = 6;
const LINE_COLOR = '#64B5F6';
const LINE_GLOW  = 'rgba(100,181,246,0.28)';

// Fixed positions: indices 0-3 = top row, 4-5 = bottom sides, 'target' = center
const CAND_POSITIONS = [
  { x: width * 0.15, y: 190 },
  { x: width * 0.38, y: 190 },
  { x: width * 0.62, y: 190 },
  { x: width * 0.85, y: 190 },
  { x: width * 0.18, y: 370 },
  { x: width * 0.82, y: 370 },
];
const TARGET_POS = { x: width * 0.5, y: 425 };

// ─── Types ────────────────────────────────────────────────────────────────────
interface Connection { fromId: string; isCorrect: boolean }

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isEquivalent(num1: number, den1: number, num2: number, den2: number) {
  return num1 * den2 === num2 * den1;
}
function getCorrectIds(q: QuestionData): string[] {
  return q.candidates
    .filter(c => isEquivalent(c.numerator, c.denominator, q.target.numerator, q.target.denominator))
    .map(c => c.id);
}

// ─── FractionLabel overlay ────────────────────────────────────────────────────
function FractionLabel({ x, y, w, h, num, den, isOval, isSelected, isConnected }: {
  x: number; y: number; w: number; h: number;
  num: number; den: number;
  isOval: boolean; isSelected: boolean; isConnected: boolean;
}) {
  const bg = isSelected && !isConnected ? '#E3F2FD' : 'transparent';
  return (
    <View
      pointerEvents="none"
      style={[styles.labelWrap, { left: x - w / 2, top: y - h / 2, width: w, height: h, backgroundColor: bg, borderRadius: isOval ? w / 2 : 10 }]}
    >
      <RNText style={[styles.fracNum, isOval && styles.blue]}>{num}</RNText>
      <View style={[styles.fracBar, isOval && styles.barBlue]} />
      <RNText style={[styles.fracDen, isOval && styles.blue]}>{den}</RNText>
    </View>
  );
}

// ─── Result Modal ─────────────────────────────────────────────────────────────
function ResultModal({ visible, allConnections, onClose }: {
  visible: boolean;
  allConnections: Record<number, Connection[]>;
  onClose: () => void;
}) {
  const results = FRACTION_QUESTIONS.map((q, idx) => {
    const conns       = allConnections[idx] ?? [];
    const correctIds  = getCorrectIds(q);
    const wrongConns  = conns.filter(c => !c.isCorrect);
    const connectedOk = conns.filter(c => c.isCorrect).map(c => c.fromId);
    const missing     = correctIds.filter(id => !connectedOk.includes(id));
    const perfect     = wrongConns.length === 0 && missing.length === 0;
    return { q, idx, perfect, wrongConns, missing };
  });

  const totalCorrect = results.filter(r => r.perfect).length;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <RNText style={styles.modalTitle}>
            {totalCorrect === FRACTION_QUESTIONS.length ? '🎉 Xuất sắc!' : `📋 Kết quả: ${totalCorrect}/${FRACTION_QUESTIONS.length} câu đúng`}
          </RNText>
          <ScrollView style={{ maxHeight: 340 }}>
            {results.map(({ q, idx, perfect, wrongConns, missing }) => (
              <View key={q.id} style={styles.resultRow}>
                <RNText style={styles.resultQ}>
                  {perfect ? '✅' : '❌'} Câu {idx + 1}: {q.title}
                </RNText>
                {!perfect && wrongConns.map(c => {
                  const cand = q.candidates.find(x => x.id === c.fromId)!;
                  return (
                    <RNText key={c.fromId} style={styles.resultDetail}>
                      • Sai: {cand.numerator}/{cand.denominator} ≠ {q.target.numerator}/{q.target.denominator}
                    </RNText>
                  );
                })}
                {!perfect && missing.map(id => {
                  const cand = q.candidates.find(x => x.id === id)!;
                  return (
                    <RNText key={id} style={[styles.resultDetail, { color: '#E65100' }]}>
                      • Chưa nối: {cand.numerator}/{cand.denominator} = {q.target.numerator}/{q.target.denominator}
                    </RNText>
                  );
                })}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
            <RNText style={styles.modalBtnText}>Đóng</RNText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function FractionMatchingScreen() {
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [allConnections, setAllConnections] = useState<Record<number, Connection[]>>({});
  const [selectedId,     setSelectedId]     = useState('');
  const [modalVisible,   setModalVisible]   = useState(false);

  const question   = FRACTION_QUESTIONS[currentIndex];
  const candidates = question.candidates;
  const target     = question.target;
  const isLast     = currentIndex === FRACTION_QUESTIONS.length - 1;
  const curConns   = allConnections[currentIndex] ?? [];
  const connectedIds = curConns.map(c => c.fromId);

  // Shared values for gesture (UI thread)
  const startX    = useSharedValue(0);
  const startY    = useSharedValue(0);
  const curX      = useSharedValue(0);
  const curY      = useSharedValue(0);
  const dragging  = useSharedValue(false);
  const activIdx  = useSharedValue(-1); // index into candidates array
  const activNum  = useSharedValue(0);
  const activDen  = useSharedValue(0);
  const activId   = useSharedValue('');

  // Shared values updated when question changes
  const candXs   = useSharedValue<number[]>(CAND_POSITIONS.map(p => p.x));
  const candYs   = useSharedValue<number[]>(CAND_POSITIONS.map(p => p.y));
  const candNums = useSharedValue<number[]>(candidates.map(c => c.numerator));
  const candDens = useSharedValue<number[]>(candidates.map(c => c.denominator));
  const candIds  = useSharedValue<string[]>(candidates.map(c => c.id));
  const tgtX     = useSharedValue(TARGET_POS.x);
  const tgtY     = useSharedValue(TARGET_POS.y);
  const tgtNum   = useSharedValue(target.numerator);
  const tgtDen   = useSharedValue(target.denominator);

  useEffect(() => {
    const q = FRACTION_QUESTIONS[currentIndex];
    candNums.value = q.candidates.map(c => c.numerator);
    candDens.value = q.candidates.map(c => c.denominator);
    candIds.value  = q.candidates.map(c => c.id);
    tgtNum.value   = q.target.numerator;
    tgtDen.value   = q.target.denominator;
    setSelectedId('');
    dragging.value = false;
    activIdx.value = -1;
  }, [currentIndex]);

  // JS-thread callbacks
  const handleSelect   = (id: string) => setSelectedId(id);
  const handleDeselect = () => setSelectedId('');
  const addConnection  = (fromId: string, isCorrect: boolean, qIdx: number) => {
    setAllConnections(prev => {
      const existing = prev[qIdx] ?? [];
      if (existing.some(c => c.fromId === fromId)) return prev;
      return { ...prev, [qIdx]: [...existing, { fromId, isCorrect }] };
    });
  };
  const resetCurrentQuestion = () => {
    setAllConnections(prev => ({ ...prev, [currentIndex]: [] }));
  };

  // Capture current question index for worklet
  const qIdxSV = useSharedValue(currentIndex);
  useEffect(() => { qIdxSV.value = currentIndex; }, [currentIndex]);

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      'worklet';
      const xs = candXs.value;
      const ys = candYs.value;
      let found = -1;
      for (let i = 0; i < xs.length; i++) {
        if (Math.abs(e.x - xs[i]) < NODE_W / 2 && Math.abs(e.y - ys[i]) < NODE_H / 2) {
          found = i;
          break;
        }
      }
      if (found >= 0) {
        startX.value   = xs[found];
        startY.value   = ys[found];
        curX.value     = xs[found];
        curY.value     = ys[found];
        dragging.value = true;
        activIdx.value = found;
        activNum.value = candNums.value[found];
        activDen.value = candDens.value[found];
        activId.value  = candIds.value[found];
        runOnJS(handleSelect)(candIds.value[found]);
      }
    })
    .onUpdate(e => {
      'worklet';
      if (!dragging.value) return;
      const tx   = tgtX.value;
      const ty   = tgtY.value;
      const dist = Math.sqrt((e.x - tx) * (e.x - tx) + (e.y - ty) * (e.y - ty));
      if (dist < SNAP_R) {
        curX.value = withSpring(tx, { damping: 15, stiffness: 200 });
        curY.value = withSpring(ty, { damping: 15, stiffness: 200 });
      } else {
        curX.value = e.x;
        curY.value = e.y;
      }
    })
    .onEnd(() => {
      'worklet';
      if (!dragging.value) return;
      const dx      = Math.abs(curX.value - tgtX.value);
      const dy      = Math.abs(curY.value - tgtY.value);
      const dropped = dx < OVAL_W / 2 && dy < OVAL_H / 2;
      if (dropped && activId.value !== '') {
        const correct = activNum.value * tgtDen.value === tgtNum.value * activDen.value;
        runOnJS(addConnection)(activId.value, correct, qIdxSV.value);
      }
      dragging.value = false;
      activIdx.value = -1;
      runOnJS(handleDeselect)();
    });

  const dragPath = useDerivedValue(() => {
    'worklet';
    const path = Skia.Path.Make();
    if (!dragging.value) return path;
    path.moveTo(startX.value, startY.value);
    path.lineTo(curX.value, curY.value);
    return path;
  });

  const goNext = () => { if (currentIndex < FRACTION_QUESTIONS.length - 1) setCurrentIndex(i => i + 1); };
  const goPrev = () => { if (currentIndex > 0) setCurrentIndex(i => i - 1); };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <Stack.Screen options={{ title: 'Nối phân số', headerShown: true }} />

      {/* Canvas area */}
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={panGesture}>
          <View style={StyleSheet.absoluteFill}>
            <Canvas style={StyleSheet.absoluteFill}>
              <Fill color="#F8F9FA" />

              {/* Connection lines */}
              {curConns.map(conn => {
                const ci = candidates.findIndex(c => c.id === conn.fromId);
                if (ci < 0) return null;
                const fx = CAND_POSITIONS[ci].x;
                const fy = CAND_POSITIONS[ci].y;
                return (
                  <Group key={conn.fromId}>
                    <Line p1={{ x: fx, y: fy }} p2={{ x: TARGET_POS.x, y: TARGET_POS.y }} color={LINE_GLOW} strokeWidth={LINE_W + 8} style="stroke" strokeCap="round" />
                    <Line p1={{ x: fx, y: fy }} p2={{ x: TARGET_POS.x, y: TARGET_POS.y }} color={LINE_COLOR} strokeWidth={LINE_W} style="stroke" strokeCap="round" />
                  </Group>
                );
              })}

              {/* Drag line */}
              <Path path={dragPath} color={LINE_COLOR} strokeWidth={LINE_W} style="stroke" strokeCap="round">
                <Shadow dx={0} dy={0} blur={10} color="rgba(100,181,246,0.55)" />
              </Path>

              {/* Candidate rectangles */}
              {candidates.map((cand, i) => {
                const pos = CAND_POSITIONS[i];
                const isSel  = selectedId === cand.id;
                const isConn = connectedIds.includes(cand.id);
                return (
                  <Group key={cand.id}>
                    <RoundedRect x={pos.x - NODE_W / 2} y={pos.y - NODE_H / 2} width={NODE_W} height={NODE_H} r={10} color={isSel && !isConn ? '#E3F2FD' : 'white'}>
                      <Shadow dx={2} dy={2} blur={5} color="rgba(0,0,0,0.1)" />
                    </RoundedRect>
                    <RoundedRect x={pos.x - NODE_W / 2} y={pos.y - NODE_H / 2} width={NODE_W} height={NODE_H} r={10}
                      color={isSel ? '#1E88E5' : '#333'} style="stroke" strokeWidth={isSel ? 2.5 : 2} />
                  </Group>
                );
              })}

              {/* Target ellipse */}
              <Oval x={TARGET_POS.x - OVAL_W / 2} y={TARGET_POS.y - OVAL_H / 2} width={OVAL_W} height={OVAL_H} color="white">
                <Shadow dx={2} dy={2} blur={6} color="rgba(0,0,0,0.1)" />
              </Oval>
              <Oval x={TARGET_POS.x - OVAL_W / 2} y={TARGET_POS.y - OVAL_H / 2} width={OVAL_W} height={OVAL_H} color="#1565C0" style="stroke" strokeWidth={2.5} />
            </Canvas>

            {/* Fraction labels */}
            {candidates.map((cand, i) => (
              <FractionLabel
                key={cand.id}
                x={CAND_POSITIONS[i].x} y={CAND_POSITIONS[i].y}
                w={NODE_W} h={NODE_H}
                num={cand.numerator} den={cand.denominator}
                isOval={false}
                isSelected={selectedId === cand.id}
                isConnected={connectedIds.includes(cand.id)}
              />
            ))}
            <FractionLabel
              x={TARGET_POS.x} y={TARGET_POS.y}
              w={OVAL_W} h={OVAL_H}
              num={target.numerator} den={target.denominator}
              isOval
              isSelected={false}
              isConnected={false}
            />

            {/* Title */}
            <RNText style={styles.title}>{question.title}</RNText>

            {/* Reset button — góc trên phải */}
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={resetCurrentQuestion}
              activeOpacity={0.75}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <RNText style={styles.resetIcon}>↺</RNText>
            </TouchableOpacity>
          </View>
        </GestureDetector>
      </View>

      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]}
          onPress={goPrev}
          disabled={currentIndex === 0}
          activeOpacity={0.8}
        >
          <RNText style={styles.navBtnText}>← Trước</RNText>
        </TouchableOpacity>

        {/* Dots indicator */}
        <View style={styles.dots}>
          {FRACTION_QUESTIONS.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>

        {isLast ? (
          <TouchableOpacity style={[styles.navBtn, styles.checkBtn]} onPress={() => setModalVisible(true)} activeOpacity={0.85}>
            <RNText style={styles.checkBtnText}>Kiểm tra</RNText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navBtn} onPress={goNext} activeOpacity={0.8}>
            <RNText style={styles.navBtnText}>Tiếp →</RNText>
          </TouchableOpacity>
        )}
      </View>

      <ResultModal visible={modalVisible} allConnections={allConnections} onClose={() => setModalVisible(false)} />
    </GestureHandlerRootView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  title: {
    position: 'absolute', top: 14, left: 16,
    fontSize: 14, color: '#444', fontWeight: '600',
  },
  labelWrap: {
    position: 'absolute', alignItems: 'center', justifyContent: 'center',
  },
  fracNum: { fontSize: 15, fontWeight: '700', color: '#222', lineHeight: 19 },
  fracDen: { fontSize: 15, fontWeight: '700', color: '#222', lineHeight: 19 },
  fracBar: { width: 28, height: 2, backgroundColor: '#333', marginVertical: 1 },
  blue:    { color: '#1565C0' },
  barBlue: { backgroundColor: '#1565C0' },

  // Navigation
  navBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1, borderTopColor: '#E0E0E0',
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 4,
  },
  navBtn: {
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 12, backgroundColor: '#F0F4FF',
    minWidth: 90, alignItems: 'center',
  },
  navBtnDisabled: { opacity: 0.35 },
  navBtnText: { fontSize: 14, fontWeight: '700', color: '#1E88E5' },
  checkBtn: { backgroundColor: '#1E88E5' },
  checkBtnText: { fontSize: 14, fontWeight: '700', color: 'white' },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#BDBDBD' },
  dotActive: { backgroundColor: '#1E88E5', width: 20, borderRadius: 4 },

  // Reset button
  resetBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  resetIcon: {
    fontSize: 22,
    color: '#1E88E5',
    lineHeight: 26,
  },

  // Modal
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  modalBox: {
    width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 22,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18, shadowRadius: 16, elevation: 12,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#1A237E', textAlign: 'center', marginBottom: 14 },
  resultRow: { marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  resultQ: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 2 },
  resultDetail: { fontSize: 13, color: '#C62828', marginLeft: 10, lineHeight: 20 },
  modalBtn: {
    marginTop: 14, paddingVertical: 12, borderRadius: 12,
    backgroundColor: '#1E88E5', alignItems: 'center',
  },
  modalBtnText: { color: 'white', fontSize: 15, fontWeight: '700' },
});
