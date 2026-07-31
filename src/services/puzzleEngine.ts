import { PuzzlePiece } from "@/types/puzzle";

/**
 * Creates the initial ordered puzzle.
 */
export function createPuzzlePieces(
  images: string[]
): PuzzlePiece[] {
  return images.map((image, index) => ({
    id: index,
    image,
    correctIndex: index,
    currentIndex: index,
  }));
}

/**
 * Updates currentIndex for every piece.
 */
function updateIndexes(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  return pieces.map((piece, index) => ({
    ...piece,
    currentIndex: index,
  }));
}

/**
 * Returns a cloned copy of puzzle pieces.
 */
export function clonePuzzle(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  return pieces.map((piece) => ({
    ...piece,
  }));
}

/**
 * Fisher-Yates shuffle.
 * Guarantees puzzle is not already solved.
 */
export function shufflePuzzle(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  let shuffled = clonePuzzle(pieces);

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }

    shuffled = updateIndexes(shuffled);

  } while (isPuzzleSolved(shuffled));

  return shuffled;
}

/**
 * Swap two puzzle pieces safely.
 */
export function swapPieces(
  pieces: PuzzlePiece[],
  firstIndex: number,
  secondIndex: number
): PuzzlePiece[] {

  if (
    firstIndex < 0 ||
    secondIndex < 0 ||
    firstIndex >= pieces.length ||
    secondIndex >= pieces.length
  ) {
    return pieces;
  }

  if (firstIndex === secondIndex) {
    return pieces;
  }

  const updated = clonePuzzle(pieces);

  [updated[firstIndex], updated[secondIndex]] = [
    updated[secondIndex],
    updated[firstIndex],
  ];

  return updateIndexes(updated);
}

/**
 * Checks if puzzle is solved.
 */
export function isPuzzleSolved(
  pieces: PuzzlePiece[]
): boolean {
  return pieces.every(
    (piece) =>
      piece.correctIndex === piece.currentIndex
  );
}

/**
 * Returns number of correctly placed pieces.
 */
export function getCorrectPieceCount(
  pieces: PuzzlePiece[]
): number {
  return pieces.filter(
    (piece) =>
      piece.correctIndex === piece.currentIndex
  ).length;
}

/**
 * Puzzle completion percentage.
 */
export function getCompletionPercentage(
  pieces: PuzzlePiece[]
): number {

  if (pieces.length === 0) {
    return 0;
  }

  return Math.round(
    (getCorrectPieceCount(pieces) /
      pieces.length) *
      100
  );
}

/**
 * Returns whether a piece is already in the correct position.
 */
export function isPieceCorrect(
  piece: PuzzlePiece
): boolean {
  return (
    piece.correctIndex === piece.currentIndex
  );
}