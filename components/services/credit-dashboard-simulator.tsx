"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  CreditCard,
  Loader2,
  RefreshCw,
  Scale,
  TrendingUp,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BUREAU_SCORES,
  CREDIT_ACTIVITY,
  CREDIT_SPECIALIST,
  NEGATIVE_ITEMS,
  type BureauId,
  type BureauScore,
  type CreditActivity,
  type DisputeStatus,
  type NegativeItem,
  averageScore,
  scoreProgress,
  scoreRating,
} from "@/lib/credit-demo-data";
import { cn } from "@/lib/utils";

const ACTION_PLAN = [
  { id: "ap1", label: "Verify identity with all three bureaus", done: true },
  { id: "ap2", label: "Pull fresh tri-merge credit report", done: true },
  { id: "ap3", label: "Dispute inaccurate charge-off (Capital One)", done: true },
  { id: "ap4", label: "Send validation letter to Midland Credit", done: false },
  { id: "ap5", label: "Reduce revolving utilization below 30%", done: false },
  { id: "ap6", label: "Target 680+ score for rental pre-approval", done: false },
];

type ActionPlanItem = (typeof ACTION_PLAN)[number];

const DISPUTE_LABELS: Record<DisputeStatus, string> = {
  not_started: "Not started",
  in_review: "In review",
  sent: "Letter sent",
  removed: "Removed",
  verified: "Verified",
};

const DISPUTE_VARIANTS: Record<DisputeStatus, "secondary" | "warning" | "gold" | "success" | "outline"> = {
  not_started: "secondary",
  in_review: "warning",
  sent: "gold",
  removed: "success",
  verified: "outline",
};

