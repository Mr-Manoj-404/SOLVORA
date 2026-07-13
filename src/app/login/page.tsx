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
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-2 text-center text-4xl font-bold text-cyan-400">
          SOLVORA
        </h1>

        <p className="mb-8 text-center text-slate-300 text-lg">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-base font-medium text-white">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-base text-white placeholder:text-slate-400 outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium text-white">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-base text-white placeholder:text-slate-400 outline-none focus:border-cyan-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 p-3 text-lg font-bold text-black transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </main>
  );
}