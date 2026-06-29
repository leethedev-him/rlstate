"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const propertyTypes = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
]

const statuses = [
  { value: "for_sale", label: "For Sale" },
  { value: "for_rent", label: "For Rent" },
  { value: "sold", label: "Sold" },
  { value: "pending", label: "Pending" },
]

const sortOptions = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
]

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") || ""
  const type = searchParams.get("type") || ""
  const status = searchParams.get("status") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const minBeds = searchParams.get("minBeds") || ""
  const sort = searchParams.get("sort") || ""

  const buildQuery = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams()
      const all = { search, type, status, minPrice, maxPrice, minBeds, sort, ...updates }
      Object.entries(all).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })
      return params.toString()
    },
    [search, type, status, minPrice, maxPrice, minBeds, sort],
  )

  function updateParam(key: string, value: string) {
    router.push(`/properties?${buildQuery({ [key]: value })}`)
  }

  function clearFilters() {
    router.push("/properties")
  }

  const hasFilters = type || status || minPrice || maxPrice || minBeds || sort

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Property Type</Label>
          <Select value={type} onValueChange={(v) => updateParam("type", v)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(v) => updateParam("status", v)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="$No limit"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minBeds">Min Bedrooms</Label>
          <Input
            id="minBeds"
            type="number"
            min={0}
            placeholder="Any"
            value={minBeds}
            onChange={(e) => updateParam("minBeds", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sort} onValueChange={(v) => updateParam("sort", v)}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  )
}
