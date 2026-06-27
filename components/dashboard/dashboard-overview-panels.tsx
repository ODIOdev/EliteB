import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_LEADS, MOCK_APPOINTMENTS, MOCK_STATS } from "@/lib/mock-data";
import { formatLeadStatus, formatAppointmentType } from "@/lib/types";
import { cn } from "@/lib/utils";

const PIPELINE_COLORS: Record<string, string> = {
  new: "#1E40AF",
  contacted: "#3B82F6",
  qualified: "#C9A227",
  showing: "#059669",
  closed: "#0A1628",
  lost: "#94A3B8",
};

function buildPipelineSegments() {
  const counts: Record<string, number> = {};
  for (const lead of MOCK_LEADS) {
    counts[lead.status] = (counts[lead.status] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([status, value]) => ({
      status,
      value,
      label: formatLeadStatus(status as Parameters<typeof formatLeadStatus>[0]),
      color: PIPELINE_COLORS[status] ?? "#94A3B8",
    }))
    .sort((a, b) => b.value - a.value);
}

function DonutChart({
  segments,
  total,
  centerLabel,
  centerValue,
}: {
  segments: { value: number; color: string }[];
  total: number;
  centerLabel: string;
  centerValue: string;
}) {
  const radius = 42;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative mx-auto h-36 w-36 shrink-0 sm:h-40 sm:w-40">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-muted/50" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          const pct = total > 0 ? seg.value / total : 0;
          const dash = pct * circumference;
          const circle = (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-navy sm:text-3xl">{centerValue}</p>
        <p className="text-[10px] text-muted-foreground sm:text-xs">{centerLabel}</p>
      </div>
    </div>
  );
}

function ZebraRow({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2 last:border-b-0 sm:px-4 sm:py-2.5",
        index % 2 === 0 ? "bg-card" : "bg-muted/45",
        className
      )}
    >
      {children}
    </div>
  );
}

function SlimListCard({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-xl shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/60 px-3 py-2.5 sm:px-4">
        <CardTitle className="text-sm font-semibold sm:text-base">{title}</CardTitle>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
          <Link href={href}>View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export function DashboardPipelineCard() {
  const segments = buildPipelineSegments();
  const sampleTotal = segments.reduce((sum, s) => sum + s.value, 0);
  const stats = MOCK_STATS;

  return (
    <Card className="h-full rounded-xl shadow-card">
      <CardHeader className="border-b border-border/60 px-4 py-3">
        <CardTitle className="text-base font-semibold">Lead Pipeline</CardTitle>
        <p className="text-xs text-muted-foreground">Status breakdown across active CRM records</p>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
          <DonutChart
            segments={segments}
            total={sampleTotal}
            centerValue={String(stats.totalLeads)}
            centerLabel="Total leads"
          />
          <ul className="w-full min-w-0 space-y-2 sm:flex-1">
            {segments.map((seg) => (
              <li key={seg.status} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
                  <span className="truncate text-muted-foreground">{seg.label}</span>
                </span>
                <span className="shrink-0 font-semibold tabular-nums text-navy">{seg.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
          <div className="rounded-lg bg-muted/50 px-2 py-2 text-center">
            <p className="text-lg font-bold text-navy">{stats.conversionRate}%</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">Conversion</p>
          </div>
          <div className="rounded-lg bg-muted/50 px-2 py-2 text-center">
            <p className="text-lg font-bold text-navy">{stats.pendingAppointments}</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">Appts open</p>
          </div>
          <div className="rounded-lg bg-muted/50 px-2 py-2 text-center">
            <p className="text-lg font-bold text-navy">{stats.activeListings}</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">Listings</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardListsColumn() {
  const recentLeads = MOCK_LEADS.slice(0, 5);
  const upcomingAppointments = MOCK_APPOINTMENTS.filter((a) => a.status !== "completed").slice(0, 4);

  return (
    <div className="flex flex-col gap-4">
      <SlimListCard title="Recent Leads" href="/dashboard/leads">
        <div>
          {recentLeads.map((lead, index) => (
            <ZebraRow key={lead.id} index={index}>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-tight">{lead.full_name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{lead.interest}</p>
              </div>
              <Badge
                variant={lead.status === "new" ? "gold" : lead.status === "closed" ? "success" : "secondary"}
                className="shrink-0 text-[10px]"
              >
                {formatLeadStatus(lead.status)}
              </Badge>
            </ZebraRow>
          ))}
        </div>
      </SlimListCard>

      <SlimListCard title="Upcoming Appointments" href="/dashboard/appointments">
        <div>
          {upcomingAppointments.map((appt, index) => (
            <ZebraRow key={appt.id} index={index}>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-tight">{appt.lead?.full_name}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {formatAppointmentType(appt.appointment_type)} —{" "}
                  {appt.scheduled_at ? new Date(appt.scheduled_at).toLocaleDateString() : "TBD"}
                </p>
              </div>
              <Badge
                variant={appt.status === "confirmed" ? "success" : "warning"}
                className="shrink-0 text-[10px]"
              >
                {formatLeadStatus(appt.status)}
              </Badge>
            </ZebraRow>
          ))}
        </div>
      </SlimListCard>
    </div>
  );
}

export function DashboardOverviewPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <DashboardPipelineCard />
      <DashboardListsColumn />
    </div>
  );
}
