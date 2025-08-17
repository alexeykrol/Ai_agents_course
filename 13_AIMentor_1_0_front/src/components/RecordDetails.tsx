import React, { useState } from 'react';
import { Edit2, Check, Undo2, Save, X } from 'lucide-react';
import { AgentRecord, EditableFields, NewAgentFields } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface RecordDetailsProps {
  record: AgentRecord | null;
  isEditing: boolean;
  isCreatingNew: boolean;
  loading: boolean;
  canUndo: boolean;
  onEdit: () => void;
  onSave: (fields: EditableFields) => void;
  onCreateNew: (fields: NewAgentFields) => void;
  onCancelNew: () => void;
  onUndo: () => void;
}

export function RecordDetails({
  record,
  isEditing,
  isCreatingNew,
  loading,
  canUndo,
  onEdit,
  onSave,
  onCreateNew,
  onCancelNew,
  onUndo
}: RecordDetailsProps) {
  const [editedFields, setEditedFields] = useState<EditableFields>({
    p2_wf_name: '',
    p2_variable_1: '',
    p2_variable_2: '',
    p2_variable_3: '',
    p2_variable_4: ''
  });

  const [newAgentFields, setNewAgentFields] = useState<NewAgentFields>({
    p2_wf_name: '',
    p2_variable_1: '',
    p2_variable_2: '',
    p2_variable_3: '',
    p2_variable_4: ''
  });

  React.useEffect(() => {
    if (record && !isEditing && !isCreatingNew) {
      setEditedFields({
        p2_wf_name: record.p2_wf_name,
        p2_variable_1: record.p2_variable_1,
        p2_variable_2: record.p2_variable_2,
        p2_variable_3: record.p2_variable_3,
        p2_variable_4: record.p2_variable_4
      });
    }
  }, [record, isEditing, isCreatingNew]);

  const handleFieldChange = (field: keyof EditableFields, value: string) => {
    setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  const handleNewAgentFieldChange = (field: keyof NewAgentFields, value: string) => {
    setNewAgentFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedFields);
  };

  const handleCreateNew = () => {
    onCreateNew(newAgentFields);
  };

  const handleCancelNew = () => {
    setNewAgentFields({
      p2_wf_name: '',
      p2_variable_1: '',
      p2_variable_2: '',
      p2_variable_3: '',
      p2_variable_4: ''
    });
    onCancelNew();
  };

  if (!record && !isCreatingNew) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        Select a record to view details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{isCreatingNew ? 'Создать нового агента' : 'Детали записи'}</h2>
        <div className="flex gap-2">
          {canUndo && !isEditing && !isCreatingNew && (
            <button
              onClick={onUndo}
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="small" className="mr-2" />
              ) : (
                <Undo2 className="h-4 w-4 mr-2" />
              )}
              Отменить изменения
            </button>
          )}
          {isCreatingNew ? (
            <>
              <button
                onClick={handleCancelNew}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Отмена
              </button>
              <button
                onClick={handleCreateNew}
                disabled={loading || !newAgentFields.p2_wf_name.trim()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <LoadingSpinner size="small" className="mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Добавить
              </button>
            </>
          ) : !isEditing ? (
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="small" className="mr-2" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Подтвердить
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название агента
            </label>
            {isEditing || isCreatingNew ? (
              <input
                type="text"
                value={isCreatingNew ? newAgentFields.p2_wf_name : editedFields.p2_wf_name}
                onChange={(e) => isCreatingNew 
                  ? handleNewAgentFieldChange('p2_wf_name', e.target.value)
                  : handleFieldChange('p2_wf_name', e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите название агента"
              />
            ) : (
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                {record?.p2_wf_name}
              </p>
            )}
          </div>
          
          {!isCreatingNew && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Версия
              </label>
              <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                {record?.p2_wf_version}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Функции
          </label>
          {isEditing || isCreatingNew ? (
            <textarea
              value={isCreatingNew ? newAgentFields.p2_variable_1 : editedFields.p2_variable_1}
              onChange={(e) => isCreatingNew 
                ? handleNewAgentFieldChange('p2_variable_1', e.target.value)
                : handleFieldChange('p2_variable_1', e.target.value)
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите функции агента"
            />
          ) : (
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[80px] whitespace-pre-wrap">
              {record?.p2_variable_1}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Вход
          </label>
          {isEditing || isCreatingNew ? (
            <textarea
              value={isCreatingNew ? newAgentFields.p2_variable_2 : editedFields.p2_variable_2}
              onChange={(e) => isCreatingNew 
                ? handleNewAgentFieldChange('p2_variable_2', e.target.value)
                : handleFieldChange('p2_variable_2', e.target.value)
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите входные данные агента"
            />
          ) : (
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[80px] whitespace-pre-wrap">
              {record?.p2_variable_2}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Выход
          </label>
          {isEditing || isCreatingNew ? (
            <textarea
              value={isCreatingNew ? newAgentFields.p2_variable_3 : editedFields.p2_variable_3}
              onChange={(e) => isCreatingNew 
                ? handleNewAgentFieldChange('p2_variable_3', e.target.value)
                : handleFieldChange('p2_variable_3', e.target.value)
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите выходные данные агента"
            />
          ) : (
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[80px] whitespace-pre-wrap">
              {record?.p2_variable_3}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Резервное поле
          </label>
          {isEditing || isCreatingNew ? (
            <textarea
              value={isCreatingNew ? newAgentFields.p2_variable_4 : editedFields.p2_variable_4}
              onChange={(e) => isCreatingNew 
                ? handleNewAgentFieldChange('p2_variable_4', e.target.value)
                : handleFieldChange('p2_variable_4', e.target.value)
              }
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Резервное поле"
            />
          ) : (
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[60px] whitespace-pre-wrap">
              {record?.p2_variable_4}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}