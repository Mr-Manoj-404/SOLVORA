"use client";

import {
  HandData,
  HandPoint,
} from "@/hooks/useHandTracking";

interface HandSkeletonProps {
  hands: HandData[];

  width: number;

  height: number;
}

const CONNECTIONS: [
  number,
  number
][] = [
  // Thumb
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],

  // Index
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],

  // Middle
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],

  // Ring
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],

  // Pinky
  [13, 17],
  [17, 18],
  [18, 19],
  [19, 20],

  // Palm
  [0, 17],
];

function getPosition(
  point: HandPoint,
  width: number,
  height: number
) {
  /*
   * Camera is mirrored.
   *
   * Therefore mirror the
   * landmark X coordinate too.
   */

  return {
    x: (1 - point.x) * width,
    y: point.y * height,
  };
}

function drawHand(
  hand: HandData,
  width: number,
  height: number,
  handIndex: number
) {
  const points =
    hand.landmarks;

  if (points.length !== 21) {
    return null;
  }

  return (
    <g
      key={handIndex}
    >
      {/* ========================= */}
      {/* CONNECTIONS */}
      {/* ========================= */}

      {CONNECTIONS.map(
        (
          [startIndex, endIndex],
          connectionIndex
        ) => {
          const start =
            getPosition(
              points[startIndex],
              width,
              height
            );

          const end =
            getPosition(
              points[endIndex],
              width,
              height
            );

          return (
            <line
              key={
                connectionIndex
              }
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(34, 211, 238, 0.95)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        }
      )}

      {/* ========================= */}
      {/* LANDMARK POINTS */}
      {/* ========================= */}

      {points.map(
        (
          point,
          index
        ) => {
          const position =
            getPosition(
              point,
              width,
              height
            );

          const isThumbTip =
            index === 4;

          const isIndexTip =
            index === 8;

          const isPinching =
            hand.isPinching &&
            (isThumbTip ||
              isIndexTip);

          return (
            <circle
              key={index}
              cx={position.x}
              cy={position.y}
              r={
                isPinching
                  ? 9
                  : 6
              }
              fill={
                isPinching
                  ? "#facc15"
                  : "#22d3ee"
              }
              stroke="white"
              strokeWidth="2"
            />
          );
        }
      )}
    </g>
  );
}

export default function HandSkeleton({
  hands,
  width,
  height,
}: HandSkeletonProps) {
  if (!hands.length) {
    return null;
  }

  return (
    <svg
      className="
        pointer-events-none
        absolute
        inset-0
        z-[150]
        h-full
        w-full
      "
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {hands.map(
        (hand, index) =>
          drawHand(
            hand,
            width,
            height,
            index
          )
      )}
    </svg>
  );
}