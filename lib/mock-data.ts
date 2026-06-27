import type {
  Listing,
  ListingImage,
  Lead,
  Appointment,
  DashboardStats,
  Profile,
  MarketingPost,
  ActivityLog,
} from "@/lib/types";

export const MOCK_IMAGES = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  realtor: "/images/j-febry-headshot.png",
  logo: "/images/logo.png",
  property1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  property2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  property3: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  property4: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  property5: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  property6: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  interior1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  interior2: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
};

const listingImages: Record<string, ListingImage[]> = {
  "1": [
    { id: "img-1-1", listing_id: "1", url: MOCK_IMAGES.property1, alt: "Tribeca Penthouse exterior", sort_order: 0, is_primary: true },
    { id: "img-1-2", listing_id: "1", url: MOCK_IMAGES.interior1, alt: "Living room", sort_order: 1, is_primary: false },
    { id: "img-1-3", listing_id: "1", url: MOCK_IMAGES.interior2, alt: "Kitchen", sort_order: 2, is_primary: false },
  ],
  "2": [
    { id: "img-2-1", listing_id: "2", url: MOCK_IMAGES.property2, alt: "Brooklyn Heights Brownstone", sort_order: 0, is_primary: true },
  ],
  "3": [
    { id: "img-3-1", listing_id: "3", url: MOCK_IMAGES.property3, alt: "Midtown Luxury Condo", sort_order: 0, is_primary: true },
  ],
  "4": [
    { id: "img-4-1", listing_id: "4", url: MOCK_IMAGES.property4, alt: "Queens Modern Apartment", sort_order: 0, is_primary: true },
  ],
  "5": [
    { id: "img-5-1", listing_id: "5", url: MOCK_IMAGES.property5, alt: "Bronx Riverdale Home", sort_order: 0, is_primary: true },
  ],
  "6": [
    { id: "img-6-1", listing_id: "6", url: MOCK_IMAGES.property6, alt: "Williamsburg Loft", sort_order: 0, is_primary: true },
  ],
};

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    slug: "tribeca-penthouse-with-skyline-views",
    title: "Tribeca Penthouse with Skyline Views",
    description: "Experience unparalleled luxury in this stunning Tribeca penthouse featuring floor-to-ceiling windows, a private terrace with panoramic Manhattan skyline views, and designer finishes throughout. This 3-bedroom residence offers an open-concept living space, gourmet chef's kitchen with top-tier appliances, and spa-like primary suite.",
    address: "145 Hudson Street, PH-A",
    city: "New York",
    borough: "Manhattan",
    state: "NY",
    zip: "10013",
    price: 4500000,
    beds: 3,
    baths: 3.5,
    sqft: 3200,
    listing_type: "sale",
    status: "active",
    featured: true,
    lat: 40.7195,
    lng: -74.0089,
    year_built: 2019,
    property_type: "Condo",
    amenities: ["Doorman", "Gym", "Roof Deck", "Parking", "Central AC"],
    views: 1247,
    inquiries: 34,
    created_at: "2026-01-15T10:00:00Z",
    images: listingImages["1"],
  },
  {
    id: "2",
    slug: "brooklyn-heights-historic-brownstone",
    title: "Brooklyn Heights Historic Brownstone",
    description: "A beautifully restored 4-story brownstone in the heart of Brooklyn Heights. Original details including crown moldings, fireplaces, and hardwood floors blend seamlessly with modern updates. Garden-level access and proximity to the Promenade make this a rare find.",
    address: "42 Remsen Street",
    city: "Brooklyn",
    borough: "Brooklyn",
    state: "NY",
    zip: "11201",
    price: 3200000,
    beds: 4,
    baths: 3,
    sqft: 3800,
    listing_type: "sale",
    status: "active",
    featured: true,
    lat: 40.6962,
    lng: -73.9936,
    year_built: 1890,
    property_type: "Townhouse",
    amenities: ["Garden", "Fireplace", "Original Details", "Basement"],
    views: 892,
    inquiries: 28,
    created_at: "2026-02-01T10:00:00Z",
    images: listingImages["2"],
  },
  {
    id: "3",
    slug: "midtown-east-luxury-condo",
    title: "Midtown East Luxury Condo",
    description: "Sophisticated 2-bedroom condo in a full-service building steps from Grand Central. High ceilings, oversized windows, and a sleek modern aesthetic define this exceptional home.",
    address: "200 East 59th Street, 28B",
    city: "New York",
    borough: "Manhattan",
    state: "NY",
    zip: "10022",
    price: 1850000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    listing_type: "sale",
    status: "active",
    featured: true,
    lat: 40.7614,
    lng: -73.9654,
    year_built: 2015,
    property_type: "Condo",
    amenities: ["Concierge", "Pool", "Gym", "Valet"],
    views: 654,
    inquiries: 19,
    created_at: "2026-03-10T10:00:00Z",
    images: listingImages["3"],
  },
  {
    id: "4",
    slug: "riverdale-2br-condo-rental",
    title: "Riverdale 2BR Condo — Pets Welcome",
    description: "Available now! 2-bedroom, 2-bathroom condo in an elevator building. Washer & dryer in unit, pets allowed, and two balconies. Contact J Febry to schedule a viewing. #rentwithjfebry",
    address: "Riverdale",
    city: "Bronx",
    borough: "Bronx",
    state: "NY",
    zip: "10463",
    price: 3800,
    beds: 2,
    baths: 2,
    sqft: 1100,
    listing_type: "rent",
    status: "active",
    featured: true,
    property_type: "Condo",
    amenities: ["Elevator", "In-Unit Laundry", "Pet Friendly", "2 Balconies"],
    views: 423,
    inquiries: 15,
    created_at: "2026-03-25T10:00:00Z",
    images: listingImages["4"],
  },
  {
    id: "5",
    slug: "yonkers-duplex-4br-rental",
    title: "Yonkers Duplex — 4 Bed / 4 Bath",
    description: "New construction single-family duplex for rent. 4 bedrooms, 4 bathrooms, backyard, washer & dryer, basement, garage + driveway. Tenant pays all utilities. Schedule a viewing today.",
    address: "Yonkers",
    city: "Yonkers",
    borough: "Westchester",
    state: "NY",
    zip: "10704",
    price: 6000,
    beds: 4,
    baths: 4,
    sqft: 2800,
    listing_type: "rent",
    status: "active",
    featured: true,
    property_type: "Duplex",
    amenities: ["Garage", "Driveway", "Backyard", "Basement", "In-Unit Laundry"],
    views: 312,
    inquiries: 22,
    created_at: "2026-03-06T10:00:00Z",
    images: listingImages["5"],
  },
  {
    id: "6",
    slug: "west-haven-ct-3br-rental",
    title: "West Haven, CT — 3 Bed / 3 Bath",
    description: "Available now on Park Street. 3 bedrooms, 3 bathrooms, 1st floor unit with backyard access, in-unit laundry. Water included. Schedule your viewing with J Febry.",
    address: "Park Street",
    city: "West Haven",
    borough: "Connecticut",
    state: "CT",
    zip: "06516",
    price: 2200,
    beds: 3,
    baths: 3,
    sqft: 1400,
    listing_type: "rent",
    status: "active",
    featured: true,
    property_type: "Apartment",
    amenities: ["Backyard Access", "In-Unit Laundry", "Water Included"],
    views: 567,
    inquiries: 31,
    created_at: "2026-04-06T10:00:00Z",
    images: listingImages["6"],
  },
];

