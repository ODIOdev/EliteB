import Link from "next/link";
import { ArrowRight, Award, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/site/hero-section";
import { PropertyCard } from "@/components/listings/property-card";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteShell } from "@/components/site/site-shell";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { getFeaturedListings } from "@/lib/mock-data";
import { SERVICE_AREAS } from "@/lib/constants";

export default function HomePage() {
  const featured = getFeaturedListings();

  return (
    <SiteShell>
    <>
      <HeroSection />

      <section className="section-muted py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading label="Curated selection" title="Featured Listings" />
            <Button variant="outline" asChild>
              <Link href="/listings">View All Listings <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Why Elite Brokers NY"
            title="The Elite Advantage"
            align="center"
            className="mb-10"
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {[
              { icon: Award, title: "Proven Track Record", desc: "$500M+ in closed transactions across NYC's most competitive markets." },
              { icon: Shield, title: "Trusted Advisory", desc: "White-glove service with transparent communication at every step." },
              { icon: TrendingUp, title: "Market Intelligence", desc: "Real-time data and insights to maximize your investment returns." },
              { icon: Users, title: "Full-Service Team", desc: "Dedicated agents, marketing, and transaction coordinators under one roof." },
            ].map((item) => (
              <div key={item.title} className="surface-card p-4 text-center lg:p-6">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted lg:mb-4 lg:h-11 lg:w-11">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground lg:mb-2 lg:text-base">{item.title}</h3>
                <p className="text-xs text-muted-foreground lg:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-muted py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            label="Coverage"
            title="Serving All Five Boroughs"
            align="center"
            className="mb-10"
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {SERVICE_AREAS.map((area) => (
              <div key={area.name} className="surface-card p-4 lg:p-6">
                <h3 className="mb-1 text-base font-semibold text-foreground lg:mb-2 lg:text-lg">{area.name}</h3>
                <p className="text-xs text-muted-foreground lg:text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="surface-card mx-auto max-w-3xl px-8 py-14 text-center lg:px-16">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Ready to find your next home?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Schedule a free consultation and discover how Elite Brokers NY can simplify your real estate journey.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/contact">Book Your Free Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
    </SiteShell>
  );
}
