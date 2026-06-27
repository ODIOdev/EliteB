"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function SearchWidget({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const [type, setType] = useState("buy");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (type === "rent") params.set("type", "rent");
    else if (type === "sell") {
      router.push("/sell");
      return;
    } else params.set("type", "sale");
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (beds) params.set("beds", beds);
    if (baths) params.set("baths", baths);
    router.push(`/listings?${params.toString()}`);
  }

  const isHero = variant === "hero";
  const heroFieldClass =
    "h-11 border-border bg-card/80 shadow-sm backdrop-blur-sm placeholder:text-muted-foreground";

  if (isHero) {
    return (
      <div className="glass-panel w-full p-5 sm:p-6 lg:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Property search</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Find your next home
            </h2>
          </div>
          <Tabs value={type} onValueChange={setType}>
            <TabsList className="h-auto rounded-lg border border-border bg-muted/70 p-1 shadow-sm backdrop-blur-sm">
              <TabsTrigger
                value="buy"
                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="sell"
                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))_auto] lg:items-end">
          <div className="col-span-2 space-y-1.5 lg:col-span-1">
            <label className="text-xs font-medium text-muted-foreground">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Bronx, Westchester, Connecticut..."
                className={cn(heroFieldClass, "pl-10")}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Min Price</label>
            <Select value={minPrice} onValueChange={setMinPrice}>
              <SelectTrigger className={heroFieldClass}>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500000">$500K</SelectItem>
                <SelectItem value="1000000">$1M</SelectItem>
                <SelectItem value="2000000">$2M</SelectItem>
                <SelectItem value="3000000">$3M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Max Price</label>
            <Select value={maxPrice} onValueChange={setMaxPrice}>
              <SelectTrigger className={heroFieldClass}>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1000000">$1M</SelectItem>
                <SelectItem value="2000000">$2M</SelectItem>
                <SelectItem value="5000000">$5M</SelectItem>
                <SelectItem value="10000000">$10M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Beds</label>
            <Select value={beds} onValueChange={setBeds}>
              <SelectTrigger className={heroFieldClass}>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Baths</label>
            <Select value={baths} onValueChange={setBaths}>
              <SelectTrigger className={heroFieldClass}>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 lg:col-span-1 lg:self-end">
            <Button size="lg" className="h-11 w-full whitespace-nowrap px-6 lg:px-8" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card p-4">
      <Tabs value={type} onValueChange={setType} className="mb-4">
        <TabsList>
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="rent">Rent</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid w-full gap-3 md:grid-cols-3 lg:grid-cols-6">
        <div className="md:col-span-2 lg:col-span-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Location (e.g. Tribeca, Brooklyn)"
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <Select value={minPrice} onValueChange={setMinPrice}>
          <SelectTrigger><SelectValue placeholder="Min Price" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="500000">$500K</SelectItem>
            <SelectItem value="1000000">$1M</SelectItem>
            <SelectItem value="2000000">$2M</SelectItem>
            <SelectItem value="3000000">$3M+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={maxPrice} onValueChange={setMaxPrice}>
          <SelectTrigger><SelectValue placeholder="Max Price" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1000000">$1M</SelectItem>
            <SelectItem value="2000000">$2M</SelectItem>
            <SelectItem value="5000000">$5M</SelectItem>
            <SelectItem value="10000000">$10M+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={beds} onValueChange={setBeds}>
          <SelectTrigger><SelectValue placeholder="Beds" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={baths} onValueChange={setBaths}>
          <SelectTrigger><SelectValue placeholder="Baths" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button size="lg" className="mt-4 w-full lg:w-auto" onClick={handleSearch}>
        <Search className="mr-2 h-4 w-4" />
        Search Properties
      </Button>
    </div>
  );
}
