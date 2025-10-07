import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Bell, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

interface ToastNotificationsProps {
  onBack: () => void;
}

const ToastNotifications: React.FC<ToastNotificationsProps> = ({ onBack }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const mockMessages = [
    { message: 'Новое сообщение от Ивана', type: 'info' as const },
    { message: 'Файл успешно загружен', type: 'success' as const },
    { message: 'Резервное копирование завершено', type: 'success' as const },
    { message: 'Предупреждение о нехватке места на диске', type: 'warning' as const },
    { message: 'Соединение восстановлено', type: 'success' as const },
    { message: 'Доступно обновление', type: 'info' as const },
    { message: 'Приближается срок выполнения задачи', type: 'warning' as const },
    { message: 'Пароль успешно изменен', type: 'success' as const }
  ];

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== newToast.id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const triggerManualNotification = () => {
    const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    addToast(randomMessage.message, randomMessage.type);
  };

  // Auto-trigger system notifications every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      addToast(`[System] ${randomMessage.message}`, randomMessage.type);
    }, 10000);

    return () => clearInterval(interval);
  }, [addToast]);

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastColors = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Уведомления</h1>
          <p className="text-gray-600">Нажмите для создания уведомления или дождитесь автоматических</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Bell className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Демо уведомлений</h2>
              <p className="text-gray-600">
                Нажмите кнопку ниже для создания уведомления, или дождитесь автоматических системных уведомлений каждые 10 секунд.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={triggerManualNotification}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Bell className="w-5 h-5" />
                <span>Создать уведомление</span>
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
             <h3 className="text-sm font-medium text-gray-700 mb-2">Возможности:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
               <li>• Ручные уведомления по нажатию кнопки</li>
               <li>• Автоматические системные уведомления каждые 10 секунд</li>
               <li>• Автоматическое удаление через 3 секунды</li>
               <li>• Плавные анимации появления/исчезновения</li>
               <li>• Различные типы уведомлений (успех, ошибка, предупреждение, информация)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getToastColors(toast.type)} border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out animate-in slide-in-from-right-full`}
          >
            <div className="flex items-start space-x-3">
            <span>Назад к меню</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-tight">
                  {toast.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {toast.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastNotifications;