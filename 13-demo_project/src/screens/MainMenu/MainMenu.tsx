import React from 'react';
import { FileText, Settings, BarChart3, MessageSquare, Database } from 'lucide-react';

interface Screen {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface MainMenuProps {
  onScreenSelect: (screenId: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onScreenSelect }) => {
  const getShortName = (screenId: string): string => {
    const shortNames: Record<string, string> = {
      'form-confirmation': 'Форма',
      'chat-interface': 'Чат',
      'text-editor': 'Редактор',
      'stock-dashboard': 'Акции',
      'wizard-form': 'Мастер',
      'kanban-board': 'Канбан',
      'validation-form': 'Валидация',
      'toast-notifications': 'Уведомления',
      'post-editor': 'Посты',
      'data-table': 'Таблица'
    };
    return shortNames[screenId] || screenId;
  };

  const screens: Screen[] = [
    {
      id: 'form-confirmation',
      title: 'Форма с подтверждением',
      description: 'Форма с подтверждением',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'chat-interface',
      title: 'Интерфейс чата',
      description: 'Интерфейс чата',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'text-editor',
      title: 'Текстовый редактор',
      description: 'Текстовый редактор',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'stock-dashboard',
      title: 'Панель акций',
      description: 'Панель акций',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'wizard-form',
      title: 'Мастер-форма',
      description: '3-шаговый мастер',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-violet-500 to-violet-600'
    },
    {
      id: 'kanban-board',
      title: 'Канбан-доска',
      description: 'Доска задач с drag & drop',
      icon: <Database className="w-6 h-6" />,
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 'validation-form',
      title: 'Форма с валидацией',
      description: 'Форма с inline валидацией',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-rose-500 to-rose-600'
    },
    {
      id: 'toast-notifications',
      title: 'Уведомления',
      description: 'Система уведомлений',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'post-editor',
      title: 'Редактор постов',
      description: 'Редактор постов с auto-save',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-lime-500 to-lime-600'
    },
    {
      id: 'data-table',
      title: 'Таблица данных',
      description: 'Таблица с поиском и фильтрацией',
      icon: <Database className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Демо Экраны
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Коллекция различных UI паттернов и компонентов. 
            Выберите экран для просмотра демонстрации.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Menu */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Навигация</h3>
              <nav className="space-y-2">
                {screens.map((screen) => (
                  <button
                    key={screen.id}
                    onClick={() => onScreenSelect(screen.id)}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-3"
                  >
                    <div className="text-gray-400">
                      {screen.icon}
                    </div>
                    <span>{getShortName(screen.id)}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {screens.map((screen) => (
                <div
                  key={screen.id}
                  onClick={() => onScreenSelect(screen.id)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                >
                  <div className={`h-20 bg-gradient-to-r ${screen.color} flex items-center justify-center`}>
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {screen.icon}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                      {screen.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {screen.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <BarChart3 className="w-4 h-4" />
            <span>Всего экранов: {screens.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;