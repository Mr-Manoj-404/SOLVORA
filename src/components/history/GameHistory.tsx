"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getGameHistory,
} from "@/services/gameHistory";

interface GameResult {
  id: string;

  game_session_id:
    | string
    | null;

  difficulty:
    | string
    | null;

  score: number;

  moves: number;

  time_seconds: number;

  completed: boolean;

  created_at: string;
}

function formatTime(
  seconds: number
) {
  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function formatDate(
  date: string
) {
  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function GameHistory() {
  const [games, setGames] =
    useState<GameResult[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);

        const data =
          await getGameHistory();

        setGames(
          data as GameResult[]
        );
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load game history."
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-cyan-400">
          Loading game history...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-10 text-center">
        <div className="mb-4 text-5xl">
          🧩
        </div>

        <h2 className="text-xl font-bold text-white">
          No games yet
        </h2>

        <p className="mt-2 text-slate-400">
          Complete your first puzzle
          and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {games.map(
        (game) => (
          <div
            key={game.id}
            className="
              rounded-2xl
              border
              border-slate-700
              bg-slate-900/70
              p-5
              shadow-lg
              transition
              hover:border-cyan-500/40
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold capitalize text-white">
                    {game.difficulty ??
                      "Easy"}
                  </h3>

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {game.completed
                      ? "Completed"
                      : "Incomplete"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {formatDate(
                    game.created_at
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <p className="text-xs text-slate-500">
                    Score
                  </p>

                  <p className="font-bold text-cyan-400">
                    {game.score}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Moves
                  </p>

                  <p className="font-bold text-white">
                    {game.moves}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Time
                  </p>

                  <p className="font-bold text-white">
                    {formatTime(
                      game.time_seconds
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}