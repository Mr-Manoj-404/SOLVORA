import { PuzzlePiece } from "@/types/puzzle";

export const BOARD_SIZE = 600;

function getPieceSize(gridSize: number): number {
  return BOARD_SIZE / gridSize;
}

export function createPuzzlePieces(
  images: string[],
  gridSize: number
): PuzzlePiece[] {
  const pieceSize = getPieceSize(gridSize);

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

export function shufflePuzzle(
  pieces: PuzzlePiece[],
  gridSize: number
): PuzzlePiece[] {
  const pieceSize = getPieceSize(gridSize);

  let shuffled: PuzzlePiece[];

  /*
   * Keep shuffling until the puzzle is
   * actually scrambled.
   *
   * This prevents:
   * - already solved puzzle
   * - pieces starting in correct positions
   */
  do {
    shuffled = [...pieces];

    for (
      let i = shuffled.length - 1;
      i > 0;
      i--
    ) {
      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [
        shuffled[i],
        shuffled[j],
      ] = [
        shuffled[j],
        shuffled[i],
      ];
    }
  } while (
    shuffled.some(
      (piece, index) =>
        piece.correctIndex === index
    )
  );

  return shuffled.map(
    (piece, index) => ({
      ...piece,

      currentIndex: index,

      x:
        (index % gridSize) *
        pieceSize,

      y:
        Math.floor(
          index / gridSize
        ) * pieceSize,

      dragging: false,

      /*
       * Nothing is locked when
       * a new puzzle starts.
       */
      placed: false,
    })
  );
}

export function startDragging(
  pieces: PuzzlePiece[],
  id: number
): PuzzlePiece[] {
  return pieces.map((piece) => {
    if (
      piece.id === id &&
      piece.placed
    ) {
      return piece;
    }

    if (piece.id === id) {
      return {
        ...piece,
        dragging: true,
      };
    }

    return piece;
  });
}

export function movePiece(
  pieces: PuzzlePiece[],
  id: number,
  x: number,
  y: number
): PuzzlePiece[] {
  return pieces.map((piece) => {
    if (
      piece.id === id &&
      piece.placed
    ) {
      return piece;
    }

    if (piece.id === id) {
      return {
        ...piece,
        x,
        y,
      };
    }

    return piece;
  });
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

export function getGridPosition(
  index: number,
  gridSize: number
): {
  x: number;
  y: number;
} {
  const pieceSize =
    getPieceSize(gridSize);

  return {
    x:
      (index % gridSize) *
      pieceSize,

    y:
      Math.floor(
        index / gridSize
      ) * pieceSize,
  };
}

export function getNearestCell(
  x: number,
  y: number,
  gridSize: number
): number {
  const pieceSize =
    getPieceSize(gridSize);

  const col = Math.max(
    0,
    Math.min(
      gridSize - 1,
      Math.round(
        x / pieceSize
      )
    )
  );

  const row = Math.max(
    0,
    Math.min(
      gridSize - 1,
      Math.round(
        y / pieceSize
      )
    )
  );

  return (
    row * gridSize + col
  );
}

export function snapPieceToGrid(
  piece: PuzzlePiece,
  gridSize: number
): PuzzlePiece {
  const position =
    getGridPosition(
      piece.currentIndex,
      gridSize
    );

  return {
    ...piece,

    x: position.x,
    y: position.y,

    dragging: false,
  };
}

export function swapPieces(
  pieces: PuzzlePiece[],
  draggingId: number,
  targetIndex: number,
  gridSize: number
): PuzzlePiece[] {
  const dragged =
    pieces.find(
      (piece) =>
        piece.id === draggingId
    );

  if (!dragged) {
    return pieces;
  }

  /*
   * Locked piece cannot move.
   */
  if (dragged.placed) {
    return pieces;
  }

  const target =
    pieces.find(
      (piece) =>
        piece.currentIndex ===
        targetIndex
    );

  if (!target) {
    return pieces;
  }

  /*
   * A locked target cannot be
   * displaced.
   */
  if (target.placed) {
    const position =
      getGridPosition(
        dragged.currentIndex,
        gridSize
      );

    return pieces.map(
      (piece) =>
        piece.id === dragged.id
          ? {
              ...piece,
              x: position.x,
              y: position.y,
              dragging: false,
            }
          : piece
    );
  }

  const draggedIndex =
    dragged.currentIndex;

  const targetIndexBeforeSwap =
    target.currentIndex;

  return pieces.map((piece) => {
    /*
     * Dragged piece.
     */
    if (
      piece.id === dragged.id
    ) {
      const position =
        getGridPosition(
          targetIndexBeforeSwap,
          gridSize
        );

      const isCorrect =
        targetIndexBeforeSwap ===
        piece.correctIndex;

      return {
        ...piece,

        currentIndex:
          targetIndexBeforeSwap,

        x: position.x,
        y: position.y,

        dragging: false,

        placed: isCorrect,
      };
    }

    /*
     * Target piece.
     */
    if (
      piece.id === target.id
    ) {
      const position =
        getGridPosition(
          draggedIndex,
          gridSize
        );

      const isCorrect =
        draggedIndex ===
        piece.correctIndex;

      return {
        ...piece,

        currentIndex:
          draggedIndex,

        x: position.x,
        y: position.y,

        dragging: false,

        placed: isCorrect,
      };
    }

    return piece;
  });
}

export function isPuzzleSolved(
  pieces: PuzzlePiece[]
): boolean {
  return (
    pieces.length > 0 &&
    pieces.every(
      (piece) =>
        piece.currentIndex ===
          piece.correctIndex &&
        piece.placed
    )
  );
}