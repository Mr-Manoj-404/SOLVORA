"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Shuffle,
  Home,
} from "lucide-react";

type Props = {
  onShuffle: () => void;
  onRestart: () => void;
  onDashboard: () => void;
  disabled?: boolean;
};

function PuzzleControls({
  onShuffle,
  onRestart,
  onDashboard,
  disabled = false,
}: Props) {
  const buttons = [
    {
      label: "Shuffle",
      icon: Shuffle,
      onClick: onShuffle,
      className:
        "bg-cyan-500 hover:bg-cyan-400 text-black",
    },
    {
      label: "Restart",
      icon: RotateCcw,
      onClick: onRestart,
      className:
        "bg-green-500 hover:bg-green-400 text-black",
    },
    {
      label: "Dashboard",
      icon: Home,
      onClick: onDashboard,
      className:
        "bg-slate-700 hover:bg-slate-600 text-white",
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      {buttons.map((button, index) => {
        const Icon = button.icon;

        return (
          <motion.button
            key={button.label}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.3,
            }}
            disabled={disabled}
            onClick={button.onClick}
            className={`
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-6
              py-3
              font-semibold
              transition-all
              duration-200
              shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
              ${button.className}
            `}
          >
            <Icon size={18} />
            {button.label}
          </motion.button>
        );
      })}
    </div>
  );
}

export default memo(PuzzleControls);