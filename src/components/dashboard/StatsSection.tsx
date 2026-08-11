"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Trophy,
  Gamepad2,
  Timer,
  Globe,
} from "lucide-react";

import {
  getProfileStats,
  getGlobalRank,
} from "@/services/profile";
interface Stats {
  gamesPlayed: number;
  bestScore: number;
  totalMoves: number;
  bestTime: number | null;
}

function formatTime(
  seconds: number | null
) {
  if (seconds === null) {
    return "--:--";
  }

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function StatsSection() {
  const [stats, setStats] =
    useState<Stats | null>(null);

    const [globalRank, setGlobalRank] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data =
        await getProfileStats();
        
        setStats(data);
        
        const rank =
        await getGlobalRank();
        
        setGlobalRank(rank);
      } catch (error) {
        console.error(
          "[SOLVORA] Failed to load dashboard stats:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const dashboardStats = [
    {
      title: "Games Played",
      value: loading
        ? "..."
        : String(
            stats?.gamesPlayed ?? 0
          ),
      icon: Gamepad2,
    },
    {
      title: "Best Score",
      value: loading
        ? "..."
        : String(
            stats?.bestScore ?? 0
          ),
      icon: Trophy,
    },
    {
      title: "Fastest Time",
      value: loading
        ? "..."
        : formatTime(
            stats?.bestTime ?? null
          ),
      icon: Timer,
    },
    {
      title: "Global Rank",
      value: loading
      ? "..."
      : globalRank !== null
      ? `#${globalRank}`
      : "--",
      icon: Globe,
    },
  ];

  return (
    <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map(
        (stat) => {
          const Icon =
            stat.icon;

          return (
            <div
              key={stat.title}
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/70
                p-6
                shadow-lg
                transition
                hover:border-cyan-400/30
              "
            >
              <Icon
                className="
                  mb-4
                  h-8
                  w-8
                  text-cyan-400
                "
              />

              <h3 className="text-slate-400">
                {stat.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          );
        }
      )}
    </section>
  );
}