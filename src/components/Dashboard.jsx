import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BarChart3, Eye, Clock, Crown, DollarSign, 
  Package, ShoppingBag, Target, Activity, Star
} from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({ 
    name: 'Alexandre Dupont', 
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE'
  });

  const [luxuryData, setLuxuryData] = useState({
    hermesIndex: 142.8,
    chanelIndex: 127.5,
    lvIndex: 134.2,
    marketVolume: 2847000,
    trendingBrand: 'Hermès',
    lastUpdate: new Date()
  });

  const [loadingData, setLoadingData] = useState(false);

  // Simulation de données temps réel
  useEffect(() => {
    const loadRealData = () => {
      setLuxuryData(prev => ({
        ...prev,
        hermesIndex: 140 + Math.random() * 10,
        chanelIndex: 125 + Math.random() * 8,
        lvIndex: 130 + Math.random() * 12,
        marketVolume: 2800000 + Math.random() * 100000,
        lastUpdate: new Date()
      }));
    };

    loadRealData();
    const interval = setInterval(loadRealData, 30000); // 30 secondes
    return () => clearInterval(interval);
  }, []);

  const LUXURY_BRANDS = [
    { name: 'Hermès', category: 'Maroquinerie', growth: '+18.2%' },
    { name: 'Chanel', category: 'Mode & Parfums', growth: '+12.4%' },
    { name: 'Louis Vuitton', category: 'Maroquinerie', growth: '+15.7%' },
    { name: 'Rolex', category: 'Horlogerie', growth: '+11.3%' },
    { name: 'Cartier', category: 'Bijouterie', growth: '+9.8%' }
  ];

  if (loadingData) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20 animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              Tableau de Bord SELEZIONE
            </h1>
            <p className="text-gray-400 text-sm mb-4">
              Intelligence Marché Luxe • Données Temps Réel • 22 Fournisseurs Premium
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-black/30 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400">Membre</p>
              <p className="text-white font-bold text-sm">{user.name}</p>
              <p className="text-amber-400 text-xs">{user.subscription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métriques Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 font-medium text-sm">Indice Hermès</span>
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-amber-400">{luxuryData.hermesIndex.toFixed(1)}</span>
            <span className="text-green-400 text-xs font-bold">+18.2%</span>
          </div>
          <div className="mt-3 h-1 bg-gray-700 rounded-full">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 font-medium text-sm">Indice Chanel</span>
            <Star className="w-5 h-5 text-pink-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-pink-400">{luxuryData.chanelIndex.toFixed(1)}</span>
            <span className="text-green-400 text-xs font-bold">+12.4%</span>
          </div>
          <div className="mt-3 h-1 bg-gray-700 rounded-full">
            <div className="h-full bg-pink-400 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 font-medium text-sm">Volume Marché</span>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-green-400">
              {(luxuryData.marketVolume / 1000000).toFixed(1)}M€
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">Volume 24h</p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 font-medium text-sm">Marque Tendance</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-purple-400">{luxuryData.trendingBrand}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">leader ce mois-ci</p>
        </div>
      </div>

      {/* Top Marques Performance */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-amber-400" />
          Top Marques Luxe - Analytics Temps Réel
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {LUXURY_BRANDS.map((brand, index) => (
            <div key={brand.name} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{brand.name}</span>
                <span className="text-xs font-bold text-green-400">{brand.growth}</span>
              </div>
              <p className="text-gray-400 text-xs mb-1">Volume: {(Math.random() * 500 + 100).toFixed(0)}k€</p>
              <p className="text-gray-500 text-xs mb-2">{brand.category}</p>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${60 + index * 8}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-400">{LUXURY_BRANDS.length}</p>
              <p className="text-xs text-gray-400">Marques trackées</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">142.7</p>
              <p className="text-xs text-gray-400">Indice global</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">3.2M€</p>
              <p className="text-xs text-gray-400">Volume 24h</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700/50 text-center">
          <p className="text-xs text-gray-500">
            Données actualisées • Basé sur 22 fournisseurs premium • Algorithme propriétaire SELEZIONE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;