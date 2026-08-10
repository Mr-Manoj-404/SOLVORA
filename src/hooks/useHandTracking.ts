"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

export interface HandPoint {
  x: number;
  y: number;
  z: number;
}

export interface HandData {
  landmarks: HandPoint[];

  indexTip: HandPoint;

  thumbTip: HandPoint;

  isPinching: boolean;

  handedness:
    | "Left"
    | "Right"
    | "Unknown";
}

interface UseHandTrackingOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;

  enabled?: boolean;
}

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const PINCH_DISTANCE = 0.08;

export function useHandTracking({
  videoRef,
  enabled = true,
}: UseHandTrackingOptions) {
  const landmarkerRef =
    useRef<HandLandmarker | null>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const lastTimestampRef =
    useRef(0);

  const [hands, setHands] =
    useState<HandData[]>([]);

  const [ready, setReady] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * ============================
   * DISTANCE
   * ============================
   */

  const getDistance = useCallback(
    (
      a: HandPoint,
      b: HandPoint
    ) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;

      return Math.sqrt(
        dx * dx +
          dy * dy +
          dz * dz
      );
    },
    []
  );

  /*
   * ============================
   * INITIALIZE MEDIAPIPE
   * ============================
   */

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    async function initialize() {
      try {
        console.log(
          "[SOLVORA] Initializing MediaPipe..."
        );

        setReady(false);
        setError(null);

        const vision =
          await FilesetResolver.forVisionTasks(
            WASM_URL
          );

        if (cancelled) {
          return;
        }

        console.log(
          "[SOLVORA] MediaPipe WASM loaded."
        );

        const landmarker =
          await HandLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  MODEL_URL,

                delegate: "CPU",
              },

              runningMode: "VIDEO",

              /*
               * IMPORTANT:
               * Detect TWO hands.
               */
              numHands: 2,

              minHandDetectionConfidence:
                0.5,

              minHandPresenceConfidence:
                0.5,

              minTrackingConfidence:
                0.5,
            }
          );

        if (cancelled) {
          landmarker.close();
          return;
        }

        landmarkerRef.current =
          landmarker;

        setReady(true);

        console.log(
          "[SOLVORA] Hand Landmarker ready."
        );

        console.log(
          "[SOLVORA] Two-hand tracking enabled."
        );
      } catch (err) {
        console.error(
          "[SOLVORA] MediaPipe initialization failed:",
          err
        );

        setReady(false);

        setError(
          "MediaPipe failed to initialize. Check the browser console."
        );
      }
    }

    initialize();

    return () => {
      cancelled = true;

      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }

      if (
        landmarkerRef.current
      ) {
        landmarkerRef.current.close();

        landmarkerRef.current =
          null;
      }
    };
  }, [enabled]);

  /*
   * ============================
   * DETECTION
   * ============================
   */

  const detect = useCallback(() => {
    if (!enabled) {
      return;
    }

    const video =
      videoRef.current;

    const landmarker =
      landmarkerRef.current;

    if (
      !video ||
      !landmarker ||
      !ready
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          detect
        );

      return;
    }

    if (
      video.readyState <
      HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          detect
        );

      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          detect
        );

      return;
    }

    const timestamp =
      performance.now();

    if (
      timestamp <=
      lastTimestampRef.current
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          detect
        );

      return;
    }

    lastTimestampRef.current =
      timestamp;

    try {
      const result:
        HandLandmarkerResult =
        landmarker.detectForVideo(
          video,
          timestamp
        );

      /*
       * No hands.
       */

      if (
        !result.landmarks ||
        result.landmarks.length === 0
      ) {
        setHands([]);

        animationFrameRef.current =
          requestAnimationFrame(
            detect
          );

        return;
      }

      /*
       * Process EVERY detected hand.
       */

      const detectedHands: HandData[] =
        result.landmarks.map(
          (rawLandmarks, handIndex) => {
            const landmarks: HandPoint[] =
              rawLandmarks.map(
                (point) => ({
                  x: point.x,
                  y: point.y,
                  z: point.z,
                })
              );

            const thumbTip =
              landmarks[4];

            const indexTip =
              landmarks[8];

            const pinchDistance =
              getDistance(
                thumbTip,
                indexTip
              );

            const isPinching =
              pinchDistance <
              PINCH_DISTANCE;

            /*
             * MediaPipe gives handedness
             * information for each detected hand.
             */

            let handedness:
              | "Left"
              | "Right"
              | "Unknown" =
              "Unknown";

            const classification =
              result.handednesses?.[
                handIndex
              ]?.[0];

            if (
              classification?.categoryName ===
              "Left"
            ) {
              handedness = "Left";
            } else if (
              classification?.categoryName ===
              "Right"
            ) {
              handedness = "Right";
            }

            return {
              landmarks,
              thumbTip,
              indexTip,
              isPinching,
              handedness,
            };
          }
        );

      setHands(
        detectedHands
      );
    } catch (err) {
      console.error(
        "[SOLVORA] Hand detection error:",
        err
      );
    }

    animationFrameRef.current =
      requestAnimationFrame(
        detect
      );
  }, [
    enabled,
    ready,
    videoRef,
    getDistance,
  ]);

  /*
   * ============================
   * START DETECTION
   * ============================
   */

  useEffect(() => {
    if (!enabled || !ready) {
      return;
    }

    console.log(
      "[SOLVORA] Starting two-hand detection..."
    );

    lastTimestampRef.current =
      0;

    animationFrameRef.current =
      requestAnimationFrame(
        detect
      );

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }
    };
  }, [
    enabled,
    ready,
    detect,
  ]);

  /*
   * Keep `hand` for compatibility
   * with existing components.
   *
   * New code should use `hands`.
   */

  const hand =
    hands[0] ?? null;

  return {
    hands,

    /*
     * Backward compatibility.
     */
    hand,

    ready,

    error,
  };
}