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
    <header className="mb-6 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

      {/* BRAND */}
      <div>
        <h1 className="text-2xl font-bold text-cyan-400 sm:text-3xl">
          SOLVORA
        </h1>

        <p className="mt-1 text-sm text-slate-400 sm:text-base">
          AI Hand Tracking Puzzle Game
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-6">

        {/* PROFILE */}
        <Link
          href="/profile"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2.5 text-sm font-medium text-white transition hover:border-cyan-400/40 hover:text-cyan-400 sm:flex-none sm:border-0 sm:px-0 sm:py-0 sm:text-base"
        >
          <User size={20} />
          <span>Profile</span>
        </Link>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-[0.98] sm:flex-none sm:px-4 sm:py-2 sm:text-base"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
}