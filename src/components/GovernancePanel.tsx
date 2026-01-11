import { CheckCircle2, Gavel, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchClubWar, fetchGovernanceProposals } from "@/lib/supabaseQueries";

export function GovernancePanel() {
  const { data: war } = useQuery({
    queryKey: ["club-war"],
    queryFn: fetchClubWar,
  });
  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ["governance-proposals", war?.club_a_id],
    queryFn: () => fetchGovernanceProposals(war!.club_a_id),
    enabled: !!war?.club_a_id,
  });

  if (isLoading || !war) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading governance...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Gavel className="w-5 h-5 text-primary" />
            Club Governance
          </h3>
          <p className="text-sm text-muted-foreground">
            Proof-of-stake voting shapes club rules and rewards.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="w-4 h-4" />
          124 voters
        </div>
      </div>

      <div className="space-y-3">
        {proposals.map((proposal) => (
          <div key={proposal.id ?? proposal.title} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{proposal.title}</p>
                <p className="text-xs text-muted-foreground">{proposal.detail}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p className={proposal.status === "Passed" ? "text-success" : "text-primary"}>
                  {proposal.vote_summary}
                </p>
                <p className="mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {proposal.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
