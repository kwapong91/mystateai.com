"use client";

import { useMemo, useState } from "react";

import { DashboardOpportunityCard } from "@/components/dashboard/OpportunityCard";
import { OpportunityFilters } from "@/components/dashboard/OpportunityFilters";

import type { DashboardOpportunity, OpportunityFilter } from "@/components/dashboard/types";

export function OpportunityList({ opportunities }: { opportunities: DashboardOpportunity[] }) {
  const [activeFilter, setActiveFilter] = useState<OpportunityFilter>("all");

  const filteredOpportunities = useMemo(() => {
    switch (activeFilter) {
      case "high-score":
        return opportunities.filter((item) => (item.opportunityScore ?? 0) >= 85);
      case "due-soon":
        return opportunities.filter((item) => item.daysUntilDue !== null && item.daysUntilDue <= 7);
      case "my-naics":
        return opportunities.filter((item) => item.naics.length > 0);
      default:
        return opportunities;
    }
  }, [activeFilter, opportunities]);

  return (
    <section className="space-y-6">
      <OpportunityFilters value={activeFilter} onChange={setActiveFilter} />
      <div className="space-y-5">
        {filteredOpportunities.map((opportunity) => (
          <DashboardOpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}
