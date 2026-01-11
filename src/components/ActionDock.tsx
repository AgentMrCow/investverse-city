import { Shield, Sparkles, Swords, Target, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

const actions = [
  {
    id: "scan",
    label: "Scan Risk",
    icon: Target,
    gradient: "from-primary to-neon-cyan",
  },
  {
    id: "shield",
    label: "Deploy Shield",
    icon: Shield,
    gradient: "from-success to-emerald-400",
  },
  {
    id: "simulate",
    label: "Run Sim",
    icon: TrendingUp,
    gradient: "from-accent to-warning",
  },
  {
    id: "battle",
    label: "Club Strike",
    icon: Swords,
    gradient: "from-destructive to-neon-pink",
  },
  {
    id: "quiz",
    label: "Daily Quiz",
    icon: Sparkles,
    gradient: "from-neon-purple to-neon-pink",
  },
];

const actionLabels = actions.reduce<Record<string, string>>((acc, action) => {
  acc[action.id] = action.label;
  return acc;
}, {});

interface ActionDockProps {
  onAction: (actionId: string) => void;
  lastAction: string | null;
  actionKey: number;
}

export function ActionDock({ onAction, lastAction, actionKey }: ActionDockProps) {
  return (
    <div className="action-dock">
      <div className="action-dock-actions">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              className="action-button"
              onClick={() => onAction(action.id)}
            >
              <span className={cn("action-button-icon", `bg-gradient-to-br ${action.gradient}`)}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold">{action.label}</span>
            </button>
          );
        })}
      </div>

      <div className="action-dock-log">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Action Feed</p>
        <p className="text-sm font-semibold">
          {lastAction && actionLabels[lastAction]
            ? actionLabels[lastAction]
            : "Select an action to fire FX."}
        </p>
        {lastAction && <div key={actionKey} className="action-dock-bar" />}
      </div>
    </div>
  );
}
