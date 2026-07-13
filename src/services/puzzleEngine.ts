import { PuzzlePiece } from "@/types/puzzle";

export function createPuzzlePieces(images: string[]): PuzzlePiece[] {
  return images.map((image, index) => ({
    id: index,
    image,
    correctIndex: index,
    currentIndex: index,
  }));
}

export function shufflePuzzle(
  pieces: PuzzlePiece[]
): PuzzlePiece[] {
  const shuffled = [...pieces];

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

export function swapPieces(
  pieces: PuzzlePiece[],
  firstIndex: number,
  secondIndex: number
): PuzzlePiece[] {
  const updated = [...pieces];

  [updated[firstIndex], updated[secondIndex]] = [
    updated[secondIndex],
    updated[firstIndex],
  ];

  return updated.map((piece, index) => ({
    ...piece,
    currentIndex: index,
  }));
}

export function isPuzzleSolved(
  pieces: PuzzlePiece[]
) {
  return pieces.every(
    (piece) => piece.correctIndex === piece.currentIndex
  );
}