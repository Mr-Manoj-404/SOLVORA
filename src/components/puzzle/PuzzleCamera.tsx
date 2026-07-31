"use client";

import { memo } from "react";

import CameraView from "@/components/camera/CameraView";
import HandTracker from "@/components/hand/HandTracker";
import HandCursor from "@/components/hand/HandCursor";

import { HandData } from "@/types/hand";

interface PuzzleCameraProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  hands: HandData[];
  isTracking: boolean;
  cameraReady: boolean;
}

function PuzzleCamera({
  videoRef,
  hands,
  isTracking,
  cameraReady,
}: PuzzleCameraProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
      <CameraView
        videoRef={videoRef}
        isActive={cameraReady}
      >
        <HandTracker
          hands={hands}
          width={1280}
          height={720}
        />

        {hands.length > 0 && hands[0].landmarks.length > 8 && (
          <HandCursor
            x={hands[0].landmarks[8].x}
            y={hands[0].landmarks[8].y}
            visible={isTracking}
            pinching={hands[0].isPinching}
          />
        )}
      </CameraView>

      <div className="border-t border-slate-700 p-3 text-center">
        <p className="text-sm font-semibold text-cyan-400">
          Live Hand Tracking
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {hands.length} Hand{hands.length !== 1 ? "s" : ""} Detected
        </p>
      </div>
    </div>
  );
}

export default memo(PuzzleCamera);