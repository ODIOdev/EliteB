"use client";

import Image from "next/image";
import { Save, Key, CreditCard, Globe } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/site/social-icons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BRAND } from "@/lib/constants";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Settings</h1>
        <p className="text-muted-foreground">Manage brand info, integrations, and payment settings</p>
      </div>

      <Tabs defaultValue="brand">
        <TabsList>
          <TabsTrigger value="brand">Brand Info</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>Update your company details displayed across the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-black ring-2 ring-gold/40">
                  <Image
                    src={BRAND.broker.avatar}
                    alt={BRAND.broker.name}
                    fill
                    className="object-contain object-bottom"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-navy">{BRAND.broker.name}</p>
                  <p className="text-sm text-muted-foreground">{BRAND.broker.title}</p>
                  <Button variant="outline" size="sm" className="mt-2" type="button">
                    Change photo
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Company Name</Label><Input defaultValue={BRAND.name} /></div>
                <div><Label>Tagline</Label><Input defaultValue={BRAND.tagline} /></div>
                <div><Label>Phone</Label><Input defaultValue={BRAND.phone} /></div>
                <div><Label>Email</Label><Input defaultValue={BRAND.email} /></div>
              </div>
              <div><Label>Address</Label><Textarea defaultValue={BRAND.address} rows={2} /></div>
              <div><Label>License Number</Label><Input defaultValue={BRAND.license} /></div>
              <Button variant="gold"><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: InstagramIcon, label: "Instagram", value: BRAND.social.instagram },
                { icon: FacebookIcon, label: "Facebook", value: BRAND.social.facebook },
                { icon: LinkedinIcon, label: "LinkedIn", value: BRAND.social.linkedin },
                { icon: Globe, label: "YouTube", value: BRAND.social.youtube },
              ].map((social) => (
                <div key={social.label} className="flex items-center gap-3">
                  <social.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1"><Label>{social.label}</Label><Input defaultValue={social.value} /></div>
                </div>
              ))}
              <Button variant="gold"><Save className="mr-2 h-4 w-4" />Save Links</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Key className="h-5 w-5" />API Integrations</CardTitle>
              <CardDescription>Configure third-party service connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Supabase", desc: "Database, auth, and file storage", env: "NEXT_PUBLIC_SUPABASE_URL" },
                { name: "Stripe", desc: "Subscription and payment processing", env: "STRIPE_SECRET_KEY" },
                { name: "Resend", desc: "Email notifications and campaigns", env: "RESEND_API_KEY" },
                { name: "Google Maps", desc: "Property maps and location search", env: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" },
                { name: "MLS/IDX", desc: "MLS listing feed integration (placeholder)", env: "MLS_API_KEY" },
              ].map((api) => (
                <div key={api.name}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{api.name}</p>
                      <p className="text-sm text-muted-foreground">{api.desc}</p>
                    </div>
                    <BadgePlaceholder />
                  </div>
                  <Input className="mt-2 font-mono text-sm" placeholder={`${api.env}=••••••••`} type="password" />
                  <Separator className="mt-4" />
                </div>
              ))}
              <Button variant="gold"><Save className="mr-2 h-4 w-4" />Save API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Payment Settings</CardTitle>
              <CardDescription>Manage Stripe subscription plans for your SaaS platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Basic Agent", price: "$99/mo", desc: "Single agent, up to 25 listings" },
                { name: "Pro Broker", price: "$249/mo", desc: "Team of 5, unlimited listings, CRM" },
                { name: "Enterprise Team", price: "$499/mo", desc: "Unlimited agents, white-label, API access" },
              ].map((plan) => (
                <div key={plan.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">{plan.desc}</p>
                  </div>
                  <p className="text-lg font-bold text-navy">{plan.price}</p>
                </div>
              ))}
              <Button variant="outline">Manage in Stripe Dashboard</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BadgePlaceholder() {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
      Configure in .env
    </span>
  );
}
