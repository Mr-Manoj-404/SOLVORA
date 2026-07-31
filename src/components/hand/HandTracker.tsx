"use client";

import { memo } from "react";
import { HandData } from "@/types/hand";

interface HandTrackerProps {
  hands: HandData[];
  width: number;
  height: number;
}

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],

  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],

  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],

  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],

  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],

  [0, 17],
];

function HandTracker({
  hands,
  width,
  height,
}: HandTrackerProps) {
  if (hands.length === 0) {
    return null;
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-50"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {hands.map((hand, handIndex) => {
        const lineColor =
          hand.side === "Left"
            ? "#22d3ee"
            : "#22c55e";

        const pointColor =
          hand.side === "Left"
            ? "#06b6d4"
            : "#22c55e";

        return (
          <g key={handIndex}>
            {CONNECTIONS.map(([start, end], index) => {
              const p1 = hand.landmarks[start];
              const p2 = hand.landmarks[end];

              if (!p1 || !p2) return null;

              return (
                <line
                  key={`line-${handIndex}-${index}`}
                  x1={(1 - p1.x) * width}
                  y1={p1.y * height}
                  x2={(1 - p2.x) * width}
                  y2={p2.y * height}
                  stroke={lineColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              );
            })}

            {hand.landmarks.map((point, index) => (
              <circle
                key={`point-${handIndex}-${index}`}
                cx={(1 - point.x) * width}
                cy={point.y * height}
                r={index === 8 ? 8 : 5}
                fill={index === 8 ? pointColor : "#ffffff"}
                stroke={lineColor}
                strokeWidth={2}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default memo(HandTracker);