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
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [userProfile, setUserProfile] = useState('buyer');
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

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

  // Données simulées pour la démonstration
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
      description: "Authentique sac Chanel Classic Flap en cuir caviar noir, chaîne dorée. Acheté en boutique Chanel Rue Cambon en 2022. État exceptionnel, très peu porté. Livré avec boîte, dustbag, cartes d'authenticité et facture originale.",
      tags: ["Authentique", "Boîte incluse", "Facture", "Rare"],
      views: 234,
      likes: 45,
      posted: "Il y a 2 jours",
      shipping: "Livraison assurée",
      authentication: "Certifié SELEZIONE",
      negotiable: true,
      reserved: false,
      featured: true
    },
    {
      id: 2,
      title: "Hermès Birkin 30 Togo Étoupe",
      brand: "Hermès",
      category: "Sacs à main",
      price: 15900,
      originalPrice: 16500,
      condition: "Neuf",
      location: "Londres, UK",
      seller: {
        name: "HermèsCollector",
        rating: 5.0,
        sales: 89,
        verified: true,
        badge: "Expert Hermès"
      },
      photos: ["🤎", "✨", "🔒", "📋"],
      description: "Hermès Birkin 30 en cuir Togo couleur Étoupe, hardware palladié. Sac neuf jamais porté, reçu en boutique Hermès en décembre 2024. Plastiques encore présents sur le hardware.",
      tags: ["Neuf", "Hardware intact", "Plastiques", "Quotas"],
      views: 445,
      likes: 89,
      posted: "Il y a 5 heures",
      shipping: "Livraison express",
      authentication: "Garantie authenticité",
      negotiable: false,
      reserved: true,
      featured: true
    },
    {
      id: 3,
      title: "Louis Vuitton Neverfull MM Damier",
      brand: "Louis Vuitton",
      category: "Sacs à main",
      price: 1200,
      originalPrice: 1450,
      condition: "Très bon",
      location: "Milan, Italie",
      seller: {
        name: "ItalianLuxury",
        rating: 4.7,
        sales: 203,
        verified: true,
        badge: "Vendeur Certifié"
      },
      photos: ["🤎", "📐", "👜", "📝"],
      description: "Neverfull MM en toile Damier Ebène avec intérieur rouge. Quelques traces d'usage normale sur les anses en cuir naturel qui ont patiné. Pas de trous, déchirures ou taches.",
      tags: ["Patine naturelle", "État authentique", "Usage normal"],
      views: 156,
      likes: 23,
      posted: "Il y a 1 jour",
      shipping: "Livraison standard",
      authentication: "Vérifié",
      negotiable: true,
      reserved: false,
      featured: false
    },
    {
      id: 4,
      title: "Dior Lady Dior Medium Black",
      brand: "Dior",
      category: "Sacs à main",
      price: 4800,
      originalPrice: 5200,
      condition: "Excellent",
      location: "New York, USA",
      seller: {
        name: "NYLuxuryDealer",
        rating: 4.8,
        sales: 124,
        verified: true,
        badge: "Pro Dealer"
      },
      photos: ["🖤", "👑", "✨", "🏷️"],
      description: "Lady Dior Medium en cuir noir cannage avec charms dorés. Sac en excellent état, porté occasionnellement. Toutes les cartes et dustbag inclus.",
      tags: ["Charms inclus", "Cartes", "Dustbag", "Occasion rare"],
      views: 189,
      likes: 34,
      posted: "Il y a 3 jours",
      shipping: "International",
      authentication: "Authentifié",
      negotiable: true,
      reserved: false,
      featured: false
    }
  ]);
