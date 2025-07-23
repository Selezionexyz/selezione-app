import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Search, Star, Globe, Mail, MessageCircle } from 'lucide-react';
import { farfetchBoutiquesCompletes } from '../data/farfetchBoutiques';

const FarfetchDirectoryTool = ({ user }) => {
  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Charger les données réelles des boutiques
    setTimeout(() => {
      setBoutiques(farfetchBoutiquesCompletes);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrage simple
  const filteredBoutiques = boutiques.filter(boutique =>
    boutique.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boutique.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boutique.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement boutiques Farfetch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Répertoire Farfetch Italie 🇮🇹
          </h1>
          <p className="text-gray-400">
            {boutiques.length} boutiques partenaires • Données complètes et réelles
          </p>
        </div>

        {/* Recherche */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher boutique, ville ou région..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des boutiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoutiques.map((boutique) => (
            <div
              key={boutique.id}
              className="bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-amber-500/50 transition-all duration-300"
            >
              {/* Header boutique */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{boutique.nom}</h3>
                  <p className="text-amber-400 text-sm mb-2 font-medium">{boutique.type}</p>
                  <div className="flex items-center space-x-2 text-gray-300 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{boutique.ville}, {boutique.region}</span>
                  </div>
                  {boutique.note && (
                    <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                      <Star className="w-4 h-4" />
                      <span>{boutique.note}</span>
                      {boutique.avis && <span className="text-gray-400">({boutique.avis} avis)</span>}
                    </div>
                  )}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  boutique.status === 'Premium' ? 'bg-amber-500/20 text-amber-400' :
                  boutique.status === 'Unique' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {boutique.status}
                </div>
              </div>

              {/* Adresse complète */}
              {boutique.adresse && (
                <div className="mb-4 p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-gray-300 text-sm">{boutique.adresse}</p>
                </div>
              )}

              {/* Contact */}
              <div className="space-y-2 mb-4">
                {/* Téléphone principal */}
                {(boutique.telephone || boutique.telephoneStore || boutique.telephoneFemme) && (
                  <a
                    href={`tel:${boutique.telephone || boutique.telephoneStore || boutique.telephoneFemme}`}
                    className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{boutique.telephone || boutique.telephoneStore || boutique.telephoneFemme}</span>
                  </a>
                )}

                {/* Téléphone homme si différent */}
                {boutique.telephoneHomme && boutique.telephoneHomme !== boutique.telephoneFemme && (
                  <a
                    href={`tel:${boutique.telephoneHomme}`}
                    className="flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{boutique.telephoneHomme} (Homme)</span>
                  </a>
                )}

                {/* WhatsApp */}
                {boutique.whatsapp && (
                  <a
                    href={`https://wa.me/${boutique.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-green-600/10 border border-green-600/30 rounded-lg px-3 py-2 text-green-300 hover:bg-green-600/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                )}

                {/* Email */}
                {(boutique.email || boutique.emailStore) && (
                  <a
                    href={`mailto:${boutique.email || boutique.emailStore}`}
                    className="flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-400 hover:bg-purple-500/20 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </a>
                )}

                {/* Site web */}
                {boutique.siteWeb && (
                  <a
                    href={`https://${boutique.siteWeb}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">Site web</span>
                  </a>
                )}
              </div>

              {/* Marques */}
              {boutique.marques && boutique.marques.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 text-xs mb-2">Marques principales:</p>
                  <div className="flex flex-wrap gap-1">
                    {boutique.marques.slice(0, 3).map((marque, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                        {marque}
                      </span>
                    ))}
                    {boutique.marques.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/30 rounded text-xs text-gray-400">
                        +{boutique.marques.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {boutique.description && (
                <p className="text-gray-400 text-sm italic">{boutique.description}</p>
              )}

              {/* Badge partenaire */}
              <div className="flex justify-between items-center mt-4">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-400">
                  Partenaire Farfetch
                </span>
                <span className="text-xs text-gray-500">#{boutique.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Résultats vides */}
        {filteredBoutiques.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">Aucune boutique trouvée</p>
            <p className="text-gray-500 text-sm">Essayez un autre terme de recherche</p>
          </div>
        )}

        {/* Statistiques */}
        <div className="mt-12 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Statistiques du répertoire</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{boutiques.length}</div>
              <div className="text-gray-400 text-sm">Boutiques totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {boutiques.filter(b => b.status === 'Premium').length}
              </div>
              <div className="text-gray-400 text-sm">Premium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {new Set(boutiques.map(b => b.region)).size}
              </div>
              <div className="text-gray-400 text-sm">Régions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {new Set(boutiques.map(b => b.ville)).size}
              </div>
              <div className="text-gray-400 text-sm">Villes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarfetchDirectoryTool;