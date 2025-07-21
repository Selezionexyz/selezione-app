import React, { useState, useRef } from 'react';
import { 
  Upload, File, FileText, Download, Trash2, Eye, Edit, Save,
  ShoppingCart, Plus, Minus, X, Package, CreditCard, MapPin,
  Calendar, Clock, CheckCircle, AlertCircle, Search, Filter,
  Printer, Send, User, Phone, Mail, Building
} from 'lucide-react';

const HebergeurPanier = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState('files');
  const [selectedFile, setSelectedFile] = useState(null);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    deliveryDate: '',
    paymentMethod: 'card',
    notes: ''
  });
  const fileInputRef = useRef(null);

  // GESTION FICHIERS RÉELLE
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
          content: e.target.result, // Base64 pour aperçu
          status: 'uploaded'
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  // APERÇU FICHIERS RÉEL
  const previewFile = (file) => {
    setSelectedFile(file);
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  // GESTION PANIER RÉELLE
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(prev => prev.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // GÉNÉRATION BON DE COMMANDE RÉEL
  const generateOrderSlip = () => {
    const orderData = {
      orderNumber: `SELEZIONE-${Date.now()}`,
      date: new Date().toLocaleDateString('fr-FR'),
      customer: orderForm,
      items: cartItems,
      total: getTotalPrice(),
      status: 'pending'
    };

    // Stocker commande
    const orders = JSON.parse(localStorage.getItem('selezione_orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('selezione_orders', JSON.stringify(orders));

    // Générer PDF (simulation)
    const orderContent = `
SELEZIONE - BON DE COMMANDE
═══════════════════════════════════

N° Commande: ${orderData.orderNumber}
Date: ${orderData.date}

CLIENT:
${orderData.customer.customerName}
${orderData.customer.customerEmail}
${orderData.customer.customerPhone}
${orderData.customer.customerAddress}

ARTICLES:
${cartItems.map(item => 
  `• ${item.name} - Qté: ${item.quantity} - Prix: €${item.price}`
).join('\n')}

TOTAL: €${getTotalPrice().toLocaleString()}

Livraison prévue: ${orderData.customer.deliveryDate}
Mode de paiement: ${orderData.customer.paymentMethod}

Notes: ${orderData.customer.notes}
`;

    // Télécharger
    const blob = new Blob([orderContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Commande-${orderData.orderNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    alert(`Commande ${orderData.orderNumber} créée et téléchargée !`);
    setCartItems([]);
    setOrderForm({
      customerName: '', customerEmail: '', customerPhone: '',
      customerAddress: '', deliveryDate: '', paymentMethod: 'card', notes: ''
    });
  };

  // PRODUITS EXEMPLE POUR DEMO
  const demoProducts = [
    { id: 1, name: 'Hermès Birkin 30', price: 12000, category: 'Maroquinerie', image: '👜' },
    { id: 2, name: 'Chanel Classic Flap', price: 6800, category: 'Maroquinerie', image: '👛' },
    { id: 3, name: 'Rolex Daytona', price: 35000, category: 'Horlogerie', image: '⌚' },
    { id: 4, name: 'Louis Vuitton Keepall', price: 2500, category: 'Voyage', image: '🎒' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📁 Fichiers & Commandes Pro
        </h1>
        <p className="text-xl text-gray-300">
          Gestionnaire de fichiers + Générateur de bons de commande
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'files'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <File className="w-4 h-4 mr-2 inline" />
            Gestionnaire Fichiers
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 mr-2 inline" />
            Produits & Commandes
          </button>
        </div>
      </div>

      {activeTab === 'files' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upload Zone */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-3 text-blue-400" />
              Upload Fichiers
            </h2>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Cliquez pour upload</p>
              <p className="text-sm text-gray-500">PDF, Images, Documents</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
            />
          </div>

          {/* Files List */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">
              Fichiers ({uploadedFiles.length})
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-white">{file.name}</p>
                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB • {file.uploadDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => previewFile(file)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {uploadedFiles.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun fichier uploadé</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Produits */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Produits Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoProducts.map(product => (
                <div key={product.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <h3 className="font-bold text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.category}</p>
                    <p className="text-xl font-bold text-green-400 mt-2">€{product.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Panier & Commande */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-green-400" />
              Panier ({cartItems.length})
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">€{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-600 hover:bg-gray-500 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-600 hover:bg-gray-500 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
              
              {cartItems.length === 0 && (
                <p className="text-gray-400 text-center py-4">Panier vide</p>
              )}
            </div>

            {cartItems.length > 0 && (
              <>
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="text-xl font-bold text-green-400">
                    Total: €{getTotalPrice().toLocaleString()}
                  </div>
                </div>

                {/* Formulaire Commande */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom client"
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={orderForm.customerEmail}
                    onChange={(e) => setOrderForm({...orderForm, customerEmail: e.target.value})}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  />
                  <input
                    type="date"
                    placeholder="Date livraison"
                    value={orderForm.deliveryDate}
                    onChange={(e) => setOrderForm({...orderForm, deliveryDate: e.target.value})}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white"
                  />
                  
                  <button
                    onClick={generateOrderSlip}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Générer Bon de Commande
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      )}

      {/* Modal Preview Fichier */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-4xl max-h-4xl w-full h-full m-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{selectedFile.name}</h3>
              <button onClick={closePreview} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center">
              {selectedFile.type.startsWith('image/') ? (
                <img src={selectedFile.content} alt={selectedFile.name} className="max-w-full max-h-96 mx-auto rounded-lg" />
              ) : (
                <div className="bg-gray-700 rounded-lg p-8">
                  <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-white mb-2">{selectedFile.name}</p>
                  <p className="text-gray-400">Aperçu non disponible pour ce type de fichier</p>
                  <button
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = selectedFile.content;
                      a.download = selectedFile.name;
                      a.click();
                    }}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    <Download className="w-4 h-4 mr-2 inline" />
                    Télécharger
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HebergeurPanier;