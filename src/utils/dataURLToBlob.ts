export function dataURLToBlob(dataURL: string): Blob {
  if (!dataURL.startsWith("data:")) {
    throw new Error("Invalid Data URL.");
  }

  const [header, data] = dataURL.split(",");

  if (!header || !data) {
    throw new Error("Malformed Data URL.");
  }

  const mimeMatch = header.match(/data:(.*?);base64/);

  if (!mimeMatch) {
    throw new Error("Unsupported image format.");
  }

  const mime = mimeMatch[1];

  if (!mime) {
    throw new Error("Missing MIME type.");
  }

  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], {
    type: mime,
  });
}