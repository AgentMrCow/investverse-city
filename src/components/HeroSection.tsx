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
                <a href="#game-hub">
                  <Play className="w-5 h-5" />
                  Enter Game
                </a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/learn">Start Learning</Link>
              </Button>
              <Button variant="ghost" size="xl" asChild>
                <Link to="/simulations">
                  View Simulations
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Game Portal */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Game Lobby</p>
                  <h3 className="font-display text-xl font-semibold">Enter Investverse City</h3>
                </div>
                <Badge variant="secondary">Prototype</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This lobby is just the entry point. Inside the city hub, stations open as pop-up
                panels, just like a mobile game menu.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  { icon: LineChart, label: "Simulation Sandbox", detail: "Run market scenarios fast." },
                  { icon: Shield, label: "Insurance Coverage", detail: "See the math behind protection." },
                  { icon: Coins, label: "GT Economy", detail: "Rewards stay in-app and compliant." },
                  { icon: TrendingUp, label: "Club Wars", detail: "Coordinate strategies with your crew." },
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

              <Button variant="neon" size="lg" className="mt-6 w-full" asChild>
                <a href="#game-hub">
                  <Play className="w-5 h-5" />
                  Enter Game
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
