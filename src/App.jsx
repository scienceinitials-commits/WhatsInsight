import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Profile from './pages/Profile';

function MainAppContent() {
  const { currentRoute, isAuthenticated } = useApp();

  // Handle public views
  if (!isAuthenticated) {
    switch (currentRoute) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'landing':
      default:
        return <Landing />;
    }
  }

  // Active dashboard views
  const renderActiveView = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'analysis':
        return <Analysis />;
      case 'history':
        return <History />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-slate-100">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Primary Dashboard Container */}
      <main className="flex-1 px-4 py-8 md:p-10 md:pl-8 max-h-screen overflow-y-auto pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <MainAppContent />
  );
}
