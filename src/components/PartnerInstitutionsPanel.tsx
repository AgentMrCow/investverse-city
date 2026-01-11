import { Building2, ShieldCheck, Sparkles } from "lucide-react";

const partners = [
  { name: "Central Bank Academy", focus: "Policy literacy + insurance", benefit: "Issue badges for compliance modules" },
  { name: "Global Asset Mgmt Lab", focus: "Portfolio construction", benefit: "B2B sandbox for client education" },
  { name: "ESG Institute", focus: "Sustainable investing", benefit: "Green score certification & events" },
];

export function PartnerInstitutionsPanel() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">B2B</p>
          <h3 className="font-display text-lg font-semibold">Institution Network</h3>
        </div>
        <Building2 className="w-5 h-5 text-primary" />
      </div>
      <div className="space-y-3">
        {partners.map((partner) => (
          <div key={partner.name} className="rounded-xl border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">{partner.name}</p>
              <ShieldCheck className="w-4 h-4 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{partner.focus}</p>
            <p className="text-xs text-foreground mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent" />
              {partner.benefit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
