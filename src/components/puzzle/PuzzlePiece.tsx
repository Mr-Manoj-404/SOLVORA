import { PuzzlePiece as Piece } from "@/types/puzzle";

type Props = {
  piece: Piece;
  selected: boolean;
  onClick: () => void;
};

export default function PuzzlePiece({
  piece,
  selected,
  onClick,
}: Props) {
  return (
    <img
      src={piece.image}
      alt=""
      draggable={false}
      onClick={onClick}
      className={`cursor-pointer rounded-lg transition-all duration-200 ${
        selected
          ? "ring-4 ring-cyan-400 scale-95"
          : "hover:scale-95"
      }`}
    />
  );
}