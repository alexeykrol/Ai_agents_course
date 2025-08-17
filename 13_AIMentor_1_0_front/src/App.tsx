import React from 'react';
import { MessageCircle, Plus, PanelLeftClose, PanelLeftOpen, User, HelpCircle } from 'lucide-react';
import { APP_TEXTS, APP_CONFIG } from './config/texts';
import { useAuth } from './hooks/useAuth';
import { useChat } from './hooks/useChat';
import { ChatInterface } from './components/ChatInterface';
import { ErrorNotification } from './components/ErrorNotification';
import { AuthForm } from './components/AuthForm';
import { UserMenu } from './components/UserMenu';
import { AuthModal } from './components/AuthModal';
import { HelpModal } from './components/HelpModal';
import PersonalQuestionModal from './components/PersonalQuestionModal';
import { PersonalQuestionsModal } from './components/PersonalQuestionsModal';

// Mock chat list for UI demonstration
const MOCK_CHATS = [
  { id: '1', title: 'Вопрос о программировании на Python', lastMessage: '2 часа назад' },
  { id: '2', title: 'Помощь с математическими задачами', lastMessage: '5 часов назад' },
  { id: '3', title: 'Объяснение квантовой физики', lastMessage: 'вчера' },
  { id: '4', title: 'Рецепты здорового питания', lastMessage: '2 дня назад' },
  { id: '5', title: 'Советы по изучению английского', lastMessage: '3 дня назад' },
  { id: '6', title: 'Планирование путешествия в Европу', lastMessage: 'неделю назад' },
  { id: '7', title: 'Разработка мобильного приложения', lastMessage: 'неделю назад' },
  { id: '8', title: 'Инвестиции и финансовое планирование', lastMessage: '2 недели назад' },
];

