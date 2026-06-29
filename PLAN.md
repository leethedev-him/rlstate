# Real Estate Website — Architecture & Implementation Plan

## Tech Stack

- **Frontend**: Next.js 16 with App Router + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Backend/Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for images
- **Hosting**: Vercel
- **Additional**: Supabase Realtime for live updates (optional)

---

## Database Schema

### Properties Table
| Column | Type |
|---|---|
| id | UUID (primary key) |
| title | text |
| description | text |
| price | decimal |
| location | text |
| address | text |
| bedrooms | integer |
| bathrooms | decimal |
| square_feet | integer |
| property_type | enum: house, apartment, condo |
| status | enum: for_sale, for_rent, sold |
| featured | boolean |
| created_at | timestamp |
| updated_at | timestamp |

### Property Images Table
| Column | Type |
|---|---|
| id | UUID (primary key) |
| property_id | UUID (foreign key) |
| image_url | text |
| is_primary | boolean |
| order | integer |

### Inquiries Table
| Column | Type |
|---|---|
| id | UUID (primary key) |
| property_id | UUID (foreign key) |
| name | text |
| email | text |
| phone | text |
| message | text |
| created_at | timestamp |

---

## Key Features

1. **Homepage**
   - Hero section with search bar
   - Featured properties carousel
   - Property type categories
   - Call-to-action sections

2. **Property Listings Page**
   - Grid view of all properties
   - Advanced filtering (price range, bedrooms, location, type)
   - Search functionality
   - Sorting options (price, date)
   - Pagination or infinite scroll

3. **Property Detail Page**
   - Full property information
   - Image gallery with lightbox
   - Property features and amenities
   - Contact/inquiry form
   - Similar properties section

4. **Contact/Inquiry System**
   - Form validation with React Hook Form
   - Supabase function or API route to handle submissions
   - Email notifications (Resend, SendGrid, or Supabase Edge Functions)

---

## Project Structure

```
rlstate/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (homepage)
│   ├── properties/
│   │   ├── page.tsx (listings)
│   │   └── [id]/
│   │       └── page.tsx (detail page)
│   └── api/
│       └── inquiries/
│           └── route.ts
├── components/
│   ├── ui/ (shadcn components)
│   ├── PropertyCard.tsx
│   ├── PropertyFilters.tsx
│   ├── ImageGallery.tsx
│   ├── InquiryForm.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── types/
│   └── database.types.ts
└── public/
```

---

## Implementation Phases

### Phase 1: Setup & Configuration
1. Initialize Next.js project with TypeScript
2. Configure Tailwind CSS and install shadcn/ui
3. Create Supabase project and get credentials
4. Set up environment variables
5. Create database tables and enable Row Level Security (RLS)
6. Configure Supabase Storage bucket for images

### Phase 2: Core Features
1. Create Supabase client utilities
2. Build homepage with hero and featured properties
3. Implement property listings page with filters
4. Add property detail page with image gallery
5. Create inquiry form and API endpoint
6. Add responsive design throughout

### Phase 3: Polish & Deployment
1. Add loading states and error handling
2. Optimize images (Next.js Image component)
3. Add SEO metadata
4. Test on mobile devices
5. Deploy to Vercel
6. Configure custom domain (optional)

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Optional Additions

- **Admin dashboard** — Manage properties (add/edit/delete)
- **Map integration** — Display property locations (Google Maps, Mapbox)
- **User authentication** — Allow users to save favorites
- **Advanced search** — Search by address, nearby schools, etc.
- **Email service** — e.g., Resend for transaction emails
