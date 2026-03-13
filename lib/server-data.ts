import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type {
  DashboardMetrics,
  DocumentRecord,
  OpportunityAnalysis,
  OpportunityDetail,
  OpportunityListItem,
  OpportunityRating,
  Partner
} from "@/lib/types";
import { mockAnalyses, mockDocuments, mockOpportunities, mockPartners } from "@/lib/mock-data";

const rootDir = process.cwd();

type RawOpportunity = {
  solicitation_id: string;
  title: string;
  agency: string;
  category: string;
  due_date: string;
  posting_date?: string;
  detail_url?: string;
  status?: string;
  summary?: string;
  requirements?: string[];
  documents_required?: string[];
  deadlines?: string[];
  subcontracting_opportunities?: string[];
  best_fit_contractors?: string[];
};

type RawAnalysis = {
  solicitation_id: string;
  title: string;
  agency: string;
  scope_summary?: string;
  technical_requirements?: string[];
  administrative_requirements?: string[];
  compliance_requirements?: string[];
  deadlines?: string[];
  risks?: string[];
  documents_analyzed?: string[];
};

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.join(rootDir, filePath);
  const data = await readFile(fullPath, "utf-8");
  return JSON.parse(data) as T;
}

function deriveNaics(category: string, title: string): string[] {
  const normalized = `${category} ${title}`.toLowerCase();
  if (normalized.includes("print")) return ["323111", "561439"];
  if (normalized.includes("cloud") || normalized.includes("software") || normalized.includes("identity")) {
    return ["541512", "518210"];
  }
  if (normalized.includes("construction") || normalized.includes("soil") || normalized.includes("road")) {
    return ["236220", "237310"];
  }
  if (normalized.includes("training")) return ["611430", "541611"];
  return ["541990"];
}

function deriveScoreCard(item: RawOpportunity) {
  const signals = `${item.category} ${item.title} ${item.summary ?? ""}`.toLowerCase();
  if (signals.includes("print")) {
    return {
      opportunityScore: 82,
      opportunityRating: "Strong" as OpportunityRating,
      goodFitReasons: [
        "Matches NAICS codes for print production",
        "Well-defined scope with clear deliverables",
        "Subcontracting and fulfillment paths are visible"
      ],
      potentialConcerns: [
        "MBE participation requirement may apply",
        "Tight production and delivery schedule"
      ],
      estimatedTimeSavedMinutes: 45
    };
  }
  if (signals.includes("cloud") || signals.includes("identity") || signals.includes("software")) {
    return {
      opportunityScore: 74,
      opportunityRating: "Strong" as OpportunityRating,
      goodFitReasons: [
        "High-value modernization scope",
        "Strong match for IT integrators and public sector teams",
        "Ongoing support work can extend revenue"
      ],
      potentialConcerns: [
        "Complex integration and staffing requirements",
        "Reference and certification thresholds may be high"
      ],
      estimatedTimeSavedMinutes: 55
    };
  }
  if (signals.includes("construction")) {
    return {
      opportunityScore: 63,
      opportunityRating: "Moderate" as OpportunityRating,
      goodFitReasons: [
        "Public infrastructure demand remains steady",
        "Partnering could improve win potential"
      ],
      potentialConcerns: [
        "Bonding and site logistics may increase cost",
        "Field schedule risk is higher than software procurements"
      ],
      estimatedTimeSavedMinutes: 35
    };
  }
  return {
    opportunityScore: 48,
    opportunityRating: "Low Fit" as OpportunityRating,
    goodFitReasons: ["Open public-sector opportunity with reviewable documentation"],
    potentialConcerns: [
      "Lower fit without clear category alignment",
      "Additional qualification review required"
    ],
    estimatedTimeSavedMinutes: 20
  };
}

function normalizeOpportunity(item: RawOpportunity): OpportunityListItem {
  return {
    id: item.solicitation_id,
    title: item.title,
    agency: item.agency,
    category: item.category || "General",
    dueDate: item.due_date,
    postingDate: item.posting_date,
    status: item.status ?? "Open",
    summary: item.summary ?? "No summary available.",
    naics: deriveNaics(item.category, item.title),
    ...deriveScoreCard(item)
  };
}

