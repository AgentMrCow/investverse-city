import { Shield, Sword, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  { id: "shield", label: "Insurance Shield", cost: 200, icon: Shield, desc: "Block damage to your buildings during wars for 1 round." },
  { id: "boost", label: "Yield Boost", cost: 120, icon: Sparkles, desc: "+8% GT yield on next simulation run." },
  { id: "strike", label: "Strike Power", cost: 90, icon: Sword, desc: "+15% battle lane damage for 3 turns." },
  { id: "hedge", label: "Put Hedge", cost: 140, icon: Zap, desc: "Protects against next price drop in stock sim." },
];

interface ShopPanelProps {
  onSelect?: (id: string) => void;
}

export function ShopPanel({ onSelect }: ShopPanelProps) {
  const isMobile = useIsMobile();
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Market</p>
          <h3 className="font-display text-lg font-semibold">Shop & Upgrades</h3>
        </div>
        <span className="text-xs text-muted-foreground">Spend GT</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/50 p-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent text-background grid place-items-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <span className="text-xs font-semibold text-accent">{item.cost} GT</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Button size={isMobile ? "sm" : "default"} variant="outline" onClick={() => onSelect?.(item.id)}>
                Buy
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
