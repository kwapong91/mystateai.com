"use client";

import { useEffect, useMemo, useState } from "react";
import { Bookmark } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { OpportunityCard } from "@/components/OpportunityCard";
import type { OpportunityListItem } from "@/lib/types";

const storageKey = "mystateai-saved-opportunities";

export function SavedOpportunitiesClient({ opportunities }: { opportunities: OpportunityListItem[] }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      try {
        setSavedIds(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as string[]);
      } catch {
        setSavedIds([]);
      }
    };

    sync();
    window.addEventListener("mystateai:saved-opportunities-changed", sync as EventListener);
    return () => window.removeEventListener("mystateai:saved-opportunities-changed", sync as EventListener);
  }, []);

  const savedOpportunities = useMemo(
    () => opportunities.filter((item) => savedIds.includes(item.id)),
    [opportunities, savedIds]
  );

  if (savedOpportunities.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No saved opportunities yet"
        description="Save opportunities from the dashboard or table to build a review queue for your team."
      />
    );
  }

  return (
    <div className="grid gap-5">
      {savedOpportunities.map((item) => (
        <OpportunityCard key={item.id} opportunity={item} />
      ))}
    </div>
  );
}
