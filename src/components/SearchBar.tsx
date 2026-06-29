"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/properties?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push("/properties")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by location, address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}
