"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

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

function CameraPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const difficulty =
    searchParams.get("difficulty") || "easy";

  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const [error, setError] = useState("");
  const [capturedImage, setCapturedImage] =
    useState<string | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [cameraReady, setCameraReady] =
    useState(false);

  const {
    hands,
    ready: handTrackingReady,
    error: handTrackingError,
  } = useHandTracking({
    videoRef,
  });

  /*
   * Convert the HandData returned by
   * useHandTracking into the HandData
   * expected by HandTracker.
   */
  const trackerHands = hands
    .filter(
      (hand) =>
        hand.handedness === "Left" ||
        hand.handedness === "Right"
    )
    .map((hand) => {
      const pinchDistance = Math.sqrt(
        Math.pow(
          hand.indexTip.x -
            hand.thumbTip.x,
          2
        ) +
          Math.pow(
            hand.indexTip.y -
              hand.thumbTip.y,
            2
          )
      );

      const pinchStrength = Math.max(
        0,
        Math.min(
          1,
          1 - pinchDistance / 0.08
        )
      );

      const side: "Left" | "Right" =
        hand.handedness === "Left"
          ? "Left"
          : "Right";

      return {
        side,
        landmarks: hand.landmarks,
        isTracking: true,
        isPinching: hand.isPinching,
        cursor: {
          x: hand.indexTip.x,
          y: hand.indexTip.y,
        },
        pinchStrength,
      };
    });

  /*
   * Start camera.
   */
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function initializeCamera() {
      try {
        if (!videoRef.current) {
          return;
        }

        stream = await startCamera(
          videoRef.current
        );

        setCameraReady(true);
      } catch (error) {
        console.error(error);

        setError(
          "Camera permission denied."
        );
      }
    }

    initializeCamera();

    return () => {
      stopCamera(stream);
    };
  }, []);

  /*
   * Hand tracking errors.
   */
  useEffect(() => {
    if (handTrackingError) {
      console.error(
        "[SOLVORA] Hand tracking error:",
        handTrackingError
      );
    }
  }, [handTrackingError]);

  /*
   * Capture camera image.
   */
  function captureImage() {
    if (
      !videoRef.current ||
      !canvasRef.current
    ) {
      return;
    }

    try {
      const image = captureFrame(
        videoRef.current,
        canvasRef.current
      );

      setCapturedImage(image);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to capture image."
      );
    }
  }

  /*
   * Retake photo.
   */
  function retakePhoto() {
    setCapturedImage(null);
  }

  /*
   * Upload image and create game session.
   */
  async function continueGame() {
    if (!capturedImage) {
      return;
    }

    try {
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert(
          "Please login again."
        );
        return;
      }

      const blob =
        dataURLToBlob(
          capturedImage
        );

      const imageUrl =
        await uploadGameImage(
          blob,
          user.id
        );

      console.log(
        "Image URL:",
        imageUrl
      );

      const session =
        await createGameSession({
          userId: user.id,
          imageUrl,
          difficulty,
        });

      console.log(
        "Game Session:",
        session
      );

      alert(
        "Game Session Created Successfully!"
      );

      router.push(
        "/game/puzzle-v2"
      );
    } catch (err) {
      console.error(
        "Game Session Error:",
        err
      );

      if (err instanceof Error) {
        console.error(
          "Error Message:",
          err.message
        );

        alert(err.message);
      } else {
        alert(
          "Something went wrong."
        );
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-3 text-center text-4xl font-bold text-cyan-400">
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
                <ImagePreview
                  image={capturedImage}
                />
              ) : (
                <CameraView
                  videoRef={videoRef}
                  isActive={cameraReady}
                >
                  <HandTracker
                    hands={trackerHands}
                    width={1280}
                    height={720}
                  />

                  {hands.length > 0 && (
                    <HandCursor
                      x={
                        hands[0].indexTip.x
                      }
                      y={
                        hands[0].indexTip.y
                      }
                      visible={
                        handTrackingReady
                      }
                      pinching={
                        hands[0].isPinching
                      }
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
                    onCapture={
                      captureImage
                    }
                    disabled={
                      !cameraReady
                    }
                  />
                ) : uploading ? (
                  <div className="text-center">
                    <p className="text-xl font-bold text-cyan-400">
                      Uploading...
                    </p>

                    <p className="mt-2 text-slate-400">
                      Please wait while
                      your image is being
                      processed.
                    </p>
                  </div>
                ) : (
                  <CameraControls
                    onRetake={
                      retakePhoto
                    }
                    onContinue={
                      continueGame
                    }
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

export default function CameraPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <div className="text-center">
            <p className="text-xl font-bold text-cyan-400">
              Loading camera...
            </p>

            <p className="mt-2 text-slate-400">
              Preparing SOLVORA camera...
            </p>
          </div>
        </main>
      }
    >
      <CameraPageContent />
    </Suspense>
  );
}