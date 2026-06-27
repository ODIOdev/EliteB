import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/site/social-icons";
import { Logo } from "@/components/site/logo";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/50">
      <div className="container mx-auto px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="hidden lg:block">
            <Logo variant="footer" className="mb-4 [&_img]:h-10" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {BRAND.broker.name} — licensed NYC metro broker. Buy, sell, and rent across the Bronx, Westchester, and Connecticut.
            </p>
            <a
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-foreground hover:underline"
            >
              {BRAND.broker.instagramHandle}
            </a>
          </div>

          <div className="hidden lg:block">
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/listings" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  All Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {BRAND.address}
              </li>
              <li>
                <a href={`tel:${BRAND.phoneRaw}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Follow</h4>
            <div className="flex gap-2">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{BRAND.license}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
