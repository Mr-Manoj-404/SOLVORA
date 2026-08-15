"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid3X3,
  Grid2X2,
  Grid2x2Plus,
} from "lucide-react";

const difficulties = [
  {
    name: "Easy",
    value: "easy",
    size: "3 × 3",
    color:
      "border-green-500 hover:bg-green-500/10",
    icon: Grid2X2,
  },
  {
    name: "Medium",
    value: "medium",
    size: "4 × 4",
    color:
      "border-yellow-500 hover:bg-yellow-500/10",
    icon: Grid3X3,
  },
  {
    name: "Hard",
    value: "hard",
    size: "5 × 5",
    color:
      "border-red-500 hover:bg-red-500/10",
    icon: Grid2x2Plus,
  },
];

export default function DifficultySelector() {
  const router = useRouter();

  const [selected, setSelected] =
    useState("easy");

  function continueGame() {
    router.push(
      `/game/camera?difficulty=${selected}`
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-1">

      {/* TITLE */}
      <h1 className="text-center text-4xl font-bold text-cyan-400 sm:text-5xl">
        New Game
      </h1>

      {/* DESCRIPTION */}
      <p className="mb-8 mt-3 text-center text-base text-slate-400 sm:mb-10 sm:text-lg">
        Choose your puzzle difficulty
      </p>

      {/* DIFFICULTIES */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 md:gap-6">

        {difficulties.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setSelected(item.value)
              }
              aria-pressed={
                selected === item.value
              }
              className={`rounded-2xl border p-5 transition active:scale-[0.98] sm:p-6 md:p-8 ${
                item.color
              } ${
                selected === item.value
                  ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/30"
                  : "border-slate-700 bg-slate-900"
              }`}
            >
              <Icon className="mx-auto mb-3 h-10 w-10 text-cyan-400 sm:mb-4 sm:h-12 sm:w-12" />

              <h2 className="text-2xl font-bold sm:text-3xl">
                {item.name}
              </h2>

              <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
                {item.size}
              </p>
            </button>
          );
        })}

      </div>

      {/* CONTINUE */}
      <div className="mt-8 flex justify-center text-center sm:mt-12">
        <button
          type="button"
          onClick={continueGame}
          className="
            min-h-12
            w-full
            max-w-sm
            rounded-xl
            bg-cyan-400
            px-6
            py-3
            text-base
            font-bold
            text-black
            transition
            hover:bg-cyan-300
            active:scale-[0.98]
            sm:w-auto
            sm:px-10
            sm:py-4
            sm:text-xl
          "
        >
          Continue →
        </button>
      </div>

    </div>
  );
}