import React, { useState } from 'react';
import MainMenu from './screens/MainMenu';
import FormConfirmation from './screens/FormConfirmation';
import ChatInterface from './screens/ChatInterface';
import TextEditor from './screens/TextEditor';
import StockDashboard from './screens/StockDashboard';
import WizardForm from './screens/WizardForm';
import KanbanBoard from './screens/KanbanBoard';
import ValidationForm from './screens/ValidationForm';
import ToastNotifications from './screens/ToastNotifications';
import PostEditor from './screens/PostEditor';
import DataTable from './screens/DataTable';

type ScreenId = 'main-menu' | 'form-confirmation' | 'chat-interface' | 'text-editor' | 'stock-dashboard' | 'wizard-form' | 'kanban-board' | 'validation-form' | 'toast-notifications' | 'post-editor' | 'data-table';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('main-menu');

  const handleScreenSelect = (screenId: string) => {
    setCurrentScreen(screenId as ScreenId);
  };

  const handleBackToMenu = () => {
    setCurrentScreen('main-menu');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main-menu':
        return <MainMenu onScreenSelect={handleScreenSelect} />;
      case 'form-confirmation':
        return <FormConfirmation onBack={handleBackToMenu} />;
      case 'chat-interface':
        return <ChatInterface onBack={handleBackToMenu} />;
      case 'text-editor':
        return <TextEditor onBack={handleBackToMenu} />;
      case 'stock-dashboard':
        return <StockDashboard onBack={handleBackToMenu} />;
      case 'wizard-form':
        return <WizardForm onBack={handleBackToMenu} />;
      case 'kanban-board':
        return <KanbanBoard onBack={handleBackToMenu} />;
      case 'validation-form':
        return <ValidationForm onBack={handleBackToMenu} />;
      case 'toast-notifications':
        return <ToastNotifications onBack={handleBackToMenu} />;
      case 'post-editor':
        return <PostEditor onBack={handleBackToMenu} />;
      case 'data-table':
        return <DataTable onBack={handleBackToMenu} />;
      default:
        return <MainMenu onScreenSelect={handleScreenSelect} />;
    }
  };

  return renderScreen();
}

export default App;