"use client";

import { useState } from "react";
import { Copy, Mail, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/site/social-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_MARKETING_POSTS, MOCK_LISTINGS } from "@/lib/mock-data";

const TEMPLATES = {
  followup: "Hi {name},\n\nThank you for your interest in {property}. I'd love to schedule a time to show you the property and answer any questions.\n\nAre you available this week for a private tour?\n\nBest,\nJ Febry\nElite Brokers NY\n📞 (347) 961-8286",
  email: "Subject: Exclusive NYC Listings — This Week's Highlights\n\nDear {name},\n\nWe've curated a selection of premium properties that match your criteria. From luxury penthouses in Tribeca to charming brownstones in Brooklyn Heights, there's something for every discerning buyer.\n\nSchedule your private showing today.\n\nWarm regards,\nElite Brokers NY Team",
};

export default function MarketingPage() {
  const [selectedListing, setSelectedListing] = useState(MOCK_LISTINGS[0].id);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const listing = MOCK_LISTINGS.find((l) => l.id === selectedListing);

  function generateInstagramCaption() {
    if (!listing) return;
    const caption = `🏙️ JUST LISTED in ${listing.borough || listing.city}!\n\n${listing.title}\n💰 ${listing.listing_type === "rent" ? `$${(listing.price ?? 0).toLocaleString()}/mo` : `$${(listing.price ?? 0).toLocaleString()}`}\n🛏 ${listing.beds} bed | 🛁 ${listing.baths} bath | 📐 ${(listing.sqft ?? 0).toLocaleString()} sqft\n\n${listing.description?.slice(0, 120)}...\n\n📩 DM for private showing\n\n#NYCRealEstate #${(listing.borough || listing.city || "NYC").replace(" ", "")} #LuxuryLiving #EliteBrokersNY`;
    setGenerated(caption);
  }

  function generateListingPost() {
    if (!listing) return;
    const post = `NEW LISTING ALERT\n\n${listing.title}\n${listing.address}, ${listing.city}, ${listing.state}\n\nPrice: ${listing.listing_type === "rent" ? `$${(listing.price ?? 0).toLocaleString()}/month` : `$${(listing.price ?? 0).toLocaleString()}`}\nBedrooms: ${listing.beds} | Bathrooms: ${listing.baths} | Square Feet: ${(listing.sqft ?? 0).toLocaleString()}\n\n${listing.description}\n\nAmenities: ${listing.amenities?.join(", ") || "N/A"}\n\nContact Elite Brokers NY for a private showing.`;
    setGenerated(post);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Marketing Center</h1>
        <p className="text-muted-foreground">Generate listing copy, social captions, and email campaigns</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-gold" />Content Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Listing</Label>
              <Select value={selectedListing} onValueChange={setSelectedListing}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MOCK_LISTINGS.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={generateListingPost}>
                <Mail className="mr-2 h-4 w-4" />Listing Post
              </Button>
              <Button variant="outline" onClick={generateInstagramCaption}>
                <InstagramIcon className="mr-2 h-4 w-4" />Instagram Caption
              </Button>
              <Button variant="outline" onClick={() => setGenerated(TEMPLATES.followup.replace("{name}", "Client").replace("{property}", listing?.title || "the property"))}>
                Follow-up Template
              </Button>
              <Button variant="outline" onClick={() => setGenerated(TEMPLATES.email.replace("{name}", "Valued Client"))}>
                Email Campaign
              </Button>
            </div>
            <div>
              <Label>Generated Content</Label>
              <Textarea value={generated} onChange={(e) => setGenerated(e.target.value)} rows={12} className="mt-1 font-mono text-sm" placeholder="Select a generator above..." />
            </div>
            {generated && (
              <Button variant="gold" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />{copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Recent Posts</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {MOCK_MARKETING_POSTS.map((post) => (
                <div key={post.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{post.title}</p>
                    <Badge variant="outline">{post.platform}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Lead Follow-up Templates</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(TEMPLATES).map(([key, template]) => (
                <div key={key} className="rounded-lg border p-3">
                  <p className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{template}</p>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => setGenerated(template)}>Use Template</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
