import { Button } from "./ui/button";
import { Play, Sparkles, ArrowRight, Coins, Shield, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary animate-slide-up">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Web3 Financial Literacy Game</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Learn Finance,
              <br />
              <span className="text-gradient-primary">Build Wealth</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Master investment and insurance through gamified challenges. 
              Build your virtual city, compete in club wars, and earn tokens as you learn.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="neon" size="xl">
                <Play className="w-5 h-5 mr-2" />
                Start Playing
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div>
                <p className="font-display text-3xl font-bold text-gradient-gold">50K+</p>
                <p className="text-sm text-muted-foreground">Active Players</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-gradient-primary">2M+</p>
                <p className="text-sm text-muted-foreground">GT Distributed</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Learning Modules</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative lg:h-[600px]">
            {/* Main Card */}
            <div className="glass-card p-6 absolute top-0 right-0 w-72 animate-float neon-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center gold-glow">
                  <Coins className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Rewards</p>
                  <p className="font-display text-xl font-bold text-gradient-gold">+50 GT</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Complete daily challenges to earn tokens</p>
            </div>

            {/* Secondary Card */}
            <div className="glass-card p-6 absolute top-32 left-0 w-64 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Level</p>
                  <p className="font-display text-xl font-bold">Protected</p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-success to-emerald-400" />
              </div>
            </div>

            {/* Third Card */}
            <div className="glass-card p-6 absolute bottom-20 right-10 w-80 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Growth</p>
                  <p className="font-display text-xl font-bold text-success">+24.5%</p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tech Stocks</span>
                <span>Bonds</span>
                <span>ESG</span>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="h-16 flex-1 bg-gradient-to-t from-neon-cyan/50 to-primary/50 rounded-t" />
                <div className="h-12 flex-1 bg-gradient-to-t from-accent/50 to-warning/50 rounded-t" />
                <div className="h-20 flex-1 bg-gradient-to-t from-success/50 to-emerald-400/50 rounded-t" />
                <div className="h-8 flex-1 bg-gradient-to-t from-muted-foreground/50 to-muted/50 rounded-t" />
                <div className="h-14 flex-1 bg-gradient-to-t from-neon-purple/50 to-neon-pink/50 rounded-t" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
