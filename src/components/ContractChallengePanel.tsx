import { AlertTriangle, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchContractChallenge, fetchContractClauses } from "@/lib/supabaseQueries";

export function ContractChallengePanel() {
  const { data: challenge, isLoading: challengeLoading } = useQuery({
    queryKey: ["contract-challenge"],
    queryFn: fetchContractChallenge,
  });
  const { data: clauses = [], isLoading: clausesLoading } = useQuery({
    queryKey: ["contract-clauses", challenge?.id],
    queryFn: () => fetchContractClauses(challenge!.id),
    enabled: !!challenge?.id,
  });

  if (challengeLoading || clausesLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading contract challenge...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {challenge?.title ?? "Contract Loophole Challenge"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {challenge?.description ?? "Analyze insurance clauses and flag coverage gaps for bonus GT."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          AI-coached
        </div>
      </div>

      <div className="space-y-3">
        {clauses.map((clause) => (
          <div key={clause.title} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{clause.title}</p>
                <p className="text-xs text-muted-foreground">{clause.detail}</p>
              </div>
              <span
                className={`text-xs font-semibold ${clause.status === "Gap" ? "text-destructive" : "text-success"}`}
              >
                {clause.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <ShieldCheck className="w-4 h-4" />
          Your Task
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Identify two exclusions that expose the city to loss. Suggest an insurance rider to close the gap.
        </p>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-semibold">Live Scenario</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {challenge?.scenario ?? "Typhoon warning issued. Apply coverage within 10 minutes to protect your building value."}
        </p>
      </div>
    </div>
  );
}
