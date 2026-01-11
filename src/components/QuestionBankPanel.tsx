import { useState } from "react";
import { AlertTriangle, BadgeCheck, Bot, FileText, Send } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchModerationChecks, fetchQuestionSubmissions, submitQuestionSubmission } from "@/lib/supabaseQueries";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function QuestionBankPanel() {
  const [draft, setDraft] = useState("");
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["question-submissions"],
    queryFn: fetchQuestionSubmissions,
  });
  const { data: checks = [], isLoading: checksLoading } = useQuery({
    queryKey: ["moderation-checks"],
    queryFn: fetchModerationChecks,
  });
  const submissionMutation = useMutation({
    mutationFn: (value: string) => submitQuestionSubmission(value),
    onSuccess: () => {
      setDraft("");
      queryClient.invalidateQueries({ queryKey: ["question-submissions"] });
    },
  });

  if (submissionsLoading || checksLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading question bank...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Community Question Bank
          </h3>
          <p className="text-sm text-muted-foreground">
            Players submit questions; AI moderation keeps the content focused and safe.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-muted-foreground text-xs font-semibold">
          <Bot className="w-4 h-4" />
          AI moderation
        </div>
      </div>

      <div className="space-y-3">
        {submissions.map((submission) => (
          <div key={submission.id ?? submission.title} className="p-3 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{submission.title}</p>
              <p className="text-xs text-muted-foreground">Status: {submission.status}</p>
              {submission.source && (
                <p className="text-xs text-muted-foreground">Source: {submission.source}</p>
              )}
            </div>
            <span className={submission.reward < 0 ? "text-destructive text-sm" : "text-success text-sm"}>
              {submission.reward > 0 ? `+${submission.reward} GT` : `${submission.reward} GT`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <BadgeCheck className="w-4 h-4" />
          Integrity Checks
        </div>
        <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
          {checks.map((check) => (
            <li key={check.id} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              {check.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-semibold">Penalty Rule</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Repeated irrelevant or abusive submissions deduct 10 GT per incident (cap 100 GT/day).
        </p>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Send className="w-4 h-4" />
          Submit a question idea
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Draft a question prompt and the AI moderation queue will review it for rewards.
        </p>
        <Textarea
          value={draft}
          onChange={(event) => {
            if (submissionMutation.isSuccess || submissionMutation.isError) {
              submissionMutation.reset();
            }
            setDraft(event.target.value);
          }}
          placeholder="Example: What is the main benefit of diversification? Provide 4 choices."
          className="mt-3"
          maxLength={220}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{draft.length}/220 characters</span>
          <Button
            variant="neon"
            size="sm"
            onClick={() => submissionMutation.mutate(draft.trim())}
            disabled={draft.trim().length < 12 || submissionMutation.isPending}
          >
            {submissionMutation.isPending ? "Submitting..." : "Submit for review"}
          </Button>
        </div>
        {submissionMutation.isSuccess && (
          <p className="text-xs text-success mt-2">Submitted! Earn up to 50 GT after approval.</p>
        )}
        {submissionMutation.isError && (
          <p className="text-xs text-destructive mt-2">Submission failed. Try again.</p>
        )}
      </div>
    </div>
  );
}
