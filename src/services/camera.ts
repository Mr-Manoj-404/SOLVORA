export async function startCamera(
  video: HTMLVideoElement,
  facingMode: "user" | "environment" = "user"
): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera is not supported in this browser.");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode,
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false,
  });

  video.srcObject = stream;

  await new Promise<void>((resolve) => {
    if (video.readyState >= 2) {
      resolve();
      return;
    }

    video.onloadedmetadata = () => resolve();
  });

  try {
    await video.play();
  } catch (error) {
    console.warn("Video play interrupted:", error);
  }

  return stream;
}

export function stopCamera(stream: MediaStream | null): void {
  if (!stream) return;

  stream.getTracks().forEach((track) => track.stop());
}

export function captureFrame(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  mirror = true
): string {
  const width = video.videoWidth;
  const height = video.videoHeight;

  if (!width || !height) {
    throw new Error("Camera is not ready.");
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to access canvas.");
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, 0, 0, width, height);

  return canvas.toDataURL("image/png");
}