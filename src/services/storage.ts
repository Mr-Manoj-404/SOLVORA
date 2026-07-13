import { supabase } from "@/lib/supabase";

export async function uploadGameImage(
  file: Blob,
  userId: string
) {
  const fileName = `${Date.now()}.png`;

  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("game-images")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from("game-images")
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}