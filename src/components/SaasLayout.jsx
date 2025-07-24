import React, { useState } from 'react';
import {
  Menu, X, Home, Zap, Calculator, TrendingUp, FileText,
  GraduationCap, MessageCircle, Bot, Crown, ShoppingBag, Camera, Users,
  Settings, Clock, Search, Shield, Activity, Target, Tag, Globe, Archive
} from 'lucide-react';

import ToolRemoved from './ToolRemoved';
import Dashboard from './Dashboard';
import ComparateurLuxe from './ComparateurLuxe';
import OutilEstimationIA from './OutilEstimationIA';
import CalculateurMarge from './CalculateurMarge';
import ScannerCodeBarres from './ScannerCodeBarres';
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
import RadarOpportunites from './RadarOpportunites';
import SiteB2BFournisseur from './SiteB2BFournisseur';
import PhotoPerfectVendeur from './PhotoPerfectVendeur';
import QuoiVendreAdvisor from './QuoiVendreAdvisor';
import SuiviTendancesRevolutionnaire from './SuiviTendancesRevolutionnaire';
import FarfetchDirectoryTool from './FarfetchDirectoryTool';
import FournisseurFilesManager from './FournisseurFilesManager';
import EbookSelezione from './EbookSelezione';

const SaasLayout = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const views = {
    dashboard: <Dashboard />,
    marketplace: <ComparateurLuxe />,
    estimation: <OutilEstimationIA />,
    'analyseur-prix': <ToolRemoved 
      toolName="Analyseur Prix Concurrence" 
      reason="Outil retiré car données fictives. Sera remplacé par une vraie comparaison de prix avec API réelles."
      alternatives={["Dashboard Intelligence", "Estimation IA"]} 
    />,
    'rapport-roi': <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center">
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🗑️</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-red-400">Rapport ROI</h1>
        <p className="text-xl text-gray-300 mb-2">OUTIL RETIRÉ</p>
        <p className="text-gray-400">Cet outil ne servait à rien et a été supprimé</p>
        <div className="mt-6 px-4 py-2 bg-red-500/20 rounded-lg text-red-300 text-sm">
          ❌ Remplacé par des outils plus performants
        </div>
      </div>
    </div>,
    calculateur: <CalculateurMarge />,
    scanner: <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center">
        <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚧</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-orange-400">Scanner Référence</h1>
        <p className="text-xl text-gray-300 mb-2">EN TRAVAUX</p>
        <p className="text-gray-400">Outil en développement pour une expérience révolutionnaire</p>
        <div className="mt-6 px-4 py-2 bg-orange-500/20 rounded-lg text-orange-300 text-sm">
          🔨 Retour prévu bientôt avec fonctionnalités premium
        </div>
      </div>
    </div>,
    'auth-ia': <AssistantAuthentificationIA />,
    simulateur: <SimulateurInvestissement />,
    tendances: <SuiviTendancesRevolutionnaire />,
    radar: <RadarOpportunites />,
    'quoi-vendre': <QuoiVendreAdvisor />,
    'photo-perfect': <PhotoPerfectVendeur />,
    'site-b2b': <SiteB2BFournisseur />,
    'ebook-selezione': <EbookSelezione user={user} />,
    'farfetch-directory': <FarfetchDirectoryTool user={user} />,
    'fournisseur-files': <FournisseurFilesManager user={user} />,
    fichiers: <HebergeurPanier />,
    etiquettes: <GenerateurEtiquettesPro />,
    crm: <CRMFournisseurs />,
    academy: <Academy />,
    chat: <OutilTchat />,
    agent: <AssistantLuxe />,
    pricing: <PageVente />
  };

  // Menu organisé par thèmes - VERSION FINALE NETTOYÉE
  const menuThemes = [
    {
      title: '📊 BUSINESS INTELLIGENCE',
      items: [
        { id: 'dashboard', label: 'Dashboard Intelligence', icon: Home, description: 'Tendances temps réel', badge: 'LIVE' },
        { id: 'estimation', label: 'Estimation IA', icon: Zap, description: 'GPT-4 Turbo', badge: 'IA' },
        { id: 'analyseur-prix', label: 'Analyseur Prix Concurrence', icon: Search, description: '50+ sites comparés', badge: 'NEW' },
        { id: 'rapport-roi', label: 'Rapport ROI Intelligence', icon: TrendingUp, description: 'Prédictions IA', badge: 'PRO' }
      ]
    },
    {
      title: '🛠️ OUTILS PROFESSIONNELS',
      items: [
        { id: 'marketplace', label: 'Marketplace B2B', icon: ShoppingBag, description: '22 fournisseurs premium', badge: 'B2B' },
        { id: 'site-b2b', label: 'Site B2B Fournisseur', icon: Globe, description: 'B2BFashion.online intégré', badge: 'NEW' },
        { id: 'scanner', label: 'Scanner Référence', icon: Camera, description: 'Base données complète', badge: 'NEW' },
        { id: 'auth-ia', label: 'Authentification IA', icon: Shield, description: '10,000+ modèles', badge: 'IA+' },
        { id: 'simulateur', label: 'Simulateur Investissement', icon: Calculator, description: 'Prédictions 2 ans', badge: 'HOT' }
      ]
    },
    {
      title: '📈 GESTION & ANALYTICS',
      items: [
        { id: 'tendances', label: 'Suivi Tendances Luxe', icon: Activity, description: 'Vogue + Google + Instagram', badge: 'LIVE' },
        { id: 'quoi-vendre', label: 'Quoi Vendre Advisor', icon: Target, description: 'IA + Scraping Vinted/Joli Closet', badge: 'HOT' },
        { id: 'photo-perfect', label: 'Photo Perfect Vendeur', icon: Camera, description: 'IA Vision + Analyse Qualité', badge: 'NEW' },
        { id: 'radar', label: 'Radar Opportunités', icon: Target, description: 'Scan auto 100+ sites', badge: 'AUTO' },
        { id: 'calculateur', label: 'Calculateur Marge', icon: Calculator, description: 'Optimisation profits' },
        { id: 'fichiers', label: 'Fichiers & Commandes', icon: FileText, description: 'Documents + Panier', badge: 'PRO' }
      ]
    },
    {
      title: '🔧 OUTILS PRO+',
      items: [
        { id: 'farfetch-directory', label: '🇮🇹 Répertoire Farfetch', icon: Search, description: '42 boutiques Italie + contacts', badge: 'ADMIN' },
        { id: 'fournisseur-files', label: '📁 Fichiers Fournisseurs', icon: Archive, description: 'Stockage 100 fichiers permanent', badge: 'ADMIN' },
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
      'ADMIN': 'bg-red-600/20 text-red-300 border border-red-600/30',
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