import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || "/api/insights";

const policyTypes = ["Property", "Health", "Disaster", "Life"] as const;

type PolicyType = (typeof policyTypes)[number];

const samples: Record<PolicyType, string> = {
  Property:
    "Coverage excludes flood damage within 500 meters of the coastline. A 500 GT deductible applies to all claims. Coverage limit is capped at 10,000 GT per incident.",
  Health:
    "Pre-existing conditions are excluded for the first 12 months. Co-payment is 20% after the deductible. Coverage limit is 8,000 GT per year.",
  Disaster:
    "Typhoon-related damage is covered after a 7-day waiting period. Business interruption is limited to 30 days. Coverage cap is 12,000 GT.",
  Life:
    "Accidental death benefit applies only for verified incidents. Suicide is excluded for 24 months. Coverage limit is 15,000 GT.",
};

type InsightResponse = {
  text: string;
  model?: string;
};

export function PolicyDecoderPanel() {
  const [policyType, setPolicyType] = useState<PolicyType>("Property");
  const [clause, setClause] = useState(samples.Property);
  const [response, setResponse] = useState<InsightResponse | null>(null);

  const prompt = useMemo(() => {
    return `Summarize and decode the following ${policyType} insurance clause for a learner.\n\nClause:\n${clause.trim()}\n\nOutput 4 bullets with labels:\n- Plain summary\n- Key exclusions\n- Coverage math\n- Questions to ask\n\nConstraints:\n- Keep each bullet under 24 words.\n- Use simple, non-legal language.\n- Highlight any deductible or limit in Coverage math.`;
  }, [clause, policyType]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "AI request failed.");
      }

      return payload as InsightResponse;
    },
    onSuccess: (data) => {
      setResponse(data);
    },
  });

  const errorMessage = mutation.error instanceof Error ? mutation.error.message : null;

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Policy Decoder
          </h3>
          <p className="text-sm text-muted-foreground">
            AI rewrites insurance clauses into clear, student-friendly guidance.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-semibold text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          AI summary
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {policyTypes.map((type) => (
          <Button
            key={type}
            variant="glass"
            size="sm"
            className={type === policyType ? "border-primary bg-primary/10" : ""}
            onClick={() => {
              setPolicyType(type);
              setClause(samples[type]);
            }}
          >
            {type}
          </Button>
        ))}
        {response?.model && <Badge variant="outline">Model: {response.model}</Badge>}
      </div>

      <Textarea
        value={clause}
        onChange={(event) => setClause(event.target.value)}
        placeholder="Paste a policy clause to decode"
        className="mb-4"
        maxLength={420}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          variant="neon"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending || clause.trim().length < 40}
        >
          {mutation.isPending ? "Decoding..." : "Decode clause"}
        </Button>
        <Button
          variant="glass"
          onClick={() => setClause(samples[policyType])}
        >
          Reset sample
        </Button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-success" />
          Highlights deductibles and limits
        </div>
      </div>

      <div className="rounded-lg border border-border/50 bg-muted/20 p-4 min-h-[140px]">
        {mutation.isPending && <p className="text-sm text-muted-foreground">Translating policy terms...</p>}
        {!mutation.isPending && response?.text && (
          <p className="text-sm text-foreground whitespace-pre-line">{response.text}</p>
        )}
        {!mutation.isPending && !response?.text && (
          <p className="text-sm text-muted-foreground">
            Paste a clause and generate a simplified explanation.
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
