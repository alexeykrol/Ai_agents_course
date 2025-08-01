import React from 'react';
import { Database, Plus } from 'lucide-react';
import { useRecords } from './hooks/useRecords';
import { RecordTable } from './components/RecordTable';
import { RecordDetails } from './components/RecordDetails';
import { ErrorNotification } from './components/ErrorNotification';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const {
    records,
    activeRecord,
    isEditing,
    isCreatingNew,
    loading,
    error,
    canUndo,
    selectRecord,
    startEditing,
    startCreatingNew,
    cancelCreatingNew,
    saveRecord,
    createNewAgent,
    undoLastChange,
    fetchRecords,
    clearError
  } = useRecords();

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <ErrorNotification
          message={error}
          onRetry={fetchRecords}
          onClose={clearError}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Agent Manager</h1>
                <p className="text-gray-600">Manage your AI agents with version control</p>
              </div>
            </div>
            <button
              onClick={startCreatingNew}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="small" className="mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Создать агента
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Все агенты</h2>
            <RecordTable
              records={records}
              activeRecordId={activeRecord?.id || null}
              onRecordSelect={selectRecord}
              loading={loading && records.length === 0}
            />
          </div>

          <div>
            <RecordDetails
              record={activeRecord}
              isEditing={isEditing}
              isCreatingNew={isCreatingNew}
              loading={loading}
              canUndo={canUndo}
              onEdit={startEditing}
              onSave={saveRecord}
              onCreateNew={createNewAgent}
              onCancelNew={cancelCreatingNew}
              onUndo={undoLastChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;