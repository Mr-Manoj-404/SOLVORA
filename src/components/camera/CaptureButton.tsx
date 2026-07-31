"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface CaptureButtonProps {
  onCapture: () => void;
  disabled?: boolean;
  loading?: boolean;
}

function CaptureButton({
  onCapture,
  disabled = false,
  loading = false,
}: CaptureButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{
        scale: disabled ? 1 : 1.05,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.95,
      }}
      onClick={onCapture}
      disabled={disabled || loading}
      className="
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-cyan-400
        px-8
        py-4
        text-lg
        font-bold
        text-black
        shadow-xl
        transition-all
        duration-200
        hover:bg-cyan-300
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
          Capturing...
        </>
      ) : (
        <>
          <Camera size={22} />
          Capture Photo
        </>
      )}
    </motion.button>
  );
}

export default memo(CaptureButton);