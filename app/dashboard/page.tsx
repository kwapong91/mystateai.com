import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/AppShell";
import { AIInsightsBanner } from "@/components/dashboard/AIInsightsBanner";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DeadlinesPanel } from "@/components/dashboard/DeadlinesPanel";
import { OpportunityList } from "@/components/dashboard/OpportunityList";
import { WatchlistPanel } from "@/components/dashboard/WatchlistPanel";
import { getDashboardScoreLabel } from "@/components/dashboard/types";
import { Button } from "@/components/ui/button";
import { fetchOpportunities } from "@/lib/api";

function parseDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

function getDaysUntilDue(value: string) {
  const dueDate = parseDate(value);
  if (!dueDate) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  return Math.max(0, Math.ceil((startOfDueDate.getTime() - startOfToday.getTime()) / 86_400_000));
}

function getEstimatedValue(score: number | undefined, index: number) {
  const values = ["$2.4M", "$1.2M", "$860K", "$3.1M", "$640K"];
  if ((score ?? 0) >= 90) return "$2.4M";
  if ((score ?? 0) >= 85) return "$1.2M";
  return values[index % values.length];
}

export default async function DashboardPage() {
  const opportunities = await fetchOpportunities();
  const recommended = [...opportunities]
    .sort((a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0))
    .slice(0, 6)
    .map((item, index) => ({
      ...item,
      valueLabel: getEstimatedValue(item.opportunityScore, index),
      scoreLabel: getDashboardScoreLabel(item.opportunityRating, item.opportunityScore),
      isNew: index === 0 || Boolean(item.postingDate && getDaysUntilDue(item.postingDate) !== null && getDaysUntilDue(item.postingDate)! <= 7),
      daysUntilDue: getDaysUntilDue(item.dueDate)
    }));

  const deadlines = [...recommended]
    .filter((item) => item.daysUntilDue !== null)
    .sort((a, b) => (a.daysUntilDue ?? Number.MAX_SAFE_INTEGER) - (b.daysUntilDue ?? Number.MAX_SAFE_INTEGER))
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: item.title,
      agency: item.agency,
      category: item.category,
      daysUntilDue: item.daysUntilDue
    }));

  const watchlist = recommended.slice(1, 4).map((item) => ({
    id: item.id,
    title: item.title,
    agency: item.agency,
    category: item.category,
    score: item.opportunityScore,
    scoreLabel: item.scoreLabel,
    daysUntilDue: item.daysUntilDue
  }));

  return (
    <AppShell>
      <div className="space-y-10 pb-8">
        <DashboardHeader
          title="Dashboard"
          subtitle="Find and evaluate government contracts faster"
          actions={
            <Link href="/opportunities">
              <Button className="h-11 rounded-2xl px-5 text-base shadow-[0_18px_36px_rgba(37,99,235,0.28)]">
                <Sparkles className="mr-2 h-4 w-4" />
                Explore Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.55fr)_360px]">
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">Opportunities For You</h2>
              <p className="text-lg text-muted-foreground">
                AI-matched opportunities based on your capabilities and past performance
              </p>
            </div>

            <AIInsightsBanner
              insights={[
                "3 new opportunities match your NAICS codes",
                "1 high-fit contract closes in 5 days"
              ]}
            />

            <OpportunityList opportunities={recommended} />
          </section>

          <aside className="space-y-10">
            <DeadlinesPanel items={deadlines} />
            <WatchlistPanel items={watchlist} />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
