import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Lightbulb, MessageSquare } from 'lucide-react';

// Хардкод примеров вместо загрузки MD файла
const EXAMPLES_CONTENT = `# Примеры крутых вопросов для ИИ

## Креативные и необычные вопросы
Если бы ты был архитектором будущего, как бы выглядел идеальный город для людей и природы? Опиши детально: транспорт, здания, энергетику, социальные пространства. Какие технологии использовались бы, и как жители взаимодействовали бы друг с другом?

## Философские размышления
Представь, что человечество открыло способ передавать воспоминания от одного человека к другому. Как это изменило бы наше понимание личности, справедливости и смысла жизни? Какие этические дилеммы возникли бы?

## Альтернативная история
Что если бы Интернет изобрели в Древнем Риме? Как развивалась бы цивилизация, какие социальные сети существовали бы, и как это повлияло бы на падение империи? Опиши день из жизни римского блогера.

## Научные гипотезы
Если бы мы обнаружили, что время течет по-разному в разных уголках Вселенной не из-за гравитации, а по неизвестной причине, какие новые законы физики это могло бы открыть? Как это изменило бы космические путешествия?

## Психология и поведение
Создай психологический портрет идеального лидера для эпохи искусственного интеллекта. Какие качества будут важны, когда большинство рутинных решений принимают машины? Как такой лидер будет мотивировать людей?

## Технологические сценарии
Представь мир, где каждый человек может создать свою собственную реальность с помощью нейроинтерфейсов. Как будет выглядеть экономика, образование и отношения? Какие новые профессии появятся?

## Социальные эксперименты
Что если бы существовал "день честности", когда все люди на планете 24 часа не могли бы лгать? Как это повлияло бы на политику, отношения, бизнес? Опиши хронику такого дня.

## Экологические решения
Придумай революционную экосистему для восстановления океанов, используя биотехнологии, ИИ и новые материалы. Как она работала бы, кто бы ей управлял, и какие неожиданные последствия могли бы возникнуть?

## Образование будущего
Спроектируй систему образования, где знания передаются не через учебники, а через эмоциональные переживания и виртуальные путешествия во времени. Как бы изучали математику, историю, литературу?

## Межкультурное взаимодействие
Представь, что мы встретили инопланетную цивилизацию, которая общается через запахи и цвета вместо звуков. Как бы мы создали универсальный язык? Какие культурные недопонимания могли бы возникнуть?`;

interface ExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskQuestion: (question: string) => void;
  onFocusInput?: () => void;
}

interface ExampleSection {
  id: string;
  title: string;
  content: string;
}

export function ExamplesModal({ isOpen, onClose, onAskQuestion, onFocusInput }: ExamplesModalProps) {
  const [sections, setSections] = useState<ExampleSection[]>([]);
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
      const parsedSections = parseMarkdownContent(EXAMPLES_CONTENT);
      setSections(parsedSections);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load examples content:', error);
      setLoading(false);
    }
  };

  const parseMarkdownContent = (markdown: string): ExampleSection[] => {
    const lines = markdown.split('\n');
    const sections: ExampleSection[] = [];
    let currentSection: Partial<ExampleSection> | null = null;
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

  const handleAskQuestion = (content: string) => {
    onAskQuestion(content);
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
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Примеры крутых вопросов
              </h2>
              <p className="text-sm text-gray-500">
                Вдохновляющие идеи для интересных диалогов с ИИ
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
              <h3 className="text-sm font-medium text-gray-900 mb-4">Категории вопросов</h3>
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
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
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
                  <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Выберите категорию
                  </h3>
                  <p className="text-gray-500">
                    Нажмите на любую категорию слева, чтобы увидеть примеры интересных вопросов
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