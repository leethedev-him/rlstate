# RLState - Real Estate Website Setup Guide

A modern real estate listing website built with Next.js 16, Tailwind CSS v4, shadcn/ui, and Supabase.

## Current Status

✅ **Supabase Project Created**: `rlstate` (ref: `ehtvqrdmqkknewefhytv`)  
✅ **Region**: West EU (Ireland)  
✅ **Database**: Tables created and RLS enabled  
✅ **Environment**: `.env.local` configured with credentials  
✅ **Migration**: Applied successfully  

## Prerequisites

- Node.js 20+ installed
- npm or pnpm package manager
- Supabase account ([sign up here](https://supabase.com))
- Vercel account for deployment ([sign up here](https://vercel.com))

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup (Already Completed ✅)

Your Supabase project is ready:
- **Project**: rlstate
- **Dashboard**: https://supabase.com/dashboard/project/ehtvqrdmqkknewefhytv
- **Database**: Tables created with RLS policies
- **Credentials**: Already in `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application uses three main tables:

### Properties Table
Stores property listings with details like title, price, location, bedrooms, bathrooms, etc.

### Property Images Table
Stores multiple images per property with primary image flag and sort order.

### Inquiries Table
Stores contact form submissions from potential buyers/renters.

All tables have Row Level Security (RLS) enabled with public read access for properties and anonymous insert for inquiries.

## Image Optimization

The project uses `next/image` for automatic image optimization. Remote images from Supabase Storage are configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*.supabase.co",
    },
  ],
}
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add `SUPABASE_SERVICE_ROLE_KEY`

5. Redeploy to apply environment variables:
```bash
vercel --prod
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts and navigation
│   ├── page.tsx                # Homepage with hero and featured properties
│   ├── globals.css             # Tailwind v4 CSS with @theme inline
│   ├── properties/
│   │   ├── page.tsx            # Property listing with search/filters
│   │   └── [id]/page.tsx       # Property detail page
│   └── api/
│       └── inquiries/route.ts  # API endpoint for contact form
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── PropertyCard.tsx        # Property card component
│   ├── PropertyFilters.tsx     # Search filters component
│   ├── PropertyGallery.tsx     # Image gallery with lightbox
│   ├── InquiryForm.tsx         # Contact form
│   ├── SearchBar.tsx           # Search input
│   ├── Header.tsx              # Site header with navigation
│   └── Footer.tsx              # Site footer
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Supabase client
│   └── utils.ts                # Utility functions (cn helper)
└── types/
    └── database.ts             # TypeScript type definitions
```

## Features

- ✅ Server-side rendering with Next.js 16 App Router
- ✅ Tailwind CSS v4 with shadcn/ui components
- ✅ Image optimization with next/image
- ✅ Advanced property search and filtering
- ✅ Property detail pages with image galleries
- ✅ Contact/inquiry form with API route
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Row Level Security (RLS) on all database tables
- ✅ TypeScript for type safety

## Next Steps

### Add Sample Data

To test the application, add sample properties via the Supabase Dashboard:

1. Go to Table Editor
2. Insert sample records into `properties` table
3. Add corresponding images to `property_images` table
4. Set one property's `featured` flag to `true`

### Set Up Supabase Storage (Optional)

To upload images via Supabase Storage:

1. Create a storage bucket called `property-images`
2. Set bucket to public
3. Upload images and use the public URLs in `property_images.image_url`

### Customize Styling

- Edit `src/app/globals.css` to customize colors
- Modify shadcn/ui component styles in `src/components/ui/`
- Update branding in Header and Footer components

## Troubleshooting

### Build Errors

If you encounter build errors, ensure:
- Environment variables are set correctly
- Supabase credentials are valid
- Database schema has been applied

### Image Loading Issues

If images don't load:
- Verify `remotePatterns` in `next.config.ts`
- Check image URLs are from Supabase Storage
- Ensure images are publicly accessible

### Database Connection Issues

If queries fail:
- Verify Supabase credentials in `.env.local`
- Check RLS policies in Supabase Dashboard
- Ensure migrations have been applied

## Support

For issues related to:
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Supabase**: [Supabase Documentation](https://supabase.com/docs)
- **shadcn/ui**: [shadcn/ui Documentation](https://ui.shadcn.com)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License.
