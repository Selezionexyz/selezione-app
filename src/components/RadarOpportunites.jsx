import React, { useState, useEffect } from 'react';
import { 
  Radar, Search, Bell, Zap, Target, Eye, ExternalLink,
  AlertCircle, CheckCircle, Clock, Star, Filter, RefreshCw,
  TrendingUp, DollarSign, Award, Crown, Sparkles, Globe,
  ArrowDown, ArrowUp, Calendar, Package, Shield
} from 'lucide-react';

const RadarOpportunites = () => {
  const [activeFilters, setActiveFilters] = useState({
    maxPrice: 50000,
    minDiscount: 15,
    brands: [],
    conditions: ['Excellent', 'Très bon'],
    categories: ['Maroquinerie'],
    minRating: 4.0
  });
  
  const [opportunities, setOpportunities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(new Date());
  const [savedSearches, setSavedSearches] = useState([]);
  const [scanStats, setScanStats] = useState({
    sitesScanned: 0,
    opportunitiesFound: 0,
    avgDiscount: 0,
    biggestSaving: 0
  });

  // BASE DE DONNÉES SITES SCANNÉS (100+ sites)
  const MONITORED_SITES = [
    // Sites Premium
    { name: 'Vestiaire Collective', url: 'vestiairecollective.com', priority: 'HIGH', region: 'Global' },
    { name: 'The RealReal', url: 'therealreal.com', priority: 'HIGH', region: 'US' },
    { name: 'Fashionphile', url: 'fashionphile.com', priority: 'HIGH', region: 'US' },
    { name: 'Rebag', url: 'rebag.com', priority: 'HIGH', region: 'US' },
    { name: 'What Goes Around NYC', url: 'whatgoesaroundnyc.com', priority: 'MEDIUM', region: 'US' },
    
    // Sites Europe
    { name: 'Collector Square', url: 'collectorsquare.com', priority: 'HIGH', region: 'EU' },
    { name: 'Vestiaire Europe', url: 'vestiaire.eu', priority: 'MEDIUM', region: 'EU' },
    { name: 'Luxury Garage Sale', url: 'luxurybag.com', priority: 'MEDIUM', region: 'EU' },
    { name: 'Fashion Market', url: 'fashionmarket.fr', priority: 'MEDIUM', region: 'EU' },
    
    // Sites Asie
    { name: 'Farfetch Asia', url: 'farfetch.com/hk', priority: 'HIGH', region: 'ASIA' },
    { name: 'Luxury Station', url: 'luxurystation.jp', priority: 'MEDIUM', region: 'ASIA' },
    { name: 'Brand Off Tokyo', url: 'brandoff.co.jp', priority: 'HIGH', region: 'ASIA' },
    
    // Sites spécialisés
    { name: 'Crown & Caliber', url: 'crownandcaliber.com', priority: 'HIGH', region: 'Global', specialty: 'Montres' },
    { name: 'Bob\'s Watches', url: 'bobswatches.com', priority: 'HIGH', region: 'US', specialty: 'Rolex' },
    { name: 'Chrono24', url: 'chrono24.com', priority: 'HIGH', region: 'Global', specialty: 'Montres' }
  ];

  // VRAIES OPPORTUNITÉS DÉTECTÉES (Simulation temps réel)
  const REAL_OPPORTUNITIES = [
    {
      id: 'opp_001',
      title: 'Hermès Birkin 30 Togo Noir',
      brand: 'Hermès',
      model: 'Birkin 30',
      condition: 'Excellent',
      price: 12900,
      market_value: 18500,
      discount_percentage: 30.3,
      potential_saving: 5600,
      site: 'Vestiaire Collective',
      site_url: 'vestiairecollective.com',
      seller_rating: 4.8,
      location: 'Paris, France',
      urgency: 'HIGH',
      time_left: '2h 45m',
      views: 847,
      interested: 23,
      authenticity: 'Vérifiée',
      images_count: 12,
      discovered_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['RARE', 'HOT_DEAL', 'VERIFIED'],
      shipping: 'Gratuite',
      return_policy: '14 jours',
      reason: 'Vente rapide propriétaire',
      investment_grade: 'A++'
    },
    
    {
      id: 'opp_002',
      title: 'Rolex Daytona 116500LN Cadran Blanc',
      brand: 'Rolex',
      model: 'Daytona Steel White',
      condition: 'Très bon',
      price: 24500,
      market_value: 32000,
      discount_percentage: 23.4,
      potential_saving: 7500,
      site: 'Crown & Caliber',
      site_url: 'crownandcaliber.com',
      seller_rating: 4.9,
      location: 'New York, USA',
      urgency: 'MEDIUM',
      time_left: '1j 12h',
      views: 1254,
      interested: 45,
      authenticity: 'Certifiée',
      images_count: 8,
      discovered_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ['INVESTMENT', 'CERTIFIED', 'TRENDING'],
      shipping: '€89',
      return_policy: '30 jours',
      reason: 'Collection privée',
      investment_grade: 'AAA'
    },
    
    {
      id: 'opp_003',
      title: 'Chanel Classic Flap Medium Caviar',
      brand: 'Chanel',
      model: 'Classic Flap Medium',
      condition: 'Excellent',
      price: 7200,
      market_value: 9800,
      discount_percentage: 26.5,
      potential_saving: 2600,
      site: 'Fashionphile',
      site_url: 'fashionphile.com',
      seller_rating: 4.7,
      location: 'Los Angeles, USA',
      urgency: 'LOW',
      time_left: '3j 8h',
      views: 456,
      interested: 12,
      authenticity: 'Vérifiée',
      images_count: 10,
      discovered_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tags: ['CLASSIC', 'STABLE', 'POPULAR'],
      shipping: 'Gratuite',
      return_policy: '14 jours',
      reason: 'Mise à niveau collection',
      investment_grade: 'A'
    },

    {
      id: 'opp_004',
      title: 'Louis Vuitton x Supreme Box Logo Tee',
      brand: 'Louis Vuitton',
      model: 'Supreme Collaboration T-Shirt',
      condition: 'Neuf avec étiquettes',
      price: 890,
      market_value: 1400,
      discount_percentage: 36.4,
      potential_saving: 510,
      site: 'The RealReal',
      site_url: 'therealreal.com',
      seller_rating: 4.8,
      location: 'San Francisco, USA',
      urgency: 'HIGH',
      time_left: '18h 32m',
      views: 234,
      interested: 8,
      authenticity: 'Vérifiée',
      images_count: 6,
      discovered_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
      tags: ['STREETWEAR', 'COLLAB', 'HYPED'],
      shipping: '€25',
      return_policy: '10 jours',
      reason: 'Destockage',
      investment_grade: 'B+'
    },

    {
      id: 'opp_005',
      title: 'Patek Philippe Aquanaut 5167A',
      brand: 'Patek Philippe',
      model: 'Aquanaut Steel',
      condition: 'Excellent',
      price: 38000,
      market_value: 52000,
      discount_percentage: 26.9,
      potential_saving: 14000,
      site: 'Collector Square',
      site_url: 'collectorsquare.com',
      seller_rating: 4.9,
      location: 'Geneva, Switzerland',
      urgency: 'HIGH',
      time_left: '5h 12m',
      views: 923,
      interested: 34,
      authenticity: 'Certifiée',
      images_count: 15,
      discovered_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
      tags: ['GRAIL', 'INVESTMENT', 'RARE'],
      shipping: 'Gratuite + Assurance',
      return_policy: '7 jours',
      reason: 'Succession',
      investment_grade: 'AAA+'
    }
  ];

  // ALERTES TEMPS RÉEL
  const LIVE_ALERTS = [
    {
      id: 'alert_001',
      type: 'PRICE_DROP',
      message: 'Hermès Kelly 28 - Prix baissé de 8% !',
      product: 'Hermès Kelly 28 Sellier',
      old_price: 15600,
      new_price: 14350,
      saving: 1250,
      site: 'Vestiaire Collective',
      urgency: 'HIGH',
      time: '5 min'
    },
    {
      id: 'alert_002',
      type: 'NEW_LISTING',
      message: 'Nouvelle Rolex Submariner détectée !',
      product: 'Rolex Submariner Date',
      price: 8900,
      market_value: 12500,
      discount: 28.8,
      site: 'Crown & Caliber',
      urgency: 'MEDIUM',
      time: '12 min'
    },
    {
      id: 'alert_003',
      type: 'PRICE_ALERT',
      message: 'Votre recherche "Birkin 25" a donné un résultat !',
      product: 'Hermès Birkin 25 Epsom',
      price: 16800,
      target_price: 17000,
      site: 'The RealReal',
      urgency: 'MEDIUM',
      time: '25 min'
    }
  ];

  // Simulation scan automatique
  const runScan = async () => {
    setScanning(true);
    
    // Simulation progressive du scan
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setScanStats(prev => ({
        ...prev,
        sitesScanned: Math.floor((i / 100) * MONITORED_SITES.length)
      }));
    }
    
    setTimeout(() => {
      setOpportunities(REAL_OPPORTUNITIES);
      setAlerts(LIVE_ALERTS);
      setScanStats({
        sitesScanned: MONITORED_SITES.length,
        opportunitiesFound: REAL_OPPORTUNITIES.length,
        avgDiscount: 28.7,
        biggestSaving: 14000
      });
      setLastScanTime(new Date());
      setScanning(false);
    }, 2000);
  };

  // Auto-scan toutes les 5 minutes (simulation)
  useEffect(() => {
    runScan();
    const interval = setInterval(() => {
      if (!scanning) {
        runScan();
      }
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'HIGH': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'LOW': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getInvestmentGradeColor = (grade) => {
    if (grade.includes('AAA')) return 'text-green-400 bg-green-500/20';
    if (grade.includes('AA')) return 'text-blue-400 bg-blue-500/20';
    if (grade.includes('A')) return 'text-purple-400 bg-purple-500/20';
    return 'text-yellow-400 bg-yellow-500/20';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const addToWatchlist = (opportunity) => {
    alert(`📌 "${opportunity.title}" ajouté à votre watchlist !`);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-red-500/20 rounded-xl relative">
              <Radar className="w-8 h-8 text-red-400" />
              {scanning && (
                <div className="absolute inset-0 rounded-xl bg-red-500/20 animate-pulse"></div>
              )}
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Radar Opportunités
            </h1>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm border border-red-500/30">
              🔴 AUTO SCAN
            </span>
          </div>
          <p className="text-gray-400">
            Scan 100+ sites • Alertes temps réel • Bonnes affaires détectées automatiquement
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right text-sm">
            <p className="text-gray-400">Dernier scan</p>
            <p className="text-white">{lastScanTime.toLocaleTimeString('fr-FR')}</p>
          </div>
          
          <button 
            onClick={runScan}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            disabled={scanning}
          >
            <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
            <span>{scanning ? 'Scan...' : 'Force Scan'}</span>
          </button>
        </div>
      </div>

      {/* Stats scan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Globe className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{scanStats.sitesScanned}</p>
              <p className="text-gray-400 text-sm">Sites scannés</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-green-400">{scanStats.opportunitiesFound}</p>
              <p className="text-gray-400 text-sm">Opportunités trouvées</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <ArrowDown className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-purple-400">{scanStats.avgDiscount}%</p>
              <p className="text-gray-400 text-sm">Remise moyenne</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-amber-400" />
            <div>
              <p className="text-2xl font-bold text-amber-400">{formatCurrency(scanStats.biggestSaving)}</p>
              <p className="text-gray-400 text-sm">Plus grosse économie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes temps réel */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-red-400" />
          Alertes Temps Réel
        </h2>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{alert.message}</h3>
                  <p className="text-gray-300 text-sm">{alert.product}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                    <span>{alert.site}</span>
                    <span>Il y a {alert.time}</span>
                    {alert.saving && (
                      <span className="text-green-400">Économie: {formatCurrency(alert.saving)}</span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm border ${getUrgencyColor(alert.urgency)}`}>
                    {alert.urgency}
                  </span>
                  <button className="block mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                    Voir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunités détectées */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
            Opportunités Détectées ({opportunities.length})
          </h2>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none">
              <option>Toutes catégories</option>
              <option>Maroquinerie</option>
              <option>Montres</option>
              <option>Bijoux</option>
            </select>
            
            <select className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none">
              <option>Trier par pertinence</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Remise %-</option>
              <option>Économies €</option>
            </select>
          </div>
        </div>

        {scanning ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Scan des opportunités en cours...</p>
            <p className="text-gray-500 text-sm mt-1">
              {scanStats.sitesScanned}/{MONITORED_SITES.length} sites analysés
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-red-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{opp.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{opp.brand} • {opp.condition}</p>
                        
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-2 py-1 rounded text-xs border ${getUrgencyColor(opp.urgency)}`}>
                            {opp.urgency} URGENCY
                          </span>
                          <span className={`px-2 py-1 rounded text-xs border ${getInvestmentGradeColor(opp.investment_grade)}`}>
                            {opp.investment_grade}
                          </span>
                          {opp.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-gray-400">Site</p>
                            <p className="text-white font-semibold">{opp.site}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Vendeur</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                              <span className="text-white">{opp.seller_rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400">Expiration</p>
                            <p className="text-red-400 font-semibold">{opp.time_left}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Intéressés</p>
                            <p className="text-white">{opp.interested} personnes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-3xl font-bold text-green-400 mb-1">
                        -{opp.discount_percentage.toFixed(1)}%
                      </p>
                      <p className="text-gray-400 text-sm mb-2">Remise</p>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Prix :</span>
                          <span className="text-2xl font-bold text-white">{formatCurrency(opp.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Marché :</span>
                          <span className="text-gray-400 line-through">{formatCurrency(opp.market_value)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-700 pt-1">
                          <span className="text-gray-400">Économie :</span>
                          <span className="text-green-400 font-bold">{formatCurrency(opp.potential_saving)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => addToWatchlist(opp)}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors flex items-center space-x-1">
                        <ExternalLink className="w-4 h-4" />
                        <span>Voir</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-3">
                  <div className="flex items-center space-x-4">
                    <span>🔒 {opp.authenticity}</span>
                    <span>📦 Livraison: {opp.shipping}</span>
                    <span>↩️ Retour: {opp.return_policy}</span>
                    <span>📍 {opp.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>Trouvé il y a {Math.floor((new Date() - opp.discovered_at) / (1000 * 60 * 60))}h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RadarOpportunites;