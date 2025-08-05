import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, MessageSquare } from 'lucide-react';
import { APP_TEXTS } from '../config/texts';
import { ChatMessage } from '../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ExamplesModal } from './ExamplesModal';
import PersonalQuestionModal from './PersonalQuestionModal';

// Предустановленные вопросы
const PRESET_QUESTIONS = [
  'Чему учиться в эпоху ИИ?',
  'Чему учить детей?',
  'Какие профессии выживут?',
  'Мне больше 50, что мне делать?',
  'Как создать пассивный доход?',
  'Секреты продуктивности?',
  'Как побороть прокрастинацию?',
  'Инвестиции для новичков?'
];

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  isTyping: boolean;
  totalQuestions: number;
  prefilledQuestion?: string;
  onClearPrefilled?: () => void;
  onPrefilledQuestion?: (question: string) => void;
  onTogglePersonalMode?: () => void;
  personalQuestionMode?: boolean;
  userAnalyzed?: boolean;
  onViewPersonalQuestions?: () => void;
}

export function ChatInterface({
  onSendMessage,
  messages,
  isTyping,
  totalQuestions,
  prefilledQuestion,
  onClearPrefilled,
  onPrefilledQuestion,
  onTogglePersonalMode,
  personalQuestionMode,
  userAnalyzed,
  onViewPersonalQuestions,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Handle prefilled question
  useEffect(() => {
    if (prefilledQuestion) {
      setInputValue(prefilledQuestion);
      inputRef.current?.focus();
    }
  }, [prefilledQuestion]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue.length > 5000) {
      setShowError(true);
      setInputValue('');
      onClearPrefilled?.();
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    if (trimmedValue) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      onClearPrefilled?.();
      // Keep focus on input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 5000) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setInputValue(value);
    // Clear prefilled state when user starts typing
    if (prefilledQuestion && value !== prefilledQuestion) {
      onClearPrefilled?.();
    }
    if (showError) {
      setShowError(false);
    }
  };

  const handlePresetQuestion = (question: string) => {
    onSendMessage(question);
    // Return focus after sending preset question
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleExamplesQuestion = (question: string) => {
    // Just prefill the question, don't send it automatically
    if (onPrefilledQuestion) {
      onPrefilledQuestion(question);
    }
  };

  // Focus input when component mounts or messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages.length]);

  return (
    <>
      <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 w-full">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4 sm:py-8 px-2">
            {userAnalyzed ? (
              /* State 3B: Analyzed user in new chat */
              <>
                {/* Preset Question Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-4xl w-full mb-3 sm:mb-6">
                  {PRESET_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetQuestion(question)}
                      className="flex items-center justify-center p-2 sm:p-3 lg:p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-xs sm:text-sm text-gray-700 hover:text-gray-900 min-h-[40px] sm:min-h-[50px] lg:min-h-[60px]"
                    >
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="text-center">{question}</span>
                    </button>
                  ))}
                </div>
                
                {/* Examples and My Questions Buttons */}
                <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowExamplesModal(true)}
                    className="p-2 sm:p-3 lg:p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-xs sm:text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >
                    ✨ Примеры крутых вопросов
                  </button>
                  <button
                    onClick={() => {
                      onViewPersonalQuestions?.();
                    }}
                    className="p-2 sm:p-3 lg:p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors text-xs sm:text-sm text-green-700 hover:text-green-800 font-medium"
                  >
                    🎯 Мои вопросы
                  </button>
                </div>
              </>
            ) : (
              /* Normal State */
              <>
                {/* Preset Question Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-4xl w-full mb-3 sm:mb-6">
                  {PRESET_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetQuestion(question)}
                      className="flex items-center justify-center p-2 sm:p-3 lg:p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-xs sm:text-sm text-gray-700 hover:text-gray-900 min-h-[40px] sm:min-h-[50px] lg:min-h-[60px]"
                    >
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="text-center">{question}</span>
                    </button>
                  ))}
                </div>
                
                {/* Examples Button */}
                <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowExamplesModal(true)}
                    className="p-2 sm:p-3 lg:p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-xs sm:text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >
                    ✨ Примеры крутых вопросов
                  </button>
                  <button
                    onClick={() => {
                      if (personalQuestionMode) {
                        onTogglePersonalMode?.();
                      } else {
                        setShowPersonalModal(true);
                      }
                    }}
                    className={`p-2 sm:p-3 lg:p-4 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                      personalQuestionMode 
                        ? 'bg-blue-900 hover:bg-blue-800 border border-blue-900 text-white hover:text-white'
                        : 'bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 hover:text-blue-800'
                    }`}
                  >
                   {personalQuestionMode ? '🎯 Выключить мой вопрос' : '🎯 Включить мой вопрос'}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex-shrink-0 w-full">
        {/* Error Message */}
        {showError && (
          <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-red-700">{APP_TEXTS.ERROR_TEXT_TOO_LONG}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex space-x-2 w-full">
          <div className="flex-1 relative">
            {/* Prefilled question prompt */}
            {prefilledQuestion && inputValue === prefilledQuestion && (
              <div className="absolute -top-8 left-0 right-0 text-center">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                  Хотите добавить что-то?
                </span>
              </div>
            )}
            <textarea
              ref={inputRef}
              rows={inputValue.length > 200 ? Math.min(Math.ceil(inputValue.length / 100), 6) : 1}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={APP_TEXTS.CHAT_INPUT_PLACEHOLDER}
              className={`w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors resize-none ${
                showError ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              style={{ 
                minHeight: '44px',
                lineHeight: '1.5',
                paddingBottom: '8px',
                paddingRight: inputValue.length > 200 ? '100px' : '90px'
              }}
            />
            {/* Character Counter */}
            <div className={`absolute right-2 sm:right-3 bg-white bg-opacity-95 px-2 py-1 rounded shadow-sm ${
              'top-1/2 transform -translate-y-2/3'
            }`}>
              <span className={`text-xs ${
                inputValue.length > 4500 ? 'text-red-500' : 
                inputValue.length > 4000 ? 'text-yellow-500' : 'text-gray-400'
              }`}>
                {inputValue.length}/5000
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center flex-shrink-0"
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-1 sm:mt-2 text-center px-1">
          {APP_TEXTS.CHAT_INPUT_HINT}
        </p>
      </div>
    </div>

      {/* Examples Modal */}
      <ExamplesModal
        isOpen={showExamplesModal}
        onClose={() => setShowExamplesModal(false)}
        onAskQuestion={onPrefilledQuestion || (() => {})}
        onFocusInput={focusInput}
      />
      
      {/* Personal Questions Modal */}
      <PersonalQuestionModal
        isOpen={showPersonalModal}
        onClose={() => setShowPersonalModal(false)}
        totalQuestions={totalQuestions}
        onTogglePersonalMode={onTogglePersonalMode || (() => {})}
        onFocusInput={focusInput}
      />
    </>
  );
}