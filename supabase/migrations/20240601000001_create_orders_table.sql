-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer TEXT NOT NULL,
  delivery TEXT,
  product TEXT NOT NULL,
  currency TEXT NOT NULL,
  price FLOAT NOT NULL,
  method TEXT,
  shop TEXT,
  device TEXT,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivery_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'processing'
);

-- Enable realtime for orders table
alter publication supabase_realtime add table orders;
