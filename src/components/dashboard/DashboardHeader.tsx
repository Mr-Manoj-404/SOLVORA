import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 p-6">

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
          className="flex items-center gap-2 text-white hover:text-cyan-400"
        >
          <User size={22} />
          Profile
        </Link>

        <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600">
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}