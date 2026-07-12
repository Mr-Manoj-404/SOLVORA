export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-2 text-center text-4xl font-bold text-cyan-400">
          SOLVORA
        </h1>

        <p className="mb-8 text-center text-slate-400 text-lg">
          Login to continue
        </p>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-base font-semibold text-white">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 text-lg text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-semibold text-white">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="h-12 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 text-lg text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-cyan-400 text-lg font-semibold text-black transition hover:bg-cyan-300"
          >
            Login
          </button>

        </form>

      </div>
    </main>
  );
}