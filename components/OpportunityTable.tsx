"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { SaveOpportunityButton } from "@/components/SaveOpportunityButton";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { OpportunityListItem } from "@/lib/types";

export function OpportunityTable({ opportunities }: { opportunities: OpportunityListItem[] }) {
  const [query, setQuery] = useState("");
  const [agency, setAgency] = useState("All agencies");
  const [category, setCategory] = useState("All categories");
  const [deadline, setDeadline] = useState("Any deadline");
  const [naics, setNaics] = useState("All NAICS");
  const deferredQuery = useDeferredValue(query);

  const agencies = useMemo(
    () => ["All agencies", ...new Set(opportunities.map((item) => item.agency))],
    [opportunities]
  );
  const categories = useMemo(
    () => ["All categories", ...new Set(opportunities.map((item) => item.category))],
    [opportunities]
  );
  const naicsOptions = useMemo(
    () => ["All NAICS", ...new Set(opportunities.flatMap((item) => item.naics))],
    [opportunities]
  );

  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesQuery =
        !deferredQuery ||
        item.title.toLowerCase().includes(deferredQuery.toLowerCase()) ||
        item.agency.toLowerCase().includes(deferredQuery.toLowerCase());
      const matchesAgency = agency === "All agencies" || item.agency === agency;
      const matchesCategory = category === "All categories" || item.category === category;
      const matchesNaics = naics === "All NAICS" || item.naics.includes(naics);
      const matchesDeadline =
        deadline === "Any deadline" ||
        (deadline === "Due in 7 days" && new Date(item.dueDate) <= new Date("2026-03-19")) ||
        (deadline === "Due this month" && new Date(item.dueDate).getMonth() === 2);

      return matchesQuery && matchesAgency && matchesCategory && matchesNaics && matchesDeadline;
    });
  }, [agency, category, deadline, deferredQuery, naics, opportunities]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search solicitations..."
          />
        </div>
        <select className="h-10 rounded-xl border bg-background px-3 text-sm" value={agency} onChange={(event) => setAgency(event.target.value)}>
          {agencies.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="h-10 rounded-xl border bg-background px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="h-10 rounded-xl border bg-background px-3 text-sm" value={deadline} onChange={(event) => setDeadline(event.target.value)}>
          {["Any deadline", "Due in 7 days", "Due this month"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="h-10 rounded-xl border bg-background px-3 text-sm" value={naics} onChange={(event) => setNaics(event.target.value)}>
          {naicsOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-secondary/50 text-muted-foreground">
              <tr>
                <th className="px-5 py-4 font-medium">Title</th>
                <th className="px-5 py-4 font-medium">Agency</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Due Date</th>
                <th className="px-5 py-4 font-medium">Opportunity Score</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/30">
                  <td className="px-5 py-4">
                    <Link href={`/opportunities/${item.id}`} className="font-medium hover:text-primary">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{item.agency}</td>
                  <td className="px-5 py-4">
                    <Badge>{item.category}</Badge>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{item.dueDate}</td>
                  <td className="px-5 py-4">
                    <ScoreBadge score={item.opportunityScore} rating={item.opportunityRating} />
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{item.status}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/opportunities/${item.id}`}
                        className="inline-flex items-center rounded-lg border px-3 py-2 text-xs font-medium hover:border-primary hover:text-primary"
                      >
                        Open
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                      <SaveOpportunityButton opportunityId={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
