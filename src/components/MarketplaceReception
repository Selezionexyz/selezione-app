// ✅ Version corrigée JSX-safe pour Render/Vite import React, { useState, useEffect, useCallback, useMemo } from 'react'; import { Search, RefreshCw, Eye, Heart, MessageCircle, X, Loader, Tag, MapPin, Clock, Truck, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';

const MarketplaceReception = () => { const [listings, setListings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(null); const [searchQuery, setSearchQuery] = useState(''); const [selectedProduct, setSelectedProduct] = useState(null); const API_BASE = 'https://selezione-ia-backend.onrender.com';

const fetchListings = useCallback(async () => { try { setLoading(true); const res = await fetch(${API_BASE}/api/commandes); const data = await res.json(); const raw = Array.isArray(data) ? data : (data.commandes || data.data || []); const parsed = raw.map((item, idx) => ({ id: item.id || cmd_${idx}, title: item.title || 'Produit inconnu', brand: item.brand || 'Marque inconnue', category: item.category || 'Non catégorisé', condition: item.condition || 'Inconnu', price: item.price || 0, photos: item.photos || [], created_at: item.created_at || new Date().toISOString(), location: item.location || 'Non précisée', shipping: item.shipping !== false, user: item.user || 'Utilisateur', status: item.status || 'recu', views: Math.floor(Math.random() * 100), likes: Math.floor(Math.random() * 20), })); setListings(parsed); } catch (err) { setError('Erreur de chargement des produits.'); } finally { setLoading(false); } }, []);

useEffect(() => { fetchListings(); }, [fetchListings]);

const formatPrice = (p) => ${parseFloat(p || 0).toLocaleString('fr-FR')}€; const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR');

const handleConfirmReception = async (id) => { try { await fetch(${API_BASE}/api/commande/valider/${id}, { method: 'POST' }); fetchListings(); } catch (e) { alert("Erreur lors de la confirmation."); } };

const filteredListings = useMemo(() => { return listings.filter((p) => { const searchable = ${p.title} ${p.brand} ${p.category}.toLowerCase(); return searchable.includes(searchQuery.toLowerCase()); }); }, [searchQuery, listings]);

return ( <div className="p-6 space-y-6"> <div className="flex justify-between items-center"> <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"> 🛍️ Réception des Produits </h2> <button
onClick={fetchListings}
className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
> <RefreshCw className="w-4 h-4 mr-2" /> Rafraîchir </button> </div>

<input
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="🔍 Rechercher un produit reçu..."
    className="w-full p-3 bg-gray-800 text-white rounded-lg placeholder-gray-400"
  />

  {loading ? (
    <div className="flex justify-center py-12">
      <Loader className="w-10 h-10 animate-spin text-green-400" />
    </div>
  ) : error ? (
    <div className="text-red-500 text-center flex items-center justify-center space-x-2">
      <AlertCircle className="w-5 h-5" />
      <span>{error}</span>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredListings.map((p) => (
        <div key={p.id} className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
          <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
            {p.photos.length > 0 ? (
              <img src={p.photos[0]} alt={p.title} className="object-cover h-full w-full" />
            ) : (
              <span className="text-gray-500">📦 Aucune image</span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white line-clamp-2">{p.title}</h3>
          <p className="text-green-400 text-sm">{p.brand}</p>
          <p className="text-sm text-gray-400">{p.category}</p>
          <p className="text-white font-bold text-xl">{formatPrice(p.price)}</p>
          <p className="text-xs text-gray-500">📍 {p.location} • 📅 {formatDate(p.created_at)}</p>

          {p.status === 'recu-confirmé' ? (
            <span className="text-xs text-green-400 font-semibold bg-green-800/30 px-2 py-1 rounded-full">
              ✅ Reçu confirmé
            </span>
          ) : (
            <button
              onClick={() => handleConfirmReception(p.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-1" /> Confirmer réception
            </button>
          )}

          <div className="text-xs text-gray-400 flex items-center space-x-3">
            <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> {p.views}</span>
            <span className="flex items-center"><Heart className="w-3 h-3 mr-1" /> {p.likes}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

); };

export default MarketplaceReception;
