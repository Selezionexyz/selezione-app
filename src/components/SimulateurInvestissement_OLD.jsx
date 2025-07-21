import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Calculator, Target, BarChart3, 
  Calendar, Clock, Zap, Award, Star, Eye, RefreshCw,
  ArrowUp, ArrowDown, AlertTriangle, CheckCircle, Crown
} from 'lucide-react';

const SimulateurInvestissement = () => {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [selectedProduct, setSelectedProduct] = useState('hermes-birkin-30');
  const [investmentPeriod, setInvestmentPeriod] = useState(24);
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [simulationResult, setSimulationResult] = useState(null);
  const [marketConditions, setMarketConditions] = useState('normal');
  const [loading, setLoading] = useState(false);

  // BASE DE DONNÉES COMPLÈTE INVESTISSEMENT LUXE
  const INVESTMENT_DATABASE = {
    'hermes-birkin-30': {
      name: 'Hermès Birkin 30',
      category: 'Maroquinerie Ultra-Luxe',
      entry_price: 11000,
      current_market_avg: 15800,
      historical_performance: {
        '1_year': 18.7,
        '2_years': 42.3,
        '5_years': 124.8,
        '10_years': 286.4
      },
      volatility: 12.3,
      liquidity_score: 95,
      rarity_factor: 9.8,
      investment_grade: 'AAA',
      seasonal_variations: {
        q1: '+8%', q2: '+15%', q3: '+6%', q4: '+28%'
      },
      market_factors: [
        'Demande Asie explosive (+45%)',
        'Production limitée Hermès',
        'Inflation matières premières',
        'Collectors institutionnels'
      ],
      risk_factors: [
        'Politique prix Hermès',
        'Saturation marché haut de gamme',
        'Réglementation import/export'
      ],
      prediction_accuracy: 94
    },

    'chanel-classic-flap': {
      name: 'Chanel Classic Flap Medium',
      category: 'Maroquinerie Prestige',
      entry_price: 8500,
      current_market_avg: 9200,
      historical_performance: {
        '1_year': 12.4,
        '2_years': 28.9,
        '5_years': 78.5,
        '10_years': 165.2
      },
      volatility: 18.7,
      liquidity_score: 88,
      rarity_factor: 7.2,
      investment_grade: 'AA+',
      seasonal_variations: {
        q1: '+5%', q2: '+12%', q3: '+18%', q4: '+35%'
      },
      market_factors: [
        'Hausses prix régulières Chanel',
        'Popularité steady worldwide',
        'Collectors vintage premium',
        'Influence fashion weeks'
      ],
      risk_factors: [
        'Concurrence forte segment',
        'Contrefaçons sophistiquées',
        'Changements directeur artistique'
      ],
      prediction_accuracy: 87
    },

    'rolex-daytona-steel': {
      name: 'Rolex Daytona Acier',
      category: 'Horlogerie Sport',
      entry_price: 13400,
      current_market_avg: 28500,
      historical_performance: {
        '1_year': 24.8,
        '2_years': 58.3,
        '5_years': 156.7,
        '10_years': 312.9
      },
      volatility: 25.4,
      liquidity_score: 97,
      rarity_factor: 9.5,
      investment_grade: 'AAA',
      seasonal_variations: {
        q1: '+12%', q2: '+8%', q3: '+15%', q4: '+22%'
      },
      market_factors: [
        'Liste attente 8+ années',
        'Production limitée Rolex',
        'Demande collectors mondiale',
        'Paul Newman effect'
      ],
      risk_factors: [
        'Bulle spéculative montres',
        'Politique allocation Rolex',
        'Copies haute qualité'
      ],
      prediction_accuracy: 91
    },

    'patek-philippe-aquanaut': {
      name: 'Patek Philippe Aquanaut',
      category: 'Horlogerie Prestige',
      entry_price: 21000,
      current_market_avg: 45000,
      historical_performance: {
        '1_year': 31.2,
        '2_years': 67.8,
        '5_years': 198.4,
        '10_years': 445.7
      },
      volatility: 22.1,
      liquidity_score: 89,
      rarity_factor: 9.2,
      investment_grade: 'AAA+',
      seasonal_variations: {
        q1: '+18%', q2: '+25%', q3: '+12%', q4: '+31%'
      },
      market_factors: [
        'Manufacture swiss heritage',
        'Production artisanale limitée',
        'Héritage famille collectors',
        'Innovation technique continue'
      ],
      risk_factors: [
        'Prix entrée très élevé',
        'Marché niche ultra-luxe',
        'Sensibilité crise économique'
      ],
      prediction_accuracy: 89
    },

    'cartier-love-bracelet': {
      name: 'Cartier Love Bracelet Or',
      category: 'Bijouterie Luxe',
      entry_price: 7100,
      current_market_avg: 7800,
      historical_performance: {
        '1_year': 8.9,
        '2_years': 19.7,
        '5_years': 45.2,
        '10_years': 89.3
      },
      volatility: 14.8,
      liquidity_score: 78,
      rarity_factor: 5.8,
      investment_grade: 'A+',
      seasonal_variations: {
        q1: '+3%', q2: '+8%', q3: '+5%', q4: '+15%'
      },
      market_factors: [
        'Icon status mondial',
        'Stabilité prix Cartier',
        'Demande constante couples',
        'Or hedge inflation'
      ],
      risk_factors: [
        'Croissance modérée',
        'Concurrence bijouterie',
        'Prix or volatil'
      ],
      prediction_accuracy: 82
    }
  };

  // SCENARIOS MARCHÉ
  const MARKET_SCENARIOS = {
    'bull': {
      name: 'Marché Haussier',
      multiplier: 1.35,
      description: 'Économie forte, demande luxe explosive, inflation contrôlée'
    },
    'normal': {
      name: 'Marché Normal',
      multiplier: 1.0,
      description: 'Conditions économiques stables, croissance régulière'
    },
    'bear': {
      name: 'Marché Baissier',
      multiplier: 0.72,
      description: 'Récession, luxe en baisse, liquidités réduites'
    },
    'crisis': {
      name: 'Crise Majeure',
      multiplier: 0.45,
      description: 'Crise économique majeure, effondrement luxe temporaire'
    }
  };

  // CALCUL SIMULATION AVANCÉE
  const runInvestmentSimulation = () => {
    setLoading(true);
    
    setTimeout(() => {
      const product = INVESTMENT_DATABASE[selectedProduct];
      const scenario = MARKET_SCENARIOS[marketConditions];
      
      // Calcul nombre de pièces
      const pieces_count = Math.floor(investmentAmount / product.entry_price);
      const actual_investment = pieces_count * product.entry_price;
      const remaining_cash = investmentAmount - actual_investment;
      
      // Calcul performance selon période
      let base_performance;
      if (investmentPeriod <= 12) {
        base_performance = product.historical_performance['1_year'] * (investmentPeriod / 12);
      } else if (investmentPeriod <= 24) {
        base_performance = product.historical_performance['2_years'] * (investmentPeriod / 24);
      } else if (investmentPeriod <= 60) {
        base_performance = product.historical_performance['5_years'] * (investmentPeriod / 60);
      } else {
        base_performance = product.historical_performance['10_years'] * (investmentPeriod / 120);
      }
      
      // Application multiplicateur marché
      const adjusted_performance = base_performance * scenario.multiplier;
      
      // Calcul risque selon tolérance
      const risk_adjustment = {
        'conservative': 0.85,
        'moderate': 1.0,
        'aggressive': 1.18
      };
      
      const final_performance = adjusted_performance * risk_adjustment[riskTolerance];
      const final_value = actual_investment * (1 + final_performance / 100);
      const profit = final_value - actual_investment;
      const total_with_cash = final_value + remaining_cash;
      
      // Calcul métriques avancées
      const annual_return = Math.pow(final_value / actual_investment, 12 / investmentPeriod) - 1;
      const volatility_adjusted = product.volatility * scenario.multiplier;
      const sharpe_ratio = (annual_return * 100 - 2) / volatility_adjusted; // Risque free rate = 2%
      
      // Prédictions timeline
      const timeline = [];
      for (let i = 6; i <= investmentPeriod; i += 6) {
        const period_performance = final_performance * (i / investmentPeriod);
        const period_value = actual_investment * (1 + period_performance / 100);
        timeline.push({
          months: i,
          value: period_value,
          profit: period_value - actual_investment,
          performance: period_performance
        });
      }
      
      const result = {
        product_info: product,
        investment_details: {
          total_budget: investmentAmount,
          pieces_count,
          actual_investment,
          remaining_cash,
          entry_price_per_piece: product.entry_price
        },
        projections: {
          investment_period_months: investmentPeriod,
          expected_performance: final_performance,
          final_value: final_value,
          total_profit: profit,
          total_with_cash: total_with_cash,
          roi_percentage: (profit / actual_investment) * 100,
          annual_return: annual_return * 100,
          timeline
        },
        risk_analysis: {
          volatility: volatility_adjusted,
          sharpe_ratio,
          risk_grade: product.investment_grade,
          liquidity_score: product.liquidity_score,
          confidence_level: product.prediction_accuracy
        },
        market_context: {
          scenario: scenario.name,
          scenario_description: scenario.description,
          market_multiplier: scenario.multiplier,
          risk_tolerance: riskTolerance
        }
      };
      
      setSimulationResult(result);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (selectedProduct && investmentAmount > 0) {
      runInvestmentSimulation();
    }
  }, [selectedProduct, investmentAmount, investmentPeriod, riskTolerance, marketConditions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 30) return 'text-green-400';
    if (performance >= 15) return 'text-blue-400';
    if (performance >= 5) return 'text-yellow-400';
    if (performance >= 0) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRiskColor = (grade) => {
    switch(grade) {
      case 'AAA+': case 'AAA': return 'text-green-400 bg-green-500/20';
      case 'AA+': case 'AA': return 'text-blue-400 bg-blue-500/20';
      case 'A+': case 'A': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-orange-400 bg-orange-500/20';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Calculator className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simulateur Investissement Luxe
            </h1>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm border border-amber-500/30">
              PRÉDICTIONS IA
            </span>
          </div>
          <p className="text-gray-400">
            "Si j'achète ce Hermès maintenant, combien dans 2 ans ?" • Données historiques 10 ans • ROI optimal
          </p>
        </div>
        
        <button 
          onClick={runInvestmentSimulation}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Recalculer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Paramètres simulation */}
        <div className="xl:col-span-1">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-amber-400" />
              Paramètres Simulation
            </h2>
            
            {/* Montant investissement */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Montant à investir
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none text-lg font-semibold"
                  min="5000"
                  max="500000"
                  step="1000"
                />
                <span className="absolute right-3 top-3 text-gray-400">€</span>
              </div>
              <div className="flex space-x-2 mt-2">
                {[10000, 25000, 50000, 100000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setInvestmentAmount(amount)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sélection produit */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Produit d'investissement
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {Object.entries(INVESTMENT_DATABASE).map(([key, product]) => (
                  <option key={key} value={key}>
                    {product.name} - {formatCurrency(product.entry_price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Période investissement */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Période d'investissement : {investmentPeriod} mois
              </label>
              <input
                type="range"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                min="6"
                max="120"
                step="6"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>6M</span>
                <span>2A</span>
                <span>5A</span>
                <span>10A</span>
              </div>
            </div>

            {/* Tolérance risque */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tolérance au risque
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'conservative', label: 'Prudent', icon: '🛡️' },
                  { value: 'moderate', label: 'Équilibré', icon: '⚖️' },
                  { value: 'aggressive', label: 'Agressif', icon: '🚀' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setRiskTolerance(option.value)}
                    className={`p-3 rounded-lg border transition-all ${
                      riskTolerance === option.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditions marché */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scénario marché
              </label>
              <select
                value={marketConditions}
                onChange={(e) => setMarketConditions(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {Object.entries(MARKET_SCENARIOS).map(([key, scenario]) => (
                  <option key={key} value={key}>
                    {scenario.name} ({scenario.multiplier}x)
                  </option>
                ))}
              </select>
              <p className="text-gray-500 text-xs mt-1">
                {MARKET_SCENARIOS[marketConditions]?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Résultats simulation */}
        <div className="xl:col-span-2 space-y-6">
          
          {loading ? (
            <div className="bg-gray-800/30 rounded-xl p-12 border border-gray-700 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Calcul des projections d'investissement...</p>
            </div>
          ) : simulationResult ? (
            <>
              {/* Vue d'ensemble */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-gold-400" />
                  Projection Investissement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-green-400">
                      {formatCurrency(simulationResult.projections.total_profit)}
                    </p>
                    <p className="text-gray-400 text-sm">Profit Total</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className={`text-3xl font-bold ${getPerformanceColor(simulationResult.projections.roi_percentage)}`}>
                      {simulationResult.projections.roi_percentage.toFixed(1)}%
                    </p>
                    <p className="text-gray-400 text-sm">ROI Total</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-purple-400">
                      {simulationResult.projections.annual_return.toFixed(1)}%
                    </p>
                    <p className="text-gray-400 text-sm">Rendement Annuel</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <Shield className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className={`text-lg font-bold px-2 py-1 rounded ${getRiskColor(simulationResult.risk_analysis.risk_grade)}`}>
                      {simulationResult.risk_analysis.risk_grade}
                    </p>
                    <p className="text-gray-400 text-sm">Note Risque</p>
                  </div>
                </div>

                {/* Détails investissement */}
                <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                  <h3 className="text-white font-semibold mb-3">Détails de l'Investissement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Produit sélectionné</p>
                      <p className="text-white font-semibold">{simulationResult.product_info.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Nombre de pièces</p>
                      <p className="text-white font-semibold">{simulationResult.investment_details.pieces_count}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Prix d'entrée par pièce</p>
                      <p className="text-white font-semibold">{formatCurrency(simulationResult.investment_details.entry_price_per_piece)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Investissement réel</p>
                      <p className="text-white font-semibold">{formatCurrency(simulationResult.investment_details.actual_investment)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Liquidités restantes</p>
                      <p className="text-white font-semibold">{formatCurrency(simulationResult.investment_details.remaining_cash)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Valeur finale totale</p>
                      <p className="text-green-400 font-semibold">{formatCurrency(simulationResult.projections.total_with_cash)}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline évolution */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Évolution Prédite</h3>
                  <div className="space-y-3">
                    {simulationResult.projections.timeline.map((point, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <span className="text-purple-400 text-sm font-bold">{point.months}M</span>
                          </div>
                          <span className="text-gray-300">{point.months} mois</span>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-white font-semibold">{formatCurrency(point.value)}</p>
                            <p className="text-gray-400 text-xs">Valeur portfolio</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${point.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {point.profit > 0 ? '+' : ''}{formatCurrency(point.profit)}
                            </p>
                            <p className="text-gray-400 text-xs">Profit</p>
                          </div>
                          <div className="text-right min-w-[60px]">
                            <p className={`font-bold ${getPerformanceColor(point.performance)}`}>
                              {point.performance.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analyse risque */}
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-cyan-400" />
                  Analyse Risque & Opportunités
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Facteurs Positifs
                    </h3>
                    <div className="space-y-2">
                      {simulationResult.product_info.market_factors.map((factor, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-amber-400 font-semibold mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Facteurs de Risque
                    </h3>
                    <div className="space-y-2">
                      {simulationResult.product_info.risk_factors.map((risk, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Volatilité</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {simulationResult.risk_analysis.volatility.toFixed(1)}%
                    </p>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Liquidité</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {simulationResult.risk_analysis.liquidity_score}/100
                    </p>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Confiance IA</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {simulationResult.risk_analysis.confidence_level}%
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-800/30 rounded-xl p-12 border border-gray-700 text-center">
              <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Configurez vos paramètres
              </h3>
              <p className="text-gray-500">
                Sélectionnez un montant et un produit pour voir les projections
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulateurInvestissement;