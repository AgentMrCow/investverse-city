import { Building2, Factory, Landmark, TrendingUp, Shield } from "lucide-react";

interface Building {
  id: string;
  type: "tech" | "bank" | "factory" | "infrastructure";
  name: string;
  level: number;
  value: number;
  growth: number;
  insured: boolean;
}

const buildings: Building[] = [
  { id: "1", type: "tech", name: "AI Data Center", level: 3, value: 15000, growth: 12.5, insured: true },
  { id: "2", type: "bank", name: "Finance HQ", level: 2, value: 8500, growth: 4.2, insured: true },
  { id: "3", type: "factory", name: "Consumer Mall", level: 4, value: 22000, growth: 8.1, insured: false },
  { id: "4", type: "infrastructure", name: "Power Grid", level: 2, value: 5000, growth: 2.8, insured: true },
];

const getBuildingIcon = (type: Building["type"]) => {
  switch (type) {
    case "tech": return <Building2 className="w-6 h-6" />;
    case "bank": return <Landmark className="w-6 h-6" />;
    case "factory": return <Factory className="w-6 h-6" />;
    case "infrastructure": return <Building2 className="w-6 h-6" />;
  }
};

const getBuildingColor = (type: Building["type"]) => {
  switch (type) {
    case "tech": return "from-neon-cyan to-primary";
    case "bank": return "from-accent to-warning";
    case "factory": return "from-neon-purple to-neon-pink";
    case "infrastructure": return "from-muted-foreground to-muted";
  }
};

export function CityVisualization() {
  const totalValue = buildings.reduce((sum, b) => sum + b.value, 0);

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Your Investment City</h3>
          <p className="text-sm text-muted-foreground">Portfolio visualization</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</p>
          <p className="font-display text-2xl font-bold text-gradient-gold">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Isometric City Grid */}
      <div className="relative h-64 mb-6 overflow-hidden rounded-lg bg-gradient-to-b from-background to-muted/20 grid-pattern">
        <div className="absolute inset-0 flex items-end justify-center gap-4 p-4">
          {buildings.map((building, index) => (
            <div
              key={building.id}
              className="relative group cursor-pointer"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateY(${(4 - building.level) * 10}px)`
              }}
            >
              {/* Building */}
              <div 
                className={`relative w-16 bg-gradient-to-t ${getBuildingColor(building.type)} rounded-t-lg building-shadow transition-all duration-300 group-hover:scale-105`}
                style={{ height: `${building.level * 40}px` }}
              >
                {/* Windows */}
                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                  {Array.from({ length: building.level * 2 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-background/30 rounded-sm animate-pulse-slow"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                
                {/* Icon */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card flex items-center justify-center text-foreground">
                  {getBuildingIcon(building.type)}
                </div>

                {/* Insurance Badge */}
                {building.insured && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                    <Shield className="w-3 h-3 text-background" />
                  </div>
                )}
              </div>

              {/* Hover Info */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="glass-card p-3 text-center whitespace-nowrap">
                  <p className="font-semibold text-sm">{building.name}</p>
                  <p className="text-xs text-muted-foreground">Level {building.level}</p>
                  <div className="flex items-center justify-center gap-1 text-success text-xs mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +{building.growth}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted to-transparent" />
      </div>

      {/* Building Legend */}
      <div className="grid grid-cols-2 gap-3">
        {buildings.map((building) => (
          <div key={building.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getBuildingColor(building.type)} flex items-center justify-center text-background`}>
              {getBuildingIcon(building.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{building.name}</p>
              <p className="text-xs text-muted-foreground">${building.value.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="w-3 h-3" />
              {building.growth}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
