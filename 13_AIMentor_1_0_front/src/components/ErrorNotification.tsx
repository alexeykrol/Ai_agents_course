import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorNotificationProps {
  message: string;
  onRetry?: () => void;
  onClose: () => void;
}

export function ErrorNotification({ message, onRetry, onClose }: ErrorNotificationProps) {
  return (
    <div className="fixed top-4 right-4 bg-white border-l-4 border-red-500 rounded-lg shadow-lg p-4 max-w-md z-50 animate-in slide-in-from-right-2">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
        <div className="flex-1">
          <p className="text-sm text-gray-800 font-medium">Error</p>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <div className="mt-3 flex gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100 transition-colors"
              >
                Retry
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}