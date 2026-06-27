"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, Calendar, UserCircle, Megaphone, Settings,
  Menu, Bell, Search, LogOut, ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV, BRAND } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Building2, Calendar, UserCircle, Megaphone, Settings,
};

export function DashboardSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-navy text-white transition-all duration-300",
      collapsed ? "w-[72px]" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold font-display text-sm font-bold text-navy">E</div>
            <span className="text-sm font-semibold">Elite Brokers</span>
          </Link>
        )}
        <button onClick={onToggle} className="rounded-md p-1.5 hover:bg-white/10">
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {DASHBOARD_NAV.map((item) => {
          const Icon = iconMap[item.icon];
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-gold/20 text-gold" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white">
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Back to Website</span>}
        </Link>
      </div>
    </aside>
  );
}

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search leads, listings, appointments..." className="pl-10" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">3</span>
        </Button>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{BRAND.broker.name}</p>
            <p className="text-xs text-muted-foreground">Broker</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-gold">JF</div>
        </div>
      </div>
    </header>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/30">
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={cn("transition-all duration-300", collapsed ? "ml-[72px]" : "ml-64")}>
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
