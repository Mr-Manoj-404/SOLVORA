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
    <div className="mb-6 flex gap-6">

      <div className="rounded-lg bg-slate-800 px-5 py-3">
        <p className="text-sm text-slate-400">
          Moves
        </p>

        <p className="text-2xl font-bold text-white">
          {moves}
        </p>
      </div>

      <div className="rounded-lg bg-slate-800 px-5 py-3">
        <p className="text-sm text-slate-400">
          Time
        </p>

        <p className="text-2xl font-bold text-white">
          {seconds}s
        </p>
      </div>

      <div className="rounded-lg bg-slate-800 px-5 py-3">
        <p className="text-sm text-slate-400">
          Score
        </p>

        <p className="text-2xl font-bold text-white">
          {score}
        </p>
      </div>

    </div>
  );
}