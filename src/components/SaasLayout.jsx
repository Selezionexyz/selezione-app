import React, { useState } from 'react';
import {
  Menu, X, Home, Zap, Calculator, TrendingUp, FileText,
  GraduationCap, MessageCircle, Bot, Crown, ShoppingBag, Camera, Users,
  Settings, Clock
} from 'lucide-react';

import Dashboard from './Dashboard';
import OutilEstimationIA from './OutilEstimationIA';
import CalculateurMarge from './CalculateurMarge';
import ScannerCodeBarres from './ScannerCodeBarres';
import SuiviTendances from './SuiviTendances';
import HebergeurPanier from './HebergeurPanier';
import CRMFournisseurs from './CRMFournisseurs';
import Academy from './Academy';
import OutilTchat from './OutilTchat';
import AssistantLuxe from './AssistantLuxe';
import ComparateurLuxe from './ComparateurLuxe';
import PageVente from './PageVente';

const SaasLayout = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const views = {
    dashboard: <Dashboard />,
    marketplace: <ComparateurLuxe />,
    estimation: <OutilEstimationIA />,
    calculateur: <CalculateurMarge />,
    scanner: <ScannerCodeBarres />,
    tendances: <SuiviTendances />,
    fichiers: <HebergeurPanier />,
    crm: <CRMFournisseurs />,
    academy: <Academy />,
    chat: <OutilTchat />,
    agent: <AssistantLuxe />,
    pricing: <PageVente />
  };

  // Menu organisé par thèmes
  const menuThemes = [
    {
      title: '📊 BUSINESS',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Vue d\'ensemble' },
        { id: 'estimation', label: 'Estimation IA', icon: Zap, description: 'GPT-4 + Marché', badge: 'PRO' },
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, description: 'B2B Pro' }
      ]
    },
    {
      title: '🛠️ OUTILS PRO',
      items: [
        { id: 'calculateur', label: 'Calculateur Marge', icon: Calculator, description: 'URSAFF inclus' },
        { id: 'scanner', label: 'Scanner Code-Barres', icon: Camera, description: 'Identification auto', badge: 'NEW' },
        { id: 'tendances', label: 'Suivi Tendances', icon: TrendingUp, description: 'Produits émergents', badge: 'HOT' }
      ]
    },
    {
      title: '📁 GESTION',
      items: [
        { id: 'fichiers', label: 'Fichiers & Commandes', icon: FileText, description: 'Docs + Panier' },
        { id: 'crm', label: 'CRM Fournisseurs', icon: Users, description: 'Gestion contacts' },
        { id: 'academy', label: 'Academy', icon: GraduationCap, description: '20+ chapitres', badge: 'NEW' }
      ]
    },
    {
      title: '💬 SUPPORT',
      items: [
        { id: 'chat', label: 'Community Chat', icon: MessageCircle, description: 'Support live', badge: 'LIVE' },
        { id: 'agent', label: 'Assistant IA', icon: Bot, description: '3 experts IA', badge: 'PRO' }
      ]
    },
    {
      title: '⚙️ COMPTE',
      items: [
        { id: 'pricing', label: 'Pricing Selezione', icon: Crown, description: 'Nos formules', badge: 'VIP' }
      ]
    }
  ];

  const getBadgeStyle = (badge) => {
    const styles = {
      'PRO': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      'NEW': 'bg-green-500/20 text-green-300 border border-green-500/30',
      'HOT': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
      'LIVE': 'bg-red-500/20 text-red-300 border border-red-500/30',
      'VIP': 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    };
    return styles[badge] || 'bg-gray-500/20 text-gray-300';
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                SELEZIONE
              </h1>
              <p className="text-xs text-gray-400">Plateforme B2B Luxe</p>
            </div>
          </div>
        </div>

        {/* Menu par thèmes */}
        <div className="p-4 space-y-6">
          {menuThemes.map((theme) => (
            <div key={theme.title}>
              <div className="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {theme.title}
              </div>
              <div className="space-y-1">
                {theme.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full group transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600'
                        : 'hover:bg-gray-800/50'
                    } rounded-xl`}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg transition-colors ${
                          activeView === item.id
                            ? 'bg-white/20'
                            : 'bg-gray-700/50 group-hover:bg-gray-700'
                        }`}>
                          <item.icon className={`w-5 h-5 ${
                            activeView === item.id ? 'text-white' : 'text-gray-300'
                          }`} />
                        </div>
                        <div className="text-left">
                          <p className={`font-medium text-sm ${
                            activeView === item.id ? 'text-white' : 'text-gray-200'
                          }`}>
                            {item.label}
                          </p>
                          <p className={`text-xs ${
                            activeView === item.id ? 'text-white/70' : 'text-gray-400'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {item.badge && (
                        <div className={`px-2 py-1 text-xs font-bold rounded-full ${getBadgeStyle(item.badge)}`}>
                          {item.badge}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div>
                <h1 className="font-bold text-lg text-white">
                  Dashboard Intelligence SELEZIONE
                </h1>
                <p className="text-xs text-gray-400">
                  Outils professionnels • Données temps réel
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Informations utilisateur */}
              <div className="bg-black/30 rounded-lg p-3 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{user?.avatar || '👤'}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{user?.nom || 'Utilisateur'}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-gray-400">{user?.subscription || 'Plan Gratuit'}</p>
                      {user?.plan === 'essai' && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-amber-400 font-medium">
                            {user.trial_days_left}j
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bouton upgrade pour utilisateurs essai */}
              {user?.plan === 'essai' && (
                <button className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 text-sm font-medium flex items-center space-x-1">
                  <Crown className="w-4 h-4" />
                  <span>Upgrade</span>
                </button>
              )}
              
              {/* Menu utilisateur */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-white font-medium text-sm">{user?.nom}</p>
                        <p className="text-gray-400 text-xs">{user?.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                        Mon Profil
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                        Paramètres
                      </button>
                      {user?.plan === 'essai' && (
                        <button className="w-full text-left px-4 py-2 text-sm text-purple-400 hover:bg-gray-700 transition-colors font-medium">
                          Passer au Premium
                        </button>
                      )}
                      <div className="border-t border-gray-700 mt-2">
                        <button 
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                        >
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {views[activeView]}
        </main>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SaasLayout;