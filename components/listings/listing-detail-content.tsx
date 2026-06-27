"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bed, Bath, Maximize, MapPin, Calendar, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LeadForm } from "@/components/forms/lead-form";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/types";

function MortgageCalculator({ price }: { price: number }) {
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const loanAmount = price * (1 - downPayment / 100);
  const monthlyRate = rate / 100 / 12;
  const payments = term * 12;
  const monthly = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1)
    : loanAmount / payments;

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Mortgage Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs">Down Payment %</Label>
            <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Interest Rate %</Label>
            <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div>
            <Label className="text-xs">Term (years)</Label>
            <Input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
        </div>
        <div className="rounded-lg bg-secondary p-4 text-center">
          <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
          <p className="text-2xl font-semibold">{formatPrice(Math.round(monthly))}/mo</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ImageGallery({ images }: { images: Listing["images"] }) {
  const [active, setActive] = useState(0);
  const imgs = images?.length ? images : [{ url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", alt: "Property" }];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image src={imgs[active].url} alt={imgs[active].alt || "Property"} fill className="object-cover" priority />
        {imgs.length > 1 && (
          <>
            <button onClick={() => setActive((a) => (a - 1 + imgs.length) % imgs.length)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setActive((a) => (a + 1) % imgs.length)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {imgs.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {imgs.map((img, i) => (
            <button key={i} onClick={() => setActive(i)} className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${i === active ? "border-foreground" : "border-transparent"}`}>
              <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ListingDetailContent({ listing }: { listing: Listing }) {
  if (!listing) notFound();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {listing.featured && <Badge variant="gold">Featured</Badge>}
              <Badge variant="secondary">{listing.status}</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{listing.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />{listing.address}, {listing.city}, {listing.state} {listing.zip}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={listing.images} />

            <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border/60 bg-white p-6">
              <p className="text-3xl font-semibold">{formatPrice(listing.price ?? 0, listing.listing_type)}</p>
              <Separator orientation="vertical" className="hidden h-10 sm:block" />
              <span className="flex items-center gap-1 text-muted-foreground"><Bed className="h-5 w-5" />{listing.beds} Beds</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Bath className="h-5 w-5" />{listing.baths} Baths</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Maximize className="h-5 w-5" />{(listing.sqft ?? 0).toLocaleString()} sqft</span>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Description</h2>
              <p className="leading-relaxed text-muted-foreground">{listing.description}</p>
            </div>

            {listing.amenities && listing.amenities.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((a) => (
                    <Badge key={a} variant="outline">{a}</Badge>
                  ))}
                </div>
              </div>
            )}

            {listing.listing_type === "sale" && listing.price && <MortgageCalculator price={listing.price} />}

            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Location</h2>
              <div className="flex aspect-[16/7] items-center justify-center rounded-xl border bg-secondary">
                <div className="text-center text-muted-foreground">
                  <MapPin className="mx-auto mb-2 h-8 w-8" />
                  <p>Google Maps integration</p>
                  <p className="text-sm">{listing.lat}, {listing.lng}</p>
                  <p className="mt-1 text-xs">Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <LeadForm propertyInterest={listing.title} />
            <Card>
              <CardContent className="p-6">
                <Button variant="gold" className="w-full" size="lg" asChild>
                  <Link href={`/contact?listing=${listing.id}&type=tour`}>
                    <Calendar className="mr-2 h-5 w-5" />Schedule a Tour
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Property Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span>{listing.property_type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Borough</span><span>{listing.borough}</span></div>
                {listing.year_built && <div className="flex justify-between"><span className="text-muted-foreground">Year Built</span><span>{listing.year_built}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Views</span><span>{listing.views}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}