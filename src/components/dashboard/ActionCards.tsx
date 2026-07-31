"use client";

import Link from "next/link";
import {
  Play,
  Trophy,
  History,
  User,
} from "lucide-react";

const cards = [
  {
    title: "Start Game",
    description: "Play the SOLVORA hand-tracking puzzle.",
    href: "/game",
    icon: Play,
    color: "bg-cyan-500",
  },
  {
    title: "Leaderboard",
    description: "View the top players and rankings.",
    href: "/leaderboard",
    icon: Trophy,
    color: "bg-yellow-500",
  },
  {
    title: "History",
    description: "See your previous game results.",
    href: "/history",
    icon: History,
    color: "bg-green-500",
  },
  {
    title: "Profile",
    description: "Manage your account information.",
    href: "/profile",
    icon: User,
    color: "bg-purple-500",
  },
];

export default function ActionCards() {
  return (
    <section className="mt-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">
                {card.title}
              </h3>

              <p className="text-sm text-slate-400">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}