// Ajoute ça pour récupérer les vraies annonces
useEffect(() => {
  // Récupérer les annonces depuis la base
  const fetchListings = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/listings`);
      const data = await response.json();
      // Ajouter aux listings existants
    } catch (error) {
      console.log('Pas encore d\'API pour récupérer les annonces');
    }
  };
  fetchListings();
}, []);
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
      // Simulation upload - en réel, tu uploaderais vers ton backend
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

  // Publier une annonce
  const publishListing = async () => {
    try {
      // Validation
      if (!newListing.title || !newListing.brand || !newListing.price) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      // Appel API backend (à implémenter)
      const response = await fetch(`${API_BASE}/api/commande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  user: 'vendeur123',
  fichier: 'marketplace-listing',
  selections: newListing
})
});
    

      if (response.ok) {
        alert('Annonce publiée avec succès !');
        // Reset formulaire
        setNewListing({
          title: '', brand: '', category: '', condition: '', price: '',
          description: '', photos: [], authenticity: '', location: '',
          shipping: true, negotiable: false, tags: []
        });
        setUploadedPhotos([]);
        setActiveTab('acheter');
      }
    } catch (error) {
      console.error('Erreur publication:', error);
      alert('Erreur lors de la publication');
    }
  };

  // Interface d'achat
  const BuyerInterface = () => (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
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

        {/* Filtres avancés */}
        {showFilters && (
          <div className="border-t border-gray-700 pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Marque:</label>
              <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm">
                <option>Toutes marques</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">État:</label>
              <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm">
                <option>Tous états</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Trier par:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm"
              >
                <option value="recent">Plus récent</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="popular">Plus populaire</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Statistiques du marché */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">Annonces actives</p>
              <p className="text-white font-bold text-lg">1,247</p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">Vendeurs Pro</p>
              <p className="text-white font-bold text-lg">89</p>
            </div>
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">Ventes 24h</p>
              <p className="text-white font-bold text-lg">23</p>
            </div>
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs">Valeur totale</p>
              <p className="text-white font-bold text-lg">2.4M€</p>
            </div>
            <DollarSign className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((product) => (
          <div key={product.id} className="bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden group">
            {/* Image et badges */}
            <div className="relative">
              <div className="aspect-square bg-gray-800 flex items-center justify-center text-6xl">
                {product.photos[0]}
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.featured && (
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Vedette
                  </span>
                )}
                {product.reserved && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Réservé
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-black/70 p-2 rounded-full hover:bg-black/90">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                <button className="bg-black/70 p-2 rounded-full hover:bg-black/90">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
                <button className="bg-black/70 p-2 rounded-full hover:bg-black/90">
                  <Eye className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Photos supplémentaires */}
              <div className="absolute bottom-3 right-3 flex gap-1">
                {product.photos.slice(1, 4).map((photo, idx) => (
                  <div key={idx} className="w-8 h-8 bg-gray-700 rounded border text-xs flex items-center justify-center">
                    {photo}
                  </div>
                ))}
                {product.photos.length > 4 && (
                  <div className="w-8 h-8 bg-gray-700 rounded border text-xs flex items-center justify-center text-white">
                    +{product.photos.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Contenu */}
            <div className="p-4">
              {/* Titre et marque */}
              <div className="mb-3">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">{product.title}</h3>
                <p className="text-green-400 font-medium text-sm">{product.brand}</p>
              </div>

              {/* Prix */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white">{product.price.toLocaleString()}€</span>
                  {product.originalPrice > product.price && (
                    <span className="text-gray-400 line-through text-sm">{product.originalPrice.toLocaleString()}€</span>
                  )}
                </div>
                {product.negotiable && (
                  <span className="text-yellow-400 text-xs font-medium">Négociable</span>
                )}
              </div>

              {/* État et localisation */}
              <div className="flex items-center justify-between mb-3 text-sm">
                <span className="text-gray-400">État: <span className="text-white">{product.condition}</span></span>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-3 h-3 mr-1" />
                  {product.location}
                </div>
              </div>

              {/* Vendeur */}
              <div className="flex items-center justify-between mb-3 p-2 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {product.seller.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{product.seller.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-xs">{product.seller.rating}</span>
                      <span className="text-gray-400 text-xs">({product.seller.sales} ventes)</span>
                    </div>
                  </div>
                </div>
                
                {product.seller.verified && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {product.views}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {product.likes}
                  </span>
                </div>
                <span>{product.posted}</span>
              </div>

              {/* Actions */}
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
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Précédent
          </button>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(page => (
              <button key={page} className={`w-10 h-10 rounded-lg font-medium ${page === 1 ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );

  // Interface de vente
  const SellerInterface = () => (
    <div className="space-y-6">
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold text-xl mb-2">💼 Vendre sur SELEZIONE Marketplace</h3>
        <p className="text-gray-300 text-sm">Plateforme professionnelle B2B pour le luxe. Commission : 5% + frais payment.</p>
      </div>
      {/* Formulaire de création d'annonce */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations de base */}
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

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newListing.shipping}
                  onChange={(e) => setNewListing({...newListing, shipping: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-white text-sm">Livraison possible</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newListing.negotiable}
                  onChange={(e) => setNewListing({...newListing, negotiable: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-white text-sm">Prix négociable</label>
              </div>
            </div>
          </div>

          {/* Upload photos */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📸 Photos (jusqu'à 10)</h4>
            
            {/* Zone d'upload */}
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
                  <Loader className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                  <span className="text-purple-400 text-sm">Upload en cours...</span>
                </div>
              )}
            </div>

            {/* Aperçu photos uploadées */}
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
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {Math.round(photo.size / 1024)}KB
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Conseils photo */}
            <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
              <h5 className="text-amber-400 font-medium mb-2">💡 Conseils photos</h5>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Éclairage naturel recommandé</li>
                <li>• Montrez tous les angles importants</li>
                <li>• Photographiez les défauts éventuels</li>
                <li>• Incluez les accessoires (boîte, dustbag...)</li>
                <li>• Résolution minimum 1200x1200px</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Estimateur de prix automatique */}
        <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-blue-400 font-medium mb-1">🎯 Estimation automatique</h5>
              <p className="text-gray-300 text-sm">Utilisez notre IA pour estimer le prix optimal</p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90">
              <Zap className="w-4 h-4 mr-2 inline" />
              Estimer
            </button>
          </div>
        </div>
        {/* Actions */}
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
              disabled={!newListing.title || !newListing.brand || !newListing.price}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
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
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🏪 MARKETPLACE SELEZIONE PRO
        </h2>
        <p className="text-gray-400">Plateforme B2B professionnelle pour le luxe</p>
        <div className="mt-3 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Marché actif</span>
          </div>
          <span className="text-gray-400 text-sm">• Commission 5% • Paiement sécurisé • Support 24/7</span>
        </div>
      </div>
      {/* Navigation */}
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

      {/* Contenu principal */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
        {activeTab === 'acheter' ? <BuyerInterface /> : <SellerInterface />}
      </div>
      {/* Modal détail produit */}
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
                {/* Photos */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-8xl">
                    {selectedProduct.photos[0]}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.photos.slice(1).map((photo, idx) => (
                      <div key={idx} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                        {photo}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Détails */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()}€</span>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                          <Heart className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                          <Share2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Marque</p>
                        <p className="text-white font-medium">{selectedProduct.brand}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">État</p>
                        <p className="text-white font-medium">{selectedProduct.condition}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  {/* Vendeur */}
                  <div className="p-4 bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedProduct.seller.name[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{selectedProduct.seller.name}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-yellow-400 text-sm ml-1">{selectedProduct.seller.rating}</span>
                            </div>
                            <span className="text-gray-400 text-sm">• {selectedProduct.seller.sales} ventes</span>
                          </div>
                        </div>
                      </div>
                      {selectedProduct.seller.verified && (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      )}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90">
                      💬 Contacter le vendeur
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-blue-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-600">
                        📞 Appeler
                      </button>
                      <button className="bg-purple-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-purple-600">
                        📧 Email
                      </button>
                    </div>
                  </div>
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
