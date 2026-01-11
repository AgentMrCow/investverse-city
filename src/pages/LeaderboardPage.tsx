import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaderboard } from "@/components/Leaderboard";
import { RewardsBreakdown } from "@/components/RewardsBreakdown";
import { CompetitionCalendar } from "@/components/CompetitionCalendar";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-8">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground max-w-2xl">
            Rankings highlight consistent learners. Rewards are weighted toward knowledge and
            collaboration, not grinding.
          </p>
        </section>

        <section>
          <Leaderboard />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <RewardsBreakdown />
          <CompetitionCalendar />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
