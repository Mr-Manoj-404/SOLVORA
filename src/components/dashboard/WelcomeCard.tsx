import { Sparkles } from "lucide-react";

export default function WelcomeCard() {
  return (
    <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-8">

      <div className="flex items-center gap-4">

        <div className="rounded-full bg-cyan-400/20 p-4">
          <Sparkles className="h-8 w-8 text-cyan-400" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-lg text-slate-400">
           Ready to solve today&apos;s AI Puzzle?
          </p>
        </div>

      </div>

    </section>
  );
}