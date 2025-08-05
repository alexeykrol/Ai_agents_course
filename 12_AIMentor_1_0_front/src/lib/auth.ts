import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export class AuthService {
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email || '',
        created_at: user.created_at || ''
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Sign up with email and password
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined // Disable email confirmation
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      if (data.user) {
        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email || '',
            created_at: data.user.created_at || ''
          }
        };
      }

      return {
        success: false,
        error: 'Registration failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      if (data.user) {
        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email || '',
            created_at: data.user.created_at || ''
          }
        };
      }

      return {
        success: false,
        error: 'Login failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Sign out
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at || ''
        });
      } else {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();