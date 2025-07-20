import React, { useState } from 'react';
import { 
  Scan, CheckCircle, Camera, Database, TrendingUp, FileText,
  Mail, Users, BarChart3, Calculator, Shield, Crown, Star,
  Zap, Target, Award, RefreshCw, Download, Save, Search,
  Filter, Settings, AlertCircle, ChevronRight, Eye, Copy
} from 'lucide-react';

const OutilsBusiness = () => {
  const [activeTool, setActiveTool] = useState('scanner');
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);

  // Données simulées pour les outils
  const [suppliers, setSuppliers] = useState([
    {
      id: 'sup_1',
      nom: 'Tokyo Luxury House',
      pays: 'Japon',
      specialite: 'Hermès, Chanel',
      rating: 4.9,
      commandes: 147,
      delaiMoyen: '5-7 jours',
      paiement: 'T/T, L/C',
      contact: 'tanaka@tlh-japan.com',
      remiseMax: '15%',
      verified: true
    },
    {
      id: 'sup_2', 
      nom: 'Milano Fashion Wholesale',
      pays: 'Italie',
      specialite: 'Gucci, Prada, Bottega',
      rating: 4.7,
      commandes: 89,
      delaiMoyen: '3-5 jours',
      paiement: 'T/T, PayPal',
      contact: 'marco@mfw-italy.com',
      remiseMax: '12%',
      verified: true
    },
    {
      id: 'sup_3',
      nom: 'Paris Premium Source',
      pays: 'France',
      specialite: 'Louis Vuitton, Dior',
      rating: 4.8,
      commandes: 203,
      delaiMoyen: '2-4 jours', 
      paiement: 'T/T, Visa',
      contact: 'pierre@pps-paris.fr',
      remiseMax: '10%',
      verified: true
    }
  ]);

  const [analytics, setAnalytics] = useState({
    bestSellingBrands: [
      { nom: 'Hermès', ventes: 847, croissance: '+23%', profit: '18.4%' },
      { nom: 'Chanel', ventes: 623, croissance: '+18%', profit: '15.2%' },
      { nom: 'Louis Vuitton', ventes: 534, croissance: '+12%', profit: '12.8%' },
      { nom: 'Rolex', ventes: 298, croissance: '+45%', profit: '22.1%' }
    ],
    monthlyStats: {
      chiffreAffaires: 234500,
      margeGlobale: 16.7,
      nbTransactions: 89,
      tauxReussite: 94.2
    }
  });

  // Outils disponibles
  const tools = [
    {
      id: 'scanner',
      name: 'Scanner Code-Barres',
      icon: Scan,
      color: 'blue',
      description: 'Scanner les codes-barres pour identification automatique'
    },
    {
      id: 'authenticator',
      name: 'Authentificateur IA',
      icon: Shield,
      color: 'green', 
      description: 'Vérification d\'authenticité par intelligence artificielle'
    },
    {
      id: 'invoice',
      name: 'Générateur Factures',
      icon: FileText,
      color: 'purple',
      description: 'Création automatique de factures professionnelles'
    },
    {
      id: 'crm',
      name: 'CRM Fournisseurs',
      icon: Users,
      color: 'amber',
      description: 'Gestion complète de vos fournisseurs'
    },
    {
      id: 'analytics',
      name: 'Analytics Avancés',
      icon: BarChart3,
      color: 'pink',
      description: 'Analyses détaillées de performance business'
    }
  ];

  // Scanner code-barres
  const handleBarcodeScan = (barcode = '3346130502739') => {
    setScanLoading(true);
    
    // Simulation de scan avec base de données
    setTimeout(() => {
      const mockResults = {
        '3346130502739': {
          marque: 'Chanel',
          nom: 'Chanel N°5 Eau de Parfum 100ml',
          categorie: 'Parfum',
          prixBoutique: 165,
          estimation: { min: 95, max: 120, moyen: 108 },
          authenticite: 95,
          rarity: 'Commun',
          image: 'https://via.placeholder.com/200x200?text=Chanel+N5',
          description: 'Eau de parfum iconique Chanel N°5 en flacon de 100ml'
        },
        'default': {
          marque: 'Hermès',
          nom: 'Hermès Birkin 30 Togo',
          categorie: 'Maroquinerie',
          prixBoutique: 10500,
          estimation: { min: 8500, max: 12000, moyen: 10200 },
          authenticite: 98,
          rarity: 'Très Rare',
          image: 'https://via.placeholder.com/200x200?text=Birkin+30',
          description: 'Sac Birkin 30cm en cuir Togo avec hardware palladié'
        }
      };
      
      setScanResult(mockResults[barcode] || mockResults['default']);
      setScanLoading(false);
    }, 2000);
  };

  // Authentificateur IA
  const authenticateProduct = () => {
    return {
      score: 96.8,
      authentic: true,
      confidence: 'Très élevée',
      checks: [
        { test: 'Analyse matériaux', result: 'PASS', score: 98 },
        { test: 'Vérification coutures', result: 'PASS', score: 95 },
        { test: 'Contrôle hardware', result: 'PASS', score: 97 },
        { test: 'Signature artisan', result: 'PASS', score: 96 },
        { test: 'Code série', result: 'PASS', score: 99 }
      ]
    };
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-amber-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              🚀 OUTILS BUSINESS ULTRA
            </h1>
            <p className="text-gray-400 text-base">5 outils révolutionnaires pour maximiser vos profits dans le luxe</p>
          </div>
          <div className="text-right">
            <div className="text-amber-400 font-bold text-2xl">{tools.length}</div>
            <div className="text-gray-400 text-sm">Outils disponibles</div>
          </div>
        </div>
      </div>

      {/* Navigation outils */}
      <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {tools.map((tool, index) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-4 text-center transition-colors border-b md:border-b-0 md:border-r border-gray-700/50 last:border-r-0 ${
                activeTool === tool.id
                  ? `bg-${tool.color}-500/20 border-${tool.color}-500/30`
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <tool.icon className={`w-8 h-8 mx-auto mb-2 ${
                activeTool === tool.id 
                  ? `text-${tool.color}-400` 
                  : 'text-gray-400'
              }`} />
              <h3 className={`font-bold text-sm ${
                activeTool === tool.id 
                  ? `text-${tool.color}-400`
                  : 'text-white'
              }`}>
                {tool.name}
              </h3>
              <p className="text-gray-400 text-xs mt-1">{tool.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des outils */}
      
      {/* Scanner Code-Barres */}
      {activeTool === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Scan className="w-6 h-6 mr-3 text-blue-400" />
              Scanner Code-Barres
            </h2>

            {/* Zone de scan simulée */}
            <div className="bg-gray-900/50 rounded-lg p-8 text-center mb-6 border-2 border-dashed border-gray-600">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Simulateur de Scan</h3>
              <p className="text-gray-400 text-sm mb-4">Cliquez pour simuler un scan de code-barres</p>
              
              <button
                onClick={() => handleBarcodeScan()}
                disabled={scanLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {scanLoading ? 'Scan en cours...' : '📱 Simuler Scan'}
              </button>
            </div>

            {/* Interface de saisie manuelle */}
            <div className="space-y-4">
              <div>
                <label className="block text-blue-400 font-medium mb-2">Saisie manuelle</label>
                <input
                  type="text"
                  placeholder="Entrez le code-barres manuellement"
                  className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-blue-500/50 outline-none transition-colors"
                />
              </div>
              
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">
                Rechercher
              </button>
            </div>
          </div>

          {/* Résultats du scan */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-green-400" />
              Résultats
            </h2>

            {scanLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <p className="text-blue-400">Recherche en cours...</p>
              </div>
            ) : scanResult ? (
              <div className="space-y-6">
                {/* Image & infos de base */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">{scanResult.nom}</h3>
                      <p className="text-amber-400 font-medium">{scanResult.marque}</p>
                      <p className="text-gray-400 text-sm">{scanResult.categorie}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs border border-purple-500/30">
                          {scanResult.rarity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs border ${
                          scanResult.authenticite > 90 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          Authenticité {scanResult.authenticite}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prix et estimation */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                    <p className="text-blue-400 font-medium text-sm">Prix Boutique</p>
                    <p className="text-white font-bold text-xl">{scanResult.prixBoutique}€</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <p className="text-green-400 font-medium text-sm">Estimation Revente</p>
                    <p className="text-white font-bold text-xl">{scanResult.estimation.moyen}€</p>
                  </div>
                </div>

                {/* Fourchette d'estimation */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-3">Fourchette de Prix</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Minimum:</span>
                      <span className="text-red-400 font-medium">{scanResult.estimation.min}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Maximum:</span>
                      <span className="text-green-400 font-medium">{scanResult.estimation.max}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Recommandé:</span>
                      <span className="text-blue-400 font-bold">{scanResult.estimation.moyen}€</span>
                    </div>
                  </div>
                  
                  {/* Barre de progression */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-400 via-blue-400 to-green-400 h-2 rounded-full"
                        style={{ 
                          width: `${((scanResult.estimation.moyen - scanResult.estimation.min) / (scanResult.estimation.max - scanResult.estimation.min)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                    Ajouter au Panier
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Authentifier
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Scan className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-gray-300 text-lg font-medium mb-2">Prêt à scanner</h3>
                <p className="text-gray-500 text-sm">Scannez un code-barres pour identifier le produit</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Authentificateur IA */}
      {activeTool === 'authenticator' && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-green-400" />
            Authentificateur IA - Précision 98.7%
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone d'upload */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-6 text-center border-2 border-dashed border-gray-600">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Photos du Produit</h3>
                <p className="text-gray-400 text-sm mb-4">Ajoutez 5-8 photos haute résolution</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                  📷 Ajouter Photos
                </button>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3">Points de Contrôle</h4>
                <div className="space-y-2">
                  {[
                    'Coutures et assemblage',
                    'Qualité des matériaux',
                    'Hardware et fermetures',
                    'Marquages et numéros série',
                    'Proportions et symétrie',
                    'Finitions et détails'
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Résultats d'authentification */}
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-green-400 font-bold text-2xl mb-2">AUTHENTIQUE</h3>
                <p className="text-white font-medium text-lg mb-2">Score: 96.8/100</p>
                <p className="text-gray-400 text-sm">Confiance: Très élevée</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-bold mb-4">Détail des Tests</h4>
                <div className="space-y-3">
                  {authenticateProduct().checks.map((check, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{check.test}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-bold text-sm">{check.score}%</span>
                        <span className="text-green-400 text-xs">{check.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  Rapport PDF
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors">
                  <Share className="w-4 h-4 inline mr-2" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Générateur de Factures */}
      {activeTool === 'invoice' && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-purple-400" />
            Générateur de Factures Pro
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulaire facture */}
            <div className="space-y-4">
              <div>
                <label className="block text-purple-400 font-medium mb-2">Numéro de Facture</label>
                <input
                  type="text"
                  defaultValue="INV-2024-001"
                  className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-400 font-medium mb-2">Date</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-purple-400 font-medium mb-2">Échéance</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-400 font-medium mb-2">Client</label>
                <select className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors">
                  <option>Boutique Luxe Paris</option>
                  <option>Premium Fashion Store</option>
                  <option>Elite Collection</option>
                </select>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3">Articles</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="text-gray-400">Description</span>
                    <span className="text-gray-400">Qté</span>
                    <span className="text-gray-400">Prix U.</span>
                    <span className="text-gray-400">Total</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <input placeholder="Hermès Birkin 30" className="p-2 rounded bg-gray-800 text-white text-sm" />
                    <input placeholder="1" className="p-2 rounded bg-gray-800 text-white text-sm" />
                    <input placeholder="9500€" className="p-2 rounded bg-gray-800 text-white text-sm" />
                    <span className="text-green-400 font-bold p-2">9500€</span>
                  </div>
                </div>
                <button className="mt-3 text-purple-400 text-sm hover:text-purple-300 transition-colors">
                  + Ajouter une ligne
                </button>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors">
                  Générer Facture
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors">
                  Aperçu
                </button>
              </div>
            </div>

            {/* Aperçu facture */}
            <div className="bg-white rounded-lg p-6 text-black">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">FACTURE</h3>
                <p className="text-gray-600">N° INV-2024-001</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">VENDEUR</h4>
                  <p className="text-sm text-gray-600">
                    SELEZIONE SAS<br />
                    123 Avenue Montaigne<br />
                    75008 Paris, France<br />
                    SIRET: 12345678901234
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">CLIENT</h4>
                  <p className="text-sm text-gray-600">
                    Boutique Luxe Paris<br />
                    456 Rue Saint-Honoré<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left p-2">Description</th>
                      <th className="text-center p-2">Qté</th>
                      <th className="text-right p-2">Prix U.</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">Hermès Birkin 30 Togo Noir</td>
                      <td className="text-center p-2">1</td>
                      <td className="text-right p-2">9 500,00€</td>
                      <td className="text-right p-2 font-bold">9 500,00€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-end">
                  <div className="w-48">
                    <div className="flex justify-between py-1">
                      <span>Sous-total:</span>
                      <span>9 500,00€</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>TVA (20%):</span>
                      <span>1 900,00€</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-lg border-t border-gray-300">
                      <span>TOTAL:</span>
                      <span>11 400,00€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRM Fournisseurs */}
      {activeTool === 'crm' && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Users className="w-6 h-6 mr-3 text-amber-400" />
              CRM Fournisseurs ({suppliers.length} fournisseurs)
            </h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                + Nouveau Fournisseur
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-amber-500/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold">{supplier.nom}</h3>
                    <p className="text-gray-400 text-sm">{supplier.pays}</p>
                  </div>
                  {supplier.verified && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Commandes:</span>
                    <span className="text-white">{supplier.commandes}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Délai:</span>
                    <span className="text-white">{supplier.delaiMoyen}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Remise max:</span>
                    <span className="text-green-400 font-medium">{supplier.remiseMax}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-amber-400 text-sm font-medium">Spécialités:</p>
                  <p className="text-gray-300 text-xs">{supplier.specialite}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm">
                    Contacter
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors text-sm">
                    Commander
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Avancés */}
      {activeTool === 'analytics' && (
        <div className="space-y-6">
          {/* Métriques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-400 font-medium text-sm">CA Mensuel</p>
              <p className="text-white font-bold text-2xl">{analytics.monthlyStats.chiffreAffaires.toLocaleString()}€</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-medium text-sm">Marge Globale</p>
              <p className="text-white font-bold text-2xl">{analytics.monthlyStats.margeGlobale}%</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-purple-400 font-medium text-sm">Transactions</p>
              <p className="text-white font-bold text-2xl">{analytics.monthlyStats.nbTransactions}</p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-amber-400 font-medium text-sm">Taux Réussite</p>
              <p className="text-white font-bold text-2xl">{analytics.monthlyStats.tauxReussite}%</p>
            </div>
          </div>

          {/* Marques les plus vendues */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Top Marques - Performance</h3>
            <div className="space-y-4">
              {analytics.bestSellingBrands.map((brand, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{brand.nom}</h4>
                      <p className="text-gray-400 text-sm">{brand.ventes} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{brand.croissance}</p>
                    <p className="text-gray-400 text-sm">Marge: {brand.profit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutilsBusiness;