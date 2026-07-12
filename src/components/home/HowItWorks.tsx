import {
  Camera,
  Puzzle,
  Hand,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Capture",
    description: "Take a photo using your camera.",
  },
  {
    icon: Puzzle,
    title: "Puzzle",
    description: "SOLVORA creates a shuffled puzzle.",
  },
  {
    icon: Hand,
    title: "Play",
    description: "Solve it using your hand gestures.",
  },
  {
    icon: Trophy,
    title: "Win",
    description: "Your score is saved to the leaderboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold">
        How It <span className="text-cyan-400">Works</span>
      </h2>

      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center"
          >
            <step.icon className="mx-auto mb-4 h-12 w-12 text-cyan-400" />

            <h3 className="mb-2 text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}