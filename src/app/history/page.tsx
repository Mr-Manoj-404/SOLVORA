import GameHistory from "@/components/history/GameHistory";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            SOLVORA
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Game History
          </h1>

          <p className="mt-2 text-slate-400">
            View your completed puzzle games,
            scores, moves and times.
          </p>
        </div>

        <GameHistory />
      </div>
    </main>
  );
}