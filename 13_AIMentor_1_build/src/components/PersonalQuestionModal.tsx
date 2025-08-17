import React, { useState, useEffect } from 'react';
import { X, Target, MessageSquare } from 'lucide-react';

// Хардкод контента вместо загрузки MD файла
const PERSONAL_QUESTION_CONTENT = `Персональный режим анализирует ваши интересы и стиль общения на основе заданных вопросов.

После анализа 10 ваших вопросов система создаст индивидуальные рекомендации по темам, которые вас действительно интересуют.

Это поможет получать более релевантные и полезные ответы, соответствующие вашим целям и предпочтениям.

Активируйте персональный режим, чтобы получить максимум пользы от общения с ИИ-ассистентом.`;

interface PersonalQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  onTogglePersonalMode: () => void;
  onFocusInput?: () => void;
}

export default function PersonalQuestionModal({ isOpen, onClose, totalQuestions, onTogglePersonalMode, onFocusInput }: PersonalQuestionModalProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setContent(PERSONAL_QUESTION_CONTENT);
    }
  }, [isOpen]);

  const handleIncludeQuestion = () => {
    onTogglePersonalMode();
    onClose();
    // Focus input after enabling personal mode
    setTimeout(() => {
      const inputElement = document.querySelector('textarea[placeholder*="Напишите ваш вопрос"]') as HTMLTextAreaElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 100);
  };

  const handleClose = () => {
    onClose();
    // Focus input after closing modal
    setTimeout(() => {
      const inputElement = document.querySelector('textarea[placeholder*="Напишите ваш вопрос"]') as HTMLTextAreaElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Включить мой вопрос
              </h2>
              <p className="text-sm text-gray-500">
                Активируйте персональный режим для получения целевых вопросов
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6">
                {content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleIncludeQuestion}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Включить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}