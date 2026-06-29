export type PropertyStatus = "for_sale" | "for_rent" | "sold" | "pending"
export type PropertyType = "house" | "apartment" | "condo" | "townhouse" | "land"

export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  square_feet: number
  property_type: PropertyType
  status: PropertyStatus
  featured: boolean
  created_at: string
  updated_at: string
}

export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface Inquiry {
  id: string
  property_id: string | null
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface Booking {
  id: string
  property_id: string
  name: string
  email: string
  phone: string | null
  preferred_date: string
  preferred_time: string
  message: string | null
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: Property
        Insert: Omit<Property, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Property, "id">>
      }
      property_images: {
        Row: PropertyImage
        Insert: Omit<PropertyImage, "id" | "created_at">
        Update: Partial<Omit<PropertyImage, "id">>
      }
      inquiries: {
        Row: Inquiry
        Insert: Omit<Inquiry, "id" | "created_at">
        Update: Partial<Omit<Inquiry, "id">>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, "id" | "created_at">
        Update: Partial<Omit<Booking, "id">>
      }
    }
  }
}
