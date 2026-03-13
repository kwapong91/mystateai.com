import Link from "next/link";
import { AlertTriangle, ArrowLeft, CheckCircle2, CircleX, ExternalLink, FileText, ShieldAlert, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { AIChatPanel } from "@/components/AIChatPanel";
import { AppShell } from "@/components/AppShell";
import { DeadlineTimeline } from "@/components/DeadlineTimeline";
import { PageHeader } from "@/components/PageHeader";
import { RequirementList } from "@/components/RequirementList";
import { SaveOpportunityButton } from "@/components/SaveOpportunityButton";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAnalysis, fetchOpportunity } from "@/lib/api";

export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [opportunity, analysis] = await Promise.all([fetchOpportunity(id), fetchAnalysis(id)]);

  if (!opportunity || !analysis) {
    notFound();
  }

  const uploadedDocuments = new Set(analysis.documentsAnalyzed);

  return (
    <AppShell rightPanel={<AIChatPanel />}>
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/opportunities">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to opportunities
            </Button>
          </Link>
          <SaveOpportunityButton opportunityId={opportunity.id} />
        </div>

        <PageHeader
          eyebrow="Opportunity Intelligence"
          title={opportunity.title}
          description={`Agency: ${opportunity.agency} • Posting date: ${opportunity.postingDate ?? "Not stated"} • Due date: ${opportunity.dueDate}`}
          actions={
            opportunity.detailUrl ? (
              <Link href={opportunity.detailUrl} target="_blank">
                <Button variant="outline">
                  Original posting
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : null
          }
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardContent className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Agency</p>
                <p className="mt-2 font-medium">{opportunity.agency}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Category</p>
                <p className="mt-2 font-medium">{opportunity.category}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Posting Date</p>
                <p className="mt-2 font-medium">{opportunity.postingDate ?? "Not stated"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Due Date</p>
                <p className="mt-2 font-medium">{opportunity.dueDate}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <ScoreBadge score={opportunity.opportunityScore} rating={opportunity.opportunityRating} />
              <div>
                <p className="text-sm font-medium">Why This Is a Good Opportunity</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {(opportunity.goodFitReasons ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Potential Concerns</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {(opportunity.potentialConcerns ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              {opportunity.estimatedTimeSavedMinutes ? (
                <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary">
                  AI Analysis Complete
                  <div className="mt-1 font-medium">Estimated time saved: {opportunity.estimatedTimeSavedMinutes} minutes of RFP review</div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>Risk Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(analysis.risks.length ? analysis.risks : opportunity.potentialConcerns ?? []).map((risk) => (
                <div key={risk} className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm">{risk}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <RequirementList title="Technical Requirements" items={analysis.technicalRequirements} />
          <RequirementList title="Administrative Requirements" items={analysis.administrativeRequirements} />
          <RequirementList title="Compliance Requirements" items={analysis.complianceRequirements} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
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

          <DeadlineTimeline deadlines={analysis.deadlines.length ? analysis.deadlines : opportunity.deadlines} />
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
              <p className="mt-2 text-lg font-semibold">{(analysis.risks.length ? analysis.risks : opportunity.potentialConcerns ?? []).length}</p>
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
