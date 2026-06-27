export type ListingType = "sale" | "rent";

/** Matches `listings` table */
export interface Listing {
  id: string;
  title: string;
  address?: string;
  city?: string;
  state: string;
  price?: number;
  listing_type?: ListingType;
  status: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  description?: string;
  featured: boolean;
  created_at: string;
  // App-layer fields (not in DB — use listing_images table or join)
  slug?: string;
  borough?: string;
  zip?: string;
  lat?: number;
  lng?: number;
  year_built?: number;
  property_type?: string;
  amenities?: string[];
  views?: number;
  inquiries?: number;
  images?: ListingImage[];
}

export interface ListingImage {
  id: string;
  listing_id: string;
  url: string;
  alt?: string;
  sort_order: number;
  is_primary: boolean;
}

/** Matches `leads` table */
export interface Lead {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  interest?: string;
  source?: string;
  status: string;
  notes?: string;
  follow_up_date?: string;
  created_at: string;
}

/** Matches `appointments` table */
export interface Appointment {
  id: string;
  lead_id?: string;
  listing_id?: string;
  appointment_type?: string;
  scheduled_at?: string;
  status: string;
  created_at: string;
  // Joined display fields (mock / API joins)
  lead?: Lead;
  listing?: Listing;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  license_number?: string;
}

export interface MarketingPost {
  id: string;
  title: string;
  content: string;
  platform: "instagram" | "email" | "facebook" | "general";
  listing_id?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface DashboardStats {
  totalLeads: number;
  activeListings: number;
  pendingAppointments: number;
  monthlyInquiries: number;
  conversionRate: number;
  monthlyRevenue: number;
}

/** @deprecated Use listing_type — kept for transitional helpers */
export function getListingType(listing: Listing): ListingType {
  return listing.listing_type ?? "sale";
}

export function formatLeadStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatAppointmentType(type?: string) {
  if (!type) return "Appointment";
  return type.charAt(0).toUpperCase() + type.slice(1);
}
