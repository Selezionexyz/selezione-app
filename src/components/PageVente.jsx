import React, { useState } from 'react';
import { 
  Crown, Check, Star, Zap, Users, Shield, Clock, Trophy,
  MessageCircle, FileText, GraduationCap, Bot, TrendingUp,
  Phone, Mail, ChevronRight, Sparkles, Award, Target
} from 'lucide-react';

const PageVente = () => {
  const [selectedPlan, setSelectedPlan] = useState('ultimate');
  const [showFAQ, setShowFAQ] = useState({});

  // Données des formules
  const plans = [
    {
      id: 'starter',
      name: 'SELEZIONE STARTER',
      price: '97€',
      periode: '/mois',
      popular: false,
      description: 'Pour débuter dans le luxe',
      color: 'blue',
      features: [
        'Estimation IA (100/mois)',
        'Agent IA Market Analyst',
        'Academy (10 chapitres)',
        'Comparateur de prix',
        'Support email'
      ],
      limits: [
        'Pas de live coaching',
        'Pas d\'accès fournisseurs',
        'Support 48h'
      ]
    },
    {
      id: 'ultimate',
      name: 'SELEZIONE ULTIMATE',
      price: '297€',
      periode: '/mois',
      popular: true,
      description: 'La formule complète professionnelle',
      color: 'amber',
      originalPrice: '497€',
      features: [
        'TOUT illimité : Estimation IA, Agents, Outils',
        'Academy complète (20+ chapitres)',
        'Live hebdomadaires avec moi',
        'Accès réseau fournisseurs VIP',
        'WhatsApp Business direct',
        'Scraping temps réel',
        'Analyses personnalisées',
        'Support prioritaire < 2h'
      ],
      bonus: [
        'Réseau 22 fournisseurs premium Europe + Asie',
        'Templates négociation',
        'Calculateur ROI exclusif'
      ]
    },
    {
      id: 'vip',
      name: 'SELEZIONE VIP ONE-TO-ONE',
      price: '2.997€',
      periode: 'paiement unique',
      popular: false,
      description: 'Accompagnement personnel 1-to-1',
      color: 'purple',
      features: [
        'Tout SELEZIONE ULTIMATE à vie',
        'Coaching personnel 1-to-1 (5h)',
        'Stratégie business personnalisée',
        'Mise en relation fournisseurs directs',
        'Suivi mensuel pendant 6 mois',
        'Accès lifetime aux mises à jour',
        'Groupe Telegram VIP exclusif',
        'Certificat expertise SELEZIONE'
      ],
      garantie: '30 jours satisfait ou remboursé'
    }
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: 'Marie L.',
      business: 'Revendeuse Chanel',
      photo: '👩‍💼',
      text: '"Grâce à SELEZIONE, j\'ai économisé 15k€ en 3 mois sur mes achats. Les fournisseurs japonais sont une mine d\'or !"',
      results: '+45k€ CA en 6 mois'
    },
    {
      name: 'Antoine R.',
      business: 'Dealer Instagram',
      photo: '👨‍💻',
      text: '"L\'estimation IA m\'a évité 3 contrefaçons à 8k€ chacune. L\'investissement est rentabilisé en 1 semaine."',
      results: 'Évité 24k€ de pertes'
    },
    {
      name: 'Sophie M.',
      business: 'Boutique luxe',
      photo: '👑',
      text: '"Le réseau fournisseur m\'a ouvert l\'accès à des pièces rares introuvables ailleurs. Mes marges ont explosé !"',
      results: 'Marge +300%'
    }
  ];

  const faqData = [
    {
      q: 'Combien puis-je économiser avec SELEZIONE ?',
      r: 'Nos clients économisent en moyenne 15-30k€ la première année grâce aux prix fournisseurs et à l\'évitement des contrefaçons. Un seul achat mal négocié peut coûter plus cher que l\'abonnement annuel.'
    },
    {
      q: 'Les fournisseurs sont-ils vraiment fiables ?',
      r: 'Tous nos 22 fournisseurs sont vérifiés et testés personnellement. Contacts premium en Europe et Asie avec lesquels je travaille depuis 5+ ans. Authentification garantie.'
    },
    {
      q: 'Puis-je annuler à tout moment ?',
      r: 'Oui, sans engagement. Mais 97% de nos clients restent car les résultats arrivent dès le 1er mois. Garantie 30 jours sur la formule VIP.'
    },
    {
      q: 'L\'IA est-elle vraiment précise ?',
      r: 'Notre IA atteint 98.5% de précision sur l\'estimation grâce à GPT-4 + notre base de données de 50k+ transactions. Plus précise que 90% des experts humains.'
    }
  ];

  const toggleFAQ = (index) => {
    setShowFAQ(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-6 py-2 mb-8">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-medium">SELEZIONE - Intelligence Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Maîtrisez le Luxe
            </span>
            <br />
            Comme un Expert
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            La première plateforme IA qui vous donne accès aux <strong className="text-amber-400">prix de gros</strong>, 
            aux <strong className="text-amber-400">fournisseurs VIP</strong> et à l'<strong className="text-amber-400">expertise d'un pro</strong> 
            du prêt-à-porter de luxe
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div>
              <p className="text-3xl font-bold text-amber-400">500+</p>
              <p className="text-sm text-gray-400">Fournisseurs vérifiés</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">98.5%</p>
              <p className="text-sm text-gray-400">Précision IA</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">15k€+</p>
              <p className="text-sm text-gray-400">Économie moyenne</p>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
            Découvrir les formules ↓
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choisissez votre niveau d'expertise
          </h2>
          <p className="text-gray-400 text-lg">De débutant à expert, nous avons la solution pour votre business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-2xl border-2 p-8 transition-all cursor-pointer ${
                plan.popular 
                  ? 'border-amber-500 bg-gradient-to-br from-amber-500/10 to-orange-500/10 scale-105' 
                  : 'border-gray-700 bg-black/50 hover:border-amber-500/50'
              } ${selectedPlan === plan.id ? 'ring-4 ring-amber-500/30' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>PLUS POPULAIRE</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.color === 'amber' ? 'text-amber-400' : plan.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`}>
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <p className="text-gray-500 line-through text-lg mb-1">{plan.originalPrice}</p>
                  )}
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.periode}</span>
                  </div>
                </div>

                {plan.garantie && (
                  <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1 text-green-400 text-xs">
                    <Shield className="w-3 h-3" />
                    <span>{plan.garantie}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.color === 'amber' ? 'text-amber-400' : plan.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`} />
                    <span className="text-gray-200 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.bonus && (
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-amber-400 font-medium text-sm mb-2">🎁 BONUS INCLUS :</p>
                    {plan.bonus.map((bonus, idx) => (
                      <div key={idx} className="flex items-start space-x-3 mb-2">
                        <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                        <span className="text-amber-200 text-sm">{bonus}</span>
                      </div>
                    ))}
                  </div>
                )}

                {plan.limits && (
                  <div className="pt-4 border-t border-gray-800">
                    {plan.limits.map((limit, idx) => (
                      <div key={idx} className="flex items-start space-x-3 mb-2">
                        <span className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400">×</span>
                        <span className="text-gray-500 text-sm">{limit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                plan.popular 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}>
                {plan.id === 'vip' ? 'Réserver ma place' : 'Commencer maintenant'}
              </button>
            </div>
          ))}
        </div>

        {/* Contact direct */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              📞 Besoin d'un accompagnement personnalisé ?
            </h3>
            <p className="text-gray-300 mb-6">
              Parlons directement de votre projet. Je vous conseille la meilleure stratégie pour votre situation.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
                <Phone className="w-5 h-5" />
                <span>WhatsApp Direct</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <div className="bg-gradient-to-r from-gray-900/50 to-black/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-400">Ils ont transformé leur business grâce à SELEZIONE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl">
                    {testimonial.photo}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 italic">"{testimonial.text}"</p>
                <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1">
                  <Trophy className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">{testimonial.results}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Questions fréquentes</h2>
          <p className="text-gray-400">Tout ce que vous devez savoir avant de commencer</p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div key={idx} className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleFAQ(idx)}
              >
                <h4 className="font-medium text-white">{faq.q}</h4>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showFAQ[idx] ? 'rotate-90' : ''}`} />
              </button>
              {showFAQ[idx] && (
                <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
                  {faq.r}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border-t border-amber-500/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à dominer le marché du luxe ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Rejoignez les 1000+ entrepreneurs qui font confiance à SELEZIONE
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Commencer maintenant - 297€/mois
            </button>
            <button className="border border-gray-600 hover:border-amber-500 text-white px-8 py-4 rounded-xl font-medium transition-all">
              Planifier un appel gratuit
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>1000+ clients satisfaits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Accès immédiat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageVente;