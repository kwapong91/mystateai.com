import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, CircleX, ExternalLink, FileText, Landmark, ShieldAlert, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { AIChatPanel } from "@/components/AIChatPanel";
import { AppShell } from "@/components/AppShell";
import { DeadlineTimeline } from "@/components/DeadlineTimeline";
import { RequirementList } from "@/components/RequirementList";
import { SaveOpportunityButton } from "@/components/SaveOpportunityButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAnalysis, fetchOpportunity } from "@/lib/api";

function buildNextSteps(opportunity: {
  category: string;
  documentsRequired: string[];
  deadlines: string[];
  goodFitReasons?: string[];
  subcontractingOpportunities: string[];
}) {
  const steps = [
    "Review required proposal templates and submission instructions",
    "Begin drafting the technical proposal around the highest-fit requirements",
    "Prepare past performance references that match this scope"
  ];

  if (opportunity.deadlines.some((item) => /site visit|pre[- ]?bid|conference/i.test(item))) {
    steps.unshift("Register for the site visit or pre-bid meeting");
  }

  if (opportunity.subcontractingOpportunities.length > 0 || opportunity.goodFitReasons?.some((item) => /partner|team/i.test(item))) {
    steps.splice(1, 0, "Identify subcontractor partners and confirm teaming gaps");
  }

  if (opportunity.documentsRequired.some((item) => /price|financial/i.test(item))) {
    steps.push("Assign pricing ownership early so the cost volume can progress in parallel");
  }

  return Array.from(new Set(steps)).slice(0, 5);
}

export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [opportunity, analysis] = await Promise.all([fetchOpportunity(id), fetchAnalysis(id)]);

  if (!opportunity || !analysis) {
    notFound();
  }

  const uploadedDocuments = new Set(analysis.documentsAnalyzed);
  const nextSteps = buildNextSteps(opportunity);
  const riskFlags = analysis.risks.length ? analysis.risks : opportunity.potentialConcerns ?? [];
  const score = opportunity.opportunityScore ?? 0;
  const scoreTone =
    score >= 90
      ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-400"
      : score >= 75
        ? "border-sky-500/70 bg-sky-500/10 text-sky-400"
        : "border-amber-500/70 bg-amber-500/10 text-amber-400";

  return (
    <AppShell rightPanel={<AIChatPanel />}>
      <div className="space-y-8 pb-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/opportunities">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to opportunities
            </Button>
          </Link>
          <SaveOpportunityButton opportunityId={opportunity.id} />
        </div>

        <Card className="rounded-[30px] border-border/70 bg-card/90 shadow-[0_24px_60px_rgba(15,23,42,0.2)]">
          <CardContent className="flex flex-col gap-8 p-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1 space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Opportunity Intelligence
                  </Badge>
                  <Badge className="bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground">{opportunity.category}</Badge>
                </div>
                <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
                  {opportunity.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-primary" />
                  {opportunity.agency}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Posted {opportunity.postingDate ?? "Not stated"}
                </span>
                <span className="inline-flex items-center gap-2 text-rose-400">
                  <CalendarDays className="h-4 w-4" />
                  Due {opportunity.dueDate}
                </span>
              </div>

              <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
                {analysis.scopeSummary}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {opportunity.detailUrl ? (
                  <Link href={opportunity.detailUrl} target="_blank">
                    <Button variant="outline">
                      Original posting
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : null}
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary">
                  AI Analysis Complete
                  {opportunity.estimatedTimeSavedMinutes ? (
                    <div className="mt-1 font-medium">
                      Estimated time saved: {opportunity.estimatedTimeSavedMinutes} minutes of RFP review
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-full xl:w-auto">
              <div className={`flex w-full flex-col items-center justify-center rounded-[24px] border px-8 py-6 text-center xl:w-[140px] ${scoreTone}`}>
                <span className="text-5xl font-semibold leading-none">{opportunity.opportunityScore ?? "—"}</span>
                <span className="mt-3 text-sm font-medium">Match Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <DeadlineTimeline deadlines={analysis.deadlines.length ? analysis.deadlines : opportunity.deadlines} />

        <div className="grid gap-5 xl:grid-cols-3">
          <Card className="rounded-[28px]">
            <CardHeader>
              <CardTitle>Why This Is a Good Opportunity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(opportunity.goodFitReasons ?? []).map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px]">
            <CardHeader>
              <CardTitle>Risk Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskFlags.map((risk) => (
                <div key={risk} className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm">{risk}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[28px]">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Card className="rounded-[28px]">
            <CardHeader>
              <CardTitle>AI Scope Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-muted-foreground">{analysis.scopeSummary}</p>
              <div className="flex flex-wrap gap-2">
                {opportunity.bestFitContractors.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="hidden xl:block" />
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <RequirementList title="Technical Requirements" items={analysis.technicalRequirements} />
          <RequirementList title="Administrative Requirements" items={analysis.administrativeRequirements} />
          <RequirementList title="Compliance Requirements" items={analysis.complianceRequirements} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)]">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {opportunity.documentsRequired.map((doc) => {
                const uploaded = uploadedDocuments.has(doc);
                return (
                  <div key={doc} className="flex items-center justify-between rounded-2xl border border-border/70 bg-background p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {uploaded ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>uploaded</span>
                        </>
                      ) : (
                        <>
                          <CircleX className="h-4 w-4 text-rose-500" />
                          <span>missing</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Opportunity Overview</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Snapshot of fit, timing, and partner readiness.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI scored opportunity
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Subcontracting opportunities</p>
              <p className="mt-2 text-lg font-semibold">{opportunity.subcontractingOpportunities.length}</p>
            </div>
            <div className="rounded-2xl bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Documents required</p>
              <p className="mt-2 text-lg font-semibold">{opportunity.documentsRequired.length}</p>
            </div>
            <div className="rounded-2xl bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Risk flags</p>
              <p className="mt-2 text-lg font-semibold">{riskFlags.length}</p>
            </div>
            <div className="rounded-2xl bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Fit score</p>
              <p className="mt-2 text-lg font-semibold">{opportunity.opportunityScore ?? "—"}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
