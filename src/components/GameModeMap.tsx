import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Coins,
  LineChart,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { ClubWarBattleLane } from "@/components/ClubWarBattleLane";
import { CompoundingVault } from "@/components/CompoundingVault";
import { DailyChallenge } from "@/components/DailyChallenge";
import { GamePanel } from "@/components/GamePanel";
import { InsuranceESGPanel } from "@/components/InsuranceESGPanel";
import { Leaderboard } from "@/components/Leaderboard";
import { QuestionBankPanel } from "@/components/QuestionBankPanel";
import { RegionPolicySwitch } from "@/components/RegionPolicySwitch";
import { SimulationLab } from "@/components/SimulationLab";
import { SkillTree } from "@/components/SkillTree";
import { StatsOverview } from "@/components/StatsOverview";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import { WarStrategyBoard } from "@/components/WarStrategyBoard";
import { cn } from "@/lib/utils";

interface MapNode {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  panel: ReactNode;
}

interface GameModeMapProps {
  activeEffect: string | null;
  effectKey: number;
}

const effectTargets: Record<string, { x: number; y: number }> = {
  scan: { x: 18, y: 26 },
  shield: { x: 72, y: 38 },
  simulate: { x: 70, y: 52 },
  battle: { x: 62, y: 70 },
  quiz: { x: 38, y: 22 },
};

export function GameModeMap({ activeEffect, effectKey }: GameModeMapProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = useMemo<MapNode[]>(
    () => [
      {
        id: "command",
        title: "Command Deck",
        description: "Stats, regional policy, and momentum indicators.",
        icon: BarChart3,
        color: "hsl(var(--primary))",
        x: 18,
        y: 26,
        panel: (
          <div className="space-y-6">
            <StatsOverview />
            <RegionPolicySwitch />
          </div>
        ),
      },
      {
        id: "daily",
        title: "Daily Challenge",
        description: "Timed questions with GT rewards and streaks.",
        icon: Sparkles,
        color: "hsl(var(--accent))",
        x: 38,
        y: 22,
        panel: <DailyChallenge />,
      },
      {
        id: "skill",
        title: "Skill Tree",
        description: "Unlock investment and insurance mastery paths.",
        icon: Star,
        color: "hsl(var(--neon-purple))",
        x: 55,
        y: 26,
        panel: <SkillTree />,
      },
      {
        id: "simulation",
        title: "Simulation Lab",
        description: "Run scenarios and apply ESG coverage layers.",
        icon: LineChart,
        color: "hsl(var(--neon-cyan))",
        x: 70,
        y: 52,
        panel: (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SimulationLab />
            </div>
            <InsuranceESGPanel />
          </div>
        ),
      },
      {
        id: "club-war",
        title: "Club War",
        description: "Launch strikes and coordinate club tactics.",
        icon: Swords,
        color: "hsl(var(--destructive))",
        x: 62,
        y: 70,
        panel: (
          <div className="space-y-6">
            <ClubWarBattleLane />
            <WarStrategyBoard />
          </div>
        ),
      },
      {
        id: "vault",
        title: "Vault Core",
        description: "Reinvest GT and review token mechanics.",
        icon: Coins,
        color: "hsl(var(--warning))",
        x: 34,
        y: 74,
        panel: (
          <div className="grid lg:grid-cols-2 gap-6">
            <CompoundingVault />
            <TokenomicsPanel />
          </div>
        ),
      },
      {
        id: "leaderboard",
        title: "Leaderboard",
        description: "Track ranks and reward tiers.",
        icon: Trophy,
        color: "hsl(var(--success))",
        x: 82,
        y: 30,
        panel: <Leaderboard />,
      },
      {
        id: "community",
        title: "Community Forge",
        description: "Shape questions and review the platform map.",
        icon: Users,
        color: "hsl(var(--primary))",
        x: 18,
        y: 62,
        panel: (
          <div className="grid lg:grid-cols-2 gap-6">
            <QuestionBankPanel />
            <ArchitectureFlow />
          </div>
        ),
      },
    ],
    [],
  );

  const effectTarget = activeEffect ? effectTargets[activeEffect] : null;

  return (
    <div className="game-map">
      <div className="iso-platform iso-platform--alpha" />
      <div className="iso-platform iso-platform--beta" />
      <div className="iso-platform iso-platform--gamma" />

      <svg className="game-map-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M18 26 L38 22 L55 26 L70 52" />
        <path d="M70 52 L62 70 L34 74 L18 62" />
        <path d="M55 26 L82 30" />
      </svg>

      {nodes.map((node) => (
        <GamePanel
          key={node.id}
          title={node.title}
          description={node.description}
          trigger={
            <button
              type="button"
              className={cn("map-node", activeNode === node.id && "map-node--active")}
              style={
                {
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  "--node-color": node.color,
                } as CSSProperties
              }
              onClick={() => setActiveNode(node.id)}
              aria-label={node.title}
            >
              <span className="map-node-icon">
                <node.icon className="w-4 h-4" />
              </span>
              <span className="map-node-label">{node.title}</span>
            </button>
          }
        >
          {node.panel}
        </GamePanel>
      ))}

      {effectTarget && (
        <div
          key={`${activeEffect}-${effectKey}`}
          className="map-effect"
          style={{
            left: `${effectTarget.x}%`,
            top: `${effectTarget.y}%`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="map-drone" aria-hidden="true" />
    </div>
  );
}
