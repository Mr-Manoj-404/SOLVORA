"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getProfileStats,
  getUserProfile,
  ProfileStats as Stats,
  UserProfile,
} from "@/services/profile";

function formatTime(
  seconds: number | null
) {
  if (seconds === null) {
    return "--:--";
  }

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

export default function ProfileStats() {
  const [profile, setProfile] =
    useState<UserProfile | null>(
      null
    );

  const [stats, setStats] =
    useState<Stats | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        const [
          profileData,
          statsData,
        ] = await Promise.all([
          getUserProfile(),
          getProfileStats(),
        ]);

        setProfile(
          profileData.profile
        );

        setStats(statsData);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-cyan-400">
          Loading profile...
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

  if (!stats) {
    return null;
  }

  const displayName =
    profile?.display_name ||
    "SOLVORA Player";

  return (
    <div className="space-y-6">
      {/* Profile header */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt=""
              className="h-24 w-24 rounded-full object-cover ring-4 ring-cyan-400/20"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10 text-4xl font-bold text-cyan-400 ring-4 ring-cyan-400/10">
              {displayName
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div className="text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
              SOLVORA Player
            </p>

            <h2 className="mt-1 text-3xl font-bold text-white">
              {displayName}
            </h2>

            {profile?.created_at && (
              <p className="mt-2 text-sm text-slate-500">
                Member since{" "}
                {new Date(
                  profile.created_at
                ).toLocaleDateString(
                  "en-IN",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main statistics */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Games Played"
          value={
            stats.gamesPlayed
          }
          icon="🎮"
        />

        <StatCard
          title="Best Score"
          value={
            stats.bestScore
          }
          icon="🏆"
        />

        <StatCard
          title="Total Moves"
          value={
            stats.totalMoves
          }
          icon="👆"
        />

        <StatCard
          title="Best Time"
          value={formatTime(
            stats.bestTime
          )}
          icon="⏱️"
        />
      </div>

      {/* Difficulty statistics */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl">
        <h3 className="mb-5 text-xl font-bold text-white">
          Difficulty Breakdown
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <DifficultyCard
            name="Easy"
            games={
              stats.easyGames
            }
            grid="3 × 3"
          />

          <DifficultyCard
            name="Medium"
            games={
              stats.mediumGames
            }
            grid="4 × 4"
          />

          <DifficultyCard
            name="Hard"
            games={
              stats.hardGames
            }
            grid="5 × 5"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-xs uppercase tracking-wider text-slate-500">
          {title}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold text-cyan-400">
        {value}
      </p>
    </div>
  );
}

function DifficultyCard({
  name,
  games,
  grid,
}: {
  name: string;
  games: number;
  grid: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold capitalize text-white">
          {name}
        </h4>

        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {grid}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold text-white">
        {games}
      </p>

      <p className="text-sm text-slate-500">
        completed games
      </p>
    </div>
  );
}