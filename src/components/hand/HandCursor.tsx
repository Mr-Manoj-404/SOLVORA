"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface HandCursorProps {
  x: number;
  y: number;
  visible: boolean;
  pinching?: boolean;
}

function HandCursor({
  x,
  y,
  visible,
  pinching = false,
}: HandCursorProps) {
  if (!visible) return null;

  return (
    <motion.div
      animate={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        scale: pinching ? 1.3 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
      }}
      className="pointer-events-none absolute z-50"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`h-6 w-6 rounded-full border-2 shadow-[0_0_20px_rgba(34,211,238,0.8)] ${
          pinching
            ? "border-cyan-300 bg-cyan-400"
            : "border-white bg-cyan-500"
        }`}
      />
    </motion.div>
  );
}

export default memo(HandCursor);