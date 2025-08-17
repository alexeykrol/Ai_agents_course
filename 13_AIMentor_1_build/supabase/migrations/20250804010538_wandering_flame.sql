/*
  # Create agents table for AI Agent Manager

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `p2_wf_name` (text) - Agent name
      - `p2_wf_version` (text) - Version number
      - `p2_id` (text) - Agent identifier
      - `p2_variable_1` (text) - Agent functions
      - `p2_variable_2` (text) - Input data
      - `p2_variable_3` (text) - Output data
      - `p2_variable_4` (text) - Reserved field
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for authenticated users to read and manage agents

  3. Indexes
    - Index on agent name for faster queries
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  p2_wf_name text NOT NULL DEFAULT '',
  p2_wf_version text NOT NULL DEFAULT '1.0.0',
  p2_id text NOT NULL DEFAULT '',
  p2_variable_1 text NOT NULL DEFAULT '',
  p2_variable_2 text NOT NULL DEFAULT '',
  p2_variable_3 text NOT NULL DEFAULT '',
  p2_variable_4 text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS agents_name_idx ON agents (p2_wf_name);
CREATE INDEX IF NOT EXISTS agents_created_at_idx ON agents (created_at DESC);
CREATE INDEX IF NOT EXISTS agents_p2_id_idx ON agents (p2_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();