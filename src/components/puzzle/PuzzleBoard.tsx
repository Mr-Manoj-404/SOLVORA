"use client";

import { motion } from "framer-motion";

import PuzzlePiece from "./PuzzlePiece";
import PuzzlePreview from "./PuzzlePreview";
import PuzzleStats from "./PuzzleStats";
import PuzzleWinDialog from "./PuzzleWinDialog";

import { usePuzzleGame } from "@/hooks/usePuzzleGame";

export default function PuzzleBoard() {
  const {
    pieces,
    imageUrl,
    moves,
    seconds,
    score,
    showDialog,
    selectedIndex,
    handlePieceClick,
    handleRestart,
    handleDashboard,
  } = usePuzzleGame();

  if (pieces.length === 0) {
    return (
      <div className="flex h-[550px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          <p className="text-lg font-medium text-slate-300">
            Creating Puzzle...
          </p>
        </div>
      </div>
    );
  }

  const gridSize = Math.max(1, Math.round(Math.sqrt(pieces.length)));

  return (
    <>
      <PuzzleWinDialog
        open={showDialog}
        score={score}
        moves={moves}
        seconds={seconds}
        onRestart={handleRestart}
        onDashboard={handleDashboard}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl"
      >
        <h2 className="mb-6 text-2xl font-bold text-cyan-400">
          Puzzle Board
        </h2>

        <div className="mb-8">
          <PuzzleStats
            seconds={seconds}
            moves={moves}
            score={score}
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full lg:w-56 lg:flex-shrink-0">
            <PuzzlePreview imageUrl={imageUrl} />
          </div>

          <div className="flex flex-1 justify-center">
            <div
              role="grid"
              aria-label="Puzzle Board"
              className="grid w-full max-w-[700px] gap-1"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              }}
            >
              {pieces.map((piece, index) => (
                <PuzzlePiece
                  key={piece.id}
                  piece={piece}
                  selected={selectedIndex === index}
                  onClick={() => handlePieceClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}