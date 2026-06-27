import Link from "next/link";
import { ArrowRight, Home, TrendingUp, Camera, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValuationForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";

export default function SellPage() {
  return (
    <SiteShell>
      <PageHero
        title="Sell Your NYC Property"
        description="Get a complimentary home valuation and discover how Elite Brokers NY can maximize your sale price."
        align="center"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">Free Home Valuation</h2>
              <ValuationForm />
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">Why Sell With Us</h2>
              <div className="space-y-3">
                {[
                  { icon: TrendingUp, title: "Maximum Exposure", desc: "Premium marketing across MLS, social media, and our exclusive buyer network." },
                  { icon: Camera, title: "Professional Media", desc: "HDR photography, virtual tours, and drone footage included with every listing." },
                  { icon: DollarSign, title: "Competitive Pricing", desc: "Data-driven pricing strategy to sell faster and for top dollar." },
                  { icon: Clock, title: "Fast Closings", desc: "Average 21 days on market — well below the NYC median." },
                ].map((item) => (
                  <div key={item.title} className="surface-card flex gap-4 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted py-16 md:py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <Home className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight">Ready to List?</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Book a seller consultation to discuss your goals and timeline.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/contact?type=seller">Book Appointment <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
