"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Move,
  Trophy,
} from "lucide-react";

type Props = {
  seconds: number;
  moves: number;
  score: number;
};

function PuzzleStats({
  seconds,
  moves,
  score,
}: Props) {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, [seconds]);

  const stats = [
    {
      title: "Time",
      value: formattedTime,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      icon: Clock3,
    },
    {
      title: "Moves",
      value: moves,
      color: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      icon: Move,
    },
    {
      title: "Score",
      value: score,
      color: "text-green-400",
      border: "border-green-500/30",
      bg: "bg-green-500/10",
      icon: Trophy,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.08,
            }}
            className={`
              rounded-2xl
              border
              ${stat.border}
              ${stat.bg}
              bg-slate-800/80
              p-5
              shadow-lg
              backdrop-blur-sm
            `}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-300">
                {stat.title}
              </p>

              <Icon
                className={`h-5 w-5 ${stat.color}`}
              />
            </div>

            <h2
              className={`text-3xl font-bold tracking-wide ${stat.color}`}
            >
              {stat.value}
            </h2>
          </motion.div>
        );
      })}
    </div>
  );
}

export default memo(PuzzleStats);