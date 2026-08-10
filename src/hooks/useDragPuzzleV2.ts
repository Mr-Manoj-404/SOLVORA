"use client";

import { useCallback, useState } from "react";

export interface DragState {
  draggingId: number | null;

  mouseX: number;
  mouseY: number;

  offsetX: number;
  offsetY: number;
}

export function useDragPuzzleV2() {
  const [dragState, setDragState] =
    useState<DragState>({
      draggingId: null,

      mouseX: 0,
      mouseY: 0,

      offsetX: 0,
      offsetY: 0,
    });

  const startDrag = useCallback(
    (
      id: number,
      mouseX: number,
      mouseY: number,
      offsetX: number,
      offsetY: number
    ) => {
      setDragState({
        draggingId: id,

        mouseX,
        mouseY,

        offsetX,
        offsetY,
      });
    },
    []
  );

  const updateDrag = useCallback(
    (
      mouseX: number,
      mouseY: number
    ) => {
      setDragState((prev) => ({
        ...prev,
        mouseX,
        mouseY,
      }));
    },
    []
  );

  const stopDrag = useCallback(() => {
    setDragState((prev) => ({
      ...prev,

      draggingId: null,
    }));
  }, []);

  return {
    dragState,

    startDrag,

    updateDrag,

    stopDrag,
  };
}