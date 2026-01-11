import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClubWarPreview } from "@/components/ClubWarPreview";
import { WarStrategyBoard } from "@/components/WarStrategyBoard";
import { GovernancePanel } from "@/components/GovernancePanel";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";

const ClubWar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-8">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Club War Arena</h1>
          <p className="text-muted-foreground max-w-2xl">
            Collaborative battles that reward financial knowledge. Earn GT through quizzes, then
            deploy strategy during the war window.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <ClubWarPreview />
          <WarStrategyBoard />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <GovernancePanel />
          <TokenomicsPanel />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClubWar;
