import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchWidget } from "@/components/site/search-widget";
import { MOCK_IMAGES } from "@/lib/mock-data";
import { BRAND } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={MOCK_IMAGES.hero}
          alt=""
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-background/82" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl space-y-6">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Real estate, simplified across NYC
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Work with {BRAND.broker.name}, a New York State licensed broker for rentals, sales, and investment
              properties across the Bronx, Westchester, and Connecticut.
            </p>
            <div className="flex flex-row gap-3 pt-1">
              <Button size="lg" className="min-w-0 flex-1 lg:w-auto lg:flex-none" asChild>
                <Link href="/listings">
                  Browse Listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="min-w-0 flex-1 lg:w-auto lg:flex-none" asChild>
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>

          <aside className="flex justify-center lg:justify-end">
            <figure className="relative w-full max-w-[280px] overflow-hidden rounded-2xl bg-black sm:max-w-xs lg:max-w-sm">
              <div className="relative aspect-[668/944] w-full">
                <Image
                  src={MOCK_IMAGES.realtor}
                  alt={`${BRAND.broker.name} - Licensed Real Estate Broker`}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 640px) 280px, 384px"
                  priority
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black via-black/80 to-transparent px-5 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-14">
                <p className="text-lg font-semibold text-white">{BRAND.broker.name}</p>
                <p className="text-sm text-gold">{BRAND.broker.title}</p>
              </figcaption>
            </figure>
          </aside>
        </div>

        <div className="mt-12 lg:mt-16">
          <SearchWidget variant="hero" />
        </div>
      </div>
    </section>
  );
}
