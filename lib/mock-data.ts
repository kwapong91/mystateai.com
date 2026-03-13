import type { DocumentRecord, OpportunityAnalysis, OpportunityDetail, Partner } from "@/lib/types";

export const mockOpportunities: OpportunityDetail[] = [
  {
    id: "89364",
    title: "Marketing Maryland Scenic Byways Guides & Maps Printing",
    agency: "Department of Commerce",
    category: "Printing",
    dueDate: "4/15/2026",
    postingDate: "3/10/2026 7:53:33 PM",
    status: "Open",
    summary:
      "The Department of Commerce is seeking a contractor to print and deliver 100,000 guidebooks and 200,000 maps for Maryland's Scenic Byways.",
    naics: ["323111", "561439"],
    opportunityScore: 82,
    opportunityRating: "Strong",
    goodFitReasons: [
      "Matches NAICS codes for print production",
      "Well-defined scope with clear deliverables",
      "Similar projects can support small-business teaming"
    ],
    potentialConcerns: ["25% MBE participation requirement", "Mandatory approvals may tighten production windows"],
    estimatedTimeSavedMinutes: 45,
    detailUrl: "https://emma.maryland.gov/page.aspx/en/bpm/process_manage_extranet/89364",
    requirements: [
      "Print 100,000 guidebooks",
      "Print 200,000 maps",
      "Deliver materials to designated distribution centers",
      "Provide proofs for final acceptance",
      "Use the required financial proposal form"
    ],
    documentsRequired: [
      "Technical Proposal",
      "Price Sheet",
      "Past Performance",
      "MBE Plan",
      "Insurance Certificate"
    ],
    deadlines: [
      "Pre-Bid Meeting: not stated",
      "Questions Due: March 25, 2026, 12:00 PM Local Time",
      "Proposal Due: April 15, 2026, 12:00 PM Local Time",
      "Bid Opening: not stated"
    ],
    subcontractingOpportunities: ["Printing services", "Distribution logistics", "Graphic design support"],
    bestFitContractors: ["Printing companies", "Marketing agencies", "Fulfillment providers"]
  },
  {
    id: "89363",
    title: "ERP Modernization: Oracle Fusion Cloud (SaaS) Support Services",
    agency: "Prince George's Board of Education",
    category: "Cloud-based infrastructure as a service",
    dueDate: "3/11/2026",
    postingDate: "3/10/2026 6:59:52 PM",
    status: "Open",
    summary:
      "Prince George's Board of Education requests proposals for Oracle Fusion Cloud license acquisition, migration, integration, and support services.",
    naics: ["541512", "518210"],
    opportunityScore: 74,
    opportunityRating: "Strong",
    goodFitReasons: [
      "High-value modernization scope",
      "Strong fit for public-sector systems integrators",
      "Ongoing support services can expand revenue"
    ],
    potentialConcerns: ["Complex staffing and certification requirements", "Tight proposal turnaround"],
    estimatedTimeSavedMinutes: 55,
    detailUrl: "https://emma.maryland.gov/page.aspx/en/bpm/process_manage_extranet/89363",
    requirements: [
      "Acquire Oracle Fusion Cloud licenses",
      "Execute migration and implementation plan",
      "Integrate with existing district systems",
      "Provide training, documentation, and support",
      "Show Oracle-certified partner credentials"
    ],
    documentsRequired: [
      "Technical Proposal",
      "Price Sheet",
      "Functional Requirements Spreadsheet",
      "Implementation Plan",
      "Oracle Partner Certification"
    ],
    deadlines: [
      "Pre-Bid Meeting: not stated",
      "Questions Due: not stated",
      "Proposal Due: March 11, 2026",
      "Bid Opening: not stated"
    ],
    subcontractingOpportunities: ["Data migration specialists", "Training providers", "Cloud integration support"],
    bestFitContractors: ["Oracle implementation partners", "Public-sector systems integrators"]
  },
  {
    id: "89361",
    title: "Identity and Access Management Professional Services",
    agency: "Comptroller of Maryland",
    category: "Information technology consultation services",
    dueDate: "3/31/2026",
    postingDate: "3/10/2026 4:20:28 PM",
    status: "Open",
    summary:
      "The Comptroller seeks supplemental services to establish, mature, and operate a centralized identity and access management program.",
    naics: ["541512", "541519"],
    opportunityScore: 71,
    opportunityRating: "Strong",
    goodFitReasons: [
      "Clear managed-services and advisory scope",
      "Strong public-sector IAM demand",
      "Room for specialty subcontractors"
    ],
    potentialConcerns: ["Security compliance burden", "Key personnel quality will heavily influence competitiveness"],
    estimatedTimeSavedMinutes: 50,
    detailUrl: "https://emma.maryland.gov/page.aspx/en/bpm/process_manage_extranet/89361",
    requirements: [
      "Establish and mature IAM program operations",
      "Provide design and implementation support",
      "Deliver training and documentation",
      "Meet Maryland security requirements"
    ],
    documentsRequired: ["Technical Proposal", "Financial Form", "Key Personnel Resumes", "Past Performance"],
    deadlines: [
      "Pre-Bid Meeting: not stated",
      "Questions Due: not stated",
      "Proposal Due: March 31, 2026",
      "Bid Opening: not stated"
    ],
    subcontractingOpportunities: ["IAM engineering", "IGA specialists", "Managed security support"],
    bestFitContractors: ["IAM consultancies", "Systems integrators", "Managed security providers"]
  }
];

