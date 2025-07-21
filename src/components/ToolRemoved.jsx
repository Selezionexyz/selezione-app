import React from 'react';
import { AlertTriangle, ArrowLeft, Zap } from 'lucide-react';

const ToolRemoved = ({ toolName, reason, alternatives = [] }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-black to-red-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Icône d'alerte */}
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold mb-6 text-red-400">
          Outil Retiré Temporairement
        </h1>

        {/* Message */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-red-500/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{toolName}</h2>
          <p className="text-gray-300 text-lg mb-6">{reason}</p>
          
          {alternatives.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                🔧 Alternatives disponibles :
              </h3>
              <div className="space-y-2">
                {alternatives.map((alt, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <Zap className="w-4 h-4 text-green-400 mr-2" />
                    {alt}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message de développement */}
        <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30 mb-8">
          <h3 className="text-lg font-bold text-blue-400 mb-3">
            🚀 Développement en cours
          </h3>
          <p className="text-gray-300">
            Cet outil sera remplacé par une version avec de vraies fonctionnalités 
            et des données réelles dans une prochaine mise à jour.
          </p>
        </div>

        {/* Bouton retour */}
        <button
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center mx-auto"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour au Dashboard
        </button>

      </div>
    </div>
  );
};

export default ToolRemoved;