# Boka's Yarn Market

A full-stack yarn market website for **Boka's Yarn Market** — a handcrafted crochet yarn market and photography business. Customers browse ready-made pieces, commission custom crochet through a design wizard, explore photography packages, and track orders. Studio owner manages inventory, quotes, reviews, and site content from a protected admin panel.

Built with **Next.js 16** (App Router), **Clerk** for authentication, **Supabase** for application data, and the existing **BokaMarket** backend for boutique products and yarn stock.

## Current state

The app is a working studio platform — not a starter template. These areas are implemented end-to-end:

| Area | Status |
| ---- | ------ |
| Public marketing site (home, about, contact) | Done |
| Crochet boutique (`/boutique`) | Done — live products from BokaMarket API with local fallbacks |
| Custom order wizard (`/design`) | Done — 6-step builder with sketch canvas and inspiration upload |
| Customer orders (`/my-orders`) | Done — status tracking, quotes, deposit flow |
| Photography packages (`/photography`) | Done — CMS-managed services |
| Portfolio gallery (`/gallery`) | Done — CMS-managed items |
| Admin dashboard (`/admin`) | Done — role-gated via `customers.role = 'admin'` |
| Order confirmation emails | Done — Resend via API route (optional Edge Function webhook) |
| Reviews | Done — submission, moderation, featured testimonials |

## Tech stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, custom Boka brand fonts (Outfit, Cormorant Garamond, Caveat)
- **Auth:** [Clerk](https://clerk.com) — session owner; integrated with Supabase third-party auth
- **Database:** [Supabase](https://supabase.com) (Postgres + RLS) — customers, orders, reviews, gallery, site settings, yarn colors, photo services
- **Boutique API:** [BokaMarket backend](https://boka-market-backend.onrender.com) — products and yarn inventory (with retry/timeouts and static fallbacks)
- **Email:** [Resend](https://resend.com) — customer + owner notifications on custom order submit
- **Icons:** Lucide React

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js App (App Router)                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Public site  │  │ /design      │  │ /admin (admin)    │  │
│  │ /boutique    │  │ /my-orders   │  │ orders, reviews,  │  │
│  │ /gallery …   │  │ (signed in)  │  │ gallery, settings │  │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬─────────┘  │
│         │                 │                     │            │
│         ▼                 ▼                     ▼            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Clerk (sessions)  →  Supabase client (RLS)         │   │
│  └──────────────────────────────────────────────────────┘   │
│         │                              │                    │
│         ▼                              ▼                    │
│  BokaMarket API                   Supabase Postgres          │
│  (products, yarn)                 (orders, customers, …)   │
└─────────────────────────────────────────────────────────────┘
```

**Auth model:** Clerk owns the user session. Supabase Auth is disabled — the browser and server Supabase clients pass Clerk session tokens so Row Level Security policies apply to `authenticated` users. See [docs/supabase-clerk-setup.md](docs/supabase-clerk-setup.md).

**Route protection:** `proxy.ts` uses `clerkMiddleware` to require sign-in on protected routes (`/design`, `/my-orders`, `/admin`, most API routes). Public pages (home, boutique, gallery, photography, about, contact, auth) stay open.

## Getting started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) (project uses `pnpm@11`)
- Clerk application with [Supabase third-party auth](https://dashboard.clerk.com/setup/supabase) configured
- Supabase project with migrations applied
- Resend API key (optional — orders save without it; emails show "Not configured")

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database migrations

Apply all SQL in `supabase/migrations/` via the Supabase SQL editor or CLI:

```bash
supabase db push
```

Migration order (by timestamp prefix):

1. `reviews_customers` — customers table, reviews
2. `orders` — custom/boutique orders, status history
3. `api_grants` — RLS policies
4. `order_status_history_admin_update`
5. `yarn_colors`
6. `site_settings`
7. `gallery_items`
8. `photo_services`

### Environment variables

Create `.env.local`:

```env
# Clerk (from dashboard.clerk.com → API Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (Dashboard → Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...

# BokaMarket backend (optional — defaults to Render URL)
NEXT_PUBLIC_API_URL=https://boka-market-backend.onrender.com

# Resend — order confirmation emails (server-only)
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM="Boka Studio <hello@bokastudio.com>"
EMAIL_REPLY_TO=hello@bokastudio.com

# Local dev with onboarding@resend.dev — must match your Resend signup email
EMAIL_DEV_OVERRIDE_TO=you@example.com
```

Legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted as a fallback for the publishable key.

### Promote studio owner

After your first sign-in, grant admin access in Supabase:

```sql
update public.customers
set role = 'admin'
where clerk_id = 'user_xxxxxxxx';
```

Admins are redirected to `/admin` after login.

### Verify Supabase + Clerk

While signed in, check:

```
GET /api/health/supabase
```

Expected: `"ok": true` with both `anon` and `authed` succeeding. Then submit a test design at `/design` — it should appear on `/my-orders`.

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint |

## Routes

### Public

| Route | Description |
| ----- | ----------- |
| `/` | Landing — featured products, testimonials, CTAs |
| `/boutique` | Ready-made crochet catalog |
| `/photography` | Photography service packages |
| `/gallery` | Portfolio gallery |
| `/about` | Studio story |
| `/contact` | Contact form and details |
| `/auth/login`, `/auth/register` | Clerk sign-in / sign-up |

### Authenticated (customers)

| Route | Description |
| ----- | ----------- |
| `/design` | 6-step custom order wizard (piece → stitch → colour → fit → vision → review) |
| `/my-orders` | Order history, quotes, deposit payment, reorder |

### Admin (`role = 'admin'`)

| Route | Description |
| ----- | ----------- |
| `/admin` | Dashboard stats and recent orders |
| `/admin/orders` | Order list and detail — quotes, status, timeline |
| `/admin/reviews` | Moderate and feature customer reviews |
| `/admin/yarn` | Yarn colour stock |
| `/admin/products` | Boutique product CRUD (BokaMarket API) |
| `/admin/gallery` | Gallery image management |
| `/admin/photography` | Photography package management |
| `/admin/settings` | Site config (contact, WhatsApp, turnaround, etc.) |

## Project structure

```
app/
  (site)/          # Public pages with shared Navbar + Footer
  admin/           # Admin panel (AdminRoute + AdminShell)
  auth/            # Clerk login/register
  api/             # Health check, order confirmation email
components/
  admin/           # Admin UI (orders, products, gallery, …)
  design/          # Custom order wizard
  landing/         # Home page sections
  orders/          # Customer order cards and status
data/              # Static fallbacks (products, yarn, features, images)
docs/              # Setup guides
hooks/             # useSupabaseClient, useAdminCustomer, …
lib/               # Supabase clients, email, API helpers, fonts
services/          # Data access (orders, products, gallery, site, …)
supabase/
  migrations/      # Postgres schema + RLS
  functions/       # Optional Edge Function for order emails
types/             # Shared TypeScript types
proxy.ts           # Clerk middleware (route protection)
```

## Documentation

- [Supabase + Clerk setup](docs/supabase-clerk-setup.md) — third-party auth, migrations, health check
- [Order email setup](docs/order-email-setup.md) — Resend configuration, flow, optional webhook

## Notes

- **BokaMarket cold starts:** The Render-hosted backend can take 30+ seconds on first request. The app retries with timeouts and falls back to `data/products.ts` and `data/yarnStock.ts` when the API is unreachable.
- **Emails without Resend:** Custom orders still persist to Supabase; the confirmation screen indicates whether email was sent.
- **Deposit flow:** Customers accept quotes and pay a 30% deposit (simulated in-app for now) before production begins.
