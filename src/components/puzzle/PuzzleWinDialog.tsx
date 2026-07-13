"use client";

type Props = {
  open: boolean;
  moves: number;
  seconds: number;
  score: number;
  onRestart: () => void;
  onDashboard: () => void;
};

export default function PuzzleWinDialog({
  open,
  moves,
  seconds,
  score,
  onRestart,
  onDashboard,
}: Props) {
  if (!open) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[450px] rounded-3xl bg-slate-900 p-8 shadow-2xl">

        <h1 className="text-center text-4xl font-bold text-green-400">
          🏆 Puzzle Completed!
        </h1>

        <div className="mt-8 space-y-4 text-xl">

          <div className="flex justify-between">
            <span>⭐ Score</span>
            <span className="font-bold">{score}</span>
          </div>

          <div className="flex justify-between">
            <span>⏱ Time</span>
            <span>
              {minutes.toString().padStart(2, "0")}:
              {remainingSeconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex justify-between">
            <span>🔄 Moves</span>
            <span>{moves}</span>
          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={onRestart}
            className="flex-1 rounded-xl bg-cyan-500 py-3 font-bold text-black"
          >
            🔄 Play Again
          </button>

          <button
            onClick={onDashboard}
            className="flex-1 rounded-xl bg-green-500 py-3 font-bold"
          >
            🏠 Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}