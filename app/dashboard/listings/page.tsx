"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListingUploadDashboard } from "@/components/dashboard/listing-upload-dashboard";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { LISTING_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { formatLeadStatus } from "@/lib/types";

export default function DashboardListingsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? MOCK_LISTINGS : MOCK_LISTINGS.filter((l) => l.status === statusFilter);

  return (
    <div className="min-w-0 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Listings Manager</h1>
        <p className="text-sm text-muted-foreground">Upload new properties and manage live inventory</p>
      </div>

      <ListingUploadDashboard />

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-navy">Your listings</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} results</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {LISTING_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {formatLeadStatus(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          {filtered.map((listing) => {
            const img = listing.images?.find((i) => i.is_primary) || listing.images?.[0];
            return (
              <Card key={listing.id} className="min-w-0 overflow-hidden rounded-xl shadow-card">
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg sm:w-36">
                    <Image src={img?.url || ""} alt={listing.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold">{listing.title}</h3>
                      {listing.featured && <Star className="h-4 w-4 shrink-0 fill-gold text-gold" />}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {listing.address}, {listing.borough}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge
                        variant={
                          listing.status === "active" ? "success" : listing.status === "pending" ? "warning" : "secondary"
                        }
                      >
                        {formatLeadStatus(listing.status)}
                      </Badge>
                      <Badge variant="outline">{listing.listing_type === "rent" ? "Rent" : "Sale"}</Badge>
                    </div>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-lg font-bold text-navy">
                      {formatPrice(listing.price ?? 0, listing.listing_type)}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground sm:justify-end">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {listing.views}
                      </span>
                      <span>{listing.inquiries} inquiries</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
