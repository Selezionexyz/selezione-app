import React, { useState, useEffect } from 'react';
import { 
  Globe, Users, Package, DollarSign, ShoppingCart, Eye, 
  RefreshCw, Search, Filter, Star, Award, Crown, Zap,
  ExternalLink, CheckCircle, AlertCircle, Clock, TrendingUp,
  Tag, MapPin, Phone, Mail, Truck, CreditCard, Bookmark
} from 'lucide-react';

const SiteB2BFournisseur = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isConnecting, setIsConnecting] = useState(false);
  const [b2bData, setB2bData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSync, setLastSync] = useState(null);
  const [error, setError] = useState(null);

  // CONFIGURATION CONNECTION B2B
  const B2B_CONFIG = {
    site_url: 'https://b2bfashion.online/',
    email: 'Selezione.xyz@hotmail.com',
    password: 'Selezione.xyz@hotmail.com',
    auto_sync_interval: 30 // minutes
  };

  // SIMULATION DONNÉES B2B RÉCUPÉRÉES
  const MOCK_B2B_DATA = {
    suppliers: [
      {
        id: 'sup_001',
        name: 'Milano Fashion House',
        country: 'Italy',
        rating: 4.8,
        total_products: 2847,
        specialties: ['Maroquinerie', 'Prêt-à-porter'],
        min_order: 500,
        payment_terms: '30 jours',
        shipping: 'Express EU 48h',
        contact: {
          email: 'orders@milanofashion.it',
          phone: '+39 02 1234 5678',
          whatsapp: '+39 345 678 9012'
        },
        verified: true,
        premium: true,
        featured_products: [
          {
            id: 'prod_001',
            name: 'Sac Cuir Premium Collection',
            category: 'Maroquinerie',
            wholesale_price: '€89',
            retail_price: '€220',
            margin: '147%',
            stock: 150,
            moq: 12, // Minimum Order Quantity
            colors: ['Noir', 'Marron', 'Cognac'],
            sizes: ['Medium', 'Large'],
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop'
          },
          {
            id: 'prod_002',
            name: 'Veste Blazer Femme Tendance',
            category: 'Prêt-à-porter',
            wholesale_price: '€45',
            retail_price: '€135',
            margin: '200%',
            stock: 89,
            moq: 6,
            colors: ['Noir', 'Beige', 'Navy'],
            sizes: ['S', 'M', 'L', 'XL'],
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop'
          }
        ]
      },
      {
        id: 'sup_002',
        name: 'Paris Luxury Goods',
        country: 'France',
        rating: 4.9,
        total_products: 1893,
        specialties: ['Bijoux', 'Accessoires'],
        min_order: 300,
        payment_terms: '15 jours',
        shipping: 'Standard 5-7j',
        contact: {
          email: 'contact@parisluxury.fr',
          phone: '+33 1 42 86 95 74',
          whatsapp: '+33 6 12 34 56 78'
        },
        verified: true,
        premium: false,
        featured_products: [
          {
            id: 'prod_003',
            name: 'Collier Plaqué Or Tendance',
            category: 'Bijoux',
            wholesale_price: '€19',
            retail_price: '€59',
            margin: '211%',
            stock: 245,
            moq: 20,
            colors: ['Or', 'Argent'],
            sizes: ['Unique'],
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop'
          }
        ]
      },
      {
        id: 'sup_003',
        name: 'Barcelona Street Fashion',
        country: 'Spain',
        rating: 4.6,
        total_products: 3247,
        specialties: ['Streetwear', 'Chaussures'],
        min_order: 200,
        payment_terms: '45 jours',
        shipping: 'Express 24-48h',
        contact: {
          email: 'orders@bcnstreet.es',
          phone: '+34 93 123 45 67',
          whatsapp: '+34 612 345 678'
        },
        verified: true,
        premium: true,
        featured_products: [
          {
            id: 'prod_004',
            name: 'Sneakers Urban Style',
            category: 'Chaussures',
            wholesale_price: '€32',
            retail_price: '€89',
            margin: '178%',
            stock: 67,
            moq: 8,
            colors: ['Blanc', 'Noir', 'Rouge'],
            sizes: ['36', '37', '38', '39', '40', '41', '42'],
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop'
          }
        ]
      }
    ],
    categories: [
      { id: 'all', name: 'Toutes catégories', count: 8987 },
      { id: 'maroquinerie', name: 'Maroquinerie', count: 2847 },
      { id: 'pret-a-porter', name: 'Prêt-à-porter', count: 3156 },
      { id: 'bijoux', name: 'Bijoux', count: 1893 },
      { id: 'chaussures', name: 'Chaussures', count: 1091 }
    ],
    stats: {
      total_suppliers: 156,
      verified_suppliers: 143,
      total_products: 8987,
      avg_margin: '168%',
      countries: 23,
      last_updated: new Date().toISOString()
    }
  };

  // SIMULATION CONNECTION AU SITE B2B
  const connectToB2B = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Simulation délai connexion
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulation scraping des données du site
      console.log(`Connexion à ${B2B_CONFIG.site_url}...`);
      console.log(`Login avec ${B2B_CONFIG.email}...`);
      
      // Simulation réussite connexion
      setConnectionStatus('connected');
      setB2bData(MOCK_B2B_DATA);
      setLastSync(new Date());
      
    } catch (error) {
      setError('Erreur de connexion au site B2B');
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  // SYNCHRONISATION AUTOMATIQUE
  useEffect(() => {
    // Auto-connexion au chargement
    connectToB2B();
    
    // Auto-sync périodique
    const interval = setInterval(() => {
      if (connectionStatus === 'connected') {
        connectToB2B();
      }
    }, B2B_CONFIG.auto_sync_interval * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [connectionStatus]);

  // FILTRAGE DES DONNÉES
  const getFilteredSuppliers = () => {
    if (!b2bData) return [];
    
    let filtered = b2bData.suppliers;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(supplier => 
        supplier.specialties.some(spec => 
          spec.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.specialties.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered;
  };

  const getStatusColor = () => {
    const colors = {
      'connected': 'text-green-400 bg-green-500/20',
      'disconnected': 'text-gray-400 bg-gray-500/20',
      'error': 'text-red-400 bg-red-500/20'
    };
    return colors[connectionStatus] || 'text-gray-400 bg-gray-500/20';
  };

  const getStatusIcon = () => {
    const icons = {
      'connected': <CheckCircle className="w-5 h-5" />,
      'disconnected': <AlertCircle className="w-5 h-5" />,
      'error': <AlertCircle className="w-5 h-5" />
    };
    return icons[connectionStatus] || <AlertCircle className="w-5 h-5" />;
  };

  const getStatusText = () => {
    const texts = {
      'connected': 'Connecté',
      'disconnected': 'Déconnecté', 
      'error': 'Erreur'
    };
    return texts[connectionStatus] || 'Inconnu';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* HEADER */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Site B2B Fournisseur
              </h1>
              <p className="text-gray-400">Intégration B2BFashion.online • Connexion Automatique</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="font-medium">{getStatusText()}</span>
            </div>
            
            <button
              onClick={connectToB2B}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              disabled={isConnecting}
            >
              <RefreshCw className={`w-4 h-4 ${isConnecting ? 'animate-spin' : ''}`} />
              <span>{isConnecting ? 'Sync...' : 'Sync'}</span>
            </button>
          </div>
        </div>

        {/* CONNEXION INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-gray-400 text-sm">Site B2B</div>
            <div className="text-white font-semibold">b2bfashion.online</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-gray-400 text-sm">Compte</div>
            <div className="text-white font-semibold">Selezione.xyz@hotmail.com</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-gray-400 text-sm">Dernière sync</div>
            <div className="text-white font-semibold">
              {lastSync ? lastSync.toLocaleTimeString() : 'Jamais'}
            </div>
          </div>
        </div>
      </div>

      {/* ERREUR */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 font-medium">Erreur de connexion: {error}</p>
          </div>
        </div>
      )}

      {/* CHARGEMENT */}
      {isConnecting && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <div>
              <p className="text-purple-400 font-medium">Connexion au site B2B en cours...</p>
              <p className="text-gray-400 text-sm">Authentification • Scraping données • Synchronisation</p>
            </div>
          </div>
        </div>
      )}

      {/* STATISTIQUES B2B */}
      {b2bData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{b2bData.stats.total_suppliers}</p>
                <p className="text-gray-400 text-sm">Fournisseurs</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-400">{b2bData.stats.total_products.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Produits</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-yellow-400">{b2bData.stats.avg_margin}</p>
                <p className="text-gray-400 text-sm">Marge moyenne</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-purple-400">{b2bData.stats.countries}</p>
                <p className="text-gray-400 text-sm">Pays</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTRES */}
      {b2bData && (
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {b2bData.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Recherche fournisseur</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom ou spécialité..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LISTE FOURNISSEURS */}
      {b2bData && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Users className="w-6 h-6 mr-2 text-purple-400" />
            Fournisseurs B2B ({getFilteredSuppliers().length})
          </h2>

          {getFilteredSuppliers().map((supplier) => (
            <div key={supplier.id} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
              
              {/* HEADER FOURNISSEUR */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{supplier.name}</h3>
                    
                    <div className="flex items-center space-x-2">
                      {supplier.verified && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Vérifié</span>
                        </div>
                      )}
                      
                      {supplier.premium && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                          <Crown className="w-4 h-4" />
                          <span>Premium</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{supplier.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-white font-bold">{supplier.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400">{supplier.total_products.toLocaleString()} produits</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {supplier.specialties.map((spec, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* INFOS COMMERCIALES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <div className="text-gray-400 text-sm">Commande min.</div>
                  <div className="text-white font-bold">€{supplier.min_order}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <div className="text-gray-400 text-sm">Paiement</div>
                  <div className="text-white font-bold">{supplier.payment_terms}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <div className="text-gray-400 text-sm">Livraison</div>
                  <div className="text-white font-bold">{supplier.shipping}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <div className="text-gray-400 text-sm">Contact</div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>

              {/* PRODUITS PHARES */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Produits Phares
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {supplier.featured_products.map((product) => (
                    <div key={product.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      
                      <h5 className="text-white font-medium mb-2">{product.name}</h5>
                      <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div>
                          <span className="text-gray-400">Gros:</span>
                          <span className="text-blue-400 font-bold ml-1">{product.wholesale_price}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Détail:</span>
                          <span className="text-green-400 font-bold ml-1">{product.retail_price}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Marge:</span>
                          <span className="text-yellow-400 font-bold ml-1">{product.margin}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Stock:</span>
                          <span className="text-white font-bold ml-1">{product.stock}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-400 mb-2">
                        MOQ: {product.moq} • {product.colors.length} couleurs • {product.sizes.length} tailles
                      </div>
                      
                      <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">
                        Voir Détails
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Commander</span>
                </button>
                
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Catalogue</span>
                </button>
                
                <a 
                  href={`mailto:${supplier.contact.email}`}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
                
                <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center py-6 border-t border-gray-700">
        <div className="flex items-center justify-center space-x-6 mb-2">
          <div className="text-purple-400">🌐 Intégration B2B Active</div>
          <div className="text-green-400">🔄 Sync Automatique</div>
          {b2bData && (
            <div className="text-blue-400">📦 {b2bData.stats.total_suppliers} Fournisseurs</div>
          )}
        </div>
        <p className="text-gray-400 text-sm">
          Connexion sécurisée à B2BFashion.online • 
          {lastSync && ` Dernière sync: ${lastSync.toLocaleString()}`}
        </p>
      </div>
    </div>
  );
};

export default SiteB2BFournisseur;