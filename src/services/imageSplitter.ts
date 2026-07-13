export async function splitImage(
  imageUrl: string,
  gridSize: number
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      const pieces: string[] = [];

      const pieceWidth = image.width / gridSize;
      const pieceHeight = image.height / gridSize;

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const canvas = document.createElement("canvas");

          canvas.width = pieceWidth;
          canvas.height = pieceHeight;

          const ctx = canvas.getContext("2d");

          if (!ctx) continue;

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

          pieces.push(canvas.toDataURL("image/png"));
        }
      }

      resolve(pieces);
    };

    image.onerror = () => {
      reject(new Error("Failed to load image."));
    };

    image.src = imageUrl;
  });
}