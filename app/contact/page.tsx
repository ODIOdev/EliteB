import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/site/social-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { SiteShell } from "@/components/site/site-shell";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        title="Contact Us"
        description="Ready to start your real estate journey? We're here to help."
        align="center"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
                { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: MapPin, label: "Office", value: BRAND.address },
                { icon: Clock, label: "Hours", value: "Mon–Fri: 9am–7pm · Sat–Sun: 10am–5pm" },
              ].map((item) => (
                <Card key={item.label} className="rounded-2xl border-border/60">
                  <CardContent className="flex items-start gap-4 p-5">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex gap-2 pt-2">
                {[
                  { href: BRAND.social.instagram, Icon: InstagramIcon },
                  { href: BRAND.social.facebook, Icon: FacebookIcon },
                  { href: BRAND.social.linkedin, Icon: LinkedinIcon },
                ].map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="rounded-2xl border-border/60">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tracking-tight">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
