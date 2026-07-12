export default function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-8 py-24 text-center">

      <h1 className="mb-6 text-6xl font-extrabold leading-tight">
        Welcome to <span className="text-cyan-400">SOLVORA</span>
      </h1>

      <p className="max-w-3xl text-xl text-slate-300">
        Experience the next generation of AI-powered hand-tracking puzzle
        games. Capture your image, solve it using your fingers, compete on
        global leaderboards, and challenge your friends.
      </p>

      <div className="mt-10 flex gap-6">
        <button className="rounded-2xl bg-cyan-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-cyan-300">
          Play Now
        </button>

        <button className="rounded-2xl border border-cyan-400 px-8 py-4 text-lg transition hover:bg-cyan-400 hover:text-black">
          Learn More
        </button>
      </div>

    </section>
  );
}