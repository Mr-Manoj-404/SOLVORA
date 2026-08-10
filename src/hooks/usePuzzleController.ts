"use client";

import { useMemo } from "react";

import { HandData } from "@/types/hand";

import { usePuzzleGame } from "./usePuzzleGame";
import { useDragPuzzle } from "./useDragPuzzle";

interface UsePuzzleControllerProps {
  hands: HandData[];
  isTracking: boolean;
}

export function usePuzzleController({
  hands,
  isTracking,
}: UsePuzzleControllerProps) {

  const game = usePuzzleGame();

  const drag = useDragPuzzle();

  const cursor = useMemo(() => {

    if (
      !isTracking ||
      hands.length === 0
    ) {
      return null;
    }

    return {
      x: hands[0].cursor.x,
      y: hands[0].cursor.y,
      pinching: hands[0].isPinching,
    };

  }, [hands, isTracking]);

  return {

    cursor,

    game,

    drag,

  };
}