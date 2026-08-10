"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { PuzzlePiece as Piece } from "@/types/puzzle";

interface Props {
  piece: Piece;

  mode?: "tray" | "board";

  onMouseDown?: (
    event: React.MouseEvent,
    piece: Piece
  ) => void;
}

export default function PuzzlePiece({
  piece,
  mode = "tray",
  onMouseDown,
}: Props) {
  const isBoard =
    mode === "board";

  return (
    <motion.div
      animate={
        isBoard
          ? {
              x: piece.x,
              y: piece.y,
              scale: piece.dragging
                ? 1.05
                : 1,
              zIndex: piece.dragging
                ? 100
                : piece.placed
                ? 20
                : 1,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onMouseDown={(event) =>
        onMouseDown?.(
          event,
          piece
        )
      }
      className={`
        overflow-hidden
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        shadow-lg
        select-none
        ${
          piece.placed
            ? "cursor-default"
            : "cursor-grab active:cursor-grabbing"
        }
      `}
      style={
        isBoard
          ? {
              position: "absolute",
              left: 0,
              top: 0,
              width: piece.width,
              height: piece.height,
            }
          : {
              width: "100%",
              aspectRatio: "1 / 1",
            }
      }
    >
      <Image
        src={piece.image}
        alt={`Piece ${piece.id}`}
        fill
        unoptimized
        draggable={false}
        sizes={`${piece.width}px`}
        className="
          pointer-events-none
          object-fill
        "
      />
    </motion.div>
  );
}