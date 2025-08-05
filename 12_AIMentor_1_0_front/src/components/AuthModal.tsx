import React from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { APP_TEXTS } from '../config/texts';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup' | 'reset';
  loading: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
  onModeChange: (mode: 'signin' | 'signup' | 'reset') => void;
}

export function AuthModal({ 
  isOpen, 
  mode, 
  loading, 
  onClose, 
  onSubmit, 
  onModeChange 
}: AuthModalProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'reset') {
      if (email.trim()) {
        onSubmit(email, ''); // Empty password for reset
      }
    } else if (email.trim() && password.trim()) {
      onSubmit(email, password);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {mode === 'reset' ? 'Восстановить пароль' : APP_TEXTS.AUTH_MODAL_TITLE}
              </h2>
              <p className="text-sm text-gray-500">
                {mode === 'reset' ? 'Введите email для восстановления пароля' : APP_TEXTS.AUTH_MODAL_SUBTITLE}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Limit Message */}
          {mode !== 'reset' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 text-center">
                {APP_TEXTS.AUTH_MODAL_LIMIT_MESSAGE}
              </p>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email адрес
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={mode === 'reset' ? !email.trim() || loading : !email.trim() || !password.trim() || loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner size="small" className="mr-2" />
              ) : (
                <ArrowRight className="w-5 h-5 mr-2" />
              )}
              {mode === 'signin' ? 'Войти' : mode === 'signup' ? 'Зарегистрироваться' : 'Отправить ссылку'}
            </button>
          </form>

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            {mode === 'reset' ? (
              <button
                onClick={() => onModeChange('signin')}
                className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
              >
                Вернуться к входу
              </button>
            ) : mode === 'signin' ? (
              <div className="text-sm text-gray-600">
                Нет аккаунта?{' '}
                <button
                  onClick={() => onModeChange('signup')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Зарегистрироваться
                </button>
                <div className="mt-2">
                  <button
                    onClick={() => onModeChange('reset')}
                    className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    Забыли пароль?
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => onModeChange('signin')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}