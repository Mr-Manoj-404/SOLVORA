"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import {
  getLatestGameSession,
} from "@/services/gameSession";

import {
  splitImage,
} from "@/services/imageSplitter";

import {
  saveGameResult,
} from "@/services/gameResult";

import {
  createPuzzlePieces,
  shufflePuzzle,
  movePiece,
  startDragging,
  stopDragging,
  getNearestCell,
  swapPieces,
  isPuzzleSolved,
} from "@/services/puzzleEngineV2";

import { PuzzlePiece } from "@/types/puzzle";

const GRID_SIZES: Record<
  string,
  number
> = {
  easy: 3,
  medium: 4,
  hard: 5,
};

export function usePuzzleGameV2() {
  const [loading, setLoading] =
    useState(true);

  const [pieces, setPieces] =
    useState<PuzzlePiece[]>([]);

  const [gridSize, setGridSize] =
    useState(3);

  const [moves, setMoves] =
    useState(0);

  const [seconds, setSeconds] =
    useState(0);

  const [score, setScore] =
    useState(1000);

  const [gameSolved, setGameSolved] =
    useState(false);

  const [imageUrl, setImageUrl] =
    useState("");

  const [difficulty, setDifficulty] =
    useState<
      "easy" | "medium" | "hard"
    >("easy");

  const [gameSessionId, setGameSessionId] =
    useState<string | null>(null);

  /*
   * Prevent the same completed game
   * from being saved multiple times.
   */
  const resultSavedRef =
    useRef(false);

  /*
   * ============================
   * SCORE CALCULATION
   * ============================
   */

  const calculateScore =
    useCallback(
      (
        currentSeconds: number,
        currentMoves: number
      ) => {
        const baseScore = 1000;

        const timePenalty =
          currentSeconds * 2;

        const movePenalty =
          currentMoves * 5;

        return Math.max(
          100,
          baseScore -
            timePenalty -
            movePenalty
        );
      },
      []
    );

  /*
   * ============================
   * LOAD PUZZLE
   * ============================
   */

  const loadPuzzle =
    useCallback(async () => {
      try {
        setLoading(true);

        /*
         * A new puzzle must be allowed
         * to create a new database result.
         */
        resultSavedRef.current =
          false;

        const {
          data: {
            user,
          },
        } =
          await supabase.auth.getUser();

        if (!user) {
          console.error(
            "[SOLVORA] User not authenticated."
          );

          return;
        }

        const session =
          await getLatestGameSession(
            user.id
          );

        if (!session) {
          console.error(
            "[SOLVORA] No game session found."
          );

          return;
        }

        /*
         * Store the session ID.
         *
         * This connects the final result
         * to the captured-image game session.
         */
        setGameSessionId(
          session.id
        );

        setImageUrl(
          session.image_url
        );

        const sessionDifficulty =
          (session.difficulty ===
            "easy" ||
          session.difficulty ===
            "medium" ||
          session.difficulty ===
            "hard"
            ? session.difficulty
            : "easy");

        setDifficulty(
          sessionDifficulty
        );

        const currentGridSize =
          GRID_SIZES[
            sessionDifficulty
          ] ??
          GRID_SIZES.easy;

        setGridSize(
          currentGridSize
        );

        const images =
          await splitImage(
            session.image_url,
            currentGridSize
          );

        const created =
          createPuzzlePieces(
            images,
            currentGridSize
          );

        const shuffled =
          shufflePuzzle(
            created,
            currentGridSize
          );

        setPieces(
          shuffled
        );

        setMoves(0);

        setSeconds(0);

        setScore(1000);

        setGameSolved(
          false
        );
      } catch (error) {
        console.error(
          "[SOLVORA] Failed to load puzzle:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /*
   * ============================
   * INITIAL LOAD
   * ============================
   */

  useEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  /*
   * ============================
   * TIMER
   * ============================
   */

  useEffect(() => {
    if (
      loading ||
      gameSolved
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setSeconds(
          (previous) =>
            previous + 1
        );
      }, 1000);

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [
    loading,
    gameSolved,
  ]);

  /*
   * ============================
   * UPDATE SCORE
   * ============================
   */

  useEffect(() => {
    setScore(
      calculateScore(
        seconds,
        moves
      )
    );
  }, [
    seconds,
    moves,
    calculateScore,
  ]);

  /*
   * ============================
   * DETECT PUZZLE COMPLETION
   * ============================
   */

  useEffect(() => {
    if (
      pieces.length === 0 ||
      gameSolved
    ) {
      return;
    }

    if (
      isPuzzleSolved(
        pieces
      )
    ) {
      setGameSolved(
        true
      );
    }
  }, [
    pieces,
    gameSolved,
  ]);

  /*
   * ============================
   * SAVE COMPLETED GAME
   * ============================
   *
   * This runs once when the puzzle
   * becomes solved.
   */

  useEffect(() => {
    if (
      !gameSolved ||
      resultSavedRef.current
    ) {
      return;
    }

    if (!gameSessionId) {
      console.error(
        "[SOLVORA] Cannot save result: missing game session ID."
      );

      return;
    }

    let cancelled = false;

    async function saveResult() {
      try {
        /*
         * Immediately lock saving so
         * React re-renders cannot create
         * duplicate database records.
         */
        resultSavedRef.current =
          true;

        const {
          data: {
            user,
          },
        } =
          await supabase.auth.getUser();

        if (!user) {
          console.error(
            "[SOLVORA] Cannot save result: user not authenticated."
          );

          resultSavedRef.current =
            false;

          return;
        }

        /*
         * Calculate the final score directly
         * from the latest time and move values.
         */
        const finalScore =
          calculateScore(
            seconds,
            moves
          );

        if (cancelled) {
          return;
        }

        await saveGameResult({
          userId:
            user.id,

          gameSessionId:
            gameSessionId,

          difficulty:
            difficulty,

          score:
            finalScore,

          moves:
            moves,

          timeSeconds:
            seconds,

          completed:
            true,
        });

        /*
         * Keep the displayed score
         * synchronized with the saved score.
         */
        setScore(
          finalScore
        );

        console.log(
          "[SOLVORA] Completed game saved successfully."
        );
      } catch (error) {
        console.error(
          "[SOLVORA] Failed to save completed game:",
          error
        );

        /*
         * Allow another attempt if
         * the database request failed.
         */
        resultSavedRef.current =
          false;
      }
    }

    saveResult();

    return () => {
      cancelled = true;
    };
  }, [
    gameSolved,
    gameSessionId,
    difficulty,
    seconds,
    moves,
    calculateScore,
  ]);

  /*
   * ============================
   * BEGIN DRAGGING
   * ============================
   */

  const beginDrag =
    useCallback(
      (id: number) => {
        setPieces(
          (previous) => {
            const piece =
              previous.find(
                (item) =>
                  item.id === id
              );

            if (!piece) {
              return previous;
            }

            /*
             * Correctly placed pieces
             * are locked.
             */
            if (piece.placed) {
              return previous;
            }

            return startDragging(
              previous,
              id
            );
          }
        );
      },
      []
    );

  /*
   * ============================
   * MOVE DRAGGED PIECE
   * ============================
   */

  const dragPiece =
    useCallback(
      (
        id: number,
        x: number,
        y: number
      ) => {
        setPieces(
          (previous) =>
            movePiece(
              previous,
              id,
              x,
              y
            )
        );
      },
      []
    );

  /*
   * ============================
   * FINISH DRAGGING
   * ============================
   */

  const endDrag =
    useCallback(
      (id: number) => {
        setPieces(
          (previous) => {
            const dragged =
              previous.find(
                (piece) =>
                  piece.id === id
              );

            if (!dragged) {
              return previous;
            }

            /*
             * Locked pieces cannot
             * be moved.
             */
            if (dragged.placed) {
              return previous;
            }

            const stopped =
              stopDragging(
                previous,
                id
              );

            const targetIndex =
              getNearestCell(
                dragged.x,
                dragged.y,
                gridSize
              );

            return swapPieces(
              stopped,
              id,
              targetIndex,
              gridSize
            );
          }
        );

        /*
         * Count one completed
         * drag as one move.
         */
        setMoves(
          (previous) =>
            previous + 1
        );
      },
      [gridSize]
    );

  /*
   * ============================
   * RESTART PUZZLE
   * ============================
   */

  const reloadPuzzle =
    useCallback(() => {
      loadPuzzle();
    }, [loadPuzzle]);

  /*
   * ============================
   * RETURN
   * ============================
   */

  return {
    loading,

    imageUrl,

    gridSize,

    difficulty,

    gameSessionId,

    pieces,

    moves,

    seconds,

    score,

    gameSolved,

    beginDrag,

    dragPiece,

    endDrag,

    reloadPuzzle,
  };
}