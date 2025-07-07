import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Brain, Calculator, TrendingUp, FileText, 
  Newspaper, ShoppingBag, BookOpen, Settings, User, Search,
  BarChart3, Zap, Target, Award, Crown, Sparkles, Send,
  ArrowRight, Play, Star, ChevronDown, Bell, Diamond,
  Eye, DollarSign, Users, Clock, Filter, MoreVertical,
  ChevronRight, Upload, Download, CheckCircle, AlertCircle, 
  Info, Percent, Euro, MessageCircle, ShoppingCart, Package,
  GraduationCap, Mic, MicOff, Volume2, VolumeX, Loader,
  Plus, Minus, Edit, Trash2, Save, Rss, Calendar, Globe,
  Mail, Phone, MapPin, ExternalLink, Camera, Tag, Palette,
  Heart, Share2, Bookmark, TrendingDown, Activity, Monitor,
  Smartphone, Instagram, Twitter, Youtube, Wifi, WifiOff,
  Radar, Cpu, Database, LineChart, AreaChart, Bot, Layers,
  Scan, Shield, Lock, Unlock, Key, RefreshCw, Power, Gauge,
  MousePointer, Crosshair, Headphones, Video, Wand2, Atom,
  Orbit, Hexagon, Triangle, Square, Circle, Octagon, Image,
  Briefcase, PieChart, Building, Wallet, CreditCard, Archive
} from 'lucide-react';

// Import des composants individuels
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
  const [loading, setLoading] = useState(false);
  
  const [user] = useState({ 
    name: 'Alexandre Dupont', 
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE'
  });


  // ==================== SIDEBAR ====================
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

  // ==================== TOP NAVIGATION ====================
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
          
          

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-purple-400">IA Active</span>
            </div>
          </div>
          
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

  // ==================== BOTTOM NAVIGATION ====================
  const BottomNav = () => {
    const bottomItems = [
      { id: 'marketplace', label: 'Acheter', icon: ShoppingCart, badge: 'B2B' },
      { id: 'outils', label: 'Outils IA', icon: Zap, badge: '12' },
      { id: 'agents', label: 'Agents', icon: Bot, badge: 'IA' },
      { id: 'academy', label: 'Academy', icon: GraduationCap, badge: '6' },
      { id: 'quiz', label: 'Quiz', icon: Brain, badge: 'Expert' }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-amber-500/20 lg:ml-64">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(item.id)}
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all relative"
            >
              <div className="relative">
                <item.icon className="w-6 h-6 text-gray-400" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs px-1 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ==================== RENDU PRINCIPAL ====================
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
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar />
      <TopNav />
      
      <main className="lg:ml-64 pb-20 relative z-10 min-h-screen">
        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex items-center space-x-3 text-amber-400">
              <Loader className="w-8 h-8 animate-spin" />
              <span className="font-medium">Chargement...</span>
            </div>
          </div>
        )}
        {renderMainContent()}
      </main>

      <BottomNav />
    </div>
  );
};

export default SaasLayout;
