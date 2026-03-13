import type {
  DashboardMetrics,
  DocumentRecord,
  OpportunityAnalysis,
  OpportunityDetail,
  OpportunityListItem,
  Partner
} from "@/lib/types";
import {
  getAnalysisById,
  getDashboardMetrics,
  getDocuments,
  getOpportunities,
  getOpportunityById,
  getPartners
} from "@/lib/server-data";

export async function fetchOpportunities(): Promise<OpportunityListItem[]> {
  return getOpportunities();
}

export async function fetchOpportunity(id: string): Promise<OpportunityDetail | null> {
  return getOpportunityById(id);
}

export async function fetchAnalysis(id: string): Promise<OpportunityAnalysis | null> {
  return getAnalysisById(id);
}

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  return getDashboardMetrics();
}

export async function fetchPartners(): Promise<Partner[]> {
  return getPartners();
}

export async function fetchDocuments(): Promise<DocumentRecord[]> {
  return getDocuments();
}
