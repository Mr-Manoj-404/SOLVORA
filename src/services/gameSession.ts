import { supabase } from "@/lib/supabase";

export async function getLatestGameSession(userId: string) {
  const { data, error } = await supabase
    .from("game_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}