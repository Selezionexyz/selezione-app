import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { 
  BarChart3, Crown, Zap, Users, Settings, LogOut,
  Menu, X
} from 'lucide-react';

const SimpleLayout = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'estimation', name: 'Estimation IA', icon: Zap },
    { id: 'marketplace', name: 'Marketplace', icon: Crown },
    { id: 'members', name: 'Membres', icon: Users },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {menuItems.find(item => item.id === activeView)?.name}
            </h2>
            <p className="text-gray-400">Fonctionnalité en développement...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 w-64 flex-shrink-0 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-30 h-full`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">SELEZIONE</h1>
              <p className="text-sm text-gray-400">Plateforme Luxe</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'Utilisateur'}</p>
              <p className="text-xs text-amber-400">{user?.subscription || 'Essai gratuit'}</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors mb-2 ${
                activeView === item.id
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-900 border-b border-gray-700 p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SimpleLayout;