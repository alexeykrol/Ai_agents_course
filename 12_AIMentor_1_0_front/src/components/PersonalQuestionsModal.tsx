import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Target, MessageSquare } from 'lucide-react';

interface PersonalQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskQuestion: (question: string) => void;
  onFocusInput?: () => void;
}

interface PersonalSection {
  id: string;
  title: string;
  content: string;
}

// Mock персональные вопросы (потом будут генерироваться на основе анализа)
const MOCK_PERSONAL_SECTIONS: PersonalSection[] = [
  {
    id: 'career-development',
    title: 'Развитие карьеры',
    content: 'Основываясь на ваших интересах к технологиям и стремлении к росту, рекомендую изучить современные подходы к управлению проектами в IT-сфере. Какие навыки лидерства вы считаете наиболее важными для технического руководителя?'
  },
  {
    id: 'personal-growth',
    title: 'Личностный рост',
    content: 'Учитывая ваш интерес к саморазвитию, предлагаю глубже изучить методы повышения эмоционального интеллекта. Как вы думаете, какие привычки успешных людей стоит внедрить в свою жизнь в первую очередь?'
  },
  {
    id: 'learning-strategy',
    title: 'Стратегия обучения',
    content: 'На основе ваших предпочтений в обучении, рекомендую персонализированный подход к изучению новых технологий. Какие методы запоминания информации работают для вас лучше всего?'
  },
  {
    id: 'work-life-balance',
    title: 'Баланс жизни и работы',
    content: 'Исходя из ваших ответов о приоритетах, важно найти оптимальный баланс между профессиональным ростом и личной жизнью. Какие стратегии управления временем помогают вам быть более продуктивным?'
  },
  {
    id: 'future-planning',
    title: 'Планирование будущего',
    content: 'Основываясь на ваших целях и амбициях, предлагаю разработать долгосрочную стратегию развития. Как вы видите себя через 5 лет и какие шаги нужно предпринять уже сейчас?'
  }
];

export function PersonalQuestionsModal({ isOpen, onClose, onAskQuestion, onFocusInput }: PersonalQuestionsModalProps) {
  const [sections, setSections] = useState<PersonalSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadPersonalQuestions();
    }
  }, [isOpen]);

  const loadPersonalQuestions = async () => {
    try {
      setLoading(true);
      // Имитируем загрузку персональных вопросов
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSections(MOCK_PERSONAL_SECTIONS);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load personal questions:', error);
      setLoading(false);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
  };

  const handleAskQuestion = (content: string) => {
    onAskQuestion(content);
    setSelectedSection(null);
    onClose();
    // Focus input after closing modal
    setTimeout(() => {
      const inputElement = document.querySelector('textarea[placeholder*="Напишите ваш вопрос"]') as HTMLTextAreaElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 100);
  };

  const handleClose = () => {
    setSelectedSection(null);
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
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Ваши персональные вопросы
              </h2>
              <p className="text-sm text-gray-500">
                Индивидуальные рекомендации на основе вашего анализа
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
        <div className="flex h-[calc(90vh-120px)]">
          {/* Table of Contents */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Персональные категории</h3>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                        selectedSection === section.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-sm font-medium truncate">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        selectedSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ) : selectedSection ? (
                <div>
                  {sections
                    .filter(section => section.id === selectedSection)
                    .map(section => (
                      <div key={section.id}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {section.title}
                          </h3>
                          <button
                            onClick={() => handleAskQuestion(section.content)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Спросить
                          </button>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                          <p className="mb-4">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Выберите категорию
                  </h3>
                  <p className="text-gray-500">
                    Нажмите на любую категорию слева, чтобы увидеть персональные рекомендации
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}