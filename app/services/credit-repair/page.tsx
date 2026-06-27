import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { CreditDashboardSimulator } from "@/components/services/credit-dashboard-simulator";

export default function CreditRepairPage() {
  return (
    <SiteShell>
      <PageHero
        title="Credit Repair Dashboard"
        description="Monitor your scores across Experian, Equifax, and TransUnion, track disputes, and follow a personalized plan to strengthen your credit — demo mode for Elite Brokers NY clients."
      />

      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <CreditDashboardSimulator />
        </div>
      </section>
    </SiteShell>
  );
}
