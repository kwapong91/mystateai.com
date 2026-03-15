import type { OpportunityListItem, OpportunityRating } from "@/lib/types";

export type OpportunityFilter = "all" | "high-score" | "due-soon" | "my-naics";

export interface DashboardOpportunity extends OpportunityListItem {
  valueLabel: string;
  scoreLabel: "Excellent" | "Strong Fit" | "Good" | "Moderate";
  isNew: boolean;
  daysUntilDue: number | null;
}

export interface DashboardSidebarOpportunity {
  id: string;
  title: string;
  agency: string;
  category: string;
  score?: number;
  scoreLabel?: string;
  daysUntilDue: number | null;
}

export function getDashboardScoreLabel(
  rating: OpportunityRating | undefined,
  score: number | undefined
): DashboardOpportunity["scoreLabel"] {
  if (rating === "Excellent" || (score ?? 0) >= 90) return "Excellent";
  if (rating === "Strong" || (score ?? 0) >= 80) return "Strong Fit";
  if ((score ?? 0) >= 70) return "Good";
  return "Moderate";
}
