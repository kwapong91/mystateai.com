import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOpportunities } from "@/lib/api";

export default async function AnalysisPage() {
  const opportunities = await fetchOpportunities();
  const analyzed = [...opportunities]
    .filter((item) => item.opportunityScore !== undefined)
    .sort((a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0));

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Intelligence"
          title="AI Analysis"
          description="Review the opportunities with completed AI scoring, fit signals, and surfaced risk areas."
        />

        <section className="grid gap-5 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Analyzed opportunities</p>
              <p className="mt-2 text-3xl font-semibold">{analyzed.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">High-fit analyses</p>
              <p className="mt-2 text-3xl font-semibold">
                {analyzed.filter((item) => (item.opportunityScore ?? 0) >= 80).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Average opportunity score</p>
              <p className="mt-2 text-3xl font-semibold">
                {Math.round(
                  analyzed.reduce((sum, item) => sum + (item.opportunityScore ?? 0), 0) / Math.max(analyzed.length, 1)
                )}
                %
              </p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Completed Analysis Queue</CardTitle>
            <p className="text-sm text-muted-foreground">
              Open any opportunity to review scope summary, requirements, deadlines, and AI risk flags.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyzed.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background p-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Badge>{item.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.agency}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>Due {item.dueDate}</span>
                    <span>•</span>
                    <span>{item.opportunityRating ?? "Scored"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    {item.opportunityScore ?? "—"}% score
                  </div>
                  <Link href={`/opportunities/${item.id}`}>
                    <Button>
                      View Analysis
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
