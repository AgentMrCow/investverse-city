import { Link } from "react-router-dom";
import { BookOpen, Gamepad2, LineChart, Swords } from "lucide-react";

const modes = [
  {
    title: "Enter Game Mode",
    description: "Jump into the 2.5D city map and open stations.",
    href: "/game",
    icon: Gamepad2,
    gradient: "from-primary to-neon-cyan",
  },
  {
    title: "Learning Hub",
    description: "Skill tree, daily challenges, and policy practice.",
    href: "/learn",
    icon: BookOpen,
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    title: "Simulation Lab",
    description: "Run market scenarios and ESG coverage tests.",
    href: "/simulations",
    icon: LineChart,
    gradient: "from-accent to-warning",
  },
  {
    title: "Club War Arena",
    description: "Coordinate strategy and deploy battle actions.",
    href: "/club-war",
    icon: Swords,
    gradient: "from-destructive to-warning",
  },
];

export function LobbyModeSelect() {
  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Lobby</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Choose Your Mode</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
          The lobby is just the entry point. Pick a mode to jump straight into play.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Link key={mode.title} to={mode.href} className="lobby-mode-card">
              <div className={`lobby-mode-icon bg-gradient-to-br ${mode.gradient}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{mode.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{mode.description}</p>
              </div>
              <span className="lobby-mode-cta">Enter</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
