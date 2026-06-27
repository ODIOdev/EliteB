"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  ImagePlus,
  Save,
  Send,
  RotateCcw,
  Home,
  DollarSign,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LISTING_STATUSES, SERVICE_AREAS } from "@/lib/constants";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { formatLeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES = ["Condo", "Townhouse", "Apartment", "Single Family", "Duplex", "Loft", "Multi-Family"];

const LISTING_TEMPLATE = {
  title: "",
  address: "",
  city: "New York",
  borough: "Bronx",
  state: "NY",
  zip: "",
  listing_type: "rent" as "sale" | "rent",
  status: "draft",
  property_type: "Apartment",
  price: "",
  beds: "",
  baths: "",
  sqft: "",
  description: "",
  featured: false,
};

export type ListingDraft = typeof LISTING_TEMPLATE;

function countByStatus(status: string) {
  return MOCK_LISTINGS.filter((l) => l.status === status).length;
}

export function ListingUploadDashboard() {
  const [form, setForm] = useState<ListingDraft>(LISTING_TEMPLATE);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const stats = useMemo(
    () => ({
      total: MOCK_LISTINGS.length,
      active: countByStatus("active"),
      pending: countByStatus("pending"),
      draft: countByStatus("draft"),
    }),
    []
  );

  function updateField<K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSavedMessage(null);
  }

  function loadSample() {
    setForm({
      title: "Riverdale 2BR with Balconies",
      address: "555 Kappock Street",
      city: "Bronx",
      borough: "Bronx",
      state: "NY",
      zip: "10463",
      listing_type: "rent",
      status: "draft",
      property_type: "Apartment",
      price: "3800",
      beds: "2",
      baths: "2",
      sqft: "1100",
      description:
        "Elevator building with in-unit laundry, pet-friendly, and two private balconies. Steps to shops and transit in Riverdale.",
      featured: false,
    });
    setSavedMessage("Sample listing loaded — review and publish when ready.");
  }

  function clearForm() {
    setForm(LISTING_TEMPLATE);
    setSavedMessage(null);
  }

  function saveDraft() {
    setSavedMessage("Draft saved locally. Connect Supabase to persist new listings.");
  }

  function publishListing() {
    setSavedMessage(`"${form.title || "New listing"}" queued for publish (demo).`);
  }

  return (
    <Card className="min-w-0 overflow-hidden rounded-xl shadow-card">
      <CardHeader className="border-b border-border/60 bg-muted/30 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Building2 className="h-5 w-5 text-royal" />
              New Listing Upload
            </CardTitle>
            <CardDescription className="mt-1">
              Prefill property details, photos, and pricing before publishing to the site.
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" className="shrink-0 bg-card" onClick={loadSample}>
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            Load sample
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Total", value: stats.total, icon: Building2, accent: "bg-royal/10 text-royal" },
            { label: "Active", value: stats.active, icon: Home, accent: "bg-emerald-100 text-emerald-700" },
            { label: "Pending", value: stats.pending, icon: Send, accent: "bg-gold/15 text-gold-700" },
            { label: "Drafts", value: stats.draft, icon: FileText, accent: "bg-muted text-muted-foreground" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2">
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.accent)}>
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none text-navy">{item.value}</p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="listing-title">Listing title</Label>
                <Input
                  id="listing-title"
                  placeholder="e.g. Riverdale 2BR with Balconies"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="listing-address">Street address</Label>
                <Input
                  id="listing-address"
                  placeholder="555 Kappock Street"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Borough / area</Label>
                <Select value={form.borough} onValueChange={(v) => updateField("borough", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_AREAS.map((area) => (
                      <SelectItem key={area.name} value={area.name}>
                        {area.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                    <SelectItem value="Queens">Queens</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="listing-city">City</Label>
                <Input
                  id="listing-city"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="listing-zip">ZIP</Label>
                <Input
                  id="listing-zip"
                  placeholder="10463"
                  value={form.zip}
                  onChange={(e) => updateField("zip", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Property type</Label>
                <Select value={form.property_type} onValueChange={(v) => updateField("property_type", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <Label>Listing type</Label>
                <Select
                  value={form.listing_type}
                  onValueChange={(v) => updateField("listing_type", v as ListingDraft["listing_type"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">For rent</SelectItem>
                    <SelectItem value="sale">For sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => updateField("status", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTING_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {formatLeadStatus(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="listing-price">
                  Price {form.listing_type === "rent" ? "(/mo)" : ""}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="listing-price"
                    type="number"
                    placeholder="3800"
                    className="pl-9"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="listing-beds">Beds / Baths / Sqft</Label>
                <div className="grid grid-cols-3 gap-1.5">
                  <Input
                    id="listing-beds"
                    placeholder="Beds"
                    value={form.beds}
                    onChange={(e) => updateField("beds", e.target.value)}
                  />
                  <Input placeholder="Baths" value={form.baths} onChange={(e) => updateField("baths", e.target.value)} />
                  <Input placeholder="Sqft" value={form.sqft} onChange={(e) => updateField("sqft", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="listing-description">Description</Label>
              <Textarea
                id="listing-description"
                rows={3}
                placeholder="Highlight key features, neighborhood, and showing instructions..."
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Photos</Label>
            <button
              type="button"
              className="flex min-h-[140px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-center transition-colors hover:border-royal/40 hover:bg-muted/50"
            >
              <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Upload images</span>
              <span className="mt-1 text-xs text-muted-foreground">Drag & drop or click (demo)</span>
            </button>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="rounded border-input"
              />
              <span>Feature on homepage</span>
            </label>
          </div>
        </div>

        {savedMessage && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {savedMessage}
          </p>
        )}

        <div className="flex flex-wrap gap-2 border-t border-border/60 pt-4">
          <Button type="button" variant="outline" size="sm" onClick={clearForm}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Clear form
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={saveDraft}>
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save draft
          </Button>
          <Button type="button" variant="gold" size="sm" onClick={publishListing}>
            <Send className="mr-1.5 h-3.5 w-3.5" />
            Publish listing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
