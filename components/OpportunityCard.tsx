import Link from "next/link";
import { ArrowUpRight, Clock3, Landmark, Sparkles } from "lucide-react";

import { SaveOpportunityButton } from "@/components/SaveOpportunityButton";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OpportunityListItem } from "@/lib/types";

export function OpportunityCard({ opportunity }: { opportunity: OpportunityListItem }) {
  return (
    <Card className="transition duration-200 hover:-translate-y-0.5 hover:border-primary/30">
      <CardHeader className="gap-4 border-b border-border/60 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-lg">{opportunity.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge>{opportunity.category}</Badge>
              <Badge className="bg-transparent text-muted-foreground">{opportunity.status}</Badge>
            </div>
          </div>
          <ScoreBadge score={opportunity.opportunityScore} rating={opportunity.opportunityRating} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary" />
            <span>{opportunity.agency}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />
            <span>Due {opportunity.dueDate}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{opportunity.summary}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">Why This Is a Good Opportunity</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(opportunity.goodFitReasons ?? ["Awaiting AI scoring details."]).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Potential Concerns</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(opportunity.potentialConcerns ?? ["No concerns surfaced yet."]).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI Analysis Complete
            {opportunity.estimatedTimeSavedMinutes ? ` • Estimated time saved: ${opportunity.estimatedTimeSavedMinutes} minutes` : ""}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/opportunities/${opportunity.id}`}>
              <Button variant="default" size="sm">
                View AI Analysis
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <SaveOpportunityButton opportunityId={opportunity.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
