import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { TaxDashboardSimulator } from "@/components/services/tax-dashboard-simulator";

export default function TaxProfessionalPage() {
  return (
    <SiteShell>
      <PageHero
        title="Tax Professional Dashboard"
        description="Prepare your return, track key deadlines, and simulate filing with a licensed tax professional — demo mode for Elite Brokers NY clients."
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <TaxDashboardSimulator />
        </div>
      </section>
    </SiteShell>
  );
}
