/*
  # Update Variables Table Security

  1. Security Changes
    - Remove public access policies
    - Add authenticated user policies
    - Restrict access to authenticated users only

  2. New Policies
    - Authenticated users can read variables
    - Authenticated users can insert new variables
    - No update or delete permissions (append-only)
*/

-- Remove existing public policies
DROP POLICY IF EXISTS "Allow public read access to variables" ON variables;
DROP POLICY IF EXISTS "Allow public insert access to variables" ON variables;

-- Create new policies for authenticated users only
CREATE POLICY "Authenticated users can read variables"
  ON variables
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert variables"
  ON variables
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE variables ENABLE ROW LEVEL SECURITY;