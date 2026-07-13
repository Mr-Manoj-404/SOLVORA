"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { getLatestGameSession } from "@/services/gameSession";
import { splitImage } from "@/services/imageSplitter";
import {
  createPuzzlePieces,
  shufflePuzzle,
  swapPieces,
  isPuzzleSolved,
} from "@/services/puzzleEngine";

import PuzzlePiece from "./PuzzlePiece";
import PuzzleTimer from "./PuzzleTimer";
import { PuzzlePiece as Piece } from "@/types/puzzle";

export default function PuzzleBoard() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameSolved, setGameSolved] = useState(false);

  useEffect(() => {
    async function loadPuzzle() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const game = await getLatestGameSession(user.id);

        let gridSize = 3;

        if (game.difficulty === "medium") {
          gridSize = 4;
        }

        if (game.difficulty === "hard") {
          gridSize = 5;
        }

        const imagePieces = await splitImage(
          game.image_url,
          gridSize
        );

        const puzzlePieces =
          createPuzzlePieces(imagePieces);

        const shuffled =
          shufflePuzzle(puzzlePieces);

        setPieces(shuffled);
      } catch (error) {
        console.error(error);
      }
    }

    loadPuzzle();
  }, []);

  // Timer
  useEffect(() => {
    if (gameSolved) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameSolved]);

  function handlePieceClick(index: number) {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    const updated = swapPieces(
      pieces,
      selectedIndex,
      index
    );

    setPieces(updated);
    setSelectedIndex(null);

    const newMoves = moves + 1;
    setMoves(newMoves);

    if (isPuzzleSolved(updated)) {
      setGameSolved(true);

      setTimeout(() => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        alert(
          `🎉 Congratulations!

Puzzle Solved!

⏱ Time: ${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}

🔄 Moves: ${newMoves}`
        );
      }, 200);
    }
  }

  if (pieces.length === 0) {
    return (
      <div className="flex h-[550px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-900">
        <p className="text-xl text-slate-400">
          Creating Puzzle...
        </p>
      </div>
    );
  }

  const gridSize = Math.sqrt(pieces.length);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-cyan-400">
          Puzzle Board
        </h2>

        <div className="flex gap-4">

          <PuzzleTimer seconds={seconds} />

          <div className="rounded-xl bg-slate-800 px-4 py-2 text-lg">
            🔄 Moves: <span className="font-bold">{moves}</span>
          </div>

        </div>

      </div>

      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {pieces.map((piece, index) => (
          <PuzzlePiece
            key={piece.id}
            piece={piece}
            selected={selectedIndex === index}
            onClick={() => handlePieceClick(index)}
          />
        ))}
      </div>

    </div>
  );
}