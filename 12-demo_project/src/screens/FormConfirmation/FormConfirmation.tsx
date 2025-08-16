import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  country: string;
}

interface FormConfirmationProps {
  onBack: () => void;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    country: ''
  });
  const [currentStep, setCurrentStep] = useState<'form' | 'confirmation'>('form');

  const countries = [
    { value: '', label: 'Выберите страну' },
    { value: 'us', label: 'США' },
    { value: 'uk', label: 'Великобритания' },
    { value: 'ca', label: 'Канада' },
    { value: 'au', label: 'Австралия' },
    { value: 'de', label: 'Германия' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.country) {
      setCurrentStep('confirmation');
    }
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const isFormValid = formData.name.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.country !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header with back button */}
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
          {currentStep === 'form' ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Личная информация</h1>
                <p className="text-gray-600 text-sm">Пожалуйста, заполните ваши данные ниже</p>
              </div>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Введите ваше полное имя"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email адрес
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Введите ваш email адрес"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Страна
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 bg-white"
                    required
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value} disabled={country.value === ''}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Сохранить информацию
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Информация сохранена</h1>
                <p className="text-gray-600 text-sm">Пожалуйста, проверьте ваши данные ниже</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Полное имя</span>
                    <span className="text-gray-900 font-medium">{formData.name}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Email</span>
                    <span className="text-gray-900 font-medium break-all">{formData.email}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Страна</span>
                    <span className="text-gray-900 font-medium">
                      {countries.find(c => c.value === formData.country)?.label}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBackToForm}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Вернуться к редактированию</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormConfirmation;