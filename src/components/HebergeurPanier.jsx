import React, { useState, useRef } from 'react';
import { 
  Upload, File, FileText, Download, Trash2, Eye, Edit, Save,
  ShoppingCart, Plus, Minus, X, Package, CreditCard, MapPin,
  Calendar, Clock, CheckCircle, AlertCircle, Search, Filter,
  FileSpreadsheet, Image, Paperclip, Cloud, Share2, Copy
} from 'lucide-react';

const HebergeurPanier = () => {
  const [activeTab, setActiveTab] = useState('files');
  const [files, setFiles] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const fileInputRef = useRef(null);

  // Fonction pour consulter/prévisualiser un fichier
  const viewFile = (file) => {
    setSelectedFile(file);
    setShowFileViewer(true);
  };

  // Fonction pour fermer la prévisualisation
  const closeFileViewer = () => {
    setShowFileViewer(false);
    setSelectedFile(null);
  };

  // Rendu de la prévisualisation selon le type de fichier
  const renderFilePreview = (file) => {
    if (!file) return null;

    const fileType = file.type || '';
    const isImage = fileType.startsWith('image/');
    const isPDF = fileType === 'application/pdf';
    const isText = fileType.startsWith('text/') || fileType.includes('csv');
    const isExcel = fileType.includes('spreadsheet') || fileType.includes('excel');

    if (isImage) {
      return (
        <div className="max-w-4xl max-h-96 overflow-auto">
          <img 
            src={file.url || `data:${file.type};base64,${file.content}`} 
            alt={file.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-white mb-2">Fichier PDF</p>
            <p className="text-gray-400 text-sm mb-4">{file.name}</p>
            <button 
              onClick={() => window.open(file.url, '_blank')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Ouvrir dans un nouvel onglet
            </button>
          </div>
        </div>
      );
    }

    if (isExcel) {
      return (
        <div className="w-full h-96 bg-gray-800 rounded-lg p-6">
          <div className="text-center mb-6">
            <FileSpreadsheet className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-white text-lg mb-2">Fichier Excel</p>
            <p className="text-gray-400">{file.name}</p>
          </div>
          
          {/* Simulation d'un aperçu Excel */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="bg-gray-700 p-2 rounded text-white font-semibold">Marque</div>
              <div className="bg-gray-700 p-2 rounded text-white font-semibold">Modèle</div>
              <div className="bg-gray-700 p-2 rounded text-white font-semibold">Prix</div>
              <div className="bg-gray-700 p-2 rounded text-white font-semibold">Stock</div>
              
              <div className="bg-gray-800 p-2 rounded text-gray-300">Hermès</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">Birkin 30</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">€12,500</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">3</div>
              
              <div className="bg-gray-800 p-2 rounded text-gray-300">Chanel</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">Classic Flap</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">€8,200</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">5</div>
              
              <div className="bg-gray-800 p-2 rounded text-gray-300">...</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">...</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">...</div>
              <div className="bg-gray-800 p-2 rounded text-gray-300">...</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">Aperçu des premières lignes - Téléchargez le fichier pour voir l'intégralité</p>
          </div>
        </div>
      );
    }

    if (isText) {
      return (
        <div className="w-full h-96 bg-gray-800 rounded-lg p-4">
          <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-auto h-full">
            {file.content || `# ${file.name}

Ce fichier contient des données de catalogue Selezione.

Marques disponibles :
- Hermès
- Chanel  
- Louis Vuitton
- Dior
- Bottega Veneta

Pour plus d'informations, téléchargez le fichier complet.`}
          </pre>
        </div>
      );
    }

    // Type de fichier non supporté pour la prévisualisation
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <File className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-white mb-2">Aperçu non disponible</p>
          <p className="text-gray-400 text-sm mb-4">Type de fichier : {fileType}</p>
          <button 
            onClick={() => downloadFile(file)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger</span>
          </button>
        </div>
      </div>
    );
  };
  const [currentOrder, setCurrentOrder] = useState({
    items: [],
    customerInfo: {
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
      ville: '',
      codePostal: '',
      pays: 'France'
    },
    livraison: {
      type: 'standard',
      adresse: '',
      instructions: ''
    },
    paiement: {
      methode: 'card',
      sousTotal: 0,
      fraisLivraison: 0,
      tva: 0,
      total: 0
    }
  });

  // Simuler des fichiers existants
  React.useEffect(() => {
    const mockFiles = [
      {
        id: 'file_1',
        name: 'Catalogue_Hermes_AW2024.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 2.4 * 1024 * 1024,
        uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        category: 'Catalogue',
        description: 'Catalogue complet Hermès Automne-Hiver 2024',
        url: '#',
        downloads: 23,
        isPublic: false
      },
      {
        id: 'file_2',
        name: 'Prix_Chanel_Decembre2024.pdf',
        type: 'application/pdf',
        size: 1.8 * 1024 * 1024,
        uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        category: 'Prix',
        description: 'Grille tarifaire Chanel mise à jour',
        url: '#',
        downloads: 45,
        isPublic: true
      },
      {
        id: 'file_3',
        name: 'Template_Commande_Fournisseur.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 0.9 * 1024 * 1024,
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        category: 'Template',
        description: 'Template pour commandes fournisseurs',
        url: '#',
        downloads: 67,
        isPublic: true
      }
    ];
    setFiles(mockFiles);

    // Simuler un panier avec des produits
    const mockCart = [
      {
        id: 'prod_1',
        nom: 'Hermès Birkin 30 Togo Noir',
        fournisseur: 'Fournisseur Tokyo #1',
        reference: 'HER-BIR-30-TOGO-BLK',
        couleur: 'Noir',
        matiere: 'Cuir Togo',
        taille: '30cm',
        quantite: 1,
        prixSelezione: 9500,
        costPrice: 7200,
        image: 'https://via.placeholder.com/100x100?text=Birkin'
      },
      {
        id: 'prod_2',
        nom: 'Chanel Classic Flap Medium',
        fournisseur: 'Fournisseur Paris #3',
        reference: 'CHA-CF-MED-CAV-BEI',
        couleur: 'Beige',
        matiere: 'Cuir Caviar',
        taille: 'Medium',
        quantite: 2,
        prixSelezione: 6800,
        costPrice: 5100,
        image: 'https://via.placeholder.com/100x100?text=Chanel'
      }
    ];
    setCart(mockCart);
  }, []);

  // Gestion des fichiers
  const handleFileUpload = (uploadedFiles) => {
    setUploading(true);
    
    const newFiles = Array.from(uploadedFiles).map(file => ({
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date(),
      category: detectCategory(file.name),
      description: '',
      url: URL.createObjectURL(file),
      downloads: 0,
      isPublic: false,
      file: file
    }));

    // Simuler upload
    setTimeout(() => {
      setFiles(prev => [...newFiles, ...prev]);
      setUploading(false);
      alert(`✅ ${newFiles.length} fichier(s) uploadé(s) avec succès !`);
    }, 2000);
  };

  const detectCategory = (fileName) => {
    const name = fileName.toLowerCase();
    if (name.includes('catalogue')) return 'Catalogue';
    if (name.includes('prix') || name.includes('price')) return 'Prix';
    if (name.includes('template')) return 'Template';
    if (name.includes('commande')) return 'Commande';
    return 'Autre';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('spreadsheet') || type?.includes('excel')) return <FileSpreadsheet className="w-8 h-8 text-green-400" />;
    if (type?.includes('pdf')) return <FileText className="w-8 h-8 text-red-400" />;
    if (type?.includes('image')) return <Image className="w-8 h-8 text-blue-400" />;
    return <File className="w-8 h-8 text-gray-400" />;
  };

  const deleteFile = (fileId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setFiles(prev => prev.filter(f => f.id !== fileId));
    }
  };

  const shareFile = (file) => {
    const shareUrl = `https://selezione.app/files/${file.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('📋 Lien copié dans le presse-papier !');
  };

  // Gestion du panier
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, quantite: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const calculateCartTotals = () => {
    const sousTotal = cart.reduce((sum, item) => sum + (item.prixSelezione * item.quantite), 0);
    const fraisLivraison = sousTotal > 10000 ? 0 : 50; // Gratuit au-dessus de 10k€
    const tva = (sousTotal + fraisLivraison) * 0.20; // 20% TVA
    const total = sousTotal + fraisLivraison + tva;
    
    return { sousTotal, fraisLivraison, tva, total };
  };

  const processOrder = () => {
    if (cart.length === 0) {
      alert('⚠️ Votre panier est vide !');
      return;
    }

    const totals = calculateCartTotals();
    const orderData = {
      id: `order_${Date.now()}`,
      items: [...cart],
      customer: { ...currentOrder.customerInfo },
      totals,
      status: 'pending',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };

    setOrders(prev => [orderData, ...prev]);
    setCart([]);
    setActiveTab('orders');
    
    alert('🎉 Commande enregistrée avec succès ! Vous recevrez un email de confirmation.');
  };

  const { sousTotal, fraisLivraison, tva, total } = calculateCartTotals();

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              📁 HÉBERGEUR FICHIERS & COMMANDES
            </h1>
            <p className="text-gray-400 text-base">Gestion fichiers Excel • Panier commandes • Système WeTransfer intégré</p>
          </div>
          <div className="text-right">
            <div className="text-blue-400 font-bold text-2xl">{files.length}</div>
            <div className="text-gray-400 text-sm">Fichiers • {cart.length} panier</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="flex overflow-x-auto">
          {[
            { id: 'files', label: '📁 Mes Fichiers', count: files.length },
            { id: 'upload', label: '📤 Upload', count: null },
            { id: 'cart', label: '🛒 Panier', count: cart.length },
            { id: 'orders', label: '📦 Commandes', count: orders.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des onglets */}
      
      {/* Onglet Fichiers */}
      {activeTab === 'files' && (
        <div className="space-y-6">
          {/* Actions rapides */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Fichier</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher fichiers..."
                  className="pl-10 pr-4 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-600/50 focus:border-blue-500/50 outline-none"
                />
              </div>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Liste des fichiers */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Fichiers Hébergés ({files.length})</h2>
              
              {files.length === 0 ? (
                <div className="text-center py-12">
                  <File className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-gray-300 text-lg font-medium mb-2">Aucun fichier</h3>
                  <p className="text-gray-500 text-sm">Uploadez vos premiers fichiers pour commencer</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        {/* Icône fichier */}
                        <div className="flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>

                        {/* Infos fichier */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-medium">{file.name}</h3>
                            <div className="flex items-center space-x-2">
                              {file.isPublic && (
                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                                  Public
                                </span>
                              )}
                              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs border border-blue-500/30">
                                {file.category}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm mb-2">{file.description || 'Aucune description'}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>{formatFileSize(file.size)}</span>
                              <span>{file.uploadDate.toLocaleDateString('fr-FR')}</span>
                              <span>{file.downloads} téléchargements</span>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => viewFile(file)}
                                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                                title="Consulter le fichier"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => shareFile(file)}
                                className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-amber-400 transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteFile(file.id)}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Onglet Upload */}
      {activeTab === 'upload' && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6">Upload de Fichiers</h2>
          
          {/* Zone de drag & drop */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragOver 
                ? 'border-blue-400 bg-blue-500/10' 
                : 'border-gray-600 hover:border-blue-500'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFileUpload(e.dataTransfer.files);
            }}
          >
            <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">
              Glissez-déposez vos fichiers ici
            </h3>
            <p className="text-gray-400 mb-4">
              Ou cliquez pour sélectionner des fichiers
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {uploading ? 'Upload en cours...' : 'Choisir des fichiers'}
            </button>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>Formats supportés: Excel (.xlsx, .xls), PDF, Images, Documents</p>
              <p>Taille max: 100MB par fichier • Stockage illimité</p>
            </div>
          </div>

          {uploading && (
            <div className="mt-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                  <span className="text-blue-400">Upload en cours...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Onglet Panier */}
      {activeTab === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Produits dans le panier */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-blue-400" />
                Panier de Commande ({cart.length} articles)
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-gray-300 text-lg font-medium mb-2">Panier vide</h3>
                  <p className="text-gray-500 text-sm">Ajoutez des produits à votre panier</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-4">
                        {/* Image produit */}
                        <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>

                        {/* Détails produit */}
                        <div className="flex-1">
                          <h3 className="text-white font-medium mb-1">{item.nom}</h3>
                          <p className="text-gray-400 text-sm mb-1">{item.fournisseur}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Ref: {item.reference}</span>
                            <span>Couleur: {item.couleur}</span>
                            <span>Taille: {item.taille}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <span className="text-green-400 font-bold">{item.prixSelezione.toLocaleString()}€</span>
                              <span className="text-gray-500 text-sm ml-2">
                                (Coût: {item.costPrice.toLocaleString()}€)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantité */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantite - 1)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-medium w-12 text-center">
                            {item.quantite}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantite + 1)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Total ligne */}
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {(item.prixSelezione * item.quantite).toLocaleString()}€
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Résumé commande */}
          <div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Résumé de la Commande</h3>
              
              {cart.length > 0 && (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Sous-total:</span>
                      <span>{sousTotal.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Frais de livraison:</span>
                      <span className={fraisLivraison === 0 ? 'text-green-400' : ''}>
                        {fraisLivraison === 0 ? 'GRATUIT' : `${fraisLivraison}€`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>TVA (20%):</span>
                      <span>{tva.toFixed(2)}€</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total:</span>
                        <span>{total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={processOrder}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition-opacity"
                    >
                      Finaliser la Commande
                    </button>
                    
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">
                      Sauvegarder le Panier
                    </button>
                  </div>

                  {sousTotal > 10000 && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-400 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Livraison gratuite appliquée !
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Informations livraison */}
            {cart.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mt-6">
                <h4 className="text-white font-bold mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Livraison
                </h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Standard (7-10 jours):</span>
                    <span>{fraisLivraison}€</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Express (3-5 jours):</span>
                    <span>89€</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Urgent (1-2 jours):</span>
                    <span>149€</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Onglet Commandes */}
      {activeTab === 'orders' && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-green-400" />
            Mes Commandes ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-gray-300 text-lg font-medium mb-2">Aucune commande</h3>
              <p className="text-gray-500 text-sm">Vos commandes apparaîtront ici</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold">Commande #{order.id.slice(-8).toUpperCase()}</h3>
                      <p className="text-gray-400 text-sm">
                        {order.createdAt.toLocaleDateString('fr-FR')} • {order.items.length} articles
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/30">
                        En attente
                      </span>
                      <p className="text-white font-bold text-lg mt-1">
                        {order.totals.total.toFixed(2)}€
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Articles</h4>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-gray-400 text-sm">
                            {item.quantite}x {item.nom}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Livraison Estimée</h4>
                      <p className="text-gray-400 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {order.estimatedDelivery.toLocaleDateString('fr-FR')}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Actions</h4>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                          Détails
                        </button>
                        <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors">
                          Suivi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HebergeurPanier;