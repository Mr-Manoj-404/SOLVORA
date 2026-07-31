"use client";

import { memo, ReactNode } from "react";
import { Camera } from "lucide-react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isActive: boolean;
  children?: ReactNode;
}

function CameraView({
  videoRef,
  isActive,
  children,
}: CameraViewProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg">
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`h-full w-full object-cover -scale-x-100 transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-40"
          }`}
        />

        {!isActive && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/70">
            <Camera className="mb-3 h-12 w-12 text-cyan-400" />

            <p className="text-lg font-semibold text-white">
              Starting Camera...
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Please allow camera permission.
            </p>
          </div>
        )}

        {/* Mirror overlays exactly like the video */}
        <div className="pointer-events-none absolute inset-0 z-20 -scale-x-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export default memo(CameraView);