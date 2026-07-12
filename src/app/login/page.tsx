export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-2 text-center text-4xl font-bold text-cyan-400">
          SOLVORA
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Login to continue
        </p>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-400 p-3 font-bold text-black transition hover:bg-cyan-300"
          >
            Login
          </button>

        </form>

      </div>
    </main>
  );
}