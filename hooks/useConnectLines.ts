import { ConnectLine, ElementFrame, Point } from '@/services/types/question.types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { getAnchorPoint, getAngleDeg, getDistance, getMidpoint } from '../utils/point.util';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConnectLineGeometry {
  id: string;
  sourcePoint: Point;
  targetPoint: Point;
  midpoint: Point;
  distance: number;
  angle: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Safe toFixed — trả về '?' nếu giá trị không phải number hợp lệ */
function safeFixed(n: number, digits = 1): string {
  return typeof n === 'number' && isFinite(n) ? n.toFixed(digits) : '?';
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useConnectLines — Tự động đo layout và tính toán dữ liệu đường nối.
 *
 * Cập nhật cấu trúc:
 *   Sử dụng ConnectLine.source.ref và ConnectLine.target.ref thay thế cho
 *   sourceId và targetId cũ. sourceAnchor -> source, targetAnchor -> target.
 *
 * @param connectLines  - danh sách đường nối từ QuestionForm
 * @param inputRefs     - map id → View ref (từ QuestionFormView)
 * @param containerRef  - ref của formContent View (để làm mốc đo relative)
 * @param questionId    - id câu hỏi hiện tại (để reset khi chuyển câu)
 */
export function useConnectLines(
  connectLines: ConnectLine[] | undefined,
  inputRefs: React.MutableRefObject<Record<number, any>>,
  containerRef: React.MutableRefObject<any>,
  questionId: number,
): {
  lineData: Array<ConnectLine & ConnectLineGeometry>;
  onInputLayout: (inputId: number) => void;
} {
  const [lineData, setLineData] = useState<Array<ConnectLine & ConnectLineGeometry>>([]);
  const layoutedIds = useRef<Set<number>>(new Set());
  const rafHandle = useRef<number | null>(null);
  const imHandle = useRef<ReturnType<typeof InteractionManager.runAfterInteractions> | null>(null);
  const retryCount = useRef(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const expectedIds = useMemo<Set<number>>(() => {
    const ids = new Set<number>();
    connectLines?.forEach((cl) => {
      ids.add(cl.source.ref);
      ids.add(cl.target.ref);
    });
    return ids;
  }, [connectLines]);

  // Hủy timers / pending tasks
  const clearAllTasks = () => {
    if (rafHandle.current !== null) {
      cancelAnimationFrame(rafHandle.current);
      rafHandle.current = null;
    }
    if (retryTimer.current !== null) {
      clearTimeout(retryTimer.current);
      retryTimer.current = null;
    }
    imHandle.current?.cancel();
    imHandle.current = null;
  };

  // ── Reset khi đổi câu hỏi ────────────────────────────────────────────────
  useEffect(() => {
    layoutedIds.current.clear();
    setLineData([]);
    retryCount.current = 0;
    clearAllTasks();
  }, [questionId]);

  // Cleanup khi unmount
  useEffect(() => {
    return () => clearAllTasks();
  }, []);

  // ── Đo layout và tính toán ────────────────────────────────────────────────
  const measureAll = useCallback(() => {
    if (!connectLines || connectLines.length === 0) return;

    if (retryTimer.current !== null) {
      clearTimeout(retryTimer.current);
      retryTimer.current = null;
    }

    const scheduleRetry = () => {
      if (retryCount.current < 15) {
        retryCount.current++;
        if (retryTimer.current !== null) clearTimeout(retryTimer.current);
        retryTimer.current = setTimeout(() => {
          measureAll();
        }, 100);
      } else {
        console.warn('[ConnectLines] Max retries reached, giving up.');
      }
    };

    if (!containerRef.current) {
      scheduleRetry();
      return;
    }

    const results: Array<ConnectLine & ConnectLineGeometry> = [];
    let pending = connectLines.length;
    let anyMeasureFailed = false;

    const onLineDone = (entry: (ConnectLine & ConnectLineGeometry) | null) => {
      if (entry) results.push(entry);
      pending--;
      if (pending === 0) {
        if (anyMeasureFailed) {
          console.warn('[ConnectLines] One or more component measureLayouts failed, retrying...');
          scheduleRetry();
        } else {
          // Thành công! Reset retry count
          retryCount.current = 0;
          setLineData([...results]);
        }
      }
    };

    connectLines.forEach((cl, index) => {
      const srcRef = inputRefs.current[cl.source.ref];
      const tgtRef = inputRefs.current[cl.target.ref];

      if (!srcRef || !tgtRef) {
        anyMeasureFailed = true;
        onLineDone(null);
        return;
      }

      let srcLayout: ElementFrame | null = null;
      let tgtLayout: ElementFrame | null = null;

      const tryCompute = () => {
        if (!srcLayout || !tgtLayout) return;

        // Vì đo bằng measureLayout nên toạ độ trả về ALREADY là local relative to container!
        const srcPoint = getAnchorPoint(srcLayout, cl.source);
        const tgtPoint = getAnchorPoint(tgtLayout, cl.target);

        const sourcePoint = srcPoint;
        const targetPoint = tgtPoint;
        const midpoint = getMidpoint(sourcePoint, targetPoint);
        const distance = getDistance(sourcePoint, targetPoint);
        const angle = getAngleDeg(sourcePoint, targetPoint);

        if (!isFinite(distance) || distance <= 0 || !isFinite(angle)) {
          anyMeasureFailed = true;
          onLineDone(null);
          return;
        }

        // Tạo ra một ID vẽ duy nhất dựa trên ref của source và target
        const lineId = `${cl.source.ref}-${cl.target.ref}-${index}`;

        console.log(`[ConnectLine #${lineId}] Source #${cl.source.ref} local layout:`, srcLayout);
        console.log(`[ConnectLine #${lineId}] Target #${cl.target.ref} local layout:`, tgtLayout);
        console.log(
          `[ConnectLine #${lineId}] src(${cl.source.x},${cl.source.y}) local: (${safeFixed(sourcePoint.x)}, ${safeFixed(sourcePoint.y)})`
        );
        console.log(
          `[ConnectLine #${lineId}] tgt(${cl.target.x},${cl.target.y}) local: (${safeFixed(targetPoint.x)}, ${safeFixed(targetPoint.y)})`
        );
        console.log(
          `[ConnectLine #${lineId}] Mid(${safeFixed(midpoint.x)},${safeFixed(midpoint.y)})`,
          `Dist:${safeFixed(distance)} Angle:${safeFixed(angle)}°`
        );

        onLineDone({
          ...cl,
          id: lineId,
          sourcePoint,
          targetPoint,
          midpoint,
          distance,
          angle,
        });
      };

      // Gọi measureLayout trực tiếp so với containerRef.current
      srcRef.measureLayout(
        containerRef.current,
        (left: number, top: number, width: number, height: number) => {
          srcLayout = { x: left, y: top, width, height };
          tryCompute();
        },
        (error: any) => {
          console.warn(`[ConnectLines] Source #${cl.source.ref} measureLayout failed:`, error);
          anyMeasureFailed = true;
          onLineDone(null);
        }
      );

      tgtRef.measureLayout(
        containerRef.current,
        (left: number, top: number, width: number, height: number) => {
          tgtLayout = { x: left, y: top, width, height };
          tryCompute();
        },
        (error: any) => {
          console.warn(`[ConnectLines] Target #${cl.target.ref} measureLayout failed:`, error);
          anyMeasureFailed = true;
          onLineDone(null);
        }
      );
    });
  }, [connectLines, inputRefs, containerRef]);

  // ── Debounce ──────────────────────────────────────────────────────────────
  const scheduleRemeasure = useCallback(() => {
    retryCount.current = 0;
    if (rafHandle.current !== null) {
      cancelAnimationFrame(rafHandle.current);
      rafHandle.current = null;
    }
    imHandle.current?.cancel();

    imHandle.current = InteractionManager.runAfterInteractions(() => {
      rafHandle.current = requestAnimationFrame(() => {
        rafHandle.current = null;
        measureAll();
      });
    });
  }, [measureAll]);

  // ── onInputLayout ─────────────────────────────────────────────────────────
  const onInputLayout = useCallback(
    (inputId: number) => {
      if (expectedIds.size === 0) return;
      if (!expectedIds.has(inputId)) return;

      layoutedIds.current.add(inputId);

      if (layoutedIds.current.size >= expectedIds.size) {
        scheduleRemeasure();
      }
    },
    [expectedIds, scheduleRemeasure],
  );

  return { lineData, onInputLayout };
}
