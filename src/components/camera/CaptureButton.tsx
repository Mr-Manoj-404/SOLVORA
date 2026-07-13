interface CaptureButtonProps {
  onCapture: () => void;
}

export default function CaptureButton({
  onCapture,
}: CaptureButtonProps) {
  return (
    <button
      onClick={onCapture}
      className="rounded-xl bg-cyan-400 px-8 py-3 text-lg font-bold text-black hover:bg-cyan-300"
    >
      📸 Capture Photo
    </button>
  );
}