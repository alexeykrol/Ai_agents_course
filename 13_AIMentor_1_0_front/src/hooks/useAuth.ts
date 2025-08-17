import { useState, useEffect, useCallback } from 'react';
import { authService, User } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (mounted) {
          setUser(currentUser);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setError('Failed to initialize authentication');
          setLoading(false);
        }
      }
    };

    initAuth();

    // Listen to auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      if (mounted) {
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const result = await authService.signUp(email, password);

    if (result.success && result.user) {
      setUser(result.user);
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
    return result;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const result = await authService.signIn(email, password);

    if (result.success && result.user) {
      setUser(result.user);
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
    return result;
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await authService.signOut();

    if (result.success) {
      setUser(null);
    } else {
      setError(result.error || 'Logout failed');
    }

    setLoading(false);
    return result;
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    const result = await authService.resetPassword(email);

    if (!result.success) {
      setError(result.error || 'Password reset failed');
    }

    setLoading(false);
    return result;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    resetPassword,
    clearError
  };
}