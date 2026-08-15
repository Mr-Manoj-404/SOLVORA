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
    <div className="fixed inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-black/60 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6">
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
          rounded-2xl
          border
          border-cyan-400/30
          bg-slate-950
          p-5
          text-center
          shadow-2xl
          sm:rounded-3xl
          sm:p-8
        "
      >
        <div className="text-4xl sm:text-5xl">
          🎉
        </div>

        <h2 className="mt-3 text-2xl font-bold text-cyan-400 sm:text-3xl">
          Puzzle Solved!
        </h2>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Excellent work!
        </p>

        {/* RESULTS */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
          <div className="rounded-xl bg-slate-900 p-3 sm:rounded-2xl sm:p-4">
            <p className="text-[10px] uppercase text-slate-500 sm:text-xs">
              Score
            </p>

            <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
              {score}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-3 sm:rounded-2xl sm:p-4">
            <p className="text-[10px] uppercase text-slate-500 sm:text-xs">
              Moves
            </p>

            <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
              {moves}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-3 sm:rounded-2xl sm:p-4">
            <p className="text-[10px] uppercase text-slate-500 sm:text-xs">
              Time
            </p>

            <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
              {formatTime(seconds)}
            </p>
          </div>
        </div>

        {/* PLAY AGAIN */}
        <button
          type="button"
          onClick={onPlayAgain}
          className="
            mt-6
            min-h-12
            w-full
            rounded-xl
            bg-cyan-500
            px-6
            py-3
            text-base
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-400
            active:scale-[0.98]
            sm:mt-8
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
            min-h-12
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-6
            py-3
            text-base
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