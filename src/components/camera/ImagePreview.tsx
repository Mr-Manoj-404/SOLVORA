"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ImagePreviewProps {
  image: string;
}

function ImagePreview({
  image,
}: ImagePreviewProps) {
  const [loading, setLoading] =
    useState(true);

  if (!image) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900 text-slate-400 sm:aspect-video sm:rounded-2xl">
        <ImageIcon className="mb-3 h-10 w-10 sm:h-12 sm:w-12" />

        <p className="text-sm sm:text-base">
          No image captured yet
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg sm:rounded-2xl"
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-video">

        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent sm:h-10 sm:w-10" />
          </div>
        )}

        {/* IMAGE */}
        <Image
          src={image}
          alt="Captured image"
          fill
          priority
          unoptimized
          draggable={false}
          onLoad={() =>
            setLoading(false)
          }
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </motion.div>
  );
}

export default memo(ImagePreview);