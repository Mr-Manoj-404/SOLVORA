import { supabase } from "@/lib/supabase";

export type LeaderboardDifficulty =
  | "easy"
  | "medium"
  | "hard";

export interface LeaderboardEntry {
  rank: number;
  display_name: string;
  avatar_url: string | null;
  difficulty: LeaderboardDifficulty;
  score: number;
  moves: number;
  time_seconds: number;
  created_at: string;
}

export async function getLeaderboard(
  difficulty?: LeaderboardDifficulty,
  limit = 50
): Promise<LeaderboardEntry[]> {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "User is not authenticated."
    );
  }

  const {
    data,
    error,
  } = await supabase.rpc(
    "get_leaderboard",
    {
      p_difficulty:
        difficulty ?? null,

      p_limit: limit,
    }
  );

  if (error) {
    console.error(
      "[SOLVORA] Failed to load leaderboard:",
      error
    );

    throw error;
  }

  return (
    (data ?? []) as LeaderboardEntry[]
  );
}