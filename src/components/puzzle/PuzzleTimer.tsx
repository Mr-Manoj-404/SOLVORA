type Props = {
  seconds: number;
};

export default function PuzzleTimer({ seconds }: Props) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="rounded-xl bg-slate-800 px-4 py-2 text-lg">
      ⏱️ Time:{" "}
      <span className="font-bold">
        {minutes.toString().padStart(2, "0")}:
        {remainingSeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}