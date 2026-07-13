"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import CameraView from "@/components/camera/CameraView";
import ImagePreview from "@/components/camera/ImagePreview";
import CaptureButton from "@/components/camera/CaptureButton";
import CameraControls from "@/components/camera/CameraControls";

export default function CameraPage() {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get("difficulty") || "easy";

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError("Camera permission denied.");
      }
    }

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function captureImage() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Mirror the captured image
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);
  }

  function retakePhoto() {
    setCapturedImage(null);
  }

  function continueGame() {
    alert("Next Step: Upload Image to Supabase Storage");
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-2 text-center text-4xl font-bold text-cyan-400">
          Camera
        </h1>

        <p className="mb-8 text-center text-lg text-slate-400">
          Difficulty:
          <span className="ml-2 font-bold capitalize text-cyan-400">
            {difficulty}
          </span>
        </p>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

          {error ? (
            <p className="text-center text-red-400">
              {error}
            </p>
          ) : (
            <>
              {capturedImage ? (
                <ImagePreview image={capturedImage} />
              ) : (
                <CameraView videoRef={videoRef} />
              )}

              <canvas
                ref={canvasRef}
                className="hidden"
              />

              <div className="mt-8 flex justify-center gap-4">

                {!capturedImage ? (
                  <CaptureButton onCapture={captureImage} />
                ) : (
                  <CameraControls
                    onRetake={retakePhoto}
                    onContinue={continueGame}
                  />
                )}

              </div>
            </>
          )}

        </div>

      </div>
    </main>
  );
}