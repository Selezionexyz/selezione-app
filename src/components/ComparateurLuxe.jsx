// 📝 FICHIER: src/components/ComparateurLuxe.jsx
// Remplacez TOUT le contenu de ce fichier par le code ci-dessous:

import React, { useState } from 'react';
import { 
  Upload, Search, Filter, Eye, Heart, Share2, 
  MessageCircle, Camera, X, Loader,
  ShoppingCart, Package
} from 'lucide-react';

// 🆕 1. AJOUTER LA CLASSE ImageUploadService AU DÉBUT DU FICHIER
class ImageUploadService {
  constructor() {
    this.API_BASE = 'https://selezione-ia-backend.onrender.com';
  }

  async compressImage(file, options = {}) {
    const {
      maxWidth = 1200,
      maxHeight = 1200,
      quality = 0.8,
      format = 'image/jpeg'
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        let { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        
        if (ratio < 1) {
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve({
            blob,
            dataURL: canvas.toDataURL(format, quality),
            originalSize: file.size,
            compressedSize: blob.size,
            compressionRatio: Math.round((1 - blob.size / file.size) * 100)
          });
        }, format, quality);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  async uploadImages(files) {
    try {
      const formData = new FormData();
      
      for (let i = 0; i < files.length; i++) {
        const compressed = await this.compressImage(files[i]);
        const fileName = `image_${Date.now()}_${i}.jpg`;
        formData.append('images', compressed.blob, fileName);
      }

      const response = await fetch(`${this.API_BASE}/api/upload-images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Erreur upload: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur upload:', error);
      throw error;
    }
  }
}

// 🆕 2. MODIFIER LE COMPOSANT ComparateurLuxe (remplacer la fonction existante)
const ComparateurLuxe = () => {
  const [activeTab, setActiveTab] = useState('acheter');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // 🆕 NOUVEAUX ÉTATS pour le système d'upload amélioré
  const [imageUploadService] = useState(new ImageUploadService());
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  // États pour vendre (MODIFIER les états existants)
  const [newListing, setNewListing] = useState({
    title: '',
    brand: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    photos: [], // Contiendra maintenant des URLs au lieu de base64
    authenticity: '',
    location: '',
    shipping: true,
    negotiable: false,
    tags: []
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Configuration API
  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  // Données simulées (garder tel quel)
  const listings = [
    {
      id: 1,
      title: "Chanel Classic Flap Medium Caviar",
      brand: "Chanel",
      category: "Sacs à main",
      price: 8500,
      condition: "Excellent",
      location: "Paris, France",
      photos: ["🖤", "📸", "🔍", "💼"],
      description: "Authentique sac Chanel Classic Flap en cuir caviar noir.",
      views: 234,
      likes: 45,
      posted: "Il y a 2 jours",
      negotiable: true,
      featured: true
    },
    {
      id: 2,
      title: "Hermès Birkin 30 Togo Gold",
      brand: "Hermès",
      category: "Sacs à main",
      price: 12500,
      condition: "Neuf",
      location: "Monaco",
      photos: ["🟡", "📸", "🔍", "💼"],
      description: "Hermès Birkin 30 en cuir Togo couleur Gold.",
      views: 456,
      likes: 78,
      posted: "Il y a 1 jour",
      negotiable: false,
      featured: true
    }
  ];

  const categories = [
    "Sacs à main", "Chaussures", "Prêt-à-porter", "Accessoires", 
    "Bijoux", "Montres", "Parfums", "Maroquinerie"
  ];

  const brands = [
    "Chanel", "Hermès", "Louis Vuitton", "Dior", "Saint Laurent",
    "Gucci", "Prada", "Bottega Veneta", "Balenciaga", "Celine"
  ];

  const conditions = ["Neuf", "Excellent", "Très bon", "Bon", "Correct"];

  // 🆕 3. REMPLACER handlePhotoUpload par cette nouvelle version
  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // Validation
    if (files.length > 6) {
      alert('Maximum 6 images autorisées');
      return;
    }

    const totalSize = files.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > 20 * 1024 * 1024) {
      alert('Taille totale des fichiers trop importante (max 20MB)');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log('🚀 Début upload de', files.length, 'fichier(s)');
      
      // Upload avec le nouveau service
      const result = await imageUploadService.uploadImages(files);
      
      if (result.success && result.urls) {
        setImageUrls(prev => [...prev, ...result.urls]);
        setNewListing(prev => ({
          ...prev,
          photos: [...prev.photos, ...result.urls]
        }));
        
        alert(`✅ ${result.urls.length} image(s) uploadée(s) avec succès!`);
        console.log('✅ URLs reçues:', result.urls);
      } else {
        throw new Error('Réponse invalide du serveur');
      }
      
    } catch (error) {
      console.error('❌ Erreur upload:', error);
      alert(`❌ Erreur upload: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 🆕 4. REMPLACER publishListing par cette nouvelle version
  const publishListing = async () => {
    if (isPublishing) return;
    
    console.log('📝 Publication...', newListing);
    
    // Validation des champs obligatoires
    const requiredFields = [];
    if (!newListing.title?.trim()) requiredFields.push('Titre');
    if (!newListing.brand?.trim()) requiredFields.push('Marque');
    if (!newListing.category?.trim()) requiredFields.push('Catégorie');
    if (!newListing.condition?.trim()) requiredFields.push('État');
    if (!newListing.price || parseFloat(newListing.price) <= 0) requiredFields.push('Prix valide');
    if (!newListing.description?.trim()) requiredFields.push('Description');

    if (requiredFields.length > 0) {
      alert(`❌ Champs obligatoires manquants:\n• ${requiredFields.join('\n• ')}`);
      return;
    }

    const listingData = {
      user: 'user_' + Date.now(),
      fichier: 'marketplace-listing',
      selections: {
        ...newListing,
        id: 'listing_' + Date.now(),
        price: parseFloat(newListing.price),
        created_at: new Date().toISOString(),
        status: 'active',
        images: imageUrls // URLs séparées
      }
    };

    // Payload beaucoup plus léger maintenant
    const payloadSize = new Blob([JSON.stringify(listingData)]).size;
    console.log(`✅ Payload size: ${Math.round(payloadSize/1024)}KB`);

    setIsPublishing(true);

    try {
      const response = await fetch(`${API_BASE}/api/commande`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(listingData)
      });
      
      if (response.ok) {
        alert('✅ Annonce publiée avec succès !');
        resetForm();
      } else {
        const errorText = await response.text();
        alert(`❌ Erreur publication: ${errorText}`);
      }
      
    } catch (error) {
      alert(`❌ Erreur de connexion: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // 🆕 5. AJOUTER la fonction resetForm
  const resetForm = () => {
    setNewListing({
      title: '', brand: '', category: '', condition: '', price: '',
      description: '', photos: [], authenticity: '', location: '',
      shipping: true, negotiable: false, tags: []
    });
    setImageUrls([]);
    setActiveTab('acheter');
  };

  // Interface d'achat (GARDER tel quel)
  const BuyerInterface = () => (
    <div className="space-y-6">
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
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
          <div key={product.id} className="bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden">
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
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90"
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
    </div>
  );

  // 🆕 6. REMPLACER l'interface de vente par cette nouvelle version
  const SellerInterface = () => (
    <div className="space-y-6">
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold text-xl mb-2">💼 Vendre sur SELEZIONE Marketplace</h3>
        <p className="text-gray-300 text-sm">Plateforme professionnelle B2B pour le luxe. Commission : 5%</p>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📋 Informations produit</h4>
            
            <div>
              <label className="block text-white font-medium mb-2">Titre *</label>
              <input
                type="text"
                value={newListing.title}
                onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                placeholder="Ex: Chanel Classic Flap Medium"
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
              <label className="block text-white font-medium mb-2">Description *</label>
              <textarea
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                placeholder="Décrivez l'article..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* 🆕 NOUVELLE INTERFACE UPLOAD */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📸 Photos (Nouveau système)</h4>
            
            <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-6 text-center bg-purple-500/5">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
                disabled={isUploading}
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-400 font-medium mb-2">
                  {isUploading ? 'Upload en cours...' : 'Ajouter des photos'}
                </p>
                <p className="text-gray-400 text-sm">
                  JPG, PNG jusqu'à 5MB par image • Max 6 images
                </p>
              </label>
            </div>

            {isUploading && (
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 text-sm">Upload en cours...</span>
                  <span className="text-purple-400 text-sm">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{width: `${uploadProgress}%`}}
                  ></div>
                </div>
              </div>
            )}

            {imageUrls.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-medium">
                    📸 {imageUrls.length} image(s) uploadée(s)
                  </span>
                  <button 
                    onClick={() => {
                      setImageUrls([]);
                      setNewListing(prev => ({...prev, photos: []}));
                    }}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Supprimer tout
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjNEY0NjRGIi8+Cjx0ZXh0IHg9IjEyIiB5PSIxMyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTQ5Mzk0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPHN2Zz4K';
                        }}
                      />
                      <button
                        onClick={() => {
                          const newUrls = imageUrls.filter((_, i) => i !== index);
                          setImageUrls(newUrls);
                          setNewListing(prev => ({...prev, photos: newUrls}));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm">
            <p>Commission : 5%</p>
            <p>Vous recevrez : {newListing.price ? (newListing.price * 0.95).toFixed(0) : '0'}€</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              disabled={isPublishing}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 disabled:opacity-50"
            > 
              💾 Brouillon
            </button>
            
            <button
              onClick={publishListing}
              disabled={isPublishing || !newListing.title || !newListing.brand || !newListing.price}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center min-w-[180px]"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Publication...
                </>
              ) : (
                <>
                  🚀 Publier
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
// Garder le reste tel quel (modal produit, return, etc.)
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🏪 MARKETPLACE SELEZIONE
        </h2>
        <p className="text-gray-400">Plateforme professionnelle pour le luxe</p>
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
                <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-8xl">
                  {selectedProduct.photos[0]}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()}€</span>
                    <p className="text-gray-300 mt-4">{selectedProduct.description}</p>
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
                  
  
