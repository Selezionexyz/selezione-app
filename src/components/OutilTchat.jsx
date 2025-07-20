import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  MessageCircle, Send, Bot, User, Paperclip, 
  Image as ImageIcon, Phone, Video, Settings,
  Smile, Search, MoreHorizontal, Shield, Clock
} from 'lucide-react';

export default function OutilTchat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Bienvenue sur SELEZIONE Chat ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000),
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContact, setSelectedContact] = useState('support');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Contacts disponibles
  const contacts = [
    {
      id: 'support',
      name: 'Support SELEZIONE',
      avatar: '🎯',
      status: 'en ligne',
      type: 'support',
      lastSeen: 'En ligne'
    },
    {
      id: 'expert',
      name: 'Expert Authentification',
      avatar: '🔍',
      status: 'occupé',
      type: 'expert',
      lastSeen: 'Vu il y a 5 min'
    },
    {
      id: 'vendeur1',
      name: 'Marie D.',
      avatar: '👩‍💼',
      status: 'en ligne',
      type: 'vendeur',
      lastSeen: 'En ligne'
    },
    {
      id: 'vendeur2',
      name: 'Thomas L.',
      avatar: '👨‍💼',
      status: 'absent',
      type: 'vendeur',
      lastSeen: 'Vu il y a 1h'
    }
  ];

  // Réponses automatiques intelligentes
  const autoResponses = {
    'authentification': [
      "🔍 Pour l'authentification, je peux vous mettre en relation avec notre expert certifié.",
      "Quels éléments souhaitez-vous faire authentifier ? (photos, série, etc.)"
    ],
    'prix': [
      "💰 Pour une estimation précise, utilisez notre outil IA d'estimation.",
      "De quel produit de luxe souhaitez-vous connaître la valeur ?"
    ],
    'vente': [
      "🏪 Pour vendre sur notre marketplace, rendez-vous dans l'onglet 'Vendre'.",
      "Commission de seulement 5% et paiement sécurisé garanti !"
    ],
    'livraison': [
      "📦 Livraison sécurisée partout en France sous 48-72h.",
      "Assurance intégrale et suivi en temps réel inclus."
    ],
    'retour': [
      "↩️ Retours gratuits sous 14 jours si non-conforme à la description.",
      "Garantie authenticité 100% ou remboursement intégral."
    ],
    'default': [
      "👋 Merci pour votre message ! Un conseiller va vous répondre rapidement.",
      "En attendant, vous pouvez explorer nos outils d'estimation et d'authentification."
    ]
  };

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Détection de mots-clés pour réponses automatiques
  const getAutoResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('authentification') || lowerText.includes('authentique') || lowerText.includes('fake')) {
      return autoResponses.authentification;
    }
    if (lowerText.includes('prix') || lowerText.includes('estimation') || lowerText.includes('valeur')) {
      return autoResponses.prix;
    }
    if (lowerText.includes('vendre') || lowerText.includes('vente')) {
      return autoResponses.vente;
    }
    if (lowerText.includes('livraison') || lowerText.includes('expédition') || lowerText.includes('transport')) {
      return autoResponses.livraison;
    }
    if (lowerText.includes('retour') || lowerText.includes('remboursement') || lowerText.includes('garantie')) {
      return autoResponses.retour;
    }
    
    return autoResponses.default;
  };

  // Envoyer un message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Ajouter le message utilisateur
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simuler temps de réponse
    setTimeout(() => {
      const responses = getAutoResponse(newMessage);
      
      responses.forEach((response, index) => {
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + index + 1,
            text: response,
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          };
          setMessages(prev => [...prev, botMessage]);
          
          if (index === responses.length - 1) {
            setIsTyping(false);
          }
        }, (index + 1) * 1000);
      });
    }, 800);
  };

  // Gestion des fichiers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const fileMessage = {
        id: Date.now() + Math.random(),
        text: `📎 ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
      
      setMessages(prev => [...prev, fileMessage]);
    });
  };

  // Formater la date
  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Contact sélectionné
  const currentContact = contacts.find(c => c.id === selectedContact);
  const getStatusColor = (status) => {
    switch(status) {
      case 'en ligne': return 'bg-green-400';
      case 'occupé': return 'bg-yellow-400';
      case 'absent': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const emojis = ['😊', '😍', '🤔', '👍', '👎', '❤️', '😂', '😮', '🔥', '💎', '👏', '🎉'];

  return (
    <div className="p-4 md:p-6">
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-blue-500/20 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          💬 SELEZIONE Chat
        </h2>
        <p className="text-gray-400">Support client • Experts • Communauté • Chat temps réel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des contacts */}
        <div className="lg:col-span-1">
          <Card className="bg-black/60 backdrop-blur-sm border-blue-500/30 h-[600px]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Contacts</h3>
                <button className="text-gray-400 hover:text-white">
                  <Search className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedContact === contact.id 
                        ? 'bg-blue-600/30 border border-blue-500/50' 
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <span className="text-2xl">{contact.avatar}</span>
                        <span className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(contact.status)} rounded-full border-2 border-gray-900`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{contact.name}</p>
                        <p className="text-gray-400 text-xs">{contact.lastSeen}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm">Chat sécurisé</span>
                </div>
                <p className="text-gray-300 text-xs">
                  Vos conversations sont chiffrées de bout en bout
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone de chat */}
        <div className="lg:col-span-3">
          <Card className="bg-black/60 backdrop-blur-sm border-blue-500/30 h-[600px] flex flex-col">
            {/* Header du chat */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-3xl">{currentContact?.avatar}</span>
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(currentContact?.status)} rounded-full border-2 border-gray-900`} />
                </div>
                <div>
                  <h3 className="text-white font-bold">{currentContact?.name}</h3>
                  <p className="text-gray-400 text-sm">{currentContact?.status}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      {message.sender === 'user' ? (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === 'user' && (
                          <span className="text-xs opacity-70">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Indicateur de frappe */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-700 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Saisie de message */}
            <div className="p-4 border-t border-gray-700">
              {/* Sélecteur emoji */}
              {showEmojiPicker && (
                <div className="mb-3 p-3 bg-gray-800 rounded-lg">
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setNewMessage(prev => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-xl hover:bg-gray-700 rounded p-2 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                >
                  <Smile className="w-5 h-5" />
                </button>
                
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Tapez votre message..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
                
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}