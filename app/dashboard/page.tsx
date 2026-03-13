import { ArrowRight, Bookmark, Clock3, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

import { AIChatPanel } from "@/components/AIChatPanel";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { OpportunityCard } from "@/components/OpportunityCard";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardMetrics, fetchOpportunities } from "@/lib/api";

export default async function DashboardPage() {
  const [metrics, opportunities] = await Promise.all([fetchDashboardMetrics(), fetchOpportunities()]);
  const recommended = [...opportunities]
    .sort((a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0))
    .slice(0, 5);
  const latest = opportunities.slice(0, 4);

  return (
    <AppShell rightPanel={<AIChatPanel />}>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Workspace"
          title="Dashboard"
          description="Track the best-fit state opportunities, review AI-generated analysis, and decide where to bid faster."
          actions={
            <Link href="/opportunities">
              <Button>
                Explore opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="New Opportunities This Week"
            value={String(metrics.newThisWeek)}
            description="Fresh solicitations ingested from the source feed."
            icon={TrendingUp}
          />
          <MetricCard
            title="Recommended Opportunities"
            value={String(metrics.recommended)}
            description="High-fit opportunities with strong alignment signals."
            icon={Sparkles}
          />
          <MetricCard
            title="Upcoming Deadlines"
            value={String(metrics.upcomingDeadlines)}
            description="Deadlines approaching in the next 7 days."
            icon={Clock3}
          />
          <MetricCard
            title="Saved Opportunities"
            value={String(metrics.savedOpportunities)}
            description="Tracked opportunities awaiting your next decision."
            icon={Bookmark}
          />
        </div>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recommended Opportunities for You</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">Top 5 ranked by Opportunity Score.</p>
              </div>
              <Link href="/opportunities">
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommended.map((item) => (
                <OpportunityCard key={item.id} opportunity={item} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opportunity Feed</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Latest solicitations surfaced by mystateai.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {latest.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/opportunities/${item.id}`} className="font-medium hover:text-primary">
                        {item.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{item.agency}</p>
                      <p className="mt-2 text-sm text-muted-foreground">Due: {item.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-primary">{item.opportunityScore ?? "—"}%</p>
                      <p className="text-xs text-muted-foreground">{item.opportunityRating ?? "Pending"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
