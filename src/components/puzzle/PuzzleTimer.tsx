"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

type Props = {
  seconds: number;
};

function PuzzleTimer({ seconds }: Props) {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, [seconds]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-slate-900 px-6 py-4 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-cyan-500/10 p-3">
          <Clock3 className="h-6 w-6 text-cyan-400" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-400">
            Elapsed Time
          </p>

          <h2 className="text-3xl font-bold tracking-widest text-cyan-400">
            {formattedTime}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(PuzzleTimer);