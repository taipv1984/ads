import { AnchorPoint, Point, ElementFrame } from '@/services/types/question.types';

// ─── Pure geometry functions for anchors / points

/**
 * Tính tọa độ tuyệt đối (page coords) của 1 anchor point trên một View.
 *
 * @param layout  - tọa độ page của View (từ ref.measure)
 * @param anchor  - mô tả vị trí neo: {x: left|center|right, y: top|center|bottom}
 */
export function getAnchorPoint(layout: ElementFrame, anchor: AnchorPoint): Point {
  let px: number = layout.x;
  switch (anchor.x) {
    case 'left': px = layout.x; break;
    case 'center': px = layout.x + layout.width / 2; break;
    case 'right': px = layout.x + layout.width; break;
  }

  let py: number = layout.y;
  switch (anchor.y) {
    case 'top': py = layout.y; break;
    case 'center': py = layout.y + layout.height / 2; break;
    case 'bottom': py = layout.y + layout.height; break;
  }

  return { x: px, y: py };
}

export function getMidpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function getDistance(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getAngleDeg(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
