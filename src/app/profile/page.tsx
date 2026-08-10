import ProfileStats from "@/components/profile/ProfileStats";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            SOLVORA
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Track your puzzle performance
            and SOLVORA statistics.
          </p>
        </div>

        <ProfileStats />
      </div>
    </main>
  );
}