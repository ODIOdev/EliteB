"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Star, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { LISTING_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { formatLeadStatus } from "@/lib/types";

export default function DashboardListingsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? MOCK_LISTINGS : MOCK_LISTINGS.filter((l) => l.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Listings Manager</h1>
          <p className="text-muted-foreground">{filtered.length} listings</p>
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {LISTING_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="gold"><Plus className="mr-2 h-4 w-4" />New Listing</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((listing) => {
          const img = listing.images?.find((i) => i.is_primary) || listing.images?.[0];
          return (
            <Card key={listing.id} className="overflow-hidden">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg">
                  <Image src={img?.url || ""} alt={listing.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{listing.title}</h3>
                    {listing.featured && <Star className="h-4 w-4 fill-gold text-gold" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{listing.address}, {listing.borough}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Badge variant={listing.status === "active" ? "success" : listing.status === "pending" ? "warning" : "secondary"}>{formatLeadStatus(listing.status)}</Badge>
                    <Badge variant="outline">{listing.listing_type === "rent" ? "Rent" : "Sale"}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-navy">{formatPrice(listing.price ?? 0, listing.listing_type)}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{listing.views}</span>
                    <span>{listing.inquiries} inquiries</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
