export type OpportunityRating = "Excellent" | "Strong" | "Moderate" | "Low Fit";

export interface OpportunityListItem {
  id: string;
  title: string;
  agency: string;
  category: string;
  dueDate: string;
  postingDate?: string;
  status: string;
  summary: string;
  naics: string[];
  opportunityScore?: number;
  opportunityRating?: OpportunityRating;
  goodFitReasons?: string[];
  potentialConcerns?: string[];
  estimatedTimeSavedMinutes?: number;
}

export interface OpportunityDetail extends OpportunityListItem {
  detailUrl?: string;
  requirements: string[];
  documentsRequired: string[];
  deadlines: string[];
  subcontractingOpportunities: string[];
  bestFitContractors: string[];
}

export interface OpportunityAnalysis {
  id: string;
  title: string;
  agency: string;
  scopeSummary: string;
  technicalRequirements: string[];
  administrativeRequirements: string[];
  complianceRequirements: string[];
  deadlines: string[];
  risks: string[];
  documentsAnalyzed: string[];
}

export interface Partner {
  id: string;
  companyName: string;
  certifications: string[];
  capabilities: string[];
  location: string;
  naicsCodes: string[];
  industry: string;
}

export interface SavedOpportunity {
  id: string;
  title: string;
  agency: string;
  dueDate: string;
  opportunityScore?: number;
  opportunityRating?: OpportunityRating;
}

export interface DocumentRecord {
  id: string;
  opportunityId: string;
  name: string;
  group: "Proposal Documents" | "Attachments" | "Analysis Files";
  fileType: string;
  status: "Uploaded" | "Generated" | "Missing";
}

export interface DashboardMetrics {
  newThisWeek: number;
  recommended: number;
  upcomingDeadlines: number;
  savedOpportunities: number;
}
