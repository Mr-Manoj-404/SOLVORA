"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

type Difficulty = "easy" | "medium" | "hard";

export default function StartGameCard() {
  const router = useRouter();

  const [difficulty, setDifficulty] =
    useState<Difficulty>("easy");

  function handleStartGame() {
    router.push(
      `/game/camera?difficulty=${difficulty}`
    );
  }

  return (
    <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl sm:mt-8 sm:p-8">
      <div className="flex flex-col items-center text-center">

        {/* CAMERA ICON */}
        <div className="rounded-full bg-cyan-400/20 p-4 sm:p-5">
          <Camera className="h-9 w-9 text-cyan-400 sm:h-12 sm:w-12" />
        </div>

        {/* TITLE */}
        <h2 className="mt-5 text-2xl font-bold sm:mt-6 sm:text-3xl">
          Start New Puzzle
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base">
          Capture a photo using your camera and let SOLVORA
          generate a puzzle for you.
        </p>

        {/* DIFFICULTY */}
        <div className="mt-6 w-full max-w-md">
          <p className="mb-3 text-sm font-semibold text-slate-400">
            Choose Difficulty
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">

            {/* EASY */}
            <button
              type="button"
              onClick={() =>
                setDifficulty("easy")
              }
              className={`min-h-16 rounded-xl border px-2 py-3 text-sm font-semibold transition active:scale-[0.97] sm:px-4 sm:text-base ${
                difficulty === "easy"
                  ? "border-cyan-400 bg-cyan-400 text-slate-950"
                  : "border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-400/50"
              }`}
            >
              Easy

              <span className="mt-1 block text-xs opacity-70">
                3 × 3
              </span>
            </button>

            {/* MEDIUM */}
            <button
              type="button"
              onClick={() =>
                setDifficulty("medium")
              }
              className={`min-h-16 rounded-xl border px-2 py-3 text-sm font-semibold transition active:scale-[0.97] sm:px-4 sm:text-base ${
                difficulty === "medium"
                  ? "border-cyan-400 bg-cyan-400 text-slate-950"
                  : "border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-400/50"
              }`}
            >
              Medium

              <span className="mt-1 block text-xs opacity-70">
                4 × 4
              </span>
            </button>

            {/* HARD */}
            <button
              type="button"
              onClick={() =>
                setDifficulty("hard")
              }
              className={`min-h-16 rounded-xl border px-2 py-3 text-sm font-semibold transition active:scale-[0.97] sm:px-4 sm:text-base ${
                difficulty === "hard"
                  ? "border-cyan-400 bg-cyan-400 text-slate-950"
                  : "border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-400/50"
              }`}
            >
              Hard

              <span className="mt-1 block text-xs opacity-70">
                5 × 5
              </span>
            </button>

          </div>
        </div>

        {/* OPEN CAMERA */}
        <button
          type="button"
          onClick={handleStartGame}
          className="
            mt-7
            min-h-12
            w-full
            max-w-md
            rounded-xl
            bg-cyan-400
            px-6
            py-3
            text-base
            font-semibold
            text-black
            transition
            hover:bg-cyan-300
            active:scale-[0.98]
            sm:mt-8
            sm:px-8
            sm:py-4
            sm:text-lg
          "
        >
          Open Camera
        </button>

      </div>
    </section>
  );
}