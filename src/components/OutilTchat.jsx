import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Users, Crown, MessageCircle, Pin, Star, Image, File,
  Settings, Search, Bell, Hash, Plus, Smile, MoreVertical,
  Shield, Zap, Award, Target, AlertCircle, CheckCircle, Clock,
  Globe, Sparkles
} from 'lucide-react';

const OutilTchat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Récupération utilisateur connecté
  useEffect(() => {
    const savedUser = localStorage.getItem('selezione_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser({
        id: user.id || 'user_1',
        name: user.nom || user.name || 'Utilisateur',
        avatar: user.avatar || '👤',
        role: user.subscription || 'Membre',
        plan: user.plan || 'trial',
        verified: true
      });
    }
  }, []);

  // Canaux de discussion propres (prêts pour lancement)
  const channels = [
    { 
      id: 'announcements', 
      name: '📢 Annonces', 
      description: 'Annonces officielles SELEZIONE',
      locked: true,
      memberCount: 0,
      icon: '📢'
    },
    { 
      id: 'general', 
      name: '💬 Général', 
      description: 'Discussion générale luxe',
      locked: false,
      memberCount: 0,
      icon: '💬'
    },
    { 
      id: 'hermes', 
      name: '🧡 Hermès Club', 
      description: 'Spécialistes Hermès',
      locked: false,
      memberCount: 0,
      icon: '🧡'
    },
    { 
      id: 'chanel', 
      name: '⚪ Chanel Experts', 
      description: 'Communauté Chanel',
      locked: false,
      memberCount: 0,
      icon: '⚪'
    },
    { 
      id: 'marketplace', 
      name: '🛒 Marketplace B2B', 
      description: 'Achats/Ventes entre membres',
      locked: false,
      memberCount: 0,
      icon: '🛒'
    },
    { 
      id: 'authentification', 
      name: '🔍 Authentification', 
      description: 'Aide identification produits',
      locked: false,
      memberCount: 0,
      icon: '🔍'
    },
    { 
      id: 'trends', 
      name: '📈 Tendances', 
      description: 'Veille marché et trends',
      locked: false,
      memberCount: 0,
      icon: '📈'
    }
  ];

  // Messages de bienvenue pour chaque canal (prêt pour le lancement)
  const getWelcomeMessages = (channelId) => {
    const welcomeMessages = {
      announcements: [
        {
          id: 'welcome_ann',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '🏆',
            role: 'Système',
            verified: true
          },
          content: `🎉 **Bienvenue dans la Communauté SELEZIONE !**

Cette chaîne est réservée aux annonces officielles importantes :
• 🚀 Nouvelles fonctionnalités
• 📊 Mises à jour marché
• 🎯 Événements exclusifs
• ⚡ Alertes système

Restez connectés pour ne rien manquer ! 🔥`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ],
      general: [
        {
          id: 'welcome_gen',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '🏆',
            role: 'Système',
            verified: true
          },
          content: `💬 **Bienvenue dans le chat général !**

Ici vous pouvez :
• 🗣️ Discuter de luxe en général
• ❓ Poser vos questions
• 🤝 Faire connaissance avec la communauté
• 💡 Partager vos expériences

**Règles de base :**
✅ Respectez les autres membres
✅ Restez dans le thème du luxe
✅ Pas de spam ou pub externe
✅ Utilisez les bons canaux pour vos sujets

Bonne discussion ! 🎯`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ],
      hermes: [
        {
          id: 'welcome_her',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '🧡',
            role: 'Système',
            verified: true
          },
          content: `🧡 **Bienvenue au Hermès Club !**

La communauté dédiée aux passionnés Hermès :
• 👜 Discussions sacs iconiques (Birkin, Kelly, Constance...)
• 🏇 Histoire de la maison depuis 1837
• 🎨 Nouveautés collections et coloris
• 💰 Conseils investissement et revente
• 🔍 Authentification et expertise

**Sujet du jour :** Quelles sont vos couleurs Hermès préférées pour 2025 ? 🎨`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ],
      chanel: [
        {
          id: 'welcome_cha',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '⚪',
            role: 'Système',
            verified: true
          },
          content: `⚪ **Bienvenue chez les Experts Chanel !**

Le hub des connaisseurs Chanel :
• 👜 Classic Flap, Boy Bag, 19...
• 💎 Bijoux et montres Chanel
• ✨ Haute Couture et Ready-to-wear
• 📈 Évolution des prix et investissement
• 🔬 Tips d'authentification

**Focus :** Partagez vos plus belles pièces Chanel ! 📸`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ],
      marketplace: [
        {
          id: 'welcome_mar',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '🛒',
            role: 'Système',
            verified: true
          },
          content: `🛒 **Bienvenue sur la Marketplace B2B !**

Votre espace d'échange professionnel :
• 💼 Achats/Ventes entre membres vérifiés
• 📋 Demandes spécifiques de produits
• 🤝 Échanges et partenariats
• 💡 Opportunités business

**Règles importantes :**
✅ Membres vérifiés uniquement
✅ Photos obligatoires
✅ Prix transparents
✅ Pas d'arnaques tolérées

Bonnes affaires ! 💎`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ],
      authentification: [
        {
          id: 'welcome_auth',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '🔍',
            role: 'Système',
            verified: true
          },
          content: `🔍 **Bienvenue dans l'Espace Authentification !**

L'aide communautaire pour l'expertise :
• 📸 Postez vos photos pour authentification
• 👨‍🏫 Experts certifiés vous aident
• 📚 Guides d'authentification
• ⚠️ Alertes contrefaçons récentes

**Comment poster :**
1. Photos haute qualité (plusieurs angles)
2. Détails : série, hologramme, coutures
3. Marque et modèle si connus
4. Contexte d'achat

Entraide garantie ! 🛡️`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ],
      trends: [
        {
          id: 'welcome_trends',
          user: {
            id: 'system',
            name: 'SELEZIONE',
            avatar: '📈',
            role: 'Système',
            verified: true
          },
          content: `📈 **Bienvenue dans l'Observatoire des Tendances !**

Votre veille marché en temps réel :
• 🔥 Produits qui buzzent
• 📊 Évolutions de prix
• 🌍 Tendances globales vs locales
• 🎯 Prédictions marché
• 💡 Opportunités d'investissement

**Sources surveillées :**
• Instagram & TikTok
• Ventes aux enchères
• Fashion Weeks
• Célébrités & Influenceurs

Restez dans la course ! 🚀`,
          timestamp: new Date(),
          pinned: true,
          reactions: {}
        }
      ]
    };

    return welcomeMessages[channelId] || [];
  };

  // Charger les messages du canal actif
  useEffect(() => {
    setMessages(getWelcomeMessages(activeChannel));
    setOnlineUsers(currentUser ? [currentUser] : []);
  }, [activeChannel, currentUser]);

  const sendMessage = () => {
    if (!message.trim() || !currentUser) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      user: currentUser,
      content: message,
      timestamp: new Date(),
      pinned: false,
      reactions: {}
    };

    // STOCKAGE RÉEL dans localStorage pour persistance
    const channelKey = `selezione_chat_${activeChannel}`;
    const existingMessages = JSON.parse(localStorage.getItem(channelKey) || '[]');
    const updatedMessages = [...existingMessages, newMessage];
    localStorage.setItem(channelKey, JSON.stringify(updatedMessages));

    setMessages(updatedMessages);
    setMessage('');
  };

  // CHARGER messages réels au changement de canal
  useEffect(() => {
    const channelKey = `selezione_chat_${activeChannel}`;
    const storedMessages = JSON.parse(localStorage.getItem(channelKey) || '[]');
    const welcomeMessages = getWelcomeMessages(activeChannel);
    
    // Combiner messages système + messages utilisateurs
    const allMessages = [...welcomeMessages, ...storedMessages];
    setMessages(allMessages);
  }, [activeChannel]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex">
      
      {/* Sidebar - Liste des canaux */}
      <div className="w-80 bg-gray-900/50 border-r border-gray-700 flex flex-col">
        
        {/* Header Community */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Community Chat
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Rejoignez la conversation • {onlineUsers.length} membre{onlineUsers.length > 1 ? 's' : ''} connecté{onlineUsers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Liste des canaux */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  activeChannel === channel.id
                    ? 'bg-purple-500/20 border border-purple-500/30'
                    : 'hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{channel.icon}</span>
                    <span className="font-medium text-white">{channel.name}</span>
                    {channel.locked && <Shield className="w-4 h-4 text-amber-400" />}
                  </div>
                  <span className="text-xs text-gray-500">{channel.memberCount}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{channel.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Utilisateurs en ligne */}
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            En ligne ({onlineUsers.length})
          </h3>
          <div className="space-y-2">
            {onlineUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-lg">{user.avatar}</span>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone principale de chat */}
      <div className="flex-1 flex flex-col">
        
        {/* Header du canal actif */}
        <div className="p-4 border-b border-gray-700 bg-gray-900/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{channels.find(c => c.id === activeChannel)?.icon}</span>
                <span>{channels.find(c => c.id === activeChannel)?.name}</span>
              </h2>
              <p className="text-sm text-gray-400">
                {channels.find(c => c.id === activeChannel)?.description} • {channels.find(c => c.id === activeChannel)?.memberCount} membres
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Canal prêt pour vos messages ! 
              </h3>
              <p className="text-gray-500">
                Soyez le premier à lancer la conversation dans ce canal.
              </p>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`flex items-start space-x-3 ${msg.pinned ? 'bg-amber-500/5 border border-amber-500/20 rounded-lg p-3' : ''}`}>
                <div className="flex-shrink-0">
                  <span className="text-2xl">{msg.user.avatar}</span>
                  {msg.user.verified && (
                    <CheckCircle className="w-4 h-4 text-blue-400 absolute -mt-1 -ml-1" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-white">{msg.user.name}</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {msg.user.role}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.pinned && (
                      <Pin className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  
                  <div className="text-gray-300 whitespace-pre-wrap break-words">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Zone de saisie */}
        <div className="p-4 border-t border-gray-700 bg-gray-900/30">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Écrivez dans ${channels.find(c => c.id === activeChannel)?.name}...`}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:border-purple-500 focus:outline-none"
                  rows={1}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-3 text-gray-400 hover:text-white transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-3 text-gray-400 hover:text-white transition-colors">
                  <File className="w-5 h-5" />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400 mb-4">Connectez-vous pour participer aux discussions</p>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Se connecter
              </button>
            </div>
          )}
          
          {/* Statut de frappe */}
          <div className="mt-2 h-4">
            {isTyping.length > 0 && (
              <p className="text-xs text-gray-500 flex items-center">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                {isTyping.join(', ')} {isTyping.length === 1 ? 'tape' : 'tapent'}...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutilTchat;