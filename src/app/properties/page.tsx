import { Suspense } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { PropertyCard } from "@/components/PropertyCard"
import { PropertyFilters } from "@/components/PropertyFilters"
import { SearchBar } from "@/components/SearchBar"
import { Button } from "@/components/ui/button"
import type { PropertyStatus, PropertyType } from "@/types/database"

interface PageProps {
  searchParams: Promise<{
    search?: string
    type?: string
    status?: string
    minPrice?: string
    maxPrice?: string
    minBeds?: string
    sort?: string
  }>
}

async function PropertyGrid({ searchParams }: { searchParams: PageProps["searchParams"] }) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase.from("properties").select("*, property_images(*)")

  if (params.search) {
    query = query.or(
      `location.ilike.%${params.search}%,title.ilike.%${params.search}%,address.ilike.%${params.search}%`,
    )
  }

  if (params.type) {
    query = query.eq("property_type", params.type as PropertyType)
  }

  if (params.status) {
    query = query.eq("status", params.status as PropertyStatus)
  }

  if (params.minPrice) {
    query = query.gte("price", parseFloat(params.minPrice))
  }

  if (params.maxPrice) {
    query = query.lte("price", parseFloat(params.maxPrice))
  }

  if (params.minBeds) {
    query = query.gte("bedrooms", parseInt(params.minBeds))
  }

  switch (params.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true })
      break
    case "price_desc":
      query = query.order("price", { ascending: false })
      break
    case "newest":
      query = query.order("created_at", { ascending: false })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data: properties, count } = await query

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold">No properties found</h3>
        <p className="text-muted-foreground mt-1">
          Try adjusting your search or filter criteria.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/properties">Clear Filters</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Showing {properties.length} {properties.length === 1 ? "property" : "properties"}
        {count && count > properties.length ? ` of ${count}` : ""}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => {
          const images = property.property_images ?? []
          const primary = images.find((i: { is_primary: boolean }) => i.is_primary) || images[0]
          return (
            <PropertyCard
              key={property.id}
              property={property}
              primaryImage={primary?.image_url}
            />
          )
        })}
      </div>
    </>
  )
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-muted-foreground mt-1">
            Find your ideal property
          </p>
        </div>
        <SearchBar initialQuery={params.search || ""} />
      </div>

      <div className="mt-8">
        <Suspense fallback={<div className="h-32" />}>
          <PropertyFilters />
        </Suspense>
      </div>

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          }
        >
          <PropertyGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
