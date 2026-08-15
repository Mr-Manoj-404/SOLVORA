"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PuzzlePiece from "./PuzzlePiece";
import HandSkeleton from "./HandSkeleton";

import { useHandTracking } from "@/hooks/useHandTracking";

import { PuzzlePiece as Piece } from "@/types/puzzle";

interface PuzzleCameraProps {
  pieces: Piece[];

  beginDrag: (id: number) => void;

  dragPiece: (
    id: number,
    x: number,
    y: number
  ) => void;

  endDrag: (id: number) => void;
}

const CAMERA_WIDTH = 900;
const CAMERA_HEIGHT = 700;

const BOARD_SIZE = 600;

interface HandDrag {
  pieceId: number;
  offsetX: number;
  offsetY: number;
}

export default function PuzzleCamera({
  pieces,
  beginDrag,
  dragPiece,
  endDrag,
}: PuzzleCameraProps) {
  /*
   * ==============================
   * CAMERA / RESPONSIVE SCENE
   * ==============================
   */

  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const cameraRef =
    useRef<HTMLDivElement | null>(null);

  const sceneRef =
    useRef<HTMLDivElement | null>(null);

  const boardRef =
    useRef<HTMLDivElement | null>(null);

  const [sceneScale, setSceneScale] =
    useState(1);

  /*
   * ==============================
   * RESPONSIVE SCALE
   * ==============================
   *
   * Internal game coordinates always
   * remain:
   *
   * 900 × 700 camera
   * 600 × 600 puzzle board
   *
   * On smaller screens the entire
   * scene is visually scaled down.
   */

  useEffect(() => {
    const container =
      cameraRef.current;

    if (!container) {
      return;
    }

    const updateScale = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      if (
        width <= 0 ||
        height <= 0
      ) {
        return;
      }

      const scaleX =
        width / CAMERA_WIDTH;

      const scaleY =
        height / CAMERA_HEIGHT;

      const scale =
        Math.min(
          scaleX,
          scaleY,
          1
        );

      setSceneScale(scale);
    };

    updateScale();

    const observer =
      new ResizeObserver(
        updateScale
      );

    observer.observe(container);

    window.addEventListener(
      "resize",
      updateScale
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "resize",
        updateScale
      );
    };
  }, []);

  /*
   * ==============================
   * DYNAMIC GRID SIZE
   * ==============================
   */

  const gridSize = useMemo(() => {
    if (pieces.length === 0) {
      return 3;
    }

    const calculated =
      Math.round(
        Math.sqrt(pieces.length)
      );

    if (
      calculated >= 3 &&
      calculated <= 5 &&
      calculated * calculated ===
        pieces.length
    ) {
      return calculated;
    }

    return 3;
  }, [pieces.length]);

  const pieceSize =
    BOARD_SIZE / gridSize;

  /*
   * ==============================
   * MOUSE DRAGGING
   * ==============================
   */

  const mouseDraggingId =
    useRef<number | null>(null);

  const pointerOffset =
    useRef({
      x: 0,
      y: 0,
    });

  /*
   * ==============================
   * HAND DRAGGING
   * ==============================
   */

  const handDrags =
    useRef<Map<string, HandDrag>>(
      new Map()
    );

  const previousPinchState =
    useRef<Map<string, boolean>>(
      new Map()
    );

  /*
   * ==============================
   * CAMERA START
   * ==============================
   */

  useEffect(() => {
    let stream: MediaStream | null =
      null;

    async function startCamera() {
      try {
        stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
              width: 1280,
              height: 720,
            },
            audio: false,
          });

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;

          try {
            await videoRef.current.play();
          } catch (playError) {
            console.warn(
              "Camera play request was interrupted:",
              playError
            );
          }
        }
      } catch (error) {
        console.error(
          "Camera access failed:",
          error
        );
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach(
        (track) => {
          track.stop();
        }
      );
    };
  }, []);

  /*
   * ==============================
   * HAND TRACKING
   * ==============================
   */

  const {
    hands,
    ready: handTrackingReady,
    error: handTrackingError,
  } = useHandTracking({
    videoRef,
    enabled: true,
  });

  /*
   * ==============================
   * CONVERT SCREEN TO BOARD
   * ==============================
   *
   * Used by mouse interaction.
   *
   * Because the scene is visually
   * scaled on mobile, coordinates
   * are converted back into the
   * original 900 × 700 coordinate
   * system.
   */

  const getBoardPointFromMouse =
    useCallback(
      (
        clientX: number,
        clientY: number
      ) => {
        if (!boardRef.current) {
          return null;
        }

        const board =
          boardRef.current.getBoundingClientRect();

        const x =
          (clientX -
            board.left) /
          sceneScale;

        const y =
          (clientY -
            board.top) /
          sceneScale;

        return {
          x,
          y,
        };
      },
      [sceneScale]
    );

  /*
   * ==============================
   * MOUSE DOWN
   * ==============================
   */

  const handleMouseDown =
    useCallback(
      (
        event: React.MouseEvent,
        piece: Piece
      ) => {
        if (!boardRef.current) {
          return;
        }

        if (piece.placed) {
          return;
        }

        event.preventDefault();

        const point =
          getBoardPointFromMouse(
            event.clientX,
            event.clientY
          );

        if (!point) {
          return;
        }

        pointerOffset.current = {
          x:
            point.x -
            piece.x,

          y:
            point.y -
            piece.y,
        };

        mouseDraggingId.current =
          piece.id;

        beginDrag(piece.id);
      },
      [
        beginDrag,
        getBoardPointFromMouse,
      ]
    );

  /*
   * ==============================
   * MOUSE MOVE
   * ==============================
   */

  const handleMouseMove =
    useCallback(
      (event: React.MouseEvent) => {
        const id =
          mouseDraggingId.current;

        if (id === null) {
          return;
        }

        const point =
          getBoardPointFromMouse(
            event.clientX,
            event.clientY
          );

        if (!point) {
          return;
        }

        const dragged =
          pieces.find(
            (piece) =>
              piece.id === id
          );

        if (!dragged) {
          return;
        }

        let x =
          point.x -
          pointerOffset.current.x;

        let y =
          point.y -
          pointerOffset.current.y;

        const maxX =
          BOARD_SIZE -
          dragged.width;

        const maxY =
          BOARD_SIZE -
          dragged.height;

        x = Math.max(
          0,
          Math.min(x, maxX)
        );

        y = Math.max(
          0,
          Math.min(y, maxY)
        );

        dragPiece(
          id,
          x,
          y
        );
      },
      [
        pieces,
        dragPiece,
        getBoardPointFromMouse,
      ]
    );

  /*
   * ==============================
   * MOUSE UP
   * ==============================
   */

  const handleMouseUp =
    useCallback(() => {
      const id =
        mouseDraggingId.current;

      if (id === null) {
        return;
      }

      endDrag(id);

      mouseDraggingId.current =
        null;

      pointerOffset.current = {
        x: 0,
        y: 0,
      };
    }, [endDrag]);

  /*
   * ==============================
   * WINDOW MOUSE UP
   * ==============================
   */

  useEffect(() => {
    const handleWindowMouseUp =
      () => {
        const id =
          mouseDraggingId.current;

        if (id === null) {
          return;
        }

        endDrag(id);

        mouseDraggingId.current =
          null;

        pointerOffset.current = {
          x: 0,
          y: 0,
        };
      };

    window.addEventListener(
      "mouseup",
      handleWindowMouseUp
    );

    return () => {
      window.removeEventListener(
        "mouseup",
        handleWindowMouseUp
      );
    };
  }, [endDrag]);

  /*
   * ==============================
   * GET HAND KEY
   * ==============================
   */

  const getHandKey =
    useCallback(
      (
        hand: (typeof hands)[number],
        index: number
      ) => {
        if (
          hand.handedness === "Left" ||
          hand.handedness === "Right"
        ) {
          return hand.handedness;
        }

        return `Hand-${index}`;
      },
      []
    );

  /*
   * ==============================
   * FIND PIECE UNDER FINGERTIP
   * ==============================
   */

  const findPieceAtPosition =
    useCallback(
      (
        boardX: number,
        boardY: number
      ): Piece | null => {
        const candidates = [
          ...pieces,
        ].reverse();

        const insidePiece =
          candidates.find(
            (piece) => {
              if (piece.placed) {
                return false;
              }

              return (
                boardX >= piece.x &&
                boardX <=
                  piece.x +
                    piece.width &&
                boardY >= piece.y &&
                boardY <=
                  piece.y +
                    piece.height
              );
            }
          );

        if (insidePiece) {
          return insidePiece;
        }

        const MAX_SELECTION_DISTANCE =
          Math.max(
            35,
            pieceSize * 0.45
          );

        let nearest:
          | Piece
          | null = null;

        let nearestDistance =
          Infinity;

        for (const piece of pieces) {
          if (piece.placed) {
            continue;
          }

          const centerX =
            piece.x +
            piece.width / 2;

          const centerY =
            piece.y +
            piece.height / 2;

          const dx =
            boardX - centerX;

          const dy =
            boardY - centerY;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance <
              nearestDistance &&
            distance <=
              MAX_SELECTION_DISTANCE
          ) {
            nearest =
              piece;

            nearestDistance =
              distance;
          }
        }

        return nearest;
      },
      [pieces, pieceSize]
    );

  /*
   * ==============================
   * TWO-HAND PUZZLE CONTROL
   * ==============================
   */

  useEffect(() => {
    if (
      !boardRef.current ||
      !cameraRef.current ||
      !sceneRef.current
    ) {
      return;
    }

    const board =
      boardRef.current.getBoundingClientRect();

    const camera =
      cameraRef.current.getBoundingClientRect();

    const scene =
      sceneRef.current.getBoundingClientRect();

    const activeHandKeys =
      new Set<string>();

    /*
     * Because the scene is scaled,
     * convert its screen position back
     * into the original 900 × 700
     * coordinate system.
     */

    const sceneLeft =
      (scene.left -
        camera.left) /
      sceneScale;

    const sceneTop =
      (scene.top -
        camera.top) /
      sceneScale;

    const boardLeft =
      (board.left -
        scene.left) /
      sceneScale;

    const boardTop =
      (board.top -
        scene.top) /
      sceneScale;

    hands.forEach(
      (hand, handIndex) => {
        const handKey =
          getHandKey(
            hand,
            handIndex
          );

        activeHandKeys.add(
          handKey
        );

        /*
         * Camera is mirrored,
         * therefore mirror X.
         */

        const screenX =
          1 -
          hand.indexTip.x;

        const screenY =
          hand.indexTip.y;

        /*
         * Original logical camera
         * coordinates.
         */

        const cameraX =
          screenX *
          CAMERA_WIDTH;

        const cameraY =
          screenY *
          CAMERA_HEIGHT;

        /*
         * Convert into logical
         * puzzle-board coordinates.
         */

        const boardX =
          cameraX -
          sceneLeft -
          boardLeft;

        const boardY =
          cameraY -
          sceneTop -
          boardTop;

        const insideBoard =
          boardX >= 0 &&
          boardX <=
            BOARD_SIZE &&
          boardY >= 0 &&
          boardY <=
            BOARD_SIZE;

        const wasPinching =
          previousPinchState.current.get(
            handKey
          ) ?? false;

        /*
         * ==============================
         * PINCH START
         * ==============================
         */

        if (
          hand.isPinching &&
          !wasPinching &&
          !handDrags.current.has(
            handKey
          ) &&
          insideBoard
        ) {
          const piece =
            findPieceAtPosition(
              boardX,
              boardY
            );

          if (
            piece &&
            !piece.placed
          ) {
            const offsetX =
              piece.width / 2;

            const offsetY =
              piece.height / 2;

            handDrags.current.set(
              handKey,
              {
                pieceId:
                  piece.id,
                offsetX,
                offsetY,
              }
            );

            beginDrag(
              piece.id
            );

            console.log(
              `[SOLVORA] ${handKey} selected piece ${piece.id}`
            );
          }
        }

        /*
         * ==============================
         * PINCH HOLD / MOVE
         * ==============================
         */

        if (
          hand.isPinching
        ) {
          const activeDrag =
            handDrags.current.get(
              handKey
            );

          if (activeDrag) {
            const draggedPiece =
              pieces.find(
                (piece) =>
                  piece.id ===
                  activeDrag.pieceId
              );

            if (
              draggedPiece
            ) {
              let newX =
                boardX -
                activeDrag.offsetX;

              let newY =
                boardY -
                activeDrag.offsetY;

              const maxX =
                BOARD_SIZE -
                draggedPiece.width;

              const maxY =
                BOARD_SIZE -
                draggedPiece.height;

              newX = Math.max(
                0,
                Math.min(
                  newX,
                  maxX
                )
              );

              newY = Math.max(
                0,
                Math.min(
                  newY,
                  maxY
                )
              );

              dragPiece(
                draggedPiece.id,
                newX,
                newY
              );
            }
          }
        }

        /*
         * ==============================
         * PINCH RELEASE
         * ==============================
         */

        if (
          !hand.isPinching &&
          wasPinching
        ) {
          const activeDrag =
            handDrags.current.get(
              handKey
            );

          if (activeDrag) {
            endDrag(
              activeDrag.pieceId
            );

            handDrags.current.delete(
              handKey
            );

            console.log(
              `[SOLVORA] ${handKey} released piece ${activeDrag.pieceId}`
            );
          }
        }

        previousPinchState.current.set(
          handKey,
          hand.isPinching
        );
      }
    );

    /*
     * ==============================
     * HAND DISAPPEARED
     * ==============================
     */

    for (const [
      handKey,
      activeDrag,
    ] of handDrags.current) {
      if (
        !activeHandKeys.has(
          handKey
        )
      ) {
        endDrag(
          activeDrag.pieceId
        );

        handDrags.current.delete(
          handKey
        );

        previousPinchState.current.delete(
          handKey
        );
      }
    }
  }, [
    hands,
    pieces,
    beginDrag,
    dragPiece,
    endDrag,
    findPieceAtPosition,
    getHandKey,
    sceneScale,
  ]);

  /*
   * ==============================
   * CLEAN UP HAND DRAGS
   * ==============================
   */

  useEffect(() => {
    return () => {
      for (const [
        ,
        activeDrag,
      ] of handDrags.current) {
        endDrag(
          activeDrag.pieceId
        );
      }

      handDrags.current.clear();

      previousPinchState.current.clear();
    };
  }, [endDrag]);

  /*
   * ==============================
   * UI
   * ==============================
   */

  return (
    <div
      ref={cameraRef}
      className="
      relative
      mx-auto
      w-full
      max-w-[900px]
      overflow-hidden
      rounded-2xl
      border
      border-slate-700
      shadow-2xl
      touch-none
      select-none
      overscroll-contain
      "
      style={{
        aspectRatio: "900 / 700",
      }}
      onMouseMove={
        handleMouseMove
      }
      onMouseUp={
        handleMouseUp
      }
    >
      {/* ================================ */}
      {/* RESPONSIVE GAME SCENE */}
      {/* ================================ */}

      <div
        ref={sceneRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: CAMERA_WIDTH,
          height: CAMERA_HEIGHT,
          transform: `translate(-50%, -50%) scale(${sceneScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* ================================ */}
        {/* CAMERA */}
        {/* ================================ */}

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            scale-x-[-1]
          "
        />

        {/* ================================ */}
        {/* HAND SKELETON */}
        {/* ================================ */}

        <HandSkeleton
          hands={hands}
          width={CAMERA_WIDTH}
          height={CAMERA_HEIGHT}
        />

        {/* ================================ */}
        {/* DARK OVERLAY */}
        {/* ================================ */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[120]
            bg-black/25
          "
        />

        {/* ================================ */}
        {/* STATUS */}
        {/* ================================ */}

        <div
          className="
            pointer-events-none
            absolute
            right-4
            top-4
            z-[180]
            rounded-xl
            border
            border-white/20
            bg-black/60
            px-4
            py-2
            text-sm
            text-white
            backdrop-blur-md
          "
        >
          <div className="flex items-center gap-2">
            <span
              className={`
                h-2.5
                w-2.5
                rounded-full
                ${
                  handTrackingReady
                    ? "bg-green-400"
                    : "bg-yellow-400"
                }
              `}
            />

            <span>
              {!handTrackingReady
                ? "Loading hand tracking..."
                : hands.length === 0
                ? "Show your hands"
                : hands.length === 1
                ? "1 hand detected"
                : "2 hands detected"}
            </span>
          </div>

          {hands.length > 0 && (
            <div className="mt-1 text-xs text-cyan-300">
              {hands.filter(
                (hand) =>
                  hand.isPinching
              ).length > 0
                ? "Pinch detected"
                : "Ready"}
            </div>
          )}

          {handTrackingError && (
            <p className="mt-1 text-xs text-red-400">
              {handTrackingError}
            </p>
          )}
        </div>

        {/* ================================ */}
        {/* PUZZLE BOARD */}
        {/* ================================ */}

        <div
          ref={boardRef}
          className="
            absolute
            left-1/2
            top-1/2
            z-[130]
            -translate-x-1/2
            -translate-y-1/2
          "
          style={{
            width: BOARD_SIZE,
            height: BOARD_SIZE,
          }}
        >
          {/* ================================ */}
          {/* DYNAMIC GRID */}
          {/* ================================ */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              grid
              overflow-hidden
              rounded-2xl
              border-2
              border-white/40
            "
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({
              length:
                gridSize *
                gridSize,
            }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-white/20
                    bg-white/[0.03]
                  "
                />
              )
            )}
          </div>

          {/* ================================ */}
          {/* PUZZLE PIECES */}
          {/* ================================ */}

          <div className="absolute inset-0 z-10">
            {pieces.map(
              (piece) => (
                <PuzzlePiece
                  key={piece.id}
                  piece={piece}
                  mode="board"
                  onMouseDown={
                    handleMouseDown
                  }
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}