import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Send, FileText, Clock, Check, X } from 'lucide-react';

interface PostData {
  title: string;
  content: string;
  lastSaved?: Date;
  isDraft: boolean;
}

interface PostEditorProps {
  onBack: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ onBack }) => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    isDraft: true
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save logic every 5 seconds
  useEffect(() => {
    if (postData.title.trim() === '' && postData.content.trim() === '') {
      setSaveStatus('idle');
      return;
    }

    // Show "Auto-saving..." immediately when typing
    setSaveStatus('saving');

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for 5 seconds
    autoSaveTimeoutRef.current = setTimeout(() => {
      // Mock save to localStorage
      const savedPost = {
        ...postData,
        lastSaved: new Date()
      };
      localStorage.setItem('draft-post', JSON.stringify(savedPost));
      setPostData(prev => ({ ...prev, lastSaved: new Date() }));
      setSaveStatus('saved');
    }, 5000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [postData.title, postData.content]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('draft-post');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setPostData({
          ...parsedDraft,
          lastSaved: parsedDraft.lastSaved ? new Date(parsedDraft.lastSaved) : undefined
        });
        setSaveStatus('saved');
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostData(prev => ({
      ...prev,
      content: e.target.value
    }));
  };

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    
    // Mock save to localStorage
    const savedPost = {
      ...postData,
      lastSaved: new Date(),
      isDraft: true
    };
    
    setTimeout(() => {
      localStorage.setItem('draft-post', JSON.stringify(savedPost));
      setPostData(prev => ({ ...prev, lastSaved: new Date() }));
      setSaveStatus('saved');
    }, 1000);
  };

  const handlePublishClick = () => {
    if (postData.title.trim() === '' || postData.content.trim() === '') {
      alert('Пожалуйста, заполните заголовок и содержание перед публикацией.');
      return;
    }
    setShowPublishModal(true);
  };

  const handleConfirmPublish = () => {
    setIsPublishing(true);
    
    // Mock publish process
    setTimeout(() => {
      const publishedPost = {
        ...postData,
        lastSaved: new Date(),
        isDraft: false
      };
      
      localStorage.setItem('published-post', JSON.stringify(publishedPost));
      localStorage.removeItem('draft-post'); // Remove draft after publishing
      
      setIsPublishing(false);
      setShowPublishModal(false);
      
      alert('Пост успешно опубликован!');
      
      // Reset form
      setPostData({
        title: '',
        content: '',
        isDraft: true
      });
      setSaveStatus('idle');
    }, 2000);
  };

  const handleCancelPublish = () => {
    setShowPublishModal(false);
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Автосохранение...';
      case 'saved':
        return postData.lastSaved 
          ? `Последнее сохранение в ${postData.lastSaved.toLocaleTimeString()}`
          : 'Черновик сохранен';
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

  const isContentEmpty = postData.title.trim() === '' && postData.content.trim() === '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к меню</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Редактор постов</h1>
            <p className="text-gray-600">Создавайте и публикуйте ваш контент</p>
          </div>
          
          {/* Save Status */}
          <div className={`text-sm font-medium ${getSaveStatusColor()} transition-colors duration-200 flex items-center space-x-2`}>
            {saveStatus === 'saving' && <Clock className="w-4 h-4 animate-spin" />}
            {saveStatus === 'saved' && <Check className="w-4 h-4" />}
            <span>{getSaveStatusText()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Editor Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">Напишите ваш пост</h2>
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок поста
                </label>
                <input
                  type="text"
                  id="title"
                  value={postData.title}
                  onChange={handleTitleChange}
                  placeholder="Введите заголовок поста..."
                  className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Содержание поста
                </label>
                <textarea
                  id="content"
                  value={postData.content}
                  onChange={handleContentChange}
                  placeholder="Начните писать содержание поста..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSaveDraft}
                    disabled={isContentEmpty || saveStatus === 'saving'}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>Сохранить черновик</span>
                  </button>

                  <button
                    onClick={handlePublishClick}
                    disabled={isContentEmpty}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <Send className="w-4 h-4" />
                    <span>Опубликовать</span>
                  </button>
                </div>

                {/* Word Count */}
                <div className="text-sm text-gray-500">
                  {postData.content.length} символов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Send className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-900">Опубликовать пост</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Вы уверены, что хотите опубликовать этот пост? После публикации он будет виден всем читателям.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Предварительный просмотр поста:</h4>
                <p className="text-sm text-gray-700 font-medium mb-1">
                  {postData.title || 'Пост без заголовка'}
                </p>
                <p className="text-xs text-gray-500">
                  {postData.content.substring(0, 100)}
                  {postData.content.length > 100 ? '...' : ''}
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={handleCancelPublish}
                  disabled={isPublishing}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirmPublish}
                  disabled={isPublishing}
                  className="inline-flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {isPublishing ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Публикация...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Подтвердить публикацию</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditor;