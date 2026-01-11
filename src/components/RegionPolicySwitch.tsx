import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Globe, Scale, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRegions } from "@/lib/supabaseQueries";

interface Region {
  id: string;
  name: string;
  focus: string;
  theme: string;
  challenge: string;
  signals: string[];
  gradient: string;
}

export function RegionPolicySwitch() {
  const { data: regions = [], isLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId && regions.length) {
      setActiveId(regions[0].id);
    }
  }, [activeId, regions]);

  const activeRegion = regions.find((region: Region) => region.id === activeId) ?? regions[0];
  const gradient = activeRegion?.gradient ?? "from-primary to-neon-cyan";

  if (isLoading || !activeRegion) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading region settings...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Policy Lens Switcher
          </h3>
          <p className="text-sm text-muted-foreground">
            Toggle regional scenarios to align learning content with local expectations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map((region: Region) => (
            <Button
              key={region.id}
              variant={region.id === activeId ? "neon" : "glass"}
              size="sm"
              onClick={() => setActiveId(region.id)}
            >
              {region.id.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            Policy Focus
          </div>
          <p className="mt-2 text-sm font-semibold">{activeRegion.focus}</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Challenge Theme
          </div>
          <p className="mt-2 text-sm font-semibold">{activeRegion.challenge}</p>
          <p className="mt-2 text-xs text-muted-foreground">City skin: {activeRegion.theme}</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${gradient}`} />
          <p className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">Scenario Signals</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(activeRegion.signals ?? []).map((signal) => (
              <span
                key={signal}
                className="px-2 py-1 rounded-full text-xs bg-background/60 border border-border/40"
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
