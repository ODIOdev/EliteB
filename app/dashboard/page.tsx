import Link from "next/link";
import {
  Users, Building2, Calendar, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_STATS, MOCK_LEADS, MOCK_APPOINTMENTS, MOCK_ACTIVITY } from "@/lib/mock-data";
import { BRAND } from "@/lib/constants";
import { formatLeadStatus, formatAppointmentType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const stats = MOCK_STATS;

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, change: "+12%", up: true, icon: Users, href: "/dashboard/leads" },
    { label: "Active Listings", value: stats.activeListings, change: "+2", up: true, icon: Building2, href: "/dashboard/listings" },
    { label: "Pending Appointments", value: stats.pendingAppointments, change: "3 today", up: true, icon: Calendar, href: "/dashboard/appointments" },
    { label: "Monthly Inquiries", value: stats.monthlyInquiries, change: "+18%", up: true, icon: TrendingUp, href: "/dashboard/leads" },
    { label: "Conversion Rate", value: `${stats.conversionRate}%`, change: "+2.1%", up: true, icon: TrendingUp, href: "/dashboard/leads" },
    { label: "Monthly Revenue", value: formatPrice(stats.monthlyRevenue), change: "+8%", up: true, icon: DollarSign, href: "/dashboard/settings" },
  ];

  const recentLeads = MOCK_LEADS.slice(0, 5);
  const upcomingAppointments = MOCK_APPOINTMENTS.filter((a) => a.status !== "completed").slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, {BRAND.broker.name.split(" ")[0]}. Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="min-w-0">
            <Card className="h-full transition-all hover:shadow-md hover:border-gold/30">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal/10 lg:h-10 lg:w-10">
                    <stat.icon className="h-4 w-4 text-royal lg:h-5 lg:w-5" />
                  </div>
                  <div className={`flex shrink-0 items-center gap-0.5 text-[10px] font-medium sm:text-xs ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="mt-3 text-xl font-bold text-navy lg:mt-4 lg:text-2xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground lg:text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Leads</CardTitle>
            <Button variant="outline" size="sm" asChild><Link href="/dashboard/leads">View All</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{lead.full_name}</p>
                    <p className="text-xs text-muted-foreground">{lead.interest}</p>
                  </div>
                  <Badge variant={lead.status === "new" ? "gold" : lead.status === "closed" ? "success" : "secondary"}>
                    {formatLeadStatus(lead.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <Button variant="outline" size="sm" asChild><Link href="/dashboard/appointments">View All</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{appt.lead?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{formatAppointmentType(appt.appointment_type)} — {appt.scheduled_at ? new Date(appt.scheduled_at).toLocaleDateString() : "TBD"}</p>
                  </div>
                  <Badge variant={appt.status === "confirmed" ? "success" : "warning"}>{formatLeadStatus(appt.status)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_ACTIVITY.map((log) => (
              <div key={log.id} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-muted-foreground">{new Date(log.created_at).toLocaleString()}</span>
                <span className="font-medium capitalize">{log.action.replace(/_/g, " ")}</span>
                <span className="text-muted-foreground">— {log.entity_type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
