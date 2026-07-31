"use client";

import { memo } from "react";
import Image from "next/image";

import { PuzzlePiece as Piece } from "@/types/puzzle";
import { isPieceCorrect } from "@/services/puzzleEngine";

type Props = {
  piece: Piece;
  selected: boolean;
  onClick: () => void;
};

function PuzzlePiece({
  piece,
  selected,
  onClick,
}: Props) {
  const correct = isPieceCorrect(piece);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Puzzle piece ${piece.correctIndex + 1}`}
      className={`
        relative
        aspect-square
        overflow-hidden
        rounded-xl
        border
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400

        ${
          selected
            ? "scale-95 ring-4 ring-cyan-400 border-cyan-400 shadow-lg shadow-cyan-500/30"
            : "hover:scale-95 border-slate-700"
        }

        ${
          correct
            ? "ring-2 ring-green-500"
            : ""
        }
      `}
    >
      <Image
        src={piece.image}
        alt={`Puzzle piece ${piece.correctIndex + 1}`}
        fill
        draggable={false}
        sizes="(max-width:768px) 100px, 150px"
        className="object-cover select-none pointer-events-none"
        priority={false}
      />

      {selected && (
        <div className="absolute inset-0 bg-cyan-400/10" />
      )}
    </button>
  );
}

export default memo(PuzzlePiece);