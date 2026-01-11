import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MapNode {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
}

interface GameModeMapProps {
  nodes: MapNode[];
  activeNodeId: string | null;
  onSelect: (id: string) => void;
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

export function GameModeMap({ nodes, activeNodeId, onSelect, activeEffect, effectKey }: GameModeMapProps) {
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
        <button
          key={node.id}
          type="button"
          className={cn("map-node", activeNodeId === node.id && "map-node--active")}
          style={
            {
              left: `${node.x}%`,
              top: `${node.y}%`,
              "--node-color": node.color,
            } as CSSProperties
          }
          onClick={() => onSelect(node.id)}
          aria-label={node.title}
        >
          <span className="map-node-icon">
            <node.icon className="w-4 h-4" />
          </span>
          <span className="map-node-label">{node.title}</span>
        </button>
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
