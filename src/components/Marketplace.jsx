import React, { useState, useEffect } from 'react';
import { 
  Plus, X, Camera, Tag, MapPin, Package, 
  DollarSign, Truck, RefreshCw, Eye, Heart,
  Edit, Trash2, CheckCircle, AlertCircle 
} from 'lucide-react';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: '',
    condition: 'Neuf',
    price: '',
    description: '',
    location: '',
    shipping: true,
    photos: []
  });

  // Charger les produits depuis localStorage au démarrage
  useEffect(() => {
    const savedProducts = localStorage.getItem('marketplace_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Sauvegarder les produits dans localStorage
  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('marketplace_products', JSON.stringify(newProducts));
  };

  // Ajouter un nouveau produit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      views: 0,
      likes: 0,
      status: 'active',
      user: 'Moi'
    };

    saveProducts([newProduct, ...products]);
    
    // Réinitialiser le formulaire
    setFormData({
      title: '',
      brand: '',
      category: '',
      condition: 'Neuf',
      price: '',
      description: '',
      location: '',
      shipping: true,
      photos: []
    });
    setShowAddForm(false);
  };

  // Supprimer un produit
  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  // Gérer l'upload d'images (simulé)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Ici on simule l'upload, dans la vraie vie vous feriez un upload vers votre serveur
    const fakeUrls = files.map((_, idx) => `https://via.placeholder.com/300?text=Photo+${idx + 1}`);
    setFormData({ ...formData, photos: [...formData.photos, ...fakeUrls] });
  };

  const formatPrice = (price) => `${parseFloat(price || 0).toLocaleString('fr-FR')}€`;
  const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🛍️ Ma Marketplace
          </h1>
          <button
            onClick={() => saveProducts([])}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Bouton Ajouter un produit */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-4 rounded-xl flex items-center justify-center space-x-2 transition-all"
        >
          <Plus className="w-6 h-6" />
          <span className="text-lg font-semibold">Vendre un produit</span>
        </button>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Nouveau produit</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Titre et Marque */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Titre du produit *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Marque"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Catégorie et État */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Catégorie *</option>
                  <option value="Mode">Mode</option>
                  <option value="Électronique">Électronique</option>
                  <option value="Maison">Maison</option>
                  <option value="Sport">Sport</option>
                  <option value="Loisirs">Loisirs</option>
                  <option value="Autre">Autre</option>
                </select>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Neuf">Neuf</option>
                  <option value="Comme neuf">Comme neuf</option>
                  <option value="Très bon état">Très bon état</option>
                  <option value="Bon état">Bon état</option>
                  <option value="État correct">État correct</option>
                </select>
              </div>

              {/* Prix et Localisation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Prix (€) *"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 pl-10 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Localisation"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 pl-10 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <textarea
                placeholder="Description du produit"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-24 resize-none"
                rows="4"
              />

              {/* Photos */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-400">
                  <Camera className="w-4 h-4" />
                  <span>Photos du produit</span>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 text-sm"
                />
                {formData.photos.length > 0 && (
                  <div className="flex space-x-2 mt-2">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center text-xs">
                        Photo {idx + 1}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Livraison */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.shipping}
                  onChange={(e) => setFormData({ ...formData, shipping: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <Truck className="w-4 h-4 text-gray-400" />
                <span>Livraison disponible</span>
              </label>

              {/* Boutons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition-colors"
                >
                  Publier
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-semibold transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des produits */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Mes produits en vente ({products.length})</span>
          </h2>

          {products.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">Aucun produit en vente</p>
              <p className="text-sm text-gray-500 mt-2">
                Cliquez sur "Vendre un produit" pour commencer
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-colors">
                  {/* Image */}
                  <div className="h-48 bg-gray-700 flex items-center justify-center">
                    {product.photos.length > 0 ? (
                      <img src={product.photos[0]} alt={product.title} className="h-full w-full object-cover" />
                    ) : (
                      <Package className="w-12 h-12 text-gray-500" />
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                      <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">
                        {product.condition}
                      </span>
                    </div>

                    <p className="text-2xl font-bold text-blue-400">{formatPrice(product.price)}</p>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>{product.category}</span>
                      </span>
                      {product.brand && (
                        <span className="text-purple-400">{product.brand}</span>
                      )}
                    </div>

                    {product.location && (
                      <p className="text-sm text-gray-400 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{product.location}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700">
                      <span>Publié le {formatDate(product.created_at)}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{product.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{product.likes}</span>
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <button className="flex-1 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1">
                        <Edit className="w-3 h-3" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
