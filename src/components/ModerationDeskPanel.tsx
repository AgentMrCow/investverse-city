import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Flag, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  createQuestion,
  fetchQuestionSubmissions,
  updateQuestionSubmission,
} from "@/lib/supabaseQueries";

type DraftQuestion = {
  question: string;
  options: string[];
  correct_index: number;
  difficulty?: string;
  category?: string;
  rationale?: string;
};

const parseDraft = (content: unknown): DraftQuestion | null => {
  if (!content) return null;
  if (typeof content === "string") {
    try {
      return parseDraft(JSON.parse(content));
    } catch (error) {
      return null;
    }
  }
  if (typeof content !== "object") return null;
  const draft = content as DraftQuestion;
  if (!draft.question || !Array.isArray(draft.options)) return null;
  if (typeof draft.correct_index !== "number") return null;
  return {
    question: draft.question.trim(),
    options: draft.options.map((option) => `${option}`.trim()),
    correct_index: draft.correct_index,
    difficulty: draft.difficulty,
    category: draft.category,
    rationale: draft.rationale,
  };
};

const rewardFromDifficulty = (difficulty?: string) => {
  switch ((difficulty || "").toLowerCase()) {
    case "hard":
      return 50;
    case "medium":
      return 30;
    case "easy":
      return 10;
    default:
      return 20;
  }
};

export function ModerationDeskPanel() {
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["question-submissions"],
    queryFn: fetchQuestionSubmissions,
  });

  const pendingSubmissions = useMemo(
    () => submissions.filter((submission) => submission.status !== "Approved"),
    [submissions],
  );

  const approveMutation = useMutation({
    mutationFn: async (submission: typeof submissions[number]) => {
      const draft = parseDraft(submission.content);
      if (!draft) {
        throw new Error("Missing structured content");
      }
      const reward = rewardFromDifficulty(draft.difficulty);
      await createQuestion({
        question: draft.question,
        options: draft.options,
        correct_index: draft.correct_index,
        difficulty: draft.difficulty,
        token_reward: reward,
        category: draft.category,
      });
      return updateQuestionSubmission(submission.id, {
        status: "Approved",
        reward,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["daily-challenge"] });
    },
  });

  const flagMutation = useMutation({
    mutationFn: (submissionId: string) =>
      updateQuestionSubmission(submissionId, { status: "Flagged", reward: -10 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question-submissions"] });
    },
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading moderation queue...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Moderation Desk
          </h3>
          <p className="text-sm text-muted-foreground">
            Approve AI drafts and publish them into the official question bank.
          </p>
        </div>
        <Badge variant="outline">{pendingSubmissions.length} pending</Badge>
      </div>

      <div className="space-y-3">
        {pendingSubmissions.map((submission) => {
          const draft = parseDraft(submission.content);
          const reward = rewardFromDifficulty(draft?.difficulty);
          return (
            <div key={submission.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{submission.title}</p>
                  <p className="text-xs text-muted-foreground">Status: {submission.status}</p>
                  {submission.source && (
                    <p className="text-xs text-muted-foreground">Source: {submission.source}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {draft?.difficulty && <Badge variant="secondary">{draft.difficulty}</Badge>}
                  {draft?.category && <Badge variant="outline">{draft.category}</Badge>}
                </div>
              </div>

              {draft ? (
                <div className="mt-3 text-xs text-muted-foreground space-y-2">
                  <p className="text-sm text-foreground font-semibold">{draft.question}</p>
                  <ul className="space-y-1">
                    {draft.options.map((option, index) => (
                      <li key={`${submission.id}-${index}`} className={index === draft.correct_index ? "text-success" : ""}>
                        {String.fromCharCode(65 + index)}. {option}
                      </li>
                    ))}
                  </ul>
                  {draft.rationale && <p>Rationale: {draft.rationale}</p>}
                </div>
              ) : (
                <p className="mt-3 text-xs text-warning">
                  Draft missing structured content. Ask contributor to add options or regenerate.
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  variant="neon"
                  size="sm"
                  onClick={() => approveMutation.mutate(submission)}
                  disabled={!draft || approveMutation.isPending}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve +{reward} GT
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => flagMutation.mutate(submission.id)}
                  disabled={flagMutation.isPending}
                >
                  <Flag className="w-4 h-4" />
                  Flag (-10 GT)
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {pendingSubmissions.length === 0 && (
        <p className="text-sm text-muted-foreground">No pending submissions right now.</p>
      )}

      {approveMutation.error instanceof Error && (
        <p className="text-xs text-destructive mt-3">{approveMutation.error.message}</p>
      )}
    </div>
  );
}
