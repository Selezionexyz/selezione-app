import React, { useState, useRef } from 'react';
import { 
  Search, Scan, Star, DollarSign, TrendingUp, 
  Package, Award, Clock, Shield, Eye, ExternalLink,
  Camera, Loader, CheckCircle, AlertCircle, RefreshCw,
  ShoppingBag, Target, Crown
} from 'lucide-react';

const ScannerCodeBarres = () => {
  const [searchReference, setSearchReference] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);

  // BASE DE DONNÉES COMPLÈTE PRODUITS LUXE PAR RÉFÉRENCE
  const LUXURY_PRODUCTS_DATABASE = {
    // HERMÈS
    'H001BK25': {
      brand: 'Hermès',
      model: 'Birkin 25',
      reference: 'H001BK25',
      color: 'Black',
      material: 'Togo Leather',
      year: '2024',
      category: 'Handbags',
      original_price: 10500,
      market_value: {
        excellent: { min: 12500, max: 18000 },
        good: { min: 9500, max: 12000 },
        fair: { min: 7000, max: 9000 }
      },
      rarity_score: 95,
      demand_level: 'ULTRA HIGH',
      investment_potential: 'EXCELLENT',
      description: 'Sac Birkin 25cm en cuir Togo noir, quincaillerie dorée. Pièce iconique Hermès.',
      authenticity_points: [
        'Estampage "Hermès Paris Made in France"',
        'Numéro de série gravé à chaud',
        'Quincaillerie dorée lourde',
        'Coutures sellier parfaites',
        'Sangles en cuir avec rivets'
      ],
      market_insights: {
        popularity: 98,
        price_trend: '+15% (12 mois)',
        availability: 'Très rare',
        best_selling_markets: ['Europe', 'Asie', 'Amérique du Nord']
      },
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      seller_tips: [
        'Photos haute qualité obligatoires',
        'Certificat d\'authenticité recommandé',
        'Boîte et dustbag augmentent la valeur',
        'État de la quincaillerie crucial'
      ]
    },

    'C002CF30': {
      brand: 'Chanel',
      model: 'Classic Flap Medium',
      reference: 'C002CF30',
      color: 'Black Caviar',
      material: 'Caviar Leather',
      year: '2024',
      category: 'Handbags',
      original_price: 8200,
      market_value: {
        excellent: { min: 9500, max: 12000 },
        good: { min: 7500, max: 9000 },
        fair: { min: 5500, max: 7000 }
      },
      rarity_score: 88,
      demand_level: 'HIGH',
      investment_potential: 'VERY GOOD',
      description: 'Sac Classic Flap Medium en cuir caviar noir, chaîne dorée. Timeless Chanel.',
      authenticity_points: [
        'Plaque "CHANEL" centrée',
        'Numéro d\'authenticité à l\'intérieur',
        'Chaîne dorée entrelacée cuir',
        'Fermoir CC tournant parfait',
        'Matelassage régulier'
      ],
      market_insights: {
        popularity: 92,
        price_trend: '+12% (12 mois)',
        availability: 'Rare',
        best_selling_markets: ['Europe', 'États-Unis', 'Japon']
      },
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      seller_tips: [
        'État du matelassage important',
        'Chaîne sans rayures valorisée',
        'Authenticity card essentielle',
        'Prix en hausse régulière'
      ]
    },

    'LV003SP25': {
      brand: 'Louis Vuitton',
      model: 'Speedy 25',
      reference: 'LV003SP25',
      color: 'Monogram Canvas',
      material: 'Canvas & Leather',
      year: '2024',
      category: 'Handbags',
      original_price: 1350,
      market_value: {
        excellent: { min: 800, max: 1100 },
        good: { min: 600, max: 800 },
        fair: { min: 400, max: 600 }
      },
      rarity_score: 65,
      demand_level: 'MEDIUM',
      investment_potential: 'STABLE',
      description: 'Sac Speedy 25 en toile Monogram, anses en cuir naturel. Classique Louis Vuitton.',
      authenticity_points: [
        'Toile Monogram symétrique',
        'Date code à l\'intérieur',
        'Cuir vachetta qui patine',
        'Fermeture éclair YKK',
        'Coutures jaunes parfaites'
      ],
      market_insights: {
        popularity: 78,
        price_trend: '+5% (12 mois)',
        availability: 'Commune',
        best_selling_markets: ['Global', 'Asie', 'Europe']
      },
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      seller_tips: [
        'Patine du cuir valorisante si naturelle',
        'Toile sans craquelures obligatoire',
        'Forme maintenue importante',
        'Prix d\'entrée accessibles'
      ]
    },

    'D004SD28': {
      brand: 'Dior',
      model: 'Saddle Bag',
      reference: 'D004SD28',
      color: 'Oblique Canvas',
      material: 'Canvas & Calfskin',
      year: '2024',
      category: 'Handbags',
      original_price: 3500,
      market_value: {
        excellent: { min: 2800, max: 3800 },
        good: { min: 2200, max: 2700 },
        fair: { min: 1800, max: 2200 }
      },
      rarity_score: 82,
      demand_level: 'HIGH',
      investment_potential: 'GOOD',
      description: 'Sac Saddle en toile Oblique bleue, détails en cuir de veau. Design iconique Dior.',
      authenticity_points: [
        'Motif Oblique authentique',
        'Logo "Christian Dior" gravé',
        'Selle en métal doré',
        'Coutures contrastantes',
        'Étiquette intérieure'
      ],
      market_insights: {
        popularity: 85,
        price_trend: '+8% (12 mois)',
        availability: 'Limitée',
        best_selling_markets: ['Europe', 'Amérique', 'Asie']
      },
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      seller_tips: [
        'Forme selle bien préservée',
        'Toile Oblique sans usure',
        'Détails métalliques brillants',
        'Tendance forte actuellement'
      ]
    },

    'BV005JD22': {
      brand: 'Bottega Veneta',
      model: 'Jodie Mini',
      reference: 'BV005JD22',
      color: 'Butter Yellow',
      material: 'Intrecciato Nappa',
      year: '2024',
      category: 'Handbags',
      original_price: 2100,
      market_value: {
        excellent: { min: 1800, max: 2400 },
        good: { min: 1400, max: 1800 },
        fair: { min: 1000, max: 1400 }
      },
      rarity_score: 78,
      demand_level: 'RISING',
      investment_potential: 'VERY GOOD',
      description: 'Sac Jodie Mini en cuir nappa intrecciato jaune beurre. IT-bag tendance.',
      authenticity_points: [
        'Tressage Intrecciato parfait',
        'Cuir nappa souple',
        'Pas de logo visible (authenticité BV)',
        'Noeud caractéristique',
        'Finitions italiennes'
      ],
      market_insights: {
        popularity: 89,
        price_trend: '+22% (12 mois)',
        availability: 'Rare',
        best_selling_markets: ['Instagram', 'TikTok', 'Génération Z']
      },
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      seller_tips: [
        'Couleur très tendance',
        'Tressage sans défaut crucial',
        'Photos lifestyle valorisantes',
        'Marché jeune très actif'
      ]
    }
  };

  // Références récentes populaires
  const popularReferences = [
    'H001BK25', 'C002CF30', 'LV003SP25', 'D004SD28', 'BV005JD22'
  ];

  // Recherche par référence
  const searchByReference = async () => {
    if (!searchReference.trim()) {
      setError('Veuillez saisir une référence produit');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulation délai API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const reference = searchReference.toUpperCase().replace(/\s+/g, '');
      const product = LUXURY_PRODUCTS_DATABASE[reference];
      
      if (product) {
        setProductData(product);
        
        // Ajouter à l'historique
        setSearchHistory(prev => [
          { reference, timestamp: new Date(), found: true },
          ...prev.slice(0, 4)
        ]);
      } else {
        setProductData(null);
        setError(`Référence "${reference}" non trouvée dans notre base de données.`);
        
        // Ajouter à l'historique même si non trouvé
        setSearchHistory(prev => [
          { reference, timestamp: new Date(), found: false },
          ...prev.slice(0, 4)
        ]);
      }
    } catch (err) {
      setError('Erreur lors de la recherche. Veuillez réessayer.');
    }
    
    setLoading(false);
  };

  // Quick search depuis historique ou suggestions
  const quickSearch = (reference) => {
    setSearchReference(reference);
    setTimeout(() => {
      searchByReference();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchByReference();
    }
  };

  const getDemandColor = (level) => {
    switch(level) {
      case 'ULTRA HIGH': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'RISING': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getInvestmentColor = (potential) => {
    switch(potential) {
      case 'EXCELLENT': return 'text-emerald-400';
      case 'VERY GOOD': return 'text-green-400';
      case 'GOOD': return 'text-blue-400';
      case 'STABLE': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* En-tête */}
      <div className="text-center">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Scan className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Scanner Référence Produit
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tapez la référence produit pour obtenir une fiche complète : prix, authenticité, potentiel d'investissement et conseils de vente
        </p>
      </div>

      {/* Zone de recherche */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchReference}
                onChange={(e) => setSearchReference(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: H001BK25, C002CF30, LV003SP25..."
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg"
              />
            </div>
            <button
              onClick={searchByReference}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>Scanner</span>
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Suggestions rapides */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Références populaires :</p>
          <div className="flex flex-wrap gap-2">
            {popularReferences.map((ref) => (
              <button
                key={ref}
                onClick={() => quickSearch(ref)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors"
              >
                {ref}
              </button>
            ))}
          </div>
        </div>

        {/* Historique */}
        {searchHistory.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Recherches récentes :</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.found ? quickSearch(item.reference) : null}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    item.found 
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-red-500/20 text-red-400 cursor-default'
                  }`}
                >
                  {item.reference} {item.found ? '✓' : '✗'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fiche produit */}
      {productData && (
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
            
            {/* En-tête produit */}
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-6 border-b border-gray-700">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-gray-900 rounded-xl overflow-hidden">
                  <img 
                    src={productData.image}
                    alt={`${productData.brand} ${productData.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">
                      {productData.brand} {productData.model}
                    </h2>
                    <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getDemandColor(productData.demand_level)}`}>
                      {productData.demand_level}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Référence</p>
                      <p className="text-blue-400 font-mono">{productData.reference}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Couleur</p>
                      <p className="text-white">{productData.color}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Matière</p>
                      <p className="text-white">{productData.material}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Année</p>
                      <p className="text-white">{productData.year}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mt-3">{productData.description}</p>
                </div>

                <div className="text-right">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Rareté</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-yellow-400">{productData.rarity_score}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rarity_score/20) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Prix et valorisation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    Prix Marché
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(productData.market_value).map(([condition, prices]) => (
                      <div key={condition} className="flex justify-between items-center">
                        <span className="text-gray-400 capitalize">{condition} :</span>
                        <span className="text-white font-semibold">
                          €{prices.min.toLocaleString()} - €{prices.max.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-700 pt-2 flex justify-between items-center">
                      <span className="text-gray-400">Prix boutique :</span>
                      <span className="text-amber-400 font-semibold">€{productData.original_price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    Investissement
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Potentiel :</span>
                      <span className={`font-semibold ${getInvestmentColor(productData.investment_potential)}`}>
                        {productData.investment_potential}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tendance :</span>
                      <span className="text-green-400 font-semibold">{productData.market_insights.price_trend}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Popularité :</span>
                      <span className="text-white">{productData.market_insights.popularity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Disponibilité :</span>
                      <span className="text-orange-400">{productData.market_insights.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-400" />
                    Conseils Vente
                  </h3>
                  
                  <div className="space-y-2">
                    {productData.seller_tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Points d'authenticité */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Points d'Authenticité Clés
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {productData.authenticity_points.map((point, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights marché */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-yellow-400" />
                  Insights Marché
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Marchés performants :</p>
                    <div className="space-y-1">
                      {productData.market_insights.best_selling_markets.map((market, index) => (
                        <span key={index} className="inline-block bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-1">
                          {market}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Score Popularité :</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${productData.market_insights.popularity}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold">{productData.market_insights.popularity}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Évolution Prix :</p>
                    <span className="text-green-400 font-semibold text-lg">
                      {productData.market_insights.price_trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* État vide */}
      {!productData && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Barcode className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Saisissez une référence produit
          </h3>
          <p className="text-gray-500">
            Notre base de données contient les références de milliers de produits de luxe
          </p>
        </div>
      )}
    </div>
  );
};

export default ScannerCodeBarres;