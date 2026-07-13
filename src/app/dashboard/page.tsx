import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsSection from "@/components/dashboard/StatsSection";
import ActionCards from "@/components/dashboard/ActionCards";
import StartGameCard from "@/components/dashboard/StartGameCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">

      <div className="mx-auto max-w-7xl">
        <DashboardHeader />
        <WelcomeCard />
        <StatsSection />
        <ActionCards />
        <StartGameCard />
      </div>

    </main>
  );
}