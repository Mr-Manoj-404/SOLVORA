import { supabase } from "@/lib/supabase";

export type GameDifficulty =
  | "easy"
  | "medium"
  | "hard";

export interface SaveGameResultInput {
  userId: string;

  gameSessionId?: string | null;

  difficulty: GameDifficulty;

  score: number;

  moves: number;

  timeSeconds: number;

  completed: boolean;
}

export async function saveGameResult(
  input: SaveGameResultInput
) {
  const {
    data,
    error,
  } = await supabase
    .from("game_results")
    .insert({
      user_id: input.userId,

      game_session_id:
        input.gameSessionId ?? null,

      difficulty:
        input.difficulty,

      score:
        input.score,

      moves:
        input.moves,

      time_seconds:
        input.timeSeconds,

      completed:
        input.completed,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "[SOLVORA] Failed to save game result:",
      error
    );

    throw error;
  }

  console.log(
    "[SOLVORA] Game result saved:",
    data
  );

  return data;
}