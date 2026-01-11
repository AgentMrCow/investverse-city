import { Gem, Palette, ShieldCheck, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreItems } from "@/lib/supabaseQueries";

const iconMap = {
  cosmetic: Palette,
  utility: ShieldCheck,
  collectible: Gem,
};

export function MarketplacePanel() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["store-items"],
    queryFn: fetchStoreItems,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading marketplace...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Marketplace
          </h3>
          <p className="text-sm text-muted-foreground">
            Spend GT on cosmetics, boosts, and limited drops.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">NFT store + in-app items</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.category as keyof typeof iconMap] ?? Gem;
          return (
          <div key={item.id ?? item.name} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background/60 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-accent">{item.cost}</span>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
