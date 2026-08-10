"use client";

import { motion } from "framer-motion";

import { PuzzlePiece as Piece } from "@/types/puzzle";

interface PuzzlePieceProps {
  piece: Piece;
  selected?: boolean;
  onClick?: () => void;

  onMouseDown?: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export default function PuzzlePiece({
  piece,
  selected = false,
  onClick,
  onMouseDown,
}: PuzzlePieceProps) {
  return (
    <motion.div
      layout
      animate={{
        x: piece.x,
        y: piece.y,
        scale: piece.dragging ? 1.08 : 1,
        rotate: piece.dragging ? 2 : 0,
        zIndex: piece.dragging ? 100 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={`
        absolute
        overflow-hidden
        rounded-xl
        border
        cursor-grab
        active:cursor-grabbing
        select-none
        shadow-lg
        transition-all

        ${
          selected
            ? "border-cyan-400 ring-4 ring-cyan-400/30"
            : "border-slate-700"
        }

        ${
          piece.dragging
            ? "shadow-cyan-500/40"
            : ""
        }
      `}
      style={{
        width: piece.width,
        height: piece.height,
        left: 0,
        top: 0,
      }}
    >
      <img
        src={piece.image}
        alt={`Piece ${piece.id}`}
        draggable={false}
        className="h-full w-full object-cover pointer-events-none"
      />

      {piece.placed && (
        <div className="absolute inset-0 bg-green-500/15 border-2 border-green-400 rounded-xl" />
      )}
    </motion.div>
  );
}