export async function getOpportunities(): Promise<OpportunityListItem[]> {
  try {
    const processed = await readJsonFile<RawOpportunity[]>("data/emma_ai_processed.json");
    return processed.map(normalizeOpportunity);
  } catch {
    return mockOpportunities.map((item) => ({ ...item }));
  }
}

export async function getOpportunityById(id: string): Promise<OpportunityDetail | null> {
  try {
    const opportunities = await readJsonFile<RawOpportunity[]>("data/emma_ai_processed.json");
    const item = opportunities.find((entry) => entry.solicitation_id === id);
    if (!item) return mockOpportunities.find((entry) => entry.id === id) ?? null;

    return {
      ...normalizeOpportunity(item),
      detailUrl: item.detail_url,
      requirements: item.requirements ?? [],
      documentsRequired: item.documents_required ?? [],
      deadlines: item.deadlines ?? [],
      subcontractingOpportunities: item.subcontracting_opportunities ?? [],
      bestFitContractors: item.best_fit_contractors ?? []
    };
  } catch {
    return mockOpportunities.find((entry) => entry.id === id) ?? null;
  };
}

export async function getAnalysisById(id: string): Promise<OpportunityAnalysis | null> {
  try {
    const analysis = await readJsonFile<RawAnalysis>(`data/analysis/${id}_analysis.json`);
    return {
      id: analysis.solicitation_id,
      title: analysis.title,
      agency: analysis.agency,
      scopeSummary: analysis.scope_summary ?? "AI summary is not available yet.",
      technicalRequirements: analysis.technical_requirements ?? [],
      administrativeRequirements: analysis.administrative_requirements ?? [],
      complianceRequirements: analysis.compliance_requirements ?? [],
      deadlines: analysis.deadlines ?? [],
      risks: analysis.risks ?? [],
      documentsAnalyzed: analysis.documents_analyzed ?? []
    };
  } catch {
    const mockAnalysis = mockAnalyses[id];
    if (mockAnalysis) return mockAnalysis;

    const detail = await getOpportunityById(id);
    if (!detail) return null;

    return {
      id: detail.id,
      title: detail.title,
      agency: detail.agency,
      scopeSummary: detail.summary,
      technicalRequirements: detail.requirements,
      administrativeRequirements: [],
      complianceRequirements: [],
      deadlines: detail.deadlines,
      risks: detail.potentialConcerns ?? [],
      documentsAnalyzed: detail.documentsRequired
    };
  }
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const opportunities = await getOpportunities();
  const now = new Date("2026-03-12T00:00:00-04:00");
  const sevenDaysAhead = new Date(now);
  sevenDaysAhead.setDate(sevenDaysAhead.getDate() + 7);

  const upcomingDeadlines = opportunities.filter((item) => {
    const parsed = new Date(item.dueDate);
    return !Number.isNaN(parsed.valueOf()) && parsed >= now && parsed <= sevenDaysAhead;
  }).length;

  return {
    newThisWeek: opportunities.length,
    recommended: opportunities.filter((item) => (item.opportunityScore ?? 0) >= 70).length,
    upcomingDeadlines,
    savedOpportunities: 3
  };
}

export async function getPartners(): Promise<Partner[]> {
  return mockPartners;
}

export async function getDocuments(): Promise<DocumentRecord[]> {
  const docRoot = path.join(rootDir, "data/documents");
  try {
    const folders = await readdir(docRoot, { withFileTypes: true });
    const derived = folders
      .filter((entry) => entry.isDirectory())
      .flatMap((entry) => {
        if (entry.name !== "89364" && entry.name !== "89363") return [];
        return [
          {
            id: `${entry.name}-attachment`,
            opportunityId: entry.name,
            name: `Source attachments for ${entry.name}`,
            group: "Attachments" as const,
            fileType: "Folder",
            status: "Uploaded" as const
          }
        ];
      });
    return [...mockDocuments, ...derived];
  } catch {
    return mockDocuments;
  }
}
