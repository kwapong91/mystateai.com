import { AppShell } from "@/components/AppShell";
import { OpportunityTable } from "@/components/OpportunityTable";
import { PageHeader } from "@/components/PageHeader";
import { fetchOpportunities } from "@/lib/api";

export default async function OpportunitiesPage() {
  const opportunities = await fetchOpportunities();

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Pipeline"
          title="Opportunities"
          description="Search, score, and filter solicitations to focus on the opportunities that best fit your capabilities."
        />
        <OpportunityTable opportunities={opportunities} />
      </div>
    </AppShell>
  );
}
