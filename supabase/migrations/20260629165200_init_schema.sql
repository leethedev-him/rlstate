-- Create Enums
CREATE TYPE property_type AS ENUM ('house', 'apartment', 'condo', 'townhouse', 'land');
CREATE TYPE property_status AS ENUM ('for_sale', 'for_rent', 'sold', 'pending');

-- Create Properties Table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(3, 1) NOT NULL,
  square_feet INTEGER NOT NULL,
  property_type property_type NOT NULL,
  status property_status NOT NULL DEFAULT 'for_sale',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Property Images Table
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policies (Basic Read for Properties/Images, Insert for Inquiries)
CREATE POLICY "Public read properties" ON properties FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY "Public read property images" ON property_images FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY "Anyone can insert inquiries" ON inquiries FOR INSERT TO anon, authenticated WITH CHECK (TRUE);
