import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex items-center space-x-2 text-gray-600">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="text-lg">{message}</span>
      </div>
    </div>
  );
}