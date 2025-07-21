import React, { useState } from 'react';
import { 
  User, Mail, Lock, Eye, EyeOff, Crown, Star, 
  CheckCircle, ArrowRight, Shield, Zap, Gift,
  Clock, Users, BarChart3, Trophy
} from 'lucide-react';

const AuthPage = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    entreprise: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);

  // Fonction d'inscription avec version d'essai
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);
    try {
      // Simulation API inscription
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser = {
        id: Date.now(),
        nom: formData.nom,
        email: formData.email,
        entreprise: formData.entreprise,
        plan: 'essai',
        trial_days_left: 14,
        trial_start: new Date().toISOString(),
        features: {
          dashboard: true,
          estimation: 5, // 5 estimations gratuites
          marketplace: true,
          scanner: 10, // 10 scans gratuits
          crm: true,
          academy: false, // Premium uniquement
          support: false, // Premium uniquement
          advanced_tools: false
        },
        credits: 100,
        subscription: 'ESSAI GRATUIT 14 JOURS',
        avatar: '🆕'
      };

      // Sauvegarder en localStorage pour simulation
      localStorage.setItem('selezione_user', JSON.stringify(newUser));
      localStorage.setItem('selezione_auth', 'true');

      onAuth(newUser);
    } catch (error) {
      alert('Erreur lors de l\'inscription');
    }
    setLoading(false);
  };

  // Fonction de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulation API connexion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Utilisateur de demo
      const demoUser = {
        id: 1,
        nom: 'Alexandre Dupont',
        email: formData.email,
        entreprise: 'Luxury Business',
        plan: 'premium',
        trial_days_left: 0,
        features: {
          dashboard: true,
          estimation: -1, // Illimité
          marketplace: true,
          scanner: -1, // Illimité
          crm: true,
          academy: true,
          support: true,
          advanced_tools: true
        },
        credits: 99999,
        subscription: 'SELEZIONE ULTIMATE',
        avatar: '👑'
      };

      localStorage.setItem('selezione_user', JSON.stringify(demoUser));
      localStorage.setItem('selezione_auth', 'true');

      onAuth(demoUser);
    } catch (error) {
      alert('Erreur de connexion');
    }
    setLoading(false);
  };

  const features_essai = [
    { icon: BarChart3, title: "Dashboard Intelligence", desc: "Accès complet aux données marché" },
    { icon: Zap, title: "5 Estimations IA", desc: "Powered by GPT-4 Turbo" },
    { icon: Users, title: "Marketplace B2B", desc: "Accès aux fournisseurs premium" },
    { icon: Shield, title: "Scanner 10 produits", desc: "Identification automatique" },
    { icon: Star, title: "CRM Fournisseurs", desc: "Gestion contacts unlimited" }
  ];

  const stats = [
    { number: "2847", label: "Membres actifs" },
    { number: "22", label: "Fournisseurs premium" },
    { number: "96%", label: "Satisfaction client" },
    { number: "€2.3M", label: "Volume traité/mois" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="min-h-screen flex">
        
        {/* Section Gauche - Présentation */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-red-600/20 p-12 flex-col justify-center relative overflow-hidden">
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10">
            {/* Logo et titre */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  S
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    SELEZIONE
                  </h1>
                  <p className="text-amber-400/70 text-sm">Plateforme B2B Luxe</p>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-4">
                La plateforme #1 pour le{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  luxe d'occasion
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Rejoignez 2800+ professionnels qui utilisent SELEZIONE pour maximiser leurs profits 
                dans la revente de luxe avec notre IA et nos 22 fournisseurs premium.
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features essai gratuit */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-green-400" />
                Inclus dans votre essai gratuit 14 jours
              </h3>
              
              <div className="space-y-4">
                {features_essai.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <feature.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Droite - Formulaire */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            
            {/* En-tête mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  SELEZIONE
                </h1>
              </div>
              <p className="text-gray-400">Plateforme B2B Luxe</p>
            </div>

            {/* Toggle Login/Signup */}
            <div className="flex bg-gray-800 rounded-lg p-1 mb-8">
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Inscription
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isLogin 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Connexion
              </button>
            </div>

            {/* Badge essai gratuit */}
            {!isLogin && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Essai gratuit 14 jours</span>
                </div>
                <p className="text-sm text-gray-300">
                  Aucune carte de crédit requise • Annulation à tout moment • Accès complet
                </p>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
              
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData(prev => ({...prev, nom: e.target.value}))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={formData.entreprise}
                      onChange={(e) => setFormData(prev => ({...prev, entreprise: e.target.value}))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      placeholder="Nom de votre entreprise (optionnel)"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="••••••••"
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="mt-1 text-xs text-gray-500">Minimum 6 caractères</p>
                )}
              </div>

              {!isLogin && (
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData(prev => ({...prev, acceptTerms: e.target.checked}))}
                    className="mt-1 w-4 h-4 text-amber-500 bg-gray-800 border-gray-700 rounded focus:ring-amber-500 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    J'accepte les{' '}
                    <a href="#" className="text-amber-400 hover:underline">
                      conditions d'utilisation
                    </a>{' '}
                    et la{' '}
                    <a href="#" className="text-amber-400 hover:underline">
                      politique de confidentialité
                    </a>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isLogin ? 'Se connecter' : 'Commencer l\'essai gratuit'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              {isLogin ? (
                <p className="text-sm text-gray-400">
                  Pas encore de compte ?{' '}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-amber-400 hover:underline font-medium"
                  >
                    Commencer l'essai gratuit
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Déjà client ?{' '}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-amber-400 hover:underline font-medium"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>

            {/* Badge sécurité */}
            <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Sécurisé par cryptage SSL 256-bit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;