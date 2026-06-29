import { notFound } from "next/navigation"
import Link from "next/link"
import React from "react"
import { MapPin, Bed, Bath, Square, ArrowLeft, Home, Building2, Warehouse, Building } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PropertyGallery } from "@/components/PropertyGallery"
import { InquiryForm } from "@/components/InquiryForm"
import { BookingForm } from "@/components/BookingForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageProps {
  params: Promise<{ id: string }>
}

function typeIcon(type: string) {
  switch (type) {
    case "house": return Home
    case "apartment": return Building2
    case "condo": return Warehouse
    case "townhouse": return Building
    default: return Home
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: property } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("id", id)
    .single()

  if (!property) {
    notFound()
  }

  const images = property.property_images ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/properties" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </Link>
      </Button>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PropertyGallery images={images} />

          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold sm:text-3xl">{property.title}</h1>
                  <Badge variant="secondary" className="shrink-0">
                    {formatStatus(property.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-primary shrink-0">
                {formatPrice(property.price)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
              <span className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-muted-foreground" /> {property.bedrooms} Bed
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-muted-foreground" /> {property.bathrooms} Bath
              </span>
              <span className="flex items-center gap-1.5">
                <Square className="h-4 w-4 text-muted-foreground" /> {property.square_feet.toLocaleString()} sq ft
              </span>
              <span className="flex items-center gap-1.5">
                {React.createElement(typeIcon(property.property_type), { className: "h-4 w-4 text-muted-foreground" })} {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-2 text-muted-foreground whitespace-pre-line">{property.description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold">Details</h2>
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <dt className="text-sm text-muted-foreground">Property Type</dt>
                <dd className="font-medium capitalize">{property.property_type}</dd>
              </div>
              <div className="rounded-lg border p-3">
                <dt className="text-sm text-muted-foreground">Status</dt>
                <dd className="font-medium">{formatStatus(property.status)}</dd>
              </div>
              <div className="rounded-lg border p-3">
                <dt className="text-sm text-muted-foreground">Bedrooms</dt>
                <dd className="font-medium">{property.bedrooms}</dd>
              </div>
              <div className="rounded-lg border p-3">
                <dt className="text-sm text-muted-foreground">Bathrooms</dt>
                <dd className="font-medium">{property.bathrooms}</dd>
              </div>
              <div className="rounded-lg border p-3">
                <dt className="text-sm text-muted-foreground">Square Feet</dt>
                <dd className="font-medium">{property.square_feet.toLocaleString()}</dd>
              </div>
              <div className="rounded-lg border p-3">
                <dt className="text-sm text-muted-foreground">Address</dt>
                <dd className="font-medium">{property.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="inquiry" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="inquiry">Send Inquiry</TabsTrigger>
                    <TabsTrigger value="booking">Book Viewing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="inquiry" className="mt-4">
                    <InquiryForm propertyId={property.id} />
                  </TabsContent>
                  <TabsContent value="booking" className="mt-4">
                    <BookingForm propertyId={property.id} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
