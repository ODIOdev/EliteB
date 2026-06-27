import Image from "next/image";
import Link from "next/link";
import { Award, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/components/site/social-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { MOCK_PROFILE } from "@/lib/mock-data";
import { BRAND } from "@/lib/constants";

export default function AboutPage() {
  const profile = MOCK_PROFILE;

  return (
    <SiteShell>
      <PageHero
        title="About Elite Brokers NY"
        description="New York City's trusted partner for residential real estate across the metro area."
        align="center"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="relative mx-auto w-fit max-w-md overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
              <Image src={profile.avatar_url || ""} alt={profile.full_name} width={668} height={944} className="block h-auto w-full" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">{BRAND.broker.title}</p>
              <h2 className="text-3xl font-semibold tracking-tight">{profile.full_name}</h2>
              <p className="mt-1 text-muted-foreground">{profile.license_number}</p>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-foreground hover:underline"
              >
                {BRAND.broker.instagramHandle} · {BRAND.broker.followers} followers
              </a>

              <div className="mt-4 flex gap-3">
                {[
                  { href: BRAND.social.instagram, Icon: InstagramIcon },
                  { href: BRAND.social.facebook, Icon: FacebookIcon },
                  { href: BRAND.social.linkedin, Icon: LinkedinIcon },
                  { href: BRAND.social.youtube, Icon: YoutubeIcon },
                ].map(({ href, Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              <p className="mt-6 leading-relaxed text-muted-foreground">{profile.bio}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Transactions Closed", value: "500+" },
                  { label: "Total Volume", value: "$500M+" },
                  { label: "Years Experience", value: "15+" },
                  { label: "Client Satisfaction", value: "98%" },
                ].map((stat) => (
                  <Card key={stat.label} className="rounded-2xl border-border/60">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button size="lg" className="mt-8" asChild>
                <Link href="/contact">Work With {BRAND.broker.name}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 text-center">
            <Award className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="text-2xl font-semibold tracking-tight">Licenses & Credentials</h2>
          </div>
          <div className="mx-auto grid max-w-2xl gap-3">
            {[
              "New York State Licensed Real Estate Broker",
              "Residential Rentals, Sales & Investment Properties",
              "Serving Bronx, Westchester, Manhattan & Connecticut",
              "Follow @jfebry.therealtor on Instagram for latest listings",
            ].map((license) => (
              <div key={license} className="surface-card flex items-center gap-3 p-4">
                <Award className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-sm">{license}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <MapPin className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
          <h2 className="text-2xl font-semibold tracking-tight">Visit Our Office</h2>
          <p className="mt-2 text-muted-foreground">{BRAND.address}</p>
        </div>
      </section>
    </SiteShell>
  );
}
