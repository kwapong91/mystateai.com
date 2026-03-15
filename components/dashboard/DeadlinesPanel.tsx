import { AlertCircle, Clock3 } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { DashboardSidebarOpportunity } from "@/components/dashboard/types";

const urgencyClasses = {
  high: {
    iconWrap: "bg-rose-950/70 text-rose-400",
    meta: "text-rose-400"
  },
  medium: {
    iconWrap: "bg-amber-950/70 text-amber-300",
    meta: "text-amber-300"
  },
  normal: {
    iconWrap: "bg-sky-950/70 text-sky-400",
    meta: "text-sky-400"
  }
};

function getUrgency(daysUntilDue: number | null) {
  if (daysUntilDue !== null && daysUntilDue <= 2) return "high";
  if (daysUntilDue !== null && daysUntilDue <= 5) return "medium";
  return "normal";
}

function getUrgencyLabel(daysUntilDue: number | null) {
  if (daysUntilDue === null) return "Upcoming";
  if (daysUntilDue <= 2) return "Urgent";
  if (daysUntilDue <= 5) return "Soon";
  return "Upcoming";
}

function getDaysLabel(daysUntilDue: number | null) {
  if (daysUntilDue === null) return "Date pending";
  return `${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"} left`;
}

export function DeadlinesPanel({ items }: { items: DashboardSidebarOpportunity[] }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Upcoming Deadlines</h2>
        <p className="text-lg text-muted-foreground">Tracked opportunities you're reviewing</p>
      </div>

      <Card className="space-y-4 rounded-[28px] p-5">
        {items.map((item) => {
          const urgency = urgencyClasses[getUrgency(item.daysUntilDue)];
          const Icon = item.daysUntilDue !== null && item.daysUntilDue <= 2 ? AlertCircle : Clock3;

          return (
            <Link
              key={item.id}
              href={`/opportunities/${item.id}`}
              className="flex items-start gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-accent/40"
            >
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", urgency.iconWrap)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-base text-muted-foreground">{item.agency}</p>
                <p className={cn("mt-2 text-base font-medium", urgency.meta)}>
                  {getDaysLabel(item.daysUntilDue)} {" \u2022 "} {getUrgencyLabel(item.daysUntilDue)}
                </p>
              </div>
            </Link>
          );
        })}
      </Card>
    </section>
  );
}
