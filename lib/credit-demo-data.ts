export type BureauId = "experian" | "equifax" | "transunion";

export type DisputeStatus = "not_started" | "in_review" | "sent" | "removed" | "verified";

export interface BureauScore {
  id: BureauId;
  name: string;
  score: number;
  change: number;
  model: string;
  lastPull: string;
  nextPull: string;
  color: string;
}

export interface NegativeItem {
  id: string;
  bureau: BureauId;
  creditor: string;
  accountType: string;
  balance: number;
  status: string;
  opened: string;
  disputeStatus: DisputeStatus;
  impact: "high" | "medium" | "low";
}

export interface CreditIntegration {
  id: string;
  name: string;
  provider: string;
  status: "connected" | "syncing" | "idle";
  lastSync: string;
  description: string;
}

export interface CreditActivity {
  id: string;
  date: string;
  title: string;
  detail: string;
  type: "pull" | "dispute" | "score" | "alert";
}

export const CREDIT_SPECIALIST = {
  name: "J Febry",
  title: "Credit Restoration Specialist",
  email: "credit@elitebrokersny.com",
};

export const BUREAU_SCORES: BureauScore[] = [
  {
    id: "experian",
    name: "Experian",
    score: 612,
    change: 18,
    model: "FICO Score 8",
    lastPull: "2026-06-24T09:15:00Z",
    nextPull: "2026-07-24T09:15:00Z",
    color: "#1D4F91",
  },
  {
    id: "equifax",
    name: "Equifax",
    score: 598,
    change: 12,
    model: "FICO Score 8",
    lastPull: "2026-06-24T09:15:00Z",
    nextPull: "2026-07-24T09:15:00Z",
    color: "#9E1B32",
  },
  {
    id: "transunion",
    name: "TransUnion",
    score: 605,
    change: 15,
    model: "FICO Score 8",
    lastPull: "2026-06-24T09:15:00Z",
    nextPull: "2026-07-24T09:15:00Z",
    color: "#00A6CE",
  },
];

export const NEGATIVE_ITEMS: NegativeItem[] = [
  {
    id: "ni1",
    bureau: "experian",
    creditor: "Capital One",
    accountType: "Credit Card",
    balance: 1842,
    status: "Charge-off",
    opened: "2019-03",
    disputeStatus: "sent",
    impact: "high",
  },
  {
    id: "ni2",
    bureau: "equifax",
    creditor: "Midland Credit",
    accountType: "Collection",
    balance: 640,
    status: "Open",
    opened: "2021-08",
    disputeStatus: "in_review",
    impact: "high",
  },
  {
    id: "ni3",
    bureau: "transunion",
    creditor: "Synchrony Bank",
    accountType: "Revolving",
    balance: 920,
    status: "Late 90 days",
    opened: "2020-11",
    disputeStatus: "not_started",
    impact: "medium",
  },
  {
    id: "ni4",
    bureau: "experian",
    creditor: "Portfolio Recovery",
    accountType: "Collection",
    balance: 415,
    status: "Removed",
    opened: "2018-06",
    disputeStatus: "removed",
    impact: "high",
  },
  {
    id: "ni5",
    bureau: "equifax",
    creditor: "Verizon Wireless",
    accountType: "Utility",
    balance: 210,
    status: "Past due",
    opened: "2023-01",
    disputeStatus: "sent",
    impact: "low",
  },
];

export const CREDIT_INTEGRATIONS: CreditIntegration[] = [
  {
    id: "experian-connect",
    name: "Experian Connect",
    provider: "Experian",
    status: "connected",
    lastSync: "2026-06-27T08:00:00Z",
    description: "Tri-bureau report pulls & FICO Score 8",
  },
  {
    id: "equifax-oneview",
    name: "Equifax OneView",
    provider: "Equifax",
    status: "connected",
    lastSync: "2026-06-27T08:00:00Z",
    description: "Credit file monitoring & dispute routing",
  },
  {
    id: "transunion-tux",
    name: "TransUnion TUX",
    provider: "TransUnion",
    status: "connected",
    lastSync: "2026-06-27T08:00:00Z",
    description: "Consumer disclosure & score simulator",
  },
  {
    id: "fico-api",
    name: "FICO Score API",
    provider: "FICO",
    status: "connected",
    lastSync: "2026-06-27T07:45:00Z",
    description: "Official FICO 8 scoring model",
  },
  {
    id: "array-io",
    name: "Array Credit Reporting",
    provider: "Array",
    status: "connected",
    lastSync: "2026-06-27T08:00:00Z",
    description: "Unified tri-merge credit report aggregation",
  },
  {
    id: "vantage-3",
    name: "VantageScore 3.0",
    provider: "VantageScore",
    status: "idle",
    lastSync: "2026-06-20T12:00:00Z",
    description: "Secondary score model for lender comparison",
  },
];

export const CREDIT_ACTIVITY: CreditActivity[] = [
  {
    id: "a1",
    date: "2026-06-27T08:00:00Z",
    title: "Tri-bureau report synced",
    detail: "Experian, Equifax, and TransUnion via Array aggregation",
    type: "pull",
  },
  {
    id: "a2",
    date: "2026-06-25T14:30:00Z",
    title: "Dispute letter sent",
    detail: "Capital One charge-off — Experian dispute #EXP-2026-0412",
    type: "dispute",
  },
  {
    id: "a3",
    date: "2026-06-22T09:00:00Z",
    title: "Score increase detected",
    detail: "TransUnion FICO 8 up 15 points since last cycle",
    type: "score",
  },
  {
    id: "a4",
    date: "2026-06-18T16:45:00Z",
    title: "New inquiry alert",
    detail: "Hard pull from Chase — mortgage pre-qualification",
    type: "alert",
  },
];

export function averageScore(scores: BureauScore[]) {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, b) => sum + b.score, 0) / scores.length);
}

export function scoreRating(score: number) {
  if (score >= 800) return "Exceptional";
  if (score >= 740) return "Very Good";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
}

export function scoreProgress(score: number) {
  return Math.min(100, Math.max(0, ((score - 300) / 550) * 100));
}
