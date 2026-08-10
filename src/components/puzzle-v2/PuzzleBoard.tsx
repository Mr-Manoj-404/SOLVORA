"use client";

import PuzzleStats from "./PuzzleStats";
import PuzzleCamera from "./PuzzleCamera";
import WinDialog from "./WinDialog";

import { usePuzzleGameV2 } from "@/hooks/usePuzzleGameV2";

export default function PuzzleBoard() {
  const {
    loading,
    pieces,
    moves,
    seconds,
    score,
    gameSolved,
    beginDrag,
    dragPiece,
    endDrag,
    reloadPuzzle,
  } = usePuzzleGameV2();

  if (loading) {
    return (
      <div className="flex h-[700px] items-center justify-center text-xl text-white">
        Loading Puzzle...
      </div>
    );
  }

  return (
    <div className="w-full">
      <PuzzleStats
        moves={moves}
        seconds={seconds}
        score={score}
      />

      <div className="mt-6">
        <PuzzleCamera
          pieces={pieces}
          beginDrag={beginDrag}
          dragPiece={dragPiece}
          endDrag={endDrag}
        />
      </div>

      <WinDialog
        open={gameSolved}
        score={score}
        moves={moves}
        seconds={seconds}
        onPlayAgain={reloadPuzzle}
      />
    </div>
  );
}