import { supabase } from "@/lib/supabase";

export async function createProfile(
  id: string,
  displayName: string
) {
  const { error } = await supabase
    .from("profiles")
    .upsert({
      id,
      display_name: displayName,
    });

  if (error) {
    throw error;
  }
}

export async function getProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}