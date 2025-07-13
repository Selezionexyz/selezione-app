import React, { useState, useEffect } from 'react';
import { 
  Newspaper, Zap, Bot, GraduationCap, ShoppingCart, Loader, RefreshCw 
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
  
  // Configuration API
  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  // Fonction pour générer des actualités via l'API
  const fetchNews = async () => {
    setLoadingNews(true);
    
    try {
      // Générer 3 actualités avec des sujets variés
      const newsPromises = [
        fetch(`${API_BASE}/actus-luxe-ia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sujet: ['Chanel', 'Hermès', 'Louis Vuitton', 'Dior', 'Gucci'][Math.floor(Math.random() * 5)],
            type: 'news' 
          })
        }),
        fetch(`${API_BASE}/actus-luxe-ia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sujet: ['Fashion Week', 'Tendances', 'Collaborations', 'Innovation'][Math.floor(Math.random() * 4)],
            type: 'tendance' 
          })
        }),
        fetch(`${API_BASE}/actus-luxe-ia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sujet: ['Marché asiatique', 'Millennials', 'Métavers', 'Durabilité'][Math.floor(Math.random() * 4)],
            type: 'anecdote' 
          })
        })
      ];

      const responses = await Promise.all(newsPromises);
      const newsResults = await Promise.all(responses.map(r => r.json()));
      
      // Formatter les actualités
      const formattedNews = newsResults.map((result, index) => {
        // Extraire le titre et le résumé du contenu généré
        const content = result.contenu || '';
        const lines = content.split('\n').filter(line => line.trim());
        const title = lines[0]?.replace(/[📰🎯💡✨🌟]/g, '').trim() || 'Actualité Luxe';
        const summary = lines[1]?.substring(0, 80) + '...' || 'Nouvelle actualité du monde du luxe';
        
        const categories = ['Prix', 'Tendance', 'Tech', 'Marché', 'Innovation'];
        const colors = ['red', 'green', 'blue', 'purple', 'orange'];
        const sources = ['Vogue Business', 'WWD', 'Forbes', 'Business of Fashion', 'FashionNetwork'];
        
        return {
          id: index + 1,
          title: title,
          summary: summary,
          time: `Il y a ${Math.floor(Math.random() * 6) + 1}h`,
          source: sources[index % sources.length],
          category: categories[index % categories.length],
          color: colors[index % colors.length],
          fullContent: content
        };
      });

      setNewsData(formattedNews);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('Erreur chargement actualités:', error);
      // Données de fallback en cas d'erreur
      setNewsData([
        {
          id: 1,
          title: "Actualités temporairement indisponibles",
          summary: "Connexion à l'API en cours...",
          time: "Maintenant",
          source: "Système",
          category: "Info",
          color: "yellow"
        }
      ]);
    } finally {
      setLoadingNews(false);
    }
  };

  // Charger les actualités au montage du composant
  useEffect(() => {
    fetchNews();
    
    // Actualisation automatique toutes les 5 minutes
    const interval = setInterval(() => {
      fetchNews();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Fonction pour rafraîchir manuellement
  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Bienvenue */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              Bienvenue sur SELEZIONE
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Plateforme IA ultime pour le prêt-à-porter de luxe</p>
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

      {/* News IA en temps réel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Newspaper className="w-6 h-6 mr-2 text-amber-400" />
            Actualités Luxe IA - Temps Réel
          </h2>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400">
              Dernière MAJ: {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={handleRefresh}
              disabled={loadingNews}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              title="Actualiser les news"
            >
              <RefreshCw className={`w-4 h-4 text-gray-300 ${loadingNews ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loadingNews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
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
            {newsData.map((news) => (
              <div 
                key={news.id} 
                className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer group"
                onClick={() => {
                  // Optionnel: ouvrir un modal avec le contenu complet
                  if (news.fullContent) {
                    alert(news.fullContent);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${news.color}-500/20 text-${news.color}-400`}>
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-400">{news.time}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-amber-400 transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <p className="text-amber-400 text-xs font-medium">{news.source}</p>
                  <span className="text-xs text-gray-500 group-hover:text-amber-400">
                    Lire plus →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center pt-2">
          <p className="text-xs text-gray-500 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            Actualités générées par GPT-4 • Mise à jour auto toutes les 5 min
          </p>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'outils', label: 'Outils IA', icon: Zap, count: '12 outils' },
          { id: 'agents', label: 'Agents IA', icon: Bot, count: '3 experts' },
          { id: 'academy', label: 'Academy', icon: GraduationCap, count: '6 modules' },
          { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, count: 'B2B Pro' }
        ].map((action) => (
          <button
            key={action.id}
            className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-amber-500/50 transition-all group"
          >
            <action.icon className="w-8 h-8 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-sm mb-1">{action.label}</h3>
            <p className="text-gray-400 text-xs">{action.count}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
