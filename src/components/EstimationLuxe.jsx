import React, { useState } from 'react';
import { 
  Calculator, Shield, TrendingUp, Camera, FileText, BarChart3, 
  Clock, Target, Percent, Eye, DollarSign, Users, Upload, Loader,
  Download, Copy, CheckCircle, AlertCircle, Star, Zap
} from 'lucide-react';

const EstimationLuxe = () => {
  const [activeTool, setActiveTool] = useState('estimator');
  
  // ✅ ÉTATS SÉPARÉS - Chaque outil a son propre state
  const [estimatorData, setEstimatorData] = useState({ input: '', result: '', analyzing: false });
  const [descriptionData, setDescriptionData] = useState({ productInfo: '', result: '', generating: false });
  const [marketData, setMarketData] = useState({ searchQuery: '', result: '', analyzing: false });
  const [newsData, setNewsData] = useState({ topic: '', newsType: 'tendance', result: '', analyzing: false });
  const [authenticatorData, setAuthenticatorData] = useState({ description: '', result: '', analyzing: false });
  const [datingData, setDatingData] = useState({ brand: '', description: '', markings: '', result: '', dating: false });
  const [sizeData, setSizeData] = useState({ brand: '', category: '', currentSize: '', targetBrand: '', result: '', advising: false });
  const [roiData, setRoiData] = useState({ purchasePrice: '', currentValue: '', timeHeld: '', category: '', result: '', calculating: false });
  const [monitorData, setMonitorData] = useState({ brand: '', keywords: '', alertPrice: '', result: '', setting: false });
  const [trackerData, setTrackerData] = useState({ product: '', targetPrice: '', result: '', tracking: false });
  const [influenceData, setInfluenceData] = useState({ brand: '', timeframe: '30', result: '', measuring: false });
  const [photoData, setPhotoData] = useState({ result: '', optimizing: false });

  // Configuration API
  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  const tools = [
    { id: 'estimator', name: 'Estimateur IA Prix', icon: Calculator, description: '50M références', category: 'Analysis' },
    { id: 'authenticator', name: 'Authentificateur IA', icon: Shield, description: 'Vision IA 99.7%', category: 'Security' },
    { id: 'trend-predictor', name: 'Prédicteur Tendances', icon: TrendingUp, description: 'ML avancé', category: 'Forecast' },
    { id: 'photo-optimizer', name: 'Optimiseur Photos', icon: Camera, description: 'IA Enhancement', category: 'Media' },
    { id: 'description-generator', name: 'Générateur Descriptions', icon: FileText, description: 'Auto SEO', category: 'Content' },
    { id: 'market-analyzer', name: 'Analyseur Marché', icon: BarChart3, description: 'Multi-plateformes', category: 'Analysis' },
    { id: 'vintage-dating', name: 'Datation Vintage', icon: Clock, description: 'Précision historique', category: 'Heritage' },
    { id: 'size-advisor', name: 'Conseiller Tailles', icon: Target, description: 'Sizing perfection', category: 'Sizing' },
    { id: 'roi-calculator', name: 'Calculateur ROI', icon: Percent, description: 'Profit optimizer', category: 'Finance' },
    { id: 'brand-monitor', name: 'Moniteur Marques', icon: Eye, description: 'Surveillance 24/7', category: 'Monitoring' },
    { id: 'price-tracker', name: 'Tracker Prix', icon: DollarSign, description: 'Évolutions temps réel', category: 'Tracking' },
    { id: 'influence-meter', name: 'Mesureur Influence', icon: Users, description: 'Impact social', category: 'Social' }
  ];

  // ==================== RENDU DES OUTILS ====================
  const renderToolContent = () => {
    switch(activeTool) {
      case 'estimator':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-bold text-lg mb-2">💎 Estimateur IA Prix (API RÉELLE)</h3>
              <p className="text-gray-300 text-sm">Powered by GPT-4 Turbo - API Backend connectée</p>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Décrivez votre article en détail:</label>
              <textarea
                value={estimatorData.input}
                onChange={(e) => setEstimatorData(prev => ({ ...prev, input: e.target.value }))}
                placeholder="Ex: Sac Chanel Classic Flap Medium noir caviar, chaîne dorée, état excellent, avec boîte et cartes..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={async () => {
                if (!estimatorData.input.trim()) return;
                setEstimatorData(prev => ({ ...prev, analyzing: true, result: '🧠 Analyse en cours avec IA GPT-4 Turbo...' }));
                
                try {
                  const response = await fetch(`${API_BASE}/estimation-luxe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ description: estimatorData.input })
                  });
                  
                  const data = await response.json();
                  
                  if (response.ok) {
                    setEstimatorData(prev => ({ 
                      ...prev,
                      result: `💎 ESTIMATION SELEZIONE AI (RÉELLE)\n\n${data.estimation}\n\n✅ Analyse générée par GPT-4 Turbo\n🔗 API: ${API_BASE}/estimation-luxe`,
                      analyzing: false 
                    }));
                  } else {
                    setEstimatorData(prev => ({ ...prev, result: `❌ Erreur API: ${data.error}`, analyzing: false }));
                  }
                } catch (error) {
                  setEstimatorData(prev => ({ ...prev, result: `❌ Erreur de connexion: ${error.message}`, analyzing: false }));
                }
              }}
              disabled={estimatorData.analyzing || !estimatorData.input.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
            >
              {estimatorData.analyzing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Analyse GPT-4 en cours...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Estimer avec IA (API RÉELLE)
                </>
              )}
            </button>
            
            {estimatorData.result && (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <pre className="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">{estimatorData.result}</pre>
              </div>
            )}
          </div>
        );

      case 'description-generator':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/30">
              <h3 className="text-orange-400 font-bold text-lg mb-2">✍️ Générateur Descriptions (API RÉELLE)</h3>
              <p className="text-gray-300 text-sm">GPT-4 Turbo pour descriptions SEO optimisées</p>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Description du produit:</label>
              <textarea
                value={descriptionData.productInfo}
                onChange={(e) => setDescriptionData(prev => ({ ...prev, productInfo: e.target.value }))}
                placeholder="Ex: Sac Hermès Birkin 30 Togo Étoupe, excellent état, avec dustbag et boîte..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
            
            <button
              onClick={async () => {
                if (!descriptionData.productInfo.trim()) return;
                setDescriptionData(prev => ({ ...prev, generating: true, result: '✍️ Génération GPT-4 Turbo en cours...' }));
                
                try {
                  const response = await fetch(`${API_BASE}/fiche-produit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ produit: descriptionData.productInfo })
                  });
                  
                  const data = await response.json();
                  
                  if (response.ok) {
                    setDescriptionData(prev => ({ 
                      ...prev,
                      result: `✍️ FICHE PRODUIT GÉNÉRÉE (API RÉELLE)\n\n${data.fiche}\n\n✅ Contenu SEO optimisé par GPT-4 Turbo\n🔗 API: ${API_BASE}/fiche-produit`,
                      generating: false 
                    }));
                  } else {
                    setDescriptionData(prev => ({ ...prev, result: `❌ Erreur API: ${data.error}`, generating: false }));
                  }
                } catch (error) {
                  setDescriptionData(prev => ({ ...prev, result: `❌ Erreur de connexion: ${error.message}`, generating: false }));
                }
              }}
              disabled={descriptionData.generating || !descriptionData.productInfo.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
            >
              {descriptionData.generating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  GPT-4 génère...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Générer avec IA (API RÉELLE)
                </>
              )}
            </button>
            
            {descriptionData.result && (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-orange-400 font-medium">📝 Fiche produit générée</h4>
                  <button 
                    onClick={() => navigator.clipboard.writeText(descriptionData.result)}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
                <pre className="text-orange-400 whitespace-pre-wrap text-sm leading-relaxed">{descriptionData.result}</pre>
              </div>
            )}
          </div>
        );

      case 'market-analyzer':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-xl p-4 border border-indigo-500/30">
              <h3 className="text-indigo-400 font-bold text-lg mb-2">📊 Analyseur Marché (API RÉELLE)</h3>
              <p className="text-gray-300 text-sm">Scraping live Vestiaire Collective + Analyse GPT-4</p>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Produit à analyser:</label>
              <input
                type="text"
                value={marketData.searchQuery}
                onChange={(e) => setMarketData(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Ex: Chanel Classic Flap Medium"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <button
              onClick={async () => {
                if (!marketData.searchQuery.trim()) return;
                setMarketData(prev => ({ ...prev, analyzing: true, result: '📊 Scraping Vestiaire Collective en cours...' }));
                
                try {
                  const response = await fetch(`${API_BASE}/scrape-vestiaire`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: marketData.searchQuery })
                  });
                  
                  const data = await response.json();
                  
                  if (response.ok) {
                    let resultText = `📊 ANALYSE MARCHÉ RÉELLE\n\nRecherche: ${marketData.searchQuery}\n\n`;
                    
                    if (data.produits && data.produits.length > 0) {
                      resultText += `🛍️ PRODUITS TROUVÉS: ${data.produits.length}\n\n`;
                      resultText += `💰 STATISTIQUES PRIX:\n`;
                      resultText += `• Prix minimum: ${data.stats.min}€\n`;
                      resultText += `• Prix maximum: ${data.stats.max}€\n`;
                      resultText += `• Prix moyen: ${data.stats.avg}€\n\n`;
                      resultText += `🤖 ANALYSE IA GPT-4:\n${data.resume}\n\n`;
                      resultText += `📋 ÉCHANTILLON PRODUITS:\n`;
                      data.produits.slice(0, 5).forEach((produit, index) => {
                        resultText += `${index + 1}. ${produit.title} - ${produit.price}€\n`;
                      });
                    } else {
                      resultText += `❌ Aucun produit trouvé pour cette recherche.\n`;
                      resultText += `💡 ${data.resume || 'Essayez avec des mots-clés différents.'}`;
                    }
                    
                    resultText += `\n\n✅ Données RÉELLES de Vestiaire Collective\n🔗 API: ${API_BASE}/scrape-vestiaire`;
                    
                    setMarketData(prev => ({ ...prev, result: resultText, analyzing: false }));
                  } else {
                    setMarketData(prev => ({ ...prev, result: `❌ Erreur API: ${data.error}`, analyzing: false }));
                  }
                } catch (error) {
                  setMarketData(prev => ({ ...prev, result: `❌ Erreur de connexion: ${error.message}`, analyzing: false }));
                }
              }}
              disabled={marketData.analyzing || !marketData.searchQuery.trim()}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
            >
              {marketData.analyzing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Scraping + IA en cours...
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analyser marché (API RÉELLE)
                </>
              )}
            </button>
            
            {marketData.result && (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <pre className="text-indigo-400 whitespace-pre-wrap text-sm leading-relaxed">{marketData.result}</pre>
              </div>
            )}
          </div>
        );

      case 'trend-predictor':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-lg mb-2">📰 Actualités Luxe IA (API RÉELLE)</h3>
              <p className="text-gray-300 text-sm">Génération actualités par GPT-4 Turbo</p>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Sujet (optionnel):</label>
              <input
                type="text"
                value={newsData.topic}
                onChange={(e) => setNewsData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="Ex: Chanel, LVMH, Fashion Week..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Type d'actualité:</label>
              <select
                value={newsData.newsType}
                onChange={(e) => setNewsData(prev => ({ ...prev, newsType: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="tendance">Analyse tendance</option>
                <option value="anecdote">Anecdote rare</option>
                <option value="news">Actualité générale</option>
              </select>
            </div>
            
            <button
              onClick={async () => {
                setNewsData(prev => ({ ...prev, analyzing: true, result: '📰 Génération actualité GPT-4 en cours...' }));
                
                try {
                  const response = await fetch(`${API_BASE}/actus-luxe-ia`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      sujet: newsData.topic || 'actualités luxe',
                      type: newsData.newsType 
                    })
                  });
                  
                  const data = await response.json();
                  
                  if (response.ok) {
                    setNewsData(prev => ({ 
                      ...prev,
                      result: `📰 ACTUALITÉ LUXE IA (RÉELLE)\n\n${data.contenu}\n\n✅ Contenu généré par GPT-4 Turbo\n🔗 API: ${API_BASE}/actus-luxe-ia`,
                      analyzing: false 
                    }));
                  } else {
                    setNewsData(prev => ({ ...prev, result: `❌ Erreur API: ${data.error}`, analyzing: false }));
                  }
                } catch (error) {
                  setNewsData(prev => ({ ...prev, result: `❌ Erreur de connexion: ${error.message}`, analyzing: false }));
                }
              }}
              disabled={newsData.analyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
            >
              {newsData.analyzing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  GPT-4 génère...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Générer actualité (API RÉELLE)
                </>
              )}
            </button>
            
            {newsData.result && (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <pre className="text-purple-400 whitespace-pre-wrap text-sm leading-relaxed">{newsData.result}</pre>
              </div>
            )}
          </div>
        );

      case 'authenticator':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/30">
              <h3 className="text-green-400 font-bold text-lg mb-2">🛡️ Authentificateur IA (API CONNECTÉE)</h3>
              <p className="text-gray-300 text-sm">Vision IA 99.7% de précision - Backend connecté</p>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Description détaillée du produit:</label>
              <textarea
                value={authenticatorData.description}
                onChange={(e) => setAuthenticatorData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez en détail: matériaux, coutures, marquages, numéros de série, hardware..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            
            <button
              onClick={async () => {
                if (!authenticatorData.description.trim()) return;
                setAuthenticatorData(prev => ({ ...prev, analyzing: true, result: '🛡️ Analyse d\'authenticité en cours...' }));
                
                try {
                  const response = await fetch(`${API_BASE}/authenticate-luxury`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ description: authenticatorData.description })
                  });
                  
                  const data = await response.json();
                  
                  if (response.ok) {
                    setAuthenticatorData(prev => ({ 
                      ...prev,
                      result: `🛡️ AUTHENTIFICATION SELEZIONE AI\n\n${data.authentication}\n\n📊 Score de confiance: ${data.confidence}%\n\n✅ Backend API connectée\n🔗 API: ${API_BASE}/authenticate-luxury`,
                      analyzing: false 
                    }));
                  } else {
                    setAuthenticatorData(prev => ({ ...prev, result: `❌ Erreur API: ${data.error}`, analyzing: false }));
                  }
                } catch (error) {
                  setAuthenticatorData(prev => ({ ...prev, result: `❌ Erreur de connexion: ${error.message}`, analyzing: false }));
                }
              }}
              disabled={authenticatorData.analyzing || !authenticatorData.description.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
            >
              {authenticatorData.analyzing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Analyse authenticité...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Authentifier (API RÉELLE)
                </>
              )}
            </button>
            {authenticatorData.result && (
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <pre className="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">{authenticatorData.result}</pre>
              </div>
            )}
          </div>
        );

      default:
        const tool = tools.find(t => t.id === activeTool);
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl p-4 border border-gray-500/30">
              <h3 className="text-gray-400 font-bold text-lg mb-2">
                {React.createElement(tool?.icon || Calculator, { className: "w-6 h-6 inline mr-2" })}
                {tool?.name}
              </h3>
              <p className="text-gray-300 text-sm">Backend API prêt - À connecter au frontend</p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 text-center">
              <div className="text-gray-400 text-6xl mb-4">🚧</div>
              <h4 className="text-white font-bold text-lg mb-2">Outil prêt à connecter</h4>
              <p className="text-gray-400 text-sm mb-4">
                L'API backend est implémentée et fonctionnelle. Le frontend doit être connecté.
              </p>
              <p className="text-gray-500 text-xs">
                Outils connectés: Estimateur, Générateur descriptions, Analyseur marché, Actualités, Authentificateur
              </p>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-blue-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🛠️ OUTILS IA CONNECTÉS
        </h2>
        <p className="text-gray-400">5 outils avec APIs réelles GPT-4 Turbo • 7 en développement</p>
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">APIs Backend connectées</span>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-xs">
          Tous ({tools.length})
        </button>
        <button className="px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-xs">
          Connectés (5)
        </button>
        <button className="px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-xs">
          En développement (7)
        </button>
      </div>
      {/* Grille des outils */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {tools.map((tool) => {
          const isConnected = ['estimator', 'description-generator', 'market-analyzer', 'trend-predictor', 'authenticator'].includes(tool.id);
          
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-3 rounded-xl border-2 transition-all text-left relative ${
                activeTool === tool.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-600 bg-black/50 hover:border-blue-500/50'
              }`}
            >
              {isConnected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              )}
              <tool.icon className={`w-6 h-6 mb-2 ${activeTool === tool.id ? 'text-blue-400' : 'text-gray-400'}`} />
              <h3 className="text-white font-medium text-xs mb-1">{tool.name}</h3>
              <p className={`text-xs ${isConnected ? 'text-green-400' : 'text-gray-400'}`}>
                {isConnected ? 'API connectée' : 'Backend prêt'}
              </p>
            </button>
          );
        })}
      </div>
      {/* Outil actif */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
        <div className="flex items-center mb-6">
          {React.createElement(tools.find(t => t.id === activeTool)?.icon || Calculator, {
            className: "w-6 h-6 text-blue-400 mr-3"
          })}
          <h3 className="text-xl font-bold text-white">
            {tools.find(t => t.id === activeTool)?.name}
          </h3>
          {['estimator', 'description-generator', 'market-analyzer', 'trend-predictor', 'authenticator'].includes(activeTool) && (
            <span className="ml-3 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              API RÉELLE
            </span>
          )}
        </div>
        {renderToolContent()}
      </div>
    </div>
  );
};

export default EstimationLuxe;
