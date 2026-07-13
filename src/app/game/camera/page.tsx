"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { dataURLToBlob } from "@/services/camera";
import { uploadGameImage } from "@/services/storage";
import { createGameSession } from "@/services/game";

import CameraView from "@/components/camera/CameraView";
import ImagePreview from "@/components/camera/ImagePreview";
import CaptureButton from "@/components/camera/CaptureButton";
import CameraControls from "@/components/camera/CameraControls";

export default function CameraPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty = searchParams.get("difficulty") || "easy";

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

    // Mirror captured image
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);
  }

  function retakePhoto() {
    setCapturedImage(null);
  }

  async function continueGame() {
    if (!capturedImage) return;

    try {
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login again.");
        return;
      }

      // Convert image to Blob
      const blob = dataURLToBlob(capturedImage);

      // Upload to Storage
      const imageUrl = await uploadGameImage(blob, user.id);

      console.log("Image URL:", imageUrl);

      // Save game session
      const session = await createGameSession({
        userId: user.id,
        imageUrl,
        difficulty,
      });

      console.log("Game Session:", session);

      alert("Game Session Created Successfully!");

      // Redirect to Puzzle Page
      router.push("/game/puzzle");
    } catch (err) {
      console.error("Game Session Error:", err);
      alert("Check the browser console (F12) for the full error.");
      if (err instanceof Error) {
         console.error("Error Message:", err.message);
        }

  console.log(err);
}finally {
      setUploading(false);
    }
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
            <p className="text-center text-red-400 text-lg">
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
                ) : uploading ? (
                  <div className="text-center">
                    <p className="text-xl font-bold text-cyan-400">
                      Uploading...
                    </p>

                    <p className="mt-2 text-slate-400">
                      Please wait while your image is being processed.
                    </p>
                  </div>
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