interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function CameraView({
  videoRef,
}: CameraViewProps) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full rounded-xl -scale-x-100"
    />
  );
}