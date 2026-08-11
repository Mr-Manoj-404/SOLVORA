import Link from "next/link";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* HERO */}
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            🧩 AI-Powered Hand Tracking Puzzle
          </div>

          <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            Welcome to{" "}
            <span className="text-cyan-400">
              SOLVORA
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Experience the next generation of AI-powered
            hand-tracking puzzle games. Capture your image,
            solve it using your fingers, compete on global
            leaderboards, and challenge your friends.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/game"
              className="rounded-2xl bg-cyan-400 px-8 py-4 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-300"
            >
              🎮 Play Now
            </Link>

            <a
              href="#how-it-works"
              className="rounded-2xl border border-cyan-400 px-8 py-4 text-lg font-semibold text-white transition hover:bg-cyan-400/10"
            >
              Learn More
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
              <div className="text-3xl">📷</div>
              <h3 className="mt-3 font-bold">
                Capture
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Capture an image using your camera.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
              <div className="text-3xl">✋</div>
              <h3 className="mt-3 font-bold">
                Control
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Move puzzle pieces using your hand.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
              <div className="text-3xl">🏆</div>
              <h3 className="mt-3 font-bold">
                Compete
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Complete puzzles and compete on the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <Features />
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} SOLVORA. All rights reserved.
      </footer>
    </main>
  );
}