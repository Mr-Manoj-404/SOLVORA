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
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-black shadow-lg sm:rounded-2xl">
      
      {/* CAMERA AREA */}
      <div className="relative aspect-[4/3] w-full sm:aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`h-full w-full object-cover -scale-x-100 transition-opacity duration-300 ${
            isActive
              ? "opacity-100"
              : "opacity-40"
          }`}
        />

        {/* CAMERA LOADING */}
        {!isActive && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/80 px-4 text-center">
            <Camera className="mb-3 h-10 w-10 text-cyan-400 sm:h-12 sm:w-12" />

            <p className="text-base font-semibold text-white sm:text-lg">
              Starting Camera...
            </p>

            <p className="mt-2 max-w-xs text-xs text-slate-400 sm:text-sm">
              Please allow camera permission.
            </p>
          </div>
        )}

        {/* HAND TRACKING OVERLAY */}
        <div className="pointer-events-none absolute inset-0 z-20 -scale-x-100">
          {children}
        </div>

        {/* CAMERA ACTIVE INDICATOR */}
        {isActive && (
          <div className="pointer-events-none absolute left-3 top-3 z-30 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-xs font-medium text-white">
              Camera Active
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CameraView);