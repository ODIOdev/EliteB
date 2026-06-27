"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyCard } from "@/components/listings/property-card";
import { MOCK_LISTINGS } from "@/lib/mock-data";

export function ListingsContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [borough, setBorough] = useState(searchParams.get("location") || "all");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let results = MOCK_LISTINGS.filter((l) => l.status === "active");

    if (type !== "all") results = results.filter((l) => l.listing_type === type);
    if (borough !== "all") results = results.filter((l) => l.borough?.toLowerCase().includes(borough.toLowerCase()));
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (l) => l.title.toLowerCase().includes(q) || (l.address?.toLowerCase().includes(q) ?? false) || (l.borough?.toLowerCase().includes(q) ?? false)
      );
    }

    if (sort === "price-asc") results.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sort === "price-desc") results.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return results;
  }, [borough, type, sort, search]);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Property Listings</h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} properties available</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-card lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap gap-3">
            <Input placeholder="Search by address or neighborhood..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={borough} onValueChange={setBorough}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Borough" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Boroughs</SelectItem>
                <SelectItem value="Manhattan">Manhattan</SelectItem>
                <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                <SelectItem value="Queens">Queens</SelectItem>
                <SelectItem value="Bronx">Bronx</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <SlidersHorizontal className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No listings match your filters</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
            {filtered.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
