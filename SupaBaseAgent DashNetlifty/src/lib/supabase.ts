import { createClient } from '@supabase/supabase-js';

// Реальные ключи Supabase - захардкожены в код (это безопасно для ANON ключа!)
const supabaseUrl = 'https://oqlurxlsdskvkrudxntz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xbHVyeGxzZHNrdmtydWR4bnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNjEzNjcsImV4cCI6MjA2OTgzNzM2N30.8k_zsmHlMHqFMVU1PxR3Q2kKcgsK_3T9A0TJbYZOS6U';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false
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