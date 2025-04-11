-- Enable row level security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own records
DROP POLICY IF EXISTS "Users can insert their own records" ON users;
CREATE POLICY "Users can insert their own records"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create policy to allow users to select their own records
DROP POLICY IF EXISTS "Users can view their own records" ON users;
CREATE POLICY "Users can view their own records"
ON users FOR SELECT
USING (auth.uid() = id);

-- Create policy to allow users to update their own records
DROP POLICY IF EXISTS "Users can update their own records" ON users;
CREATE POLICY "Users can update their own records"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Add publication for realtime
alter publication supabase_realtime add table users;