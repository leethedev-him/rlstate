import Link from "next/link"
import { Home } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Home className="h-5 w-5 text-primary" />
              RLState
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Find your dream home with RLState. We make property search simple and enjoyable.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-foreground transition-colors">Properties</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Property Types</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/properties?type=house" className="hover:text-foreground transition-colors">Houses</Link></li>
              <li><Link href="/properties?type=apartment" className="hover:text-foreground transition-colors">Apartments</Link></li>
              <li><Link href="/properties?type=condo" className="hover:text-foreground transition-colors">Condos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@rlstate.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RLState. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