function App() {
  const {
    user,
    loading: authLoading,
    error: authError,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    resetPassword,
    clearError: clearAuthError
  } = useAuth();

  const [authMode, setAuthMode] = React.useState<'signin' | 'signup' | 'reset'>('signin');
  const [selectedChatId, setSelectedChatId] = React.useState<string>('1');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authModalMode, setAuthModalMode] = React.useState<'signin' | 'signup' | 'reset'>('signin');
  const [guestQuestionCount, setGuestQuestionCount] = React.useState(0);
  const [showHelpModal, setShowHelpModal] = React.useState(false);
  const [showPersonalQuestionsModal, setShowPersonalQuestionsModal] = React.useState(false);

  // Prefilled question state
  const [prefilledQuestion, setPrefilledQuestion] = React.useState<string>('');
  const [totalQuestionCount, setTotalQuestionCount] = React.useState(0);
  const [personalQuestionMode, setPersonalQuestionMode] = React.useState(false);
  const [targetQuestions, setTargetQuestions] = React.useState(10);
  const [analysisCompleted, setAnalysisCompleted] = React.useState(false);

  const {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  } = useChat();

  // Check for mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Handle message sending with guest limit check
  const handleSendMessage = (message: string) => {
    console.log('=== SEND MESSAGE DEBUG ===');
    console.log('Current totalQuestionCount:', totalQuestionCount);
    console.log('Current targetQuestions:', targetQuestions);
    console.log('Current personalQuestionMode:', personalQuestionMode);
    console.log('Current analysisCompleted:', analysisCompleted);
    
    // Increment total question count
    setTotalQuestionCount(prev => prev + 1);
    const newCount = totalQuestionCount + 1;
    console.log('New count will be:', newCount);
    
    // If not authenticated, check guest limit
    if (!isAuthenticated) {
      if (guestQuestionCount >= APP_CONFIG.GUEST_QUESTIONS_LIMIT) {
        setShowAuthModal(true);
        return;
      }
      setGuestQuestionCount(prev => prev + 1);
    }
    
    sendMessage(message);
    
    // Complete analysis when reaching target in personal mode (only if not already completed)
    if (personalQuestionMode && !analysisCompleted && newCount >= targetQuestions) {
      setAnalysisCompleted(true);
      clearChat();
    }
  };

  const handlePrefilledQuestion = (question: string) => {
    setPrefilledQuestion(question);
  };

  // Clear prefilled question
  const handleClearPrefilled = () => {
    setPrefilledQuestion('');
  };

  // Handle personal question mode activation
  const handleTogglePersonalMode = () => {
    if (personalQuestionMode) {
      // Выключаем режим
      setPersonalQuestionMode(false);
    } else {
      // Включаем режим
      setPersonalQuestionMode(true);
      setTargetQuestions(10);
    }
    
  };

  // Handle viewing personal questions
  const handleViewPersonalQuestions = () => {
    setShowPersonalQuestionsModal(true);
  };

  // Calculate progress for personal question mode
  const getPersonalModeProgress = () => {
    if (!personalQuestionMode || analysisCompleted) return { percentage: 0, remaining: 0, message: '' };
    
    const remaining = Math.max(0, targetQuestions - totalQuestionCount);
    const percentage = Math.min(100, (totalQuestionCount / targetQuestions) * 100);
    
    let message = '';
    if (remaining > 5) {
      message = `Режим "Мой вопрос" активен, вам осталось задать ${remaining} вопросов`;
    } else if (remaining > 2) {
      message = `Отлично! Еще ${remaining} вопросов и мы составим ваш профиль`;
    } else if (remaining === 2) {
      message = `Это круто! Нужна еще пара вопросов`;
    } else if (remaining > 0) {
      message = `Почти готово! Последний ${remaining === 1 ? 'вопрос' : 'вопроса'}!`;
    } else {
      message = '🎉 Анализ завершен! Ваши индивидуальные вопросы готовы!';
    }
    
    return { percentage, remaining, message };
  };

  // Handle auth modal submission
  const handleAuthModalSubmit = async (email: string, password: string) => {
    let result;
    if (authModalMode === 'signin') {
      result = await signIn(email, password);
    } else if (authModalMode === 'signup') {
      result = await signUp(email, password);
    } else if (authModalMode === 'reset') {
      result = await resetPassword(email);
    }
    
    if (result.success) {
      setShowAuthModal(false);
      setGuestQuestionCount(0); // Reset counter after successful auth
    }
  };

  // Handle auth form submission
  const handleAuthSubmit = async (email: string, password?: string) => {
    if (authMode === 'signin' && password) {
      await signIn(email, password);
    } else if (authMode === 'signup' && password) {
      await signUp(email, password);
    } else if (authMode === 'reset') {
      await resetPassword(email);
    }
  };

  // Show loading screen during auth initialization
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
        isMobile 
          ? `fixed left-0 top-0 h-full z-50 w-80 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          : sidebarCollapsed ? 'w-16' : 'w-80'
      }`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {(!sidebarCollapsed || isMobile) && (
                <h2 className="text-base font-normal text-gray-900">История чатов</h2>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {(sidebarCollapsed && !isMobile) ? (
                  <PanelLeftOpen className="w-5 h-5" />
                ) : (
                  <PanelLeftClose className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Chat List */}
          {(!sidebarCollapsed || isMobile) && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-0.5">
                {MOCK_CHATS.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedChatId === chat.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="truncate text-sm font-normal text-gray-900 mb-1">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {chat.lastMessage}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Settings Avatar Circle */}
          <div className="p-4 border-t border-gray-200">
            {sidebarCollapsed && !isMobile ? (
              <button
                onClick={() => {
                  // TODO: Open settings/account modal
                  console.log('Settings clicked');
                }}
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors mx-auto"
                title="Настройки аккаунта"
              >
                <User className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={() => {
                  // TODO: Open settings/account modal
                  console.log('Settings clicked');
                }}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-normal text-gray-900">Алексей Петров</div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 w-full">
          <div className="px-2 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center py-2 sm:py-4">
              <div className="flex items-center min-w-0">
                {/* Mobile Menu Button */}
                {isMobile && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mr-2 sm:mr-3 flex-shrink-0"
                  >
                    <PanelLeftOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-900 truncate">{APP_TEXTS.APP_TITLE}</h1>
                  <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">{APP_TEXTS.APP_SUBTITLE}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
                <button
                  className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  onClick={clearChat}
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {APP_TEXTS.BUTTON_NEW_CHAT}
                </button>
                <button
                  onClick={() => {
                    setShowHelpModal(true);
                  }}
                  className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  title="Помощь"
                >
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                {/* ВРЕМЕННО СКРЫТО МЕНЮ ПОЛЬЗОВАТЕЛЯ */}
                {isAuthenticated && user && <UserMenu user={user} onSignOut={signOut} />}
              </div>
            </div>
          </div>
        </div>

        {/* Info Block */}
        {!personalQuestionMode && totalQuestionCount < 10 && (
          <div className="bg-gray-50 border-b border-gray-200 flex-shrink-0 w-full">
            <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 lg:p-4">
                <p className="text-xs sm:text-sm text-blue-800 text-center leading-relaxed">
                  {APP_TEXTS.HOW_IT_WORKS}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Personal Question Mode Progress Bar */}
        {personalQuestionMode && totalQuestionCount < 10 && (
          <div className="bg-gray-50 border-b border-gray-200 flex-shrink-0 w-full">
            <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2 sm:p-3 lg:p-4">
                <p className="text-xs text-center mb-2 text-gray-600">
                  DEBUG: Вопросов задано: {totalQuestionCount} / Цель: {targetQuestions}
                </p>
                <p className="text-xs sm:text-sm text-blue-800 text-center mb-3 font-medium">
                  {getPersonalModeProgress().message}
                </p>
                <div className="w-full bg-blue-100 rounded-full h-2 sm:h-3">
                  <div className="flex h-2 sm:h-3 rounded-full overflow-hidden bg-gray-200">
                    {Array.from({ length: 10 }, (_, index) => {
                      const progressSegments = Math.min(10, totalQuestionCount); // Direct count, max 10
                      const isActive = index < progressSegments;
                      const intensity = isActive ? Math.max(0.3, 1 - (index / 10) * 0.7) : 0;
                      const hue = 220 - (index * 2); // Более синий слева, чуть фиолетовый справа
                      const saturation = isActive ? 85 + (intensity * 15) : 20;
                      const lightness = isActive ? 45 + ((1 - intensity) * 25) : 85;
                      
                      return (
                        <div
                          key={index}
                          className={`flex-1 transition-all duration-500 ease-out ${index === 0 ? 'rounded-l-full' : ''} ${index === 9 ? 'rounded-r-full' : ''} ${index > 0 ? 'ml-px' : ''}`}
                          style={{
                            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                            boxShadow: isActive ? `0 0 4px hsla(${hue}, ${saturation}%, ${lightness}%, 0.4)` : 'none'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Completed Message */}

        {/* Chat Content */}
        <div className="flex-1 w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-4 min-h-0 overflow-hidden">
          <div className="h-full">
            <ChatInterface
              messages={messages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              totalQuestions={totalQuestionCount}
              prefilledQuestion={prefilledQuestion}
              onClearPrefilled={handleClearPrefilled}
              onPrefilledQuestion={handlePrefilledQuestion}
              onTogglePersonalMode={handleTogglePersonalMode}
              personalQuestionMode={personalQuestionMode}
              userAnalyzed={analysisCompleted}
              onViewPersonalQuestions={() => setShowPersonalQuestionsModal(true)}
            />
          </div>
        </div>
      </div>
      
      {/* Help Modal */}
      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      
      {/* Personal Questions Modal */}
      <PersonalQuestionsModal
        isOpen={showPersonalQuestionsModal}
        onClose={() => setShowPersonalQuestionsModal(false)}
        onAskQuestion={handlePrefilledQuestion}
        onFocusInput={() => {
          setTimeout(() => {
            const inputElement = document.querySelector('textarea[placeholder*="Напишите ваш вопрос"]') as HTMLTextAreaElement;
            if (inputElement) {
              inputElement.focus();
            }
          }, 100);
        }}
      />
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        mode={authModalMode}
        loading={authLoading}
        onClose={() => setShowAuthModal(false)}
        onSubmit={handleAuthModalSubmit}
        onModeChange={setAuthModalMode}
      />
      
      {/* Error Notification */}
      {authError && (
        <ErrorNotification
          message={authError}
          onClose={clearAuthError}
        />
      )}
    </div>
  );
}

export default App;