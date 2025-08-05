import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthFormProps {
  mode: 'signin' | 'signup' | 'reset';
  loading: boolean;
  onSubmit: (email: string, password?: string) => void;
  onModeChange: (mode: 'signin' | 'signup' | 'reset') => void;
}

export function AuthForm({ mode, loading, onSubmit, onModeChange }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'reset') {
      onSubmit(email);
    } else {
      onSubmit(email, password);
    }
  };

  const isFormValid = () => {
    if (mode === 'reset') {
      return email.trim() !== '';
    }
    return email.trim() !== '' && password.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signin' && 'Добро пожаловать'}
            {mode === 'signup' && 'Создать аккаунт'}
            {mode === 'reset' && 'Восстановить пароль'}
          </h1>
          <p className="text-gray-600">
            {mode === 'signin' && 'Войдите в свой аккаунт'}
            {mode === 'signup' && 'Зарегистрируйтесь для продолжения'}
            {mode === 'reset' && 'Введите email для восстановления'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={!isFormValid() || loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <LoadingSpinner size="small" className="mr-2" />
            ) : (
              <ArrowRight className="w-5 h-5 mr-2" />
            )}
            {mode === 'signin' && 'Войти'}
            {mode === 'signup' && 'Зарегистрироваться'}
            {mode === 'reset' && 'Отправить ссылку'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => onModeChange('reset')}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Забыли пароль?
              </button>
              <div className="text-sm text-gray-600">
                Нет аккаунта?{' '}
                <button
                  onClick={() => onModeChange('signup')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Зарегистрироваться
                </button>
              </div>
            </>
          )}

          {mode === 'signup' && (
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

          {mode === 'reset' && (
            <button
              onClick={() => onModeChange('signin')}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Вернуться к входу
            </button>
          )}
        </div>
      </div>
    </div>
  );
}