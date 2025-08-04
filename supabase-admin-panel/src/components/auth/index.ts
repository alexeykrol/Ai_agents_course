// Auth system exports - copy this entire folder to reuse authentication
export { AuthProvider, useAuth } from '../contexts/AuthContext';
export { default as AuthGuard } from './AuthGuard';
export { default as AuthForm } from './AuthForm';
export { default as LogoutButton } from './LogoutButton';
export { default as LoadingSpinner } from './LoadingSpinner';

// Usage example:
// 1. Wrap your app with AuthProvider
// 2. Use AuthGuard to protect routes/components
// 3. Use useAuth hook to access auth state and methods
// 4. Use LogoutButton component for logout functionality