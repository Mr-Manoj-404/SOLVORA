import { Camera } from "lucide-react";

export default function StartGameCard() {
  return (
    <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-8">

      <div className="flex flex-col items-center text-center">

        <div className="rounded-full bg-cyan-400/20 p-5">
          <Camera className="h-12 w-12 text-cyan-400" />
        </div>

        <h2 className="mt-6 text-3xl font-bold">
          Start New Puzzle
        </h2>

        <p className="mt-3 max-w-xl text-slate-400">
          Capture a photo using your camera and let SOLVORA
          generate an AI-powered puzzle for you.
        </p>

        <button className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-cyan-300">
          Open Camera
        </button>

      </div>

    </section>
  );
}