import React, { useState } from 'react';
import { 
  Calculator, Shield, TrendingUp, Camera, FileText, BarChart3, 
  Clock, Target, Percent, Eye, DollarSign, Users, Upload, Loader,
  Download, Copy, CheckCircle, AlertCircle, Star, Zap
} from 'lucide-react';

const EstimationLuxe = () => {
  const [activeTool, setActiveTool] = useState('estimator');
  const [toolResults, setToolResults] = useState({});

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

  const categories = [...new Set(tools.map(t => t.category))];

  // ==================== OUTIL 1: ESTIMATEUR IA PRIX (API RÉELLE) ====================
  const EstimatorTool = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    const analyze = async () => {
      if (!input.trim()) return;
      setAnalyzing(true);
      setResult('🧠 Analyse en cours avec IA GPT-4 Turbo...');
      
      try {
        const response = await fetch(`${API_BASE}/estimation-luxe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: input })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setResult(`💎 ESTIMATION SELEZIONE AI (RÉELLE)\n\n${data.estimation}\n\n✅ Analyse générée par GPT-4 Turbo\n🔗 API: ${API_BASE}/estimation-luxe`);
        } else {
          setResult(`❌ Erreur API: ${data.error}`);
        }
      } catch (error) {
        setResult(`❌ Erreur de connexion: ${error.message}`);
      }
      
      setAnalyzing(false);
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/30">
          <h3 className="text-blue-400 font-bold text-lg mb-2">💎 Estimateur IA Prix (API RÉELLE)</h3>
          <p className="text-gray-300 text-sm">Powered by GPT-4 Turbo - API Backend connectée</p>
        </div>
        
        <div>
          <label className="block text-white font-medium mb-2">Décrivez votre article en détail:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Sac Chanel Classic Flap Medium noir caviar, chaîne dorée, état excellent, avec boîte et cartes..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm"
          />
        </div>
        
        <button
          onClick={analyze}
          disabled={analyzing || !input.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
        >
          {analyzing ? (
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
        
        {result && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <pre className="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    );
  };

  // ==================== OUTIL 2: GÉNÉRATEUR DESCRIPTIONS (API RÉELLE) ====================
  const DescriptionGeneratorTool = () => {
    const [productInfo, setProductInfo] = useState('');
    const [result, setResult] = useState('');
    const [generating, setGenerating] = useState(false);

    const generateDescription = async () => {
      if (!productInfo.trim()) return;
      setGenerating(true);
      setResult('✍️ Génération GPT-4 Turbo en cours...');
      
      try {
        const response = await fetch(`${API_BASE}/fiche-produit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ produit: productInfo })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setResult(`✍️ FICHE PRODUIT GÉNÉRÉE (API RÉELLE)\n\n${data.fiche}\n\n✅ Contenu SEO optimisé par GPT-4 Turbo\n🔗 API: ${API_BASE}/fiche-produit`);
        } else {
          setResult(`❌ Erreur API: ${data.error}`);
        }
      } catch (error) {
        setResult(`❌ Erreur de connexion: ${error.message}`);
      }
      
      setGenerating(false);
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/30">
          <h3 className="text-orange-400 font-bold text-lg mb-2">✍️ Générateur Descriptions (API RÉELLE)</h3>
          <p className="text-gray-300 text-sm">GPT-4 Turbo pour descriptions SEO optimisées</p>
        </div>
        
        <div>
          <label className="block text-white font-medium mb-2">Description du produit:</label>
          <textarea
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            placeholder="Ex: Sac Hermès Birkin 30 Togo Étoupe, excellent état, avec dustbag et boîte..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm"
          />
        </div>
        
        <button
          onClick={generateDescription}
          disabled={generating || !productInfo.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
        >
          {generating ? (
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
        
        {result && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-orange-400 font-medium">📝 Fiche produit générée</h4>
              <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Copy className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            <pre className="text-orange-400 whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    );
  };

  // ==================== OUTIL 3: ANALYSEUR MARCHÉ (API RÉELLE) ====================
  const MarketAnalyzerTool = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    const analyzeMarket = async () => {
      if (!searchQuery.trim()) return;
      setAnalyzing(true);
      setResult('📊 Scraping Vestiaire Collective en cours...');
      
      try {
        const response = await fetch(`${API_BASE}/scrape-vestiaire`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchQuery })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          let resultText = `📊 ANALYSE MARCHÉ RÉELLE\n\nRecherche: ${searchQuery}\n\n`;
          
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
          
          setResult(resultText);
        } else {
          setResult(`❌ Erreur API: ${data.error}`);
        }
      } catch (error) {
        setResult(`❌ Erreur de connexion: ${error.message}`);
      }
      
      setAnalyzing(false);
    };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ex: Chanel Classic Flap Medium"
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm"
          />
        </div>
        
        <button
          onClick={analyzeMarket}
          disabled={analyzing || !searchQuery.trim()}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
        >
          {analyzing ? (
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
        
        {result && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <pre className="text-indigo-400 whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    );
  };

  // ==================== OUTIL 4: ACTUALITÉS LUXE (API RÉELLE) ====================
  const NewsAnalyzerTool = () => {
    const [topic, setTopic] = useState('');
    const [newsType, setNewsType] = useState('tendance');
    const [result, setResult] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    const analyzeNews = async () => {
      setAnalyzing(true);
      setResult('📰 Génération actualité GPT-4 en cours...');
      
      try {
        const response = await fetch(`${API_BASE}/actus-luxe-ia`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            sujet: topic || 'actualités luxe',
            type: newsType 
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setResult(`📰 ACTUALITÉ LUXE IA (RÉELLE)\n\n${data.contenu}\n\n✅ Contenu généré par GPT-4 Turbo\n🔗 API: ${API_BASE}/actus-luxe-ia`);
        } else {
          setResult(`❌ Erreur API: ${data.error}`);
        }
      } catch (error) {
        setResult(`❌ Erreur de connexion: ${error.message}`);
      }
      
      setAnalyzing(false);
    };

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
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Chanel, LVMH, Fashion Week..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Type d'actualité:</label>
          <select
            value={newsType}
            onChange={(e) => setNewsType(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
          >
            <option value="tendance">Analyse tendance</option>
            <option value="anecdote">Anecdote rare</option>
            <option value="news">Actualité générale</option>
          </select>
        </div>
        
        <button
          onClick={analyzeNews}
          disabled={analyzing}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
        >
          {analyzing ? (
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
        
        {result && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <pre className="text-purple-400 whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    );
  };

  // ==================== AUTRES OUTILS (À COMPLÉTER) ====================
  const DefaultTool = ({ toolName, toolIcon, toolColor }) => (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r from-${toolColor}-500/10 to-${toolColor}-600/10 rounded-xl p-4 border border-${toolColor}-500/30`}>
        <h3 className={`text-${toolColor}-400 font-bold text-lg mb-2`}>
          {React.createElement(toolIcon, { className: "w-6 h-6 inline mr-2" })}
          {toolName}
        </h3>
        <p className="text-gray-300 text-sm">API en cours de développement</p>
      </div>
      
      <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 text-center">
        <div className={`text-${toolColor}-400 text-6xl mb-4`}>🚧</div>
        <h4 className="text-white font-bold text-lg mb-2">Outil en développement</h4>
        <p className="text-gray-400 text-sm mb-4">
          Cet outil sera bientôt connecté à une API backend réelle.
        </p>
        <p className="text-gray-500 text-xs">
          Vous pouvez déjà utiliser: Estimateur, Générateur descriptions, Analyseur marché et Actualités
        </p>
      </div>
    </div>
  );

  // ==================== RENDU OUTIL ACTIF ====================
  const renderTool = () => {
    const tool = tools.find(t => t.id === activeTool);
    
    switch(activeTool) {
      case 'estimator':
        return <EstimatorTool />;
      case 'description-generator':
        return <DescriptionGeneratorTool />;
      case 'market-analyzer':
        return <MarketAnalyzerTool />;
      case 'trend-predictor':
        return <NewsAnalyzerTool />;
      default:
        return <DefaultTool toolName={tool?.name} toolIcon={tool?.icon} toolColor="gray" />;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-blue-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🛠️ OUTILS IA CONNECTÉS
        </h2>
        <p className="text-gray-400">4 outils avec APIs réelles GPT-4 Turbo • 8 en développement</p>
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
          Connectés (4)
        </button>
        <button className="px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-xs">
          En développement (8)
        </button>
      </div>

      {/* Grille des outils */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {tools.map((tool) => {
          const isConnected = ['estimator', 'description-generator', 'market-analyzer', 'trend-predictor'].includes(tool.id);
          
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
                {isConnected ? 'API connectée' : tool.description}
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
          {['estimator', 'description-generator', 'market-analyzer', 'trend-predictor'].includes(activeTool) && (
            <span className="ml-3 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              API RÉELLE
            </span>
          )}
        </div>
        {renderTool()}
      </div>
    </div>
  );
};

export default EstimationLuxe;
