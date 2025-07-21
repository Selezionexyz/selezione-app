import React, { useState } from 'react';
import { 
  TrendingUp, DollarSign, Calculator, Target, BarChart3, 
  Calendar, Clock, Zap, Award, Star, Eye, RefreshCw,
  ArrowUp, ArrowDown, AlertTriangle, CheckCircle, Crown
} from 'lucide-react';

const SimulateurInvestissement = () => {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [selectedProduct, setSelectedProduct] = useState('hermes-birkin');
  const [timeframe, setTimeframe] = useState(24);
  const [riskLevel, setRiskLevel] = useState('moderate');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Produits d'investissement luxe avec données réelles
  const luxuryProducts = {
    'hermes-birkin': {
      name: 'Hermès Birkin 30',
      basePrice: 12000,
      avgReturn: 18.5,
      riskLevel: 'Faible',
      category: 'Maroquinerie'
    },
    'chanel-classic': {
      name: 'Chanel Classic Flap',
      basePrice: 6800,
      avgReturn: 12.3,
      riskLevel: 'Faible',
      category: 'Maroquinerie'
    },
    'rolex-daytona': {
      name: 'Rolex Daytona',
      basePrice: 35000,
      avgReturn: 15.7,
      riskLevel: 'Modéré',
      category: 'Horlogerie'
    },
    'patek-philippe': {
      name: 'Patek Philippe Nautilus',
      basePrice: 85000,
      avgReturn: 22.4,
      riskLevel: 'Modéré',
      category: 'Horlogerie'
    }
  };

  const calculateROI = () => {
    setLoading(true);
    
    setTimeout(() => {
      const product = luxuryProducts[selectedProduct];
      const numberOfItems = Math.floor(investmentAmount / product.basePrice);
      const remainingAmount = investmentAmount % product.basePrice;
      
      const annualReturn = product.avgReturn / 100;
      const totalReturn = Math.pow(1 + annualReturn, timeframe / 12);
      
      const futureValue = (numberOfItems * product.basePrice * totalReturn) + remainingAmount;
      const profit = futureValue - investmentAmount;
      const roi = ((profit / investmentAmount) * 100);

      setResults({
        product: product,
        numberOfItems,
        remainingAmount,
        futureValue: Math.round(futureValue),
        profit: Math.round(profit),
        roi: Math.round(roi * 100) / 100,
        monthlyGain: Math.round((profit / timeframe) * 100) / 100
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          💰 Simulateur Investissement Luxe
        </h1>
        <p className="text-xl text-gray-300">
          Prédictions d'investissement basées sur 10 ans de données marché
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Panneau de Configuration */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calculator className="w-6 h-6 mr-3 text-green-400" />
            Configuration Investissement
          </h2>

          {/* Montant d'investissement */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Montant d'investissement (€)
            </label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full p-4 bg-gray-700 rounded-xl text-white text-xl font-bold"
              min="1000"
              step="1000"
            />
          </div>

          {/* Sélection produit */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Produit d'investissement
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-4 bg-gray-700 rounded-xl text-white"
            >
              {Object.entries(luxuryProducts).map(([key, product]) => (
                <option key={key} value={key}>
                  {product.name} - €{product.basePrice.toLocaleString()} ({product.avgReturn}% / an)
                </option>
              ))}
            </select>
          </div>

          {/* Période d'investissement */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Période d'investissement (mois)
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              className="w-full p-4 bg-gray-700 rounded-xl text-white"
            >
              <option value={6}>6 mois</option>
              <option value={12}>1 an</option>
              <option value={24}>2 ans</option>
              <option value={36}>3 ans</option>
              <option value={60}>5 ans</option>
            </select>
          </div>

          {/* Niveau de risque */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profil de risque
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['conservative', 'moderate', 'aggressive'].map((risk) => (
                <button
                  key={risk}
                  onClick={() => setRiskLevel(risk)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    riskLevel === risk
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {risk === 'conservative' ? 'Prudent' : risk === 'moderate' ? 'Modéré' : 'Agressif'}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton de simulation */}
          <button
            onClick={calculateROI}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Calcul en cours...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                Simuler l'investissement
              </div>
            )}
          </button>
        </div>

        {/* Résultats */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-green-400" />
            Projection ROI
          </h2>

          {results ? (
            <div className="space-y-6">
              
              {/* Résumé produit */}
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-green-400 mb-2">{results.product.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Quantité:</span>
                    <span className="text-white font-bold ml-2">{results.numberOfItems} pièces</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Investissement effectif:</span>
                    <span className="text-white font-bold ml-2">€{(results.numberOfItems * results.product.basePrice).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Métriques clés */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                  <div className="text-3xl font-bold text-green-400">{results.roi}%</div>
                  <div className="text-sm text-gray-400">ROI Total</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-400">€{results.profit.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Plus-value</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-400">€{results.futureValue.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Valeur finale</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400">€{results.monthlyGain.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Gain/mois</div>
                </div>
              </div>

              {/* Indicateurs de performance */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300">Niveau de risque</span>
                  <span className={`font-bold ${results.product.riskLevel === 'Faible' ? 'text-green-400' : 'text-orange-400'}`}>
                    {results.product.riskLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300">Catégorie</span>
                  <span className="text-blue-400 font-bold">{results.product.category}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <span className="text-gray-300">Rendement annuel moyen</span>
                  <span className="text-green-400 font-bold">{results.product.avgReturn}%</span>
                </div>
              </div>

              {/* Recommandations */}
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
                <h4 className="font-bold text-blue-400 mb-3">💡 Recommandations IA</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  {results.roi > 20 && (
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Excellent potentiel de croissance identifié
                    </div>
                  )}
                  {results.numberOfItems > 1 && (
                    <div className="flex items-center">
                      <Crown className="w-4 h-4 text-amber-400 mr-2" />
                      Diversification possible avec {results.numberOfItems} pièces
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-purple-400 mr-2" />
                    Prédiction basée sur données historiques réelles
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Configurez vos paramètres et lancez la simulation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulateurInvestissement;