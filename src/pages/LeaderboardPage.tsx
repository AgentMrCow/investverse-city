import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaderboard } from "@/components/Leaderboard";
import { RewardsBreakdown } from "@/components/RewardsBreakdown";
import { CompetitionCalendar } from "@/components/CompetitionCalendar";
import { GamePanel, GameStationCard } from "@/components/GamePanel";
import { Calendar, Trophy } from "lucide-react";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-10">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground max-w-2xl">
            Rankings highlight consistent learners. Rewards are weighted toward knowledge and
            collaboration, not grinding.
          </p>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Rankings</p>
              <h2 className="font-display text-2xl font-semibold mt-2">Leaderboard Arena</h2>
              <p className="text-sm text-muted-foreground mt-3">
                Keep the rankings visible, then open reward and calendar stations for deeper
                context.
              </p>
            </div>
            <Leaderboard />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GamePanel
              title="Rewards Breakdown"
              description="How GT rewards are earned across ranks."
              trigger={
                <GameStationCard
                  title="Rewards Breakdown"
                  description="Reward tiers, bonuses, and streaks."
                  icon={Trophy}
                  gradient="from-accent to-warning"
                />
              }
            >
              <RewardsBreakdown />
            </GamePanel>

            <GamePanel
              title="Competition Calendar"
              description="Scheduled events and challenge windows."
              trigger={
                <GameStationCard
                  title="Competition Calendar"
                  description="Upcoming tournaments and deadlines."
                  icon={Calendar}
                  gradient="from-primary to-neon-cyan"
                />
              }
            >
              <CompetitionCalendar />
            </GamePanel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
