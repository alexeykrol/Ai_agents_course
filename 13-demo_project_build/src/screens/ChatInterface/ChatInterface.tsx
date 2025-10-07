import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  senderName?: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Анна Петрова',
      lastMessage: 'Привет! Как дела?',
      timestamp: '14:30',
      avatar: 'AP'
    },
    {
      id: '2',
      name: 'Михаил Иванов',
      lastMessage: 'Увидимся завтра',
      timestamp: '13:45',
      avatar: 'МИ'
    },
    {
      id: '3',
      name: 'Елена Сидорова',
      lastMessage: 'Спасибо за помощь!',
      timestamp: '12:20',
      avatar: 'ЕС'
    },
    {
      id: '4',
      name: 'Дмитрий Козлов',
      lastMessage: 'Отправил файлы',
      timestamp: '11:15',
      avatar: 'ДК'
    },
    {
      id: '5',
      name: 'Ольга Морозова',
      lastMessage: 'Созвонимся позже',
      timestamp: '10:30',
      avatar: 'ОМ'
    }
  ]);

  const [activeConversation, setActiveConversation] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Как дела?',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      senderName: 'Анна Петрова'
    },
    {
      id: '2',
      text: 'Привет! Все отлично, спасибо! А у тебя как?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: '3',
      text: 'Тоже хорошо! Работаю над новым проектом',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      senderName: 'Анна Петрова'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockIncomingMessages = [
    'Как продвигается работа?',
    'Увидимся на встрече',
    'Отправил документы на почту',
    'Спасибо за обратную связь!',
    'Можем обсудить детали завтра',
    'Все готово с моей стороны',
    'Хорошего дня!',
    'Жду твоего ответа'
  ];

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add mock incoming message every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = mockIncomingMessages[Math.floor(Math.random() * mockIncomingMessages.length)];
      const activeConv = conversations.find(c => c.id === activeConversation);
      
      const newMsg: Message = {
        id: Date.now().toString(),
        text: randomMessage,
        sender: 'other',
        timestamp: new Date(),
        senderName: activeConv?.name
      };

      setMessages(prev => [...prev, newMsg]);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeConversation, conversations]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const activeConv = conversations.find(c => c.id === activeConversation);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к меню</span>
        </button>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Conversations list */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Чаты
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  activeConversation === conversation.id ? 'bg-orange-50 border-orange-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel - Active chat */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {activeConv?.avatar}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {activeConv?.name}
                </h3>
                <p className="text-xs text-green-500">В сети</p>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;