function ScoreGauge({ score, className }: { score: number; className?: string }) {
  const progress = scoreProgress(score);
  const rating = scoreRating(score);

  return (
    <div className={cn("relative mx-auto h-28 w-40 sm:h-32 sm:w-48 lg:h-40 lg:w-56", className)}>
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          className="text-secondary"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(progress / 100) * 251} 251`}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">{score}</span>
        <span className="text-xs text-muted-foreground sm:text-sm">{rating}</span>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function BureauBadge({ bureau }: { bureau: BureauId }) {
  const labels = { experian: "EXP", equifax: "EQF", transunion: "TU" };
  const colors = {
    experian: "bg-[#1D4F91]/10 text-[#1D4F91]",
    equifax: "bg-[#9E1B32]/10 text-[#9E1B32]",
    transunion: "bg-[#00A6CE]/10 text-[#00A6CE]",
  };
  return (
    <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold uppercase", colors[bureau])}>
      {labels[bureau]}
    </span>
  );
}

function ActivityIcon({ type }: { type: CreditActivity["type"] }) {
  const icons = {
    pull: RefreshCw,
    dispute: Scale,
    score: TrendingUp,
    alert: AlertTriangle,
  };
  const Icon = icons[type];
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal/10">
      <Icon className="h-4 w-4 text-royal" />
    </div>
  );
}

export function CreditDashboardSimulator() {
  const [bureaus, setBureaus] = useState<BureauScore[]>(BUREAU_SCORES);
  const [negativeItems, setNegativeItems] = useState<NegativeItem[]>(NEGATIVE_ITEMS);
  const [activity, setActivity] = useState<CreditActivity[]>(CREDIT_ACTIVITY);
  const [actionPlan, setActionPlan] = useState<ActionPlanItem[]>(ACTION_PLAN);
  const [activeBureau, setActiveBureau] = useState<BureauId>("experian");
  const [loadingReport, setLoadingReport] = useState(true);
  const [pullingScore, setPullingScore] = useState(false);
  const [lastPulled, setLastPulled] = useState<string | null>(null);
  const [stats, setStats] = useState({ openDisputes: 3, removedItems: 1, totalNegative: 4, scoreChange: 15 });

  const avgScore = useMemo(() => averageScore(bureaus), [bureaus]);
  const activeBureauData = bureaus.find((b) => b.id === activeBureau) ?? bureaus[0];

  const loadReport = useCallback(async () => {
    setLoadingReport(true);
    try {
      const res = await fetch("/api/credit/report");
      if (!res.ok) throw new Error("Failed to load report");
      const data = await res.json();
      setBureaus(data.bureaus);
      setNegativeItems(data.negativeItems);
      setActivity(data.activity);
      setStats(data.stats);
      setLastPulled(data.pulledAt);
    } catch {
      setBureaus(BUREAU_SCORES);
      setNegativeItems(NEGATIVE_ITEMS);
    } finally {
      setLoadingReport(false);
    }
  }, []);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  async function handlePullScore() {
    setPullingScore(true);
    try {
      const res = await fetch("/api/credit/score");
      if (!res.ok) throw new Error("Failed to pull score");
      const data = await res.json();
      setBureaus(data.bureaus);
      setLastPulled(data.pulledAt);
      setStats((prev) => ({ ...prev, scoreChange: prev.scoreChange + 2 }));
      setActivity((prev) => [
        {
          id: `a-${Date.now()}`,
          date: data.pulledAt,
          title: "Manual score pull completed",
          detail: data.source,
          type: "pull",
        },
        ...prev,
      ]);
    } finally {
      setPullingScore(false);
    }
  }

  function startDispute(id: string) {
    setNegativeItems((prev) =>
      prev.map((item) => (item.id === id && item.disputeStatus === "not_started" ? { ...item, disputeStatus: "sent" } : item))
    );
    setStats((prev) => ({ ...prev, openDisputes: prev.openDisputes + 1 }));
  }

  function toggleAction(id: string) {
    setActionPlan((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  const planDone = actionPlan.filter((item) => item.done).length;

  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4">
        <Card className="h-full">
          <CardContent className="flex h-full flex-col p-4 lg:p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal/10 lg:h-10 lg:w-10">
              <CreditCard className="h-4 w-4 text-royal lg:h-5 lg:w-5" />
            </div>
            <p className="mt-2 text-xl font-bold text-navy lg:mt-3 lg:text-2xl">{loadingReport ? "—" : avgScore}</p>
            <p className="mt-auto text-xs text-muted-foreground lg:text-sm">Average FICO Score 8</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="flex h-full flex-col p-4 lg:p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 lg:h-10 lg:w-10">
              <TrendingUp className="h-4 w-4 text-emerald-700 lg:h-5 lg:w-5" />
            </div>
            <p className="mt-2 text-xl font-bold text-navy lg:mt-3 lg:text-2xl">+{stats.scoreChange}</p>
            <p className="mt-auto text-xs text-muted-foreground lg:text-sm">Points gained this cycle</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="flex h-full flex-col p-4 lg:p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 lg:h-10 lg:w-10">
              <Scale className="h-4 w-4 text-gold lg:h-5 lg:w-5" />
            </div>
            <p className="mt-2 text-xl font-bold text-navy lg:mt-3 lg:text-2xl">{stats.openDisputes}</p>
            <p className="mt-auto text-xs text-muted-foreground lg:text-sm">Open disputes in progress</p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="flex h-full flex-col p-4 lg:p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 lg:h-10 lg:w-10">
              <CheckCircle2 className="h-4 w-4 text-emerald-700 lg:h-5 lg:w-5" />
            </div>
            <p className="mt-2 text-xl font-bold text-navy lg:mt-3 lg:text-2xl">{stats.removedItems}</p>
            <p className="mt-auto text-xs text-muted-foreground lg:text-sm">Negative items removed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6 lg:items-start">
        <div className="space-y-4 lg:col-span-2 lg:space-y-6">
          <Card className="overflow-hidden border-navy/10 shadow-lg">
            <div className="gradient-navy px-4 py-5 text-white sm:px-6 sm:py-6 lg:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <Badge className="mb-3 border-white/20 bg-white/10 text-white hover:bg-white/10">
                    Tri-Bureau Monitoring
                  </Badge>
                  <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">Credit Score Dashboard</h2>
                  <p className="mt-2 max-w-lg text-sm text-white/70">
                    Pull and monitor scores from Experian, Equifax, and TransUnion via connected reporting APIs.
                  </p>
                </div>
                <Button
                  variant="gold"
                  className="w-full shrink-0 sm:w-auto"
                  onClick={handlePullScore}
                  disabled={pullingScore}
                >
                  {pullingScore ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Check Credit Score
                </Button>
              </div>
              {lastPulled && (
                <p className="mt-3 text-xs text-white/50">Last pulled {formatDateTime(lastPulled)} · FICO Score 8</p>
              )}
            </div>

            <CardContent className="p-0">
              <div className="grid gap-4 border-b p-4 sm:p-6 lg:grid-cols-[auto_1fr] lg:gap-6 lg:p-8">
                <ScoreGauge score={activeBureauData?.score ?? avgScore} />
                <div className="space-y-3 lg:space-y-4">
                  <Tabs value={activeBureau} onValueChange={(v) => setActiveBureau(v as BureauId)}>
                    <TabsList className="grid h-auto w-full grid-cols-3 gap-1.5 bg-secondary/30 p-1 sm:gap-2">
                      {bureaus.map((bureau) => (
                        <TabsTrigger
                          key={bureau.id}
                          value={bureau.id}
                          className="flex flex-col gap-0.5 px-1 py-2 text-center data-[state=active]:bg-card data-[state=active]:shadow-sm sm:px-2"
                        >
                          <span className="text-[10px] font-semibold sm:text-xs">{bureau.name}</span>
                          <span className="text-base font-bold text-navy sm:text-lg">{bureau.score}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {bureaus.map((bureau) => (
                      <TabsContent key={bureau.id} value={bureau.id} className="mt-4 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{bureau.model}</Badge>
                          <Badge variant={bureau.change >= 0 ? "success" : "destructive"}>
                            {bureau.change >= 0 ? "+" : ""}
                            {bureau.change} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last report: {formatDate(bureau.lastPull)} · Next scheduled pull: {formatDate(bureau.nextPull)}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: bureau.color }}
                          />
                          <span className="font-medium text-navy">{bureau.name} API</span>
                          <Badge variant="success" className="ml-auto">
                            Connected
                          </Badge>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>

              <div className="px-4 py-3 lg:px-8 lg:py-4">
                <h3 className="text-base font-semibold text-navy lg:text-lg">Negative Items & Disputes</h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stats.totalNegative} active items across bureaus · {stats.openDisputes} disputes in progress
                </p>
              </div>

              <div className="space-y-3 px-4 pb-4 lg:hidden">
                {negativeItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "space-y-3 rounded-xl border border-border/60 p-4",
                      item.disputeStatus === "removed" && "opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-navy">{item.creditor}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.accountType} · ${item.balance.toLocaleString()}
                        </p>
                      </div>
                      <BureauBadge bureau={item.bureau} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                      <Badge
                        variant={
                          item.impact === "high" ? "destructive" : item.impact === "medium" ? "warning" : "secondary"
                        }
                      >
                        {item.impact} impact
                      </Badge>
                      <Badge variant={DISPUTE_VARIANTS[item.disputeStatus]}>{DISPUTE_LABELS[item.disputeStatus]}</Badge>
                    </div>
                    <div className="flex justify-end">
                      {item.disputeStatus === "not_started" ? (
                        <Button variant="outline" size="sm" onClick={() => startDispute(item.id)}>
                          Dispute
                        </Button>
                      ) : item.disputeStatus === "removed" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <span className="text-xs text-muted-foreground">Tracking</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto px-4 pb-6 lg:block lg:px-8">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Creditor</th>
                      <th className="pb-3 pr-4 font-medium">Bureau</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 pr-4 font-medium">Impact</th>
                      <th className="pb-3 pr-4 font-medium">Dispute</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {negativeItems.map((item) => (
                      <tr key={item.id} className={cn(item.disputeStatus === "removed" && "opacity-60")}>
                        <td className="py-3 pr-4">
                          <p className="font-medium text-navy">{item.creditor}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.accountType} · ${item.balance.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3 pr-4">
                          <BureauBadge bureau={item.bureau} />
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">{item.status}</td>
                        <td className="py-3 pr-4">
                          <Badge
                            variant={
                              item.impact === "high" ? "destructive" : item.impact === "medium" ? "warning" : "secondary"
                            }
                          >
                            {item.impact}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant={DISPUTE_VARIANTS[item.disputeStatus]}>{DISPUTE_LABELS[item.disputeStatus]}</Badge>
                        </td>
                        <td className="py-3">
                          {item.disputeStatus === "not_started" ? (
                            <Button variant="outline" size="sm" onClick={() => startDispute(item.id)}>
                              Dispute
                            </Button>
                          ) : item.disputeStatus === "removed" ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <span className="text-xs text-muted-foreground">Tracking</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 lg:p-6">
              <CardTitle className="text-base lg:text-lg">Recent Activity</CardTitle>
              <CardDescription className="text-xs lg:text-sm">Score pulls, disputes, and bureau alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 lg:space-y-4 lg:p-6 lg:pt-0">
              {activity.slice(0, 5).map((item) => (
                <div key={item.id} className="flex gap-3">
                  <ActivityIcon type={item.type} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-navy">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{formatDateTime(item.date)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <Card>
            <CardHeader className="p-4 pb-2 lg:p-6">
              <CardTitle className="text-base lg:text-lg">Your Credit Specialist</CardTitle>
              <CardDescription className="text-xs lg:text-sm">Assigned for this demo session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 lg:p-6 lg:pt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-navy">{CREDIT_SPECIALIST.name}</p>
                <p className="text-sm text-muted-foreground">{CREDIT_SPECIALIST.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{CREDIT_SPECIALIST.email}</p>
              </div>
              <Badge variant="success">Accepting new clients</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 lg:p-6">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base lg:text-lg">Restoration Plan</CardTitle>
                <Badge variant="gold">
                  {planDone}/{actionPlan.length}
                </Badge>
              </div>
              <CardDescription className="text-xs lg:text-sm">Steps to reach your target score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4 lg:p-6 lg:pt-0">
              {actionPlan.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleAction(item.id)}
                  className="flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary/50"
                >
                  {item.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(item.done && "text-muted-foreground line-through")}>{item.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
