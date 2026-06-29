import Link from "next/link"
import { Building2, Home, Warehouse, Building, TrendingUp, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/SearchBar"
import { PropertyCard } from "@/components/PropertyCard"
import { createClient } from "@/lib/supabase/server"

const categories = [
  { icon: Home, label: "Houses", href: "/properties?type=house" },
  { icon: Building2, label: "Apartments", href: "/properties?type=apartment" },
  { icon: Warehouse, label: "Condos", href: "/properties?type=condo" },
  { icon: Building, label: "Townhouses", href: "/properties?type=townhouse" },
]

const stats = [
  { icon: Home, value: "1,200+", label: "Properties Listed" },
  { icon: Users, value: "5,000+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: featured } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("featured", true)
    .limit(6)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full mb-4">
              Premium Real Estate
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Discover Your Dream
              <span className="block text-primary">Home Today</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explore exclusive properties in Ireland&apos;s most desirable locations. 
              From luxury penthouses to charming family homes.
            </p>
            <div className="mt-10 flex justify-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Browse by Property Type</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Find the perfect property that matches your lifestyle
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl"
              >
                <Icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">{cat.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Properties */}
      {featured && featured.length > 0 && (
        <section className="bg-muted/30 py-20 border-y">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full mb-3">
                  Handpicked
                </span>
                <h2 className="text-3xl font-bold sm:text-4xl">Featured Properties</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Exclusive listings curated just for you
                </p>
              </div>
              <Button asChild variant="outline" size="lg" className="hidden sm:flex">
                <Link href="/properties">View All Properties</Link>
              </Button>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((property) => {
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
            <div className="mt-12 text-center sm:hidden">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/properties">View All Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-6 py-16 text-center shadow-2xl sm:px-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Browse our exclusive collection of properties and let our expert team 
            help you find the home of your dreams.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link href="/properties">Schedule Viewing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
