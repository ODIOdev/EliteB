"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
  DollarSign,
  FileText,
  Receipt,
  Send,
  Shield,
  User,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TAX_DEADLINE = new Date("2026-04-15T23:59:59");
const DEMO_PRO = {
  name: "J Febry, EA",
  title: "Enrolled Agent · Real Estate Tax Specialist",
  email: "tax@elitebrokersny.com",
};

const CHECKLIST = [
  { id: "w2", label: "W-2 or 1099 income forms" },
  { id: "1098", label: "1098 mortgage interest statement" },
  { id: "property", label: "Rental property income & expenses" },
  { id: "id", label: "Government-issued photo ID" },
  { id: "prior", label: "Prior year tax return (if available)" },
] as const;

type ChecklistId = (typeof CHECKLIST)[number]["id"];

const FORM_STEPS = [
  { value: "personal", label: "Personal", icon: User, description: "Identity & filing status" },
  { value: "income", label: "Income", icon: DollarSign, description: "Wages & earnings" },
  { value: "deductions", label: "Deductions", icon: Receipt, description: "Credits & write-offs" },
  { value: "property", label: "Real Estate", icon: Building2, description: "Property & mortgage" },
] as const;

type FormStep = (typeof FORM_STEPS)[number]["value"];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  filingStatus: "",
  dependents: "",
  w2Income: "",
  selfEmployment: "",
  rentalIncome: "",
  mortgageInterest: "",
  propertyTax: "",
  charitable: "",
  businessExpenses: "",
  notes: "",
};

