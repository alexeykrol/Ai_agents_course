import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, User, Mail, Lock } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
}

interface ValidationFormProps {
  onBack: () => void;
}

const ValidationForm: React.FC<ValidationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Имя обязательно';
    }
    if (name.trim().length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email обязателен';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Пожалуйста, введите корректный email адрес';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Пароль обязателен';
    }
    if (password.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    return '';
  };

  // Real-time validation
  useEffect(() => {
    setErrors({
      name: touched.name ? validateName(formData.name) : '',
      email: touched.email ? validateEmail(formData.email) : '',
      password: touched.password ? validatePassword(formData.password) : ''
    });
  }, [formData, touched]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputBlur = (field: keyof FormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const isFormValid = () => {
    return (
      validateName(formData.name) === '' &&
      validateEmail(formData.email) === '' &&
      validatePassword(formData.password) === '' &&
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password !== ''
    );
  };

  const getFieldStatus = (field: keyof FormData) => {
    if (!touched[field] || !formData[field]) return 'neutral';
    return errors[field] ? 'invalid' : 'valid';
  };

  const getFieldIcon = (field: keyof FormData) => {
    const status = getFieldStatus(field);
    if (status === 'valid') {
      return <Check className="w-5 h-5 text-green-500" />;
    }
    if (status === 'invalid') {
      return <X className="w-5 h-5 text-red-500" />;
    }
    return null;
  };

  const getFieldBorderColor = (field: keyof FormData) => {
    const status = getFieldStatus(field);
    if (status === 'valid') {
      return 'border-green-500 focus:ring-green-500';
    }
    if (status === 'invalid') {
      return 'border-red-500 focus:ring-red-500';
    }
    return 'border-gray-300 focus:ring-blue-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      alert('Form submitted successfully!');
      // Reset form
      setFormData({ name: '', email: '', password: '' });
      setTouched({ name: false, email: false, password: false });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к меню</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Создать аккаунт</h1>
              <p className="text-gray-600 text-sm">Заполните ваши данные с валидацией в реальном времени</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Полное имя *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleInputBlur('name')}
                    placeholder="Введите ваше полное имя"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${getFieldBorderColor('name')}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getFieldIcon('name')}
                  </div>
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email адрес *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleInputBlur('email')}
                    placeholder="Введите ваш email адрес"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${getFieldBorderColor('email')}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getFieldIcon('email')}
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleInputBlur('password')}
                    placeholder="Введите ваш пароль"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${getFieldBorderColor('password')}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getFieldIcon('password')}
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
                {!errors.password && formData.password && formData.password.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.password.length}/6 символов минимум
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isFormValid()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isFormValid() && <Check className="w-5 h-5" />}
                <span>Создать аккаунт</span>
              </button>

              {/* Form Status */}
              <div className="text-center">
                {isFormValid() ? (
                  <p className="text-sm text-green-600 flex items-center justify-center">
                    <Check className="w-4 h-4 mr-1" />
                    Форма готова к отправке
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Пожалуйста, заполните все обязательные поля корректно
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationForm;