"use client";

import { useEffect, useRef } from "react";

import {
  startCamera,
  stopCamera,
} from "@/services/camera";

import { useHandTracking } from "@/hooks/useHandTracking";

import CameraView from "@/components/camera/CameraView";
import HandTracker from "@/components/hand/HandTracker";
import HandCursor from "@/components/hand/HandCursor";

export default function PuzzleCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    hands,
    isTracking,
  } = useHandTracking(videoRef);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function initialize() {
      if (!videoRef.current) return;

      try {
        stream = await startCamera(videoRef.current);
      } catch (error) {
        console.error(error);
      }
    }

    initialize();

    return () => {
      stopCamera(stream);
    };
  }, []);

  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
      <CameraView
        videoRef={videoRef}
        isActive={true}
      >
        <HandTracker
          hands={hands}
          width={1280}
          height={720}
        />

        {hands.length > 0 && (
          <HandCursor
            x={hands[0].cursor.x}
            y={hands[0].cursor.y}
            visible={isTracking}
            pinching={hands[0].isPinching}
          />
        )}
      </CameraView>

      <div className="border-t border-slate-700 p-3 text-center">
        <p className="text-sm text-cyan-400 font-semibold">
          Live Hand Tracking
        </p>
      </div>
    </div>
  );
}