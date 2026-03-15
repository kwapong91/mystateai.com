import { Eye } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { DashboardSidebarOpportunity } from "@/components/dashboard/types";

export function WatchlistPanel({ items }: { items: DashboardSidebarOpportunity[] }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Watchlist</h2>
        <p className="text-lg text-muted-foreground">Opportunities you're monitoring</p>
      </div>

      <Card className="space-y-4 rounded-[28px] p-5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/opportunities/${item.id}`}
            className="flex items-start gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-accent/40"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-950/70 text-violet-300">
              <Eye className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-base text-muted-foreground">{item.agency}</p>
              <div className="mt-3 flex items-center gap-3">
                <Badge className="rounded-xl bg-secondary/80 px-3 py-1 text-sm font-medium text-foreground">
                  {item.category}
                </Badge>
                <span className="text-base font-semibold text-sky-400">{item.score ?? "—"}%</span>
              </div>
            </div>
          </Link>
        ))}
      </Card>
    </section>
  );
}
