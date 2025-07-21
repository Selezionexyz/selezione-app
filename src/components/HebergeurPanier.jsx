import React, { useState, useRef } from 'react';
import { 
  Upload, File, FileText, Download, Trash2, Eye, Edit, Save,
  ShoppingCart, Plus, Minus, X, Package, CreditCard, MapPin,
  Calendar, Clock, CheckCircle, AlertCircle, Search, Filter,
  Printer, Send, User, Phone, Mail, Building, ChevronDown
} from 'lucide-react';

const HebergeurPanier = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('files');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  
  // Formulaire complet pour bon de commande
  const [orderForm, setOrderForm] = useState({
    fileName: '',
    brand: '',
    category: '',
    productName: '',
    reference: '',
    colorCode: '',
    quantity: 1,
    size: '',
    priceSezione: '',
    priceBoutique: ''
  });

  const fileInputRef = useRef(null);

  // Options pour les menus déroulants
  const brands = [
    'Hermès', 'Chanel', 'Louis Vuitton', 'Dior', 'Gucci', 'Prada', 
    'Bottega Veneta', 'Céline', 'Saint Laurent', 'Balenciaga', 'Rolex', 
    'Patek Philippe', 'Cartier', 'Tiffany & Co'
  ];

  const categories = [
    'Maroquinerie', 'Horlogerie', 'Bijouterie', 'Prêt-à-porter', 
    'Chaussures', 'Accessoires', 'Parfums', 'Lunettes'
  ];

  const sizes = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', '44', 
    '46', '48', '25', '30', '35', 'Unique'
  ];

  // GESTION DRAG & DROP
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  // TRAITEMENT FICHIERS
  const processFiles = (files) => {
    files.forEach(file => {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert(`Fichier ${file.name} trop volumineux (max 50MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
          content: e.target.result,
          status: 'uploaded'
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  // APERÇU FICHIERS
  const previewFile = (file) => {
    setSelectedFile(file);
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  const deleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // GESTION BON DE COMMANDE COMPLET
  const addOrderToCart = () => {
    if (!orderForm.fileName || !orderForm.brand || !orderForm.productName) {
      alert('Veuillez remplir au minimum: nom fichier, marque et nom produit');
      return;
    }

    const orderItem = {
      id: Date.now() + Math.random(),
      ...orderForm,
      priceSezione: parseFloat(orderForm.priceSezione) || 0,
      priceBoutique: parseFloat(orderForm.priceBoutique) || 0,
      quantity: parseInt(orderForm.quantity) || 1,
      addedDate: new Date()
    };

    setCartItems(prev => [...prev, orderItem]);
    
    // Reset form
    setOrderForm({
      fileName: '', brand: '', category: '', productName: '',
      reference: '', colorCode: '', quantity: 1, size: '',
      priceSezione: '', priceBoutique: ''
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // GÉNÉRATION BON DE COMMANDE PROFESSIONNEL
  const generateFullOrderSlip = () => {
    if (cartItems.length === 0) {
      alert('Panier vide - Ajoutez des produits avant de générer un bon de commande');
      return;
    }

    const orderNumber = `SELEZIONE-${Date.now()}`;
    const orderDate = new Date().toLocaleDateString('fr-FR');
    
    const orderContent = `
╔══════════════════════════════════════════════════════════════╗
║                    SELEZIONE - BON DE COMMANDE                ║
║                     Plateforme B2B Luxe                      ║
╚══════════════════════════════════════════════════════════════╝

📋 INFORMATIONS COMMANDE
═══════════════════════════════════════════════════════════════
• N° Commande: ${orderNumber}
• Date: ${orderDate}
• Heure: ${new Date().toLocaleTimeString('fr-FR')}

📦 DÉTAIL DES ARTICLES
═══════════════════════════════════════════════════════════════
${cartItems.map((item, index) => `
${index + 1}. ARTICLE: ${item.productName}
   ├─ Fichier: ${item.fileName}
   ├─ Marque: ${item.brand}
   ├─ Catégorie: ${item.category}
   ├─ Référence: ${item.reference || 'Non spécifiée'}
   ├─ Code Couleur: ${item.colorCode || 'Non spécifié'}
   ├─ Taille: ${item.size || 'Non spécifiée'}
   ├─ Quantité: ${item.quantity}
   ├─ Prix SELEZIONE: €${item.priceSezione.toLocaleString()}
   └─ Prix Boutique: €${item.priceBoutique.toLocaleString()}
`).join('')}

💰 RÉCAPITULATIF FINANCIER
═══════════════════════════════════════════════════════════════
• Nombre total d'articles: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}
• Total prix SELEZIONE: €${cartItems.reduce((sum, item) => sum + (item.priceSezione * item.quantity), 0).toLocaleString()}
• Total prix Boutique: €${cartItems.reduce((sum, item) => sum + (item.priceBoutique * item.quantity), 0).toLocaleString()}
• Économies potentielles: €${cartItems.reduce((sum, item) => sum + ((item.priceBoutique - item.priceSezione) * item.quantity), 0).toLocaleString()}

📋 MARQUES REPRÉSENTÉES
═══════════════════════════════════════════════════════════════
${[...new Set(cartItems.map(item => item.brand))].join(', ')}

🏷️ CATÉGORIES
═══════════════════════════════════════════════════════════════
${[...new Set(cartItems.map(item => item.category))].join(', ')}

🔐 SELEZIONE - Plateforme B2B Luxe Professionnelle
Généré automatiquement le ${new Date().toLocaleString('fr-FR')}
    `;

    // Créer et télécharger le fichier
    const blob = new Blob([orderContent], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BON-COMMANDE-${orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Sauvegarder dans localStorage
    const orders = JSON.parse(localStorage.getItem('selezione_orders') || '[]');
    orders.push({
      orderNumber,
      date: orderDate,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.priceSezione * item.quantity), 0)
    });
    localStorage.setItem('selezione_orders', JSON.stringify(orders));

    alert(`✅ Bon de commande ${orderNumber} généré et téléchargé !`);
    setCartItems([]);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          📁 Gestionnaire Fichiers & Commandes Pro
        </h1>
        <p className="text-xl text-gray-300">
          Upload de fichiers + Générateur de bons de commande professionnels
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
            <Upload className="w-4 h-4 mr-2 inline" />
            Upload Fichiers
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 mr-2 inline" />
            Bons de Commande
          </button>
        </div>
      </div>

      {activeTab === 'files' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Zone Upload Améliorée */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-3 text-blue-400" />
              Upload Fichiers
            </h2>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                dragOver 
                  ? 'border-blue-400 bg-blue-600/20' 
                  : 'border-gray-600 hover:border-blue-500 hover:bg-blue-600/10'
              }`}
            >
              <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-300 mb-2 text-lg font-medium">
                Glissez-déposez vos fichiers ici
              </p>
              <p className="text-sm text-gray-500 mb-4">
                ou cliquez pour parcourir votre dossier de téléchargement
              </p>
              <div className="text-xs text-gray-500">
                Formats acceptés: PDF, Images (JPG, PNG), Documents (DOC, DOCX, TXT)
                <br />
                Taille max: 50MB par fichier
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt,.xlsx,.xls"
            />
          </div>

          {/* Liste Fichiers */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">
              📁 Fichiers Uploadés ({uploadedFiles.length})
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-medium text-white text-sm">{file.name}</p>
                      <p className="text-xs text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.uploadDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => previewFile(file)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      title="Aperçu"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {uploadedFiles.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <File className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Aucun fichier uploadé</p>
                  <p className="text-sm">Utilisez la zone de drop ci-dessus</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulaire Complet */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Edit className="w-6 h-6 mr-3 text-green-400" />
              Création Bon de Commande
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nom du fichier */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom du fichier *
                </label>
                <input
                  type="text"
                  value={orderForm.fileName}
                  onChange={(e) => setOrderForm({...orderForm, fileName: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="ex: IMG_001.jpg"
                />
              </div>

              {/* Marque */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Marque *
                </label>
                <div className="relative">
                  <select
                    value={orderForm.brand}
                    onChange={(e) => setOrderForm({...orderForm, brand: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 appearance-none"
                  >
                    <option value="">Sélectionnez une marque</option>
                    
                    {/* MAROQUINERIE ULTRA LUXE */}
                    <optgroup label="🔥 MAROQUINERIE ULTRA LUXE">
                      <option value="Hermès">Hermès</option>
                      <option value="Chanel">Chanel</option>
                      <option value="Louis Vuitton">Louis Vuitton</option>
                      <option value="Dior">Dior</option>
                      <option value="Bottega Veneta">Bottega Veneta</option>
                      <option value="Goyard">Goyard</option>
                      <option value="Moynat">Moynat</option>
                      <option value="Berluti">Berluti</option>
                    </optgroup>
                    
                    {/* MAROQUINERIE PREMIUM */}
                    <optgroup label="👑 MAROQUINERIE PREMIUM">
                      <option value="Gucci">Gucci</option>
                      <option value="Saint Laurent">Saint Laurent</option>
                      <option value="Prada">Prada</option>
                      <option value="Miu Miu">Miu Miu</option>
                      <option value="Loewe">Loewe</option>
                      <option value="Celine">Céline</option>
                      <option value="Balenciaga">Balenciaga</option>
                      <option value="Givenchy">Givenchy</option>
                      <option value="Valentino">Valentino</option>
                      <option value="Burberry">Burberry</option>
                      <option value="Fendi">Fendi</option>
                      <option value="JW Anderson">JW Anderson</option>
                      <option value="Jacquemus">Jacquemus</option>
                      <option value="The Row">The Row</option>
                      <option value="Mansur Gavriel">Mansur Gavriel</option>
                    </optgroup>
                    
                    {/* MONTRES ULTRA LUXE */}
                    <optgroup label="⌚ MONTRES ULTRA LUXE">
                      <option value="Patek Philippe">Patek Philippe</option>
                      <option value="Audemars Piguet">Audemars Piguet</option>
                      <option value="Vacheron Constantin">Vacheron Constantin</option>
                      <option value="A. Lange & Söhne">A. Lange & Söhne</option>
                      <option value="Jaeger-LeCoultre">Jaeger-LeCoultre</option>
                      <option value="Richard Mille">Richard Mille</option>
                      <option value="F.P. Journe">F.P. Journe</option>
                      <option value="Philippe Dufour">Philippe Dufour</option>
                    </optgroup>
                    
                    {/* MONTRES PREMIUM */}
                    <optgroup label="⏱️ MONTRES PREMIUM">
                      <option value="Rolex">Rolex</option>
                      <option value="Cartier">Cartier</option>
                      <option value="Omega">Omega</option>
                      <option value="Tudor">Tudor</option>
                      <option value="Breitling">Breitling</option>
                      <option value="IWC">IWC</option>
                      <option value="Panerai">Panerai</option>
                      <option value="Hublot">Hublot</option>
                      <option value="Tag Heuer">TAG Heuer</option>
                      <option value="Zenith">Zenith</option>
                      <option value="Chopard">Chopard</option>
                      <option value="Bvlgari">Bvlgari</option>
                      <option value="Piaget">Piaget</option>
                      <option value="Van Cleef & Arpels">Van Cleef & Arpels</option>
                    </optgroup>
                    
                    {/* BIJOUX ULTRA LUXE */}
                    <optgroup label="💎 BIJOUX ULTRA LUXE">
                      <option value="Tiffany & Co.">Tiffany & Co.</option>
                      <option value="Harry Winston">Harry Winston</option>
                      <option value="Graff">Graff</option>
                      <option value="De Beers">De Beers</option>
                      <option value="Mikimoto">Mikimoto</option>
                      <option value="Boucheron">Boucheron</option>
                      <option value="Chaumet">Chaumet</option>
                      <option value="Mauboussin">Mauboussin</option>
                      <option value="Messika">Messika</option>
                      <option value="Repossi">Repossi</option>
                    </optgroup>
                    
                    {/* PRÊT-À-PORTER FEMME */}
                    <optgroup label="👗 PRÊT-À-PORTER FEMME">
                      <option value="Tom Ford">Tom Ford</option>
                      <option value="Giorgio Armani">Giorgio Armani</option>
                      <option value="Versace">Versace</option>
                      <option value="Dolce & Gabbana">Dolce & Gabbana</option>
                      <option value="Alexander McQueen">Alexander McQueen</option>
                      <option value="Stella McCartney">Stella McCartney</option>
                      <option value="Isabel Marant">Isabel Marant</option>
                      <option value="Zimmermann">Zimmermann</option>
                      <option value="Ganni">Ganni</option>
                      <option value="Self-Portrait">Self-Portrait</option>
                      <option value="Khaite">Khaite</option>
                      <option value="Totême">Totême</option>
                      <option value="Lemaire">Lemaire</option>
                      <option value="Proenza Schouler">Proenza Schouler</option>
                    </optgroup>
                    
                    {/* PRÊT-À-PORTER HOMME */}
                    <optgroup label="🤵 PRÊT-À-PORTER HOMME">
                      <option value="Brunello Cucinelli">Brunello Cucinelli</option>
                      <option value="Loro Piana">Loro Piana</option>
                      <option value="Kiton">Kiton</option>
                      <option value="Brioni">Brioni</option>
                      <option value="Ermenegildo Zegna">Ermenegildo Zegna</option>
                      <option value="Canali">Canali</option>
                      <option value="Isaia">Isaia</option>
                      <option value="Stone Island">Stone Island</option>
                      <option value="C.P. Company">C.P. Company</option>
                      <option value="Acne Studios">Acne Studios</option>
                      <option value="Our Legacy">Our Legacy</option>
                      <option value="Maison Margiela">Maison Margiela</option>
                    </optgroup>
                    
                    {/* CHAUSSURES */}
                    <optgroup label="👞 CHAUSSURES LUXE">
                      <option value="Christian Louboutin">Christian Louboutin</option>
                      <option value="Jimmy Choo">Jimmy Choo</option>
                      <option value="Manolo Blahnik">Manolo Blahnik</option>
                      <option value="Gianvito Rossi">Gianvito Rossi</option>
                      <option value="Roger Vivier">Roger Vivier</option>
                      <option value="Aquazzura">Aquazzura</option>
                      <option value="Golden Goose">Golden Goose</option>
                      <option value="Maison Margiela">Maison Margiela</option>
                      <option value="Common Projects">Common Projects</option>
                      <option value="Off-White">Off-White</option>
                      <option value="Amiri">Amiri</option>
                      <option value="Fear of God">Fear of God</option>
                    </optgroup>
                    
                    {/* STREETWEAR LUXE */}
                    <optgroup label="🔥 STREETWEAR LUXE">
                      <option value="Supreme">Supreme</option>
                      <option value="Bape">BAPE</option>
                      <option value="Gallery Dept">Gallery Dept</option>
                      <option value="Chrome Hearts">Chrome Hearts</option>
                      <option value="Rhude">Rhude</option>
                      <option value="Essentials">Essentials</option>
                      <option value="Stussy">Stüssy</option>
                      <option value="Kith">Kith</option>
                      <option value="Palace">Palace</option>
                      <option value="Mastermind">Mastermind</option>
                      <option value="Undercover">Undercover</option>
                      <option value="Neighborhood">Neighborhood</option>
                    </optgroup>
                    
                    {/* PARFUMS LUXE */}
                    <optgroup label="🌸 PARFUMS LUXE">
                      <option value="Creed">Creed</option>
                      <option value="Tom Ford">Tom Ford</option>
                      <option value="Maison Francis Kurkdjian">Maison Francis Kurkdjian</option>
                      <option value="Byredo">Byredo</option>
                      <option value="Le Labo">Le Labo</option>
                      <option value="Diptyque">Diptyque</option>
                      <option value="Amouage">Amouage</option>
                      <option value="Clive Christian">Clive Christian</option>
                      <option value="Bond No. 9">Bond No. 9</option>
                      <option value="Serge Lutens">Serge Lutens</option>
                    </optgroup>
                    
                    {/* MARQUES ÉMERGENTES */}
                    <optgroup label="🌟 MARQUES ÉMERGENTES">
                      <option value="Staud">Staud</option>
                      <option value="Cult Gaia">Cult Gaia</option>
                      <option value="Rejina Pyo">Rejina Pyo</option>
                      <option value="Nanushka">Nanushka</option>
                      <option value="By Far">By Far</option>
                      <option value="Wandler">Wandler</option>
                      <option value="ATP Atelier">ATP Atelier</option>
                      <option value="Hereu">Hereu</option>
                      <option value="Ratio et Motus">Ratio et Motus</option>
                      <option value="Little Liffner">Little Liffner</option>
                    </optgroup>
                    
                    {/* ARTISANS FRANÇAIS */}
                    <optgroup label="🇫🇷 ARTISANS FRANÇAIS">
                      <option value="Polène">Polène</option>
                      <option value="Atelier Paulin">Atelier Paulin</option>
                      <option value="Officine Générale">Officine Générale</option>
                      <option value="AMI Paris">AMI Paris</option>
                      <option value="Gauchere">Gauchere</option>
                      <option value="Kenzo">Kenzo</option>
                      <option value="A.P.C.">A.P.C.</option>
                      <option value="Sézane">Sézane</option>
                      <option value="Rouje">Rouje</option>
                      <option value="Ba&sh">Ba&sh</option>
                    </optgroup>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-4 text-gray-400" />
                </div>
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Catégorie de produits
                </label>
                <div className="relative">
                  <select
                    value={orderForm.category}
                    onChange={(e) => setOrderForm({...orderForm, category: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 appearance-none"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-4 text-gray-400" />
                </div>
              </div>

              {/* Nom du produit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={orderForm.productName}
                  onChange={(e) => setOrderForm({...orderForm, productName: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="ex: Birkin 30"
                />
              </div>

              {/* Référence produit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Référence produit
                </label>
                <input
                  type="text"
                  value={orderForm.reference}
                  onChange={(e) => setOrderForm({...orderForm, reference: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="ex: B30TGNOIR"
                />
              </div>

              {/* Code couleur */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code couleur
                </label>
                <input
                  type="text"
                  value={orderForm.colorCode}
                  onChange={(e) => setOrderForm({...orderForm, colorCode: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="ex: Noir (89)"
                />
              </div>

              {/* Quantité */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantité
                </label>
                <input
                  type="number"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({...orderForm, quantity: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  min="1"
                />
              </div>

              {/* Taille */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Taille
                </label>
                <div className="relative">
                  <select
                    value={orderForm.size}
                    onChange={(e) => setOrderForm({...orderForm, size: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 appearance-none"
                  >
                    <option value="">Sélectionnez une taille</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-4 text-gray-400" />
                </div>
              </div>

              {/* Prix SELEZIONE */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prix SELEZIONE (€)
                </label>
                <input
                  type="number"
                  value={orderForm.priceSezione}
                  onChange={(e) => setOrderForm({...orderForm, priceSezione: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="ex: 8500"
                  step="0.01"
                />
              </div>

              {/* Prix boutique */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prix boutique (€)
                </label>
                <input
                  type="number"
                  value={orderForm.priceBoutique}
                  onChange={(e) => setOrderForm({...orderForm, priceBoutique: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="ex: 12000"
                  step="0.01"
                />
              </div>

            </div>

            <div className="mt-6">
              <button
                onClick={addOrderToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter au Panier Commande
              </button>
            </div>
          </div>

          {/* Panier Commandes */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-blue-400" />
              Panier ({cartItems.length})
            </h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white text-sm">{item.brand} {item.productName}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>📁 {item.fileName}</div>
                    <div>🏷️ {item.category}</div>
                    {item.reference && <div>🔍 {item.reference}</div>}
                    {item.colorCode && <div>🎨 {item.colorCode}</div>}
                    {item.size && <div>📏 {item.size}</div>}
                    <div>💰 SELEZIONE: €{item.priceSezione}</div>
                    <div>🏪 Boutique: €{item.priceBoutique}</div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-gray-600 hover:bg-gray-500 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-gray-600 hover:bg-gray-500 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-green-400 font-bold text-sm">
                      €{(item.priceSezione * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {cartItems.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Panier vide</p>
                  <p className="text-sm">Ajoutez des produits ci-dessus</p>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <>
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Articles:</span>
                    <span className="text-white">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Total SELEZIONE:</span>
                    <span className="text-green-400 font-bold">€{cartItems.reduce((sum, item) => sum + (item.priceSezione * item.quantity), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Économies:</span>
                    <span className="text-blue-400 font-bold">€{cartItems.reduce((sum, item) => sum + ((item.priceBoutique - item.priceSezione) * item.quantity), 0).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={generateFullOrderSlip}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Générer Bon de Commande
                </button>
              </>
            )}
          </div>

        </div>
      )}

      {/* Modal Aperçu Fichier */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-4xl max-h-[90vh] w-full overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">📁 {selectedFile.name}</h3>
              <button onClick={closePreview} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center">
              {selectedFile.type.startsWith('image/') ? (
                <img 
                  src={selectedFile.content} 
                  alt={selectedFile.name} 
                  className="max-w-full max-h-96 mx-auto rounded-lg shadow-2xl"
                />
              ) : (
                <div className="bg-gray-700 rounded-lg p-12">
                  <FileText className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                  <p className="text-white mb-2 text-lg">{selectedFile.name}</p>
                  <p className="text-gray-400 mb-6">
                    Taille: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = selectedFile.content;
                      a.download = selectedFile.name;
                      a.click();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center mx-auto"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le fichier
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