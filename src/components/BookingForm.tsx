"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BookingFormProps {
  propertyId: string
}

export function BookingForm({ propertyId }: BookingFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          propertyId, 
          name, 
          email, 
          phone, 
          preferredDate, 
          preferredTime, 
          message 
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to book viewing")
      }

      setSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setPreferredDate("")
      setPreferredTime("")
      setMessage("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h3 className="font-semibold text-lg">Viewing Booked!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your viewing appointment has been requested. We&apos;ll confirm your booking via email shortly.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>
          Book Another Viewing
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="booking-name">Name *</Label>
        <Input
          id="booking-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-email">Email *</Label>
        <Input
          id="booking-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-phone">Phone</Label>
        <Input
          id="booking-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="booking-date">Preferred Date *</Label>
          <Input
            id="booking-date"
            type="date"
            required
            min={today}
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="booking-time">Preferred Time *</Label>
          <Input
            id="booking-time"
            type="time"
            required
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-message">Additional Notes</Label>
        <textarea
          id="booking-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Any specific requirements or questions?"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Booking..." : "Book Viewing"}
      </Button>
    </form>
  )
}
