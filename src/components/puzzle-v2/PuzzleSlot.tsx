"use client";

interface Props {
  index: number;
}

export default function PuzzleSlot({
  index,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      justify-center
      rounded-xl
      border-2
      border-dashed
      border-slate-700
      bg-slate-900/40
      text-slate-500
      font-semibold
      select-none
      "
    >
      {index + 1}
    </div>
  );
}