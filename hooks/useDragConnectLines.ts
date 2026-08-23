import { ElementFrame, Point, QuestionInput } from '@/services/types/question.types';
import { getAngleDeg, getDistance } from '@/utils/point.util';
import { useCallback, useMemo, useRef, useState } from 'react';
import { PanResponder, PanResponderInstance } from 'react-native';

export interface DragLineGeometry {
  sourcePoint: Point;
  targetPoint: Point;
  distance: number;
  angle: number;
}

export interface UseDragConnectLinesProps {
  inputRefs: React.MutableRefObject<Record<number, any>>;
  allInputs: QuestionInput[];
  containerRef: React.MutableRefObject<any>;
  userConnections: Array<{ from: number; to: number }>;
  onConnectionsChange: (conns: Array<{ from: number; to: number }>) => void;
  isReview?: boolean;
}

export function useDragConnectLines({
  inputRefs,
  allInputs,
  containerRef,
  userConnections,
  onConnectionsChange,
  isReview = false,
}: UseDragConnectLinesProps): {
  panResponder: PanResponderInstance;
  dragLine: DragLineGeometry | null;
  activeSourceId: number | null;
  hoverTargetId: number | null;
  onInputLayout: (refId: number) => void;
  inputLayouts: Record<number, ElementFrame>;
  onSelectSourceInput: (refId: number, pageX?: number, pageY?: number) => void;
} {
  const [inputLayouts, setInputLayouts] = useState<Record<number, ElementFrame>>({});
  const [activeSourceId, setActiveSourceId] = useState<number | null>(null);
  const [hoverTargetId, setHoverTargetId] = useState<number | null>(null);
  const [dragLine, setDragLine] = useState<DragLineGeometry | null>(null);

  // Ref stores absolute page offset of container (pageX, pageY)
  const containerOffsetRef = useRef<{ pageX: number; pageY: number }>({ pageX: 0, pageY: 0 });

  // Map input ref -> input config
  const inputMap = useMemo(() => {
    const map: Record<number, QuestionInput> = {};
    allInputs.forEach((input) => {
      if (input.ref !== undefined) {
        map[input.ref] = input;
      }
    });
    return map;
  }, [allInputs]);

  // Whether any input belongs to `main` group. If true, use main-sub rules.
  const hasMainGroup = useMemo(() => allInputs.some((i) => i.connectGroup === 'main'), [allInputs]);

  // Calibrate container page offset using a known input layout and its touch pageX/pageY
  const calibrateContainerOffset = useCallback(
    (refId: number, pageX: number, pageY: number) => {
      const layout = inputLayouts[refId];
      if (layout) {
        const centerX = layout.x + layout.width / 2;
        const centerY = layout.y + layout.height / 2;
        containerOffsetRef.current = {
          pageX: pageX - centerX,
          pageY: pageY - centerY,
        };
      }
    },
    [inputLayouts]
  );

  // Direct selection trigger when an input item is touched directly
  const onSelectSourceInput = useCallback(
    (refId: number, pageX?: number, pageY?: number) => {
      if (isReview) return;
      const inputConfig = inputMap[refId];
      if (inputConfig?.allowConnect === false) return;

      if (pageX !== undefined && pageY !== undefined) {
        calibrateContainerOffset(refId, pageX, pageY);
      }

      currentSourceRef.current = refId;
      setActiveSourceId(refId);
    },
    [isReview, inputMap, calibrateContainerOffset]
  );

  // Measuring layout when inputs finish mounting/layout
  const onInputLayout = useCallback(
    (refId: number) => {
      const refElement = inputRefs.current[refId];
      if (!refElement || !containerRef.current) return;

      refElement.measureLayout(
        containerRef.current,
        (left: number, top: number, width: number, height: number) => {
          setInputLayouts((prev) => ({
            ...prev,
            [refId]: { x: left, y: top, width, height },
          }));
        },
        (error: any) => {
          console.warn(`[useDragConnectLines] Measure layout failed for input ref #${refId}:`, error);
        }
      );
    },
    [inputRefs, containerRef]
  );

  // Helper to get center point of an input relative to container
  const getCenterPoint = useCallback(
    (refId: number): Point | null => {
      const layout = inputLayouts[refId];
      if (!layout) return null;
      return {
        x: layout.x + layout.width / 2,
        y: layout.y + layout.height / 2,
      };
    },
    [inputLayouts]
  );

  // Helper to find target input at touch coordinates
  const findTargetInputAt = useCallback(
    (touchX: number, touchY: number, sourceRef: number): number | null => {
      const sourceInput = inputMap[sourceRef];
      if (!sourceInput) return null;

      let bestTargetRef: number | null = null;
      let minDistance = Infinity;

      for (const [key, layout] of Object.entries(inputLayouts)) {
        const targetRef = Number(key);
        if (targetRef === sourceRef) continue; // Don't connect to self

        const targetInput = inputMap[targetRef];
        if (!targetInput) continue;

        // 1. Same group constraint
        if (
          sourceInput.connectGroup &&
          targetInput.connectGroup &&
          sourceInput.connectGroup === targetInput.connectGroup
        ) {
          continue;
        }

        // 2. Level constraint (main-sub) when `hasMainGroup` is true
        if (hasMainGroup) {
          const srcLevel = sourceInput.connectGroup === 'main' ? 'main' : 'sub';
          const tgtLevel = targetInput.connectGroup === 'main' ? 'main' : 'sub';

          // Cannot connect main to main or sub to sub
          if (srcLevel === tgtLevel) continue;
        }

        const centerX = layout.x + layout.width / 2;
        const centerY = layout.y + layout.height / 2;

        const pad = 24;
        if (
          touchX >= layout.x - pad &&
          touchX <= layout.x + layout.width + pad &&
          touchY >= layout.y - pad &&
          touchY <= layout.y + layout.height + pad
        ) {
          const dist = Math.hypot(touchX - centerX, touchY - centerY);
          if (dist < minDistance) {
            minDistance = dist;
            bestTargetRef = targetRef;
          }
        }
      }
      return bestTargetRef;
    },
    [inputLayouts, inputMap, hasMainGroup]
  );

  // Active gesture state refs
  const currentSourceRef = useRef<number | null>(null);
  const currentHoverRef = useRef<number | null>(null);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isReview,
        onStartShouldSetPanResponderCapture: () => !isReview,
        onMoveShouldSetPanResponder: () => !isReview,
        onMoveShouldSetPanResponderCapture: () => !isReview,

        onPanResponderGrant: (evt) => {
          if (isReview) return;
          const { pageX, pageY } = evt.nativeEvent;

          // If source input was not selected via onTouchStart, find closest input center
          if (currentSourceRef.current === null) {
            let bestRef: number | null = null;
            let minDistance = Infinity;

            for (const [key, layout] of Object.entries(inputLayouts)) {
              const refId = Number(key);
              const inputConfig = inputMap[refId];
              if (inputConfig?.allowConnect === false) continue;

              const centerX = layout.x + layout.width / 2;
              const centerY = layout.y + layout.height / 2;

              const pad = 24;
              const touchX = pageX - containerOffsetRef.current.pageX;
              const touchY = pageY - containerOffsetRef.current.pageY;

              if (
                touchX >= layout.x - pad &&
                touchX <= layout.x + layout.width + pad &&
                touchY >= layout.y - pad &&
                touchY <= layout.y + layout.height + pad
              ) {
                const dist = Math.hypot(touchX - centerX, touchY - centerY);
                if (dist < minDistance) {
                  minDistance = dist;
                  bestRef = refId;
                }
              }
            }

            if (bestRef !== null) {
              calibrateContainerOffset(bestRef, pageX, pageY);
              currentSourceRef.current = bestRef;
              setActiveSourceId(bestRef);
            }
          } else {
            // Calibrate offset using already selected currentSourceRef
            calibrateContainerOffset(currentSourceRef.current, pageX, pageY);
          }
        },

        onPanResponderMove: (evt) => {
          if (isReview || currentSourceRef.current === null) return;
          const { pageX, pageY } = evt.nativeEvent;

          const touchX = pageX - containerOffsetRef.current.pageX;
          const touchY = pageY - containerOffsetRef.current.pageY;

          const sourcePoint = getCenterPoint(currentSourceRef.current);
          if (!sourcePoint) return;

          const targetPoint = { x: touchX, y: touchY };
          const distance = getDistance(sourcePoint, targetPoint);
          const angle = getAngleDeg(sourcePoint, targetPoint);

          setDragLine({
            sourcePoint,
            targetPoint,
            distance,
            angle,
          });

          const hitTarget = findTargetInputAt(touchX, touchY, currentSourceRef.current);
          currentHoverRef.current = hitTarget;
          setHoverTargetId(hitTarget);
        },

        onPanResponderRelease: () => {
          if (isReview) return;

          const srcRef = currentSourceRef.current;
          const tgtRef = currentHoverRef.current;

          if (srcRef !== null && tgtRef !== null) {
            // Apply line creation / overwrite logic
            const srcInput = inputMap[srcRef];
            const tgtInput = inputMap[tgtRef];

            let updated = [...userConnections];

            // Filter out existing connection between exact same 2 inputs if any
            updated = updated.filter(
              (c) =>
                !(
                  (c.from === srcRef && c.to === tgtRef) ||
                  (c.from === tgtRef && c.to === srcRef)
                )
            );

            // Overwrite logic based on whether there is a main group
            if (!hasMainGroup) {
              //case: 1-1 connection. Overwrite any previous line from src or tgt
              const srcMax = srcInput?.connectGroup === 'main' ? 99 : 1;
              const tgtMax = tgtInput?.connectGroup === 'main' ? 99 : 1;

              if (srcMax === 1) {
                updated = updated.filter((c) => c.from !== srcRef && c.to !== srcRef);
              }
              if (tgtMax === 1) {
                updated = updated.filter((c) => c.from !== tgtRef && c.to !== tgtRef);
              }
            } else {
              // case: 1-n Sub input can only connect to 1 main input
              const srcLevel = srcInput?.connectGroup === 'main' ? 'main' : 'sub';
              const tgtLevel = tgtInput?.connectGroup === 'main' ? 'main' : 'sub';

              const subRef = srcLevel === 'sub' ? srcRef : tgtLevel === 'sub' ? tgtRef : null;
              if (subRef !== null) {
                // Remove existing connection for this sub input
                updated = updated.filter((c) => c.from !== subRef && c.to !== subRef);
              }
            }

            const newConn =
              hasMainGroup && (srcInput?.connectGroup === 'main' ? 'main' : 'sub') === 'sub'
                ? { from: tgtRef, to: srcRef }
                : { from: srcRef, to: tgtRef };

            updated.push(newConn);
            onConnectionsChange(updated);
          }

          // Reset gesture state
          currentSourceRef.current = null;
          currentHoverRef.current = null;
          setActiveSourceId(null);
          setHoverTargetId(null);
          setDragLine(null);
        },

        onPanResponderTerminate: () => {
          currentSourceRef.current = null;
          currentHoverRef.current = null;
          setActiveSourceId(null);
          setHoverTargetId(null);
          setDragLine(null);
        },
      }),
    [isReview, inputLayouts, inputMap, getCenterPoint, findTargetInputAt, userConnections, hasMainGroup, onConnectionsChange, calibrateContainerOffset]
  );

  return {
    panResponder,
    dragLine,
    activeSourceId,
    hoverTargetId,
    onInputLayout,
    inputLayouts,
    onSelectSourceInput,
  };
}
