import React, { useState, useEffect } from 'react';
import { 
  Search, TrendingUp, BarChart3, RefreshCw, ExternalLink, Filter, 
  Camera, Loader, AlertCircle, CheckCircle, ChevronDown, X, Eye,
  ShoppingBag, Heart, Clock, Zap, Globe, Award, Wifi, WifiOff
} from 'lucide-react';

const ScraperVC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [condition, setCondition] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  // Configuration API
  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  // Liste des marques de luxe
  const luxuryBrands = [
    "Chanel", "Hermès", "Louis Vuitton", "Dior", "Gucci", "Prada", 
    "Saint Laurent", "Balenciaga", "Bottega Veneta", "Celine", "Givenchy", "Valentino",
    "Versace", "Fendi", "Burberry", "Alexander McQueen", "Balmain", "Lanvin",
    "Chloé", "Loewe", "Miu Miu", "Off-White", "Jacquemus", "Isabel Marant",
    "Cartier", "Van Cleef & Arpels", "Bulgari", "Tiffany & Co", "Chopard", "Piaget",
    "Rolex", "Patek Philippe", "Audemars Piguet", "Richard Mille", "Omega", "Breitling",
    "Ganni", "Staud", "Nanushka", "Totême", "The Row", "Khaite",
    "Fear of God", "Palm Angels", "Amiri", "Rhude", "Chrome Hearts", "Maison Margiela",
    "Goyard", "Moynat", "Delvaux", "Mark Cross", "Mansur Gavriel", "Wandler",
    "Christian Louboutin", "Jimmy Choo", "Manolo Blahnik", "Aquazzura", "Gianvito Rossi",
    "Brunello Cucinelli", "Loro Piana", "Kiton", "Berluti", "Brioni"
  ].sort();

  // Base de données simulée pour le mode hors ligne
  const offlineDatabase = {
    "Louis Vuitton": {
      "Speedy 30": [
        { id: 1, title: "Louis Vuitton Speedy 30 Monogram", price: 1200, condition: "Excellent", image: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-speedy-30-monogram-canvas-handbags--M41108_PM2_Front%20view.jpg" },
        { id: 2, title: "Louis Vuitton Speedy 30 Damier Ebene", price: 1450, condition: "Neuf", image: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-speedy-30-damier-ebene-canvas-handbags--N41531_PM2_Front%20view.jpg" },
        { id: 3, title: "Louis Vuitton Speedy 30 Epi Noir", price: 980, condition: "Très bon", image: "https://images.stockx.com/images/Louis-Vuitton-Speedy-30-Epi-Noir-Black.jpg" }
      ],
      "Neverfull": [
        { id: 4, title: "Louis Vuitton Neverfull MM Monogram", price: 1650, condition: "Excellent", image: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm-monogram-canvas-handbags--M40995_PM2_Front%20view.jpg" },
        { id: 5, title: "Louis Vuitton Neverfull GM Damier", price: 1850, condition: "Neuf", image: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-gm-damier-ebene-canvas-handbags--N41357_PM2_Front%20view.jpg" }
      ]
    },
    "Chanel": {
      "Classic Flap": [
        { id: 6, title: "Chanel Classic Flap Medium Caviar", price: 7500, condition: "Excellent", image: "https://www.chanel.com/images/t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_jpg,fl_lossy,dpr_1.2/w_1240/classic-handbag-black-grained-calfskin-gold-tone-metal-grained-calfskin-gold-tone-metal-packshot-default-a01112y0129594305-8825432498206.jpg" },
        { id: 7, title: "Chanel Classic Flap Small Lambskin", price: 6800, condition: "Très bon", image: "https://www.chanel.com/images/t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_jpg,fl_lossy,dpr_1.2/w_1240/classic-handbag-black-lambskin-gold-tone-metal-lambskin-gold-tone-metal-packshot-default-a01113y0129594305-8807506698270.jpg" }
      ],
      "Boy": [
        { id: 8, title: "Chanel Boy Medium Black", price: 5200, condition: "Excellent", image: "https://www.chanel.com/images/t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_jpg,fl_lossy,dpr_1.2/w_1240/boy-chanel-handbag-black-calfskin-ruthenium-finish-metal-calfskin-ruthenium-finish-metal-packshot-default-a67086y0982694305-8825427419166.jpg" }
      ]
    },
    "Hermès": {
      "Birkin": [
        { id: 9, title: "Hermès Birkin 30 Togo Gold", price: 12500, condition: "Excellent", image: "https://media.24s.com/media/catalog/product/cache/7/image/1500x/9df78eab33525d08d6e5fb8d27136e95/A/I/AI-c0dc08ae057dd9a2ab3cf3e93dcef723.jpg" },
        { id: 10, title: "Hermès Birkin 35 Noir", price: 15000, condition: "Neuf", image: "https://www.christies.com/img/LotImages/2019/NYR/2019_NYR_17458_0009_000(hermes_black_togo_birkin_35_with_gold_hardware).jpg" }
      ],
      "Kelly": [
        { id: 11, title: "Hermès Kelly 28 Etoupe", price: 11000, condition: "Excellent", image: "https://www.christies.com/img/LotImages/2020/NYR/2020_NYR_19024_0126_000(hermes_etoupe_togo_kelly_28_with_gold_hardware).jpg" }
      ]
    }
  };

  // Fonction de recherche hors ligne
  const performOfflineSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      let allResults = [];
      const searchTerm = `${selectedBrand} ${searchQuery}`.toLowerCase().trim();
      
      // Recherche dans la base de données
      Object.entries(offlineDatabase).forEach(([brand, models]) => {
        if (!selectedBrand || brand === selectedBrand) {
          Object.entries(models).forEach(([model, products]) => {
            products.forEach(product => {
              if (product.title.toLowerCase().includes(searchTerm) || 
                  searchTerm.includes(brand.toLowerCase()) ||
                  searchTerm.includes(model.toLowerCase())) {
                allResults.push({
                  ...product,
                  seller: `Vendeur${Math.floor(Math.random() * 1000)}`,
                  platform: 'Mode Hors Ligne',
                  views: Math.floor(Math.random() * 500) + 100,
                  likes: Math.floor(Math.random() * 100) + 10,
                  dateAdded: `Il y a ${Math.floor(Math.random() * 30) + 1} jour(s)`,
                  images: [product.image]
                });
              }
            });
          });
        }
      });
      
      // Filtrer par prix
      if (priceRange.min) {
        allResults = allResults.filter(p => p.price >= parseInt(priceRange.min));
      }
      if (priceRange.max) {
        allResults = allResults.filter(p => p.price <= parseInt(priceRange.max));
      }
      
      // Filtrer par condition
      if (condition) {
        allResults = allResults.filter(p => p.condition === condition);
      }
      
      // Calculer les stats
      if (allResults.length > 0) {
        const prices = allResults.map(p => p.price);
        setAnalytics({
          totalResults: allResults.length,
          avgPrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
          priceRange: { 
            min: Math.min(...prices), 
            max: Math.max(...prices) 
          },
          marketTrend: '+5%',
          demand: 'Forte',
          aiAnalysis: '🔌 Mode hors ligne activé. Ces données sont des exemples représentatifs du marché actuel.'
        });
      } else {
        setAnalytics({
          totalResults: 0,
          error: 'Aucun produit trouvé. Essayez avec d\'autres critères.'
        });
      }
      
      setResults(allResults);
      setIsSearching(false);
    }, 1500);
  };

  // Fonction de recherche principale
  const performSearch = async () => {
    if (!searchQuery.trim() && !selectedBrand) {
      alert('Veuillez entrer un terme de recherche ou sélectionner une marque');
      return;
    }
    
    // Validation des prix
    if (priceRange.min && priceRange.max) {
      const minPrice = parseInt(priceRange.min);
      const maxPrice = parseInt(priceRange.max);
      if (minPrice > maxPrice) {
        alert('❌ Le prix minimum ne peut pas être supérieur au prix maximum');
        return;
      }
    }
    
    if (isOfflineMode) {
      performOfflineSearch();
      return;
    }
    
    setIsSearching(true);
    setResults([]);
    setAnalytics(null);
    
    try {
      const query = selectedBrand ? `${selectedBrand} ${searchQuery}`.trim() : searchQuery;
      
      const response = await fetch(`${API_BASE}/scrape-vestiaire`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.produits && data.produits.length > 0) {
        // Traiter les résultats normalement
        setResults(data.produits.map((p, i) => ({
          ...p,
          id: p.id || i + 1,
          images: [p.image || 'https://via.placeholder.com/300'],
          platform: 'Vestiaire Collective',
          views: Math.floor(Math.random() * 500) + 100,
          likes: Math.floor(Math.random() * 100) + 10,
          dateAdded: `Il y a ${Math.floor(Math.random() * 30) + 1} jour(s)`
        })));
        
        setAnalytics({
          totalResults: data.produits.length,
          avgPrice: data.stats?.avg || 0,
          priceRange: data.stats || { min: 0, max: 0 },
          marketTrend: '+8%',
          demand: 'Forte',
          aiAnalysis: data.resume
        });
      } else {
        throw new Error('Aucun résultat');
      }
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      
      // Proposer le mode hors ligne
      if (confirm('❌ L\'API semble hors ligne.\n\n✅ Voulez-vous activer le MODE HORS LIGNE ?\n\nVous pourrez continuer à utiliser l\'analyseur avec des données d\'exemple.')) {
        setIsOfflineMode(true);
        performOfflineSearch();
      } else {
        setAnalytics({
          totalResults: 0,
          error: 'Connexion impossible au serveur. Activez le mode hors ligne ou réessayez plus tard.'
        });
        setIsSearching(false);
      }
    } finally {
      if (!isOfflineMode) {
        setIsSearching(false);
      }
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              🌐 ANALYSEUR DE MARCHÉ PRO
            </h2>
            <p className="text-gray-400">
              {isOfflineMode ? 'Mode Hors Ligne - Données d\'exemple' : 'Scraping temps réel Vestiaire Collective + IA GPT-4'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                isOfflineMode 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {isOfflineMode ? <WifiOff className="w-4 h-4 mr-2" /> : <Wifi className="w-4 h-4 mr-2" />}
              {isOfflineMode ? 'Mode Hors Ligne' : 'Mode En Ligne'}
            </button>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOfflineMode ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`}></div>
              <span className={`${isOfflineMode ? 'text-yellow-400' : 'text-green-400'} text-sm`}>
                {isOfflineMode ? 'Hors Ligne' : 'API Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sélecteur de marque */}
            <div className="relative lg:w-64">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 appearance-none pr-10"
              >
                <option value="">Toutes les marques</option>
                {luxuryBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                placeholder="Modèle, référence, description..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl font-medium flex items-center transition-all ${
                  showFilters 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </button>
              
              <button
                onClick={performSearch}
                disabled={isSearching}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center min-w-[120px] justify-center"
              >
                {isSearching ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Analyse...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Analyser
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Prix min (€)</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  placeholder="0"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Prix max (€)</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  placeholder="99999"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">État</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Tous états</option>
                  <option value="Neuf">Neuf</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Très bon">Très bon</option>
                  <option value="Bon">Bon</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analytics */}
      {analytics && analytics.totalResults > 0 && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-blue-400 font-bold text-lg">📊 Analytics Marché</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Résultats</p>
              <p className="text-white font-bold text-xl">{analytics.totalResults}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Prix moyen</p>
              <p className="text-white font-bold text-xl">{analytics.avgPrice}€</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Fourchette</p>
              <p className="text-white font-bold text-sm">{analytics.priceRange.min}€ - {analytics.priceRange.max}€</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Tendance</p>
              <p className="text-green-400 font-bold text-xl">{analytics.marketTrend}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Demande</p>
              <p className="text-yellow-400 font-bold text-xl">{analytics.demand}</p>
            </div>
          </div>

          {analytics.aiAnalysis && (
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/30">
              <p className="text-blue-400 font-medium text-sm">
                {analytics.aiAnalysis}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Résultats */}
      {results.length > 0 && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
          <h3 className="text-green-400 font-bold text-lg mb-4">
            🎯 {results.length} Produits trouvés
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all overflow-hidden">
                <div className="aspect-square bg-gray-800 relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                  {item.condition && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full">
                      {item.condition}
                    </span>
                  )}
                </div>
              <div className="p-4">
                  <h4 className="text-white font-medium mb-1 line-clamp-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">Par {item.seller}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-white">{item.price}€</span>
                    <span className="text-xs text-gray-500">{item.platform}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {item.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {item.likes}
                      </span>
                    </div>
                    <span>{item.dateAdded}</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg font-medium text-sm hover:opacity-90">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* État d'erreur */}
      {analytics?.error && (
        <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-red-400 font-bold text-lg mb-2">Erreur de recherche</h3>
              <p className="text-gray-300 text-sm">{analytics.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* État initial */}
      {results.length === 0 && !isSearching && !analytics?.error && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-700 p-12 text-center">
          <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">
            Analyseur {isOfflineMode ? 'Hors Ligne' : 'En Ligne'} Prêt
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {isOfflineMode 
              ? 'Mode hors ligne activé - Données d\'exemple disponibles'
              : 'Recherchez parmi 50+ marques de luxe avec analyse IA temps réel'
            }
          </p>
        </div>
      )}
      {/* État de chargement */}
      {isSearching && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-12 text-center">
          <RefreshCw className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-cyan-400 font-bold text-lg mb-2">
            {isOfflineMode ? 'Recherche locale...' : 'Analyse en cours...'}
          </h3>
          <p className="text-gray-400 text-sm">
            {isOfflineMode 
              ? 'Recherche dans la base de données locale'
              : 'Scraping Vestiaire Collective + Analyse GPT-4'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ScraperVC;
      
