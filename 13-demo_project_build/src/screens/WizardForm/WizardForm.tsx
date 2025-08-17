import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, Settings, FileCheck } from 'lucide-react';

interface BasicInfo {
  name: string;
  email: string;
}

interface Preferences {
  notifications: boolean;
  newsletter: boolean;
  analytics: boolean;
  marketing: boolean;
  updates: boolean;
}

interface WizardFormProps {
  onBack: () => void;
}

const WizardForm: React.FC<WizardFormProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: '',
    email: ''
  });
  const [preferences, setPreferences] = useState<Preferences>({
    notifications: false,
    newsletter: false,
    analytics: false,
    marketing: false,
    updates: false
  });

  const steps = [
    { number: 1, title: 'Основная информация', icon: User },
    { number: 2, title: 'Настройки', icon: Settings },
    { number: 3, title: 'Сводка', icon: FileCheck }
  ];

  const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
    setBasicInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: keyof Preferences) => {
    setPreferences(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const isStep1Valid = () => {
    return basicInfo.name.trim() !== '' && basicInfo.email.trim() !== '' && basicInfo.email.includes('@');
  };

  const isStep2Valid = () => {
    return Object.values(preferences).some(value => value === true);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    alert('Form submitted successfully!');
    // Reset form
    setCurrentStep(1);
    setBasicInfo({ name: '', email: '' });
    setPreferences({
      notifications: false,
      newsletter: false,
      analytics: false,
      marketing: false,
      updates: false
    });
  };

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.number);
          const Icon = step.icon;
          
          return (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : status === 'current'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                    status === 'current' ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    step.number < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Основная информация</h2>
        <p className="text-gray-600">Пожалуйста, укажите ваши основные данные для начала</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Полное имя *
        </label>
        <input
          type="text"
          id="name"
          value={basicInfo.name}
          onChange={(e) => handleBasicInfoChange('name', e.target.value)}
          placeholder="Введите ваше полное имя"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email адрес *
        </label>
        <input
          type="email"
          id="email"
          value={basicInfo.email}
          onChange={(e) => handleBasicInfoChange('email', e.target.value)}
          placeholder="Введите ваш email адрес"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>
    </div>
  );

  const renderStep2 = () => {
    const preferenceOptions = [
      { key: 'notifications' as keyof Preferences, label: 'Push-уведомления', description: 'Получать мгновенные уведомления о важных обновлениях' },
      { key: 'newsletter' as keyof Preferences, label: 'Рассылка', description: 'Получать еженедельные рассылки с последними новостями и обновлениями' },
      { key: 'analytics' as keyof Preferences, label: 'Аналитика', description: 'Помочь нам улучшить сервис, делясь анонимными данными использования' },
      { key: 'marketing' as keyof Preferences, label: 'Маркетинговые письма', description: 'Получать рекламные предложения и обновления продуктов' },
      { key: 'updates' as keyof Preferences, label: 'Обновления продукта', description: 'Получать уведомления о новых функциях и улучшениях' }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваши предпочтения</h2>
          <p className="text-gray-600">Выберите, что вы хотели бы получать от нас</p>
        </div>

        <div className="space-y-4">
          {preferenceOptions.map((option) => (
            <div
              key={option.key}
              className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <input
                type="checkbox"
                id={option.key}
                checked={preferences[option.key]}
                onChange={() => handlePreferenceChange(option.key)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor={option.key} className="block text-sm font-medium text-gray-900 cursor-pointer">
                  {option.label}
                </label>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {!isStep2Valid() && (
          <p className="text-sm text-orange-600 text-center">
            Пожалуйста, выберите хотя бы одно предпочтение для продолжения
          </p>
        )}
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Сводка</h2>
        <p className="text-gray-600">Пожалуйста, проверьте вашу информацию перед подтверждением</p>
      </div>

      <div className="space-y-6">
        {/* Basic Info Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Основная информация
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Имя:</span>
              <span className="font-medium text-gray-900">{basicInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">{basicInfo.email}</span>
            </div>
          </div>
        </div>

        {/* Preferences Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Выбранные предпочтения
          </h3>
          <div className="space-y-2">
            {Object.entries(preferences).map(([key, value]) => {
              if (!value) return null;
              const labels: Record<string, string> = {
                notifications: 'Push-уведомления',
                newsletter: 'Рассылка',
                analytics: 'Аналитика',
                marketing: 'Маркетинговые письма',
                updates: 'Обновления продукта'
              };
              return (
                <div key={key} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-900">{labels[key]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return true;
      default:
        return false;
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
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Progress Bar */}
            {renderProgressBar()}

            {/* Current Step Content */}
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
                >
                  <span>Далее</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                  <span>Подтвердить</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardForm;