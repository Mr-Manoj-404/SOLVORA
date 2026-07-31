"use client";

import Webcam from "react-webcam";
import { useHandTracking } from "@/hooks/useHandTracking";

export default function CameraFeed() {
  const {
    webcamRef,
    isTracking,
    cursor,
  } = useHandTracking();

  return (
    <div className="relative w-fit">

      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        className="rounded-xl border-4 border-cyan-500"
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user",
        }}
      />

      {isTracking && (
        <div
          className="absolute h-5 w-5 rounded-full bg-red-500 border-2 border-white pointer-events-none transition-all duration-75"
          style={{
            left: `${cursor.x * 640 - 10}px`,
            top: `${cursor.y * 480 - 10}px`,
          }}
        />
      )}

      <div className="absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-white">

        {isTracking ? (
          <span className="text-green-400">
            ✋ Hand Detected
          </span>
        ) : (
          <span className="text-red-400">
            ❌ No Hand
          </span>
        )}

      </div>

    </div>
  );
}