export const mockAnalyses: Record<string, OpportunityAnalysis> = {
  "89364": {
    id: "89364",
    title: "Marketing Maryland Scenic Byways Guides & Maps Printing",
    agency: "Department of Commerce",
    scopeSummary:
      "This opportunity covers printing and distribution of Maryland Scenic Byways guidebooks and maps, along with proposal packaging, pricing, and contract compliance requirements.",
    technicalRequirements: [
      "Print 100,000 guidebooks and 200,000 maps",
      "Provide compatible drafts and final proofs",
      "Deliver final approved products to designated locations",
      "Use the required Excel price form without modification"
    ],
    administrativeRequirements: [
      "Submit technical and financial proposals separately through eMMA",
      "Acknowledge all addenda in the transmittal letter",
      "Include required affidavits and subcontractor forms"
    ],
    complianceRequirements: [
      "MBE participation documentation may be required",
      "Maintain required insurance coverage",
      "Meet security, audit, and data handling clauses where applicable"
    ],
    deadlines: [
      "Questions Due: March 25, 2026, 12:00 PM Local Time",
      "Proposal Due: April 15, 2026, 12:00 PM Local Time"
    ],
    risks: ["MBE participation required", "Performance bond or insurance obligations may increase cost"],
    documentsAnalyzed: ["Technical Proposal", "Price Sheet", "MBE Plan"]
  },
  "89363": {
    id: "89363",
    title: "ERP Modernization: Oracle Fusion Cloud (SaaS) Support Services",
    agency: "Prince George's Board of Education",
    scopeSummary:
      "The work spans Oracle Fusion Cloud licensing, migration, implementation, integration, and post-deployment support for ERP modernization.",
    technicalRequirements: [
      "Acquire and configure Oracle Fusion Cloud licenses",
      "Execute migration, testing, and cutover planning",
      "Integrate ERP with district systems",
      "Deliver training, SLAs, and support"
    ],
    administrativeRequirements: [
      "Submit required addendum acknowledgements",
      "Provide partner credentials and references",
      "Follow the required proposal packaging"
    ],
    complianceRequirements: [
      "Protect student and staff data during migration",
      "Meet public-sector contract and privacy requirements"
    ],
    deadlines: ["Proposal Due: March 11, 2026"],
    risks: ["Tight procurement timeline", "High experience threshold for prime contractors"],
    documentsAnalyzed: ["Technical Proposal", "Implementation Plan", "Oracle Partner Certification"]
  },
  "89361": {
    id: "89361",
    title: "Identity and Access Management Professional Services",
    agency: "Comptroller of Maryland",
    scopeSummary:
      "The state seeks help designing and operating a centralized IAM program with implementation, operational support, and knowledge transfer.",
    technicalRequirements: [
      "Design identity lifecycle and access controls",
      "Integrate IAM capabilities with existing systems",
      "Provide documentation, training, and support"
    ],
    administrativeRequirements: [
      "Submit a technical proposal, financial form, and key personnel materials",
      "Demonstrate public-sector IAM experience"
    ],
    complianceRequirements: [
      "Meet Maryland security standards",
      "Provide relevant compliance and security evidence"
    ],
    deadlines: ["Proposal Due: March 31, 2026"],
    risks: ["Key personnel strength is critical", "Security controls may narrow the field"],
    documentsAnalyzed: ["Technical Proposal", "Financial Form", "Past Performance"]
  }
};

export const mockPartners: Partner[] = [
  {
    id: "partner-1",
    companyName: "Harbor State Builders",
    certifications: ["MBE", "WBE"],
    capabilities: ["General contracting", "Site preparation", "Public works estimating"],
    location: "Baltimore, MD",
    naicsCodes: ["236220", "237310"],
    industry: "Construction"
  },
  {
    id: "partner-2",
    companyName: "Capital Civic Tech",
    certifications: ["DBE"],
    capabilities: ["ERP implementation", "Systems integration", "Cloud migration"],
    location: "Hyattsville, MD",
    naicsCodes: ["541512", "541519"],
    industry: "Information Technology"
  },
  {
    id: "partner-3",
    companyName: "Blue Maple Printworks",
    certifications: ["MBE"],
    capabilities: ["Commercial printing", "Fulfillment", "Direct mail logistics"],
    location: "Frederick, MD",
    naicsCodes: ["323111", "561910"],
    industry: "Printing"
  }
];

export const mockDocuments: DocumentRecord[] = [
  {
    id: "doc-1",
    opportunityId: "89364",
    name: "Technical Proposal Draft.pdf",
    group: "Proposal Documents",
    fileType: "PDF",
    status: "Uploaded"
  },
  {
    id: "doc-2",
    opportunityId: "89364",
    name: "Attachment B-Financial Proposal Form_Print-Del.xlsx",
    group: "Attachments",
    fileType: "XLSX",
    status: "Uploaded"
  },
  {
    id: "doc-3",
    opportunityId: "89364",
    name: "89364_analysis.json",
    group: "Analysis Files",
    fileType: "JSON",
    status: "Generated"
  }
];
