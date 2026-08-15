"use client";

interface Props {
  moves: number;
  score: number;
  seconds: number;
}

export default function PuzzleStats({
  moves,
  score,
  seconds,
}: Props) {
  return (
    <div className="mb-5 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
      
      {/* MOVES */}
      <div className="rounded-xl bg-slate-800 px-3 py-3 text-center sm:rounded-lg sm:px-5 sm:py-3">
        <p className="text-xs text-slate-400 sm:text-sm">
          Moves
        </p>

        <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
          {moves}
        </p>
      </div>

      {/* TIME */}
      <div className="rounded-xl bg-slate-800 px-3 py-3 text-center sm:rounded-lg sm:px-5 sm:py-3">
        <p className="text-xs text-slate-400 sm:text-sm">
          Time
        </p>

        <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
          {seconds}s
        </p>
      </div>

      {/* SCORE */}
      <div className="rounded-xl bg-slate-800 px-3 py-3 text-center sm:rounded-lg sm:px-5 sm:py-3">
        <p className="text-xs text-slate-400 sm:text-sm">
          Score
        </p>

        <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
          {score}
        </p>
      </div>

    </div>
  );
}