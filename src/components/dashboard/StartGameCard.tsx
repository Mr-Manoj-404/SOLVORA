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
    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
      <div className="flex flex-col items-center text-center">

        <div className="rounded-full bg-cyan-400/20 p-5">
          <Camera className="h-12 w-12 text-cyan-400" />
        </div>

        <h2 className="mt-6 text-3xl font-bold">
          Start New Puzzle
        </h2>

        <p className="mt-3 max-w-xl text-slate-400">
          Capture a photo using your camera and let SOLVORA
          generate a puzzle for you.
        </p>

        {/* DIFFICULTY */}

        <div className="mt-6 w-full max-w-md">
          <p className="mb-3 text-sm font-semibold text-slate-400">
            Choose Difficulty
          </p>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                setDifficulty("easy")
              }
              className={`rounded-xl border px-4 py-3 font-semibold transition ${
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

            <button
              type="button"
              onClick={() =>
                setDifficulty("medium")
              }
              className={`rounded-xl border px-4 py-3 font-semibold transition ${
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

            <button
              type="button"
              onClick={() =>
                setDifficulty("hard")
              }
              className={`rounded-xl border px-4 py-3 font-semibold transition ${
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
            mt-8
            rounded-xl
            bg-cyan-400
            px-8
            py-4
            text-lg
            font-semibold
            text-black
            transition
            hover:bg-cyan-300
            active:scale-[0.98]
          "
        >
          Open Camera
        </button>

      </div>
    </section>
  );
}