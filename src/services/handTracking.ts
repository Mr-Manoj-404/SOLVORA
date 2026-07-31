import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

let handLandmarker: HandLandmarker | null = null;
let initializing = false;

const WASM_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

const MODEL_PATH =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export async function initializeHandTracking(): Promise<HandLandmarker> {
  if (handLandmarker) {
    return handLandmarker;
  }

  if (initializing) {
    while (!handLandmarker) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return handLandmarker;
  }

  initializing = true;

  try {
    const vision = await FilesetResolver.forVisionTasks(WASM_PATH);

    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_PATH,
      },

      runningMode: "VIDEO",

      numHands: 2,

      minHandDetectionConfidence: 0.7,

      minHandPresenceConfidence: 0.7,

      minTrackingConfidence: 0.7,
    });

    return handLandmarker;
  } catch (error) {
    console.error("Failed to initialize MediaPipe Hand Tracking:", error);
    throw error;
  } finally {
    initializing = false;
  }
}

export async function detectHands(
  video: HTMLVideoElement,
  timestamp: number
): Promise<HandLandmarkerResult | null> {
  if (!handLandmarker) {
    return null;
  }

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return null;
  }

  try {
    return handLandmarker.detectForVideo(video, timestamp);
  } catch (error) {
    console.error("Hand detection failed:", error);
    return null;
  }
}

export function disposeHandTracking(): void {
  if (handLandmarker) {
    handLandmarker.close();
    handLandmarker = null;
  }
}