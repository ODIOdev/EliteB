-- Elite Brokers NY — Supabase Schema
-- Run in Supabase SQL Editor

-- Core tables

create table listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text,
  city text,
  state text default 'NY',
  price numeric,
  listing_type text check (listing_type in ('sale', 'rent')),
  status text default 'active',
  beds int,
  baths numeric,
  sqft int,
  description text,
  featured boolean default false,
  created_at timestamp default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  interest text,
  source text,
  status text default 'new',
  notes text,
  follow_up_date date,
  created_at timestamp default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  listing_id uuid references listings(id),
  appointment_type text,
  scheduled_at timestamp,
  status text default 'pending',
  created_at timestamp default now()
);

-- Indexes
create index idx_listings_status on listings(status);
create index idx_listings_listing_type on listings(listing_type);
create index idx_listings_featured on listings(featured);
create index idx_leads_status on leads(status);
create index idx_leads_source on leads(source);
create index idx_appointments_scheduled_at on appointments(scheduled_at);
create index idx_appointments_status on appointments(status);
create index idx_appointments_lead_id on appointments(lead_id);
create index idx_appointments_listing_id on appointments(listing_id);

-- Optional: listing images (app UI)
create table listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade not null,
  url text not null,
  alt text,
  sort_order int default 0,
  is_primary boolean default false,
  created_at timestamp default now()
);

create index idx_listing_images_listing_id on listing_images(listing_id);

-- Row Level Security
alter table listings enable row level security;
alter table leads enable row level security;
alter table appointments enable row level security;
alter table listing_images enable row level security;

-- Public read active listings
create policy "Public can view active listings"
  on listings for select
  using (status = 'active');

create policy "Public can view listing images"
  on listing_images for select
  using (true);

-- Public can submit leads & appointments
create policy "Anyone can create leads"
  on leads for insert
  with check (true);

create policy "Anyone can create appointments"
  on appointments for insert
  with check (true);

-- Authenticated admin access (extend when auth is wired up)
-- create policy "Admins manage listings" on listings for all using (...);
-- create policy "Admins manage leads" on leads for all using (...);
-- create policy "Admins manage appointments" on appointments for all using (...);

-- Storage buckets (Supabase dashboard)
-- insert into storage.buckets (id, name, public) values ('listing-images', 'listing-images', true);
