"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  NavDropdownTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS, SERVICE_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [showHome, setShowHome] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setShowHome(pathname !== "/");
  }, [pathname]);

  const linkClass =
    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-[4.25rem] items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
        <Logo variant="header" className="[&_img]:h-12 sm:[&_img]:h-14 lg:[&_img]:h-16" />

        <nav className="hidden items-center gap-6 lg:flex">
          {showHome && (
            <Link href="/" className={linkClass}>
              Home
            </Link>
          )}

          <DropdownMenu>
            <NavDropdownTrigger>Services</NavDropdownTrigger>
            <DropdownMenuContent align="start">
              {SERVICE_NAV.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("border-t border-border/60 bg-white lg:hidden", mobileOpen ? "block" : "hidden")}>
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
          {showHome && (
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
          )}

          <button
            type="button"
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
          </button>
          {mobileServicesOpen && (
            <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
              {SERVICE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Button asChild>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Book Consultation
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
