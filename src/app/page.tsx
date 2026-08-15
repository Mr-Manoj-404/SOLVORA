import Link from "next/link";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* HERO */}
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-5xl text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300 sm:px-4 sm:text-sm">
            🧩 AI-Powered Hand Tracking Puzzle
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to{" "}
            <span className="text-cyan-400">
              SOLVORA
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">
            Experience the next generation of AI-powered
            hand-tracking puzzle games. Capture your image,
            solve it using your fingers, compete on global
            leaderboards, and challenge your friends.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">

            <Link
              href="/game"
              className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-base font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 sm:w-auto sm:px-8 sm:text-lg sm:hover:scale-105"
            >
              🎮 Play Now
            </Link>

            <a
              href="#how-it-works"
              className="w-full rounded-2xl border border-cyan-400 px-6 py-4 text-base font-semibold text-white transition hover:bg-cyan-400/10 sm:w-auto sm:px-8 sm:text-lg"
            >
              Learn More
            </a>

          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3">

            {/* Capture */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur sm:p-6">
              <div className="text-3xl">📷</div>

              <h3 className="mt-3 font-bold">
                Capture
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Capture an image using your camera.
              </p>
            </div>

            {/* Control */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur sm:p-6">
              <div className="text-3xl">✋</div>

              <h3 className="mt-3 font-bold">
                Control
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Move puzzle pieces using your hand.
              </p>
            </div>

            {/* Compete */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur sm:p-6">
              <div className="text-3xl">🏆</div>

              <h3 className="mt-3 font-bold">
                Compete
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Complete puzzles and compete on the leaderboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 sm:px-6">
        <Features />
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-4 sm:px-6">
        <HowItWorks />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 px-4 py-8 text-center text-xs text-slate-500 sm:px-6 sm:text-sm">
        © {new Date().getFullYear()} SOLVORA. All rights reserved.
      </footer>

    </main>
  );
}