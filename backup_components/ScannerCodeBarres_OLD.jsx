import React, { useState, useRef } from 'react';
import { 
  Camera, Search, CheckCircle, AlertCircle, Scan, 
  Package, Star, DollarSign, ExternalLink, RefreshCw,
  Upload, Trash2, Eye, ShoppingCart, Zap
} from 'lucide-react';

const ScannerCodeBarres = () => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const fileInputRef = useRef(null);

  // Scanner avec vraie API backend
  const scanBarcode = async (barcode) => {
    if (!barcode || barcode.length < 8) {
      setScanResult({
        found: false,
        message: "Code-barres invalide. Minimum 8 chiffres requis."
      });
      return;
    }

    setIsScanning(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/scan-barcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode: barcode.trim() })
      });
      
      const result = await response.json();
      setScanResult(result);
      
      // Ajout à l'historique
      if (result.found) {
        const historyItem = {
          id: Date.now(),
          barcode: barcode,
          product: result.product,
          luxury_detected: result.luxury_detected,
          timestamp: new Date().toLocaleString('fr-FR')
        };
        setScanHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Garder 10 derniers
      }
      
    } catch (error) {
      setScanResult({
        found: false,
        message: "Erreur de connexion au service de scan.",
        error: error.message
      });
    }
    setIsScanning(false);
  };

  // Simulation camera (en production, utiliser QuaggaJS ou ZXing)
  const simulateCamera = () => {
    const testBarcodes = [
      { code: "3386460065436", name: "Chanel N°5 Parfum" },
      { code: "3348901419372", name: "Dior Sauvage" },
      { code: "3474636397457", name: "Hermès Terre d'Hermès" },
      { code: "3605521816443", name: "Chanel Bleu de Chanel" },
      { code: "1234567890123", name: "Produit test non-luxe" }
    ];
    
    const randomProduct = testBarcodes[Math.floor(Math.random() * testBarcodes.length)];
    setBarcodeInput(randomProduct.code);
    scanBarcode(randomProduct.code);
  };

  // Upload d'image (simulation)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulation de détection de code-barres dans l'image
      setScanResult({
        found: false,
        message: "Détection d'image en développement. Utilisez la saisie manuelle.",
        file_uploaded: file.name
      });
    }
  };

  // Estimation rapide
  const getQuickEstimate = (product) => {
    if (product.luxury_detected) {
      const brands = {
        'chanel': { min: 80, max: 200 },
        'dior': { min: 60, max: 150 },
        'hermès': { min: 100, max: 300 },
        'louis vuitton': { min: 70, max: 180 }
      };
      
      const brand = product.brand?.toLowerCase() || '';
      const priceRange = Object.keys(brands).find(b => brand.includes(b));
      
      if (priceRange) {
        const { min, max } = brands[priceRange];
        return `${min}-${max}€ (occasion)`;
      }
    }
    return "Estimation non disponible";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Scanner Code-Barres Professionnel
            </h1>
            <p className="text-gray-400 text-sm">
              Identification automatique • 3 APIs intégrées • Base de données luxe
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-black/30 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400">APIs actives</p>
              <p className="text-white font-bold text-sm">UPC + OpenFood</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scanner Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interface de scan */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Scan className="w-5 h-5 mr-2 text-purple-400" />
            Scanner un produit
          </h3>
          
          {/* Saisie manuelle */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Code-barres (8-13 chiffres)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value.replace(/\D/g, '').slice(0, 13))}
                  placeholder="Saisissez le code-barres..."
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={() => scanBarcode(barcodeInput)}
                  disabled={isScanning || barcodeInput.length < 8}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isScanning ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span>Scanner</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Formats supportés : EAN-8, EAN-13, UPC-A, UPC-E
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={simulateCamera}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Simuler Camera</span>
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
              
              <button
                onClick={() => {
                  setBarcodeInput('');
                  setScanResult(null);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Effacer</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Résultats */}
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-blue-400" />
            Résultat du scan
          </h3>
          
          {!scanResult ? (
            <div className="text-center py-8">
              <Scan className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Scannez un code-barres pour voir les détails du produit</p>
            </div>
          ) : scanResult.found ? (
            <div className="space-y-4">
              {/* Statut */}
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Produit identifié</span>
                {scanResult.luxury_detected && (
                  <div className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">
                    LUXE
                  </div>
                )}
              </div>

              {/* Détails produit */}
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-400">Nom du produit</p>
                  <p className="text-white font-bold text-lg">{scanResult.product.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Marque</p>
                    <p className="text-white font-medium">{scanResult.product.brand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Catégorie</p>
                    <p className="text-white font-medium">{scanResult.product.category}</p>
                  </div>
                </div>

                {scanResult.product.description && (
                  <div>
                    <p className="text-xs text-gray-400">Description</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {scanResult.product.description.slice(0, 150)}...
                    </p>
                  </div>
                )}

                {/* Prix et estimation */}
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Prix retail</p>
                      <p className="text-white font-bold">
                        {scanResult.product.estimated_price || scanResult.product.msrp || "Non disponible"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Estimation occasion</p>
                      <p className="text-green-400 font-bold">{getQuickEstimate(scanResult.product)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center space-x-2 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Estimation IA</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Voir détails</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Produit non trouvé</span>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm mb-2">{scanResult.message}</p>
                {scanResult.suggestion && (
                  <p className="text-gray-400 text-xs">{scanResult.suggestion}</p>
                )}
                {scanResult.apis_tested && (
                  <p className="text-gray-500 text-xs mt-2">
                    APIs testées: {scanResult.apis_tested.join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historique */}
      {scanHistory.length > 0 && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-green-400" />
            Historique des scans ({scanHistory.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scanHistory.slice(0, 6).map((item) => (
              <div key={item.id} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{item.barcode}</span>
                  {item.luxury_detected && (
                    <Star className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <p className="text-white font-medium text-sm mb-1 line-clamp-2">
                  {item.product.name}
                </p>
                <p className="text-gray-400 text-xs mb-2">{item.product.brand}</p>
                <p className="text-gray-500 text-xs">{item.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exemples de codes */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Codes d'exemple pour test
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { code: "3386460065436", brand: "Chanel N°5", category: "Parfum" },
            { code: "3348901419372", brand: "Dior Sauvage", category: "Parfum" },
            { code: "3474636397457", brand: "Hermès Terre", category: "Parfum" },
          ].map((example) => (
            <button
              key={example.code}
              onClick={() => {
                setBarcodeInput(example.code);
                scanBarcode(example.code);
              }}
              className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/70 transition-colors text-left"
            >
              <p className="text-purple-400 font-mono text-sm">{example.code}</p>
              <p className="text-white font-medium text-sm">{example.brand}</p>
              <p className="text-gray-400 text-xs">{example.category}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScannerCodeBarres;