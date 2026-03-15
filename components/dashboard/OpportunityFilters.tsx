"use client";

import { cn } from "@/lib/utils";

import type { OpportunityFilter } from "@/components/dashboard/types";

const FILTERS: Array<{ id: OpportunityFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "high-score", label: "High Score" },
  { id: "due-soon", label: "Due Soon" },
  { id: "my-naics", label: "My NAICS" }
];

export function OpportunityFilters({
  value,
  onChange
}: {
  value: OpportunityFilter;
  onChange: (value: OpportunityFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {FILTERS.map((filter) => {
        const isActive = filter.id === value;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={cn(
              "rounded-2xl border px-5 py-3 text-base font-medium transition-all duration-200",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-[0_18px_28px_rgba(37,99,235,0.28)]"
                : "border-border/80 bg-card/70 text-muted-foreground hover:border-primary/40 hover:bg-accent/60 hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
