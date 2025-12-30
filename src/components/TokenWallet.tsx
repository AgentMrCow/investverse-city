import { Coins, TrendingUp, Zap } from "lucide-react";

interface TokenWalletProps {
  tokens: number;
  dailyEarned: number;
  streak: number;
}

export function TokenWallet({ tokens, dailyEarned, streak }: TokenWalletProps) {
  return (
    <div className="glass-card p-4 flex items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-warning flex items-center justify-center gold-glow">
          <Coins className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">GT Balance</p>
          <p className="font-display text-xl font-bold text-gradient-gold">{tokens.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="w-px h-10 bg-border" />
      
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-success" />
        <span className="text-sm text-success">+{dailyEarned} today</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-accent" />
        <span className="text-sm text-accent">{streak} day streak</span>
      </div>
    </div>
  );
}
