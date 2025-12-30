import { Button } from "./ui/button";
import { Swords, Shield, Clock, Users, Flame } from "lucide-react";

export function ClubWarPreview() {
  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-neon-purple/10" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive to-neon-pink flex items-center justify-center animate-pulse-slow">
              <Swords className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Club War</h3>
              <p className="text-sm text-muted-foreground">Battle starts at 9PM</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive border border-destructive/30">
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold text-sm">2h 45m</span>
          </div>
        </div>

        {/* War Preview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Your Club */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center neon-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="font-semibold text-sm">Crypto Kings</p>
            <p className="text-xs text-muted-foreground">Your Club</p>
            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-success">
              <Users className="w-3 h-3" />
              24 members
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Flame className="w-6 h-6 text-destructive animate-glow" />
            </div>
          </div>

          {/* Enemy Club */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
              <Shield className="w-8 h-8 text-foreground" />
            </div>
            <p className="font-semibold text-sm">Bull Raiders</p>
            <p className="text-xs text-muted-foreground">Opponent</p>
            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-warning">
              <Users className="w-3 h-3" />
              21 members
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Your Building Value</p>
            <p className="font-display text-lg font-bold text-gradient-gold">45,200 GT</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">War Weapons Ready</p>
            <p className="font-display text-lg font-bold text-primary">12</p>
          </div>
        </div>

        <Button variant="neon" className="w-full">
          <Swords className="w-4 h-4 mr-2" />
          Prepare for Battle
        </Button>
      </div>
    </div>
  );
}
