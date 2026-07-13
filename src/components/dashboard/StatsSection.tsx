import { Trophy, Gamepad2, Timer, Globe } from "lucide-react";

const stats = [
  {
    title: "Games Played",
    value: "0",
    icon: Gamepad2,
  },
  {
    title: "Best Score",
    value: "0",
    icon: Trophy,
  },
  {
    title: "Fastest Time",
    value: "--",
    icon: Timer,
  },
  {
    title: "Global Rank",
    value: "--",
    icon: Globe,
  },
];

export default function StatsSection() {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
        >
          <stat.icon className="mb-4 h-8 w-8 text-cyan-400" />

          <h3 className="text-slate-400">
            {stat.title}
          </h3>

          <p className="mt-2 text-3xl font-bold text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}