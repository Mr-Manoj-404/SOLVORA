"use client";

import { memo, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  RotateCcw,
  Home,
  Clock3,
  Move,
  Star,
} from "lucide-react";

type Props = {
  open: boolean;
  score: number;
  moves: number;
  seconds: number;
  onRestart: () => void;
  onDashboard: () => void;
};

function PuzzleWinDialog({
  open,
  score,
  moves,
  seconds,
  onRestart,
  onDashboard,
}: Props) {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, [seconds]);

  const performance = useMemo(() => {
    if (score >= 900) {
      return {
        label: "Excellent",
        color: "text-green-400",
      };
    }

    if (score >= 700) {
      return {
        label: "Great",
        color: "text-yellow-400",
      };
    }

    return {
      label: "Good",
      color: "text-orange-400",
    };
  }, [score]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDashboard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onDashboard]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="puzzle-complete-title"
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
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 18,
            }}
            className="w-full max-w-md rounded-3xl border border-cyan-500/40 bg-slate-900 p-8 shadow-2xl"
          >
            <div className="flex justify-center">
              <div className="rounded-full bg-yellow-500/15 p-5">
                <Trophy className="h-12 w-12 text-yellow-400" />
              </div>
            </div>

            <h1
              id="puzzle-complete-title"
              className="mt-6 text-center text-3xl font-bold text-white"
            >
              Puzzle Completed!
            </h1>

            <p className="mt-2 text-center text-slate-400">
              Congratulations! You solved the puzzle.
            </p>

            <div
              className={`mt-3 text-center text-lg font-semibold ${performance.color}`}
            >
              {performance.label}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-400" />
                  <span>Score</span>
                </div>

                <span className="font-bold text-green-400">
                  {score}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-cyan-400" />
                  <span>Time</span>
                </div>

                <span className="font-bold">
                  {formattedTime}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
                <div className="flex items-center gap-2">
                  <Move className="h-5 w-5 text-yellow-400" />
                  <span>Moves</span>
                </div>

                <span className="font-bold">
                  {moves}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onRestart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
              >
                <RotateCcw size={18} />
                Play Again
              </button>

              <button
                type="button"
                onClick={onDashboard}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400"
              >
                <Home size={18} />
                Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(PuzzleWinDialog);