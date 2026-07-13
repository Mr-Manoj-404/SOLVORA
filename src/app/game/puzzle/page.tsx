"use client";

import PuzzleHeader from "@/components/puzzle/PuzzleHeader";
import PuzzleBoard from "@/components/puzzle/PuzzleBoard";
import PuzzleControls from "@/components/puzzle/PuzzleControls";

export default function PuzzlePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mx-auto max-w-7xl">

        <PuzzleHeader />

        <div className="mt-8">
          <PuzzleBoard />
        </div>

        <div className="mt-8">
          <PuzzleControls />
        </div>

      </div>
    </main>
  );
}