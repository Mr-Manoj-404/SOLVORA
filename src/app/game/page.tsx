"use client";

import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-cyan-400">
          Game Arena
        </h1>

        <p className="mt-4 text-slate-400">
          Ready to start a new puzzle?
        </p>

        <button
          onClick={() => router.push("/game/setup")}
          className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 text-xl font-bold text-black hover:bg-cyan-300"
        >
          Start New Game
        </button>

      </div>

    </main>
  );
}