import React, { useState } from 'react';
import { Atom, Loader } from 'lucide-react';

const AssistantLuxe = () => {
  const [activeAgent, setActiveAgent] = useState('vintage');
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const agents = [
    {
      id: 'vintage',
      name: 'ARIA VINTAGE',
      specialty: 'Expert Maroquinerie Vintage',
      period: '1800-2000',
      color: 'amber',
      avatar: '🏛️',
      description: 'Spécialiste authentification et histoire des maisons'
    },
    {
      id: 'moderne',
      name: 'NOVA CONTEMPORARY',
      specialty: 'Expert Mode Moderne',
      period: '2000-2025',
      color: 'purple',
      avatar: '✨',
      description: 'Expert collections récentes et tendances actuelles'
    },
    {
      id: 'futuriste',
      name: 'QUANTUM FORECAST',
      specialty: 'Expert Prédictions Future',
      period: '2025-2030',
      color: 'cyan',
      avatar: '🔮',
      description: 'Analyse prédictive et marchés émergents'
    }
  ];

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsThinking(true);
    
    // Simulation réponse IA professionnelle
    setTimeout(() => {
      let response = '';
      const agent = agents.find(a => a.id === activeAgent);
      
      if (activeAgent === 'vintage') {
        response = `🏛️ ARIA VINTAGE - Analyse Historique\n\nRequête: "${userMessage.content}"\n\n📜 EXPERTISE VINTAGE:\n• Période d'origine: Estimée années 1980-1990\n• Authentification: CONFIRMÉE (confiance 96.8%)\n• Valeur patrimoniale: EXCEPTIONNELLE\n• Évolution prix: +45% sur pièces similaires\n• Rareté: 8.5/10\n\n🎯 RECOMMANDATION EXPERTE:\nPièce d'une qualité remarquable, représentative du savoir-faire de l'époque. Excellent potentiel d'investissement.\n\n📊 ANALYSE MARCHÉ:\nDemande croissante pour cette période, particulièrement recherchée par les collectionneurs avisés.`;
      } else if (activeAgent === 'moderne') {
        response = `✨ NOVA CONTEMPORARY - Vision Moderne\n\nAnalyse: "${userMessage.content}"\n\n🚀 INSIGHTS CONTEMPORAINS:\n• Popularité actuelle: TRÈS ÉLEVÉE (94/100)\n• Mentions réseaux sociaux: +892% cette semaine\n• Influence célébrités: Bella Hadid, Hailey Bieber\n• Prix marché: En hausse de 23% ce trimestre\n• Disponibilité: LIMITÉE (stock critique)\n\n💫 PRÉDICTION 6 MOIS:\nForte demande maintenue, fenêtre d'opportunité optimale pour acquisition.\n\n📱 RÉSEAUX SOCIAUX:\nTrendance majeure sur Instagram et TikTok, +2.3M de vues cette semaine.`;
      } else {
        response = `🔮 QUANTUM FORECAST - Projection Future\n\nProjection: "${userMessage.content}"\n\n⚡ ANALYSE PRÉDICTIVE AVANCÉE:\n• Probabilité tendance 2025: 87.3%\n• Impact GenZ/GenAlpha: MAJEUR\n• Adoption technologique: PROBABLE\n• Factor durabilité: +340% d'importance\n• Métavers intégration: CONFIRMÉE\n\n🌟 VISION 2030:\nÉvolution vers l'éco-luxe premium avec intégration tech. Investissement stratégiquement recommandé.\n\n🎯 TIMING OPTIMAL:\nPosition avant Q2 2025 pour maximiser ROI (+280% potentiel).`;
      }
      
      setConversation(prev => [...prev, {
        type: 'ai',
        agent: activeAgent,
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsThinking(false);
    }, 2500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-amber-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          🤖 AGENTS IA SPÉCIALISÉS
        </h2>
        <p className="text-gray-400">Trois intelligences expertes pour le prêt-à-porter de luxe</p>
      </div>

      {/* Sélection Agent */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setActiveAgent(agent.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeAgent === agent.id
                ? `border-${agent.color}-500 bg-${agent.color}-500/10`
                : `border-gray-600 bg-black/50 hover:border-${agent.color}-500/50`
            }`}
          >
            <div className="text-3xl mb-3">{agent.avatar}</div>
            <h3 className={`font-bold text-${agent.color}-400 mb-1 text-sm`}>{agent.name}</h3>
            <p className="text-white text-xs mb-1">{agent.specialty}</p>
            <p className={`text-${agent.color}-300 text-xs mb-2`}>{agent.period}</p>
            <p className="text-gray-400 text-xs">{agent.description}</p>
          </button>
        ))}
      </div>

      {/* Interface Chat */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-amber-500/30">
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {conversation.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-4">{agents.find(a => a.id === activeAgent)?.avatar}</div>
              <p className="font-medium">{agents.find(a => a.id === activeAgent)?.name}</p>
              <p className="text-sm mt-2">Prêt pour une analyse experte</p>
            </div>
          )}
          
          {conversation.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-lg p-3 rounded-2xl ${
                msg.type === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                  : 'bg-black/80 text-white border border-amber-500/30'
              }`}>
                {msg.agent && (
                  <div className="text-amber-400 font-bold text-xs mb-2">
                    {agents.find(a => a.id === msg.agent)?.name}
                  </div>
                )}
                <div className="text-xs font-mono whitespace-pre-wrap">{msg.content}</div>
                <div className="text-xs opacity-70 mt-2">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-black/80 text-white p-3 rounded-2xl border border-amber-500/30">
                <div className="flex items-center space-x-2">
                  <Atom className="w-4 h-4 animate-spin text-amber-400" />
                  <span className="text-xs">{agents.find(a => a.id === activeAgent)?.name} analyse...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-amber-500/20">
          <div className="flex space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Posez votre question experte..."
              className="flex-1 bg-black/60 border border-amber-500/30 rounded-xl px-4 py-3 text-white placeholder-amber-300/50 focus:outline-none focus:border-amber-400 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={isThinking || !message.trim()}
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantLuxe;
