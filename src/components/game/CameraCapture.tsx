"use client";

import { RefObject } from "react";

interface CameraCaptureProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  onCapture: (image: string) => void;
}

export default function CameraCapture({
  videoRef,
  onCapture,
}: CameraCaptureProps) {
  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video) return;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    onCapture(image);
  };

  return (
    <button
      onClick={capturePhoto}
      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
    >
      📸 Capture Photo
    </button>
  );
}