"use client";

import { useEffect, useRef, useState } from "react";

import PuzzleHeader from "@/components/puzzle/PuzzleHeader";
import PuzzleBoard from "@/components/puzzle/PuzzleBoard";
import PuzzleControls from "@/components/puzzle/PuzzleControls";
import PuzzleCamera from "@/components/puzzle/PuzzleCamera";

import { startCamera, stopCamera } from "@/services/camera";
import { useHandTracking } from "@/hooks/useHandTracking";

export default function PuzzlePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [cameraReady, setCameraReady] = useState(false);

  const { hands, isTracking } = useHandTracking(videoRef);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function initializeCamera() {
      if (!videoRef.current) return;

      try {
        stream = await startCamera(videoRef.current);
        setCameraReady(true);
      } catch (error) {
        console.error(error);
      }
    }

    initializeCamera();

    return () => {
      stopCamera(stream);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <PuzzleHeader />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

          <PuzzleBoard
            hands={hands}
            isTracking={isTracking}
          />

          <PuzzleCamera
            videoRef={videoRef}
            hands={hands}
            isTracking={isTracking}
            cameraReady={cameraReady}
          />

        </div>

        <div className="mt-8">
          <PuzzleControls />
        </div>

      </div>
    </main>
  );
}