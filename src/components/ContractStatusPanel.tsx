import { Coins, Layers, ShieldCheck } from "lucide-react";

const envAddress = (key: string) => {
  const value = import.meta.env[key] as string | undefined;
  if (!value) return "Not deployed";
  return value;
};

export function ContractStatusPanel() {
  const growToken = envAddress("VITE_GT_CONTRACT_ADDRESS");
  const itemsContract = envAddress("VITE_ITEMS_CONTRACT_ADDRESS");
  const rareContract = envAddress("VITE_RARE_CONTRACT_ADDRESS");

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Smart Contract Status
          </h3>
          <p className="text-sm text-muted-foreground">Polygon PoS + ERC-20/1155/721 stack.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Coins className="w-4 h-4" />
            GrowToken (ERC-20)
          </div>
          <p className="text-xs text-muted-foreground mt-2">{growToken}</p>
          <p className="text-xs text-muted-foreground">Non-transferable reward token</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ShieldCheck className="w-4 h-4" />
            Items (ERC-1155)
          </div>
          <p className="text-xs text-muted-foreground mt-2">{itemsContract}</p>
          <p className="text-xs text-muted-foreground">Limited-supply weapons, boosts, cosmetics</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-success">
            <Layers className="w-4 h-4" />
            Rare Drops (ERC-721)
          </div>
          <p className="text-xs text-muted-foreground mt-2">{rareContract}</p>
          <p className="text-xs text-muted-foreground">Unique NFT achievements and skins</p>
        </div>
      </div>
    </div>
  );
}
