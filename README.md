# Elite Brokers NY

Premium NYC real estate website and admin dashboard.

## Structure

```
elite-brokers-ny/
├── app/
│   ├── page.tsx
│   ├── listings/page.tsx
│   ├── listings/[id]/page.tsx
│   ├── sell/page.tsx
│   ├── rent/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── dashboard/page.tsx
│   ├── dashboard/leads/page.tsx
│   ├── dashboard/listings/page.tsx
│   ├── dashboard/appointments/page.tsx
│   ├── dashboard/marketing/page.tsx
│   ├── dashboard/settings/page.tsx
│   └── api/
├── components/
│   ├── site/          # Header, footer, search, social icons
│   ├── dashboard/     # Dashboard shell & layout
│   ├── listings/      # Property cards, detail, grid
│   ├── forms/         # Lead, contact, valuation forms
│   └── ui/            # shadcn/ui primitives
├── lib/
│   ├── supabase.ts
│   ├── utils.ts
│   ├── mock-data.ts
│   ├── types.ts
│   ├── constants.ts
│   ├── stripe.ts
│   └── resend.ts
├── supabase/
│   └── schema.sql
└── .env.example
```

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Website: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard

## Setup

1. Run `supabase/schema.sql` in your Supabase SQL Editor
2. Fill in `.env.local` from `.env.example`
3. Deploy with `npx vercel`

See full documentation in sections below.

## Tech Stack

Next.js 14 · TypeScript · Tailwind CSS · shadcn/ui · Supabase · Stripe · Resend · Google Maps · Vercel

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `RESEND_API_KEY` | Resend email API key |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key |
| `NEXT_PUBLIC_APP_URL` | App URL (http://localhost:3000) |

The app runs with mock data when API keys are not configured.

## API Routes

| Route | Methods |
|-------|---------|
| `/api/leads` | GET, POST |
| `/api/listings` | GET, POST |
| `/api/appointments` | GET, POST |
| `/api/email` | POST |
| `/api/stripe/checkout` | POST |
| `/api/stripe/webhook` | POST |
| `/api/mls` | GET, POST (placeholder) |
