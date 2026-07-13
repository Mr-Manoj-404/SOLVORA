import DifficultySelector from "@/components/camera/DifficultySelector";

export default function GameSetupPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white flex items-center justify-center">
      <DifficultySelector />
    </main>
  );
}