export interface DragPosition {
  x: number;
  y: number;
}

export interface DragOffset {
  x: number;
  y: number;
}

/**
 * Returns the pointer position relative to the board.
 */
export function getPointerPosition(
  clientX: number,
  clientY: number,
  boardRect: DOMRect
): DragPosition {
  return {
    x: clientX - boardRect.left,
    y: clientY - boardRect.top,
  };
}

/**
 * Calculates the offset between the pointer and the top-left
 * corner of the puzzle piece.
 */
export function getDragOffset(
  pointer: DragPosition,
  piece: DragPosition
): DragOffset {
  return {
    x: pointer.x - piece.x,
    y: pointer.y - piece.y,
  };
}

/**
 * Calculates the new position of the piece while dragging.
 */
export function calculateDragPosition(
  pointer: DragPosition,
  offset: DragOffset
): DragPosition {
  return {
    x: pointer.x - offset.x,
    y: pointer.y - offset.y,
  };
}

/**
 * Restrict dragging within the puzzle board.
 */
export function clampPosition(
  position: DragPosition,
  boardWidth: number,
  boardHeight: number,
  pieceWidth: number,
  pieceHeight: number
): DragPosition {
  return {
    x: Math.max(
      0,
      Math.min(position.x, boardWidth - pieceWidth)
    ),
    y: Math.max(
      0,
      Math.min(position.y, boardHeight - pieceHeight)
    ),
  };
}