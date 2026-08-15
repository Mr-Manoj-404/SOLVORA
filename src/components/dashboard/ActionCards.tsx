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
    description:
      "Play the SOLVORA hand-tracking puzzle.",
    href: "/game",
    icon: Play,
    color: "bg-cyan-500",
  },
  {
    title: "Leaderboard",
    description:
      "View the top players and rankings.",
    href: "/leaderboard",
    icon: Trophy,
    color: "bg-yellow-500",
  },
  {
    title: "History",
    description:
      "See your previous game results.",
    href: "/history",
    icon: History,
    color: "bg-green-500",
  },
  {
    title: "Profile",
    description:
      "Manage your account information.",
    href: "/profile",
    icon: User,
    color: "bg-purple-500",
  },
];

export default function ActionCards() {
  return (
    <section className="mt-6 sm:mt-8">
      <h2 className="mb-4 text-xl font-bold text-white sm:mb-6 sm:text-2xl">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500
                hover:shadow-lg
                hover:shadow-cyan-500/20
                active:scale-[0.98]
                sm:p-6
              "
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl sm:mb-4 sm:h-14 sm:w-14 ${card.color}`}
              >
                <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>

              <h3 className="mb-1.5 text-lg font-semibold text-white sm:mb-2 sm:text-xl">
                {card.title}
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}