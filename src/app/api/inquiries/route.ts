import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { propertyId, name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.from("inquiries").insert({
      property_id: propertyId || null,
      name,
      email,
      phone: phone || null,
      message,
    })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to submit inquiry" },
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
