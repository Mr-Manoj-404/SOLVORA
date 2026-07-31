"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowRight } from "lucide-react";

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
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onRetake}
        disabled={disabled}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw size={18} />
        Retake
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
        disabled={disabled}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
        <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}

export default memo(CameraControls);