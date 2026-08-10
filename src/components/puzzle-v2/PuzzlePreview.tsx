"use client";

import Image from "next/image";

interface Props {
  imageUrl: string;
}

export default function PuzzlePreview({
  imageUrl,
}: Props) {
  return (
    <div className="w-48">
      <h3 className="mb-3 text-lg font-semibold text-cyan-400">
        Original Image
      </h3>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
        <Image
          src={imageUrl}
          alt="Preview"
          width={200}
          height={200}
          unoptimized
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}