import React from 'react';
import { Database, Plus } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useRecords } from './hooks/useRecords';
import { RecordTable } from './components/RecordTable';
import { RecordDetails } from './components/RecordDetails';
import { ErrorNotification } from './components/ErrorNotification';
import { AuthForm } from './components/AuthForm';
import { UserMenu } from './components/UserMenu';

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
          <Database className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <AuthForm
          mode={authMode}
          loading={authLoading}
          onSubmit={handleAuthSubmit}
          onModeChange={setAuthMode}
        />
        {authError && (
          <ErrorNotification
            message={authError}
            onClose={clearAuthError}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agent Manager</h1>
                <p className="text-sm text-gray-500">Manage your AI agents with version control</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={startCreatingNew}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Создать агента
              </button>
              {user && <UserMenu user={user} onSignOut={signOut} />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Records Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Все агенты</h2>
              <button
                onClick={fetchRecords}
                disabled={loading}
                className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 transition-colors"
              >
                Обновить
              </button>
            </div>
            <RecordTable
              records={records}
              activeRecordId={activeRecord?.id || null}
              onRecordSelect={selectRecord}
              loading={loading}
            />
          </div>

          {/* Record Details */}
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

      {/* Error Notification */}
      {error && (
        <ErrorNotification
          message={error}
          onRetry={fetchRecords}
          onClose={clearError}
        />
      )}

      {/* Auth Error Notification */}
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