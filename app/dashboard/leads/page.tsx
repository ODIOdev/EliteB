"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_LEADS } from "@/lib/mock-data";
import { LEAD_STATUSES, LEAD_SOURCES } from "@/lib/constants";
import { formatLeadStatus } from "@/lib/types";

const statusVariant: Record<string, "gold" | "secondary" | "success" | "warning" | "destructive" | "outline"> = {
  new: "gold",
  contacted: "secondary",
  qualified: "success",
  showing: "warning",
  closed: "success",
  lost: "destructive",
};

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_LEADS.filter((lead) => {
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;
    if (sourceFilter !== "all" && lead.source !== sourceFilter) return false;
    if (search && !lead.full_name.toLowerCase().includes(search.toLowerCase()) && !lead.email?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Leads CRM</h1>
          <p className="text-muted-foreground">{filtered.length} leads</p>
        </div>
        <Button variant="gold"><Plus className="mr-2 h-4 w-4" />Add Lead</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {LEAD_STATUSES.map((s) => <SelectItem key={s} value={s}>{formatLeadStatus(s)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {LEAD_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Contact</th>
                  <th className="px-4 py-3 text-left font-medium">Interest</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Follow-up</th>
                  <th className="px-4 py-3 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-secondary/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                    <td className="px-4 py-3">
                      <div>{lead.email}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.interest}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[lead.status] || "secondary"}>{formatLeadStatus(lead.status)}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="outline">{lead.source}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.follow_up_date || "—"}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate text-muted-foreground">{lead.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
