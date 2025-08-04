import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from './AuthForm';
import LoadingSpinner from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return fallback || <LoadingSpinner message="Checking authentication..." />;
  }

  if (!user) {
    return <AuthForm />;
  }

  return <>{children}</>;
}