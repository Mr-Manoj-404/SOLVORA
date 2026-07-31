"use client";

import { memo } from "react";

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
    <div
      className="pointer-events-none absolute z-[100]"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`h-6 w-6 rounded-full border-2 shadow-[0_0_20px_rgba(34,211,238,0.8)] ${
          pinching
            ? "border-cyan-300 bg-cyan-400 scale-125"
            : "border-white bg-cyan-500"
        }`}
      />
    </div>
  );
}

export default memo(HandCursor);