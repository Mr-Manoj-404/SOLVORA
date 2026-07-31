"use client";

import CameraFeed from "@/components/handtracking/CameraFeed";

export default function HandTestPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8">

      <h1 className="text-4xl font-bold text-cyan-400">
        SOLVORA Hand Tracking Test
      </h1>

      <CameraFeed />

    </main>
  );
}