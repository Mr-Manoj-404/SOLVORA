"use client";

import PuzzleBoard from "@/components/puzzle-v2/PuzzleBoard";

export default function PuzzleV2Page() {
  return (
    <main className="min-h-screen bg-slate-950 px-3 py-6 text-white sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* PAGE HEADER */}

        <div className="mb-5 text-center sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 sm:text-sm">
            SOLVORA
          </p>

          <h1 className="mt-2 text-2xl font-bold text-cyan-400 sm:text-4xl">
            Puzzle V2
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Solve the puzzle using your hand gestures.
          </p>
        </div>

        {/* PUZZLE */}

        <div className="w-full overflow-x-auto">
          <div className="mx-auto min-w-0">
            <PuzzleBoard />
          </div>
        </div>

      </div>
    </main>
  );
}