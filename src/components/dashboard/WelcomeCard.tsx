import { Sparkles } from "lucide-react";

export default function WelcomeCard() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:mt-8 sm:p-8">
      <div className="flex items-center gap-3 sm:gap-4">

        {/* ICON */}
        <div className="shrink-0 rounded-full bg-cyan-400/20 p-3 sm:p-4">
          <Sparkles className="h-6 w-6 text-cyan-400 sm:h-8 sm:w-8" />
        </div>

        {/* TEXT */}
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-3xl">
            Welcome Back 👋
          </h2>

          <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-lg">
            Ready to solve today&apos;s AI Puzzle?
          </p>
        </div>

      </div>
    </section>
  );
}