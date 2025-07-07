import React, { useState } from 'react';
import { Search, TrendingUp, BarChart3, RefreshCw, ExternalLink, Filter } from 'lucide-react';

const ScraperVC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Données simulées
  const simulatedResults = [
    {
      id: 1,
      title: "Chanel Classic Flap Medium",
      price: 4800,
      condition: "Excellent",
      seller: "LuxuryReseller",
      platform: "Vestiaire Collective",
      image: "🖤",
      views: 234,
      likes: 45,
      dateAdded: "Il y a 2 jours"
    },
    {
      id: 2,
      title: "Chanel Classic Flap Medium",
      price: 5200,
      condition: "Neuf",
      seller: "ParisLuxury",
      platform: "Vestiaire Collective", 
      image: "🖤",
      views: 156,
      likes: 67,
      dateAdded: "Il y a 5 jours"
    },
    {
      id: 3,
      title: "Chanel Classic Flap Medium",
      price: 4200,
      condition: "Très bon",
      seller: "VintageLover",
      platform: "Vestiaire Collective",
      image: "🖤",
      views: 89,
      likes: 23,
      dateAdded: "Il y a 1 semaine"
    }
  ];

  const performSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setResults([]);
    
    setTimeout(() => {
      setResults(simulatedResults);
      setAnalytics({
        totalResults: 3,
        avgPrice: 4733,
        priceRange: { min: 4200, max: 5200 },
        popularCondition: "Excellent",
        marketTrend: "+12%",
        demand: "Forte"
      });
      setIsSearching(false);
    }, 2500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-cyan-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          🌐 ANALYSEUR DE MARCHÉ
        </h2>
        <p className="text-gray-400">Surveillance en temps réel des plateformes de luxe</p>
      </div>

      {/* Interface de recherche */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-cyan-400 font-bold text-lg mb-4">🔍 Recherche Multi-Plateforme</h3>
        
        <div className="flex space-x-3 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
            placeholder="Ex: Chanel Classic Flap Medium..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm"
          />
          <button
            onClick={performSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center"
          >
            {isSearching ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm">
            <option>Toutes plateformes</option>
            <option>Vestiaire Collective</option>
            <option>The RealReal</option>
            <option>Rebag</option>
          </select>
          <select className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm">
            <option>Tous états</option>
            <option>Neuf</option>
            <option>Excellent</option>
            <option>Très bon</option>
          </select>
          <input 
            type="number" 
            placeholder="Prix min"
            className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm"
          />
          <input 
            type="number" 
            placeholder="Prix max"
            className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm"
          />
        </div>
      </div>

      {/* Analytics en temps réel */}
      {analytics && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-blue-400 font-bold text-lg">📊 Analytics Marché</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Résultats trouvés</p>
              <p className="text-white font-bold text-xl">{analytics.totalResults}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Prix moyen</p>
              <p className="text-white font-bold text-xl">{analytics.avgPrice.toLocaleString()}€</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Tendance marché</p>
              <p className="text-green-400 font-bold text-xl">{analytics.marketTrend}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Demande</p>
              <p className="text-yellow-400 font-bold text-xl">{analytics.demand}</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/30">
            <p className="text-blue-400 font-medium text-sm">
              📈 Analyse IA: Fourchette de prix {analytics.priceRange.min.toLocaleString()}€ - {analytics.priceRange.max.toLocaleString()}€. 
              État le plus recherché: {analytics.popularCondition}. Opportunité d'achat recommandée.
            </p>
          </div>
        </div>
      )}

      {/* Résultats de recherche */}
      {results.length > 0 && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-400 font-bold text-lg">🎯 Résultats Trouvés</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm">
                <option>Trier par prix</option>
                <option>Plus récent</option>
                <option>Plus populaire</option>
              </select>
            </div>
          </div>
          
          <div className="grid gap-4">
            {results.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-xl p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{item.image}</div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-gray-400 text-sm">Vendeur: {item.seller}</p>
                      <p className="text-gray-500 text-xs">{item.platform} • {item.dateAdded}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{item.price.toLocaleString()}€</p>
                    <p className="text-green-400 text-sm">{item.condition}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                      <span>👁️ {item.views}</span>
                      <span>❤️ {item.likes}</span>
                    </div>
                  </div>
                  
                  <button className="ml-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <ExternalLink className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90">
              Voir plus de résultats
            </button>
          </div>
        </div>
      )}

      {/* État initial */}
      {results.length === 0 && !isSearching && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-700 p-12 text-center">
          <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">Analyseur de marché prêt</h3>
          <p className="text-gray-400 text-sm">
            Recherchez un produit pour obtenir une analyse complète du marché en temps réel
          </p>
        </div>
      )}

      {/* État de chargement */}
      {isSearching && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-12 text-center">
          <RefreshCw className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-cyan-400 font-bold text-lg mb-2">Analyse en cours...</h3>
          <p className="text-gray-400 text-sm">
            Scan des plateformes : Vestiaire Collective, The RealReal, Rebag...
          </p>
        </div>
      )}
    </div>
  );
};

export default ScraperVC;
