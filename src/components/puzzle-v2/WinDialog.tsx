"use client";

import { motion } from "framer-motion";

interface WinDialogProps {
  open: boolean;
  score: number;
  moves: number;
  seconds: number;
  onPlayAgain: () => void;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function WinDialog({
  open,
  score,
  moves,
  seconds,
  onPlayAgain,
}: WinDialogProps) {
  if (!open) {
    return null;
  }

  function handleExit() {
    window.location.href = "/dashboard";
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-cyan-400/30
          bg-slate-950
          p-8
          text-center
          shadow-2xl
        "
      >
        <div className="text-5xl">
          🎉
        </div>

        <h2 className="mt-3 text-3xl font-bold text-cyan-400">
          Puzzle Solved!
        </h2>

        <p className="mt-2 text-slate-400">
          Excellent work!
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-900 p-4">
            <p className="text-xs uppercase text-slate-500">
              Score
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {score}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <p className="text-xs uppercase text-slate-500">
              Moves
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {moves}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <p className="text-xs uppercase text-slate-500">
              Time
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {formatTime(seconds)}
            </p>
          </div>
        </div>

        {/* PLAY AGAIN */}
        <button
          type="button"
          onClick={onPlayAgain}
          className="
            mt-8
            w-full
            rounded-xl
            bg-cyan-500
            px-6
            py-3
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
            active:scale-[0.98]
          "
        >
          Play Again
        </button>

        {/* EXIT */}
        <button
          type="button"
          onClick={handleExit}
          className="
            mt-3
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-6
            py-3
            font-semibold
            text-slate-300
            transition
            hover:border-cyan-400/40
            hover:bg-slate-800
            hover:text-white
            active:scale-[0.98]
          "
        >
          Exit
        </button>
      </motion.div>
    </div>
  );
}