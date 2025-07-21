import React, { useState, useEffect } from "react";
import SafeSaasLayout from "./components/SafeSaasLayout";
import AuthPage from "./components/AuthPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('selezione_auth');
      const userData = localStorage.getItem('selezione_user');
      
      if (authStatus === 'true' && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('selezione_auth');
          localStorage.removeItem('selezione_user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('selezione_auth');
    localStorage.removeItem('selezione_user');
    setUser(null);
    setIsAuthenticated(false);
  };

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

  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SaasLayout user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;