import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LogoutButtonProps {
  className?: string;
  showText?: boolean;
}

export default function LogoutButton({ className = "", showText = false }: LogoutButtonProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center text-gray-600 hover:text-gray-800 transition-colors ${className}`}
      title="Выйти"
    >
      <LogOut className="h-5 w-5" />
      {showText && <span className="ml-2">Выйти</span>}
    </button>
  );
}