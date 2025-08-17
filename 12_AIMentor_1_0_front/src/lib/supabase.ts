import { createClient } from '@supabase/supabase-js';

// SECURITY FIX: Use environment variables instead of hardcoded keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true, // SECURITY FIX: Enable session persistence for proper authentication
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  }
);

export type Database = {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string;
          p2_wf_name: string;
          p2_wf_version: string;
          p2_id: string;
          p2_variable_1: string;
          p2_variable_2: string;
          p2_variable_3: string;
          p2_variable_4: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          p2_wf_name: string;
          p2_wf_version?: string;
          p2_id?: string;
          p2_variable_1?: string;
          p2_variable_2?: string;
          p2_variable_3?: string;
          p2_variable_4?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          p2_wf_name?: string;
          p2_wf_version?: string;
          p2_id?: string;
          p2_variable_1?: string;
          p2_variable_2?: string;
          p2_variable_3?: string;
          p2_variable_4?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};