interface CameraControlsProps {
  onRetake: () => void;
  onContinue: () => void;
}

export default function CameraControls({
  onRetake,
  onContinue,
}: CameraControlsProps) {
  return (
    <>
      <button
        onClick={onRetake}
        className="rounded-xl bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600"
      >
        🔄 Retake
      </button>

      <button
        onClick={onContinue}
        className="rounded-xl bg-green-500 px-8 py-3 font-bold text-white hover:bg-green-600"
      >
        Continue →
      </button>
    </>
  );
}