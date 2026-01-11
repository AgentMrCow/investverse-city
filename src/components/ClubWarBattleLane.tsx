import { useMemo, useState } from "react";
import { Shield, Swords, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

interface ClubWarBattleLaneProps {
  onRequestShop?: () => void;
}

export function ClubWarBattleLane({ onRequestShop }: ClubWarBattleLaneProps) {
  const [alphaHp, setAlphaHp] = useState(100);
  const [betaHp, setBetaHp] = useState(100);
  const [combo, setCombo] = useState(0);
  const [effect, setEffect] = useState<"attack" | "shield" | "burst" | null>(null);
  const [effectKey, setEffectKey] = useState(0);

  const isOver = alphaHp === 0 || betaHp === 0;

  const triggerEffect = (nextEffect: "attack" | "shield" | "burst") => {
    setEffect(nextEffect);
    setEffectKey((prev) => prev + 1);
  };

  const handleAttack = () => {
    if (isOver) return;
    const damage = Math.floor(6 + Math.random() * 10);
    setBetaHp((value) => clamp(value - damage, 0, 100));
    setCombo((value) => clamp(value + 1, 0, 9));
    triggerEffect("attack");
  };

  const handleShield = () => {
    if (isOver) return;
    const heal = Math.floor(4 + Math.random() * 7);
    setAlphaHp((value) => clamp(value + heal, 0, 100));
    setCombo(0);
    triggerEffect("shield");
  };

  const handleBurst = () => {
    if (isOver) return;
    const damage = Math.floor(12 + Math.random() * 10);
    setBetaHp((value) => clamp(value - damage, 0, 100));
    setCombo(0);
    triggerEffect("burst");
  };

  const handleReset = () => {
    setAlphaHp(100);
    setBetaHp(100);
    setCombo(0);
    setEffect(null);
  };

  const outcome = useMemo(() => {
    if (!isOver) return "Engaged";
    return alphaHp > betaHp ? "Victory" : "Retreat";
  }, [alphaHp, betaHp, isOver]);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Club War Live</p>
          <h3 className="font-display text-lg font-semibold">Battle Lane</h3>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-muted/50 border border-border/60">
          {outcome}
        </div>
      </div>

      <div className="battle-lane">
        <div className="battle-side">
          <div className="battle-avatar battle-avatar--alpha">
            <Shield className="w-5 h-5" />
          </div>
          <div className="battle-bar">
            <div className="battle-bar-fill battle-bar-fill--alpha" style={{ width: `${alphaHp}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">Guardians</p>
        </div>

        <div className="battle-center">
          <div className={cn("battle-combo", combo > 0 && "battle-combo--active")}>
            x{combo}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Combo</p>
        </div>

        <div className="battle-side">
          <div className="battle-avatar battle-avatar--beta">
            <Swords className="w-5 h-5" />
          </div>
          <div className="battle-bar">
            <div className="battle-bar-fill battle-bar-fill--beta" style={{ width: `${betaHp}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">Raiders</p>
        </div>

        {effect && (
          <div key={`${effect}-${effectKey}`} className={cn("battle-burst", `battle-burst--${effect}`)} />
        )}
      </div>

      <div className="mt-5 grid sm:grid-cols-3 gap-3">
        <Button variant="neon" className="w-full" onClick={handleAttack} disabled={isOver}>
          <Swords className="w-4 h-4" />
          Strike
        </Button>
        <Button variant="glass" className="w-full" onClick={handleShield} disabled={isOver}>
          <Shield className="w-4 h-4" />
          Guard
        </Button>
        {isOver ? (
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset Lane
          </Button>
        ) : (
          <Button variant="outline" className="w-full" onClick={handleBurst}>
            <Zap className="w-4 h-4" />
            Burst
          </Button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span>Spend GT on shields and boosts before deploying strikes.</span>
        {onRequestShop && (
          <Button variant="link" size="sm" className="px-0" onClick={onRequestShop}>
            Open Shop
          </Button>
        )}
      </div>
    </div>
  );
}
