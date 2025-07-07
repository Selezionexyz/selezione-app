import React, { useState } from 'react';
import { 
  Newspaper, Zap, Bot, GraduationCap, ShoppingCart 
} from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({ 
    name: 'Alexandre Dupont', 
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE'
  });

  const [newsData] = useState([
    {
      id: 1,
      title: "Chanel augmente ses prix de 8% en Europe",
      summary: "Hausse générale confirmée sur toute la maroquinerie",
      time: "Il y a 2h",
      source: "Vogue Business",
      category: "Prix",
      color: "red"
    },
    {
      id: 2,
      title: "Jacquemus Le Chiquito explose sur TikTok",
      summary: "Le micro-sac devient viral avec +340% de mentions",
      time: "Il y a 4h",
      source: "WWD",
      category: "Tendance",
      color: "green"
    },
    {
      id: 3,
      title: "LVMH investit dans l'IA client",
      summary: "Assistant virtuel déployé dans les boutiques",
      time: "Il y a 6h",
      source: "Forbes",
      category: "Tech",
      color: "blue"
    }
  ]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Bienvenue */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              Bienvenue sur SELEZIONE
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Plateforme IA ultime pour le prêt-à-porter de luxe</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Crédits IA</p>
              <p className="text-white font-medium text-lg">{user.credits.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* News IA en temps réel */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Newspaper className="w-6 h-6 mr-2 text-amber-400" />
          Actualités Luxe IA - Temps Réel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsData.map((news) => (
            <div key={news.id} className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full bg-${news.color}-500/20 text-${news.color}-400`}>
                  {news.category}
                </span>
                <span className="text-xs text-gray-400">{news.time}</span>
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{news.title}</h3>
              <p className="text-gray-400 text-xs mb-3">{news.summary}</p>
              <p className="text-amber-400 text-xs font-medium">{news.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'outils', label: 'Outils IA', icon: Zap, count: '12 outils' },
          { id: 'agents', label: 'Agents IA', icon: Bot, count: '3 experts' },
          { id: 'academy', label: 'Academy', icon: GraduationCap, count: '6 modules' },
          { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, count: 'B2B Pro' }
        ].map((action) => (
          <button
            key={action.id}
            className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all group"
          >
            <action.icon className="w-8 h-8 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-sm mb-1">{action.label}</h3>
            <p className="text-gray-400 text-xs">{action.count}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
