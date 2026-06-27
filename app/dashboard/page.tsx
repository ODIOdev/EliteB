import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStatCards } from "@/components/dashboard/dashboard-stat-cards";
import { DashboardOverviewPanels } from "@/components/dashboard/dashboard-overview-panels";
import { MOCK_ACTIVITY } from "@/lib/mock-data";
import { BRAND } from "@/lib/constants";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, {BRAND.broker.name.split(" ")[0]}. Here&apos;s what&apos;s happening today.</p>
      </div>

      <DashboardStatCards />

      <DashboardOverviewPanels />

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
