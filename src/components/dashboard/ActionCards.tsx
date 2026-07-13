import Link from "next/link";
import { Camera, Trophy, User } from "lucide-react";

const actions = [
  {
    title: "Start Game",
    description: "Begin a new AI puzzle",
    href: "/game",
    icon: Camera,
  },
  {
    title: "Leaderboard",
    description: "View global rankings",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Profile",
    description: "Manage your account",
    href: "/profile",
    icon: User,
  },
];

export default function ActionCards() {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-3">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:border-cyan-400 hover:scale-105"
        >
          <action.icon className="mb-4 h-10 w-10 text-cyan-400" />

          <h3 className="text-2xl font-bold text-white">
            {action.title}
          </h3>

          <p className="mt-2 text-slate-400">
            {action.description}
          </p>
        </Link>
      ))}
    </section>
  );
}