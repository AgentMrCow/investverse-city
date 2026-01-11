import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Coins, LineChart, Play, Shield, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Ambient Shapes */}
      <div className="absolute -top-24 right-[-8%] h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/70 text-primary animate-slide-up">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Smart gamification for investment + insurance</span>
              <span className="text-xs text-muted-foreground">Polygon PoS</span>
            </div>

            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
                Investverse City
              </h1>
              <p className="text-2xl md:text-3xl font-display text-gradient-primary">
                Build financial confidence through play.
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Master diversification, risk protection, and policy literacy with personalized paths,
              a simulation lab, and collaborative club wars. Earn GT rewards while you learn.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="neon" size="xl" asChild>
                <Link to="/learn">
                  <Play className="w-5 h-5" />
                  Start Learning
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/simulations">
                  View Simulations
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.35s" }}>
              {[
                { icon: LineChart, label: "Simulation Lab", detail: "Stress-test portfolios with AI events." },
                { icon: Shield, label: "Insurance Literacy", detail: "Decode policies and coverage gaps." },
                { icon: Coins, label: "GT Economy", detail: "Non-transferable rewards + upgrades." },
                { icon: TrendingUp, label: "Club Wars", detail: "Collaborative strategy challenges." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/70 bg-card/70 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.label}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/60 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              {[
                { label: "Retention uplift", value: "+38%" },
                { label: "GT rewards issued", value: "2.0M" },
                { label: "Concept modules", value: "120+" },
                { label: "City assets insured", value: "82%" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-display font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Snapshot */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">City Pulse</p>
                  <h3 className="font-display text-xl font-semibold">Learning Command</h3>
                </div>
                <Badge variant="secondary">Live</Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Risk Level", value: "Balanced", tone: "text-primary" },
                  { label: "Coverage", value: "82%", tone: "text-success" },
                  { label: "ESG Score", value: "78", tone: "text-accent" },
                  { label: "Club Rank", value: "#24", tone: "text-muted-foreground" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border/70 bg-card/70 px-4 py-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className={`mt-2 text-lg font-display font-bold ${stat.tone}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center gold-glow">
                    <Coins className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Daily reward</p>
                    <p className="font-display text-lg font-bold text-gradient-gold">+50 GT</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete the daily quiz to keep your streak alive.
                </p>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Protection</p>
                    <p className="font-display text-lg font-bold">Protected</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Insurance shields city assets from volatility events.
                </p>
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Simulation Alert</p>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="text-sm font-semibold">Inflation spike impacts bond holdings.</p>
              <p className="text-sm text-muted-foreground">
                Rebalance to reduce duration risk and protect long-term goals.
              </p>
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
