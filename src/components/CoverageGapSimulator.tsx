import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Calculator, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCoverageSimulations, submitCoverageSimulation } from "@/lib/supabaseQueries";

const toNumber = (value: string) => {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
};

export function CoverageGapSimulator() {
  const queryClient = useQueryClient();
  const { data: simulations = [], isLoading } = useQuery({
    queryKey: ["coverage-simulations"],
    queryFn: fetchCoverageSimulations,
  });

  const [assetLabel, setAssetLabel] = useState("AI Data Center");
  const [assetValue, setAssetValue] = useState("15000");
  const [deductible, setDeductible] = useState("500");
  const [coverageLimit, setCoverageLimit] = useState("10000");
  const [lossAmount, setLossAmount] = useState("8000");
  const [lastResult, setLastResult] = useState<{
    payout: number;
    outOfPocket: number;
  } | null>(null);

  const preview = useMemo(() => {
    const assetValueNum = toNumber(assetValue);
    const deductibleNum = toNumber(deductible);
    const coverageLimitNum = toNumber(coverageLimit);
    const lossAmountNum = toNumber(lossAmount);
    const eligibleLoss = Math.max(0, lossAmountNum - deductibleNum);
    const payout = Math.min(coverageLimitNum, eligibleLoss);
    const outOfPocket = Math.max(0, lossAmountNum - payout);
    return {
      assetValueNum,
      deductibleNum,
      coverageLimitNum,
      lossAmountNum,
      payout,
      outOfPocket,
    };
  }, [assetValue, deductible, coverageLimit, lossAmount]);

  const mutation = useMutation({
    mutationFn: () =>
      submitCoverageSimulation({
        asset_label: assetLabel.trim() || "Unnamed asset",
        asset_value: preview.assetValueNum,
        deductible: preview.deductibleNum,
        coverage_limit: preview.coverageLimitNum,
        loss_amount: preview.lossAmountNum,
        payout: preview.payout,
        out_of_pocket: preview.outOfPocket,
      }),
    onSuccess: () => {
      setLastResult({ payout: preview.payout, outOfPocket: preview.outOfPocket });
      queryClient.invalidateQueries({ queryKey: ["coverage-simulations"] });
    },
  });

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Coverage Gap Simulator
          </h3>
          <p className="text-sm text-muted-foreground">
            Stress-test deductibles and coverage limits before the next disaster event.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-semibold text-muted-foreground">
          <Calculator className="w-4 h-4" />
          Claim math
        </div>
      </div>

      <div className="grid gap-4">
        <label className="text-xs text-muted-foreground">
          Asset label
          <Input
            value={assetLabel}
            onChange={(event) => setAssetLabel(event.target.value)}
            className="mt-2"
            placeholder="AI Data Center"
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-xs text-muted-foreground">
            Asset value (GT)
            <Input
              type="number"
              value={assetValue}
              onChange={(event) => setAssetValue(event.target.value)}
              className="mt-2"
              min={0}
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Deductible (GT)
            <Input
              type="number"
              value={deductible}
              onChange={(event) => setDeductible(event.target.value)}
              className="mt-2"
              min={0}
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Coverage limit (GT)
            <Input
              type="number"
              value={coverageLimit}
              onChange={(event) => setCoverageLimit(event.target.value)}
              className="mt-2"
              min={0}
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Loss amount (GT)
            <Input
              type="number"
              value={lossAmount}
              onChange={(event) => setLossAmount(event.target.value)}
              className="mt-2"
              min={0}
            />
          </label>
        </div>

        {preview.assetValueNum > 0 && preview.lossAmountNum > preview.assetValueNum && (
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/30 text-xs text-warning flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5" />
            Loss exceeds asset value. Cap the loss to keep the scenario realistic.
          </div>
        )}

        <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-xs text-muted-foreground">
          Payout = min(coverage limit, loss - deductible). Out-of-pocket includes the deductible
          plus any uninsured remainder.
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated payout</p>
            <p className="mt-2 text-lg font-display font-bold text-success">
              {preview.payout.toLocaleString()} GT
            </p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Out-of-pocket</p>
            <p className="mt-2 text-lg font-display font-bold text-destructive">
              {preview.outOfPocket.toLocaleString()} GT
            </p>
          </div>
        </div>

        <Button
          variant="neon"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Run simulation"}
        </Button>
        {mutation.isSuccess && lastResult && (
          <p className="text-xs text-success">
            Simulation saved. Latest payout {lastResult.payout.toLocaleString()} GT.
          </p>
        )}
        {mutation.isError && <p className="text-xs text-destructive">Save failed. Try again.</p>}
      </div>

      <div className="mt-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recent scenarios</p>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading scenarios...</p>
        ) : (
          <div className="space-y-3">
            {simulations.map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{item.asset_label}</span>
                  <span className="text-xs text-muted-foreground">Loss {item.loss_amount} GT</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-2">
                  <span>Payout {item.payout} GT</span>
                  <span>Out-of-pocket {item.out_of_pocket} GT</span>
                  <span>Deductible {item.deductible} GT</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
