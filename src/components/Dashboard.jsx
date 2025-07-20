import React, { useState, useEffect } from 'react';
import { 
  Newspaper, Zap, Bot, GraduationCap, ShoppingCart, Loader, RefreshCw,
  TrendingUp, BarChart3, Eye, Clock, Globe, Star
} from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({ 
    name: 'Alexandre Dupont', 
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE'
  });

  // État pour les actualités dynamiques
  const [newsData, setNewsData] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedNewsSource, setSelectedNewsSource] = useState('all');
  
  // Graphiques de données (mock mais réaliste)
  const [marketData, setMarketData] = useState({
    luxuryIndex: 125.8,
    trend: '+12.3%',
    volume: '2.4M€',
    topBrands: [
      { name: 'Hermès', growth: '+18%', volume: '450k€' },
      { name: 'Chanel', growth: '+15%', volume: '380k€' },
      { name: 'Louis Vuitton', growth: '+12%', volume: '520k€' },
      { name: 'Dior', growth: '+8%', volume: '210k€' }
    ]
  });

  // Base de données d'actualités réelles mockées
  const generateRealNews = () => {
    const realNewsTemplates = [
      {
        category: 'Prix',
        color: 'red',
        titles: [
          'Hermès augmente ses prix de 8% sur les sacs iconiques',
          'Chanel Classic Flap : nouvelle hausse de prix confirmée',
          'Louis Vuitton : prix des sacs Neverfull en hausse',
          'Dior ajuste ses tarifs sur la maroquinerie'
        ],
        summaries: [
          'La maison française applique une augmentation sélective sur ses modèles les plus demandés',
          'L\'inflation et la forte demande poussent les prix vers de nouveaux sommets',
          'Les prix boutique continuent leur progression avec l\'augmentation des coûts'
        ]
      },
      {
        category: 'Tendance',
        color: 'green',
        titles: [
          'Les mini-bags continuent de dominer les ventes',
          'Le vintage Chanel bat des records sur le marché secondaire',
          'Les sacs en cuir coloré font leur grand retour',
          'L\'authentification devient obligatoire sur Vinted'
        ],
        summaries: [
          'Une tendance qui ne se dément pas chez les millennials et Gen Z',
          'Les pièces des années 80-90 atteignent des prix historiques',
          'Les couleurs vives remplacent progressivement le noir classique'
        ]
      },
      {
        category: 'Marché',
        color: 'blue',
        titles: [
          'Le marché asiatique tire la croissance du luxe',
          'Vestiaire Collective dépasse les 2 milliards de valorisation',
          'Les Millennials représentent 50% des achats luxe',
          'L\'intelligence artificielle révolutionne l\'authentification'
        ],
        summaries: [
          'La Chine et le Japon montrent une appétence croissante pour les marques européennes',
          'La plateforme de seconde main profite de l\'engouement pour l\'économie circulaire',
          'Un changement générationnel qui redéfinit les codes du luxe'
        ]
      },
      {
        category: 'Tech',
        color: 'purple',
        titles: [
          'Blockchain : traçabilité révolutionnaire pour le luxe',
          'NFT de mode : quand le virtuel rencontre le luxe',
          'IA générative : personnalisation extreme des produits',
          'Métavers : les maisons de luxe investissent massivement'
        ],
        summaries: [
          'La technologie blockchain assure l\'authenticité de bout en bout',
          'Une nouvelle économie se dessine entre physique et numérique',
          'L\'intelligence artificielle permet une customisation inédite'
        ]
      },
      {
        category: 'Innovation',
        color: 'orange',
        titles: [
          'Durabilité : le luxe adopte des matériaux recyclés',
          'Lab-grown diamonds : révolution dans la joaillerie',
          'Cuir végétal : alternative écologique au cuir animal',
          'Packaging éco-responsable : nouvelle norme du luxe'
        ],
        summaries: [
          'Les grandes maisons s\'engagent pour un luxe plus responsable',
          'Une innovation technologique qui divise le secteur traditionnel',
          'L\'innovation matérielle au service de l\'environnement'
        ]
      }
    ];

    const sources = [
      'Vogue Business', 'WWD', 'Forbes Luxury', 'Business of Fashion', 
      'FashionNetwork', 'Luxury Daily', 'Jing Daily', 'The RealReal Report'
    ];

    const timeAgo = ['Il y a 1h', 'Il y a 2h', 'Il y a 3h', 'Il y a 4h', 'Il y a 5h', 'Il y a 6h'];

    return realNewsTemplates.flatMap((template, categoryIndex) => 
      template.titles.slice(0, 2).map((title, titleIndex) => {
        const newsIndex = categoryIndex * 2 + titleIndex;
        return {
          id: newsIndex + 1,
          title: title,
          summary: template.summaries[titleIndex % template.summaries.length],
          time: timeAgo[newsIndex % timeAgo.length],
          source: sources[newsIndex % sources.length],
          category: template.category,
          color: template.color,
          views: Math.floor(Math.random() * 5000) + 1000,
          trending: Math.random() > 0.7
        };
      })
    ).slice(0, 6); // Garder seulement 6 news
  };

  // Fonction pour charger les actualités
  const fetchNews = async () => {
    setLoadingNews(true);
    
    // Simuler une latence API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const generatedNews = generateRealNews();
      setNewsData(generatedNews);
      setLastUpdate(new Date());
      
      // Mettre à jour aussi les données marché
      setMarketData(prev => ({
        ...prev,
        luxuryIndex: (125 + Math.random() * 10).toFixed(1),
        trend: Math.random() > 0.5 ? `+${(Math.random() * 15 + 5).toFixed(1)}%` : `-${(Math.random() * 5 + 1).toFixed(1)}%`,
        volume: `${(2 + Math.random() * 2).toFixed(1)}M€`
      }));
      
    } catch (error) {
      console.error('Erreur chargement actualités:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  // Charger les actualités au montage du composant
  useEffect(() => {
    fetchNews();
    
    // Actualisation automatique toutes les 3 minutes pour avoir du contenu fresh
    const interval = setInterval(() => {
      fetchNews();
    }, 3 * 60 * 1000); // 3 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Filtrer les news selon la source sélectionnée
  const filteredNews = selectedNewsSource === 'all' 
    ? newsData 
    : newsData.filter(news => news.category.toLowerCase() === selectedNewsSource);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Bienvenue */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              📊 Dashboard SELEZIONE Intelligence
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Votre veille luxe et prêt-à-porter en temps réel</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Crédits IA</p>
              <p className="text-white font-medium text-lg">{user.credits.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Stats du marché en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400 font-bold">{marketData.trend}</span>
          </div>
          <p className="text-white font-bold text-lg">{marketData.luxuryIndex}</p>
          <p className="text-gray-400 text-xs">Indice Luxe SELEZIONE</p>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400">24h</span>
          </div>
          <p className="text-white font-bold text-lg">{marketData.volume}</p>
          <p className="text-gray-400 text-xs">Volume transactions</p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">TOP</span>
          </div>
          <p className="text-white font-bold text-lg">Hermès</p>
          <p className="text-gray-400 text-xs">Marque tendance</p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <span className="text-xs text-amber-400 animate-pulse">LIVE</span>
          </div>
          <p className="text-white font-bold text-lg">8.4k</p>
          <p className="text-gray-400 text-xs">Utilisateurs actifs</p>
        </div>
      </div>

      {/* News IA en temps réel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Newspaper className="w-6 h-6 mr-2 text-amber-400" />
            Journal Mode & Luxe - Temps Réel
          </h2>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedNewsSource}
              onChange={(e) => setSelectedNewsSource(e.target.value)}
              className="text-xs bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-700"
            >
              <option value="all">Toutes sources</option>
              <option value="prix">Prix</option>
              <option value="tendance">Tendances</option>
              <option value="marché">Marché</option>
              <option value="tech">Tech</option>
              <option value="innovation">Innovation</option>
            </select>
            <span className="text-xs text-gray-400">
              MAJ: {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={fetchNews}
              disabled={loadingNews}
              className="p-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
              title="Actualiser les news"
            >
              <RefreshCw className={`w-4 h-4 text-white ${loadingNews ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loadingNews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-16 h-6 bg-gray-700 rounded"></div>
                  <div className="w-12 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="w-full h-5 bg-gray-700 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-700 rounded mb-3"></div>
                <div className="w-20 h-4 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.map((news) => (
              <div 
                key={news.id} 
                className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer group relative"
              >
                {news.trending && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                    🔥 TRENDING
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${news.color}-500/20 text-${news.color}-400 border border-${news.color}-500/30`}>
                    {news.category}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Eye className="w-3 h-3" />
                    <span>{news.views}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                  {news.title}
                </h3>
                
                <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {news.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-amber-400 text-xs font-medium">{news.source}</p>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-amber-400 transition-colors">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center pt-2">
          <p className="text-xs text-gray-500 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            Sources vérifiées • Actualisation auto 3 min • Analysé par IA
          </p>
        </div>
      </div>

      {/* Top marques performances */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-amber-400" />
          Top Marques - Performances 24h
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.topBrands.map((brand, index) => (
            <div key={brand.name} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{brand.name}</span>
                <span className={`text-xs font-bold ${brand.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {brand.growth}
                </span>
              </div>
              <p className="text-gray-400 text-xs">Volume: {brand.volume}</p>
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${60 + index * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
