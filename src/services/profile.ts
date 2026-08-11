import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProfileStats {
  gamesPlayed: number;
  bestScore: number;
  totalMoves: number;
  bestTime: number | null;

  easyGames: number;
  mediumGames: number;
  hardGames: number;
}

export async function getUserProfile() {
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
  } = await supabase
    .from("profiles")
    .select(
      `
        id,
        display_name,
        avatar_url,
        created_at
      `
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "[SOLVORA] Failed to load profile:",
      error
    );

    throw error;
  }

  return {
    user,
    profile: data as UserProfile | null,
  };
}

export async function getProfileStats(): Promise<ProfileStats> {
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
  } = await supabase
    .from("game_results")
    .select(
      `
        difficulty,
        score,
        moves,
        time_seconds,
        completed
      `
    )
    .eq("user_id", user.id)
    .eq("completed", true);

  if (error) {
    console.error(
      "[SOLVORA] Failed to load profile statistics:",
      error
    );

    throw error;
  }

  const games = data ?? [];

  const scores = games.map(
    (game) => game.score
  );

  const times = games.map(
    (game) => game.time_seconds
  );

  const totalMoves =
    games.reduce(
      (total, game) =>
        total + game.moves,
      0
    );

  return {
    gamesPlayed:
      games.length,

    bestScore:
      scores.length > 0
        ? Math.max(...scores)
        : 0,

    totalMoves,

    bestTime:
      times.length > 0
        ? Math.min(...times)
        : null,

    easyGames:
      games.filter(
        (game) =>
          game.difficulty === "easy"
      ).length,

    mediumGames:
      games.filter(
        (game) =>
          game.difficulty === "medium"
      ).length,

    hardGames:
      games.filter(
        (game) =>
          game.difficulty === "hard"
      ).length,
  };
}

export async function updateUserProfile(
  displayName: string,
  avatarUrl?: string | null
) {
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
  } = await supabase
    .from("profiles")
    .update({
      display_name:
        displayName.trim(),

      avatar_url:
        avatarUrl ?? null,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error(
      "[SOLVORA] Failed to update profile:",
      error
    );

    throw error;
  }

  return data;
}
export async function getGlobalRank(): Promise<number | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase.rpc(
    "get_user_global_rank"
  );

  if (error) {
    console.error(
      "[SOLVORA] Failed to load global rank:",
      error
    );

    throw error;
  }

  return data ?? null;
}