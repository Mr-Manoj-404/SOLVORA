export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Returns true if the pointer is inside a rectangle.
 */
export function isPointInsideRect(
  point: Point,
  rect: Rectangle
): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

/**
 * Finds the top-most puzzle piece under the pointer.
 */
export function findPieceAtPosition<T extends Rectangle & { id: number }>(
  pieces: T[],
  point: Point
): T | null {
  for (let i = pieces.length - 1; i >= 0; i--) {
    if (isPointInsideRect(point, pieces[i])) {
      return pieces[i];
    }
  }

  return null;
}

/**
 * Rectangle collision.
 */
export function rectanglesOverlap(
  a: Rectangle,
  b: Rectangle
): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}