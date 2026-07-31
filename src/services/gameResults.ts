import { supabase } from "@/lib/supabase";

type SaveResultProps = {
  userId: string;
  gameSessionId: string;
  difficulty: string;
  score: number;
  moves: number;
  timeSeconds: number;
};

export async function saveGameResult({
  userId,
  gameSessionId,
  difficulty,
  score,
  moves,
  timeSeconds,
}: SaveResultProps) {
  const { error } = await supabase
    .from("game_results")
    .insert({
      user_id: userId,
      game_session_id: gameSessionId,
      difficulty,
      score,
      moves,
      time_seconds: timeSeconds,
    });

  if (error) {
    throw error;
  }
}