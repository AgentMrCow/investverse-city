import { ArrowRight, Bot, Database, Layers, Network, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchArchitectureLayers } from "@/lib/supabaseQueries";

const iconMap = {
  Network,
  Database,
  Bot,
  Layers,
};

export function ArchitectureFlow() {
  const { data: layers = [], isLoading } = useQuery({
    queryKey: ["architecture-layers"],
    queryFn: fetchArchitectureLayers,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading architecture flow...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            On-chain + Off-chain Flow
          </h3>
          <p className="text-sm text-muted-foreground">
            Signals from gameplay trigger smart contracts while AI handles content quality.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {layers.map((layer, index) => {
          const Icon = iconMap[layer.icon as keyof typeof iconMap] ?? Network;
          return (
          <div key={layer.id ?? layer.title} className="flex items-center gap-3 lg:flex-1">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50 h-full flex-1">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="w-4 h-4 text-primary" />
                {layer.title}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{layer.description}</p>
            </div>
            {index < layers.length - 1 && (
              <ArrowRight className="hidden lg:block w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </div>
        );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
        <p className="text-xs text-muted-foreground">
          Off-chain services handle AI detection, screenshots, and scenario updates. Smart contracts
          store token logic, NFT items, and governance voting to keep the system transparent.
        </p>
      </div>
    </div>
  );
}
