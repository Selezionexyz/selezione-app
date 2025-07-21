import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, BarChart3, PieChart, LineChart,
  Target, Award, Clock, Calendar, Filter, Download,
  ArrowUp, ArrowDown, Star, AlertTriangle, CheckCircle,
  Zap, Crown, Trophy, Eye, RefreshCw
} from 'lucide-react';

const RapportROIIntelligence = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [reportData, setReportData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  // BASE DE DONNÉES COMPLÈTE ROI PAR MARQUE/PRODUIT/ÉPOQUE
  const ROI_DATABASE = {
    brands: {
      'Hermès': {
        average_roi: 45.2,
        risk_score: 'Très faible',
        best_products: [
          { model: 'Birkin 30', roi: 52.8, period: '12 mois', investment_rating: 5 },
          { model: 'Kelly 28', roi: 48.3, period: '12 mois', investment_rating: 5 },
          { model: 'Constance 24', roi: 41.7, period: '12 mois', investment_rating: 4 }
        ],
        historical_performance: [
          { year: '2020', roi: 38.5 },
          { year: '2021', roi: 42.1 },
          { year: '2022', roi: 39.8 },
          { year: '2023', roi: 44.2 },
          { year: '2024', roi: 45.2 }
        ],
        market_cap: '€2.1B',
        volatility: 8.3,
        seasonal_trends: {
          q1: '+12%', q2: '+18%', q3: '+8%', q4: '+22%'
        }
      },
      'Chanel': {
        average_roi: 28.7,
        risk_score: 'Faible',
        best_products: [
          { model: 'Classic Flap Medium', roi: 32.4, period: '12 mois', investment_rating: 4 },
          { model: 'Boy Bag Medium', roi: 29.1, period: '12 mois', investment_rating: 4 },
          { model: '19 Bag Large', roi: 25.8, period: '12 mois', investment_rating: 3 }
        ],
        historical_performance: [
          { year: '2020', roi: 22.1 },
          { year: '2021', roi: 25.8 },
          { year: '2022', roi: 27.3 },
          { year: '2023', roi: 29.2 },
          { year: '2024', roi: 28.7 }
        ],
        market_cap: '€1.8B',
        volatility: 12.1,
        seasonal_trends: {
          q1: '+8%', q2: '+12%', q3: '+15%', q4: '+25%'
        }
      },
      'Louis Vuitton': {
        average_roi: 18.3,
        risk_score: 'Modéré',
        best_products: [
          { model: 'Capucines MM', roi: 24.6, period: '12 mois', investment_rating: 4 },
          { model: 'Twist MM', roi: 21.2, period: '12 mois', investment_rating: 3 },
          { model: 'Petite Malle', roi: 19.8, period: '12 mois', investment_rating: 3 }
        ],
        historical_performance: [
          { year: '2020', roi: 14.2 },
          { year: '2021', roi: 16.8 },
          { year: '2022', roi: 17.5 },
          { year: '2023', roi: 19.1 },
          { year: '2024', roi: 18.3 }
        ],
        market_cap: '€1.2B',
        volatility: 15.7,
        seasonal_trends: {
          q1: '+5%', q2: '+8%', q3: '+12%', q4: '+18%'
        }
      },
      'Dior': {
        average_roi: 22.1,
        risk_score: 'Modéré',
        best_products: [
          { model: 'Lady Dior Medium', roi: 26.8, period: '12 mois', investment_rating: 4 },
          { model: 'Saddle Bag', roi: 21.4, period: '12 mois', investment_rating: 3 },
          { model: 'Book Tote Large', roi: 18.9, period: '12 mois', investment_rating: 3 }
        ],
        historical_performance: [
          { year: '2020', roi: 18.4 },
          { year: '2021', roi: 20.1 },
          { year: '2022', roi: 21.8 },
          { year: '2023', roi: 23.5 },
          { year: '2024', roi: 22.1 }
        ],
        market_cap: '€890M',
        volatility: 18.2,
        seasonal_trends: {
          q1: '+6%', q2: '+10%', q3: '+14%', q4: '+20%'
        }
      }
    },
    
    predictions_2025: [
      {
        brand: 'Hermès',
        model: 'Birkin 25 Faubourg',
        current_investment: 15000,
        predicted_6m: 18500,
        predicted_12m: 22800,
        predicted_24m: 28500,
        confidence: 92,
        factors: ['Rareté extrême', 'Demande Asie +45%', 'Inflation matières premières']
      },
      {
        brand: 'Chanel',
        model: 'Classic Flap Medium',
        current_investment: 8200,
        predicted_6m: 9400,
        predicted_12m: 10800,
        predicted_24m: 12500,
        confidence: 87,
        factors: ['Hausse prix officielle 2025', 'Demande stable', 'Collection limitée']
      },
      {
        brand: 'Bottega Veneta',
        model: 'Jodie Large',
        current_investment: 2800,
        predicted_6m: 3200,
        predicted_12m: 3800,
        predicted_24m: 4200,
        confidence: 78,
        factors: ['Tendance Gen Z', 'Influence TikTok', 'Design intemporel']
      }
    ],

    market_analysis: {
      total_market_size: '€47.2B',
      yoy_growth: '+12.8%',
      top_performing_categories: [
        { category: 'Maroquinerie', growth: '+18.5%', investment_attractiveness: 'Élevé' },
        { category: 'Montres', growth: '+15.2%', investment_attractiveness: 'Très élevé' },
        { category: 'Bijoux', growth: '+22.1%', investment_attractiveness: 'Élevé' }
      ],
      risk_factors: [
        'Volatilité économique mondiale',
        'Changements réglementaires Chine',
        'Inflation matières premières'
      ],
      opportunities: [
        'Digitalisation du marché secondaire',
        'Nouveaux marchés émergents',
        'Authentification blockchain'
      ]
    }
  };

  // Génération du rapport
  const generateReport = () => {
    setLoading(true);
    
    setTimeout(() => {
      const data = {
        overview: {
          total_investment_simulated: 250000,
          current_portfolio_value: 312500,
          total_roi: 25.0,
          best_performer: 'Hermès Birkin 30',
          worst_performer: 'Louis Vuitton Neverfull',
          risk_level: 'Modéré'
        },
        brand_breakdown: Object.entries(ROI_DATABASE.brands).map(([brand, data]) => ({
          brand,
          ...data
        })),
        predictions: ROI_DATABASE.predictions_2025,
        market_insights: ROI_DATABASE.market_analysis
      };
      
      setReportData(data);
      setPredictions(ROI_DATABASE.predictions_2025);
      setLoading(false);
    }, 1500);
  };

  // Chargement initial
  useEffect(() => {
    generateReport();
  }, [selectedTimeframe, selectedCategory, selectedBrand]);

  const getRiskColor = (risk) => {
    switch(risk.toLowerCase()) {
      case 'très faible': return 'text-green-400 bg-green-500/20';
      case 'faible': return 'text-blue-400 bg-blue-500/20';
      case 'modéré': return 'text-yellow-400 bg-yellow-500/20';
      case 'élevé': return 'text-orange-400 bg-orange-500/20';
      case 'très élevé': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getROIColor = (roi) => {
    if (roi >= 40) return 'text-green-400';
    if (roi >= 25) return 'text-blue-400';
    if (roi >= 15) return 'text-yellow-400';
    if (roi >= 5) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" />
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Rapport ROI Intelligence
            </h1>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
              IA POWERED
            </span>
          </div>
          <p className="text-gray-400">
            Analyse ROI par marque/produit • Prédictions 2025 • Recommandations investissement
          </p>
        </div>
        
        <button 
          onClick={generateReport}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filtres :</span>
          </div>
          
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="3m">3 mois</option>
            <option value="6m">6 mois</option>
            <option value="12m">12 mois</option>
            <option value="24m">24 mois</option>
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="all">Toutes catégories</option>
            <option value="maroquinerie">Maroquinerie</option>
            <option value="montres">Montres</option>
            <option value="bijoux">Bijoux</option>
          </select>
          
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none"
          >
            <option value="all">Toutes marques</option>
            <option value="hermes">Hermès</option>
            <option value="chanel">Chanel</option>
            <option value="louis-vuitton">Louis Vuitton</option>
            <option value="dior">Dior</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Génération du rapport ROI Intelligence...</p>
        </div>
      ) : reportData && (
        <>
          {/* Vue d'ensemble */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-gold-400" />
              Vue d'Ensemble Portfolio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-400">
                  {reportData.overview.total_roi.toFixed(1)}%
                </p>
                <p className="text-gray-400 text-sm">ROI Global</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">
                  {reportData.overview.current_portfolio_value.toLocaleString()}€
                </p>
                <p className="text-gray-400 text-sm">Valeur Actuelle</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-amber-400">
                  {reportData.overview.best_performer}
                </p>
                <p className="text-gray-400 text-sm">Meilleur Performeur</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-lg font-bold text-purple-400">
                  {reportData.overview.risk_level}
                </p>
                <p className="text-gray-400 text-sm">Niveau de Risque</p>
              </div>
            </div>
          </div>

          {/* Analyse par marque */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-purple-400" />
              Analyse ROI par Marque
            </h2>
            
            <div className="space-y-6">
              {reportData.brand_breakdown.map((brand, index) => (
                <div key={brand.brand} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {brand.brand.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{brand.brand}</h3>
                        <p className="text-gray-400 text-sm">Cap. marché: {brand.market_cap}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${getROIColor(brand.average_roi)}`}>
                        {brand.average_roi.toFixed(1)}%
                      </p>
                      <p className="text-gray-400 text-sm">ROI Moyen 12M</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Niveau de risque</p>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getRiskColor(brand.risk_score)}`}>
                        {brand.risk_score}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Volatilité</p>
                      <p className="text-white font-semibold">{brand.volatility.toFixed(1)}%</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Tendances saisonnières</p>
                      <div className="flex space-x-2 text-xs">
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          Q4 {brand.seasonal_trends.q4}
                        </span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          Q2 {brand.seasonal_trends.q2}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-semibold mb-3">Top Produits Performants</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {brand.best_products.map((product, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-3">
                          <h4 className="text-white font-medium">{product.model}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <p className={`font-bold ${getROIColor(product.roi)}`}>
                              {product.roi.toFixed(1)}%
                            </p>
                            <div className="flex">
                              {getRatingStars(product.investment_rating)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prédictions 2025 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              Prédictions Investissement 2025
            </h2>
            
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {prediction.brand} {prediction.model}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Investment initial: {prediction.current_investment.toLocaleString()}€
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-green-400 font-bold text-lg">
                        Confiance: {prediction.confidence}%
                      </p>
                      <div className="w-32 bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">6 mois</p>
                      <p className="text-blue-400 font-bold text-lg">
                        {prediction.predicted_6m.toLocaleString()}€
                      </p>
                      <p className="text-green-400 text-sm">
                        +{(((prediction.predicted_6m - prediction.current_investment) / prediction.current_investment) * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">12 mois</p>
                      <p className="text-green-400 font-bold text-lg">
                        {prediction.predicted_12m.toLocaleString()}€
                      </p>
                      <p className="text-green-400 text-sm">
                        +{(((prediction.predicted_12m - prediction.current_investment) / prediction.current_investment) * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">24 mois</p>
                      <p className="text-purple-400 font-bold text-lg">
                        {prediction.predicted_24m.toLocaleString()}€
                      </p>
                      <p className="text-green-400 text-sm">
                        +{(((prediction.predicted_24m - prediction.current_investment) / prediction.current_investment) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-semibold mb-2">Facteurs clés :</p>
                    <div className="flex flex-wrap gap-2">
                      {prediction.factors.map((factor, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analyse marché global */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-cyan-400" />
              Analyse Marché Global
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Catégories Performantes</h3>
                <div className="space-y-3">
                  {reportData.market_insights.top_performing_categories.map((cat, idx) => (
                    <div key={idx} className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{cat.category}</h4>
                          <p className="text-gray-400 text-sm">Attractivité: {cat.investment_attractiveness}</p>
                        </div>
                        <p className="text-green-400 font-bold text-lg">{cat.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Risques & Opportunités</h3>
                
                <div className="mb-4">
                  <h4 className="text-amber-400 font-medium mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Facteurs de Risque
                  </h4>
                  <div className="space-y-2">
                    {reportData.market_insights.risk_factors.map((risk, idx) => (
                      <div key={idx} className="text-gray-300 text-sm flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {risk}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-green-400 font-medium mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Opportunités
                  </h4>
                  <div className="space-y-2">
                    {reportData.market_insights.opportunities.map((opp, idx) => (
                      <div key={idx} className="text-gray-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {opp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RapportROIIntelligence;