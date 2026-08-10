import { supabase } from "@/lib/supabase";

export async function getGameHistory() {
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
        id,
        game_session_id,
        difficulty,
        score,
        moves,
        time_seconds,
        completed,
        created_at
      `
    )
    .eq(
      "user_id",
      user.id
    )
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    console.error(
      "[SOLVORA] Failed to load game history:",
      error
    );

    throw error;
  }

  return data ?? [];
}