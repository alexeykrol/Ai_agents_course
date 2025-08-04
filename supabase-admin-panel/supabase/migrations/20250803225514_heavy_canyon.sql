/*
  # Create variables table for admin panel

  1. New Tables
    - `variables`
      - `id` (uuid, primary key)
      - `variable_1` (text) - First variable value
      - `variable_2` (text) - Second variable value  
      - `created_at` (timestamp) - When the record was created

  2. Security
    - Enable RLS on `variables` table
    - Add policy for public read access (since this is an admin panel)
    - Add policy for public insert access (for creating new records)
*/

CREATE TABLE IF NOT EXISTS variables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variable_1 text NOT NULL DEFAULT '',
  variable_2 text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE variables ENABLE ROW LEVEL SECURITY;

-- Allow public read access to variables
CREATE POLICY "Allow public read access to variables"
  ON variables
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert access to variables  
CREATE POLICY "Allow public insert access to variables"
  ON variables
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for faster queries by created_at
CREATE INDEX IF NOT EXISTS variables_created_at_idx ON variables(created_at DESC);