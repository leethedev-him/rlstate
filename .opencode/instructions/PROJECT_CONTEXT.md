# Real Estate Website — Project Context

## Overview
Real estate listing website hosted on Vercel with Supabase backend.

## Tech Stack
- **Next.js 16.2.9** with App Router + TypeScript
- **Tailwind CSS v4** + shadcn/ui components
- **Supabase** (PostgreSQL, Storage, Auth)
- **Lucide React** for icons

## Critical Next.js 16 Breaking Changes
- `params` and `searchParams` are **async** — must be `await`ed
- `middleware.ts` renamed to `proxy.ts`, export renamed to `proxy`
- `cookies()` and `headers()` are async
- `priority` prop on `next/image` deprecated → use `preload`
- `generateMetadata` params are async
- `useRef()` requires initial value in React 19

## Database Schema (Supabase)

### Properties
- id: UUID (PK)
- title: text
- description: text
- price: decimal
- location: text
- address: text
- bedrooms: integer
- bathrooms: decimal
- square_feet: integer
- property_type: enum (house, apartment, condo, townhouse, land)
- status: enum (for_sale, for_rent, sold, pending)
- featured: boolean
- created_at: timestamp
- updated_at: timestamp

### Property Images
- id: UUID (PK)
- property_id: UUID (FK → properties)
- image_url: text
- is_primary: boolean
- sort_order: integer
- created_at: timestamp

### Inquiries
- id: UUID (PK)
- property_id: UUID (FK → properties, nullable)
- name: text
- email: text
- phone: text
- message: text
- created_at: timestamp

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          (root layout with fonts)
│   ├── page.tsx            (homepage)
│   ├── globals.css         (Tailwind v4 + shadcn/ui CSS)
│   ├── properties/
│   │   ├── page.tsx        (listing with filters)
│   │   └── [id]/page.tsx   (property detail)
│   └── api/
│       └── inquiries/route.ts (contact form handler)
├── components/
│   ├── ui/                 (shadcn/ui components)
│   ├── PropertyCard.tsx
│   ├── PropertyFilters.tsx
│   ├── PropertyGallery.tsx
│   ├── InquiryForm.tsx
│   ├── SearchBar.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts       (browser client)
│   │   └── server.ts       (server client)
│   └── utils.ts            (cn utility)
└── types/
    └── database.ts         (TypeScript types)
```

## Environment Variables Needed
```
NEXT_PUBLIC_SUPABASE_URL=https://ehtvqrdmqkknewefhytv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<configured>
SUPABASE_SERVICE_ROLE_KEY=<configured>
```

**Status**: ✅ All configured in `.env.local`

## Supabase Project
- **Name**: rlstate
- **Reference**: ehtvqrdmqkknewefhytv
- **Region**: West EU (Ireland)
- **Dashboard**: https://supabase.com/dashboard/project/ehtvqrdmqkknewefhytv

## What's Already Set Up
- Next.js 16.2.9 project with TypeScript + App Router (via `create-next-app`)
- Tailwind CSS v4 with PostCSS (`@tailwindcss/postcss`)
- `next/font` with Geist Sans + Geist Mono
- Root layout with HTML + body structure
- `@supabase/supabase-js` and `@supabase/ssr` installed
- Git repository initialized
- `opencode.json` with instructions config
- `CLAUDE.md` referencing context files

## Project Status
- [x] Next.js project initialized (with Tailwind v4, TypeScript, App Router)
- [x] CSS updated to full shadcn/ui theme variables
- [x] shadcn/ui components installed (via `npx shadcn`)
- [x] lib/utils.ts with cn() helper created
- [x] Supabase client utilities created (client.ts + server.ts)
- [x] .env.local with Supabase credentials
- [x] Database schema created (SQL migration)
- [x] Homepage with hero + featured properties
- [x] Property listing page with search/filter
- [x] Property detail page with image gallery
- [x] Contact/inquiry form
- [x] Responsive design
- [x] Vercel deployment config
- [x] Images optimized with next/image
- [x] Supabase CLI installed
- [x] Vercel CLI installed
- [x] All lint issues resolved
- [x] Production build verified
- [x] Deployed to Vercel: https://rlstate.vercel.app

## Installed Skills
- nextjs (vercel-labs/vercel-plugin@nextjs)
- supabase (supabase/agent-skills@supabase)
- supabase-postgres-best-practices (supabase/agent-skills@supabase-postgres-best-practices)
- tailwind-v4-shadcn (secondsky/claude-skills@tailwind-v4-shadcn)
- web-design-guidelines (vercel-labs/agent-skills@web-design-guidelines)
- responsive-design (akillness/oh-my-skills@responsive-design)
- tailwind-design-system (wshobson/agents@tailwind-design-system)
