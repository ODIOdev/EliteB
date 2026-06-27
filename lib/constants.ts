export const BRAND = {
  name: "Elite Brokers NY",
  tagline: "Buy, Sell, Rent — Simplified.",
  phone: "(347) 961-8286",
  phoneRaw: "3479618286",
  email: "Jfebry@therealtor.team",
  website: "www.elitebrokersny.com",
  address: "New York Metro Area — Bronx, Westchester & Connecticut",
  license: "New York State Licensed Real Estate Broker",
  broker: {
    name: "J Febry",
    title: "Licensed Real Estate Broker",
    instagramHandle: "@jfebry.therealtor",
    followers: "1,100+",
    avatar: "/images/j-febry-headshot.png",
  },
  social: {
    instagram: "https://www.instagram.com/jfebry.therealtor/",
    threads: "https://www.threads.com/@jfebry.therealtor",
    facebook: "https://facebook.com/elitebrokersny",
    linkedin: "https://linkedin.com/company/elitebrokersny",
    youtube: "https://youtube.com/@elitebrokersny",
  },
} as const;

export const SERVICE_AREAS = [
  { name: "Bronx", description: "Riverdale condos, Throggs Neck rentals, and family homes across the borough — including voucher-friendly options." },
  { name: "Westchester", description: "Yonkers duplexes, single-family homes, and new construction rentals with garage, driveway, and yard space." },
  { name: "Manhattan", description: "Buy, sell, and rent across NYC's most iconic borough with expert local guidance." },
  { name: "Connecticut", description: "West Haven and surrounding CT communities — affordable rentals with modern finishes and in-unit laundry." },
] as const;

export const LEAD_STATUSES = ["new", "contacted", "qualified", "showing", "closed", "lost"] as const;
export const LEAD_SOURCES = ["Website", "Instagram", "Referral", "Zillow", "Realtor.com"] as const;
export const LISTING_STATUSES = ["active", "pending", "sold", "rented", "draft"] as const;
export const APPOINTMENT_TYPES = ["tour", "consultation", "valuation", "follow-up"] as const;

export const NAV_LINKS = [
  { href: "/listings", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICE_NAV = [
  { href: "/services/tax-professional", label: "Tax Professional" },
  { href: "/services/credit-repair", label: "Credit Repair" },
] as const;

export const DASHBOARD_NAV = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/leads", label: "Leads CRM", icon: "Users" },
  { href: "/dashboard/listings", label: "Listings", icon: "Building2" },
  { href: "/dashboard/appointments", label: "Appointments", icon: "Calendar" },
  { href: "/dashboard/marketing", label: "Marketing", icon: "Megaphone" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
] as const;
