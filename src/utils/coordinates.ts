"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  detectHands,
  initializeHandTracking,
} from "@/services/handTracking";

import {
  HandData,
  HandLandmark,
  HandSide,
} from "@/types/hand";

import {
  isPinching,
  getPinchStrength,
} from "@/utils/pinch";

interface UseHandTrackingResult {
  hands: HandData[];
  isTracking: boolean;
}

export function useHandTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>
): UseHandTrackingResult {
  const animationRef = useRef<number>(0);
  const isProcessingRef = useRef(false);

  const [hands, setHands] = useState<HandData[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const detect = useCallback(async () => {
    if (isProcessingRef.current) {
      animationRef.current = requestAnimationFrame(detect);
      return;
    }

    const video = videoRef.current;

    if (
      !video ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      animationRef.current = requestAnimationFrame(detect);
      return;
    }

    isProcessingRef.current = true;

    try {
      const result = await detectHands(
        video,
        performance.now()
      );

      if (
        result &&
        result.landmarks &&
        result.landmarks.length > 0
      ) {
        const detectedHands: HandData[] = [];

        result.landmarks.forEach((landmarks, index) => {
          const hand = landmarks as HandLandmark[];

          const thumbTip = hand[4];
          const indexTip = hand[8];

          const pinching = isPinching(
            thumbTip,
            indexTip
          );

          const pinchStrength =
            getPinchStrength(
              thumbTip,
              indexTip
            );

          let side: HandSide = "Right";

          if (
            result.handedness &&
            result.handedness[index]
          ) {
            side =
              result.handedness[index][0]
                .categoryName as HandSide;
          }

          detectedHands.push({
            landmarks: hand,

            cursor: {
              x: indexTip.x,
              y: indexTip.y,
            },

            isTracking: true,

            isPinching: pinching,

            pinchStrength,
                        side,
          });
        });

        setHands(detectedHands);
        setIsTracking(true);
      } else {
        setHands([]);
        setIsTracking(false);
      }
    } catch (error) {
      console.error("Hand tracking error:", error);
    } finally {
      isProcessingRef.current = false;
      animationRef.current =
        requestAnimationFrame(detect);
    }
  }, [videoRef]);

  useEffect(() => {
    let mounted = true;

    async function start() {
      try {
        await initializeHandTracking();

        if (mounted) {
          detect();
        }
      } catch (error) {
        console.error(
          "Unable to initialize hand tracking:",
          error
        );
      }
    }

    start();

    return () => {
      mounted = false;

      cancelAnimationFrame(
        animationRef.current
      );
    };
  }, [detect]);

  return {
    hands,
    isTracking,
  };
}