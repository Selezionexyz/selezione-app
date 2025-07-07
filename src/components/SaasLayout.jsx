import React, { useState } from 'react';
import { 
  Menu, X, Home, Brain, Calculator, TrendingUp, FileText, 
  BookOpen, Bell, Diamond, Zap, Bot, GraduationCap, ShoppingCart
} from 'lucide-react';

import Dashboard from './Dashboard';
import AssistantLuxe from './AssistantLuxe';
import EstimationLuxe from './EstimationLuxe';
import Academy from './Academy';
import ComparateurLuxe from './ComparateurLuxe';
import FicheProduit from './FicheProduit';
import Quiz from './Quiz';
import ScraperVC from './ScraperVC';

const SaasLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [user] = useState({ 
    name: 'Alexandre Dupont', 
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE'
  });

  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'agents', label: 'Agents IA', icon: Bot },
      { id: 'outils', label: 'Outils IA', icon: Zap },
      { id: 'fiche', label: 'Fiche Produit', icon: FileText },
      { id: 'scraper', label: 'Analyseur Marché', icon: TrendingUp },
      { id: 'quiz', label: 'Quiz Expert', icon: Brain },
      { id: 'academy', label: 'Academy', icon: GraduationCap },
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart }
    ];

    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/95 backdrop-blur-sm border-r border-amber-500/20 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto`}>
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Diamond className="w-8 h-8 text-amber-400" />
              <div>
                <h2 className="text-lg font-bold text-white">SELEZIONE</h2>
                <p className="text-amber-400 text-xs">Luxury Intelligence</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeView === item.id 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TopNav = () => (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-amber-500/20 px-4 py-3 lg:ml-64">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-amber-400">{user.level}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-lg">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const BottomNav = () => {
    const bottomItems = [
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
      { id: 'outils', label: 'Outils IA', icon: Zap },
      { id: 'agents', label: 'Agents', icon: Bot },
      { id: 'academy', label: 'Academy', icon: GraduationCap },
      { id: 'quiz', label: 'Quiz', icon: Brain }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-amber-500/20 lg:ml-64">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(item.id)}
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all"
            >
              <item.icon className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'agents':
        return <AssistantLuxe />;
      case 'outils':
        return <EstimationLuxe />;
      case 'fiche':
        return <FicheProduit />;
      case 'scraper':
        return <ScraperVC />;
      case 'quiz':
        return <Quiz />;
      case 'academy':
        return <Academy />;
      case 'marketplace':
        return <ComparateurLuxe />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 pb-20 relative z-10 min-h-screen">
        {renderMainContent()}
      </main>

      <BottomNav />
    </div>
  );
};

export default SaasLayout;
