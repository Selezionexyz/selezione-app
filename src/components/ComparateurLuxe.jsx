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

  // États pour vendre - SIMPLIFIÉS
  const [newListing, setNewListing] = useState({
    title: '',
    brand: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    photos: [], // Contiendra des objets {file, preview}
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

  // Limites d'upload
  const MAX_FILES = 6;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  // Données simulées
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

  const conditions = ["Neuf avec étiquettes", "Neuf sans étiquettes", "Excellent", "Très bon", "Bon", "Correct"];

  // 🆕 Fonction d'upload simplifiée
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const errors = [];
    
    // Réinitialiser les erreurs
    setUploadErrors([]);

    // Vérifier le nombre total de fichiers
    if (newListing.photos.length + files.length > MAX_FILES) {
      errors.push(`Maximum ${MAX_FILES} photos autorisées`);
      setUploadErrors(errors);
      return;
    }

    const validFiles = [];

    files.forEach((file) => {
      // Vérifier le type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`${file.name} : Type non supporté`);
        return;
      }

      // Vérifier la taille
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} : Taille max 5MB`);
        return;
      }

      // Créer un preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoObject = {
          file: file,
          preview: reader.result,
          name: file.name,
          size: file.size
        };
        
        setNewListing(prev => ({
          ...prev,
          photos: [...prev.photos, photoObject]
        }));
      };
      reader.readAsDataURL(file);
      
      validFiles.push(file);
    });

    if (errors.length > 0) {
      setUploadErrors(errors);
    }
  };

  // 🆕 Fonction pour supprimer une photo
  const removePhoto = (index) => {
    setNewListing(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  // 🆕 Fonction de publication simplifiée
  const publishListing = async () => {
    if (isPublishing) return;
    
    // Validation
    const requiredFields = [];
    if (!newListing.title?.trim()) requiredFields.push('Titre');
    if (!newListing.brand) requiredFields.push('Marque');
    if (!newListing.category) requiredFields.push('Catégorie');
    if (!newListing.condition) requiredFields.push('État');
    if (!newListing.price || parseFloat(newListing.price) <= 0) requiredFields.push('Prix valide');
    if (!newListing.description?.trim()) requiredFields.push('Description');
    if (newListing.photos.length === 0) requiredFields.push('Au moins une photo');

    if (requiredFields.length > 0) {
      alert(`❌ Champs obligatoires manquants:\n• ${requiredFields.join('\n• ')}`);
      return;
    }

    setIsPublishing(true);

    try {
      // Créer FormData pour l'upload
      const formData = new FormData();
      
      // Ajouter les données texte
      formData.append('user', 'user_' + Date.now());
      formData.append('fichier', 'marketplace-listing');
      formData.append('title', newListing.title);
      formData.append('brand', newListing.brand);
      formData.append('category', newListing.category);
      formData.append('condition', newListing.condition);
      formData.append('price', newListing.price);
      formData.append('description', newListing.description);
      formData.append('location', newListing.location || 'France');
      formData.append('shipping', newListing.shipping);
      formData.append('negotiable', newListing.negotiable);
      
      // Ajouter les photos
      newListing.photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo.file);
      });

      // Option 1: Envoyer avec FormData (si le backend supporte)
      /*
      const response = await fetch(`${API_BASE}/api/listing/create`, {
        method: 'POST',
        body: formData
      });
      */

      // Option 2: Envoyer en JSON avec base64 (solution actuelle)
      const listingData = {
        user: 'user_' + Date.now(),
        fichier: 'marketplace-listing',
        selections: {
          ...newListing,
          id: 'listing_' + Date.now(),
          price: parseFloat(newListing.price),
          created_at: new Date().toISOString(),
          status: 'active',
          // Convertir seulement les previews, pas les fichiers complets
          photos: newListing.photos.map(p => ({
            preview: p.preview.substring(0, 100) + '...', // Tronquer pour l'exemple
            name: p.name,
            size: p.size
          }))
        }
      };

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
        setActiveTab('acheter');
      } else {
        const errorText = await response.text();
        alert(`❌ Erreur publication: ${errorText}`);
      }
      
    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur de connexion: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setNewListing({
      title: '', brand: '', category: '', condition: '', price: '',
      description: '', photos: [], authenticity: '', location: '',
      shipping: true, negotiable: false, tags: []
    });
    setUploadErrors([]);
  };

  // Interface d'achat
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

  // 🆕 Interface de vente SIMPLIFIÉE
  const SellerInterface = () => (
    <div className="space-y-6">
      <div className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold text-xl mb-2">💼 Vendre sur SELEZIONE Marketplace</h3>
        <p className="text-gray-300 text-sm">Plateforme professionnelle B2B pour le luxe. Commission : 5%</p>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne gauche - Informations */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📋 Informations produit</h4>
            
            <div>
              <label className="block text-white font-medium mb-2">Titre de l'annonce *</label>
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
                placeholder="Décrivez votre article en détail..."
                rows="4"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

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

          {/* Colonne droite - Photos */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-4">📸 Photos (max {MAX_FILES})</h4>
            
            {/* Zone d'upload */}
            <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-6 text-center bg-purple-500/5">
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
                  JPG, PNG, WEBP • Max 5MB par image
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

                <div className="grid grid-cols-3 gap-3">
                  {newListing.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo.preview}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => removePhoto(index)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
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

                <p className="text-gray-400 text-xs">
                  💡 La première photo sera l'image principale de votre annonce
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-gray-900 rounded-lg p-4 space-y-2">
              <h5 className="text-purple-400 font-medium text-sm mb-2">📌 Conseils photo</h5>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Photos nettes et bien éclairées</li>
                <li>• Montrez tous les angles importants</li>
                <li>• Incluez les détails d'authenticité</li>
                <li>• Photographiez les défauts éventuels</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Barre d'actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm">
            <p>Commission plateforme : 5%</p>
            <p className="font-medium text-white">
              Vous recevrez : {newListing.price ? `${(newListing.price * 0.95).toFixed(0)}€` : '0€'}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={resetForm}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600"
            >
              Annuler
            </button>
            
            <button
              onClick={publishListing}
              disabled={isPublishing || !newListing.title || !newListing.brand || !newListing.price || newListing.photos.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
            >
              {isPublishing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Publication...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Publier
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Statut de publication */}
      {isPublishing && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center">
            <Loader className="w-5 h-5 text-blue-400 animate-spin mr-3" />
            <div>
              <p className="text-blue-400 font-medium">Publication en cours...</p>
              <p className="text-gray-400 text-sm">Votre annonce est en cours de traitement</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🏪 MARKETPLACE SELEZIONE
        </h2>
        <p className="text-gray-400">Plateforme professionnelle pour le luxe • Commission 5%</p>
      </div>

      {/* Tabs */}
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

      {/* Contenu */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30">
        {activeTab === 'acheter' ? <BuyerInterface /> : <SellerInterface />}
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-8xl">
                  {selectedProduct.photos[0]}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()}€</span>
                    {selectedProduct.negotiable && (
                      <span className="ml-3 text-yellow-400 text-sm">Prix négociable</span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Marque</span>
                      <span className="text-white font-medium">{selectedProduct.brand}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">État</span>
                      <span className="text-white font-medium">{selectedProduct.condition}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Localisation</span>
                      <span className="text-white font-medium">{selectedProduct.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Description</h4>
                    <p className="text-gray-300">{selectedProduct.description}</p>
                  </div>
                  
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
