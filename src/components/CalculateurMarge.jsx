import React, { useState } from 'react';
import { 
  Calculator, DollarSign, TrendingUp, Target, Percent, 
  AlertCircle, CheckCircle, PieChart, BarChart3, Euro,
  Save, Download, RefreshCw, Info, Zap
} from 'lucide-react';

const CalculateurMarge = () => {
  // États du calculateur
  const [formData, setFormData] = useState({
    prixSelezione: '',
    prixBoutique: '',
    costPrice: '',
    costPercentage: 0,
    fraisPort: false,
    fraisPortMontant: 50,
    ursaff: false
  });

  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [savedCalculations, setSavedCalculations] = useState([]);

  // Constantes
  const URSAFF_RATE = 12.5; // 12.5%
  const TVA_RATE = 20; // 20%

  // Calcul automatique
  const calculateMargins = () => {
    const {
      prixSelezione,
      prixBoutique,
      costPrice,
      costPercentage,
      fraisPort,
      fraisPortMontant,
      ursaff
    } = formData;

    if (!prixSelezione || (!costPrice && costPercentage === 0)) {
      return null;
    }

    const prix_selezione = parseFloat(prixSelezione);
    const prix_boutique = parseFloat(prixBoutique) || 0;
    const frais_port = fraisPort ? parseFloat(fraisPortMontant) : 0;

    // Calcul du coût
    let cout_achat;
    if (costPrice) {
      cout_achat = parseFloat(costPrice);
    } else {
      cout_achat = prix_selezione * (costPercentage / 100);
    }

    // Calculs de base
    const cout_total = cout_achat + frais_port;
    const benefice_brut = prix_selezione - cout_total;
    const marge_brute_pct = ((benefice_brut / prix_selezione) * 100);

    // Calculs avec/sans URSAFF
    const charges_ursaff = ursaff ? (benefice_brut * URSAFF_RATE / 100) : 0;
    const benefice_net = benefice_brut - charges_ursaff;
    const marge_nette_pct = ((benefice_net / prix_selezione) * 100);

    // ROI
    const roi_pct = ((benefice_net / cout_total) * 100);

    // Comparaison prix boutique
    const economie_vs_boutique = prix_boutique > 0 ? (prix_boutique - prix_selezione) : 0;
    const economie_pct = prix_boutique > 0 ? ((economie_vs_boutique / prix_boutique) * 100) : 0;

    // Seuil de rentabilité
    const seuil_rentabilite = cout_total / (1 - (ursaff ? URSAFF_RATE / 100 : 0));

    return {
      // Données de base
      prix_selezione,
      prix_boutique,
      cout_achat,
      frais_port,
      cout_total,

      // Marges
      benefice_brut,
      marge_brute_pct,
      charges_ursaff,
      benefice_net,
      marge_nette_pct,

      // Performance
      roi_pct,
      seuil_rentabilite,

      // Comparaison
      economie_vs_boutique,
      economie_pct,

      // Recommandations
      rentable: benefice_net > 0,
      marge_saine: marge_nette_pct >= 20,
      roi_excellent: roi_pct >= 50
    };
  };

  // Mise à jour automatique des calculs
  React.useEffect(() => {
    const calculation = calculateMargins();
    setResults(calculation);
  }, [formData]);

  // Gestion des inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Sauvegarde du calcul
  const saveCalculation = () => {
    if (!results) return;

    const savedCalc = {
      id: Date.now(),
      timestamp: new Date(),
      data: { ...formData },
      results: { ...results },
      name: `Calcul ${savedCalculations.length + 1}`
    };

    setSavedCalculations(prev => [savedCalc, ...prev]);
    alert('💾 Calcul sauvegardé !');
  };

  // Export PDF/Excel
  const exportCalculation = () => {
    if (!results) return;

    const data = `
SELEZIONE - CALCULATEUR DE MARGE
${new Date().toLocaleString('fr-FR')}

DONNÉES D'ENTRÉE:
- Prix SELEZIONE: ${results.prix_selezione}€
- Prix boutique: ${results.prix_boutique || 'N/A'}€
- Coût d'achat: ${results.cout_achat}€
- Frais de port: ${results.frais_port}€
- URSAFF: ${formData.ursaff ? 'Activé' : 'Désactivé'}

RÉSULTATS:
- Coût total: ${results.cout_total}€
- Bénéfice brut: ${results.benefice_brut.toFixed(2)}€
- Marge brute: ${results.marge_brute_pct.toFixed(2)}%
- Charges URSAFF: ${results.charges_ursaff.toFixed(2)}€
- Bénéfice net: ${results.benefice_net.toFixed(2)}€
- Marge nette: ${results.marge_nette_pct.toFixed(2)}%
- ROI: ${results.roi_pct.toFixed(2)}%

ANALYSE:
- Rentable: ${results.rentable ? 'OUI' : 'NON'}
- Marge saine (>20%): ${results.marge_saine ? 'OUI' : 'NON'}
- ROI excellent (>50%): ${results.roi_excellent ? 'OUI' : 'NON'}
    `;

    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `selezione-calcul-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Reset
  const resetCalculator = () => {
    setFormData({
      prixSelezione: '',
      prixBoutique: '',
      costPrice: '',
      costPercentage: 0,
      fraisPort: false,
      fraisPortMontant: 50,
      ursaff: false
    });
    setResults(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              💰 CALCULATEUR DE MARGE PRO
            </h1>
            <p className="text-gray-400 text-base">Calculez vos marges avec précision • URSAFF 12,5% • Frais inclus</p>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-bold text-2xl">URSAFF</div>
            <div className="text-gray-400 text-sm">12.5% intégré</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de calcul */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 space-y-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Calculator className="w-6 h-6 mr-3 text-green-400" />
            Paramètres de Calcul
          </h2>

          {/* Prix SELEZIONE */}
          <div>
            <label className="block text-green-400 font-medium mb-2">Prix SELEZIONE (Prix de vente) *</label>
            <div className="relative">
              <Euro className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={formData.prixSelezione}
                onChange={(e) => handleInputChange('prixSelezione', e.target.value)}
                placeholder="Ex: 8500"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-green-500/50 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Prix boutique */}
          <div>
            <label className="block text-blue-400 font-medium mb-2">Prix boutique (optionnel)</label>
            <div className="relative">
              <Euro className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={formData.prixBoutique}
                onChange={(e) => handleInputChange('prixBoutique', e.target.value)}
                placeholder="Ex: 12000"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-blue-500/50 outline-none transition-colors"
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">Pour calculer l'économie vs prix boutique</p>
          </div>

          {/* Coût d'achat */}
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h3 className="text-amber-400 font-medium mb-3">Coût d'achat (choisir une méthode)</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Montant fixe</label>
                <div className="relative">
                  <Euro className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => handleInputChange('costPrice', e.target.value)}
                    placeholder="Ex: 6000"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-amber-500/50 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="text-center text-gray-500 text-sm">OU</div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Pourcentage du prix SELEZIONE</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.costPercentage}
                    onChange={(e) => handleInputChange('costPercentage', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>0%</span>
                    <span className="text-amber-400 font-bold">{formData.costPercentage}%</span>
                    <span>100%</span>
                  </div>
                </div>
                {formData.prixSelezione && formData.costPercentage > 0 && (
                  <p className="text-amber-400 text-sm mt-2">
                    = {(parseFloat(formData.prixSelezione) * formData.costPercentage / 100).toFixed(2)}€
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Frais de port */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="fraisPort"
                  checked={formData.fraisPort}
                  onChange={(e) => handleInputChange('fraisPort', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="fraisPort" className="text-white font-medium">
                  Ajouter frais de port
                </label>
              </div>
              {formData.fraisPort && (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={formData.fraisPortMontant}
                    onChange={(e) => handleInputChange('fraisPortMontant', e.target.value)}
                    className="w-20 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 text-sm"
                  />
                  <span className="text-gray-400 text-sm">€</span>
                </div>
              )}
            </div>

            {/* URSAFF */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="ursaff"
                  checked={formData.ursaff}
                  onChange={(e) => handleInputChange('ursaff', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="ursaff" className="text-white font-medium">
                  Déduire URSAFF (12,5%)
                </label>
              </div>
              <div className="text-purple-400 text-sm font-bold">12,5%</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={resetCalculator}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={saveCalculation}
              disabled={!results}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>

            <button
              onClick={exportCalculation}
              disabled={!results}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Résultats */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
            Résultats du Calcul
          </h2>

          {!results ? (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-gray-300 text-lg font-medium mb-2">Prêt pour le calcul</h3>
              <p className="text-gray-500 text-sm">
                Renseignez le prix SELEZIONE et le coût d'achat pour commencer
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Indicateur de rentabilité */}
              <div className={`p-4 rounded-lg border ${
                results.rentable 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {results.rentable ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <p className={`font-bold ${results.rentable ? 'text-green-400' : 'text-red-400'}`}>
                        {results.rentable ? 'OPERATION RENTABLE' : 'OPÉRATION DÉFICITAIRE'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Bénéfice net: {results.benefice_net.toFixed(2)}€
                      </p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${results.rentable ? 'text-green-400' : 'text-red-400'}`}>
                    {results.marge_nette_pct.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Métriques principales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-400 font-medium text-sm">Bénéfice Brut</p>
                  <p className="text-white font-bold text-xl">{results.benefice_brut.toFixed(2)}€</p>
                  <p className="text-gray-400 text-xs">{results.marge_brute_pct.toFixed(1)}%</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-purple-400 font-medium text-sm">Bénéfice Net</p>
                  <p className="text-white font-bold text-xl">{results.benefice_net.toFixed(2)}€</p>
                  <p className="text-gray-400 text-xs">{results.marge_nette_pct.toFixed(1)}%</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-amber-400 font-medium text-sm">ROI</p>
                  <p className="text-white font-bold text-xl">{results.roi_pct.toFixed(1)}%</p>
                  <p className="text-gray-400 text-xs">Return on investment</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <Euro className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium text-sm">Économie vs Boutique</p>
                  <p className="text-white font-bold text-xl">
                    {results.economie_vs_boutique > 0 ? `${results.economie_vs_boutique.toFixed(0)}€` : 'N/A'}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {results.economie_pct > 0 ? `${results.economie_pct.toFixed(1)}%` : 'Prix boutique requis'}
                  </p>
                </div>
              </div>

              {/* Détail des coûts */}
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Détail des Coûts
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Coût d'achat:</span>
                    <span>{results.cout_achat.toFixed(2)}€</span>
                  </div>
                  {results.frais_port > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Frais de port:</span>
                      <span>{results.frais_port.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-medium border-t border-gray-700 pt-2">
                    <span>Coût total:</span>
                    <span>{results.cout_total.toFixed(2)}€</span>
                  </div>
                  {results.charges_ursaff > 0 && (
                    <div className="flex justify-between text-red-400">
                      <span>Charges URSAFF (12,5%):</span>
                      <span>-{results.charges_ursaff.toFixed(2)}€</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommandations */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-amber-400 font-bold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Analyse & Recommandations
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    {results.rentable ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-gray-300">
                      Rentabilité: {results.rentable ? 'Profitable' : 'À revoir'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {results.marge_saine ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-400" />
                    )}
                    <span className="text-gray-300">
                      Marge saine (&gt;20%): {results.marge_saine ? 'Oui' : 'Faible'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {results.roi_excellent ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-400" />
                    )}
                    <span className="text-gray-300">
                      ROI excellent (>50%): {results.roi_excellent ? 'Excellent' : 'Modéré'}
                    </span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-amber-500/20 text-amber-200">
                    <strong>Seuil de rentabilité:</strong> {results.seuil_rentabilite.toFixed(2)}€
                    <br />
                    <small className="text-amber-300/70">
                      Prix minimum pour couvrir tous les coûts
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historique des calculs sauvegardés */}
      {savedCalculations.length > 0 && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold text-white mb-4">📚 Calculs Sauvegardés</h3>
          <div className="space-y-2">
            {savedCalculations.slice(0, 5).map((calc) => (
              <div key={calc.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">{calc.name}</p>
                  <p className="text-gray-400 text-sm">
                    {calc.timestamp.toLocaleString('fr-FR')} • 
                    Marge: {calc.results.marge_nette_pct.toFixed(1)}% • 
                    Bénéfice: {calc.results.benefice_net.toFixed(2)}€
                  </p>
                </div>
                <button 
                  onClick={() => setFormData(calc.data)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                >
                  Charger
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculateurMarge;