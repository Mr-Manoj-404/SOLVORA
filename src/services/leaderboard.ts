import { supabase } from "@/lib/supabase";

export async function getLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from("game_results")
    .select(`
      score,
      moves,
      time_seconds,
      difficulty,
      created_at,
      profiles!game_results_user_id_profiles_fkey (
        display_name
      )
    `)
    .order("score", { ascending: false })
    .order("time_seconds", { ascending: true })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}