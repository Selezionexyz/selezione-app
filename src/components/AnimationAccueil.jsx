import React, { useState, useEffect } from 'react';
import { 
  Crown, Sparkles, TrendingUp, Shield, Users, Zap, 
  BarChart3, Target, Award, CheckCircle, ArrowRight,
  Gem, Globe, Star, Heart, Eye, Clock, Rocket
} from 'lucide-react';

const AnimationAccueil = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const steps = [
    {
      id: 'logo',
      duration: 4000, // Ralenti !
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-8 animate-pulse shadow-2xl shadow-amber-500/50 neon-border">
            <span className="text-white font-black text-7xl drop-shadow-2xl">S</span>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4 animate-bounce neon-glow">
            SELEZIONE
          </h1>
          <p className="text-2xl text-gray-300 animate-fade-in neon-text">La Révolution du Luxe B2B</p>
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
        </div>
      )
    },
    
    {
      id: 'mission',
      duration: 5000,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-10">
            <Sparkles className="w-20 h-20 text-amber-400 mx-auto mb-6 animate-spin-slow neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Qu'est-ce que{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                SELEZIONE
              </span> ?
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed mb-8">
              🎯 <strong>SELEZIONE</strong> est la première plateforme B2B française spécialisée dans le luxe d'occasion.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              Nous connectons revendeurs débutants, professionnels Vestiaire Collective et boutiques physiques 
              avec des outils d'IA révolutionnaires pour maximiser leurs profits dans l'univers du luxe de seconde main.
            </p>
          </div>
        </div>
      )
    },

    {
      id: 'probleme',
      duration: 5000,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-10">
            <Target className="w-20 h-20 text-red-400 mx-auto mb-6 animate-pulse neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Le Problème que nous{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Résolvons
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30 neon-border-red">
                <h3 className="text-2xl font-bold text-red-400 mb-4">❌ AVANT SELEZIONE</h3>
                <ul className="text-gray-300 space-y-3 text-left">
                  <li>• Pas de données sur quoi acheter/vendre</li>
                  <li>• Photos amateurs qui ne vendent pas</li>
                  <li>• Aucune idée des vraies tendances</li>
                  <li>• Pas d'accès aux fournisseurs B2B</li>
                  <li>• Marges incertaines et risques élevés</li>
                </ul>
              </div>
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30 neon-border-green">
                <h3 className="text-2xl font-bold text-green-400 mb-4">✅ AVEC SELEZIONE</h3>
                <ul className="text-gray-300 space-y-3 text-left">
                  <li>• IA prédit quoi vendre avec 92% précision</li>
                  <li>• Photos analysées par IA Vision pro</li>
                  <li>• Google Trends en temps réel</li>
                  <li>• 156 fournisseurs B2B connectés</li>
                  <li>• Marges calculées automatiquement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'outils',
      duration: 5000,
      content: (
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <Crown className="w-20 h-20 text-amber-400 mx-auto mb-6 animate-bounce neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Nos{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Outils Révolutionnaires
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 neon-border-blue animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Quoi Vendre Advisor</h3>
              <p className="text-gray-400 text-sm">IA + Scraping Vinted/Joli Closet pour savoir exactement quoi acheter</p>
            </div>
            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30 neon-border-green animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Eye className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Photo Perfect Vendeur</h3>
              <p className="text-gray-400 text-sm">IA Vision analyse vos photos et prédit l'impact sur les ventes</p>
            </div>
            <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30 neon-border-purple animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Tendances Révolution</h3>
              <p className="text-gray-400 text-sm">Google Trends + Instagram + Vogue en streaming temps réel</p>
            </div>
            <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/30 neon-border-orange animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <Globe className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Site B2B Fournisseur</h3>
              <p className="text-gray-400 text-sm">Accès direct aux 156 fournisseurs européens</p>
            </div>
          </div>
        </div>
      )
    },

    // PAGE DE VENTE 1/3
    {
      id: 'vente1',
      duration: 4500,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <Rocket className="w-20 h-20 text-green-400 mx-auto mb-6 animate-bounce neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Transformez votre{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Business Luxe
              </span>
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              🚀 Rejoignez les <strong>350+ professionnels</strong> qui ont déjà révolutionné leur activité
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30 neon-border-green">
              <div className="text-4xl font-bold text-green-400 mb-2">+168%</div>
              <div className="text-white font-semibold mb-2">Marge Moyenne</div>
              <div className="text-gray-400 text-sm">Nos membres atteignent 168% de marge en moyenne grâce à nos outils IA</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30 neon-border-blue">
              <div className="text-4xl font-bold text-blue-400 mb-2">€820K</div>
              <div className="text-white font-semibold mb-2">Volume Mensuel</div>
              <div className="text-gray-400 text-sm">Nos membres génèrent 820k€ de chiffre d'affaires mensuel</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30 neon-border-purple">
              <div className="text-4xl font-bold text-purple-400 mb-2">96%</div>
              <div className="text-white font-semibold mb-2">Satisfaction</div>
              <div className="text-gray-400 text-sm">96% de nos membres recommandent SELEZIONE</div>
            </div>
          </div>
        </div>
      )
    },

    // PAGE DE VENTE 2/3
    {
      id: 'vente2',
      duration: 4500,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <Users className="w-20 h-20 text-blue-400 mx-auto mb-6 animate-pulse neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Pour{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tous Profils
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/30 neon-border-yellow animate-fade-in-up">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-3">Débutant Vinted</h3>
              <ul className="text-gray-300 space-y-2 text-left text-sm">
                <li>• Découvrir quoi acheter/vendre</li>
                <li>• Apprendre les bases du luxe</li>
                <li>• Photos qui attirent les lycéens</li>
                <li>• Budget 50-300€ optimisé</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30 neon-border-purple animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-3">Pro Vestiaire</h3>
              <ul className="text-gray-300 space-y-2 text-left text-sm">
                <li>• Optimiser les prix premium</li>
                <li>• Tendances luxe temps réel</li>
                <li>• Clientèle 25-45 ans aisée</li>
                <li>• Marges jusqu'à 200%</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 neon-border-blue animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🏪</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Boutique</h3>
              <ul className="text-gray-300 space-y-2 text-left text-sm">
                <li>• Fournisseurs B2B directs</li>
                <li>• Gestion stock intelligente</li>
                <li>• Analytics avancées</li>
                <li>• Multi-canaux optimisés</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // PAGE DE VENTE 3/3
    {
      id: 'vente3',
      duration: 4500,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <Award className="w-20 h-20 text-amber-400 mx-auto mb-6 animate-spin-slow neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Pourquoi Choisir{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                SELEZIONE
              </span> ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-6 border border-amber-500/30 neon-border-amber text-left">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">🚀 Innovation Technologique</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Première IA spécialisée luxe d'occasion</li>
                <li>• Google Trends intégré en temps réel</li>
                <li>• Vision AI pour analyse photo pro</li>
                <li>• Scraping automatique Vinted/Joli Closet</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-6 border border-green-500/30 neon-border-green text-left">
              <h3 className="text-2xl font-bold text-green-400 mb-4">💰 Résultats Garantis</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• +168% marge moyenne prouvée</li>
                <li>• ROI visible dès la première semaine</li>
                <li>• Réduction des risques de 75%</li>
                <li>• Support 24/7 inclus</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-8 border border-purple-500/50 neon-border-purple-strong">
            <h3 className="text-3xl font-bold text-white mb-4">🎯 OFFRE SPÉCIALE LANCEMENT</h3>
            <p className="text-xl text-gray-300 mb-6">
              Rejoignez les premiers 100 membres et bénéficiez d'un accès à vie aux outils premium !
            </p>
            <div className="flex justify-center items-center space-x-4">
              <span className="text-2xl text-gray-400 line-through">€197/mois</span>
              <span className="text-4xl font-bold text-green-400">€97/mois</span>
              <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full animate-pulse">-50%</span>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'stats',
      duration: 4000,
      content: (
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <BarChart3 className="w-20 h-20 text-purple-400 mx-auto mb-6 animate-bounce neon-icon" />
            <h2 className="text-5xl font-bold text-white mb-6 neon-glow">
              Nos{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Résultats
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Depuis septembre 2023, SELEZIONE transforme le business de ses membres
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 neon-border-blue animate-count-up">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-blue-400 mb-2">350+</div>
              <div className="text-white font-semibold">Membres Actifs</div>
              <div className="text-gray-400 text-sm mt-2">Débutants, pros et boutiques</div>
            </div>
            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30 neon-border-green animate-count-up" style={{animationDelay: '0.3s'}}>
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-400 mb-2">€820K</div>
              <div className="text-white font-semibold">CA Mensuel</div>
              <div className="text-gray-400 text-sm mt-2">Volume d'affaires généré</div>
            </div>
            <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30 neon-border-amber animate-count-up" style={{animationDelay: '0.6s'}}>
              <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-amber-400 mb-2">96%</div>
              <div className="text-white font-semibold">Satisfaction</div>
              <div className="text-gray-400 text-sm mt-2">Membres recommandent</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    setShowContent(true);
    
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Terminer automatiquement l'animation après la dernière étape
        setTimeout(() => {
          setAnimationComplete(true);
        }, 1000);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    if (animationComplete) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [animationComplete, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-amber-400/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-8 transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {steps[currentStep].content}
      </div>

      {/* Indicateur de progression */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? 'bg-amber-400 w-8' 
                  : index < currentStep 
                    ? 'bg-green-400' 
                    : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bouton skip */}
      <button 
        onClick={() => setAnimationComplete(true)}
        className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors text-sm"
      >
        Passer l'intro →
      </button>

      <style>{`
        /* ANIMATIONS NÉON RÉVOLUTIONNAIRES */
        @keyframes neon-glow {
          0%, 100% { 
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
          }
          50% { 
            text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
          }
        }
        
        @keyframes neon-border-animate {
          0%, 100% { 
            box-shadow: 0 0 10px currentColor, inset 0 0 10px currentColor;
          }
          50% { 
            box-shadow: 0 0 20px currentColor, inset 0 0 15px currentColor;
          }
        }
        
        @keyframes neon-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .neon-glow {
          animation: neon-glow 2s ease-in-out infinite alternate;
        }
        
        .neon-text {
          text-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24;
        }
        
        .neon-icon {
          filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor);
          animation: neon-pulse 3s ease-in-out infinite;
        }
        
        .neon-border {
          animation: neon-border-animate 2s ease-in-out infinite alternate;
        }
        
        .neon-border-red {
          box-shadow: 0 0 15px #ef4444, inset 0 0 10px #ef4444;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        .neon-border-green {
          box-shadow: 0 0 15px #22c55e, inset 0 0 10px #22c55e;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        .neon-border-blue {
          box-shadow: 0 0 15px #3b82f6, inset 0 0 10px #3b82f6;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        .neon-border-purple {
          box-shadow: 0 0 15px #a855f7, inset 0 0 10px #a855f7;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        .neon-border-purple-strong {
          box-shadow: 0 0 25px #a855f7, inset 0 0 15px #a855f7;
          animation: neon-border-animate 2s ease-in-out infinite alternate;
        }
        
        .neon-border-orange {
          box-shadow: 0 0 15px #f97316, inset 0 0 10px #f97316;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        .neon-border-yellow {
          box-shadow: 0 0 15px #eab308, inset 0 0 10px #eab308;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        .neon-border-amber {
          box-shadow: 0 0 15px #f59e0b, inset 0 0 10px #f59e0b;
          animation: neon-border-animate 3s ease-in-out infinite alternate;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes count-up {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-in-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-count-up {
          animation: count-up 2s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* STYLES POUR LES GRADIENTS */
        .gradient-text {
          background: linear-gradient(45deg, #fbbf24, #f59e0b, #f97316);
          background-size: 400% 400%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AnimationAccueil;