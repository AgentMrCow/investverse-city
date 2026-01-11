import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createSimulationScenario } from "@/lib/supabaseQueries";

const themes = [
  "Inflation spike",
  "Rate cuts",
  "Crypto volatility",
  "ESG momentum",
  "Insurance shock",
  "Geopolitical risk",
] as const;

type ScenarioDraft = {
  title: string;
  impact: string;
  lesson: string;
};

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || "/api/insights";

const parseScenario = (text: string): ScenarioDraft | null => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*]\s*/, ""));

  const extract = (label: string) => {
    const line = lines.find((item) => item.toLowerCase().startsWith(label));
    if (!line) return "";
    const value = line.slice(label.length).replace(/^[^a-z0-9]+/i, "").trim();
    return value;
  };

  const title = extract("title");
  const impact = extract("impact");
  const lesson = extract("lesson");

  if (!title || !impact || !lesson) return null;
  return { title, impact, lesson };
};

export function AIScenarioForge() {
  const [theme, setTheme] = useState<(typeof themes)[number]>("Inflation spike");
  const [draft, setDraft] = useState("");
  const [parsed, setParsed] = useState<ScenarioDraft | null>(null);
  const queryClient = useQueryClient();

  const prompt = useMemo(() => {
    return `Generate a market scenario for Investverse City. Theme: ${theme}.\n\nFormat strictly as:\nTitle: ...\nImpact: ...\nLesson: ...\n\nConstraints:\n- Keep each line under 18 words.\n- Use clear, student-friendly language.\n- Tie impact to portfolio allocation or insurance protection.`;
  }, [theme]);

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
      setDraft(text);
      setParsed(parseScenario(text));
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!parsed) throw new Error("No scenario to save");
      return createSimulationScenario(parsed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simulation-scenarios"] });
    },
  });

  return (
    <div className="glass-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            AI Scenario Forge
          </h3>
          <p className="text-sm text-muted-foreground">
            Generate fresh market events to keep the simulation lab dynamic.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-semibold text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          Live prompt
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {themes.map((option) => (
          <Button
            key={option}
            variant="glass"
            size="sm"
            className={option === theme ? "border-primary bg-primary/10" : ""}
            onClick={() => setTheme(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          variant="neon"
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
        >
          {generateMutation.isPending ? "Generating..." : "Generate scenario"}
        </Button>
        {parsed && <Badge variant="outline">Ready to save</Badge>}
      </div>

      <div className="rounded-lg border border-border/50 bg-muted/20 p-4 min-h-[120px]">
        {generateMutation.isPending && (
          <p className="text-sm text-muted-foreground">Synthesizing a new event...</p>
        )}
        {!generateMutation.isPending && draft && (
          <p className="text-sm text-foreground whitespace-pre-line">{draft}</p>
        )}
        {!generateMutation.isPending && !draft && (
          <p className="text-sm text-muted-foreground">
            Pick a theme and generate an AI-crafted market scenario.
          </p>
        )}
        {generateMutation.error instanceof Error && (
          <p className="text-sm text-destructive mt-2">{generateMutation.error.message}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="glass"
          onClick={() => saveMutation.mutate()}
          disabled={!parsed || saveMutation.isPending}
        >
          {saveMutation.isPending ? "Saving..." : "Save to scenario feed"}
        </Button>
        {saveMutation.isSuccess && (
          <span className="text-xs text-success">Scenario added to the feed.</span>
        )}
        {saveMutation.error instanceof Error && (
          <span className="text-xs text-destructive">{saveMutation.error.message}</span>
        )}
      </div>
    </div>
  );
}
