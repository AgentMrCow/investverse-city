import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LearningTracks } from "@/components/LearningTracks";
import { SkillTree } from "@/components/SkillTree";
import { DailyChallenge } from "@/components/DailyChallenge";
import { PracticeSchedulePanel } from "@/components/PracticeSchedulePanel";
import { ContractChallengePanel } from "@/components/ContractChallengePanel";
import { QuestionBankPanel } from "@/components/QuestionBankPanel";
import { PartnerCoursesPanel } from "@/components/PartnerCoursesPanel";
import { KnowledgeGapPanel } from "@/components/KnowledgeGapPanel";
import { RiskProfilePanel } from "@/components/RiskProfilePanel";
import { AIInsightPanel } from "@/components/AIInsightPanel";
import { PolicyDecoderPanel } from "@/components/PolicyDecoderPanel";
import { IntegrityMonitorPanel } from "@/components/IntegrityMonitorPanel";
import { AIQuestionGeneratorPanel } from "@/components/AIQuestionGeneratorPanel";
import { ModerationDeskPanel } from "@/components/ModerationDeskPanel";

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-8">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Learning Hub</h1>
          <p className="text-muted-foreground max-w-2xl">
            Personalized learning paths that blend investment strategy, insurance coverage, and
            risk management into a daily practice loop.
          </p>
        </section>

        <section>
          <LearningTracks />
        </section>

        <section>
          <KnowledgeGapPanel />
        </section>

        <section>
          <RiskProfilePanel />
        </section>

        <section>
          <AIInsightPanel />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <DailyChallenge />
          <PracticeSchedulePanel />
        </section>

        <section>
          <SkillTree />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <ContractChallengePanel />
          <PolicyDecoderPanel />
        </section>

        <section className="grid lg:grid-cols-3 gap-8">
          <QuestionBankPanel />
          <AIQuestionGeneratorPanel />
          <ModerationDeskPanel />
        </section>

        <section>
          <IntegrityMonitorPanel />
        </section>

        <section>
          <PartnerCoursesPanel />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;
