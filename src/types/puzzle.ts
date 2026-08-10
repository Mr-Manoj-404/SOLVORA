export interface PuzzlePiece {
  id: number;

  image: string;

  correctIndex: number;

  currentIndex: number;

  x: number;
  y: number;

  width: number;
  height: number;

  dragging: boolean;

  placed: boolean;
}

export interface PuzzleState {
  pieces: PuzzlePiece[];

  moves: number;

  score: number;

  seconds: number;

  solved: boolean;
}