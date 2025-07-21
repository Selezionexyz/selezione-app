import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Users, Crown, MessageCircle, Pin, Star, Image, File,
  Settings, Search, Bell, Hash, Plus, Smile, MoreVertical,
  Shield, Zap, Award, Target, AlertCircle, CheckCircle, Clock,
  Globe, Sparkles, ThumbsUp, Heart, Eye
} from 'lucide-react';

const OutilTchat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('selezione_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return {
        id: `user_${Date.now()}`,
        name: user.name || 'Utilisateur',
        avatar: user.avatar || '👤',
        role: user.subscription || 'Membre',
        verified: true
      };
    }
    return {
      id: `user_${Date.now()}`,
      name: 'Utilisateur',
      avatar: '👤', 
      role: 'Membre',
      verified: false
    };
  });
  
  const messagesEndRef = useRef(null);

  // Canaux disponibles
  const channels = [
    { 
      id: 'general', 
      name: 'Général', 
      icon: '💬', 
      description: 'Discussion générale', 
      memberCount: '350+',
      locked: false 
    },
    { 
      id: 'marketplace', 
      name: 'Marketplace B2B', 
      icon: '🛒', 
      description: 'Achats/Ventes professionnels', 
      memberCount: '180+',
      locked: false 
    },
    { 
      id: 'authentification', 
      name: 'Authentification', 
      icon: '🔍', 
      description: 'Aide expertise produits', 
      memberCount: '95+',
      locked: false 
    },
    { 
      id: 'fournisseurs', 
      name: 'Fournisseurs VIP', 
      icon: '👑', 
      description: 'Réseau fournisseurs premium', 
      memberCount: '40+',
      locked: true 
    }
  ];

  // Messages initiaux par canal
  const initialMessages = {
    general: [
      {
        id: 'welcome_general',
        user: {
          id: 'system',
          name: 'SELEZIONE',
          avatar: '🤖',
          role: 'Système',
          verified: true
        },
        content: `👋 **Bienvenue dans le Chat Général SELEZIONE !**

L'espace de discussion de notre communauté professionnelle :
• 💬 Échanges entre 350+ membres vérifiés
• 📢 Annonces importantes de la plateforme
• 🤝 Networking et collaboration
• 💡 Partage d'expériences et conseils

**Règles du chat :**
✅ Respect entre tous les membres
✅ Discussions professionnelles privilégiées
✅ Pas de spam ni de publicité
✅ Entraide et bienveillance

Bonne discussion ! 🚀`,
        timestamp: new Date(Date.now() - 3600000), // 1h ago
        pinned: true,
        reactions: { '👍': 15, '🔥': 8, '💎': 5 }
      }
    ],
    marketplace: [
      {
        id: 'welcome_marketplace',
        user: {
          id: 'system',
          name: 'SELEZIONE',
          avatar: '🛒',
          role: 'Système',
          verified: true
        },
        content: `🛒 **Marketplace B2B - Votre Espace Commerce !**

Plateforme d'échange professionnel entre membres vérifiés :
• 💼 Achats/Ventes de produits de luxe
• 📋 Demandes spécifiques et sourcing
• 🤝 Partenariats commerciaux
• 💰 Négociations B2B

**Règles importantes :**
✅ Membres vérifiés uniquement
✅ Photos obligatoires pour les ventes
✅ Prix transparents et négociables
✅ Respect des conditions de paiement
✅ Aucune contrefaçon tolérée

Bonnes affaires ! 💎`,
        timestamp: new Date(Date.now() - 3600000),
        pinned: true,
        reactions: { '💰': 12, '👍': 18, '🔥': 6 }
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
        content: `🔍 **Espace Authentification - Expertise Collective !**

Votre aide communautaire pour l'authentification :
• 📸 Postez vos photos pour authentification
• 👨‍🏫 Experts certifiés vous accompagnent
• 📚 Guides d'authentification détaillés
• ⚠️ Alertes contrefaçons récentes
• 🏆 Système de points d'expertise

**Comment bien poster :**
1️⃣ Photos haute qualité (plusieurs angles)
2️⃣ Détails : numéro de série, hologrammes, coutures
3️⃣ Marque et modèle si connus
4️⃣ Patience pour les réponses d'experts

Authentifiez en toute confiance ! 🛡️`,
        timestamp: new Date(Date.now() - 3600000),
        pinned: true,
        reactions: { '🔍': 20, '👍': 15, '🎯': 8 }
      }
    ],
    fournisseurs: [
      {
        id: 'welcome_suppliers',
        user: {
          id: 'system',
          name: 'SELEZIONE',
          avatar: '👑',
          role: 'Système',
          verified: true
        },
        content: `👑 **Fournisseurs VIP - Réseau Premium Exclusif !**

Espace réservé aux fournisseurs et acheteurs premium :
• 🏪 40+ fournisseurs vérifiés et certifiés
• 💎 Accès aux collections exclusives
• 📊 Conditions préférentielles négociées
• 🚀 Lancements produits en avant-première
• 🔒 Confidentialité et discrétion garanties

**Accès restrictif :**
✅ Membres Ultra Premium uniquement
✅ Fournisseurs certifiés SELEZIONE
✅ Volume d'affaires minimum requis
✅ Accord de confidentialité signé

Bienvenue dans l'élite ! 🏆`,
        timestamp: new Date(Date.now() - 3600000),
        pinned: true,
        reactions: { '👑': 8, '💎': 12, '🔥': 5 }
      }
    ]
  };

  // Utilisateurs en ligne simulés
  const onlineUsers = [
    { id: 'user1', name: 'Marie Dubois', avatar: '👩‍💼', role: 'CEO Boutique' },
    { id: 'user2', name: 'Jean Martin', avatar: '👨‍💻', role: 'Acheteur Premium' },
    { id: 'user3', name: 'Sophie Chen', avatar: '👩‍🎨', role: 'Expert Authentification' },
    { id: 'user4', name: 'Pierre Laurent', avatar: '👨‍💼', role: 'Fournisseur VIP' },
    { id: 'user5', name: 'Anna Schmidt', avatar: '👩‍🔬', role: 'Analyste Marché' }
  ];

  // Initialiser les messages du canal actif
  useEffect(() => {
    // Charger les messages sauvegardés OU les messages initiaux
    const savedMessages = JSON.parse(localStorage.getItem(`selezione_chat_${activeChannel}`) || '[]');
    const channelInitialMessages = initialMessages[activeChannel] || [];
    
    if (savedMessages.length > 0) {
      // Si des messages sont sauvegardés, les combiner avec les messages système
      const systemMessages = channelInitialMessages.filter(msg => msg.user.id === 'system');
      const userMessages = savedMessages.filter(msg => msg.user.id !== 'system');
      setMessages([...systemMessages, ...userMessages]);
    } else {
      // Sinon, utiliser seulement les messages initiaux
      setMessages(channelInitialMessages);
    }
  }, [activeChannel]);

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoi de message CORRIGÉ
  const sendMessage = () => {
    if (!message.trim() || !currentUser) return;

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random()}`,
      user: currentUser,
      content: message.trim(),
      timestamp: new Date(),
      pinned: false,
      reactions: {}
    };

    // Mettre à jour l'état local immédiatement
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Sauvegarder dans localStorage (seulement les messages utilisateurs)
    const userMessages = updatedMessages.filter(msg => msg.user.id !== 'system');
    localStorage.setItem(`selezione_chat_${activeChannel}`, JSON.stringify(userMessages));

    // Vider le champ de saisie
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addReaction = (messageId, emoji) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          const newReactions = { ...msg.reactions };
          newReactions[emoji] = (newReactions[emoji] || 0) + 1;
          return { ...msg, reactions: newReactions };
        }
        return msg;
      })
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor((now - date) / (1000 * 60))}min`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white flex">
      
      {/* Sidebar Canaux */}
      <div className="w-80 bg-gray-900/90 backdrop-blur-sm border-r border-gray-700 flex flex-col">
        
        {/* Header Sidebar */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              💬
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Community Chat
              </h1>
              <p className="text-xs text-gray-400">Réseau SELEZIONE</p>
            </div>
          </div>
        </div>

        {/* Liste des canaux */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center">
            <Hash className="w-4 h-4 mr-2" />
            Canaux Disponibles
          </h3>
          <div className="space-y-2">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full text-left p-4 rounded-xl transition-all group ${
                  activeChannel === channel.id
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50'
                    : 'hover:bg-gray-800/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{channel.icon}</span>
                    <span className="font-medium text-white">{channel.name}</span>
                    {channel.locked && <Shield className="w-4 h-4 text-amber-400" />}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
                    {channel.memberCount}
                  </span>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {channel.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Utilisateurs en ligne */}
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            En ligne ({onlineUsers.length})
          </h3>
          <div className="space-y-2">
            {onlineUsers.slice(0, 4).map(user => (
              <div key={user.id} className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-lg">{user.avatar}</span>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Chat Principal */}
      <div className="flex-1 flex flex-col">
        
        {/* Header Canal */}
        <div className="p-6 border-b border-gray-700 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{channels.find(c => c.id === activeChannel)?.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {channels.find(c => c.id === activeChannel)?.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  {channels.find(c => c.id === activeChannel)?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{channels.find(c => c.id === activeChannel)?.memberCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex space-x-4 ${msg.pinned ? 'bg-blue-600/10 p-4 rounded-xl border border-blue-500/30' : ''}`}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-lg">{msg.user.avatar}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold text-white">{msg.user.name}</span>
                  {msg.user.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">
                    {msg.user.role}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                  {msg.pinned && <Pin className="w-4 h-4 text-yellow-400" />}
                </div>
                <div className="text-white whitespace-pre-wrap break-words">
                  {msg.content}
                </div>
                {Object.keys(msg.reactions).length > 0 && (
                  <div className="flex items-center space-x-2 mt-2">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        onClick={() => addReaction(msg.id, emoji)}
                        className="flex items-center space-x-1 bg-gray-700/50 hover:bg-gray-700 px-2 py-1 rounded-full text-xs transition-colors"
                      >
                        <span>{emoji}</span>
                        <span className="text-gray-300">{count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone Saisie */}
        <div className="p-6 border-t border-gray-700 bg-gray-900/50">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <div className="bg-gray-800 rounded-xl border border-gray-600 focus-within:border-purple-500 transition-colors">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message dans #${channels.find(c => c.id === activeChannel)?.name}...`}
                  className="w-full bg-transparent text-white placeholder-gray-400 p-4 rounded-xl resize-none focus:outline-none min-h-[60px] max-h-32"
                  rows="2"
                />
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl transition-all transform hover:scale-105 disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Connecté en tant que {currentUser.name}</span>
              <span>•</span>
              <span>{onlineUsers.length} membres en ligne</span>
            </div>
            <span>Entrée pour envoyer • Maj+Entrée pour saut de ligne</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutilTchat;