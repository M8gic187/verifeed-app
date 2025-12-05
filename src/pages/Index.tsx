import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { PhoneFrame } from '@/components/PhoneFrame';
import { BottomNav } from '@/components/BottomNav';
import { FeedPage } from '@/pages/FeedPage';
import { ForumsPage } from '@/pages/ForumsPage';
import { ChatsPage } from '@/pages/ChatsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { CreatePage } from '@/pages/CreatePage';
import { LoginPage } from '@/pages/LoginPage';

function AppContent() {
  const { isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState('feed');
  const [showLogin, setShowLogin] = useState(true);

  if (!isAuthenticated && showLogin) {
    return (
      <PhoneFrame>
        <LoginPage onLogin={() => setShowLogin(false)} />
      </PhoneFrame>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedPage />;
      case 'forums':
        return <ForumsPage />;
      case 'create':
        return <CreatePage />;
      case 'chats':
        return <ChatsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full relative">
        {renderPage()}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </PhoneFrame>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
