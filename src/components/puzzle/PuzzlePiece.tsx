type Props = {
  number: number;
};

export default function PuzzlePiece({ number }: Props) {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-cyan-500 text-2xl font-bold text-black">

      {number}

    </div>
  );
}