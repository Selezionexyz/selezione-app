import React, { useState } from 'react';
import {
  Menu, X, Home, Zap, Calculator, TrendingUp, FileText,
  GraduationCap, MessageCircle, Bot, Crown, ShoppingBag, Camera, Users,
  Settings, Clock, Search, Shield, Activity, Target, Tag
} from 'lucide-react';

import ToolRemoved from './ToolRemoved';
import Dashboard from './Dashboard';
import ComparateurLuxe from './ComparateurLuxe';
import OutilEstimationIA from './OutilEstimationIA';
import CalculateurMarge from './CalculateurMarge';
import HebergeurPanier from './HebergeurPanier';
import CRMFournisseurs from './CRMFournisseurs';
import Academy from './Academy';
import OutilTchat from './OutilTchat';
import AssistantLuxe from './AssistantLuxe';
import PageVente from './PageVente';
import RapportROIIntelligence from './RapportROIIntelligence';
import GenerateurEtiquettesPro from './GenerateurEtiquettesPro';
import AssistantAuthentificationIA from './AssistantAuthentificationIA';
import SimulateurInvestissement from './SimulateurInvestissement';

const SaasLayout = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const views = {
    dashboard: <Dashboard />,
    marketplace: <ComparateurLuxe />,
    estimation: <OutilEstimationIA />,
    'rapport-roi': <RapportROIIntelligence />,
    calculateur: <CalculateurMarge />,
    'auth-ia': <AssistantAuthentificationIA />,
    simulateur: <SimulateurInvestissement />,
    fichiers: <HebergeurPanier />,
    etiquettes: <GenerateurEtiquettesPro />,
    crm: <CRMFournisseurs />,
    academy: <Academy />,
    chat: <OutilTchat />,
    agent: <AssistantLuxe />,
    pricing: <PageVente />
  };

  // Menu organisé par thèmes - VERSION NETTOYÉE
  const menuThemes = [
    {
      title: '📊 BUSINESS INTELLIGENCE',
      items: [
        { id: 'dashboard', label: 'Dashboard Intelligence', icon: Home, description: 'Données temps réel', badge: 'LIVE' },
        { id: 'estimation', label: 'Estimation IA', icon: Zap, description: 'GPT-4 Turbo', badge: 'IA' },
        { id: 'rapport-roi', label: 'Rapport ROI Intelligence', icon: TrendingUp, description: 'Prédictions IA', badge: 'PRO' }
      ]
    },
    {
      title: '🛠️ OUTILS PROFESSIONNELS',
      items: [
        { id: 'marketplace', label: 'Marketplace B2B', icon: ShoppingBag, description: '40+ fournisseurs premium', badge: 'B2B' },
        { id: 'auth-ia', label: 'Authentification IA', icon: Shield, description: '10,000+ modèles', badge: 'IA+' },
        { id: 'simulateur', label: 'Simulateur Investissement', icon: Calculator, description: 'Prédictions 2 ans', badge: 'HOT' }
      ]
    },
    {
      title: '📈 GESTION & ANALYTICS',
      items: [
        { id: 'calculateur', label: 'Calculateur Marge', icon: Calculator, description: 'Optimisation profits' },
        { id: 'fichiers', label: 'Fichiers & Commandes', icon: FileText, description: 'Documents + Panier', badge: 'PRO' }
      ]
    },
    {
      title: '🔧 OUTILS PRO+',
      items: [
        { id: 'etiquettes', label: 'Générateur Étiquettes', icon: Tag, description: 'QR codes + templates', badge: 'NEW' },
        { id: 'crm', label: 'CRM Fournisseurs', icon: Users, description: 'Ultra Premium uniquement', badge: 'VIP' },
        { id: 'chat', label: 'Community Chat', icon: MessageCircle, description: 'Réseau professionnel' },
        { id: 'agent', label: 'Assistant Luxe IA', icon: Bot, description: '100+ marques database' }
      ]
    },
    {
      title: '🎓 FORMATION & SUPPORT',
      items: [
        { id: 'academy', label: 'Academy Selezione', icon: GraduationCap, description: '20+ modules interactifs' },
        { id: 'pricing', label: 'Pricing Selezione', icon: Crown, description: 'Plans & Tarification', badge: 'PLANS' }
      ]
    }
  ];

  const getBadgeStyle = (badge) => {
    const styles = {
      'IA': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
      'IA+': 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
      'PRO': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
      'NEW': 'bg-green-500/20 text-green-300 border border-green-500/30',
      'HOT': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
      'LIVE': 'bg-red-500/20 text-red-300 border border-red-500/30',
      'AUTO': 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
      'B2B': 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
      'VIP': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      'PLANS': 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
    };
    return styles[badge] || 'bg-gray-500/20 text-gray-300';
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
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
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{user?.name || 'Utilisateur'}</p>
              <p className="text-sm text-amber-400">{user?.subscription || 'Premium'}</p>
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

        {/* Footer avec déconnexion */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {menuThemes.flatMap(theme => theme.items)
                    .find(item => item.id === activeView)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-400">
                  Backend professionnel • APIs opérationnelles
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-black">
          {views[activeView] || <Dashboard />}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SaasLayout;