"use client";

import { useCallback, useEffect, useState } from "react";

export interface DragState {
  draggingId: number | null;
  offsetX: number;
  offsetY: number;
  mouseX: number;
  mouseY: number;
}

export function useDragPuzzle() {
  const [dragState, setDragState] =
    useState<DragState>({
      draggingId: null,
      offsetX: 0,
      offsetY: 0,
      mouseX: 0,
      mouseY: 0,
    });

  const startDrag = useCallback(
    (
      id: number,
      offsetX: number,
      offsetY: number
    ) => {
      setDragState({
        draggingId: id,
        offsetX,
        offsetY,
        mouseX: 0,
        mouseY: 0,
      });
    },
    []
  );

  const stopDrag = useCallback(() => {
    setDragState({
      draggingId: null,
      offsetX: 0,
      offsetY: 0,
      mouseX: 0,
      mouseY: 0,
    });
  }, []);

  useEffect(() => {
    if (dragState.draggingId === null) {
      return;
    }

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      setDragState((prev) => ({
        ...prev,
        mouseX: event.clientX,
        mouseY: event.clientY,
      }));
    };

    const handleMouseUp = () => {
      stopDrag();
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [
    dragState.draggingId,
    stopDrag,
  ]);

  return {
    dragState,
    startDrag,
    stopDrag,
  };
}