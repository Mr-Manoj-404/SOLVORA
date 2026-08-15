"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  ArrowRight,
} from "lucide-react";

interface CameraControlsProps {
  onRetake: () => void;
  onContinue: () => void;
  disabled?: boolean;
}

function CameraControls({
  onRetake,
  onContinue,
  disabled = false,
}: CameraControlsProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-md sm:flex-row sm:justify-center sm:gap-4">
      
      {/* RETAKE */}
      <motion.button
        type="button"
        whileHover={{
          scale: disabled ? 1 : 1.03,
        }}
        whileTap={{
          scale: disabled ? 1 : 0.97,
        }}
        onClick={onRetake}
        disabled={disabled}
        className="
          flex
          min-h-12
          flex-1
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-red-500
          px-6
          py-3
          text-base
          font-semibold
          text-white
          shadow-lg
          transition-colors
          hover:bg-red-600
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:text-lg
        "
      >
        <RotateCcw className="h-5 w-5" />
        Retake
      </motion.button>

      {/* CONTINUE */}
      <motion.button
        type="button"
        whileHover={{
          scale: disabled ? 1 : 1.03,
        }}
        whileTap={{
          scale: disabled ? 1 : 0.97,
        }}
        onClick={onContinue}
        disabled={disabled}
        className="
          flex
          min-h-12
          flex-1
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-green-500
          px-6
          py-3
          text-base
          font-semibold
          text-white
          shadow-lg
          transition-colors
          hover:bg-green-600
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:text-lg
        "
      >
        Continue
        <ArrowRight className="h-5 w-5" />
      </motion.button>

    </div>
  );
}

export default memo(CameraControls);