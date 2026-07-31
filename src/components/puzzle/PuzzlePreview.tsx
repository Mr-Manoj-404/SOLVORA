"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

type Props = {
  imageUrl: string;
};

function PuzzlePreview({ imageUrl }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg"
    >
      <div className="flex items-center justify-center gap-2 border-b border-slate-700 bg-slate-900 px-4 py-3">
        <ImageIcon className="h-5 w-5 text-cyan-400" />

        <h3 className="text-lg font-semibold text-cyan-400">
          Original Image
        </h3>
      </div>

      <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          </div>
        )}

        <Image
          src={imageUrl}
          alt="Original Puzzle Image"
          fill
          priority
          unoptimized
          draggable={false}
          onLoad={() => setLoading(false)}
          className={`
            object-cover
            transition-transform
            duration-300
            hover:scale-105
            select-none
          `}
        />
      </div>
    </motion.div>
  );
}

export default memo(PuzzlePreview);