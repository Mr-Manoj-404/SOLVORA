"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DashboardHeader() {
  async function handleLogout() {
    try {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "[SOLVORA] Logout failed:",
          error
        );
        return;
      }

      window.location.href = "/login";
    } catch (error) {
      console.error(
        "[SOLVORA] Logout failed:",
        error
      );
    }
  }

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-cyan-400">
          SOLVORA
        </h1>

        <p className="text-slate-400">
          AI Hand Tracking Puzzle Game
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-white transition hover:text-cyan-400"
        >
          <User size={22} />
          Profile
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}