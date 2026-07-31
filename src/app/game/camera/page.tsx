"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  startCamera,
  stopCamera,
  captureFrame,
} from "@/services/camera";

import { dataURLToBlob } from "@/utils/dataURLToBlob";

import { uploadGameImage } from "@/services/storage";
import { createGameSession } from "@/services/game";

import { useHandTracking } from "@/hooks/useHandTracking";

import CameraView from "@/components/camera/CameraView";
import ImagePreview from "@/components/camera/ImagePreview";
import CaptureButton from "@/components/camera/CaptureButton";
import CameraControls from "@/components/camera/CameraControls";

import HandTracker from "@/components/hand/HandTracker";
import HandCursor from "@/components/hand/HandCursor";

export default function CameraPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty = searchParams.get("difficulty") || "easy";

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

const {
  hands,
  isTracking,
} = useHandTracking(videoRef);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function initializeCamera() {
      try {
        if (!videoRef.current) return;

        stream = await startCamera(videoRef.current);

        setCameraReady(true);
      } catch (error) {
        console.error(error);
        setError("Camera permission denied.");
      }
    }

    initializeCamera();

    return () => {
      stopCamera(stream);
    };
  }, []);

  function captureImage() {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      const image = captureFrame(
        videoRef.current,
        canvasRef.current
      );

      setCapturedImage(image);
    } catch (error) {
      console.error(error);
      alert("Unable to capture image.");
    }
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

      const blob = dataURLToBlob(capturedImage);

      const imageUrl = await uploadGameImage(
        blob,
        user.id
      );

      console.log("Image URL:", imageUrl);

      const session = await createGameSession({
        userId: user.id,
        imageUrl,
        difficulty,
      });

      console.log("Game Session:", session);

      alert("Game Session Created Successfully!");

      router.push("/game/puzzle");
    } catch (err) {
      console.error("Game Session Error:", err);

      if (err instanceof Error) {
        console.error("Error Message:", err.message);
        alert(err.message);
      } else {
        alert("Something went wrong.");
      }
    } finally {
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
            <p className="text-center text-lg text-red-400">
              {error}
            </p>
          ) : (
            <>
              {capturedImage ? (
                <ImagePreview image={capturedImage} />
              ) : (
                <CameraView
                  videoRef={videoRef}
                  isActive={cameraReady}
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
              )}

              <canvas
                ref={canvasRef}
                className="hidden"
              />

              <div className="mt-8 flex justify-center gap-4">
                {!capturedImage ? (
                  <CaptureButton
                    onCapture={captureImage}
                    disabled={!cameraReady}
                  />
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