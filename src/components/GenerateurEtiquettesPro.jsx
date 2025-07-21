import React, { useState, useRef } from 'react';
import { 
  Tag, QrCode, Download, Printer, Eye, Copy, Palette,
  Package, Star, Calendar, Shield, Settings, FileText,
  RefreshCw, Grid, List, Search, Filter, Plus, Trash2
} from 'lucide-react';

const GenerateurEtiquettesPro = () => {
  const [labelData, setLabelData] = useState({
    brand: '',
    model: '',
    reference: '',
    color: '',
    size: '',
    condition: 'Excellent',
    purchase_price: '',
    retail_price: '',
    date_acquired: '',
    authentication_status: 'Authentifié',
    notes: ''
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState('luxury_standard');
  const [qrCodeData, setQrCodeData] = useState('');
  const [savedLabels, setSavedLabels] = useState([]);
  const [printQueue, setPrintQueue] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const canvasRef = useRef(null);

  // TEMPLATES D'ÉTIQUETTES PROFESSIONNELLES
  const LABEL_TEMPLATES = {
    luxury_standard: {
      name: 'Luxe Standard',
      description: 'Template classique pour maroquinerie et accessoires',
      dimensions: { width: 89, height: 36 }, // mm
      fields: ['brand', 'model', 'reference', 'color', 'condition', 'qr_code'],
      colors: {
        primary: '#D4AF37',
        secondary: '#1A1A1A',
        accent: '#FFFFFF',
        text: '#333333'
      }
    },
    
    hermes_premium: {
      name: 'Hermès Premium',
      description: 'Template spécial Hermès avec codes couleur',
      dimensions: { width: 89, height: 36 },
      fields: ['brand', 'model', 'reference', 'color', 'size', 'authentication', 'qr_code'],
      colors: {
        primary: '#FF6B00', // Orange Hermès
        secondary: '#2C1810',
        accent: '#FFFFFF',
        text: '#2C1810'
      }
    },
    
    chanel_elegance: {
      name: 'Chanel Élégance',
      description: 'Template Chanel avec style iconique',
      dimensions: { width: 89, height: 36 },
      fields: ['brand', 'model', 'reference', 'color', 'condition', 'price', 'qr_code'],
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#C19A6B',
        text: '#000000'
      }
    },
    
    inventory_detailed: {
      name: 'Inventaire Détaillé',
      description: 'Template complet pour gestion stock',
      dimensions: { width: 89, height: 54 }, // Plus grand
      fields: ['brand', 'model', 'reference', 'color', 'size', 'condition', 'purchase_price', 'retail_price', 'date', 'notes', 'qr_code'],
      colors: {
        primary: '#4A90E2',
        secondary: '#F5F5F5',
        accent: '#34C759',
        text: '#1D1D1F'
      }
    },
    
    minimalist_qr: {
      name: 'QR Minimaliste',
      description: 'Focus sur le QR code avec infos essentielles',
      dimensions: { width: 50, height: 50 }, // Carré
      fields: ['brand', 'model', 'qr_code'],
      colors: {
        primary: '#FFFFFF',
        secondary: '#000000',
        accent: '#666666',
        text: '#000000'
      }
    }
  };

  // PRODUITS SUGGÉRÉS POUR GÉNÉRATION RAPIDE
  const QUICK_PRODUCTS = [
    {
      brand: 'Hermès',
      model: 'Birkin 30',
      reference: 'HER-BIR-30-TOGO',
      color: 'Noir',
      size: '30cm',
      condition: 'Excellent',
      purchase_price: '9500',
      retail_price: '15800'
    },
    {
      brand: 'Chanel',
      model: 'Classic Flap Medium',
      reference: 'CHA-CF-MED-CAV',
      color: 'Noir Caviar',
      size: 'Medium',
      condition: 'Très bon',
      purchase_price: '6800',
      retail_price: '9200'
    },
    {
      brand: 'Louis Vuitton',
      model: 'Neverfull MM',
      reference: 'LV-NF-MM-MON',
      color: 'Monogram',
      size: 'MM',
      condition: 'Bon',
      purchase_price: '1200',
      retail_price: '1690'
    }
  ];

  // Génération du QR Code (simulation)
  const generateQRCode = () => {
    const qrData = JSON.stringify({
      brand: labelData.brand,
      model: labelData.model,
      reference: labelData.reference,
      auth_url: `https://selezione.app/auth/${labelData.reference}`,
      verification_code: Math.random().toString(36).substring(2, 15),
      generated_at: new Date().toISOString()
    });
    
    setQrCodeData(qrData);
    return qrData;
  };

  // Génération de l'étiquette
  const generateLabel = () => {
    if (!labelData.brand || !labelData.model) {
      alert('Veuillez renseigner au moins la marque et le modèle');
      return;
    }

    const qrData = generateQRCode();
    const newLabel = {
      id: `label_${Date.now()}`,
      ...labelData,
      template: selectedTemplate,
      qr_data: qrData,
      created_at: new Date(),
      preview_url: generateLabelPreview()
    };

    setSavedLabels(prev => [newLabel, ...prev]);
    setShowPreview(true);
  };

  // Génération aperçu étiquette
  const generateLabelPreview = () => {
    const template = LABEL_TEMPLATES[selectedTemplate];
    
    // Simulation génération image étiquette
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Dimensions en pixels (300 DPI)
    canvas.width = (template.dimensions.width / 25.4) * 300;
    canvas.height = (template.dimensions.height / 25.4) * 300;
    
    // Fond
    ctx.fillStyle = template.colors.secondary;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Bordure
    ctx.strokeStyle = template.colors.primary;
    ctx.lineWidth = 3;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
    
    // Texte (simulation)
    ctx.fillStyle = template.colors.text;
    ctx.font = 'bold 24px Arial';
    ctx.fillText(labelData.brand, 15, 35);
    
    ctx.font = '18px Arial';
    ctx.fillText(labelData.model, 15, 60);
    
    ctx.font = '14px Arial';
    ctx.fillText(`Ref: ${labelData.reference}`, 15, 80);
    ctx.fillText(`Couleur: ${labelData.color}`, 15, 100);
    
    // QR Code simulation (carré noir)
    const qrSize = 80;
    ctx.fillStyle = template.colors.text;
    ctx.fillRect(canvas.width - qrSize - 15, 15, qrSize, qrSize);
    
    // Pattern QR simulé
    ctx.fillStyle = template.colors.accent;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (Math.random() > 0.4) {
          ctx.fillRect(
            canvas.width - qrSize - 15 + i * 10 + 2,
            15 + j * 10 + 2,
            6, 6
          );
        }
      }
    }
    
    return canvas.toDataURL();
  };

  // Produit rapide
  const loadQuickProduct = (product) => {
    setLabelData({
      ...labelData,
      ...product,
      date_acquired: new Date().toISOString().split('T')[0]
    });
  };

  // Ajout au queue d'impression
  const addToPrintQueue = (label) => {
    setPrintQueue(prev => {
      const exists = prev.find(l => l.id === label.id);
      if (exists) return prev;
      return [...prev, { ...label, copies: 1 }];
    });
  };

  // Impression batch
  const printBatch = () => {
    if (printQueue.length === 0) {
      alert('Aucune étiquette dans la queue d\'impression');
      return;
    }

    // Simulation impression
    alert(`🖨️ Impression de ${printQueue.length} étiquette(s) lancée !`);
    setPrintQueue([]);
  };

  // Export PDF
  const exportToPDF = () => {
    if (savedLabels.length === 0) {
      alert('Aucune étiquette à exporter');
      return;
    }

    // Simulation export PDF
    alert('📄 Export PDF généré ! Téléchargement en cours...');
  };

  const resetForm = () => {
    setLabelData({
      brand: '',
      model: '',
      reference: '',
      color: '',
      size: '',
      condition: 'Excellent',
      purchase_price: '',
      retail_price: '',
      date_acquired: '',
      authentication_status: 'Authentifié',
      notes: ''
    });
    setQrCodeData('');
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Tag className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Générateur Étiquettes Pro
            </h1>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
              QR CODES
            </span>
          </div>
          <p className="text-gray-400">
            Étiquettes professionnelles • QR codes authentification • Templates personnalisés • Export PDF
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={printBatch}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            disabled={printQueue.length === 0}
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer ({printQueue.length})</span>
          </button>
          
          <button 
            onClick={exportToPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Formulaire création */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Sélection template */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Palette className="w-6 h-6 mr-2 text-purple-400" />
              Templates d'Étiquettes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {Object.entries(LABEL_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    selectedTemplate === key
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <h3 className="text-white font-semibold">{template.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{template.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {template.dimensions.width}×{template.dimensions.height}mm
                  </p>
                </button>
              ))}
            </div>
            
            {/* Produits rapides */}
            <div>
              <h3 className="text-white font-semibold mb-3">Produits Suggérés</h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_PRODUCTS.map((product, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadQuickProduct(product)}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    {product.brand} {product.model}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire détails produit */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Package className="w-6 h-6 mr-2 text-blue-400" />
              Détails Produit
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Marque *
                </label>
                <input
                  type="text"
                  value={labelData.brand}
                  onChange={(e) => setLabelData({...labelData, brand: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: Hermès, Chanel, Louis Vuitton"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modèle *
                </label>
                <input
                  type="text"
                  value={labelData.model}
                  onChange={(e) => setLabelData({...labelData, model: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: Birkin 30, Classic Flap Medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Référence
                </label>
                <input
                  type="text"
                  value={labelData.reference}
                  onChange={(e) => setLabelData({...labelData, reference: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: HER-BIR-30-TOGO-BLK"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Couleur
                </label>
                <input
                  type="text"
                  value={labelData.color}
                  onChange={(e) => setLabelData({...labelData, color: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: Noir, Rose Pourpre, Monogram"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Taille
                </label>
                <input
                  type="text"
                  value={labelData.size}
                  onChange={(e) => setLabelData({...labelData, size: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: 30cm, Medium, Large"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Condition
                </label>
                <select
                  value={labelData.condition}
                  onChange={(e) => setLabelData({...labelData, condition: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Neuf avec étiquettes">Neuf avec étiquettes</option>
                  <option value="Neuf sans étiquettes">Neuf sans étiquettes</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Très bon">Très bon</option>
                  <option value="Bon">Bon</option>
                  <option value="Correct">Correct</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prix d'achat (€)
                </label>
                <input
                  type="number"
                  value={labelData.purchase_price}
                  onChange={(e) => setLabelData({...labelData, purchase_price: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="9500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prix de vente (€)
                </label>
                <input
                  type="number"
                  value={labelData.retail_price}
                  onChange={(e) => setLabelData({...labelData, retail_price: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  placeholder="15800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date d'acquisition
                </label>
                <input
                  type="date"
                  value={labelData.date_acquired}
                  onChange={(e) => setLabelData({...labelData, date_acquired: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status Authentification
                </label>
                <select
                  value={labelData.authentication_status}
                  onChange={(e) => setLabelData({...labelData, authentication_status: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Authentifié">✅ Authentifié</option>
                  <option value="En cours">⏳ En cours</option>
                  <option value="À vérifier">❓ À vérifier</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                value={labelData.notes}
                onChange={(e) => setLabelData({...labelData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                placeholder="Notes additionnelles, défauts, particularités..."
              />
            </div>
            
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={generateLabel}
                className="flex items-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-semibold"
              >
                <QrCode className="w-5 h-5" />
                <span>Générer Étiquette</span>
              </button>
              
              <button
                onClick={resetForm}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar étiquettes sauvegardées */}
        <div className="space-y-6">
          
          {/* Queue d'impression */}
          {printQueue.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                <Printer className="w-5 h-5 mr-2" />
                Queue d'impression ({printQueue.length})
              </h3>
              <div className="space-y-2">
                {printQueue.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-white">{item.brand} {item.model}</span>
                    <button
                      onClick={() => setPrintQueue(prev => prev.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Étiquettes sauvegardées */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-400" />
              Étiquettes Sauvegardées ({savedLabels.length})
            </h3>
            
            {savedLabels.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucune étiquette générée
              </p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedLabels.map((label) => (
                  <div key={label.id} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {label.brand} {label.model}
                        </h4>
                        <p className="text-gray-400 text-xs">
                          {label.reference}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => addToPrintQueue(label)}
                          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                          title="Ajouter à l'impression"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{LABEL_TEMPLATES[label.template]?.name}</span>
                      <span>{label.created_at.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateurEtiquettesPro;