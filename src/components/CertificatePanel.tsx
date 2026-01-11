import { BadgeCheck, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

const tracks = [
  { title: "Investment Foundations", progress: 100, status: "Completed" },
  { title: "Insurance Literacy", progress: 80, status: "In progress" },
];

export function CertificatePanel() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Certificates</p>
          <h3 className="font-display text-lg font-semibold">Course Completions</h3>
        </div>
        <BadgeCheck className="w-5 h-5 text-success" />
      </div>
      <div className="space-y-3">
        {tracks.map((track) => (
          <div key={track.title} className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">{track.title}</p>
              <span className="text-xs text-muted-foreground">{track.status}</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${track.progress}%` }} />
            </div>
            {track.progress === 100 && (
              <Button variant="outline" size="sm" className="mt-2">
                <Download className="w-4 h-4" />
                Download Certificate
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
