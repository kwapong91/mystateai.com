import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { SavedOpportunitiesClient } from "@/components/SavedOpportunitiesClient";
import { fetchOpportunities } from "@/lib/api";

export default async function SavedOpportunitiesPage() {
  const opportunities = await fetchOpportunities();

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Queue"
          title="Saved Opportunities"
          description="Return to high-priority opportunities you want to monitor, review, and share with your team."
        />
        <SavedOpportunitiesClient opportunities={opportunities} />
      </div>
    </AppShell>
  );
}
