import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface TextEditorProps {
  onBack: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onBack }) => {
  const [title, setTitle] = useState('Untitled Document');
  const [content, setContent] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save logic
  useEffect(() => {
    if (content.trim() === '' && title === 'Untitled Document') {
      setSaveStatus('idle');
      return;
    }

    // Show "Auto-saving..." immediately when typing
    setSaveStatus('saving');

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for 2 seconds
    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saved');
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, title]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Автосохранение...';
      case 'saved':
        return 'Все изменения сохранены';
      default:
        return '';
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-orange-500';
      case 'saved':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад к меню</span>
          </button>
          
          <div className={`text-sm font-medium ${getSaveStatusColor()} transition-colors duration-200`}>
            {getSaveStatusText()}
          </div>
        </div>

        {/* Document Title */}
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none focus:ring-0 p-0 flex-1"
            placeholder="Заголовок документа..."
          />
        </div>
      </div>

      {/* Text Editor Area */}
      <div className="flex-1 p-6">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          placeholder="Начните писать..."
          className="w-full h-full resize-none border-none outline-none text-gray-900 text-lg leading-relaxed placeholder-gray-400 bg-transparent"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        />
      </div>
    </div>
  );
};

export default TextEditor;