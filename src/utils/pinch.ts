export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function calculateDistance(
  point1: Point3D,
  point2: Point3D
): number {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = point1.z - point2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function isPinching(
  thumbTip: Point3D,
  indexTip: Point3D,
  threshold = 0.05
): boolean {
  return calculateDistance(thumbTip, indexTip) < threshold;
}

export function getPinchStrength(
  thumbTip: Point3D,
  indexTip: Point3D,
  threshold = 0.05
): number {
  const distance = calculateDistance(thumbTip, indexTip);

  const strength = 1 - Math.min(distance / threshold, 1);

  return Number(strength.toFixed(2));
}