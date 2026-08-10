"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import PuzzlePiece from "./PuzzlePiece";
import PuzzlePreview from "./PuzzlePreview";
import PuzzleStats from "./PuzzleStats";
import PuzzleWinDialog from "./PuzzleWinDialog";

import { usePuzzleGame } from "@/hooks/usePuzzleGame";
import { useDragPuzzle } from "@/hooks/useDragPuzzle";

export default function PuzzleBoard() {
  console.log("PuzzleBoard rendered");
  const boardRef = useRef<HTMLDivElement>(null);

  const {
    pieces,
    imageUrl,
    moves,
    seconds,
    score,
    showDialog,

    draggingId,

    handleDragStart,
    handleDragMove,
    handleDragEnd,

    handleRestart,
    handleDashboard,
  } = usePuzzleGame();

  const {
    dragState,
    startDrag,
  } = useDragPuzzle();

  const gridSize = Math.round(Math.sqrt(pieces.length));
  console.log("Puzzle pieces:", pieces);

  useEffect(() => {
    if (
      dragState.draggingId === null ||
      !boardRef.current
    ) {
      return;
    }

    const rect =
      boardRef.current.getBoundingClientRect();

    handleDragMove(
      dragState.draggingId,
      dragState.mouseX -
        rect.left -
        dragState.offsetX,
      dragState.mouseY -
        rect.top -
        dragState.offsetY
    );
  }, [
    dragState,
    handleDragMove,
  ]);

  useEffect(() => {
    if (
      draggingId !== null &&
      dragState.draggingId === null
    ) {
      handleDragEnd(
        draggingId,
        gridSize
      );
    }
  }, [
    draggingId,
    dragState.draggingId,
    gridSize,
    handleDragEnd,
  ]);

  console.log("Pieces count:", pieces.length);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
      >
        <h2 className="mb-6 text-2xl font-bold text-cyan-400">
          Puzzle Board
        </h2>

        <PuzzleStats
          seconds={seconds}
          moves={moves}
          score={score}
        />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">

          <div className="w-56 flex-shrink-0">
            <PuzzlePreview imageUrl={imageUrl} />
          </div>

          <div className="flex flex-1 justify-center">

            <div
              ref={boardRef}
              className="relative rounded-xl border border-slate-700 bg-slate-950 overflow-hidden"
              style={{
                width: 700,
                height: 700,
              }}
            >
              {pieces.map((piece) => (
                <PuzzlePiece
                  key={piece.id}
                  piece={piece}
                  selected={
                    draggingId ===
                    piece.id
                  }
                  onMouseDown={(
                    event
                  ) => {
                    const rect =
                      event.currentTarget.getBoundingClientRect();

                    startDrag(
                      piece.id,
                      event.clientX -
                        rect.left,
                      event.clientY -
                        rect.top
                    );

                    handleDragStart(
                      piece.id
                    );
                  }}
                />
              ))}
            </div>

          </div>

        </div>

      </motion.div>
    </>
  );
}