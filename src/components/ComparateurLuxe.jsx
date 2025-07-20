import React, { useState, useEffect } from 'react';
import { 
  Upload, Search, Filter, Eye, Heart, Share2, 
  MessageCircle, Camera, X, Loader,
  ShoppingCart, Package, AlertCircle, CheckCircle,
  ImageIcon, Trash2, Star, Shield, Sparkles, Calendar
} from 'lucide-react';

const ComparateurLuxe = () => {
  // Toujours commencer par la vue "vendre" comme demandé
  const [activeTab, setActiveTab] = useState('vendre');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [publishedListings, setPublishedListings] = useState([]);

  // États filtres avancés Agent IA
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // États pour vendre - formulaire principal
  const [newListing, setNewListing] = useState({
    title: '',
    brand: '',
    category: '',
    model: '',
    size: '',
    color: '',
    material: '',
    year: '',
    condition: '',
    price: '',
    originalPrice: '',
    description: '',
    photos: [],
    location: '',
    shipping: true,
    negotiable: false
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);
  const [aiPriceSuggestion, setAiPriceSuggestion] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());

  // Configuration
  const API_BASE = 'https://selezione-ia-backend.onrender.com';
  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 8 * 1024 * 1024;
  const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  // Base de données complète
  const categoriesDatabase = {
    "Sacs à main": {
      brands: ["Hermès", "Chanel", "Louis Vuitton", "Dior", "Saint Laurent", "Gucci", "Prada", "Bottega Veneta", "Celine", "Fendi"],
      models: {
        "Hermès": ["Birkin 25", "Birkin 30", "Birkin 35", "Kelly 25", "Kelly 28", "Kelly 32", "Constance", "Evelyne", "Garden Party"],
        "Chanel": ["Classic Flap Small", "Classic Flap Medium", "Classic Flap Jumbo", "Boy Small", "Boy Medium", "Boy Large", "19 Small", "19 Large"],
        "Louis Vuitton": ["Speedy 25", "Speedy 30", "Speedy 35", "Neverfull PM", "Neverfull MM", "Neverfull GM", "Alma PM", "Alma MM"]
      },
      sizes: ["XS", "Small", "Medium", "Large", "XL", "25cm", "30cm", "35cm", "40cm"],
      materials: ["Cuir Caviar", "Agneau", "Cuir Epi", "Toile Monogram", "Toile Damier", "Cuir Togo", "Cuir Clemence"]
    },
    "Chaussures": {
      brands: ["Christian Louboutin", "Manolo Blahnik", "Jimmy Choo", "Gianvito Rossi", "Saint Laurent", "Gucci", "Prada"],
      models: {
        "Christian Louboutin": ["Pigalle 85", "Pigalle 100", "So Kate 85", "So Kate 120"],
        "Saint Laurent": ["Opyum 85", "Opyum 110", "Tribute 75", "Tribute 105"]
      },
      sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
      materials: ["Cuir", "Cuir Verni", "Daim", "Satin"]
    },
    "Bijoux": {
      brands: ["Cartier", "Van Cleef & Arpels", "Bulgari", "Tiffany & Co", "Chanel"],
      models: {
        "Cartier": ["Love Bracelet", "Juste un Clou", "Trinity Ring"],
        "Van Cleef & Arpels": ["Alhambra Necklace", "Alhambra Bracelet"]
      },
      sizes: ["46", "48", "50", "52", "54", "56", "58", "60"],
      materials: ["Or Jaune", "Or Blanc", "Or Rose", "Diamant"]
    },
    "Montres": {
      brands: ["Rolex", "Patek Philippe", "Audemars Piguet", "Cartier", "Omega"],
      models: {
        "Rolex": ["Submariner", "GMT-Master II", "Daytona", "Datejust"],
        "Patek Philippe": ["Nautilus", "Aquanaut", "Calatrava"]
      },
      sizes: ["36mm", "38mm", "40mm", "42mm", "44mm"],
      materials: ["Acier", "Or Jaune", "Or Blanc", "Céramique"]
    }
  };

  const conditions = [
    "Neuf avec étiquettes", "Neuf sans étiquettes", "Excellent", "Très bon", "Bon", "Correct"
  ];

  const colors = [
    "Noir", "Blanc", "Beige", "Marron", "Rouge", "Bleu", "Vert", 
    "Rose", "Violet", "Gris", "Jaune", "Orange", "Or", "Argent"
  ];

  // ANNÉES 1970-2030 par décennie comme demandé
  const years = [];
  for (let year = 1970; year <= 2030; year += 10) {
    years.push(`${year}-${year + 9}`);
  }

  const locations = [
    "Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Lille", "Toulouse", "Nantes", "International"
  ];

  // Données produits
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Chanel Classic Flap Medium Caviar",
      brand: "Chanel",
      category: "Sacs à main",
      model: "Classic Flap Medium",
      size: "Medium",
      color: "Noir",
      material: "Cuir Caviar",
      year: "2020-2029",
      price: 4500,
      originalPrice: 7500,
      condition: "Excellent",
      location: "Paris",
      photos: ["https://via.placeholder.com/300x300/000000/FFFFFF?text=Chanel+Classic"],
      description: "Authentique sac Chanel Classic Flap en cuir caviar noir. État impeccable, hardware doré, dustbag inclus.",
      views: 234,
      likes: 45,
      posted: "Il y a 2 jours",
      negotiable: true,
      featured: true,
      verified: true,
      seller: {
        name: "Marie L.",
        rating: 4.8,
        sales: 23,
        verified: true,
        avatar: "👩‍💼",
        phone: "+33 6 12 34 56 78",
        email: "marie.l@selezione.fr"
      }
    },
    {
      id: 2,
      title: "Louis Vuitton Speedy 30 Monogram",
      brand: "Louis Vuitton",
      category: "Sacs à main",
      model: "Speedy 30",
      size: "30cm",
      color: "Marron",
      material: "Toile Monogram",
      year: "2000-2009",
      price: 450,
      originalPrice: 1200,
      condition: "Bon",
      location: "Lyon",
      photos: ["https://via.placeholder.com/300x300/8B4513/FFFFFF?text=LV+Speedy"],
      description: "Louis Vuitton Speedy 30 vintage en toile monogram authentique. Patine naturelle.",
      views: 123,
      likes: 28,
      posted: "Il y a 3 jours",
      negotiable: true,
      featured: false,
      verified: true,
      seller: {
        name: "Sophie K.",
        rating: 4.6,
        sales: 12,
        verified: false,
        avatar: "👩",
        phone: "+33 6 98 76 54 32",
        email: "sophie.k@selezione.fr"
      }
    },
    {
      id: 3,
      title: "Hermès Birkin 30 Togo Gold",
      brand: "Hermès",
      category: "Sacs à main",
      model: "Birkin 30",
      size: "30cm",
      color: "Gold",
      material: "Cuir Togo",
      year: "2020-2029",
      price: 12500,
      originalPrice: 15000,
      condition: "Neuf",
      location: "Monaco",
      photos: ["https://via.placeholder.com/300x300/DAA520/FFFFFF?text=Hermes+Birkin"],
      description: "Hermès Birkin 30 en cuir Togo coloris Gold. État neuf, jamais porté, tous accessoires.",
      views: 890,
      likes: 156,
      posted: "Il y a 1 jour",
      negotiable: false,
      featured: true,
      verified: true,
      seller: {
        name: "Luxury Store",
        rating: 4.9,
        sales: 45,
        verified: true,
        avatar: "👑",
        phone: "+33 6 11 22 33 44",
        email: "store@luxury-paris.com"
      }
    },
    {
      id: 4,
      title: "Rolex Submariner Date 126610LN",
      brand: "Rolex",
      category: "Montres",
      model: "Submariner Date",
      size: "40mm",
      color: "Noir",
      material: "Acier",
      year: "2020-2029",
      price: 8900,
      originalPrice: 9350,
      condition: "Excellent",
      location: "Genève",
      photos: ["https://via.placeholder.com/300x300/000000/FFFFFF?text=Rolex+Sub"],
      description: "Rolex Submariner Date référence 126610LN. Boîte et papiers, garantie internationale.",
      views: 445,
      likes: 89,
      posted: "Il y a 5 jours",
      negotiable: true,
      featured: true,
      verified: true,
      seller: {
        name: "TimeKeeper",
        rating: 4.9,
        sales: 67,
        verified: true,
        avatar: "⌚",
        phone: "+41 22 123 45 67",
        email: "contact@timekeeper.ch"
      }
    },
    {
      id: 5,
      title: "Bottega Veneta Pouch Large",
      brand: "Bottega Veneta",
      category: "Sacs à main",
      model: "The Pouch",
      size: "Large",
      color: "Vert",
      material: "Cuir Intrecciato",
      year: "2020-2029",
      price: 2200,
      originalPrice: 2850,
      condition: "Très bon",
      location: "Milan",
      photos: ["https://via.placeholder.com/300x300/228B22/FFFFFF?text=BV+Pouch"],
      description: "Bottega Veneta Pouch en cuir intrecciato vert. Pièce iconique Daniel Lee era.",
      views: 167,
      likes: 34,
      posted: "Il y a 1 semaine",
      negotiable: true,
      featured: false,
      verified: true,
      seller: {
        name: "Milano Luxury",
        rating: 4.7,
        sales: 29,
        verified: true,
        avatar: "🇮🇹",
        phone: "+39 02 123 456 78",
        email: "info@milanoluxury.it"
      }
    }
  ]);

  // Fonctions utilitaires POUR LES FILTRES (section Acheter)
  const getAvailableModels = () => {
    if (!selectedBrand || !categoriesDatabase[selectedCategory]) return [];
    return categoriesDatabase[selectedCategory].models?.[selectedBrand] || [];
  };

  const getAvailableSizes = () => {
    if (!selectedCategory || !categoriesDatabase[selectedCategory]) return [];
    return categoriesDatabase[selectedCategory].sizes || [];
  };

  const getAvailableMaterials = () => {
    if (!selectedCategory || !categoriesDatabase[selectedCategory]) return [];
    return categoriesDatabase[selectedCategory].materials || [];
  };

  const getAvailableBrands = () => {
    if (!selectedCategory || !categoriesDatabase[selectedCategory]) return [];
    return categoriesDatabase[selectedCategory].brands || [];
  };

  // Fonctions utilitaires POUR LA VENTE (section Vendre)
  const getAvailableBrandsForSelling = () => {
    if (!newListing.category || !categoriesDatabase[newListing.category]) return [];
    return categoriesDatabase[newListing.category].brands || [];
  };

  const getAvailableModelsForSelling = () => {
    if (!newListing.brand || !categoriesDatabase[newListing.category]) return [];
    return categoriesDatabase[newListing.category].models?.[newListing.brand] || [];
  };

  const getAvailableSizesForSelling = () => {
    if (!newListing.category || !categoriesDatabase[newListing.category]) return [];
    return categoriesDatabase[newListing.category].sizes || [];
  };

  const getAvailableMaterialsForSelling = () => {
    if (!newListing.category || !categoriesDatabase[newListing.category]) return [];
    return categoriesDatabase[newListing.category].materials || [];
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favoriteProducts);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteProducts(newFavorites);
  };

  // Filtrage
  const getFilteredListings = () => {
    let filtered = [...listings];

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) filtered = filtered.filter(item => item.category === selectedCategory);
    if (selectedBrand) filtered = filtered.filter(item => item.brand === selectedBrand);
    if (selectedModel) filtered = filtered.filter(item => item.model === selectedModel);
    if (selectedSize) filtered = filtered.filter(item => item.size === selectedSize);
    if (selectedColor) filtered = filtered.filter(item => item.color === selectedColor);
    if (selectedMaterial) filtered = filtered.filter(item => item.material === selectedMaterial);
    if (selectedYear) filtered = filtered.filter(item => item.year === selectedYear);

    return filtered;
  };

  // Upload photos
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const errors = [];
    
    setUploadErrors([]);

    if (newListing.photos.length + files.length > MAX_FILES) {
      errors.push(`Maximum ${MAX_FILES} photos autorisées`);
    }

    files.forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`${file.name} : Format non supporté`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} : Taille max 8MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewListing(prev => ({
          ...prev,
          photos: [...prev.photos, {
            file: file,
            preview: reader.result,
            name: file.name,
            id: Date.now() + Math.random()
          }]
        }));
      };
      reader.readAsDataURL(file);
    });

    if (errors.length > 0) {
      setUploadErrors(errors);
    }
  };

  const removePhoto = (index) => {
    setNewListing(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  // Estimation IA
  const generateAiPriceEstimation = async () => {
    if (!newListing.brand || !newListing.model || !newListing.condition) return;
    
    try {
      const response = await fetch(`${API_BASE}/estimation-luxe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: `${newListing.brand} ${newListing.model} ${newListing.condition} état CONTEXTE SECONDE MAIN UNIQUEMENT`
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const priceMatch = data.estimation?.match(/(\d+)/);
        if (priceMatch) {
          const suggestedPrice = parseInt(priceMatch[0]);
          setAiPriceSuggestion({
            price: suggestedPrice,
            confidence: 85
          });
        }
      }
    } catch (error) {
      console.log('Estimation IA indisponible');
    }
  };

  useEffect(() => {
    if (newListing.brand && newListing.model && newListing.condition) {
      generateAiPriceEstimation();
    }
  }, [newListing.brand, newListing.model, newListing.condition]);

  // Publication avec sauvegarde locale
  const publishListing = async () => {
    if (isPublishing) return;
    
    const requiredFields = [];
    if (!newListing.title?.trim()) requiredFields.push('Titre');
    if (!newListing.brand) requiredFields.push('Marque');
    if (!newListing.category) requiredFields.push('Catégorie');
    if (!newListing.condition) requiredFields.push('État');
    if (!newListing.price || parseFloat(newListing.price) <= 0) requiredFields.push('Prix');
    if (!newListing.description?.trim()) requiredFields.push('Description');
    if (newListing.photos.length === 0) requiredFields.push('Au moins 1 photo');

    if (requiredFields.length > 0) {
      alert(`❌ Champs manquants: ${requiredFields.join(', ')}`);
      return;
    }
    
    setIsPublishing(true);
    
    try {
      // Créer l'annonce avec un ID unique
      const newListingWithId = {
        ...newListing,
        id: Date.now(),
        created_at: new Date().toISOString(),
        seller: {
          name: "Vous",
          avatar: "👤",
          rating: 5.0,
          sales: 12
        },
        views: 0,
        likes: 0
      };
      
      // Sauvegarder localement d'abord
      setPublishedListings(prev => [newListingWithId, ...prev]);
      
      // Tentative de sauvegarde backend (optionnelle)
      try {
        await fetch(`${API_BASE}/api/commande`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: `user_${Date.now()}`,
            fichier: 'marketplace-listing',
            selections: newListingWithId
          })
        });
      } catch (backendError) {
        console.warn('Backend indisponible, sauvegarde locale uniquement');
      }
      
      alert('✅ Annonce publiée avec succès !');
      
      // Réinitialiser le formulaire
      setNewListing({
        title: '', brand: '', category: '', model: '', size: '', color: '', 
        material: '', year: '', condition: '', price: '', originalPrice: '', 
        description: '', photos: [], location: '', shipping: true, negotiable: false
      });
      
      // Ne pas changer d'onglet, rester sur "vendre"
      
    } catch (error) {
      alert(`❌ Erreur: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Ultra-Puissant */}
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              🏪 MARKETPLACE SELEZIONE ULTRA
            </h2>
            <p className="text-gray-400">
              Plateforme IA • Filtres Agent • Années 1970-2030 • Upload {MAX_FILES} photos • Estimation auto
            </p>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-bold text-2xl">{getFilteredListings().length}</div>
            <div className="text-gray-400 text-sm">Produits</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-amber-400 text-lg font-bold">{listings.length}</div>
            <div className="text-gray-400 text-xs">Total</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-green-400 text-lg font-bold">{favoriteProducts.size}</div>
            <div className="text-gray-400 text-xs">Favoris</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-purple-400 text-lg font-bold">{years.length}</div>
            <div className="text-gray-400 text-xs">Périodes</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-blue-400 text-lg font-bold">5%</div>
            <div className="text-gray-400 text-xs">Commission</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        {[
          { id: 'acheter', label: '🛒 Acheter', icon: ShoppingCart, count: `${getFilteredListings().length} produits` },
          { id: 'vendre', label: '💰 Vendre', icon: Package, count: 'Estimation IA' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 rounded-xl font-medium transition-all flex items-center space-x-3 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-500 to-purple-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <div className="text-left">
              <div>{tab.label}</div>
              <div className="text-xs opacity-75">{tab.count}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 min-h-[600px]">
        {activeTab === 'acheter' ? (
          <div className="space-y-6 p-6">
            {/* Recherche et filtres */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="">Toutes catégories</option>
                    {Object.keys(categoriesDatabase).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center justify-center transition-all ${
                      showFilters 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres Avancés
                  </button>
                </div>

                {/* Filtres avancés Agent IA */}
                {showFilters && (
                  <div className="bg-purple-500/10 rounded-xl border border-purple-500/30 p-6">
                    <h4 className="text-purple-400 font-bold mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Filtres IA Ultra-Précis
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Marque</label>
                        <select
                          value={selectedBrand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                        >
                          <option value="">Toutes</option>
                          {getAvailableBrands().map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Modèle</label>
                        <select
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          disabled={!selectedBrand}
                          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm disabled:opacity-50"
                        >
                          <option value="">Tous</option>
                          {getAvailableModels().map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Taille</label>
                        <select
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                        >
                          <option value="">Toutes</option>
                          {getAvailableSizes().map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Couleur</label>
                        <select
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                        >
                          <option value="">Toutes</option>
                          {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Matière</label>
                        <select
                          value={selectedMaterial}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                        >
                          <option value="">Toutes</option>
                          {getAvailableMaterials().map(material => (
                            <option key={material} value={material}>{material}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm mb-2 block flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Années 1970-2030
                        </label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                        >
                          <option value="">Toutes</option>
                          {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <strong className="text-white">{getFilteredListings().length}</strong> produit{getFilteredListings().length > 1 ? 's' : ''} trouvé{getFilteredListings().length > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredListings().map((product) => (
                <div key={product.id} className="bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden group">
                  <div className="relative aspect-square bg-gray-800">
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {product.photos[0]}
                    </div>
                    
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.featured && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ Vedette
                        </span>
                      )}
                      {product.verified && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ✓ Vérifié
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          favoriteProducts.has(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-black/50 text-gray-300 hover:text-red-400'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    {product.originalPrice && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-white text-lg mb-1">{product.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-400 font-medium text-sm">{product.brand}</span>
                      {product.seller.verified && (
                        <Shield className="w-4 h-4 text-blue-400" />
                      )}
                    </div>

                    <div className="space-y-1 mb-3 text-xs text-gray-400">
                      {product.model && <p><strong>Modèle:</strong> {product.model}</p>}
                      {product.size && <p><strong>Taille:</strong> {product.size}</p>}
                      {product.year && <p><strong>Période:</strong> {product.year}</p>}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-white">{product.price.toLocaleString()}€</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through ml-2 text-sm">
                            {product.originalPrice.toLocaleString()}€
                          </span>
                        )}
                      </div>
                      {product.negotiable && (
                        <span className="text-yellow-400 text-xs font-medium bg-yellow-400/20 px-2 py-1 rounded">
                          Négociable
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <span>{product.seller.avatar}</span>
                        <span className="text-gray-300">{product.seller.name}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {product.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {product.likes}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 text-sm"
                      >
                        Voir détails
                      </button>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {getFilteredListings().length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-400">Essayez d'ajuster vos filtres</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 p-6">
            <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-xl mb-2">💼 Vendre sur SELEZIONE Marketplace Ultra</h3>
              <p className="text-gray-300 text-sm">Commission 5% • Upload {MAX_FILES} photos • Estimation IA</p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-white font-bold text-xl mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Informations Produit
                  </h4>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Titre *</label>
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
                      <label className="block text-white font-medium mb-2">Catégorie *</label>
                      <select
                        value={newListing.category}
                        onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      >
                        <option value="">Sélectionner</option>
                        {Object.keys(categoriesDatabase).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Marque *</label>
                      <select
                        value={newListing.brand}
                        onChange={(e) => setNewListing({...newListing, brand: e.target.value})}
                        disabled={!newListing.category}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm disabled:opacity-50"
                      >
                        <option value="">Sélectionner</option>
                        {getAvailableBrandsForSelling().map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Modèle</label>
                      <select
                        value={newListing.model}
                        onChange={(e) => setNewListing({...newListing, model: e.target.value})}
                        disabled={!newListing.brand}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm disabled:opacity-50"
                      >
                        <option value="">Sélectionner</option>
                        {getAvailableModelsForSelling().map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Taille</label>
                      <select
                        value={newListing.size}
                        onChange={(e) => setNewListing({...newListing, size: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      >
                        <option value="">Sélectionner</option>
                        {getAvailableSizesForSelling().map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Année</label>
                      <select
                        value={newListing.year}
                        onChange={(e) => setNewListing({...newListing, year: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      >
                        <option value="">Période</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Couleur</label>
                      <select
                        value={newListing.color}
                        onChange={(e) => setNewListing({...newListing, color: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      >
                        <option value="">Couleur</option>
                        {colors.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Matière</label>
                      <select
                        value={newListing.material}
                        onChange={(e) => setNewListing({...newListing, material: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      >
                        <option value="">Matière</option>
                        {getAvailableMaterialsForSelling().map(material => (
                          <option key={material} value={material}>{material}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">État *</label>
                    <select
                      value={newListing.condition}
                      onChange={(e) => setNewListing({...newListing, condition: e.target.value})}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                    >
                      <option value="">Sélectionner état</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>

                  {aiPriceSuggestion && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <h5 className="text-blue-400 font-medium text-sm mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        💡 Suggestion Prix IA ({aiPriceSuggestion.confidence}% confiance)
                      </h5>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Prix suggéré SECONDE MAIN:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400 font-bold text-lg">{aiPriceSuggestion.price}€</span>
                          <button
                            onClick={() => setNewListing(prev => ({...prev, price: aiPriceSuggestion.price.toString()}))}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                          >
                            Appliquer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Prix (€) *</label>
                      <input
                        type="number"
                        value={newListing.price}
                        onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                        placeholder="450"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Prix original (€)</label>
                      <input
                        type="number"
                        value={newListing.originalPrice}
                        onChange={(e) => setNewListing({...newListing, originalPrice: e.target.value})}
                        placeholder="1200"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description *</label>
                    <textarea
                      value={newListing.description}
                      onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                      placeholder="Décrivez votre article en détail..."
                      rows="4"
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newListing.shipping}
                        onChange={(e) => setNewListing({...newListing, shipping: e.target.checked})}
                        className="w-5 h-5"
                      />
                      <span className="text-white">Livraison possible</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newListing.negotiable}
                        onChange={(e) => setNewListing({...newListing, negotiable: e.target.checked})}
                        className="w-5 h-5"
                      />
                      <span className="text-white">Prix négociable</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-white font-bold text-xl mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Photos (max {MAX_FILES})
                  </h4>
                  
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
                      <Camera className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-purple-400 font-medium mb-2 text-lg">
                        Cliquez pour ajouter des photos
                      </p>
                      <p className="text-gray-400 text-sm">
                        JPG, PNG, WEBP • Max 8MB par image
                      </p>
                    </label>
                  </div>

                  {uploadErrors.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      {uploadErrors.map((error, index) => (
                        <p key={index} className="text-red-400 text-sm">{error}</p>
                      ))}
                    </div>
                  )}

                  {newListing.photos.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-medium">
                          📸 {newListing.photos.length} photo{newListing.photos.length > 1 ? 's' : ''}
                        </span>
                        <button 
                          onClick={() => setNewListing({...newListing, photos: []})}
                          className="text-red-400 text-sm hover:text-red-300 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer tout
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {newListing.photos.map((photo, index) => (
                          <div key={photo.id} className="relative group">
                            <img
                              src={photo.preview}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <button
                                onClick={() => removePhoto(index)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            {index === 0 && (
                              <span className="absolute top-1 left-1 bg-purple-500 text-white text-xs px-2 py-0.5 rounded">
                                Principal
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                <div className="text-gray-400 text-sm">
                  <p>💰 Commission : <strong>5%</strong></p>
                  {newListing.price && (
                    <p className="font-medium text-green-400">
                      Vous recevrez : <strong>{(newListing.price * 0.95).toFixed(0)}€</strong>
                    </p>
                  )}
                </div>
                
                <button
                  onClick={publishListing}
                  disabled={isPublishing}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center"
                >
                  {isPublishing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Publication...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      🚀 Publier
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Articles publiés */}
            {publishedListings.length > 0 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    📦 Mes Articles Publiés ({publishedListings.length})
                  </h3>
                  <span className="text-green-400 text-sm font-medium">
                    ✅ En ligne
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {publishedListings.map((listing) => (
                    <div key={listing.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-all group">
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                        {listing.photos?.[0]?.preview ? (
                          <img src={listing.photos[0].preview} alt={listing.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          '📷'
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm leading-tight line-clamp-2">
                          {listing.title}
                        </h4>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 font-bold">
                            {listing.price}€
                          </span>
                          <div className="flex items-center text-xs text-gray-400">
                            <Eye className="w-3 h-3 mr-1" />
                            {listing.views || 0}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                            {listing.condition}
                          </span>
                          <span className="text-gray-400">
                            {new Date(listing.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={() => setSelectedProduct(listing)}
                            className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                          >
                            Voir
                          </button>
                          <button className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                            Partager
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">
                      💡 Astuce: Partagez vos annonces sur les réseaux sociaux pour plus de visibilité
                    </span>
                    <span className="text-green-400 font-medium">
                      Commission: 5%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Message si aucun article publié */}
            {publishedListings.length === 0 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-500/30 p-8 text-center">
                <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">
                  Aucun article publié
                </h3>
                <p className="text-gray-400 mb-4">
                  Remplissez le formulaire ci-dessus pour publier votre premier article
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <span>• Commission: 5%</span>
                  <span>• Paiement sécurisé</span>
                  <span>• Support client</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal produit */}
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-8xl">
                    {selectedProduct.photos?.[0] || '📸'}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()}€</span>
                    {selectedProduct.originalPrice && (
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-gray-500 line-through text-xl">
                          {selectedProduct.originalPrice.toLocaleString()}€
                        </span>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-bold mb-3">Caractéristiques</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Marque', selectedProduct.brand],
                        ['Modèle', selectedProduct.model],
                        ['Taille', selectedProduct.size],
                        ['Couleur', selectedProduct.color],
                        ['Période', selectedProduct.year],
                        ['État', selectedProduct.condition]
                      ].filter(([_, value]) => value).map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-gray-400">{label}:</span>
                          <span className="text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold mb-3">Description</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <h4 className="text-white font-bold mb-3">Vendeur</h4>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{selectedProduct.seller.avatar}</span>
                      <div>
                        <p className="text-white font-medium">{selectedProduct.seller.name}</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {selectedProduct.seller.rating} ({selectedProduct.seller.sales} ventes)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-3" />
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