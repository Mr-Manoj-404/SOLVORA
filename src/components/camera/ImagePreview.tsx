interface ImagePreviewProps {
  image: string;
}

export default function ImagePreview({
  image,
}: ImagePreviewProps) {
  return (
    <img
      src={image}
      alt="Captured"
      className="w-full rounded-xl"
    />
  );
}