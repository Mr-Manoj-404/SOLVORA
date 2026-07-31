export interface PuzzlePiece {
  id: number;

  correctIndex: number;

  currentIndex: number;

  image: string;

  x: number;
  y: number;

  width: number;
  height: number;

  placed: boolean;

  dragging: boolean;
}