import React from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { APP_TEXTS } from '../config/texts';
import { ChatMessage } from '../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 sm:space-x-3`}>
        {/* Avatar */}
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-600 ml-2 sm:ml-3' : 'bg-gray-200 mr-2 sm:mr-3'
        }`}>
          {isUser ? (
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          ) : (
            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          )}
        </div>

        {/* Message Content */}
        <div className={`${isUser ? 'mr-2 sm:mr-3' : 'ml-2 sm:ml-3'}`}>
          <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
            isUser 
              ? 'bg-blue-600 text-white rounded-br-md' 
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          } shadow-sm`}>
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {/* Timestamp and Copy Button */}
          <div className={`flex items-center mt-1 sm:mt-2 space-x-1 sm:space-x-2 ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(message.timestamp), { 
                addSuffix: true, 
                locale: ru 
              })}
            </span>
            
            {/* Always visible Copy Button for AI messages */}
            {!isUser && (
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-1 sm:px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                title={APP_TEXTS.BUTTON_COPY}
              >
                {copied ? (
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                ) : (
                  <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                )}
                <span className="hidden sm:inline">{copied ? 'Скопировано' : 'Копировать'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}