"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getLeaderboard,
  LeaderboardDifficulty,
  LeaderboardEntry,
} from "@/services/leaderboard";

function formatTime(seconds: number) {
  const minutes = Math.floor(
    seconds / 60
  );

  const remaining =
    seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${remaining
    .toString()
    .padStart(2, "0")}`;
}

function getRankIcon(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";

  return `#${rank}`;
}

export default function Leaderboard() {
  const [difficulty, setDifficulty] =
    useState<
      LeaderboardDifficulty | undefined
    >(undefined);

  const [players, setPlayers] =
    useState<LeaderboardEntry[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getLeaderboard(
            difficulty
          );

        setPlayers(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load leaderboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [difficulty]);

  return (
    <div className="space-y-6">
      {/* Difficulty filter */}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() =>
            setDifficulty(
              undefined
            )
          }
          className={`
            rounded-xl
            px-5
            py-2.5
            text-sm
            font-semibold
            transition
            ${
              difficulty === undefined
                ? "bg-cyan-400 text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }
          `}
        >
          All
        </button>

        {(
          [
            "easy",
            "medium",
            "hard",
          ] as LeaderboardDifficulty[]
        ).map((level) => (
          <button
            key={level}
            onClick={() =>
              setDifficulty(level)
            }
            className={`
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-semibold
              capitalize
              transition
              ${
                difficulty === level
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            `}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Loading */}

      {loading && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-10 text-center">
          <p className="text-cyan-400">
            Loading leaderboard...
          </p>
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Empty */}

      {!loading &&
        !error &&
        players.length === 0 && (
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-10 text-center">
            <div className="mb-4 text-5xl">
              🏆
            </div>

            <h2 className="text-xl font-bold text-white">
              No scores yet
            </h2>

            <p className="mt-2 text-slate-400">
              Complete a puzzle to appear
              on the leaderboard.
            </p>
          </div>
        )}

      {/* Leaderboard */}

      {!loading &&
        !error &&
        players.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 shadow-xl">
            <div className="hidden grid-cols-[80px_1fr_130px_100px_110px] gap-4 border-b border-slate-700 bg-slate-800/60 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
              <span>Rank</span>
              <span>Player</span>
              <span>Score</span>
              <span>Moves</span>
              <span>Time</span>
            </div>

            <div className="divide-y divide-slate-800">
              {players.map(
                (player) => (
                  <div
                    key={`${player.rank}-${player.display_name}-${player.score}`}
                    className={`
                      grid
                      gap-4
                      px-6
                      py-5
                      transition
                      hover:bg-slate-800/40
                      md:grid-cols-[80px_1fr_130px_100px_110px]
                      md:items-center
                    `}
                  >
                    {/* Rank */}

                    <div className="text-2xl font-bold">
                      {getRankIcon(
                        player.rank
                      )}
                    </div>

                    {/* Player */}

                    <div className="flex items-center gap-3">
                      {player.avatar_url ? (
                        <img
                          src={
                            player.avatar_url
                          }
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 font-bold text-cyan-400">
                          {player.display_name
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-white">
                          {
                            player.display_name
                          }
                        </p>

                        <p className="text-xs capitalize text-slate-500">
                          {
                            player.difficulty
                          }
                        </p>
                      </div>
                    </div>

                    {/* Score */}

                    <div>
                      <p className="text-xs text-slate-500 md:hidden">
                        Score
                      </p>

                      <p className="font-bold text-cyan-400">
                        {player.score}
                      </p>
                    </div>

                    {/* Moves */}

                    <div>
                      <p className="text-xs text-slate-500 md:hidden">
                        Moves
                      </p>

                      <p className="font-semibold text-white">
                        {player.moves}
                      </p>
                    </div>

                    {/* Time */}

                    <div>
                      <p className="text-xs text-slate-500 md:hidden">
                        Time
                      </p>

                      <p className="font-semibold text-white">
                        {formatTime(
                          player.time_seconds
                        )}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
}