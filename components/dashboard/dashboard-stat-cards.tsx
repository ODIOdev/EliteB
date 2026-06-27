import Link from "next/link";
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_STATS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StatCardConfig = {
  label: string;
  displayValue: string;
  numericValue: number;
  max: number;
  change: string;
  up: boolean;
  icon: LucideIcon;
  href: string;
  iconBg: string;
  iconColor: string;
  barClass: string;
  caption: string;
};

function buildStatCards(): StatCardConfig[] {
  const stats = MOCK_STATS;

  return [
    {
      label: "Total Leads",
      displayValue: String(stats.totalLeads),
      numericValue: stats.totalLeads,
      max: 60,
      change: "+12%",
      up: true,
      icon: Users,
      href: "/dashboard/leads",
      iconBg: "bg-royal/10 border-royal/15",
      iconColor: "text-royal",
      barClass: "bg-royal",
      caption: "vs. 42 last month",
    },
    {
      label: "Active Listings",
      displayValue: String(stats.activeListings),
      numericValue: stats.activeListings,
      max: 20,
      change: "+2",
      up: true,
      icon: Building2,
      href: "/dashboard/listings",
      iconBg: "bg-gold/15 border-gold/25",
      iconColor: "text-gold-700",
      barClass: "bg-gold",
      caption: "2 new this week",
    },
    {
      label: "Pending Appointments",
      displayValue: String(stats.pendingAppointments),
      numericValue: stats.pendingAppointments,
      max: 12,
      change: "3 today",
      up: true,
      icon: Calendar,
      href: "/dashboard/appointments",
      iconBg: "bg-emerald-100 border-emerald-200/80",
      iconColor: "text-emerald-700",
      barClass: "bg-emerald-600",
      caption: "5 confirmed · 3 pending",
    },
    {
      label: "Monthly Inquiries",
      displayValue: String(stats.monthlyInquiries),
      numericValue: stats.monthlyInquiries,
      max: 200,
      change: "+18%",
      up: true,
      icon: TrendingUp,
      href: "/dashboard/leads",
      iconBg: "bg-royal/10 border-royal/15",
      iconColor: "text-royal",
      barClass: "bg-royal",
      caption: "132 last month",
    },
    {
      label: "Conversion Rate",
      displayValue: `${stats.conversionRate}%`,
      numericValue: stats.conversionRate,
      max: 100,
      change: "+2.1%",
      up: true,
      icon: TrendingUp,
      href: "/dashboard/leads",
      iconBg: "bg-gold/15 border-gold/25",
      iconColor: "text-gold-700",
      barClass: "bg-gold",
      caption: "Industry avg. ~18%",
    },
    {
      label: "Monthly Revenue",
      displayValue: formatPrice(stats.monthlyRevenue),
      numericValue: stats.monthlyRevenue,
      max: 60000,
      change: "+8%",
      up: true,
      icon: DollarSign,
      href: "/dashboard/settings",
      iconBg: "bg-emerald-100 border-emerald-200/80",
      iconColor: "text-emerald-700",
      barClass: "bg-emerald-600",
      caption: "On track for $58K",
    },
  ];
}

export function DashboardStatCards() {
  const statCards = buildStatCards();

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
      {statCards.map((stat) => {
        const fillPct = stat.max > 0 ? Math.min(100, (stat.numericValue / stat.max) * 100) : 0;

        return (
          <Link key={stat.label} href={stat.href} className="min-w-0">
            <Card className="group h-full rounded-xl border border-border bg-card/90 transition-all hover:border-gold/30 hover:bg-card hover:shadow-card">
              <CardContent className="flex h-full flex-col gap-2 p-3 lg:p-3.5">
                <div className="flex items-center justify-between gap-1.5">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border lg:h-8 lg:w-8",
                      stat.iconBg
                    )}
                  >
                    <stat.icon className={cn("h-3.5 w-3.5", stat.iconColor)} />
                  </div>
                  <div
                    className={cn(
                      "flex shrink-0 items-center gap-0.5 rounded-full px-1 py-0.5 text-[9px] font-semibold leading-none sm:text-[10px]",
                      stat.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                    )}
                  >
                    {stat.up ? (
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    ) : (
                      <ArrowDownRight className="h-2.5 w-2.5" />
                    )}
                    {stat.change}
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-bold leading-tight text-navy lg:text-lg">{stat.displayValue}</p>
                  <p className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-muted-foreground lg:text-xs">{stat.label}</p>
                </div>

                <div className="mt-auto space-y-1">
                  <div className="h-1 overflow-hidden rounded-full bg-muted/80">
                    <div
                      className={cn("h-full rounded-full transition-all", stat.barClass)}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                  <p className="line-clamp-1 text-[9px] text-muted-foreground lg:text-[10px]">{stat.caption}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
