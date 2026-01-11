import { useState } from "react";

import { ActionDock } from "@/components/ActionDock";
import { Footer } from "@/components/Footer";
import { GameHud } from "@/components/GameHud";
import { GameModeMap } from "@/components/GameModeMap";
import { Navbar } from "@/components/Navbar";

const GameMode = () => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [effectKey, setEffectKey] = useState(0);

  const handleAction = (actionId: string) => {
    setActiveEffect(actionId);
    setEffectKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="game-mode pt-24 pb-24">
        <div className="container mx-auto px-4">
          <div className="relative">
            <h1 className="sr-only">Game Mode</h1>
            <GameHud />
            <GameModeMap activeEffect={activeEffect} effectKey={effectKey} />
            <ActionDock onAction={handleAction} lastAction={activeEffect} actionKey={effectKey} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameMode;
