import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Users, Crown, MessageCircle, Pin, Star, Image, File,
  Settings, Search, Bell, Hash, Plus, Smile, MoreVertical,
  Shield, Zap, Award, Target, AlertCircle, CheckCircle, Clock
} from 'lucide-react';

const OutilTchat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState([]);
  const messagesEndRef = useRef(null);

  // Utilisateur connecté (simulé)
  const currentUser = {
    id: 'user_1',
    name: 'Alexandre Dupont',
    avatar: '👑',
    role: 'Ultimate Member',
    level: 'Expert',
    verified: true
  };

  // Canaux de discussion
  const channels = [
    { 
      id: 'announcements', 
      name: '📢 Annonces', 
      description: 'Annonces officielles SELEZIONE',
      locked: true,
      memberCount: 342,
      icon: '📢'
    },
    { 
      id: 'general', 
      name: '💬 Général', 
      description: 'Discussion générale luxe',
      locked: false,
      memberCount: 156,
      icon: '💬'
    },
    { 
      id: 'hermes', 
      name: '🧡 Hermès Club', 
      description: 'Spécialistes Hermès',
      locked: false,
      memberCount: 89,
      icon: '🧡'
    },
    { 
      id: 'chanel', 
      name: '🖤 Chanel Expert', 
      description: 'Experts Chanel',
      locked: false,
      memberCount: 67,
      icon: '🖤'
    },
    { 
      id: 'marketplace', 
      name: '🛒 Marketplace', 
      description: 'Ventes et achats',
      locked: false,
      memberCount: 234,
      icon: '🛒'
    },
    { 
      id: 'vip', 
      name: '💎 VIP Lounge', 
      description: 'Membres Premium uniquement',
      locked: true,
      memberCount: 43,
      icon: '💎'
    }
  ];

  // Messages simulés réalistes
  const initialMessages = {
    'announcements': [
      {
        id: 'ann_1',
        userId: 'admin',
        username: 'SELEZIONE Team',
        avatar: '🏢',
        role: 'Admin',
        message: '🚀 NOUVELLE FONCTIONNALITÉ : Dashboard Intelligence avec feed Instagram temps réel des grandes marques de luxe ! \n\nDécouvrez les derniers posts de Hermès, Chanel, LV directement dans votre dashboard. Plus jamais de trend manqué ! 💎',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        pinned: true,
        reactions: [
          { emoji: '🔥', count: 23, users: ['user_1', 'user_2'] },
          { emoji: '💎', count: 15, users: ['user_3'] }
        ]
      },
      {
        id: 'ann_2',
        userId: 'admin',
        username: 'SELEZIONE Team',
        avatar: '🏢',
        role: 'Admin',
        message: '📊 MISE À JOUR : L\'outil d\'estimation IA a été complètement refondu ! \n\n✅ Base de données élargie\n✅ Précision améliorée à 95%\n✅ Interface ultra-professionnelle\n✅ Plus de plantages\n\nTestez dès maintenant ! 🚀',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        pinned: false,
        reactions: [
          { emoji: '✅', count: 31, users: ['user_1', 'user_4'] },
          { emoji: '🚀', count: 18, users: [] }
        ]
      }
    ],
    'general': [
      {
        id: 'gen_1',
        userId: 'user_2',
        username: 'Marie L.',
        avatar: '👩‍💼',
        role: 'Expert Seller',
        message: 'Salut la team ! Quelqu\'un a testé la nouvelle estimation IA ? J\'ai l\'impression qu\'elle est beaucoup plus précise maintenant 🤔',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        pinned: false,
        reactions: [
          { emoji: '👍', count: 7, users: ['user_1'] }
        ]
      },
      {
        id: 'gen_2',
        userId: 'user_3',
        username: 'Antoine R.',
        avatar: '👨‍💻',
        role: 'Premium Member',
        message: '@Marie L. Oui je viens de tester sur un Birkin 30, elle a trouvé 12.5k€ ce qui correspond exactement aux prix du marché ! Très impressionnant 🔥',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        pinned: false,
        reactions: [
          { emoji: '🔥', count: 5, users: ['user_2'] }
        ]
      },
      {
        id: 'gen_3',
        userId: 'user_1',
        username: 'Alexandre Dupont',
        avatar: '👑',
        role: 'Ultimate Member',
        message: 'Le nouveau dashboard est incroyable ! Les posts Instagram d\'Hermès en temps réel me permettent de suivre les trends instantanément 📊✨',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        pinned: false,
        reactions: [
          { emoji: '✨', count: 8, users: ['user_2', 'user_3'] },
          { emoji: '📊', count: 3, users: [] }
        ]
      }
    ],
    'hermes': [
      {
        id: 'her_1',
        userId: 'user_4',
        username: 'Sophie M.',
        avatar: '🧡',
        role: 'Hermès Expert',
        message: 'ALERTE STOCK 🚨\n\nBirkin 30 Togo Noir avec hardware palladié disponible chez mon contact à Tokyo. Prix exceptionnel : 9.8k€ (vs 13k€ boutique)\n\nMP si intéressé, stock limité ! ⚡',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        pinned: true,
        reactions: [
          { emoji: '🔥', count: 12, users: ['user_1', 'user_2'] },
          { emoji: '💰', count: 8, users: ['user_3'] }
        ]
      }
    ],
    'marketplace': [
      {
        id: 'mar_1',
        userId: 'user_5',
        username: 'Lucas B.',
        avatar: '💼',
        role: 'Pro Dealer',
        message: '🔥 VENTE FLASH 🔥\n\nChanel Classic Flap Medium Caviar Beige\n• État : Excellent (9/10)\n• Année : 2022\n• Prix : 6.2k€ (négociable)\n• Authentification garantie\n\nPhotos en MP ! 📸',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        pinned: false,
        reactions: [
          { emoji: '💎', count: 6, users: [] }
        ]
      }
    ]
  };

  // Utilisateurs en ligne simulés
  const mockOnlineUsers = [
    { id: 'user_1', name: 'Alexandre D.', avatar: '👑', role: 'Ultimate', status: 'online' },
    { id: 'user_2', name: 'Marie L.', avatar: '👩‍💼', role: 'Expert', status: 'online' },
    { id: 'user_3', name: 'Antoine R.', avatar: '👨‍💻', role: 'Premium', status: 'idle' },
    { id: 'user_4', name: 'Sophie M.', avatar: '🧡', role: 'Expert', status: 'online' },
    { id: 'user_5', name: 'Lucas B.', avatar: '💼', role: 'Pro', status: 'online' },
    { id: 'user_6', name: 'Emma K.', avatar: '💎', role: 'VIP', status: 'dnd' },
    { id: 'admin', name: 'SELEZIONE', avatar: '🏢', role: 'Admin', status: 'online' }
  ];

  // Initialisation
  useEffect(() => {
    setMessages(initialMessages);
    setOnlineUsers(mockOnlineUsers);
    
    // Simulation typing indicator
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsTyping(['Marie L.']);
        setTimeout(() => setIsTyping([]), 3000);
      }
    }, 10000);

    return () => clearInterval(typingInterval);
  }, []);

  // Scroll automatique
  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChannel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Envoi de message
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.name,
      avatar: currentUser.avatar,
      role: currentUser.role,
      message: message.trim(),
      timestamp: new Date(),
      pinned: false,
      reactions: []
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMessage]
    }));

    setMessage('');
  };

  // Réaction à un message
  const addReaction = (messageId, emoji) => {
    setMessages(prev => ({
      ...prev,
      [activeChannel]: prev[activeChannel].map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            if (existingReaction.users.includes(currentUser.id)) {
              // Retirer la réaction
              existingReaction.users = existingReaction.users.filter(u => u !== currentUser.id);
              existingReaction.count = Math.max(0, existingReaction.count - 1);
            } else {
              // Ajouter la réaction
              existingReaction.users.push(currentUser.id);
              existingReaction.count += 1;
            }
          } else {
            // Nouvelle réaction
            msg.reactions.push({
              emoji,
              count: 1,
              users: [currentUser.id]
            });
          }
          // Nettoyer les réactions à 0
          msg.reactions = msg.reactions.filter(r => r.count > 0);
        }
        return msg;
      })
    }));
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'text-red-400',
      'Ultimate Member': 'text-purple-400',
      'Expert Seller': 'text-amber-400',
      'Premium Member': 'text-blue-400',
      'Hermès Expert': 'text-orange-400',
      'VIP': 'text-pink-400',
      'Pro Dealer': 'text-green-400'
    };
    return colors[role] || 'text-gray-400';
  };

  const getStatusColor = (status) => {
    const colors = {
      'online': 'bg-green-400',
      'idle': 'bg-yellow-400',
      'dnd': 'bg-red-400',
      'offline': 'bg-gray-400'
    };
    return colors[status] || 'bg-gray-400';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex">
      {/* Sidebar - Canaux */}
      <div className="w-80 bg-black/60 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-purple-400" />
            SELEZIONE COMMUNITY
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {onlineUsers.filter(u => u.status === 'online').length} membres en ligne
          </p>
        </div>

        {/* Canaux */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">
              Canaux de Discussion
            </div>
            
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors group ${
                  activeChannel === channel.id
                    ? 'bg-purple-600/20 border border-purple-500/30 text-white'
                    : 'hover:bg-gray-800/50 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{channel.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{channel.name}</span>
                        {channel.locked && <Shield className="w-3 h-3 text-amber-400" />}
                      </div>
                      <p className="text-gray-400 text-xs">{channel.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {channel.memberCount}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Utilisateurs en ligne */}
        <div className="border-t border-gray-700/50 p-4">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">
            En ligne ({onlineUsers.filter(u => u.status === 'online').length})
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {onlineUsers.filter(u => u.status === 'online').map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-lg">{user.avatar}</span>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border border-gray-800`}></div>
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{user.name}</div>
                  <div className={`text-xs ${getRoleColor(user.role)}`}>{user.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone de chat principale */}
      <div className="flex-1 flex flex-col">
        {/* Header du canal */}
        <div className="bg-black/40 backdrop-blur-sm border-b border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {channels.find(c => c.id === activeChannel)?.icon}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {channels.find(c => c.id === activeChannel)?.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  {channels.find(c => c.id === activeChannel)?.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages[activeChannel] || []).map((msg) => (
            <div key={msg.id} className={`group ${msg.pinned ? 'bg-amber-500/5 border border-amber-500/20 rounded-lg p-3' : ''}`}>
              {msg.pinned && (
                <div className="flex items-center space-x-2 text-amber-400 text-xs mb-2">
                  <Pin className="w-3 h-3" />
                  <span>Message épinglé</span>
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <span className="text-2xl">{msg.avatar}</span>
                  {msg.role === 'Admin' && (
                    <Shield className="w-3 h-3 text-red-400 absolute -bottom-1 -right-1" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-white">{msg.username}</span>
                    <span className={`text-xs ${getRoleColor(msg.role)} bg-gray-800/50 px-2 py-0.5 rounded`}>
                      {msg.role}
                    </span>
                    <span className="text-gray-500 text-xs">{formatTime(msg.timestamp)}</span>
                  </div>
                  
                  <div className="text-gray-200 whitespace-pre-line leading-relaxed">
                    {msg.message}
                  </div>
                  
                  {/* Réactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center space-x-2 mt-2">
                      {msg.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          onClick={() => addReaction(msg.id, reaction.emoji)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                            reaction.users.includes(currentUser.id)
                              ? 'bg-purple-600/30 border border-purple-500/50'
                              : 'bg-gray-800/50 hover:bg-gray-700/50'
                          }`}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-gray-300">{reaction.count}</span>
                        </button>
                      ))}
                      <button
                        className="p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        onClick={() => {
                          const emojis = ['👍', '❤️', '😂', '🔥', '💎', '✨'];
                          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                          addReaction(msg.id, randomEmoji);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Indicateur de frappe */}
          {isTyping.length > 0 && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>{isTyping.join(', ')} {isTyping.length === 1 ? 'tape...' : 'tapent...'}</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="bg-black/40 backdrop-blur-sm border-t border-gray-700/50 p-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Écrire dans ${channels.find(c => c.id === activeChannel)?.name}...`}
                className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
              />
            </div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Image className="w-5 h-5" />
            </button>
            
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutilTchat;