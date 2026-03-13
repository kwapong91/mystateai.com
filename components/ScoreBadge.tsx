import { Badge } from "@/components/ui/badge";
import type { OpportunityRating } from "@/lib/types";

const scoreStyles = {
  Excellent: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  Strong: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300",
  Moderate: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
  "Low Fit": "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
};

export function scoreToRating(score?: number): OpportunityRating | undefined {
  if (typeof score !== "number") return undefined;
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Moderate";
  return "Low Fit";
}

export function ScoreBadge({ score, rating }: { score?: number; rating?: OpportunityRating }) {
  if (typeof score !== "number") {
    return <Badge className="bg-muted text-muted-foreground">Score pending</Badge>;
  }

  const resolvedRating = rating ?? scoreToRating(score) ?? "Moderate";

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-background text-sm font-semibold">
        {score}
      </div>
      <div className="space-y-1">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Opportunity Score</div>
        <Badge className={scoreStyles[resolvedRating]}>{resolvedRating}</Badge>
      </div>
    </div>
  );
}
