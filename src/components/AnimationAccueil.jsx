import React, { useState, useEffect } from 'react';
import { 
  Crown, Sparkles, TrendingUp, Shield, Users, Zap, 
  BarChart3, Target, Award, CheckCircle, ArrowRight,
  Gem, Globe, Star, Heart, Eye, Clock, Rocket
} from 'lucide-react';

const AnimationAccueil = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const steps = [
    {
      id: 'logo',
      duration: 2000,
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-amber-500/50">
            <span className="text-white font-black text-6xl">S</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2 animate-bounce">
            SELEZIONE
          </h1>
          <p className="text-xl text-gray-400 animate-fade-in">La Révolution du Luxe B2B</p>
        </div>
      )
    },
    
    {
      id: 'mission',
      duration: 3500,
      content: (
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-spin-slow" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Bienvenue dans l'Avenir du{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Luxe d'Occasion
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              SELEZIONE révolutionne le marché du luxe de seconde main avec une plateforme B2B 
              dotée d'intelligence artificielle avancée, connectant 350 professionnels depuis septembre 2023.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-amber-500/20 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Plateforme #1</h3>
              <p className="text-gray-400">Leader mondial du luxe B2B avec 96% de satisfaction client</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/20 animate-fade-in-up" style={{animationDelay: '1s'}}>
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">IA Avancée</h3>
              <p className="text-gray-400">GPT-4 Turbo + algorithmes propriétaires pour l'expertise</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">ROI Exceptionnel</h3>
              <p className="text-gray-400">Rentabilité moyenne +340% pour nos membres premium</p>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'features',
      duration: 4000,
      content: (
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <Target className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Écosystème Complet{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                18 Outils Professionnels
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              De l'intelligence marché à l'authentification IA, tout ce dont vous avez besoin pour dominer le luxe
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Dashboard Intelligence', icon: BarChart3, color: 'text-blue-400', badge: 'LIVE' },
              { name: 'Estimation IA', icon: Zap, color: 'text-amber-400', badge: 'GPT-4' },
              { name: 'Marketplace B2B', icon: Crown, color: 'text-purple-400', badge: '22 FOUR.' },
              { name: 'Authentification IA', icon: Shield, color: 'text-green-400', badge: '10K+' },
              { name: 'ROI Intelligence', icon: TrendingUp, color: 'text-red-400', badge: 'PRED.' },
              { name: 'Radar Opportunités', icon: Target, color: 'text-cyan-400', badge: '100 SITES' }
            ].map((tool, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all animate-fade-in-up" 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <tool.icon className={`w-8 h-8 ${tool.color} mx-auto mb-2`} />
                <h3 className="text-sm font-bold text-white mb-1">{tool.name}</h3>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full border border-amber-500/30">
                  {tool.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },

    {
      id: 'stats',
      duration: 3500,
      content: (
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <Award className="w-16 h-16 text-gold-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Chiffres qui{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Parlent d'Eux-Mêmes
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Une croissance exceptionnelle portée par l'innovation et la satisfaction client
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '350', label: 'Membres Actifs', icon: Users, color: 'text-blue-400', growth: 'Sept 2023' },
              { number: '€820K', label: 'Volume Mensuel', icon: Globe, color: 'text-green-400', growth: '+87%' },
              { number: '40+', label: 'Fournisseurs Premium', icon: Crown, color: 'text-amber-400', growth: 'Vérifiés' },
              { number: '96%', label: 'Satisfaction Client', icon: Heart, color: 'text-red-400', growth: '+12%' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 animate-count-up" 
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <p className="text-3xl font-black text-white mb-1">{stat.number}</p>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },

    {
      id: 'cta',
      duration: 3000,
      content: (
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Rocket className="w-20 h-20 text-orange-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl font-bold text-white mb-6">
              Prêt à Révolutionner{' '}
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Votre Business ?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Rejoignez l'élite des professionnels du luxe et découvrez pourquoi SELEZIONE 
              est devenu la référence mondiale en moins de 2 ans.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl p-8 border border-amber-500/30 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Accès Immédiat</p>
                <p className="text-gray-400 text-sm">Toutes fonctionnalités débloquées</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Support 24/7</p>
                <p className="text-gray-400 text-sm">Équipe d'experts dédiée</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-white font-semibold">ROI Garanti</p>
                <p className="text-gray-400 text-sm">Remboursé si non satisfait</p>
              </div>
            </div>
            
            <button 
              onClick={() => setAnimationComplete(true)}
              className="group bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/25 flex items-center mx-auto text-lg"
            >
              <span className="mr-3">🚀 Découvrir SELEZIONE</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Setup en 30 secondes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Disponible mondialement</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Interface intuitive</span>
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

      <style jsx>{`
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
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-count-up {
          animation: count-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimationAccueil;