"use client";

import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";

export default function GamePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-hidden bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="w-full max-w-xl text-center">

        {/* ICON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-400/10 ring-1 ring-cyan-400/20 sm:h-24 sm:w-24">
          <Gamepad2 className="h-10 w-10 text-cyan-400 sm:h-12 sm:w-12" />
        </div>

        {/* TITLE */}
        <h1 className="mt-6 text-4xl font-bold text-cyan-400 sm:text-5xl">
          Game Arena
        </h1>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400 sm:text-lg">
          Ready to start a new puzzle?
        </p>

        {/* START BUTTON */}
        <button
          type="button"
          onClick={() =>
            router.push("/game/setup")
          }
          className="
            mt-8
            min-h-12
            w-full
            max-w-sm
            rounded-xl
            bg-cyan-400
            px-6
            py-3
            text-base
            font-bold
            text-black
            transition
            hover:bg-cyan-300
            active:scale-[0.98]
            sm:w-auto
            sm:px-8
            sm:py-4
            sm:text-xl
          "
        >
          Start New Game
        </button>

      </div>
    </main>
  );
}