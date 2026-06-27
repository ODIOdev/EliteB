"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/types";

interface PropertyCardProps {
  listing: Listing;
  showSave?: boolean;
}

export function PropertyCard({ listing, showSave = true }: PropertyCardProps) {
  const primaryImage = listing.images?.find((img) => img.is_primary) || listing.images?.[0];
  const imageUrl = primaryImage?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";

  return (
    <Card className="group overflow-hidden rounded-2xl border-border transition-all hover:border-border hover:shadow-card-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {listing.featured && <Badge variant="gold">Featured</Badge>}
          <Badge variant="listing">{listing.listing_type === "rent" ? "For Rent" : "For Sale"}</Badge>
        </div>
        {showSave && (
          <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm transition-colors hover:bg-muted">
            <Heart className="h-4 w-4" />
          </button>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {listing.borough}, {listing.city}
        </div>
        <Link href={`/listings/${listing.id}`}>
          <h3 className="mb-2 text-lg font-semibold leading-tight transition-colors group-hover:text-muted-foreground">
            {listing.title}
          </h3>
        </Link>
        <p className="mb-3 text-2xl font-semibold text-foreground">
          {formatPrice(listing.price ?? 0, listing.listing_type)}
        </p>
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Bed className="h-4 w-4" />{listing.beds} bd</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{listing.baths} ba</span>
          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" />{(listing.sqft ?? 0).toLocaleString()} sqft</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/listings/${listing.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/contact?listing=${listing.id}`}>Contact Agent</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
