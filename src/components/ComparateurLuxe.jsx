import React, { useState } from 'react';
import { 
  Upload, Search, Filter, Eye, Heart, Share2, 
  MessageCircle, Camera, X, Loader,
  ShoppingCart, Package, AlertCircle, CheckCircle,
  ImageIcon, Trash2
} from 'lucide-react';

const ComparateurLuxe = () => {
  const [activeTab, setActiveTab] = useState('acheter');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // AJOUT: États filtres avancés comme Agent IA
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // États pour vendre - SIMPLIFIÉS
  const [newListing, setNewListing] = useState({
    title: '',
    brand: '',
    category: '',
    model: '',      // AJOUT
    size: '',       // AJOUT
    color: '',      // AJOUT
    material: '',   // AJOUT
    year: '',       // AJOUT
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

  const [isPublishing, setIsPublishing] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);

  // Configuration API
  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  // Limites d'upload améliorées
  const MAX_FILES = 10;  // AJOUT: Augmenté de 6 à 10
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // AJOUT: Augmenté à 8MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  // AJOUT: Base de données ultra-complète comme Agent IA
  const categoriesDatabase = {
    "Sacs à main": {
      brands: ["Hermès", "Chanel", "Louis Vuitton", "Dior", "Saint Laurent", "Gucci", "Prada", "Bottega Veneta", "Celine", "Fendi"],
      models: {
        "Hermès": ["Birkin 25", "Birkin 30", "Birkin 35", "Kelly 25", "Kelly 28", "Kelly 32", "Constance", "Evelyne", "Garden Party", "Picotin"],
        "Chanel": ["Classic Flap Small", "Classic Flap Medium", "Classic Flap Jumbo", "Boy Small", "Boy Medium", "Boy Large", "19 Small", "19 Large", "Deauville", "Gabrielle"],
        "Louis Vuitton": ["Speedy 25", "Speedy 30", "Speedy 35", "Neverfull PM", "Neverfull MM", "Neverfull GM", "Alma PM", "Alma MM", "Capucines PM", "Capucines MM"]
      },
      sizes: ["XS", "Small", "Medium", "Large", "XL", "25cm", "30cm", "35cm", "40cm"],
      materials: ["Cuir Caviar", "Agneau", "Cuir Epi", "Toile Monogram", "Toile Damier", "Cuir Togo", "Cuir Clemence"]
    },
    "Chaussures": {
      brands: ["Christian Louboutin", "Manolo Blahnik", "Jimmy Choo", "Gianvito Rossi", "Saint Laurent", "Gucci", "Prada", "Valentino"],
      sizes: ["35", "35.5", "36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40", "40.5", "41", "41.5", "42", "42.5", "43", "44", "45"],
      materials: ["Cuir", "Cuir Verni", "Daim", "Satin", "Velours"]
    },
    "Bijoux": {
      brands: ["Cartier", "Van Cleef & Arpels", "Bulgari", "Tiffany & Co", "Chanel", "Dior", "Hermès"],
      sizes: ["46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
      materials: ["Or Jaune", "Or Blanc", "Or Rose", "Platine", "Argent", "Diamant"]
    },
    "Montres": {
      brands: ["Rolex", "Patek Philippe", "Audemars Piguet", "Richard Mille", "Cartier", "Omega", "Breitling", "Jaeger-LeCoultre"],
      sizes: ["36mm", "38mm", "39mm", "40mm", "41mm", "42mm", "44mm", "45mm"],
      materials: ["Acier", "Or Jaune", "Or Blanc", "Or Rose", "Platine", "Titane", "Céramique"]
    }
  };

  // AJOUT: États détaillés
  const conditions = [
    "Neuf avec étiquettes", "Neuf sans étiquettes", "Excellent", "Très bon", "Bon", "Correct", "Usage visible"
  ];

  // AJOUT: Couleurs complètes
  const colors = [
    "Noir", "Blanc", "Beige", "Marron", "Camel", "Rouge", "Bleu", "Vert", 
    "Rose", "Violet", "Gris", "Jaune", "Orange", "Multicolore", "Or", "Argent"
  ];

  // AJOUT: Années 1970-2030 par décennie
  const years = [];
  for (let year = 1970; year <= 2030; year += 10) {
    years.push(`${year}-${year + 9}`);
  }

  const locations = [
    "Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Lille", "Toulouse", "Nantes", 
    "Strasbourg", "Montpellier", "Rennes", "Reims", "Tours", "Angers", "Dijon", 
    "Brest", "Le Mans", "Amiens", "Limoges", "Clermont-Ferrand", "International"
  ];

  // 🏪 DONNÉES SIMULÉES ULTRA-RÉALISTES
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
      photos: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"],
      description: "Authentique sac Chanel Classic Flap en cuir caviar noir. État impeccable, très peu porté.",
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
        memberSince: "2022",
        verified: true,
        location: "Paris",
        avatar: "👩‍💼"
      },
      shipping: true,
      shippingCost: 15,
      authenticity: "Certifié authentique",
      serialNumber: "29******",
      defects: "Aucun défaut visible"
    },
    {
      id: 2,
      title: "Hermès Birkin 30 Togo Étoupe",
      brand: "Hermès",
      category: "Sacs à main",
      model: "Birkin 30",
      size: "30cm",
      color: "Beige",
      material: "Cuir Togo",
      year: "2010-2019",
      price: 12500,
      originalPrice: 18000,
      condition: "Très bon",
      location: "Monaco",
      photos: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
      description: "Hermès Birkin 30 en cuir Togo couleur Étoupe. Quincaillerie dorée. Avec dustbag et boîte.",
      views: 456,
      likes: 78,
      posted: "Il y a 1 jour",
      negotiable: false,
      featured: true,
      verified: true,
      seller: {
        name: "Christine M.",
        rating: 5.0,
        sales: 67,
        memberSince: "2020",
        verified: true,
        location: "Monaco",
        avatar: "👸"
      },
      shipping: true,
      shippingCost: 25,
      authenticity: "Certifié Hermès",
      serialNumber: "R Square (2014)",
      defects: "Légères marques d'usage sur les coins"
    },
    {
      id: 3,
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
      photos: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
      description: "Louis Vuitton Speedy 30 vintage en toile monogram. Patine naturelle du cuir, très authentique.",
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
        memberSince: "2023",
        verified: false,
        location: "Lyon",
        avatar: "👩"
      },
      shipping: true,
      shippingCost: 10,
      authenticity: "Authentique vérifié",
      serialNumber: "VI0089",
      defects: "Patine du cuir, quelques marques d'usage"
    }
  ]);

  // ÉTAT FAVORIS MANQUANT
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());

  // FONCTION FAVORIS MANQUANTE
  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favoriteProducts);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteProducts(newFavorites);
  };

  // AJOUT: Fonctions utilitaires
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

  // 💝 Fonctions favoris
  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favoriteProducts);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteProducts(newFavorites);
  };

  // 🤖 Suggestion de prix IA
  const generateAiPriceEstimation = async () => {
    if (!newListing.brand || !newListing.model || !newListing.condition) return;
    
    try {
      const response = await fetch(`${API_BASE}/estimation-luxe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: `${newListing.brand} ${newListing.model} ${newListing.condition} état ${newListing.year || ''} CONTEXTE SECONDE MAIN UNIQUEMENT`
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const priceMatch = data.estimation?.match(/(\d+[\s\d]*)\s*€/);
        if (priceMatch) {
          const suggestedPrice = parseInt(priceMatch[0].replace(/\s/g, '').replace('€', ''));
          setAiPriceSuggestion({
            price: suggestedPrice,
            range: {
              min: Math.round(suggestedPrice * 0.85),
              max: Math.round(suggestedPrice * 1.15)
            },
            confidence: 85
          });
        }
      }
    } catch (error) {
      console.log('Estimation IA indisponible');
    }
  };

  // 🔍 Filtrage avancé
  const getFilteredListings = () => {
    let filtered = [...listings];

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter(item => item.brand === selectedBrand);
    }

    if (selectedModel) {
      filtered = filtered.filter(item => item.model === selectedModel);
    }

    if (selectedSize) {
      filtered = filtered.filter(item => item.size === selectedSize);
    }

    if (selectedColor) {
      filtered = filtered.filter(item => item.color === selectedColor);
    }

    if (selectedMaterial) {
      filtered = filtered.filter(item => item.material === selectedMaterial);
    }

    if (selectedYear) {
      filtered = filtered.filter(item => item.year === selectedYear);
    }

    if (priceRange.min) {
      filtered = filtered.filter(item => item.price >= parseInt(priceRange.min));
    }

    if (priceRange.max) {
      filtered = filtered.filter(item => item.price <= parseInt(priceRange.max));
    }

    if (locationFilter) {
      filtered = filtered.filter(item => item.location.includes(locationFilter));
    }

    if (shippingOnly) {
      filtered = filtered.filter(item => item.shipping);
    }

    if (negotiableOnly) {
      filtered = filtered.filter(item => item.negotiable);
    }

    if (verifiedSellers) {
      filtered = filtered.filter(item => item.seller.verified);
    }

    // Tri
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        break;
    }

    return filtered;
  };

  // 🆕 Fonction d'upload ultra-améliorée
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const errors = [];
    
    setUploadErrors([]);

    if (newListing.photos.length + files.length > MAX_FILES) {
      errors.push(`Maximum ${MAX_FILES} photos autorisées`);
      setUploadErrors(errors);
      return;
    }

    files.forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`${file.name} : Format non supporté (JPG, PNG, WEBP, HEIC uniquement)`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} : Taille max ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const photoObject = {
          file: file,
          preview: reader.result,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          id: Date.now() + Math.random()
        };
        
        setNewListing(prev => ({
          ...prev,
          photos: [...prev.photos, photoObject]
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

  const publishListing = async () => {
    if (isPublishing) return;
    
    const requiredFields = [];
    if (!newListing.title?.trim()) requiredFields.push('Titre');
    if (!newListing.brand) requiredFields.push('Marque');
    if (!newListing.category) requiredFields.push('Catégorie');
    if (!newListing.condition) requiredFields.push('État');
    if (!newListing.price || parseFloat(newListing.price) <= 0) requiredFields.push('Prix valide');
    if (!newListing.description?.trim()) requiredFields.push('Description');
    if (newListing.photos.length === 0) requiredFields.push('Au moins 1 photo');

    if (requiredFields.length > 0) {
      alert(`❌ Champs obligatoires manquants:\n• ${requiredFields.join('\n• ')}`);
      return;
    }
    
    setIsPublishing(true);

    try {
      const commandeData = {
        user: `user_${Date.now()}`,
        fichier: 'marketplace-listing-ultra',
        selections: {
          id: `listing_${Date.now()}`,
          title: newListing.title,
          brand: newListing.brand,
          category: newListing.category,
          model: newListing.model,
          size: newListing.size,
          color: newListing.color,
          material: newListing.material,
          year: newListing.year,
          condition: newListing.condition,
          price: parseFloat(newListing.price),
          originalPrice: newListing.originalPrice ? parseFloat(newListing.originalPrice) : null,
          description: newListing.description,
          location: newListing.location || 'France',
          shipping: newListing.shipping,
          shippingCost: newListing.shippingCost ? parseFloat(newListing.shippingCost) : 0,
          negotiable: newListing.negotiable,
          authenticity: newListing.authenticity,
          serialNumber: newListing.serialNumber,
          created_at: new Date().toISOString(),
          photos: newListing.photos.map((p, index) => ({
            name: p.name,
            size: p.size,
            type: p.type,
            order: index,
            isMain: index === 0
          }))
        }
      };

      const response = await fetch(`${API_BASE}/api/commande`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(commandeData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const newListingLocal = {
          ...commandeData.selections,
          id: Date.now(),
          views: 0,
          likes: 0,
          posted: 'À l\'instant',
          featured: false,
          verified: true,
          seller: {
            name: 'Vous',
            rating: 5.0,
            sales: 1,
            memberSince: '2025',
            verified: true,
            location: newListing.location || 'France',
            avatar: '👤'
          }
        };
        
        setListings(prev => [newListingLocal, ...prev]);
        
        alert('✅ Annonce publiée avec succès ! Elle apparaît maintenant dans la marketplace.');
        resetForm();
        setActiveTab('acheter');
      } else {
        alert(`❌ Erreur: ${data.error || 'Erreur inconnue'}`);
      }
      
    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur de connexion: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const resetForm = () => {
    setNewListing({
      title: '',
      brand: '',
      category: '',
      model: '',
      size: '',
      condition: '',
      color: '',
      material: '',
      year: '',
      price: '',
      originalPrice: '',
      description: '',
      photos: [],
      authenticity: '',
      location: '',
      shipping: true,
      shippingCost: '',
      negotiable: false,
      tags: [],
      serialNumber: '',
      purchaseDate: '',
      defects: '',
      improvements: ''
    });
    setUploadErrors([]);
    setAiPriceSuggestion(null);
  };

  const calculateListingQuality = () => {
    let score = 0;
    if (newListing.title?.length > 10) score += 20;
    if (newListing.photos.length >= 3) score += 25;
    if (newListing.description?.length > 50) score += 20;
    if (newListing.model) score += 5;
    if (newListing.size) score += 5;
    if (newListing.color) score += 5;
    if (newListing.material) score += 5;
    if (newListing.year) score += 5;
    if (newListing.authenticity) score += 5;
    if (newListing.serialNumber) score += 5;
    return score;
  };

  // Auto-génération suggestions prix
  useEffect(() => {
    if (newListing.brand && newListing.model && newListing.condition) {
      generateAiPriceEstimation();
    }
  }, [newListing.brand, newListing.model, newListing.condition, newListing.year]);

  // Interface d'achat ULTRA-AMÉLIORÉE
  const BuyerInterface = () => {
    const filteredListings = getFilteredListings();
    
    return (
      <div className="space-y-6 p-6">
        {/* Barre de recherche et filtres ultra-avancés */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par marque, modèle, description..."
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

              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="bg-gray-800 text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-700 flex items-center"
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-xl font-medium flex items-center transition-all ${
                    showFilters 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </button>
              </div>
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Toutes marques</option>
                  {getAvailableBrands().map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm disabled:opacity-50"
                >
                  <option value="">Tous modèles</option>
                  {getAvailableModels().map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>

                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Toutes tailles</option>
                  {getAvailableSizes().map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>

                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Toutes couleurs</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>

                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Toutes matières</option>
                  {getAvailableMaterials().map(material => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="">Toutes années</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="recent">Plus récents</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="popular">Plus populaires</option>
                </select>
                
                <div className="text-gray-400 text-sm">
                  {filteredListings.length} résultat{filteredListings.length > 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="flex items-center text-gray-400 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shippingOnly}
                    onChange={(e) => setShippingOnly(e.target.checked)}
                    className="mr-2"
                  />
                  Livraison
                </label>
                <label className="flex items-center text-gray-400 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedSellers}
                    onChange={(e) => setVerifiedSellers(e.target.checked)}
                    className="mr-2"
                  />
                  Vendeurs vérifiés
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de produits ULTRA-MODERNE */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredListings.map((product) => (
            <div key={product.id} className={`bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden group ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'} bg-gray-800`}>
                {product.photos?.[0] ? (
                  <img
                    src={product.photos[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    📸
                  </div>
                )}
                
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

                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  <button className="p-2 bg-black/50 text-gray-300 rounded-full backdrop-blur-sm hover:text-white">
                    <Share2 className="w-4 h-4" />
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

              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-400 font-medium text-sm">{product.brand}</span>
                      {product.seller.verified && (
                        <Shield className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3 text-xs text-gray-400">
                  {product.model && <p>Modèle: {product.model}</p>}
                  {product.size && <p>Taille: {product.size}</p>}
                  {product.color && <p>Couleur: {product.color}</p>}
                  {product.year && <p>Année: {product.year}</p>}
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
                    <span className="text-yellow-400 text-xs font-medium">Négociable</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span>{product.seller.avatar}</span>
                    <span className="text-gray-300">{product.seller.name}</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span className="text-gray-400">{product.seller.rating}</span>
                    </div>
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

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-400">Essayez d'ajuster vos filtres de recherche</p>
          </div>
        )}
      </div>
    );
  };

  // Interface de vente ULTRA-PUISSANTE
  const SellerInterface = () => (
    <div className="space-y-6 p-6">
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold text-xl mb-2">💼 Vendre sur SELEZIONE Marketplace Ultra</h3>
        <p className="text-gray-300 text-sm">Plateforme professionnelle B2B pour le luxe • Commission : 5% • IA intégrée • Estimation automatique • Score qualité</p>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Colonne 1 - Informations de base */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Informations produit
            </h4>
            
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
                <label className="block text-white font-medium mb-2">Catégorie *</label>
                <select
                  value={newListing.category}
                  onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
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
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50"
                >
                  <option value="">Sélectionner</option>
                  {getAvailableBrands().map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Modèle</label>
                <select
                  value={newListing.model}
                  onChange={(e) => setNewListing({...newListing, model: e.target.value})}
                  disabled={!newListing.brand}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50"
                >
                  <option value="">Sélectionner</option>
                  {getAvailableModels().map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Taille</label>
                <select
                  value={newListing.size}
                  onChange={(e) => setNewListing({...newListing, size: e.target.value})}
                  disabled={!newListing.category}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50"
                >
                  <option value="">Sélectionner</option>
                  {getAvailableSizes().map(size => (
                    <option key={size} value={size}>{size}</option>
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
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Sélectionner</option>
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
                  disabled={!newListing.category}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50"
                >
                  <option value="">Sélectionner</option>
                  {getAvailableMaterials().map(material => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Période/Année</label>
              <select
                value={newListing.year}
                onChange={(e) => setNewListing({...newListing, year: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="">Sélectionner</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Colonne 2 - Prix et détails */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Prix & Détails
            </h4>

            <div>
              <label className="block text-white font-medium mb-2">État *</label>
              <select
                value={newListing.condition}
                onChange={(e) => setNewListing({...newListing, condition: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="">Sélectionner</option>
                {conditionsDetailed.map(condition => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
              {newListing.condition && (
                <p className="text-gray-400 text-xs mt-1">
                  {conditionsDetailed.find(c => c.value === newListing.condition)?.description}
                </p>
              )}
            </div>

            {/* Suggestion de prix IA */}
            {aiPriceSuggestion && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h5 className="text-blue-400 font-medium text-sm mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Suggestion Prix IA ({aiPriceSuggestion.confidence}% confiance)
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Prix suggéré:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 font-bold">{aiPriceSuggestion.price}€</span>
                      <button
                        onClick={() => setNewListing(prev => ({...prev, price: aiPriceSuggestion.price.toString()}))}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Fourchette:</span>
                    <span className="text-gray-400 text-xs">
                      {aiPriceSuggestion.range.min}€ - {aiPriceSuggestion.range.max}€
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Prix de vente (€) *</label>
                <input
                  type="number"
                  value={newListing.price}
                  onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                  placeholder="450"
                  min="1"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Prix boutique original (€)</label>
                <input
                  type="number"
                  value={newListing.originalPrice}
                  onChange={(e) => setNewListing({...newListing, originalPrice: e.target.value})}
                  placeholder="1200"
                  min="1"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description *</label>
              <textarea
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                placeholder="Décrivez votre article en détail (état, histoire, défauts éventuels, etc.)"
                rows="4"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {newListing.description?.length || 0}/1000
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Numéro de série</label>
                <input
                  type="text"
                  value={newListing.serialNumber}
                  onChange={(e) => setNewListing({...newListing, serialNumber: e.target.value})}
                  placeholder="Ex: VI0089, A01112, etc."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Localisation</label>
                <select
                  value={newListing.location}
                  onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Sélectionner</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newListing.shipping}
                  onChange={(e) => setNewListing({...newListing, shipping: e.target.checked})}
                  className="w-5 h-5 text-purple-500 bg-gray-900 border-gray-700 rounded focus:ring-purple-500"
                />
                <span className="text-white">Livraison possible</span>
              </label>
              
              {newListing.shipping && (
                <input
                  type="number"
                  value={newListing.shippingCost}
                  onChange={(e) => setNewListing({...newListing, shippingCost: e.target.value})}
                  placeholder="Frais de port (€)"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500"
                />
              )}
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newListing.negotiable}
                  onChange={(e) => setNewListing({...newListing, negotiable: e.target.checked})}
                  className="w-5 h-5 text-purple-500 bg-gray-900 border-gray-700 rounded focus:ring-purple-500"
                />
                <span className="text-white">Prix négociable</span>
              </label>
            </div>
          </div>

          {/* Colonne 3 - Photos */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Photos (max {MAX_FILES})
            </h4>
            
            {/* Zone d'upload */}
            <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-6 text-center bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
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
                <p className="text-purple-400 font-medium mb-2">
                  Cliquez pour ajouter des photos
                </p>
                <p className="text-gray-400 text-sm">
                  JPG, PNG, WEBP, HEIC • Max {MAX_FILE_SIZE / 1024 / 1024}MB par image
                </p>
              </label>
            </div>

            {/* Erreurs d'upload */}
            {uploadErrors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                {uploadErrors.map((error, index) => (
                  <div key={index} className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Aperçu des photos */}
            {newListing.photos.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-medium">
                    {newListing.photos.length} photo{newListing.photos.length > 1 ? 's' : ''} ajoutée{newListing.photos.length > 1 ? 's' : ''}
                  </span>
                  <button 
                    onClick={() => setNewListing({...newListing, photos: []})}
                    className="text-red-400 text-sm hover:text-red-300 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Tout supprimer
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {newListing.photos.map((photo, index) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.preview}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => removePhoto(index)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors mr-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-purple-500 text-white text-xs px-2 py-0.5 rounded">
                          Principal
                        </span>
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conseils photos */}
            <div className="bg-gray-900 rounded-lg p-4 space-y-2">
              <h5 className="text-purple-400 font-medium text-sm mb-2">📌 Conseils photo pro</h5>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Lumière naturelle, fond neutre</li>
                <li>• Tous les angles + détails authentification</li>
                <li>• Défauts visibles (transparence = confiance)</li>
                <li>• Étiquettes, dustbag, boîte si disponibles</li>
              </ul>
            </div>

            {/* Score de qualité */}
            {newListing.title && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-medium text-sm">Score Qualité</span>
                  <span className="text-green-400 font-bold">{calculateListingQuality()}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                    style={{width: `${calculateListingQuality()}%`}}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Score élevé = meilleure visibilité
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Barre d'actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm">
            <div className="space-y-1">
              <p>Commission plateforme : 5%</p>
              {newListing.price && (
                <p className="font-medium text-white">
                  Vous recevrez : {(newListing.price * 0.95).toFixed(0)}€
                </p>
              )}
              {newListing.originalPrice && newListing.price && (
                <p className="text-green-400">
                  Économie acheteur : {((newListing.originalPrice - newListing.price) / newListing.originalPrice * 100).toFixed(0)}%
                </p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={resetForm}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </button>
            
            <button
              onClick={publishListing}
              disabled={isPublishing || calculateListingQuality() < 40}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
            >
              {isPublishing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Publication...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Publier ({calculateListingQuality()}%)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Ultra-Puissant */}
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              🏪 MARKETPLACE SELEZIONE ULTRA
            </h2>
            <p className="text-gray-400">Plateforme professionnelle IA • Commission 5% • Estimation automatique • Filtres avancés • Années 1970-2030</p>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-bold text-lg">{favoriteProducts.size}</div>
            <div className="text-gray-400 text-sm">Favoris</div>
          </div>
        </div>
      </div>

      {/* Tabs Ultra-Modernes */}
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
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30">
        {activeTab === 'acheter' ? <BuyerInterface /> : <SellerInterface />}
      </div>

      {/* Modal produit ultra-détaillé */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-green-500/30 max-w-6xl w-full max-h-[95vh] overflow-auto">
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
                {/* Images */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden">
                    {selectedProduct.photos?.[0] ? (
                      <img
                        src={selectedProduct.photos[0]}
                        alt={selectedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">
                        📸
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Détails */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()}€</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(selectedProduct.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favoriteProducts.has(selectedProduct.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:text-red-400'
                          }`}
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-gray-700 text-gray-300 rounded-full hover:text-white">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {selectedProduct.originalPrice && (
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-gray-500 line-through">
                          {selectedProduct.originalPrice.toLocaleString()}€
                        </span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                    
                    {selectedProduct.negotiable && (
                      <span className="text-yellow-400 text-sm font-medium">Prix négociable</span>
                    )}
                  </div>

                  {/* Détails produit */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ['Marque', selectedProduct.brand],
                      ['Modèle', selectedProduct.model],
                      ['Taille', selectedProduct.size],
                      ['Couleur', selectedProduct.color],
                      ['Matière', selectedProduct.material],
                      ['Année', selectedProduct.year],
                      ['État', selectedProduct.condition],
                      ['Authenticité', selectedProduct.authenticity]
                    ].filter(([_, value]) => value).map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2 border-b border-gray-700">
                        <span className="text-gray-400">{label}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Description</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Informations vendeur */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Vendeur</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{selectedProduct.seller.avatar}</span>
                        <div>
                          <p className="text-white font-medium flex items-center">
                            {selectedProduct.seller.name}
                            {selectedProduct.seller.verified && (
                              <Shield className="w-4 h-4 text-blue-400 ml-2" />
                            )}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {selectedProduct.seller.rating} ({selectedProduct.seller.sales} ventes)
                            </span>
                            <span>Membre depuis {selectedProduct.seller.memberSince}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {selectedProduct.views} vues
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {selectedProduct.likes} likes
                      </span>
                    </div>
                    <span>{selectedProduct.posted}</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contacter le vendeur
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