import React from 'react';
import { Crown, Lock, ArrowRight, Star, Zap, Clock } from 'lucide-react';

const UpgradePage = ({ user, feature, onUpgrade }) => {
  const getFeatureInfo = (feature) => {
    const features = {
      academy: {
        title: 'Academy Premium',
        description: '20+ chapitres d\'apprentissage avancé',
        icon: Star,
        benefits: [
          'Accès à tous les chapitres exclusifs',
          'Certificats de formation',
          'Sessions live avec experts',
          'Communauté privée VIP'
        ]
      },
      support: {
        title: 'Support Premium',
        description: 'Assistance prioritaire et experts dédiés',
        icon: Zap,
        benefits: [
          'Support prioritaire 24/7',
          'Expert dédié à votre compte',
          'Consultation personnalisée',
          'Accès aux webinaires exclusifs'
        ]
      },
      advanced_tools: {
        title: 'Outils Avancés',
        description: 'Fonctionnalités professionnelles avancées',
        icon: Crown,
        benefits: [
          'Analytics avancés',
          'Automatisation complète',
          'Intégrations tierces',
          'API personnalisée'
        ]
      },
      unlimited: {
        title: 'Accès Illimité',
        description: 'Supprimez toutes les limitations',
        icon: Lock,
        benefits: [
          'Estimations illimitées',
          'Scans illimités',
          'Stockage illimité',
          'Tous les outils débloqués'
        ]
      }
    };
    
    return features[feature] || features.unlimited;
  };

  const featureInfo = getFeatureInfo(feature);
  const Icon = featureInfo.icon;

  const plans = [
    {
      name: 'STARTER',
      price: '49€',
      period: '/mois',
      popular: false,
      features: [
        '50 estimations/mois',
        '100 scans/mois',
        'Dashboard complet',
        'CRM fournisseurs',
        'Support email'
      ]
    },
    {
      name: 'PROFESSIONAL',
      price: '99€',
      period: '/mois',
      popular: true,
      features: [
        'Estimations illimitées',
        'Scans illimités',
        'Academy complète',
        'Support prioritaire',
        'Analytics avancés',
        'API access'
      ]
    },
    {
      name: 'ENTERPRISE',
      price: '199€',
      period: '/mois',
      popular: false,
      features: [
        'Tout Professional +',
        'Expert dédié',
        'Formation personnalisée',
        'Intégrations custom',
        'SLA garanti'
      ]
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-purple-500/20 rounded-full">
              <Icon className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            {featureInfo.title}
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            {featureInfo.description}
          </p>
          
          {/* Badge essai */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-500/30">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {user?.trial_days_left || 0} jours d'essai restants
            </span>
          </div>
        </div>
      </div>

      {/* Bénéfices */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">
          Débloquez ces fonctionnalités premium :
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureInfo.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plans tarifaires */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            Choisissez votre plan
          </h3>
          <p className="text-gray-400">
            Passez au premium pour débloquer toutes les fonctionnalités
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative rounded-xl p-6 border transition-all hover:scale-105 ${
                plan.popular 
                  ? 'border-purple-500 bg-gradient-to-b from-purple-500/10 to-pink-500/10' 
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAIRE
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-white mb-2">{plan.name}</h4>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onUpgrade && onUpgrade(plan.name.toLowerCase())}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <span>Choisir ce plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Garantie et sécurité */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
        <div className="text-center">
          <h4 className="text-lg font-bold text-white mb-2">
            Garantie satisfait ou remboursé 30 jours
          </h4>
          <p className="text-gray-400 text-sm">
            Essayez SELEZIONE Premium sans risque. Si vous n'êtes pas satisfait, 
            nous vous remboursons intégralement sous 30 jours.
          </p>
          
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>2800+ clients satisfaits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Témoignages rapides */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4 text-center">
          Ce que disent nos clients Premium
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-300 text-sm mb-2 italic">
              "SELEZIONE m'a permis d'augmenter mon ROI de 340% en 6 mois. Les outils IA sont bluffants."
            </p>
            <p className="text-amber-400 text-xs font-medium">Marie L. - Revendeuse Hermès</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-300 text-sm mb-2 italic">
              "Interface intuitive, données précises, support réactif. Exactement ce dont j'avais besoin."
            </p>
            <p className="text-amber-400 text-xs font-medium">Jean-Marc D. - Antiquaire Luxe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;