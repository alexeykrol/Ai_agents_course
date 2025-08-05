import React, { useState, useEffect } from 'react';
import { X, ChevronRight, HelpCircle } from 'lucide-react';

// Хардкод справки вместо загрузки MD файла
const HELP_CONTENT = `# Часто задаваемые вопросы

## Как начать пользоваться чатом?
Просто начните задавать вопросы! Используйте предустановленные кнопки для быстрого старта или введите свой вопрос в поле ввода. Система поддерживает сообщения до 5000 символов.

## Какие ограничения есть у системы?
Система не поддерживает загрузку файлов и работу с внешними ссылками. Фокус на текстовом общении позволяет получать качественные и быстрые ответы на ваши вопросы.

## Как задавать эффективные вопросы?
Формулируйте вопросы четко и конкретно. Добавляйте контекст, если это необходимо. Используйте примеры крутых вопросов для вдохновения - там собраны интересные форматы запросов.

## Можно ли загружать файлы?
В текущей версии загрузка файлов не поддерживается. Система оптимизирована для текстового общения, что обеспечивает быструю обработку и качественные ответы.

## Как сохранить историю чата?
История чатов автоматически сохраняется в левой панели. Вы можете переключаться между разными беседами и продолжать общение с того места, где остановились.

## Есть ли ограничения по времени?
Нет ограничений по времени использования. Вы можете общаться с системой столько, сколько необходимо для решения ваших задач.

## Как работает персональный режим?
Активируйте "Мой вопрос" для получения персонализированных рекомендаций. Система проанализирует ваши интересы на основе 10 вопросов и предложит индивидуальные темы для изучения.

## Безопасность данных
Все данные обрабатываются с соблюдением принципов конфиденциальности. Ваши сообщения используются только для генерации ответов и улучшения качества сервиса.

## Техническая поддержка
Если у вас возникли технические проблемы, попробуйте обновить страницу или очистить кэш браузера. Большинство проблем решается перезапуском сессии.

## Обновления и новые функции
Система регулярно обновляется новыми возможностями. Следите за изменениями в интерфейсе - мы постоянно работаем над улучшением пользовательского опыта.`;

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HelpSection {
  id: string;
  title: string;
  content: string;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [sections, setSections] = useState<HelpSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      parseContent();
    }
  }, [isOpen]);

  const parseContent = () => {
    try {
      setLoading(true);
      // Parse markdown content
      const parsedSections = parseMarkdownContent(HELP_CONTENT);
      setSections(parsedSections);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load help content:', error);
      setLoading(false);
    }
  };

  const parseMarkdownContent = (markdown: string): HelpSection[] => {
    const lines = markdown.split('\n');
    const sections: HelpSection[] = [];
    let currentSection: Partial<HelpSection> | null = null;
    let contentLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith('## ')) {
        // Save previous section
        if (currentSection && currentSection.title) {
          sections.push({
            id: currentSection.title.toLowerCase().replace(/[^a-zа-я0-9]/g, '-'),
            title: currentSection.title,
            content: contentLines.join('\n').trim()
          });
        }
        
        // Start new section
        currentSection = {
          title: line.replace('## ', '').trim()
        };
        contentLines = [];
      } else if (line.trim() && !line.startsWith('# ')) {
        contentLines.push(line);
      }
    }

    // Add last section
    if (currentSection && currentSection.title) {
      sections.push({
        id: currentSection.title.toLowerCase().replace(/[^a-zа-я0-9]/g, '-'),
        title: currentSection.title,
        content: contentLines.join('\n').trim()
      });
    }

    return sections;
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
  };

  const handleClose = () => {
    setSelectedSection(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Справка и помощь
              </h2>
              <p className="text-sm text-gray-500">
                Ответы на часто задаваемые вопросы
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
              <h3 className="text-sm font-medium text-gray-900 mb-4">Содержание</h3>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(10)].map((_, i) => (
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
                          ? 'bg-red-50 text-red-700 border border-red-200'
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {section.title}
                        </h3>
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                          {section.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="mb-4">
                                {paragraph}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Выберите тему из списка
                  </h3>
                  <p className="text-gray-500">
                    Нажмите на любую тему слева, чтобы увидеть подробную информацию
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