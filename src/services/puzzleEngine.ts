import { PuzzlePiece } from "@/types/puzzle";

/**
 * Creates puzzle pieces with draggable properties.
 */
export function createPuzzlePieces(
  images: string[],
  gridSize: number = 3
): PuzzlePiece[] {
  const pieceSize = 100;

  return images.map((image, index) => ({
    id: index,

    image,

    correctIndex: index,

    currentIndex: index,

    x: (index % gridSize) * pieceSize,

    y: Math.floor(index / gridSize) * pieceSize,

    width: pieceSize,

    height: pieceSize,

    placed: false,

    dragging: false,
  }));
}

/**
 * Clone puzzle safely.
 */
export function clonePuzzle(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  return pieces.map((piece) => ({
    ...piece,
  }));
}

/**
 * Shuffle only logical positions.
 */
export function shufflePuzzle(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  const shuffled = clonePuzzle(pieces);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled.map((piece, index) => ({
    ...piece,
    currentIndex: index,
  }));
}

/**
 * Drag a puzzle piece.
 */
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

/**
 * Begin dragging.
 */
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

/**
 * Stop dragging.
 */
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

/**
 * Snap piece into its correct place.
 */
export function snapPiece(
  piece: PuzzlePiece,
  gridSize: number
): PuzzlePiece {
  const pieceSize = piece.width;

  return {
    ...piece,

    x:
      (piece.correctIndex % gridSize) *
      pieceSize,

    y:
      Math.floor(
        piece.correctIndex / gridSize
      ) * pieceSize,

    placed: true,

    dragging: false,
  };
}

/**
 * Puzzle solved?
 */
export function isPuzzleSolved(
  pieces: PuzzlePiece[]
): boolean {
  return pieces.every(
    (piece) => piece.placed
  );
}