import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/types/database"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

function formatStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

interface PropertyCardProps {
  property: Property
  primaryImage?: string
}

export function PropertyCard({ property, primaryImage }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group">
      <Card className="overflow-hidden border-2 transition-all hover:border-primary hover:shadow-2xl">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 bg-white/90 text-foreground border-0 shadow-lg">
            {formatStatus(property.status)}
          </Badge>
          <div className="absolute bottom-4 left-4">
            <div className="text-2xl font-bold text-white shadow-lg">
              {formatPrice(property.price)}
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="flex items-center gap-5 pt-4 border-t text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" /> 
              <span className="font-medium text-foreground">{property.bedrooms}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" /> 
              <span className="font-medium text-foreground">{property.bathrooms}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="h-4 w-4" /> 
              <span className="font-medium text-foreground">{property.square_feet.toLocaleString()}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
