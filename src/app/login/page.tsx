"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl sm:p-8">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-cyan-400 sm:text-4xl">
            SOLVORA
          </h1>

          <p className="mt-2 text-base text-slate-300 sm:text-lg">
            Login to continue
          </p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white sm:text-base"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-12 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 text-base text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white sm:text-base"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="h-12 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 text-base text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-cyan-400 px-4 text-base font-bold text-black transition hover:bg-cyan-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </main>
  );
}