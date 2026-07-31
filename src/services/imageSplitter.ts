/**
 * Splits an image into equal puzzle pieces.
 */
export async function splitImage(
  imageUrl: string,
  gridSize: number
): Promise<string[]> {
  if (!imageUrl) {
    throw new Error("Image URL is required.");
  }

  if (gridSize < 2) {
    throw new Error("Grid size must be at least 2.");
  }

  return new Promise((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.decoding = "async";

    image.onload = () => {
      try {
        const pieces: string[] = [];

        const pieceWidth = Math.floor(
          image.width / gridSize
        );

        const pieceHeight = Math.floor(
          image.height / gridSize
        );

        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            const canvas =
              document.createElement("canvas");

            canvas.width = pieceWidth;
            canvas.height = pieceHeight;

            const ctx = canvas.getContext("2d");

            if (!ctx) {
              reject(
                new Error(
                  "Unable to create canvas context."
                )
              );
              return;
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(
              image,
              col * pieceWidth,
              row * pieceHeight,
              pieceWidth,
              pieceHeight,
              0,
              0,
              pieceWidth,
              pieceHeight
            );

            pieces.push(
              canvas.toDataURL(
                "image/png",
                1.0
              )
            );

            canvas.width = 0;
            canvas.height = 0;
          }
        }

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
  });
}