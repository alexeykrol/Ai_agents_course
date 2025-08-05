import { useState, useCallback } from 'react';
import { ChatMessage } from '../types/chat';

// Mock responses for demonstration
const MOCK_RESPONSES = [
  "Это очень интересный вопрос! Позвольте мне подумать над этим...",
  "Я понимаю, что вы имеете в виду. Вот что я могу предложить:",
  "Отличный вопрос! Основываясь на моих знаниях, могу сказать следующее:",
  "Это довольно сложная тема. Давайте разберем ее по частям:",
  "Я рад помочь вам с этим вопросом. Вот мой ответ:",
  "Интересная точка зрения! Позвольте мне поделиться своими мыслями:",
  "Это важная тема. Вот что я думаю об этом:",
  "Хороший вопрос! Я постараюсь дать вам исчерпывающий ответ:",
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const generateMockResponse = useCallback(() => {
    const responses = MOCK_RESPONSES;
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Instant response for testing
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      content: generateMockResponse(),
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  }, [generateMockResponse]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  };
}