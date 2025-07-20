import React, { useState } from 'react';
import {
  Menu, X, Home, Brain, Calculator, TrendingUp, FileText,
  BookOpen, Bell, Diamond, Zap, Bot, GraduationCap, ShoppingCart, ShoppingBag,
  Package, Star, Settings, User, CreditCard, LogOut, HelpCircle,
  BarChart3, Award, Sparkles, Gem, Crown, Shield, MessageCircle, Target
} from 'lucide-react';

// Import de TOUS vos VRAIS composants existants
import OutilEstimationIA from '@/components/OutilEstimationIA';
import Dashboard from './Dashboard';
import AssistantLuxe from './AssistantLuxe';
import Academy from './Academy';
import FicheProduit from './FicheProduit';
import Quiz from './Quiz';
import ScraperVC from './ScraperVC';
import ComparateurLuxe from './ComparateurLuxe';
import PageVente from './PageVente';
import OutilTchat from './OutilTchat';
import CalculateurMarge from './CalculateurMarge';
import HebergeurPanier from './HebergeurPanier';
import OutilsBusiness from './OutilsBusiness';
import ComptesMembres from './ComptesMembres';

const SaasLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nouvelle estimation disponible', time: 'Il y a 5 min', read: false },
    { id: 2, message: 'Academy : Nouveau chapitre débloqué', time: 'Il y a 1h', read: false },
    { id: 3, message: 'Marketplace : 3 nouveaux produits', time: 'Il y a 2h', read: true }
  ]);

  const [user] = useState({
    name: 'Alexandre Dupont',
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE',
    email: 'alexandre.dupont@luxe.com',
    joinDate: 'Membre depuis 2024',
    achievements: 12,
    completedCourses: 8
  });

  // Statistiques globales
  const [globalStats] = useState({
    totalEstimations: 2547,
    savedAmount: 45678,
    accuracyRate: 98.5,
    marketTrend: '+12%'
  });

  const views = {
    dashboard: <Dashboard />,
    marketplace: <ComparateurLuxe />,
    estimation: <OutilEstimationIA />,
    calculateur: <CalculateurMarge />,
    fichiers: <HebergeurPanier />,
    'outils-business': <OutilsBusiness />,
    agent: <AssistantLuxe />,
    chat: <OutilTchat />,
    academy: <Academy />,
    compte: <ComptesMembres />,
    pricing: <PageVente />,
    agents: <AssistantLuxe />,
    outils: <OutilEstimationIA />,
    fiche: <FicheProduit />,
    vente: <PageVente />,
    tchat: <OutilTchat />,
  };

  const Sidebar = () => {
    const menuItems = [
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: Home,
        description: 'Vue d\'ensemble',
        badge: null
      },
      { 
        id: 'marketplace', 
        label: 'Marketplace', 
        icon: ShoppingBag,
        description: 'B2B Pro',
        badge: null
      },
      { 
        id: 'estimation', 
        label: 'Estimation IA', 
        icon: Zap,
        description: 'GPT-4 + Marché',
        badge: null
      },
      { 
        id: 'calculateur', 
        label: 'Calculateur Marge', 
        icon: Calculator,
        description: 'Calcul automatique',
        badge: null
      },
      { 
        id: 'fichiers', 
        label: 'Fichiers & Commandes', 
        icon: FileText,
        description: 'Gestion documents',
        badge: null
      },
      { 
        id: 'outils-business', 
        label: 'Outils Business', 
        icon: Target,
        description: 'Suite professionnelle',
        badge: 'PRO'
      },
      { 
        id: 'agent', 
        label: 'Assistant IA', 
        icon: Bot,
        description: '3 experts IA',
        badge: 'PRO'
      },
      { 
        id: 'chat', 
        label: 'Community Chat', 
        icon: MessageCircle,
        description: 'Support 24/7',
        badge: 'LIVE'
      },
      { 
        id: 'academy', 
        label: 'Academy', 
        icon: GraduationCap,
        description: '20+ chapitres',
        badge: 'NEW'
      },
      { 
        id: 'pricing', 
        label: 'Pricing Selezione', 
        icon: Crown,
        description: 'Nos formules',
        badge: 'VIP'
      }
    ];

    // Fonction pour changer de vue
    const handleMenuClick = (viewId) => {
      setActiveView(viewId);
      setSidebarOpen(false); // Fermer sur mobile
    };

    const bottomMenuItems = [
      { icon: Settings, label: 'Paramètres', action: 'settings' },
      { icon: HelpCircle, label: 'Support', action: 'support' },
      { icon: LogOut, label: 'Déconnexion', action: 'logout' }
    ];

    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-black/95 backdrop-blur-xl border-r border-amber-500/20 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto`}>
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Diamond className="w-10 h-10 text-amber-400" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">SELEZIONE</h2>
                <p className="text-amber-400 text-xs">Luxury Intelligence Platform</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white lg:hidden transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="p-4 grid grid-cols-2 gap-3 border-b border-amber-500/10">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3">
            <p className="text-amber-400 text-xs">Crédits IA</p>
            <p className="text-white font-bold text-lg">{user.credits.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3">
            <p className="text-green-400 text-xs">Précision</p>
            <p className="text-white font-bold text-lg">{globalStats.accuracyRate}%</p>
          </div>
        </div>

        {/* Menu principal */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
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
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    item.badge === 'PRO' ? 'bg-purple-500 text-white' :
                    item.badge === 'LIVE' ? 'bg-green-500 text-white' :
                    item.badge === 'NEW' ? 'bg-blue-500 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Menu du bas */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4 border-t border-amber-500/20">
          {/* Actions rapides */}
          <div className="flex justify-around">
            {bottomMenuItems.map((item, idx) => (
              <button
                key={idx}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Profil utilisateur */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl">
                  {user.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-amber-400">{user.subscription}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Crown className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-400">{user.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TopNav = () => (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-amber-500/20 px-4 py-3 lg:ml-72">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Titre de la page active avec icône */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg">
            {activeView === 'dashboard' && <Home className="w-5 h-5 text-amber-400" />}
            {activeView === 'marketplace' && <ShoppingBag className="w-5 h-5 text-amber-400" />}
            {activeView === 'estimation' && <Zap className="w-5 h-5 text-amber-400" />}
            {activeView === 'calculateur' && <Calculator className="w-5 h-5 text-amber-400" />}
            {activeView === 'fichiers' && <FileText className="w-5 h-5 text-amber-400" />}
            {activeView === 'outils-business' && <Target className="w-5 h-5 text-amber-400" />}
            {activeView === 'agent' && <Bot className="w-5 h-5 text-amber-400" />}
            {activeView === 'chat' && <MessageCircle className="w-5 h-5 text-amber-400" />}
            {activeView === 'academy' && <GraduationCap className="w-5 h-5 text-amber-400" />}
            {activeView === 'compte' && <User className="w-5 h-5 text-amber-400" />}
            {activeView === 'pricing' && <Crown className="w-5 h-5 text-amber-400" />}
            {/* Legacy support */}
            {activeView === 'agents' && <Bot className="w-5 h-5 text-amber-400" />}
            {activeView === 'outils' && <Calculator className="w-5 h-5 text-amber-400" />}
            {activeView === 'fiche' && <FileText className="w-5 h-5 text-amber-400" />}
            {activeView === 'scraper' && <TrendingUp className="w-5 h-5 text-amber-400" />}
            {activeView === 'quiz' && <Brain className="w-5 h-5 text-amber-400" />}
            {activeView === 'tchat' && <MessageCircle className="w-5 h-5 text-amber-400" />}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {activeView === 'dashboard' && '📊 Dashboard Intelligence'}
              {activeView === 'marketplace' && '🏪 MARKETPLACE SELEZIONE'}
              {activeView === 'estimation' && '💎 ESTIMATION IA TEMPS RÉEL'}
              {activeView === 'calculateur' && '🧮 CALCULATEUR MARGE'}
              {activeView === 'fichiers' && '📁 FICHIERS & COMMANDES'}
              {activeView === 'outils-business' && '🎯 OUTILS BUSINESS'}
              {activeView === 'agent' && '🤖 ASSISTANT IA'}
              {activeView === 'chat' && '💬 COMMUNITY CHAT'}
              {activeView === 'academy' && '🎓 SELEZIONE ACADEMY'}
              {activeView === 'compte' && '👤 MON COMPTE'}
              {activeView === 'pricing' && '💰 PRICING SELEZIONE'}
              {/* Legacy support */}
              {activeView === 'agents' && '🤖 Agents IA Spécialisés'}
              {activeView === 'outils' && '💎 ESTIMATION IA TEMPS RÉEL'}
              {activeView === 'fiche' && '📋 GÉNÉRATEUR FICHE PRODUIT'}
              {activeView === 'tchat' && '💬 CHAT SUPPORT'}
              {activeView === 'vente' && '💰 PRICING & FORMULES'}
            </h1>
            <p className="text-xs text-gray-400">
              {activeView === 'dashboard' && 'Vue d\'ensemble de votre activité'}
              {activeView === 'marketplace' && 'Plateforme professionnelle B2B • Commission 5%'}
              {activeView === 'estimation' && 'GPT-4 Turbo + Scraping marché réel'}
              {activeView === 'calculateur' && 'Calcul automatique des marges bénéficiaires'}
              {activeView === 'fichiers' && 'Gestion des documents et commandes'}
              {activeView === 'outils-business' && 'Suite complète d\'outils professionnels'}
              {activeView === 'agent' && 'Trois intelligences expertes pour le luxe'}
              {activeView === 'chat' && 'Communauté • Support • Experts'}
              {activeView === 'academy' && 'Formation complète - 20+ chapitres'}
              {activeView === 'compte' && 'Profil utilisateur et paramètres'}
              {activeView === 'pricing' && 'Découvrez nos formules et tarifs'}
              {/* Legacy support */}
              {activeView === 'agents' && 'Trois intelligences expertes pour le luxe'}
              {activeView === 'outils' && 'GPT-4 Turbo + Scraping marché réel'}
              {activeView === 'fiche' && 'Création automatique optimisée SEO'}
              {activeView === 'tchat' && 'Support client • Experts • Communauté'}
              {activeView === 'vente' && 'Découvrez nos formules et tarifs'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-6 h-6" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Statistiques rapides */}
          <div className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Tendance</span>
              <span className="text-sm font-bold text-green-400">{globalStats.marketTrend}</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center space-x-2">
              <Gem className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">Économisé</span>
              <span className="text-sm font-bold text-amber-400">{globalStats.savedAmount}€</span>
            </div>
          </div>

          {/* Menu utilisateur */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-amber-400">{user.level}</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-lg">
                  {user.avatar}
                </div>
                <Shield className="w-4 h-4 text-white absolute -bottom-1 -right-1 bg-amber-600 rounded-full p-0.5" />
              </div>
            </button>

            {/* Dropdown menu utilisateur */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-xs text-amber-400">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Mon profil</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Abonnement</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Achievements ({user.achievements})</span>
                  </button>
                  <div className="border-t border-gray-700 mt-2 pt-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-red-400">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Déconnexion</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const BottomNav = () => {
    const bottomItems = [
      { id: 'dashboard', label: 'Home', icon: Home },
      { id: 'marketplace', label: 'Market', icon: ShoppingBag },
      { id: 'estimation', label: 'Estimer', icon: Zap },
      { id: 'agent', label: 'IA', icon: Bot },
      { id: 'academy', label: 'Learn', icon: GraduationCap }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-amber-500/20 lg:ml-72">
        <div className="flex justify-around items-center py-2 px-4">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 text-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activeView === item.id ? 'bg-amber-500/20' : ''
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="lg:ml-72 pb-20 relative z-10 min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
        {Object.entries(views).map(([key, component]) => (
          <div key={key} style={{ display: activeView === key ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </main>

      {/* Bottom Navigation Mobile */}
      <BottomNav />

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default SaasLayout;
