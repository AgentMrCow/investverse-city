import type { ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GameStationWindowProps {
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  compact?: boolean;
}

export function GameStationWindow({ title, description, children, onClose, compact }: GameStationWindowProps) {
  return (
    <div className={compact ? "game-station-window game-station-window--compact" : "game-station-window"}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Station</p>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="game-station-body">{children}</div>
    </div>
  );
}