export const MOCK_LEADS: Lead[] = [
  { id: "l1", full_name: "Sarah Chen", email: "sarah.chen@email.com", phone: "(917) 555-0142", interest: "Tribeca Penthouse", source: "Website", status: "new", notes: "Interested in weekend showing", follow_up_date: "2026-06-28", created_at: "2026-06-26T09:00:00Z" },
  { id: "l2", full_name: "Michael Rodriguez", email: "m.rodriguez@email.com", phone: "(646) 555-0198", interest: "Brooklyn Brownstone", source: "Zillow", status: "contacted", notes: "Pre-approved for $3.5M", follow_up_date: "2026-06-29", created_at: "2026-06-24T14:00:00Z" },
  { id: "l3", full_name: "Emily Watson", email: "emily.w@email.com", phone: "(212) 555-0167", interest: "LIC Rental", source: "Instagram", status: "qualified", notes: "Looking to move by August", follow_up_date: "2026-06-27", created_at: "2026-06-22T11:00:00Z" },
  { id: "l4", full_name: "David Kim", email: "david.kim@email.com", phone: "(718) 555-0134", interest: "Home Valuation", source: "Referral", status: "showing", notes: "Selling Park Slope condo", follow_up_date: "2026-06-30", created_at: "2026-06-20T08:00:00Z" },
  { id: "l5", full_name: "Jennifer Lopez", email: "j.lopez@email.com", phone: "(347) 555-0189", interest: "Midtown Condo", source: "Realtor.com", status: "closed", notes: "Closed on 6/15", created_at: "2026-05-01T10:00:00Z" },
  { id: "l6", full_name: "Robert Taylor", email: "r.taylor@email.com", phone: "(929) 555-0156", interest: "Williamsburg Loft", source: "Website", status: "lost", notes: "Chose competing listing", created_at: "2026-06-01T09:00:00Z" },
  { id: "l7", full_name: "Lisa Park", email: "lisa.park@email.com", phone: "(212) 555-0178", interest: "Upper East Side co-op", source: "Website", status: "new", notes: "Valuation request", created_at: "2026-06-26T16:00:00Z" },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "a1", lead_id: "l1", listing_id: "1", appointment_type: "tour", status: "pending", scheduled_at: "2026-06-28T14:00:00Z", created_at: "2026-06-26T09:30:00Z", lead: { id: "l1", full_name: "Sarah Chen", email: "sarah.chen@email.com", phone: "(917) 555-0142", status: "new", created_at: "2026-06-26T09:00:00Z" } },
  { id: "a2", lead_id: "l4", appointment_type: "consultation", status: "confirmed", scheduled_at: "2026-06-27T10:00:00Z", created_at: "2026-06-20T08:30:00Z", lead: { id: "l4", full_name: "David Kim", email: "david.kim@email.com", phone: "(718) 555-0134", status: "showing", created_at: "2026-06-20T08:00:00Z" } },
  { id: "a3", lead_id: "l2", listing_id: "2", appointment_type: "tour", status: "confirmed", scheduled_at: "2026-06-29T11:00:00Z", created_at: "2026-06-25T10:30:00Z", lead: { id: "l2", full_name: "Michael Rodriguez", email: "m.rodriguez@email.com", phone: "(646) 555-0198", status: "contacted", created_at: "2026-06-24T14:00:00Z" } },
  { id: "a4", lead_id: "l7", appointment_type: "valuation", status: "pending", scheduled_at: "2026-07-01T15:00:00Z", created_at: "2026-06-26T16:00:00Z", lead: { id: "l7", full_name: "Lisa Park", email: "lisa.park@email.com", phone: "(212) 555-0178", status: "new", created_at: "2026-06-26T16:00:00Z" } },
  { id: "a5", lead_id: "l5", appointment_type: "follow-up", status: "completed", scheduled_at: "2026-06-15T14:00:00Z", created_at: "2026-06-10T09:00:00Z", lead: { id: "l5", full_name: "Jennifer Lopez", email: "j.lopez@email.com", status: "closed", created_at: "2026-05-01T10:00:00Z" } },
];

