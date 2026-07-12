import {
  Camera,
  Hand,
  Trophy,
  Cloud,
  ShieldCheck,
  Puzzle,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Camera Capture",
    description: "Capture your own image instantly to create a unique puzzle.",
  },
  {
    icon: Hand,
    title: "Hand Tracking",
    description: "Move puzzle pieces naturally using finger gestures.",
  },
  {
    icon: Puzzle,
    title: "AI Puzzle",
    description: "Automatically generate interactive puzzle pieces.",
  },
  {
    icon: Trophy,
    title: "Global Leaderboard",
    description: "Compete with players from around the world.",
  },
  {
    icon: Cloud,
    title: "Cloud Save",
    description: "Your scores and progress are securely stored online.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "Protected accounts powered by Supabase Authentication.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Why Choose <span className="text-cyan-400">SOLVORA?</span>
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-700 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-cyan-400"
          >
            <feature.icon className="mb-5 h-12 w-12 text-cyan-400" />

            <h3 className="mb-3 text-2xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}