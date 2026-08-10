"use client";

import PuzzlePiece from "./PuzzlePiece";

import { PuzzlePiece as Piece } from "@/types/puzzle";

interface Props {
  pieces: Piece[];
}

export default function PuzzleTray({
  pieces,
}: Props) {
  return (
    <div>

      <h2 className="mb-4 text-xl font-bold text-cyan-400">
        Puzzle Pieces
      </h2>

      <div
        className="
        grid
        grid-cols-3
        gap-3
        "
      >
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className="relative w-28 h-28"
          >
            <PuzzlePiece
            piece={piece}
            mode="tray"
            />
          </div>
        ))}
      </div>

    </div>
  );
}