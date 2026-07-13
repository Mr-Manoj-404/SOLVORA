"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid3X3, Grid2X2, Grid2x2Plus } from "lucide-react";

const difficulties = [
  {
    name: "Easy",
    value: "easy",
    size: "3 × 3",
    color: "border-green-500 hover:bg-green-500/10",
    icon: Grid2X2,
  },
  {
    name: "Medium",
    value: "medium",
    size: "4 × 4",
    color: "border-yellow-500 hover:bg-yellow-500/10",
    icon: Grid3X3,
  },
  {
    name: "Hard",
    value: "hard",
    size: "5 × 5",
    color: "border-red-500 hover:bg-red-500/10",
    icon: Grid2x2Plus,
  },
];

export default function DifficultySelector() {
  const router = useRouter();

  const [selected, setSelected] = useState("easy");

  function continueGame() {
    router.push(`/game/camera?difficulty=${selected}`);
  }

  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-3 text-center text-5xl font-bold text-cyan-400">
        New Game
      </h1>

      <p className="mb-10 text-center text-slate-400 text-lg">
        Choose your puzzle difficulty
      </p>

      <div className="grid gap-6 md:grid-cols-3">

        {difficulties.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelected(item.value)}
            className={`rounded-2xl border p-8 transition ${
              item.color
            } ${
              selected === item.value
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-slate-700 bg-slate-900"
            }`}
          >
            <item.icon className="mx-auto mb-4 h-12 w-12 text-cyan-400" />

            <h2 className="text-3xl font-bold">
              {item.name}
            </h2>

            <p className="mt-2 text-slate-400">
              {item.size}
            </p>
          </button>
        ))}

      </div>

      <div className="mt-12 text-center">

        <button
          onClick={continueGame}
          className="rounded-xl bg-cyan-400 px-10 py-4 text-xl font-bold text-black transition hover:bg-cyan-300"
        >
          Continue →
        </button>

      </div>

    </div>
  );
}