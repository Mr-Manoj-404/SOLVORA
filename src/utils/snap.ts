export interface Point {
  x: number;
  y: number;
}

/**
 * Distance between two points.
 */
export function getDistance(
  a: Point,
  b: Point
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks whether a puzzle piece is close enough
 * to snap into its correct position.
 */
export function shouldSnap(
  current: Point,
  target: Point,
  threshold = 35
): boolean {
  return (
    getDistance(current, target) <= threshold
  );
}

/**
 * Returns the snapped position.
 */
export function snapToTarget(
  target: Point
): Point {
  return {
    x: target.x,
    y: target.y,
  };
}