import { ArrowRight, CalendarDays, DollarSign } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { DashboardOpportunity } from "@/components/dashboard/types";

const scoreToneClasses: Record<DashboardOpportunity["scoreLabel"], string> = {
  Excellent: "border-emerald-500/90 text-emerald-400",
  "Strong Fit": "border-sky-500/90 text-sky-400",
  Good: "border-violet-500/90 text-violet-400",
  Moderate: "border-amber-500/90 text-amber-400"
};

export function DashboardOpportunityCard({ opportunity }: { opportunity: DashboardOpportunity }) {
  return (
    <Link href={`/opportunities/${opportunity.id}`} className="block">
      <Card className="group rounded-[28px] border-border/70 bg-card/90 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_rgba(15,23,42,0.3)]">
        <div className="flex gap-5">
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-2xl">
                {opportunity.title}
              </h3>
              {opportunity.isNew ? (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                  New
                </span>
              ) : null}
            </div>

            <p className="text-xl text-muted-foreground">{opportunity.agency}</p>

            <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-5 text-base text-muted-foreground">
              <Badge className="rounded-xl bg-secondary/80 px-3 py-1 text-sm font-medium text-foreground">
                {opportunity.category}
              </Badge>
              <span className="inline-flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {opportunity.valueLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Due {opportunity.dueDate}
              </span>
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-sky-300">
                View Analysis
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
            <div
              className={cn(
                "flex h-28 w-28 flex-col items-center justify-center rounded-[22px] border bg-background/50 text-center",
                scoreToneClasses[opportunity.scoreLabel]
              )}
            >
              <span className="text-4xl font-semibold leading-none">{opportunity.opportunityScore ?? "—"}%</span>
              <span className="mt-2 text-xs font-semibold uppercase tracking-[0.18em]">Score</span>
            </div>
            <span className={cn("text-lg font-semibold", scoreToneClasses[opportunity.scoreLabel])}>
              {opportunity.scoreLabel}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
