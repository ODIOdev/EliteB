"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_LEADS } from "@/lib/mock-data";
import { LEAD_STATUSES, LEAD_SOURCES } from "@/lib/constants";
import { formatLeadStatus, type Lead } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "gold" | "secondary" | "success" | "warning" | "destructive" | "outline"> = {
  new: "gold",
  contacted: "secondary",
  qualified: "success",
  showing: "warning",
  closed: "success",
  lost: "destructive",
};

function formatFollowUp(date?: string) {
  if (!date) return "—";
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function LeadRow({ lead, index }: { lead: Lead; index: number }) {
  const contact = [lead.email, lead.phone].filter(Boolean).join(" · ");

  return (
    <tr
      title={`${lead.full_name} — ${contact}`}
      className={cn(
        "border-b border-border/60 text-xs",
        index % 2 === 0 ? "bg-card" : "bg-muted/40"
      )}
    >
      <td className="truncate px-2 py-2 font-medium sm:px-3" title={lead.full_name}>
        {lead.full_name}
      </td>
      <td className="truncate px-2 py-2 sm:px-3" title={contact}>
        <span className="block truncate">{lead.email}</span>
        <span className="block truncate text-[10px] text-muted-foreground">{lead.phone}</span>
      </td>
      <td className="truncate px-2 py-2 text-muted-foreground sm:px-3" title={lead.interest}>
        {lead.interest || "—"}
      </td>
      <td className="px-2 py-2 sm:px-3">
        <Badge
          variant={STATUS_VARIANT[lead.status] || "secondary"}
          className="max-w-full truncate px-1.5 py-0 text-[10px]"
          title={formatLeadStatus(lead.status)}
        >
          {formatLeadStatus(lead.status)}
        </Badge>
      </td>
      <td className="px-2 py-2 sm:px-3">
        <Badge variant="outline" className="max-w-full truncate px-1.5 py-0 text-[10px]" title={lead.source}>
          {lead.source}
        </Badge>
      </td>
      <td className="truncate px-2 py-2 text-muted-foreground sm:px-3">{formatFollowUp(lead.follow_up_date)}</td>
      <td className="truncate px-2 py-2 text-muted-foreground sm:px-3" title={lead.notes}>
        {lead.notes || "—"}
      </td>
    </tr>
  );
}

function LeadMobileRow({ lead, index }: { lead: Lead; index: number }) {
  return (
    <div
      className={cn(
        "border-b border-border/60 px-3 py-2.5 last:border-b-0",
        index % 2 === 0 ? "bg-card" : "bg-muted/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{lead.full_name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{lead.interest}</p>
        </div>
        <Badge variant={STATUS_VARIANT[lead.status] || "secondary"} className="shrink-0 text-[10px]">
          {formatLeadStatus(lead.status)}
        </Badge>
      </div>
      <p className="mt-1 truncate text-[11px] text-muted-foreground">{lead.email}</p>
      <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-muted-foreground">
        <Badge variant="outline" className="max-w-full truncate text-[10px]">
          {lead.source}
        </Badge>
        <span className="truncate">Follow-up: {formatFollowUp(lead.follow_up_date)}</span>
      </div>
      {lead.notes && (
        <p className="mt-1 truncate text-[10px] text-muted-foreground" title={lead.notes}>
          {lead.notes}
        </p>
      )}
    </div>
  );
}

export function LeadsCrmContent() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      MOCK_LEADS.filter((lead) => {
        if (statusFilter !== "all" && lead.status !== statusFilter) return false;
        if (sourceFilter !== "all" && lead.source !== sourceFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          const haystack = [lead.full_name, lead.email, lead.interest, lead.phone, lead.notes]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }),
    [statusFilter, sourceFilter, search]
  );

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-navy">Leads CRM</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} leads shown</p>
        </div>
        <Button variant="gold" className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="relative min-w-0 flex-1 sm:min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter className="mr-2 h-4 w-4 shrink-0" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {LEAD_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {formatLeadStatus(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {LEAD_SOURCES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="min-w-0 overflow-hidden">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">No leads match your filters.</p>
          ) : (
            <>
              <div className="hidden md:block">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[13%]" />
                    <col className="w-[18%]" />
                    <col className="w-[16%]" />
                    <col className="w-[11%]" />
                    <col className="w-[11%]" />
                    <col className="w-[10%]" />
                    <col className="w-[21%]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b bg-muted/60 text-left text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                      <th className="truncate px-2 py-2 sm:px-3">Name</th>
                      <th className="truncate px-2 py-2 sm:px-3">Contact</th>
                      <th className="truncate px-2 py-2 sm:px-3">Interest</th>
                      <th className="truncate px-2 py-2 sm:px-3">Status</th>
                      <th className="truncate px-2 py-2 sm:px-3">Source</th>
                      <th className="truncate px-2 py-2 sm:px-3">Follow-up</th>
                      <th className="truncate px-2 py-2 sm:px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead, index) => (
                      <LeadRow key={lead.id} lead={lead} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden">
                {filtered.map((lead, index) => (
                  <LeadMobileRow key={lead.id} lead={lead} index={index} />
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
