import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { propertyId, name, email, phone, preferredDate, preferredTime, message } = body

    if (!name || !email || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Name, email, preferred date, and time are required" },
        { status: 400 },
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.from("bookings").insert({
      property_id: propertyId,
      name,
      email,
      phone: phone || null,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      message: message || null,
      status: "pending",
    })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to book viewing" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    )
  }
}
