import React, { useState, useEffect } from 'react';
import { 
  Globe, ExternalLink, Lock, CheckCircle, AlertCircle, 
  RefreshCw, User, Key, ArrowRight
} from 'lucide-react';

const SiteB2BFournisseur = () => {
  const [connectionStatus, setConnectionStatus] = useState('ready');
  const [isConnecting, setIsConnecting] = useState(false);

  // CONFIGURATION CONNEXION
  const B2B_CONFIG = {
    site_url: 'https://b2bfashion.online/',
    email: 'Selezione.xyz@hotmail.com',
    password: 'Selezione.xyz@hotmail.com'
  };

  // CONNEXION DIRECTE AU SITE
  const connectToB2B = () => {
    setIsConnecting(true);
    
    // Ouvrir le site dans un nouvel onglet
    const newWindow = window.open(B2B_CONFIG.site_url, '_blank');
    
    if (newWindow) {
      setConnectionStatus('connected');
      setTimeout(() => {
        setIsConnecting(false);
      }, 2000);
    } else {
      setConnectionStatus('error');
      setIsConnecting(false);
    }
  };

  const getStatusColor = () => {
    const colors = {
      'ready': 'text-blue-400 bg-blue-500/20',
      'connected': 'text-green-400 bg-green-500/20',
      'error': 'text-red-400 bg-red-500/20'
    };
    return colors[connectionStatus] || 'text-gray-400 bg-gray-500/20';
  };

  const getStatusText = () => {
    const texts = {
      'ready': 'Prêt à connecter',
      'connected': 'Site ouvert',
      'error': 'Erreur d\'ouverture'
    };
    return texts[connectionStatus] || 'Inconnu';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* HEADER */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Site B2B Fournisseur
            </h1>
            <p className="text-gray-400">Accès direct à B2BFashion.online</p>
          </div>
        </div>
      </div>

      {/* ACCÈS SITE */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center">
          
          {/* LOGO/ICONE SITE */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">B2BFashion.online</h2>
          <p className="text-gray-400 mb-6">Plateforme fournisseurs mode et accessoires</p>
          
          {/* STATUT */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg mb-6 ${getStatusColor()}`}>
            {connectionStatus === 'connected' ? (
              <CheckCircle className="w-5 h-5" />
            ) : connectionStatus === 'error' ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <Lock className="w-5 h-5" />
            )}
            <span className="font-medium">{getStatusText()}</span>
          </div>

          {/* INFOS CONNEXION */}
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Identifiant:
                </span>
                <span className="text-white font-mono">{B2B_CONFIG.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  Mot de passe:
                </span>
                <span className="text-white font-mono">●●●●●●●●●●●●●●●●●●●●●</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Site:
                </span>
                <span className="text-blue-400">{B2B_CONFIG.site_url}</span>
              </div>
            </div>
          </div>

          {/* BOUTON CONNEXION */}
          <button
            onClick={connectToB2B}
            disabled={isConnecting}
            className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all transform hover:scale-105"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-6 h-6" />
                <span>Accéder au Site B2B</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>

          {/* INSTRUCTIONS */}
          <div className="mt-6 text-left bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold mb-2">📋 Instructions:</h4>
            <ol className="text-gray-300 text-sm space-y-1">
              <li>1. Cliquez sur "Accéder au Site B2B"</li>
              <li>2. Le site s'ouvre dans un nouvel onglet</li>
              <li>3. Connectez-vous avec les identifiants affichés</li>
              <li>4. Parcourez le catalogue fournisseurs</li>
            </ol>
          </div>

          {/* ACCÈS RAPIDE */}
          <div className="mt-4">
            <a 
              href={B2B_CONFIG.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Lien direct</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-6 border-t border-gray-700">
        <p className="text-gray-400">
          🌐 Accès sécurisé à votre plateforme B2B fournisseurs
        </p>
      </div>
    </div>
  );
};

export default SiteB2BFournisseur;