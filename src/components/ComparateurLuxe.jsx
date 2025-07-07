import React, { useState, useEffect } from 'react';
import { 
  Upload, Download, Copy, Search, Filter, Eye, Heart, Share2, 
  MessageCircle, Star, TrendingUp, DollarSign, Users, MapPin,
  Calendar, Clock, CheckCircle, AlertCircle, Camera, Edit,
  Trash2, MoreVertical, ExternalLink, Zap, Target, Award,
  ShoppingCart, Package, Truck, CreditCard, Shield, Bookmark,
  BarChart3, Activity, Bell, Settings, Plus, Minus, X,
  ChevronDown, ChevronRight, ArrowRight, Loader, Send
} from 'lucide-react';

const ComparateurLuxe = () => {
  const [activeTab, setActiveTab] = useState('acheter');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // État pour vendre
  const [newListing, setNewListing] = useState({
    title: '',
    brand: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    photos: [],
    authenticity: '',
    location: '',
    shipping: true,
    negotiable: false,
    tags: []
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // API Configuration
  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  // Données simulées
  const [listings] = useState([
    {
      id: 1,
      title: "Chanel Classic Flap Medium Caviar",
      brand: "Chanel",
      category: "Sacs à main",
      price: 8500,
      originalPrice: 9200,
      condition: "Excellent",
      location: "Paris, France",
      seller: {
        name: "LuxuryParisien",
        rating: 4.9,
        sales: 156,
        verified: true,
        badge: "Pro Seller"
      },
      photos: ["🖤", "📸", "🔍", "💼"],
      description: "Authentique sac Chanel Classic Flap en cuir caviar noir, chaîne dorée.",
      tags: ["Authentique", "Boîte incluse", "Facture", "Rare"],
      views: 234,
      likes: 45,
      posted: "Il y a 2 jours",
      shipping: "Livraison assurée",
      authentication: "Certifié SELEZIONE",
      negotiable: true,
      reserved: false,
      featured: true
    }
  ]);

  const categories = [
    "Sacs à main", "Chaussures", "Prêt-à-porter", "Accessoires", 
    "Bijoux", "Montres", "Parfums", "Maroquinerie"
  ];

  const brands = [
    "Chanel", "Hermès", "Louis Vuitton", "Dior", "Saint Laurent",
    "Gucci", "Prada", "Bottega Veneta", "Balenciaga", "Celine"
  ];

  const conditions = ["Neuf", "Excellent", "Très bon", "Bon", "Correct"];

  // Upload de photos
  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    try {
      const uploadPromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id: Date.now() + Math.random(),
              file: file,
              url: e.target.result,
              name: file.name,
              size: file.size
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setUploadedPhotos(prev => [...prev, ...uploadedFiles]);
      setNewListing(prev => ({
        ...prev,
        photos: [...prev.photos, ...uploadedFiles.map(f => f.url)]
      }));
    } catch (error) {
      console.error('Erreur upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Supprimer une photo
  const removePhoto = (photoId) => {
    setUploadedPhotos(prev => prev.filter(p => p.id !== photoId));
    const photoToRemove = uploadedPhotos.find(p => p.id === photoId);
    if (photoToRemove) {
      setNewListing(prev => ({
        ...prev,
        photos: prev.photos.filter(url => url !== photoToRemove.url)
      }));
    }
  };

  // Publier une annonce - CORRIGÉ
  const publishListing = async () => {
    console.log('📝 Tentative de publication...', newListing);
    
    try {
      const response = await fetch(`${API_BASE}/api/commande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'vendeur123',
          fichier: 'marketplace-listing',
          selections: newListing
        })
      });

      console.log('📡 Réponse API:', response.status);
      
      if (response.ok) {
        alert('✅ Annonce publiée avec succès !');
        // Reset formulaire
        setNewListing({
          title: '', brand: '', category: '', condition: '', price: '',
          description: '', photos: [], authenticity: '', location: '',
          shipping: true, negotiable: false, tags: []
        });
        setUploadedPhotos([]);
        setActiveTab('acheter');
      } else {
        const errorData = await response.text();
        console.error('❌ Erreur API:', errorData);
        alert('❌ Erreur lors de la publication: ' + errorData);
      }
    } catch (error) {
      console.error('❌ Erreur publication:', error);
      alert('❌ Erreur de connexion: ' + error.message);
    }
  };
  // Interface d'achat
  const BuyerInterface = () => (
    <div className="space-y-6">
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par marque, modèle..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500"
          >
            <option value="">Toutes catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-medium hover:opacity-90 flex items-center justify-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((product) => (
          <div key={product.id} className="bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden group">
            <div className="relative">
              <div className="aspect-square bg-gray-800 flex items-center justify-center text-6xl">
                {product.photos[0]}
              </div>
              
              {product.featured && (
                <span className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  ⭐ Vedette
                </span>
              )}
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-bold text-white text-lg mb-1">{product.title}</h3>
                <p className="text-green-400 font-medium text-sm">{product.brand}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-white">{product.price.toLocaleString()}€</span>
                {product.negotiable && (
                  <span className="text-yellow-400 text-xs font-medium">Négociable</span>
                )}
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Voir détails
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Interface de vente - CORRIGÉE
  const SellerInterface = () => (
    <div className="space-y-6">
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold text-xl mb-2">💼 Vendre sur SELEZIONE Marketplace</h3>
        <p className="text-gray-300 text-sm">Plateforme professionnelle B2B pour le luxe. Commission : 5% + frais paiement.</p>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📋 Informations produit</h4>
            
            <div>
              <label className="block text-white font-medium mb-2">Titre de l'annonce *</label>
              <input
                type="text"
                value={newListing.title}
                onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                placeholder="Ex: Chanel Classic Flap Medium Caviar Noir"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Marque *</label>
                <select
                  value={newListing.brand}
                  onChange={(e) => setNewListing({...newListing, brand: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Sélectionner</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Catégorie *</label>
                <select
                  value={newListing.category}
                  onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Sélectionner</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">État *</label>
                <select
                  value={newListing.condition}
                  onChange={(e) => setNewListing({...newListing, condition: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Sélectionner</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Prix (€) *</label>
                <input
                  type="number"
                  value={newListing.price}
                  onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                  placeholder="8500"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description détaillée *</label>
              <textarea
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                placeholder="Décrivez précisément l'article : matériaux, dimensions, défauts éventuels, accessoires inclus..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Localisation</label>
                <input
                  type="text"
                  value={newListing.location}
                  onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                  placeholder="Paris, France"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Authenticité</label>
                <select
                  value={newListing.authenticity}
                  onChange={(e) => setNewListing({...newListing, authenticity: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="Facture originale">Facture originale</option>
                  <option value="Cartes d'authenticité">Cartes d'authenticité</option>
                  <option value="Certificat expert">Certificat expert</option>
                  <option value="Garantie vendeur">Garantie vendeur</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload photos */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📸 Photos (jusqu'à 10)</h4>
            
            <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-8 text-center bg-purple-500/5">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-400 font-medium mb-2">Cliquez pour ajouter des photos</p>
                <p className="text-gray-400 text-sm">JPG, PNG jusqu'à 5MB chacune</p>
              </label>
              {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                  <Loader className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 text-sm">Upload en cours...</span>
                </div>
              )}
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {uploadedPhotos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions - BOUTON CORRIGÉ */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm">
            <p>Commission SELEZIONE : 5% + frais paiement</p>
            <p>Vous recevrez : {newListing.price ? (newListing.price * 0.95).toFixed(0) : '0'}€</p>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600">
              Sauvegarder brouillon
            </button>
            <button
              onClick={publishListing}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90"
            >
              🚀 Publier l'annonce
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🏪 MARKETPLACE SELEZIONE PRO
        </h2>
        <p className="text-gray-400">Plateforme B2B professionnelle pour le luxe</p>
      </div>

      <div className="flex space-x-4">
        {[
          { id: 'acheter', label: '🛒 Acheter', icon: ShoppingCart },
          { id: 'vendre', label: '💰 Vendre', icon: Package }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-500 to-purple-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
        {activeTab === 'acheter' ? <BuyerInterface /> : <SellerInterface />}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-green-500/30 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedProduct.title}</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-8xl">
                    {selectedProduct.photos[0]}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()}€</span>
                    <p className="text-gray-300 leading-relaxed mt-4">{selectedProduct.description}</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90">
                    💬 Contacter le vendeur
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparateurLuxe;
