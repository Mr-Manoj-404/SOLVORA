export default function PuzzleControls() {
  return (
    <div className="flex justify-center gap-4">

      <button className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black">
        Shuffle
      </button>

      <button className="rounded-xl bg-green-500 px-6 py-3 font-bold">
        Restart
      </button>

    </div>
  );
}