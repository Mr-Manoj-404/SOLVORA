"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getLatestGameSession } from "@/services/gameSession";

export default function PuzzleBoard() {
  const [image, setImage] = useState("");

  useEffect(() => {
    async function loadGame() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      try {
        const game = await getLatestGameSession(user.id);

        if (game?.image_url) {
          setImage(game.image_url);
        }
      } catch (error) {
        console.error("Failed to load game session:", error);
      }
    }

    loadGame();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
      {image ? (
        <img
          src={image}
          alt="Puzzle"
          className="mx-auto max-h-[550px] rounded-xl"
        />
      ) : (
        <div className="flex h-[500px] items-center justify-center">
          <p className="text-xl text-slate-400">
            Loading Image...
          </p>
        </div>
      )}
    </div>
  );
}