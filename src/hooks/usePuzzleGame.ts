import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  getLatestGameSession,
  completeGameSession,
} from "@/services/gameSession";

import { saveGameResult } from "@/services/gameResults";
import { splitImage } from "@/services/imageSplitter";

import {
  createPuzzlePieces,
  shufflePuzzle,
  swapPieces,
  isPuzzleSolved,
} from "@/services/puzzleEngine";

import { PuzzlePiece as Piece } from "@/types/puzzle";

const GRID_SIZES: Record<string, number> = {
  easy: 3,
  medium: 4,
  hard: 5,
};

export function usePuzzleGame() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [pieces, setPieces] = useState<Piece[]>([]);
  const [originalPieces, setOriginalPieces] = useState<Piece[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [gameSolved, setGameSolved] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [score, setScore] = useState(1000);

  const [userId, setUserId] = useState("");
  const [gameSessionId, setGameSessionId] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const resetGameState = useCallback(() => {
    setMoves(0);
    setSeconds(0);
    setScore(1000);
    setGameSolved(false);
    setShowDialog(false);
    setSelectedIndex(null);
  }, []);

  const calculateScore = useCallback(
    (time: number, moveCount: number) => {
      const base = 1000;
      const timePenalty = time * 2;
      const movePenalty = moveCount * 5;

      return Math.max(
        100,
        base - timePenalty - movePenalty
      );
    },
    []
  );

  const loadPuzzle = useCallback(async () => {
    let cancelled = false;

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) return;

      setUserId(user.id);

      const game = await getLatestGameSession(user.id);

      if (!game || cancelled) return;

      setGameSessionId(game.id);
      setDifficulty(game.difficulty);
      setImageUrl(game.image_url);

      const gridSize =
        GRID_SIZES[game.difficulty] ?? GRID_SIZES.easy;

      const imagePieces = await splitImage(
        game.image_url,
        gridSize
      );

      if (cancelled) return;

      const original =
        createPuzzlePieces(imagePieces);

      const shuffled =
        shufflePuzzle([...original]);

      setOriginalPieces(original);
      setPieces(shuffled);

      resetGameState();
    } catch (error) {
      console.error("Failed to load puzzle:", error);
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [resetGameState]);

  useEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  useEffect(() => {
    if (gameSolved || loading) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameSolved, loading]);

  const handlePieceClick = useCallback(
    async (index: number) => {
      if (loading || gameSolved) return;

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

      const liveScore = calculateScore(
        seconds,
        newMoves
      );

      setScore(liveScore);

      if (!isPuzzleSolved(updated)) return;

      setGameSolved(true);

      try {
        await saveGameResult({
          userId,
          gameSessionId,
          difficulty,
          score: liveScore,
          moves: newMoves,
          timeSeconds: seconds,
        });

        await completeGameSession(
          gameSessionId
        );
      } catch (error) {
        console.error(
          "Failed to save result:",
          error
        );
      }

      setTimeout(() => {
        setShowDialog(true);
      }, 300);
    },
    [
      loading,
      gameSolved,
      selectedIndex,
      pieces,
      moves,
      seconds,
      calculateScore,
      userId,
      gameSessionId,
      difficulty,
    ]
  );

  const handleRestart = useCallback(() => {
    const shuffled = shufflePuzzle([
      ...originalPieces,
    ]);

    setPieces(shuffled);

    resetGameState();
  }, [originalPieces, resetGameState]);

  const handleDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return {
    loading,
    pieces,
    imageUrl,
    moves,
    seconds,
    score,
    showDialog,
    selectedIndex,
    handlePieceClick,
    handleRestart,
    handleDashboard,
  };
}