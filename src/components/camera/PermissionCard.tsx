"use client";

import { memo } from "react";
import { Camera, ShieldCheck } from "lucide-react";

interface PermissionCardProps {
  onAllow: () => void;
  loading?: boolean;
}

function PermissionCard({
  onAllow,
  loading = false,
}: PermissionCardProps) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
      <div className="flex justify-center">
        <div className="rounded-full bg-cyan-500/10 p-5">
          <Camera className="h-12 w-12 text-cyan-400" />
        </div>
      </div>

      <h2 className="mt-6 text-center text-3xl font-bold text-white">
        Camera Permission
      </h2>

      <p className="mt-4 text-center text-slate-300">
        SOLVORA uses your camera to capture a photo and convert it into an
        interactive hand-controlled puzzle.
      </p>

      <div className="mt-6 rounded-2xl bg-slate-800 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-6 w-6 text-green-400" />

          <div>
            <h3 className="font-semibold text-white">
              Privacy Notice
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Your camera is only accessed after you give permission. Images are
              handled according to your application's privacy policy.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onAllow}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Requesting Permission..." : "Allow Camera Access"}
      </button>
    </div>
  );
}

export default memo(PermissionCard);