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
import { GamePanel, GameStationCard } from "@/components/GamePanel";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-10">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Learning Hub</h1>
          <p className="text-muted-foreground max-w-2xl">
            Personalized learning paths that blend investment strategy, insurance coverage, and
            risk management into a daily practice loop.
          </p>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Learning Map</p>
              <h2 className="font-display text-2xl font-semibold mt-2">Skill Tree Command</h2>
              <p className="text-sm text-muted-foreground mt-3">
                Tap a station on the right to pop open challenges, courses, and AI tools without
                leaving the map.
              </p>
            </div>
            <SkillTree />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GamePanel
              title="Learning Tracks"
              description="Personalized paths that unlock as you level up."
              trigger={
                <GameStationCard
                  title="Learning Tracks"
                  description="Progress bars, next steps, and focus areas."
                  icon={BookOpen}
                  gradient="from-primary to-neon-cyan"
                />
              }
            >
              <LearningTracks />
            </GamePanel>

            <GamePanel
              title="Daily Challenge"
              description="Answer timed questions and keep your GT streak."
              trigger={
                <GameStationCard
                  title="Daily Challenge"
                  description="Daily quiz plus a practice schedule."
                  icon={Sparkles}
                  gradient="from-accent to-warning"
                  label="Daily"
                />
              }
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <DailyChallenge />
                <PracticeSchedulePanel />
              </div>
            </GamePanel>

            <GamePanel
              title="Knowledge Radar"
              description="Spot misconceptions and adjust your risk profile."
              trigger={
                <GameStationCard
                  title="Knowledge Radar"
                  description="Gap signals, risk profile, and AI insights."
                  icon={LineChart}
                  gradient="from-neon-cyan to-primary"
                />
              }
            >
              <div className="space-y-6">
                <KnowledgeGapPanel />
                <RiskProfilePanel />
                <AIInsightPanel />
              </div>
            </GamePanel>

            <GamePanel
              title="Policy Workshop"
              description="Decode coverage math and contract obligations."
              trigger={
                <GameStationCard
                  title="Policy Workshop"
                  description="Contracts, policy decoding, and practice."
                  icon={ShieldCheck}
                  gradient="from-success to-emerald-400"
                />
              }
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <ContractChallengePanel />
                <PolicyDecoderPanel />
              </div>
            </GamePanel>

            <GamePanel
              title="Question Forge"
              description="Draft, generate, and approve new quiz items."
              trigger={
                <GameStationCard
                  title="Question Forge"
                  description="Community question drafts and approvals."
                  icon={Bot}
                  gradient="from-neon-purple to-neon-pink"
                />
              }
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <QuestionBankPanel />
                <AIQuestionGeneratorPanel />
                <ModerationDeskPanel />
              </div>
            </GamePanel>

            <GamePanel
              title="Integrity Monitor"
              description="Keep learning data fair and abuse-free."
              trigger={
                <GameStationCard
                  title="Integrity Monitor"
                  description="Track integrity alerts and interventions."
                  icon={AlertTriangle}
                  gradient="from-destructive to-warning"
                />
              }
            >
              <IntegrityMonitorPanel />
            </GamePanel>

            <GamePanel
              title="Partner Courses"
              description="Curated courses from trusted education partners."
              trigger={
                <GameStationCard
                  title="Partner Courses"
                  description="Course catalog and partner institutions."
                  icon={Users}
                  gradient="from-accent to-warning"
                />
              }
            >
              <PartnerCoursesPanel />
            </GamePanel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;
