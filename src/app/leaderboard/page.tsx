"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Medal,
  Award,
} from "lucide-react";

import {
  getLeaderboard,
  type LeaderboardEntry,
} from "@/services/leaderboard";

export default function LeaderboardPage() {
  const [players, setPlayers] =
    useState<LeaderboardEntry[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data =
          await getLeaderboard();

        setPlayers(data);
      } catch (error) {
        console.error(
          "[SOLVORA] Failed to load leaderboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  function getRankIcon(rank: number) {
    if (rank === 0) {
      return (
        <Trophy className="h-6 w-6 text-yellow-400" />
      );
    }

    if (rank === 1) {
      return (
        <Medal className="h-6 w-6 text-slate-300" />
      );
    }

    if (rank === 2) {
      return (
        <Award className="h-6 w-6 text-orange-500" />
      );
    }

    return (
      <span className="font-bold text-slate-400">
        #{rank + 1}
      </span>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-cyan-400">
          🏆 SOLVORA Leaderboard
        </h1>

        {loading ? (
          <p className="text-center text-slate-400">
            Loading leaderboard...
          </p>
        ) : players.length === 0 ? (
          <p className="text-center text-slate-400">
            No completed games yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-700">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4 text-left">
                    Rank
                  </th>

                  <th className="p-4 text-left">
                    Player
                  </th>

                  <th className="p-4 text-left">
                    Score
                  </th>

                  <th className="p-4 text-left">
                    Moves
                  </th>

                  <th className="p-4 text-left">
                    Time
                  </th>

                  <th className="p-4 text-left">
                    Difficulty
                  </th>
                </tr>
              </thead>

              <tbody>
                {players.map(
                  (player, index) => (
                    <tr
                      key={`${player.created_at}-${index}`}
                      className="border-t border-slate-800 transition hover:bg-slate-900"
                    >
                      <td className="p-4">
                        {getRankIcon(index)}
                      </td>

                      <td className="p-4 font-semibold">
                        {player.display_name ||
                          "Unknown Player"}
                      </td>

                      <td className="p-4 font-bold text-green-400">
                        {player.score}
                      </td>

                      <td className="p-4">
                        {player.moves}
                      </td>

                      <td className="p-4">
                        {player.time_seconds}s
                      </td>

                      <td className="p-4 capitalize">
                        {player.difficulty}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}