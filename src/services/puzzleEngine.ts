import { PuzzlePiece } from "@/types/puzzle";

export const BOARD_SIZE = 600;

export function createPuzzlePieces(
  images: string[],
  gridSize: number
): PuzzlePiece[] {
  const pieceSize = BOARD_SIZE / gridSize;

  return images.map((image, index) => ({
    id: index,

    image,

    correctIndex: index,
    currentIndex: index,

    x: (index % gridSize) * pieceSize,
    y: Math.floor(index / gridSize) * pieceSize,

    width: pieceSize,
    height: pieceSize,

    dragging: false,
    placed: false,
  }));
}

export function clonePuzzle(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  return pieces.map((piece) => ({
    ...piece,
  }));
}

export function shufflePuzzle(
  pieces: PuzzlePiece[],
  gridSize: number
): PuzzlePiece[] {
  const shuffled = clonePuzzle(pieces);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  const pieceSize = BOARD_SIZE / gridSize;

  return shuffled.map((piece, index) => ({
    ...piece,

    currentIndex: index,

    x: (index % gridSize) * pieceSize,
    y: Math.floor(index / gridSize) * pieceSize,

    dragging: false,
    placed: false,
  }));
}

export function movePiece(
  pieces: PuzzlePiece[],
  id: number,
  x: number,
  y: number
): PuzzlePiece[] {
  return pieces.map((piece) =>
    piece.id === id
      ? {
          ...piece,
          x,
          y,
        }
      : piece
  );
}

export function snapPiece(
  piece: PuzzlePiece,
  gridSize: number
): PuzzlePiece {
  const pieceSize = BOARD_SIZE / gridSize;

  return {
    ...piece,

    x:
      (piece.correctIndex % gridSize) *
      pieceSize,

    y:
      Math.floor(
        piece.correctIndex / gridSize
      ) * pieceSize,

    dragging: false,

    placed: true,
  };
}

export function startDragging(
  pieces: PuzzlePiece[],
  id: number
): PuzzlePiece[] {
  return pieces.map((piece) =>
    piece.id === id
      ? {
          ...piece,
          dragging: true,
        }
      : piece
  );
}

export function stopDragging(
  pieces: PuzzlePiece[],
  id: number
): PuzzlePiece[] {
  return pieces.map((piece) =>
    piece.id === id
      ? {
          ...piece,
          dragging: false,
        }
      : piece
  );
}

export function isPuzzleSolved(
  pieces: PuzzlePiece[]
): boolean {
  return pieces.every(
    (piece) => piece.placed
  );
}