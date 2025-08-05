/*
  # Fix RLS policies for agents table

  1. Security Changes
    - Drop existing restrictive policies
    - Add permissive policies for all operations
    - Allow anonymous access for demo purposes

  2. Policy Updates
    - SELECT: Allow all users to read agents
    - INSERT: Allow all users to create agents  
    - UPDATE: Allow all users to update agents
    - DELETE: Allow all users to delete agents

  Note: This is for demo/development purposes. In production, 
  you would want more restrictive policies based on user authentication.
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can read agents" ON agents;
DROP POLICY IF EXISTS "Authenticated users can insert agents" ON agents;
DROP POLICY IF EXISTS "Authenticated users can update agents" ON agents;
DROP POLICY IF EXISTS "Authenticated users can delete agents" ON agents;

-- Create permissive policies for demo purposes
CREATE POLICY "Allow all to read agents"
  ON agents
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow all to insert agents"
  ON agents
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow all to update agents"
  ON agents
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all to delete agents"
  ON agents
  FOR DELETE
  TO public
  USING (true);