function daysUntilDeadline() {
  const now = new Date();
  const diff = TAX_DEADLINE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function parseAmount(value: string) {
  const n = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function MiniRing({
  value,
  max = 100,
  strokeClass = "stroke-royal",
}: {
  value: number;
  max?: number;
  strokeClass?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg className="h-11 w-11 shrink-0 -rotate-90" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r={radius} fill="none" className="stroke-muted/30" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        className={strokeClass}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

const glassStatTabClass =
  "group flex h-auto w-full flex-col gap-3 rounded-2xl border-2 border-border bg-card/80 p-4 text-left shadow-card backdrop-blur-xl transition-all hover:border-border hover:bg-card hover:shadow-card-md data-[state=active]:border-royal data-[state=active]:bg-card data-[state=active]:shadow-card-md data-[state=active]:ring-1 data-[state=active]:ring-royal/20";

export function TaxDashboardSimulator() {
  const [form, setForm] = useState(initialForm);
  const [checked, setChecked] = useState<Record<ChecklistId, boolean>>({
    w2: false,
    "1098": false,
    property: false,
    id: false,
    prior: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState<FormStep>("personal");

  const daysLeft = daysUntilDeadline();
  const checklistDone = Object.values(checked).filter(Boolean).length;

  const filledFields = useMemo(() => {
    const keys = Object.keys(form) as (keyof typeof form)[];
    return keys.filter((k) => form[k].trim().length > 0).length;
  }, [form]);

  const progress = Math.min(
    100,
    Math.round((filledFields / Object.keys(form).length) * 55 + (checklistDone / CHECKLIST.length) * 45)
  );

  const estimatedRefund = useMemo(() => {
    const withheld = parseAmount(form.w2Income) * 0.22;
    const owed =
      parseAmount(form.w2Income) * 0.18 +
      parseAmount(form.selfEmployment) * 0.25 +
      parseAmount(form.rentalIncome) * 0.15;
    const deductions =
      parseAmount(form.mortgageInterest) +
      parseAmount(form.propertyTax) +
      parseAmount(form.charitable) +
      parseAmount(form.businessExpenses);
    return Math.round(withheld - owed + deductions * 0.12);
  }, [form]);

  function updateField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSubmitted(false);
  }

  function toggleCheck(id: ChecklistId) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    setSubmitted(false);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const refundLabel = estimatedRefund >= 0 ? "Estimated refund" : "Estimated balance due";
  const refundDisplay =
    estimatedRefund >= 0
      ? `$${estimatedRefund.toLocaleString()}`
      : `-$${Math.abs(estimatedRefund).toLocaleString()}`;

  return (
    <div className="space-y-8">
      <Tabs defaultValue="deadline" className="space-y-4">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-3 bg-transparent p-0 xl:grid-cols-4">
          <TabsTrigger value="deadline" className={glassStatTabClass}>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-royal" />
              </div>
              <MiniRing value={daysLeft} max={365} strokeClass="stroke-royal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">{daysLeft}</p>
              <p className="text-xs text-muted-foreground">Days until Apr 15 deadline</p>
            </div>
          </TabsTrigger>

          <TabsTrigger value="progress" className={glassStatTabClass}>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
                <FileText className="h-5 w-5 text-gold" />
              </div>
              <MiniRing value={progress} strokeClass="stroke-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">{progress}%</p>
              <p className="text-xs text-muted-foreground">Return preparation progress</p>
            </div>
          </TabsTrigger>

          <TabsTrigger value="refund" className={glassStatTabClass}>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
                <Wallet className="h-5 w-5 text-emerald-700" />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200/80 bg-emerald-50/80 text-xs font-semibold text-emerald-700 backdrop-blur-sm">
                {estimatedRefund >= 0 ? "REF" : "DUE"}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">{refundDisplay}</p>
              <p className="text-xs text-muted-foreground">{refundLabel}</p>
            </div>
          </TabsTrigger>

          <TabsTrigger value="documents" className={glassStatTabClass}>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
                <Shield className="h-5 w-5 text-royal" />
              </div>
              <MiniRing value={checklistDone} max={CHECKLIST.length} strokeClass="stroke-royal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">
                {checklistDone}/{CHECKLIST.length}
              </p>
              <p className="text-xs text-muted-foreground">Documents ready to upload</p>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deadline" className="mt-0">
          <div className="glass-panel rounded-2xl border-2 border-border p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tax season countdown</p>
                <p className="mt-1 text-lg font-semibold text-navy">Federal filing deadline: April 15, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <MiniRing value={daysLeft} max={365} strokeClass="stroke-royal" />
                <span className="text-3xl font-bold text-navy">{daysLeft}</span>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-royal transition-all duration-500"
                style={{ width: `${Math.min(100, ((365 - daysLeft) / 365) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Track key dates and avoid late-filing penalties.</p>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-0">
          <div className="glass-panel rounded-2xl border-2 border-border p-5 backdrop-blur-xl sm:p-6">
            <p className="text-sm font-medium text-muted-foreground">Preparation breakdown</p>
            <p className="mt-1 text-lg font-semibold text-navy">{progress}% complete</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm p-4 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground">Form fields filled</p>
                <p className="mt-1 text-xl font-bold text-navy">
                  {filledFields}/{Object.keys(form).length}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm p-4 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground">Checklist items ready</p>
                <p className="mt-1 text-xl font-bold text-navy">
                  {checklistDone}/{CHECKLIST.length}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="refund" className="mt-0">
          <div className="glass-panel rounded-2xl border-2 border-border p-5 backdrop-blur-xl sm:p-6">
            <p className="text-sm font-medium text-muted-foreground">Live estimate (demo)</p>
            <p className="mt-1 text-3xl font-bold text-navy">{refundDisplay}</p>
            <p className="mt-1 text-sm text-muted-foreground">{refundLabel}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "W-2 withholding est.", value: `$${Math.round(parseAmount(form.w2Income) * 0.22).toLocaleString()}` },
                { label: "Deductions impact", value: `$${Math.round((parseAmount(form.mortgageInterest) + parseAmount(form.propertyTax) + parseAmount(form.charitable) + parseAmount(form.businessExpenses)) * 0.12).toLocaleString()}` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm px-3 py-2 text-sm backdrop-blur-sm"
                >
                  <span className="text-muted-foreground">{item.label}: </span>
                  <span className="font-semibold text-navy">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <div className="glass-panel rounded-2xl border-2 border-border p-5 backdrop-blur-xl sm:p-6">
            <p className="text-sm font-medium text-muted-foreground">Document readiness</p>
            <p className="mt-1 text-lg font-semibold text-navy">
              {checklistDone} of {CHECKLIST.length} items marked ready
            </p>
            <div className="mt-4 space-y-2">
              {CHECKLIST.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur-sm px-3 py-2.5 backdrop-blur-sm"
                >
                  {checked[item.id] ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn("text-sm", checked[item.id] && "text-muted-foreground line-through")}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="space-y-6 lg:col-span-2">
        <Card className="h-fit overflow-hidden border-navy/10 shadow-lg">
          <div className="gradient-navy px-6 py-6 text-white md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge className="mb-3 border-white/20 bg-white/10 text-white hover:bg-white/10">
                  Tax Year 2025
                </Badge>
                <h2 className="font-display text-2xl font-bold md:text-3xl">Tax Return Filing</h2>
                <p className="mt-2 max-w-lg text-sm text-white/70">
                  Complete each section below, then submit to file with your assigned tax professional.
                </p>
              </div>
              <div className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-bold text-gold">{progress}%</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/60">Complete</p>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <CardContent className="p-0">
            <Tabs value={activeStep} onValueChange={(v) => setActiveStep(v as FormStep)} className="w-full">
              <div className="border-b bg-secondary/20 px-4 py-4 md:px-6">
                <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 lg:grid-cols-4">
                  {FORM_STEPS.map((step) => (
                    <TabsTrigger
                      key={step.value}
                      value={step.value}
                      className="flex h-auto flex-col items-start gap-1 rounded-xl border border-transparent bg-card px-3 py-3 text-left shadow-card data-[state=active]:border-gold/40 data-[state=active]:bg-card data-[state=active]:shadow-card-md"
                    >
                      <step.icon className="h-4 w-4 text-royal data-[state=active]:text-gold" />
                      <span className="text-sm font-semibold text-navy">{step.label}</span>
                      <span className="hidden text-xs text-muted-foreground sm:block">{step.description}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="px-4 py-6 md:px-8 md:py-8">
                <TabsContent value="personal" className="mt-0 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">Personal Information</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Tell us who is filing and how.</p>
                  </div>
                  <div className="grid gap-5 rounded-xl border bg-secondary/20 p-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full legal name</Label>
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 555-5555"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Filing status</Label>
                    <Select value={form.filingStatus} onValueChange={(v) => updateField("filingStatus", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="mfj">Married filing jointly</SelectItem>
                        <SelectItem value="mfs">Married filing separately</SelectItem>
                        <SelectItem value="hoh">Head of household</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="dependents">Number of dependents</Label>
                    <Input
                      id="dependents"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={form.dependents}
                      onChange={(e) => updateField("dependents", e.target.value)}
                    />
                  </div>
                  </div>
                </TabsContent>

                <TabsContent value="income" className="mt-0 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">Income Sources</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Report all taxable income for the year.</p>
                  </div>
                  <div className="grid gap-5 rounded-xl border bg-secondary/20 p-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="w2Income">W-2 wages (annual)</Label>
                    <Input
                      id="w2Income"
                      placeholder="85000"
                      value={form.w2Income}
                      onChange={(e) => updateField("w2Income", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="selfEmployment">Self-employment income</Label>
                    <Input
                      id="selfEmployment"
                      placeholder="12000"
                      value={form.selfEmployment}
                      onChange={(e) => updateField("selfEmployment", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="rentalIncome">Rental / investment income</Label>
                    <Input
                      id="rentalIncome"
                      placeholder="24000"
                      value={form.rentalIncome}
                      onChange={(e) => updateField("rentalIncome", e.target.value)}
                    />
                  </div>
                  </div>
                </TabsContent>

                <TabsContent value="deductions" className="mt-0 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">Deductions & Credits</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Reduce your taxable income where eligible.</p>
                  </div>
                  <div className="grid gap-5 rounded-xl border bg-secondary/20 p-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="charitable">Charitable contributions</Label>
                    <Input
                      id="charitable"
                      placeholder="2500"
                      value={form.charitable}
                      onChange={(e) => updateField("charitable", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessExpenses">Business expenses</Label>
                    <Input
                      id="businessExpenses"
                      placeholder="4200"
                      value={form.businessExpenses}
                      onChange={(e) => updateField("businessExpenses", e.target.value)}
                    />
                  </div>
                  </div>
                </TabsContent>

                <TabsContent value="property" className="mt-0 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">Real Estate & Property</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Mortgage, property taxes, and notes for your preparer.</p>
                  </div>
                  <div className="grid gap-5 rounded-xl border bg-secondary/20 p-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mortgageInterest">Mortgage interest paid</Label>
                    <Input
                      id="mortgageInterest"
                      placeholder="14500"
                      value={form.mortgageInterest}
                      onChange={(e) => updateField("mortgageInterest", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyTax">Property taxes paid</Label>
                    <Input
                      id="propertyTax"
                      placeholder="6800"
                      value={form.propertyTax}
                      onChange={(e) => updateField("propertyTax", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="notes">Notes for your tax professional</Label>
                    <Textarea
                      id="notes"
                      placeholder="Sold a rental in 2025, 1031 exchange questions, home office deduction..."
                      rows={4}
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                    />
                  </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="border-t bg-secondary/10 px-4 py-4 md:px-8 md:py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-navy">
                    Step {FORM_STEPS.findIndex((s) => s.value === activeStep) + 1} of {FORM_STEPS.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {progress}% ready to file · Est.{" "}
                    {estimatedRefund >= 0
                      ? `$${estimatedRefund.toLocaleString()} refund`
                      : `$${Math.abs(estimatedRefund).toLocaleString()} due`}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {activeStep !== "personal" && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setActiveStep(FORM_STEPS[FORM_STEPS.findIndex((s) => s.value === activeStep) - 1].value)
                      }
                    >
                      Back
                    </Button>
                  )}
                  {activeStep !== "property" ? (
                    <Button
                      variant="navy"
                      onClick={() =>
                        setActiveStep(FORM_STEPS[FORM_STEPS.findIndex((s) => s.value === activeStep) + 1].value)
                      }
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button variant="gold" size="lg" onClick={handleSubmit}>
                      <Send className="mr-2 h-4 w-4" />
                      File with Tax Professional
                    </Button>
                  )}
                </div>
              </div>

              {submitted && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-semibold">Submission received</p>
                      <p className="mt-1">
                        {form.fullName || "Your return"} has been queued for review by {DEMO_PRO.name}. You would
                        receive a confirmation email and secure document upload link in a live version.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Season Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {[
              { date: "Jan 27", event: "IRS e-file opens", done: true },
              { date: "Mar 15", event: "Gather property & investment docs", done: true },
              { date: "Apr 15", event: "Federal filing deadline", done: false },
              { date: "Oct 15", event: "Extension deadline (if filed)", done: false },
            ].map((item) => (
              <div key={item.event} className="flex gap-3">
                <Receipt className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-navy">{item.date}</p>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
                {item.done && (
                  <Badge variant="secondary" className="ml-auto shrink-0">
                    Done
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Tax Professional</CardTitle>
              <CardDescription>Assigned specialist for this demo session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-semibold text-white">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-navy">{DEMO_PRO.name}</p>
                <p className="text-sm text-muted-foreground">{DEMO_PRO.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{DEMO_PRO.email}</p>
              </div>
              <Badge variant="success">Available this tax season</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Checklist</CardTitle>
              <CardDescription>Mark items you have ready to upload</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {CHECKLIST.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className="flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary/50"
                >
                  {checked[item.id] ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(checked[item.id] && "text-muted-foreground line-through")}>{item.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
