/*
  # Update RLS policies for authenticated users

  1. Security Changes
    - Update agents table policies to require authentication
    - Remove public access policies
    - Add policies for authenticated users only

  2. Policy Updates
    - Users can read all agents data
    - Users can insert new agents
    - Users can update agents (for versioning)
    - Users can delete agents (for undo functionality)
*/

-- Drop existing public policies
DROP POLICY IF EXISTS "Allow all to read agents" ON agents;
DROP POLICY IF EXISTS "Allow all to insert agents" ON agents;
DROP POLICY IF EXISTS "Allow all to update agents" ON agents;
DROP POLICY IF EXISTS "Allow all to delete agents" ON agents;

-- Create new authenticated-only policies
CREATE POLICY "Authenticated users can read agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update agents"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete agents"
  ON agents
  FOR DELETE
  TO authenticated
  USING (true);