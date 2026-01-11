import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { submitQuestionSubmission } from "@/lib/supabaseQueries";

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || "/api/insights";

const categories = ["investment", "insurance", "risk", "esg"] as const;
const difficulties = ["easy", "medium", "hard"] as const;

type DraftQuestion = {
  question: string;
  options: string[];
  correct_index: number;
  difficulty: string;
  category: string;
  rationale?: string;
};

const parseDraft = (text: string): DraftQuestion | null => {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") return null;
    const { question, options, correct_index, difficulty, category, rationale } = parsed;
    if (typeof question !== "string" || !Array.isArray(options) || options.length < 4) return null;
    if (typeof correct_index !== "number" || correct_index < 0 || correct_index >= options.length) return null;
    if (typeof difficulty !== "string" || typeof category !== "string") return null;
    return {
      question: question.trim(),
      options: options.map((option: string) => option.trim()),
      correct_index,
      difficulty,
      category,
      rationale: typeof rationale === "string" ? rationale.trim() : undefined,
    };
  } catch (error) {
    return null;
  }
};

export function AIQuestionGeneratorPanel() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<(typeof categories)[number]>("investment");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("easy");
  const [note, setNote] = useState("");
  const [rawDraft, setRawDraft] = useState("");
  const [draft, setDraft] = useState<DraftQuestion | null>(null);

  const prompt = useMemo(() => {
    return `Create one multiple-choice question for Investverse City.\n\nTopic: ${note.trim() || "core fundamentals"}\nCategory: ${category}\nDifficulty: ${difficulty}\n\nReturn JSON only (no markdown) with keys:\n- question (string)\n- options (array of 4 short strings)\n- correct_index (0-3)\n- difficulty (easy|medium|hard)\n- category (investment|insurance|risk|esg)\n- rationale (one sentence)\n\nConstraints:\n- Keep question under 18 words.\n- Options under 8 words each.\n- Avoid financial advice; keep it educational.`;
  }, [category, difficulty, note]);

  const generateMutation = useMutation({
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

      return payload?.text as string;
    },
    onSuccess: (text) => {
      setRawDraft(text);
      setDraft(parseDraft(text));
    },
  });

  const submitMutation = useMutation({
    mutationFn: () => {
      if (!draft) throw new Error("No draft available");
      return submitQuestionSubmission(draft.question, {
        source: "AI Draft",
        content: draft,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question-submissions"] });
    },
  });

  const errorMessage = generateMutation.error instanceof Error ? generateMutation.error.message : null;

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Question Generator
          </h3>
          <p className="text-sm text-muted-foreground">
            Draft multiple-choice questions for the community bank and moderation queue.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-semibold text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          OpenRouter
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((option) => (
          <Button
            key={option}
            variant="glass"
            size="sm"
            className={option === category ? "border-primary bg-primary/10" : ""}
            onClick={() => setCategory(option)}
          >
            {option}
          </Button>
        ))}
        {difficulties.map((option) => (
          <Button
            key={option}
            variant="glass"
            size="sm"
            className={option === difficulty ? "border-primary bg-primary/10" : ""}
            onClick={() => setDifficulty(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <Textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Optional topic focus (e.g., deductible math, diversification, ESG scoring)"
        className="mb-4"
        maxLength={160}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          variant="neon"
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
        >
          {generateMutation.isPending ? "Generating..." : "Generate question"}
        </Button>
        {draft && <Badge variant="outline">Draft ready</Badge>}
      </div>

      <div className="rounded-lg border border-border/50 bg-muted/20 p-4 min-h-[160px]">
        {generateMutation.isPending && (
          <p className="text-sm text-muted-foreground">Drafting a question...</p>
        )}
        {!generateMutation.isPending && draft && (
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">{draft.question}</p>
              <p className="text-xs text-muted-foreground">
                {draft.category} • {draft.difficulty}
              </p>
            </div>
            <ul className="space-y-2">
              {draft.options.map((option, index) => (
                <li
                  key={`${draft.question}-${index}`}
                  className={`p-2 rounded border ${
                    index === draft.correct_index
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-border/50 bg-background/40"
                  }`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </li>
              ))}
            </ul>
            {draft.rationale && (
              <p className="text-xs text-muted-foreground">Rationale: {draft.rationale}</p>
            )}
          </div>
        )}
        {!generateMutation.isPending && !draft && (
          <p className="text-sm text-muted-foreground">
            Generate a draft to preview the question and options.
          </p>
        )}
        {rawDraft && !draft && (
          <p className="text-xs text-warning mt-2">
            Draft parsing failed. Try generating again.
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive mt-2">{errorMessage}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="glass"
          onClick={() => submitMutation.mutate()}
          disabled={!draft || submitMutation.isPending}
        >
          {submitMutation.isPending ? "Saving..." : "Save to submissions"}
        </Button>
        {submitMutation.isSuccess && (
          <span className="text-xs text-success">Saved for moderation.</span>
        )}
        {submitMutation.error instanceof Error && (
          <span className="text-xs text-destructive">{submitMutation.error.message}</span>
        )}
      </div>
    </div>
  );
}
