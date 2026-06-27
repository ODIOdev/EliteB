import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/listings/property-card";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { getRentListings } from "@/lib/mock-data";

export default function RentPage() {
  const rentals = getRentListings();

  return (
    <SiteShell>
      <PageHero
        title="Find Your Rental"
        description="Discover premium rental properties across NYC — from luxury lofts to family-friendly apartments."
        align="center"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">{rentals.length} Available Rentals</h2>
            <Button variant="outline" asChild>
              <Link href="/listings?type=rent">View All Rentals</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentals.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-muted py-16 md:py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight">Apply for a Rental</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Submit your tenant application and our team will help you find the perfect rental.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/contact?type=tenant">Start Application <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
