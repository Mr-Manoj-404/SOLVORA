export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D extends Point2D {
  z: number;
}

export interface HandLandmark extends Point3D {}

export interface HandData {
  side: HandSide;
  landmarks: HandLandmark[];
  isTracking: boolean;
  isPinching: boolean;
  cursor: Point2D;
  pinchStrength: number;
}

export interface PinchState {
  isPinching: boolean;
  strength: number;
}

export interface CursorState {
  x: number;
  y: number;
}

export type HandSide = "Left" | "Right";

export interface DetectedHand {
  side: HandSide;
  landmarks: HandLandmark[];
}