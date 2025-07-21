import React, { useState, useEffect } from "react";
import SaasLayout from "./components/SaasLayout";
import AuthPage from "./components/AuthPage";
import AnimationAccueil from "./components/AnimationAccueil";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('selezione_auth');
      const userData = localStorage.getItem('selezione_user');
      const welcomeShown = localStorage.getItem('selezione_welcome_shown');
      
      // Déterminer si on doit montrer l'animation d'accueil
      if (!welcomeShown) {
        setShowWelcome(true);
      }
      
      if (authStatus === 'true' && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erreur parsing user data:', error);
          localStorage.removeItem('selezione_auth');
          localStorage.removeItem('selezione_user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction d'authentification
  const handleAuth = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Redirection automatique vers le dashboard
    setTimeout(() => {
      window.location.reload(); // Pour s'assurer que tout est bien initialisé
    }, 1000);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('selezione_auth');
    localStorage.removeItem('selezione_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Fonction appelée quand l'animation d'accueil se termine
  const handleWelcomeComplete = () => {
    localStorage.setItem('selezione_welcome_shown', 'true');
    setShowWelcome(false);
  };

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">
            S
          </div>
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement de SELEZIONE...</p>
        </div>
      </div>
    );
  }

  // Afficher l'animation d'accueil si c'est la première fois
  if (showWelcome) {
    return <AnimationAccueil onComplete={handleWelcomeComplete} />;
  }

  // Si non authentifié, afficher la page d'inscription/connexion
  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />;
  }

  // Si authentifié, afficher l'application avec contexte utilisateur
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <SaasLayout user={user} onLogout={handleLogout} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
