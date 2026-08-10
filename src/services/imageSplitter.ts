/**
 * Splits an image into equal puzzle pieces.
 *
 * The source image is first converted into a square
 * canvas so that it matches the 600 x 600 puzzle board.
 *
 * The entire square crop is then divided into
 * equal pieces without losing edge pixels.
 */

export async function splitImage(
  imageUrl: string,
  gridSize: number
): Promise<string[]> {
  if (!imageUrl) {
    throw new Error(
      "Image URL is required."
    );
  }

  if (gridSize < 2) {
    throw new Error(
      "Grid size must be at least 2."
    );
  }

  return new Promise(
    (resolve, reject) => {
      const image =
        new Image();

      image.crossOrigin =
        "anonymous";

      image.decoding =
        "async";

      image.onload = () => {
        try {
          /*
           * Make the puzzle source square.
           *
           * The puzzle board itself is 600 x 600,
           * so a square source prevents each
           * individual tile from being cropped
           * by the PuzzlePiece component.
           */

          const sourceSize =
            Math.min(
              image.width,
              image.height
            );

          /*
           * Center crop.
           */

          const sourceX =
            (image.width -
              sourceSize) /
            2;

          const sourceY =
            (image.height -
              sourceSize) /
            2;

          /*
           * Use a fixed internal resolution.
           *
           * This gives us clean and consistent
           * puzzle pieces for 3x3, 4x4 and 5x5.
           */

          const PUZZLE_SIZE = 1200;

          const puzzleCanvas =
            document.createElement(
              "canvas"
            );

          puzzleCanvas.width =
            PUZZLE_SIZE;

          puzzleCanvas.height =
            PUZZLE_SIZE;

          const puzzleContext =
            puzzleCanvas.getContext(
              "2d"
            );

          if (!puzzleContext) {
            reject(
              new Error(
                "Unable to create puzzle canvas context."
              )
            );

            return;
          }

          puzzleContext.imageSmoothingEnabled =
            true;

          puzzleContext.imageSmoothingQuality =
            "high";

          /*
           * Draw the complete square crop
           * into the square puzzle canvas.
           */

          puzzleContext.drawImage(
            image,

            sourceX,
            sourceY,
            sourceSize,
            sourceSize,

            0,
            0,
            PUZZLE_SIZE,
            PUZZLE_SIZE
          );

          /*
           * Now divide the square image.
           *
           * IMPORTANT:
           *
           * We calculate each boundary separately
           * instead of using Math.floor() for every
           * piece. This guarantees that the complete
           * 1200 x 1200 image is covered.
           */

          const pieces: string[] =
            [];

          for (
            let row = 0;
            row < gridSize;
            row++
          ) {
            const top =
              Math.round(
                (row *
                  PUZZLE_SIZE) /
                  gridSize
              );

            const bottom =
              Math.round(
                ((row + 1) *
                  PUZZLE_SIZE) /
                  gridSize
              );

            const pieceHeight =
              bottom - top;

            for (
              let col = 0;
              col < gridSize;
              col++
            ) {
              const left =
                Math.round(
                  (col *
                    PUZZLE_SIZE) /
                    gridSize
                );

              const right =
                Math.round(
                  ((col + 1) *
                    PUZZLE_SIZE) /
                    gridSize
                );

              const pieceWidth =
                right - left;

              const pieceCanvas =
                document.createElement(
                  "canvas"
                );

              pieceCanvas.width =
                pieceWidth;

              pieceCanvas.height =
                pieceHeight;

              const pieceContext =
                pieceCanvas.getContext(
                  "2d"
                );

              if (!pieceContext) {
                reject(
                  new Error(
                    "Unable to create puzzle piece canvas context."
                  )
                );

                return;
              }

              pieceContext.imageSmoothingEnabled =
                true;

              pieceContext.imageSmoothingQuality =
                "high";

              /*
               * Copy the exact section
               * from the prepared square.
               */

              pieceContext.drawImage(
                puzzleCanvas,

                left,
                top,
                pieceWidth,
                pieceHeight,

                0,
                0,
                pieceWidth,
                pieceHeight
              );

              pieces.push(
                pieceCanvas.toDataURL(
                  "image/png"
                )
              );

              pieceCanvas.width = 0;
              pieceCanvas.height = 0;
            }
          }

          /*
           * Cleanup.
           */

          puzzleCanvas.width = 0;
          puzzleCanvas.height = 0;

          resolve(pieces);
        } catch (error) {
          reject(error);
        }
      };

      image.onerror = () => {
        reject(
          new Error(
            "Failed to load image. Please check the image URL."
          )
        );
      };

      image.src = imageUrl;
    }
  );
}