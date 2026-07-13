import { supabase } from "@/lib/supabase";

export async function createGameSession({
  userId,
  imageUrl,
  difficulty,
  latitude,
  longitude,
}: {
  userId: string;
  imageUrl: string;
  difficulty: string;
  latitude?: number;
  longitude?: number;
}) {
  const { data, error } = await supabase
    .from("game_sessions")
    .insert({
      user_id: userId,
      image_url: imageUrl,
      difficulty,
      status: "pending",
      score: 0,
      time_taken: 0,
      latitude,
      longitude,
    })
    .select()
    .single();

  if (error) {
    console.log("Supabase Error:", error);
    console.log("Message:", error.message);
    console.log("Details:", error.details);
    console.log("Hint:", error.hint);
    console.log("Code:", error.code);

    throw error;
  }

  return data;
}