export const MOCK_PROFILE: Profile = {
  id: "p1",
  full_name: "J Febry",
  email: "Jfebry@therealtor.team",
  phone: "(347) 961-8286",
  avatar_url: MOCK_IMAGES.realtor,
  bio: "J Febry is a New York State licensed real estate broker helping clients buy, sell, rent, and invest across the NYC metro area — including the Bronx, Westchester, and Connecticut. Known on Instagram as @jfebry.therealtor, he specializes in residential rentals, sales, and investment properties. From Riverdale condos to Yonkers duplexes, J delivers responsive service, honest guidance, and results you can trust. Call or DM to schedule a viewing today.",
  license_number: "New York State Licensed Real Estate Broker",
};

export const MOCK_STATS: DashboardStats = {
  totalLeads: 47,
  activeListings: 12,
  pendingAppointments: 8,
  monthlyInquiries: 156,
  conversionRate: 23.4,
  monthlyRevenue: 48500,
};

export const MOCK_MARKETING_POSTS: MarketingPost[] = [
  { id: "mp1", title: "Riverdale Condo — Just Listed", content: "Available now 🔑 2 Bedrooms, 2 Bathrooms $3,800/mo. Elevator building, washer & dryer in unit, pets allowed, 2 balconies. 📍Riverdale, The Bronx 10463. Contact J Febry 📞 347-961-8286 #realestate #realtor #justlisted #rentwithjfebry", platform: "instagram", listing_id: "4", created_at: "2026-03-25T10:00:00Z" },
  { id: "mp2", title: "Yonkers Duplex Launch", content: "Now available for rent 🔑 NEW CONSTRUCTION — Single Family Duplex $6,000/mo. 4 bed, 4 bath, backyard, garage + driveway. 📍Yonkers, NY. Schedule a viewing: 347-961-8286", platform: "instagram", listing_id: "5", created_at: "2026-03-06T10:00:00Z" },
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: "al1", action: "lead_created", entity_type: "lead", entity_id: "l1", metadata: { source: "Website" }, created_at: "2026-06-26T09:00:00Z" },
  { id: "al2", action: "listing_updated", entity_type: "listing", entity_id: "1", metadata: { field: "price" }, created_at: "2026-06-25T14:00:00Z" },
  { id: "al3", action: "appointment_scheduled", entity_type: "appointment", entity_id: "a1", created_at: "2026-06-26T09:30:00Z" },
];

export const TESTIMONIALS = [
  { id: "t1", name: "Maria G.", role: "Renter — Riverdale, Bronx", content: "J helped us find a beautiful 2-bedroom condo in Riverdale with in-unit laundry and pet-friendly policies. He responded fast on Instagram and made the whole process easy.", rating: 5 },
  { id: "t2", name: "The Johnson Family", role: "Renters — Yonkers", content: "We rented a spacious duplex in Yonkers through J Febry. Professional, transparent, and always available by phone. Highly recommend for Westchester rentals.", rating: 5 },
  { id: "t3", name: "David R.", role: "Buyer — NYC Metro", content: "J knows the market inside and out. Whether you're renting or buying, he gives straight answers and fights for your best deal. #rentwithjfebry is real.", rating: 5 },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return MOCK_LISTINGS.find((l) => l.slug === slug);
}

export function getFeaturedListings(): Listing[] {
  return MOCK_LISTINGS.filter((l) => l.featured && l.status === "active");
}

export function getSaleListings(): Listing[] {
  return MOCK_LISTINGS.filter((l) => l.listing_type === "sale" && l.status === "active");
}

export function getRentListings(): Listing[] {
  return MOCK_LISTINGS.filter((l) => l.listing_type === "rent" && l.status === "active");
}

export function getListingById(id: string): Listing | undefined {
  return MOCK_LISTINGS.find((l) => l.id === id);
}
