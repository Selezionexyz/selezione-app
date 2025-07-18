import React, { useState } from 'react';
import {
  Menu, X, Home, Brain, Calculator, TrendingUp, FileText,
  BookOpen, Bell, Diamond, Zap, Bot, GraduationCap, ShoppingCart, Package
} from 'lucide-react';

// Import des composants existants
import OutilEstimationIA from '@/components/OutilEstimationIA';
import Marketplace from './Marketplace';

// Création de composants temporaires pour éviter les erreurs
const Dashboard = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p className="text-gray-400">Tableau de bord en construction...</p>
  </div>
);

const AssistantLuxe = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Assistant Luxe IA</h1>
    <p className="text-gray-400">Assistant en construction...</p>
  </div>
);

const EstimationLuxe = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Estimation Luxe</h1>
    <p className="text-gray-400">Outil d'estimation en construction...</p>
  </div>
);

const FicheProduit = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Fiche Produit</h1>
    <p className="text-gray-400">Générateur de fiches en construction...</p>
  </div>
);

const Quiz = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Quiz Expert</h1>
    <p className="text-gray-400">Quiz en construction...</p>
  </div>
);

const ScraperVC = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Analyseur Marché</h1>
    <p className="text-gray-400">Scraper en construction...</p>
  </div>
);

const Academy = () => (
  <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Academy</h1>
    <p className="text-gray-400">Formation en construction...</p>
  </div>
);

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

  const views = {
    dashboard: <Dashboard />,
    agents: <AssistantLuxe />,
    outils: <EstimationLuxe />,
    fiche: <FicheProduit />,
    scraper: <ScraperVC />,
    quiz: <Quiz />,
    academy: <Academy />,
    marketplace: <Marketplace />,
    estimationia: <OutilEstimationIA />,
  };

  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'agents', label: 'Agents IA', icon: Bot },
      { id: 'outils', label: 'Outils IA', icon: Zap },
      { id: 'fiche', label: 'Fiche Produit', icon: FileText },
      { id: 'scraper', label: 'Analyseur Marché', icon: TrendingUp },
      { id: 'quiz', label: 'Quiz Expert', icon: Brain },
      { id: 'academy', label: 'Academy', icon: GraduationCap },
      { id: 'marketplace', label: 'Marketplace 🛍️', icon: ShoppingCart },
      { id: 'estimationia', label: 'Estimation IA 🔍', icon: Calculator },
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-500/20">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-lg">
                {user.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-amber-400">{user.subscription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TopNav = () => (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-amber-500/20 px-4 py-3 lg:ml-64">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-white">
            {activeView === 'marketplace' && '🛍️ Ma Marketplace'}
            {activeView === 'dashboard' && '📊 Dashboard'}
            {activeView === 'agents' && '🤖 Agents IA'}
            {activeView === 'outils' && '⚡ Outils IA'}
            {activeView === 'estimationia' && '🔍 Estimation IA'}
            {activeView === 'fiche' && '📄 Fiche Produit'}
            {activeView === 'scraper' && '📈 Analyseur Marché'}
            {activeView === 'quiz' && '🧠 Quiz Expert'}
            {activeView === 'academy' && '🎓 Academy'}
          </h1>
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
      { id: 'estimationia', label: 'Estimation IA', icon: Calculator },
      { id: 'academy', label: 'Academy', icon: GraduationCap }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-amber-500/20 lg:ml-64">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
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
        {Object.entries(views).map(([key, component]) => (
          <div key={key} style={{ display: activeView === key ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default SaasLayout;
