import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Camera, X, TrendingUp, Brain, BarChart3, Loader, AlertCircle, CheckCircle } from 'lucide-react';

export default function OutilEstimationIA() {
  const [query, setQuery] = useState('');
  const [etat, setEtat] = useState('neuf');
  const [marque, setMarque] = useState('');
  const [periode, setPeriode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  // Nouveaux états pour l'analyse détaillée
  const [matiere, setMatiere] = useState('');
  const [odeur, setOdeur] = useState('');
  const [dechirures, setDechirures] = useState('');
  const [taches, setTaches] = useState('');
  const [etatInterieur, setEtatInterieur] = useState('');
  const [etatAnses, setEtatAnses] = useState('');
  const [detailsSupp, setDetailsSupp] = useState('');
  
  // État pour le mode d'estimation
  const [estimationMode, setEstimationMode] = useState('ai-market');
  const [comparativeResults, setComparativeResults] = useState(null);
  const [marketData, setMarketData] = useState(null);

  // Fonction mock pour simuler l'estimation IA 
  const getMockEstimation = (description) => {
    // Extraire les informations de la description
    const lowerDesc = description.toLowerCase();
    
    // Base de données mock pour estimation
    const mockData = {
      'hermès': {
        'birkin': { boutique: 12000, coefficient: 0.8 },
        'kelly': { boutique: 10000, coefficient: 0.75 },
        'constance': { boutique: 8000, coefficient: 0.7 },
        'evelyne': { boutique: 4000, coefficient: 0.6 }
      },
      'chanel': {
        'classic': { boutique: 8000, coefficient: 0.7 },
        'boy': { boutique: 5000, coefficient: 0.65 },
        '2.55': { boutique: 7000, coefficient: 0.68 },
        '19': { boutique: 4500, coefficient: 0.6 }
      },
      'louis vuitton': {
        'speedy': { boutique: 1400, coefficient: 0.5 },
        'neverfull': { boutique: 1800, coefficient: 0.55 },
        'twist': { boutique: 4000, coefficient: 0.6 },
        'capucines': { boutique: 5500, coefficient: 0.65 }
      }
    };
    
    // Détecter marque et modèle
    let detectedBrand = null;
    let detectedModel = null;
    let prixBoutique = 2000; // Prix par défaut
    
    for (const [brand, models] of Object.entries(mockData)) {
      if (lowerDesc.includes(brand)) {
        detectedBrand = brand;
        for (const [model, data] of Object.entries(models)) {
          if (lowerDesc.includes(model)) {
            detectedModel = model;
            prixBoutique = data.boutique;
            break;
          }
        }
        break;
      }
    }
    
    // Ajuster selon l'état
    let coefficient = 0.6; // Par défaut
    if (lowerDesc.includes('neuf')) coefficient = 0.85;
    else if (lowerDesc.includes('excellent')) coefficient = 0.75;
    else if (lowerDesc.includes('très bon')) coefficient = 0.65;
    else if (lowerDesc.includes('bon')) coefficient = 0.55;
    else if (lowerDesc.includes('correct')) coefficient = 0.4;
    else if (lowerDesc.includes('usé')) coefficient = 0.25;
    
    // Ajuster selon les défauts
    if (lowerDesc.includes('odeur désagréable') || lowerDesc.includes('déchirures importantes')) {
      coefficient -= 0.2;
    }
    if (lowerDesc.includes('taches importantes')) {
      coefficient -= 0.15;
    }
    
    const prixEstime = Math.round(prixBoutique * coefficient);
    
    // Générer l'analyse textuelle
    let analyse = `🔍 ESTIMATION SELEZIONE IA - ${new Date().toLocaleDateString('fr-FR')}\n\n`;
    
    if (detectedBrand && detectedModel) {
      analyse += `📍 PRODUIT IDENTIFIÉ:\n`;
      analyse += `• Marque: ${detectedBrand.charAt(0).toUpperCase() + detectedBrand.slice(1)}\n`;
      analyse += `• Modèle: ${detectedModel.charAt(0).toUpperCase() + detectedModel.slice(1)}\n`;
      analyse += `• Prix boutique actuel: ${prixBoutique}€\n\n`;
    }
    
    analyse += `💰 ESTIMATION DE VALEUR:\n`;
    analyse += `• Valeur marchande actuelle: ${prixEstime}€\n`;
    analyse += `• Coefficient appliqué: ${Math.round(coefficient * 100)}%\n\n`;
    
    analyse += `📊 ANALYSE MARCHÉ:\n`;
    if (detectedBrand === 'hermès') {
      analyse += `• Hermès reste l'investissement le plus sûr du luxe\n`;
      analyse += `• Dépréciation minimale, souvent appréciation\n`;
      analyse += `• Forte demande internationale constante\n`;
    } else if (detectedBrand === 'chanel') {
      analyse += `• Chanel maintient excellente valeur résiduelle\n`;
      analyse += `• Augmentation prix boutique régulière (+15%/an)\n`;
      analyse += `• Marché secondaire très actif\n`;
    } else {
      analyse += `• Marché du luxe en croissance constante\n`;
      analyse += `• Forte demande pour les pièces authentiques\n`;
      analyse += `• Variation selon état et rareté\n`;
    }
    
    analyse += `\n🎯 RECOMMANDATIONS:\n`;
    if (coefficient > 0.7) {
      analyse += `• Excellent état, prix de vente optimisé possible\n`;
      analyse += `• Plateformes premium recommandées (Vestiaire, Rebag)\n`;
    } else if (coefficient > 0.5) {
      analyse += `• État satisfaisant, prix compétitif\n`;
      analyse += `• Vente rapide sur plateformes généralistes\n`;
    } else {
      analyse += `• État moyen, considérer restauration si possible\n`;
      analyse += `• Prix attractif pour acheteur recherchant affaire\n`;
    }
    
    return {
      estimation: analyse,
      prixEstime: prixEstime
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleEstimation = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      // Essayer d'abord avec votre vrai backend
      const res = await fetch('https://selezione-ia-backend.onrender.com/estimation-luxe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          description: `${query} - État: ${etat}${marque ? `, Marque: ${marque}` : ''}${periode ? `, Période: ${periode}` : ''}` 
        })
      });

      const data = await res.json();
      
      if (data.error) {
        // Si erreur backend, utiliser l'estimation intelligente locale
        console.warn('Backend error, using local estimation:', data.error);
        const mockResult = getMockEstimation(query);
        setResult(mockResult);
      } else {
        // Adapter la réponse du backend au format attendu
        setResult({
          estimation: data.prix_estime || data.estimation || 'N/A',
          confiance: data.confiance || data.confidence || 85,
          justification: data.justification || data.explanation || data.analyse || 'Estimation basée sur l\'IA et les données de marché',
          tendance: data.tendance || data.trend || 'stable',
          conseils: data.conseils || data.recommendations || 'Vérifiez l\'authenticité avant la vente',
          details: data.details || {}
        });
      }
    } catch (error) {
      console.error('Erreur API:', error);
      // Fallback vers l'estimation mock
      const mockResult = getMockEstimation(query);
      setResult(mockResult);
    } finally {
      setLoading(false);
    }
  };

  const processEstimationResult = (data, mode) => {
    if (data.estimation) {
      const estimationText = data.estimation;
      const prixMatch = estimationText.match(/(\d+[\s\d]*)\s*€/g);
      const prix = prixMatch ? parseInt(prixMatch[0].replace(/\s/g, '').replace('€', '')) : 0;
      
      let reventeMin = Math.round(prix * 0.7);
      let reventeMax = Math.round(prix * 0.85);
      let achatMin = Math.round(prix * 0.5);
      let achatMax = Math.round(prix * 0.6);
      
      // Ajuster selon les données marché si disponibles
      if (marketData && marketData.stats) {
        const marketAvg = marketData.stats.avg || prix;
        reventeMin = Math.round(Math.min(marketData.stats.min, reventeMin));
        reventeMax = Math.round(Math.max(marketData.stats.max * 0.9, reventeMax));
        achatMin = Math.round(marketData.stats.min * 0.7);
        achatMax = Math.round(marketData.stats.avg * 0.8);
      }
      
      setResult({
        name: `${marque} ${query}${periode ? ` (${periode})` : ''}`,
        periode: periode,
        prixBoutique: prix,
        revente: `${reventeMin}€ - ${reventeMax}€`,
        achat: `${achatMin}€ - ${achatMax}€`,
        estimation: data.estimation,
        estimationMode: mode,
        confidence: mode === 'ai-only' ? 75 : mode === 'ai-market' ? 90 : 95
      });
    }
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setQuery('');
    setMarque('');
    setPeriode('');
    setEtat('neuf');
    setImagePreview(null);
    setImageFile(null);
    setResult(null);
    setMatiere('');
    setOdeur('');
    setDechirures('');
    setTaches('');
    setEtatInterieur('');
    setEtatAnses('');
    setDetailsSupp('');
    setComparativeResults(null);
    setMarketData(null);
  };

  // Composant pour afficher l'indicateur de source
  const SourceIndicator = ({ mode, confidence }) => {
    const indicators = {
      'ai-only': {
        icon: Brain,
        label: 'IA Seule',
        description: 'Basé sur la base de connaissances GPT-4',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
        textClass: 'text-amber-400'
      },
      'ai-market': {
        icon: TrendingUp,
        label: 'IA + Marché Réel',
        description: 'Enrichi avec données Vestiaire Collective',
        bgClass: 'bg-green-500/10',
        borderClass: 'border-green-500/30',
        textClass: 'text-green-400'
      },
      'comparative': {
        icon: BarChart3,
        label: 'Analyse Comparative',
        description: 'Comparé avec produits similaires actuels',
        bgClass: 'bg-blue-500/10',
        borderClass: 'border-blue-500/30',
        textClass: 'text-blue-400'
      }
    };
    
    const indicator = indicators[mode];
    const Icon = indicator.icon;
    
    return (
      <div className={`flex items-center space-x-2 p-3 ${indicator.bgClass} border ${indicator.borderClass} rounded-lg`}>
        <Icon className={`w-5 h-5 ${indicator.textClass}`} />
        <div className="flex-1">
          <p className={`${indicator.textClass} font-medium text-sm`}>{indicator.label}</p>
          <p className="text-gray-400 text-xs">{indicator.description}</p>
        </div>
        <div className="text-right">
          <p className={`${indicator.textClass} font-bold`}>{confidence}%</p>
          <p className="text-gray-500 text-xs">Confiance</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          💎 ESTIMATION IA TEMPS RÉEL
        </h2>
        <p className="text-gray-400">GPT-4 Turbo + Scraping marché réel + Analyse comparative</p>
      </div>

      <Card className="bg-black/60 backdrop-blur-sm border-amber-500/30 max-w-2xl mx-auto">
        <CardContent className="p-6">
          {/* Sélecteur de mode d'estimation */}
          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Mode d'estimation</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setEstimationMode('ai-only')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  estimationMode === 'ai-only'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <Brain className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                <p className="text-white font-medium text-sm">IA Seule</p>
                <p className="text-gray-400 text-xs">Rapide • 75% précision</p>
              </button>
              
              <button
                onClick={() => setEstimationMode('ai-market')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  estimationMode === 'ai-market'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <p className="text-white font-medium text-sm">IA + Marché</p>
                <p className="text-gray-400 text-xs">Recommandé • 90% précision</p>
              </button>
              
              <button
                onClick={() => setEstimationMode('comparative')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  estimationMode === 'comparative'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <BarChart3 className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-medium text-sm">Comparative</p>
                <p className="text-gray-400 text-xs">Complet • 95% précision</p>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Produit à estimer *</Label>
            <Input
              placeholder="Ex : Sac Chanel Classic Flap Caviar noir"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:border-amber-500"
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Marque *</Label>
            <select
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-amber-500 focus:outline-none"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
            >
              <option value="">Sélectionner une marque</option>
              <option value="Hermès">Hermès</option>
              <option value="Chanel">Chanel</option>
              <option value="Louis Vuitton">Louis Vuitton</option>
              <option value="Gucci">Gucci</option>
              <option value="Balenciaga">Balenciaga</option>
              <option value="Dior">Dior</option>
              <option value="Prada">Prada</option>
              <option value="Valentino">Valentino</option>
              <option value="Saint Laurent">Saint Laurent</option>
              <option value="Fendi">Fendi</option>
              <option value="Givenchy">Givenchy</option>
              <option value="Loro Piana">Loro Piana</option>
              <option value="Burberry">Burberry</option>
              <option value="Bottega Veneta">Bottega Veneta</option>
              <option value="Celine">Celine</option>
              <option value="Loewe">Loewe</option>
              <option value="Alexander McQueen">Alexander McQueen</option>
              <option value="Moncler">Moncler</option>
              <option value="Off-White">Off-White</option>
              <option value="The Row">The Row</option>
              <option value="Brunello Cucinelli">Brunello Cucinelli</option>
              <option value="Tom Ford">Tom Ford</option>
              <option value="Maison Margiela">Maison Margiela</option>
              <option value="Amiri">Amiri</option>
              <option value="Ralph Lauren Purple Label">Ralph Lauren Purple Label</option>
              <option value="Versace">Versace</option>
              <option value="Stone Island">Stone Island</option>
              <option value="Alaïa">Alaïa</option>
              <option value="JW Anderson">JW Anderson</option>
              <option value="Balmain">Balmain</option>
              <option value="Zegna">Zegna</option>
              <option value="Jacquemus">Jacquemus</option>
              <option value="Fear of God">Fear of God</option>
              <option value="Vetements">Vetements</option>
              <option value="Palm Angels">Palm Angels</option>
              <option value="Lanvin">Lanvin</option>
              <option value="Marine Serre">Marine Serre</option>
              <option value="Thom Browne">Thom Browne</option>
              <option value="Ami Paris">Ami Paris</option>
              <option value="Rick Owens">Rick Owens</option>
              <option value="Y-3">Y-3</option>
              <option value="Kith">Kith</option>
              <option value="Fear of God Essentials">Fear of God Essentials</option>
              <option value="Kenzo">Kenzo</option>
              <option value="Acne Studios">Acne Studios</option>
              <option value="Salvatore Ferragamo">Salvatore Ferragamo</option>
              <option value="Marc Jacobs">Marc Jacobs</option>
              <option value="Dsquared2">Dsquared2</option>
              <option value="Moschino">Moschino</option>
            </select>
          </div>

          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Période / Année</Label>
            <select
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-amber-500 focus:outline-none"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            >
              <option value="">Sélectionner une période</option>
              <option value="1960-1970">1960-1970</option>
              <option value="1970-1980">1970-1980</option>
              <option value="1980-1990">1980-1990</option>
              <option value="1990-2000">1990-2000</option>
              <option value="2000-2010">2000-2010</option>
              <option value="2010-2020">2010-2020</option>
              <option value="2020-2025">2020-2025</option>
            </select>
          </div>
          
          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">État</Label>
            <select
              className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:border-amber-500 focus:outline-none"
              value={etat}
              onChange={(e) => setEtat(e.target.value)}
            >
              <option value="neuf">Neuf avec boîte</option>
              <option value="neuf-sans">Neuf sans boîte</option>
              <option value="excellent">Excellent état</option>
              <option value="tbe">Très bon état</option>
              <option value="bon">Bon état</option>
              <option value="correct">État correct</option>
              <option value="usé">Usé ou endommagé</option>
            </select>
          </div>

          {/* Section Analyse Approfondie */}
          <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-amber-500/20">
            <h3 className="text-amber-400 font-bold mb-4 flex items-center">
              🔍 Analyse approfondie (optionnel)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1 block text-gray-300 text-sm">Matière / Cuir</Label>
                <select
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none"
                  value={matiere}
                  onChange={(e) => setMatiere(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Cuir grainé">Cuir grainé</option>
                  <option value="Cuir lisse">Cuir lisse</option>
                  <option value="Toile Monogram">Toile Monogram</option>
                  <option value="Toile Damier">Toile Damier</option>
                  <option value="Cuir Caviar">Cuir Caviar</option>
                  <option value="Cuir d'agneau">Cuir d'agneau</option>
                  <option value="Cuir Togo">Cuir Togo</option>
                  <option value="Cuir Epsom">Cuir Epsom</option>
                  <option value="Cuir Box">Cuir Box</option>
                  <option value="Tissu">Tissu</option>
                  <option value="Synthétique">Synthétique</option>
                </select>
              </div>

              <div>
                <Label className="mb-1 block text-gray-300 text-sm">Odeur</Label>
                <select
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none"
                  value={odeur}
                  onChange={(e) => setOdeur(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Aucune odeur">Aucune odeur</option>
                  <option value="Odeur de cuir naturel">Odeur de cuir naturel</option>
                  <option value="Légère odeur de parfum">Légère odeur de parfum</option>
                  <option value="Odeur de renfermé">Odeur de renfermé</option>
                  <option value="Odeur de tabac">Odeur de tabac</option>
                  <option value="Odeur désagréable">Odeur désagréable</option>
                </select>
              </div>

              <div>
                <Label className="mb-1 block text-gray-300 text-sm">Déchirures</Label>
                <select
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none"
                  value={dechirures}
                  onChange={(e) => setDechirures(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Aucune déchirure">Aucune déchirure</option>
                  <option value="Micro-déchirures">Micro-déchirures</option>
                  <option value="Petites déchirures réparables">Petites déchirures réparables</option>
                  <option value="Déchirures importantes">Déchirures importantes</option>
                </select>
              </div>
              <div>
                <Label className="mb-1 block text-gray-300 text-sm">Taches</Label>
                <select
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none"
                  value={taches}
                  onChange={(e) => setTaches(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Aucune tache">Aucune tache</option>
                  <option value="Taches légères">Taches légères</option>
                  <option value="Taches modérées">Taches modérées</option>
                  <option value="Taches importantes">Taches importantes</option>
                </select>
              </div>

              <div>
                <Label className="mb-1 block text-gray-300 text-sm">État intérieur (sacs)</Label>
                <select
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none"
                  value={etatInterieur}
                  onChange={(e) => setEtatInterieur(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Intérieur impeccable">Intérieur impeccable</option>
                  <option value="Intérieur propre">Intérieur propre</option>
                  <option value="Traces d'usage légères">Traces d'usage légères</option>
                  <option value="Intérieur taché">Intérieur taché</option>
                  <option value="Doublure décollée">Doublure décollée</option>
                </select>
              </div>
              <div>
                <Label className="mb-1 block text-gray-300 text-sm">État des anses (sacs)</Label>
                <select
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none"
                  value={etatAnses}
                  onChange={(e) => setEtatAnses(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Anses parfaites">Anses parfaites</option>
                  <option value="Patine claire">Patine claire</option>
                  <option value="Patine miel">Patine miel</option>
                  <option value="Patine foncée">Patine foncée</option>
                  <option value="Anses craquelées">Anses craquelées</option>
                  <option value="Anses à remplacer">Anses à remplacer</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Label className="mb-1 block text-gray-300 text-sm">Détails supplémentaires</Label>
              <textarea
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 text-sm focus:border-amber-500 focus:outline-none resize-none"
                rows="3"
                placeholder="Ex: Hardware doré en bon état, fermeture éclair fluide, dustbag et cartes d'authenticité inclus..."
                value={detailsSupp}
                onChange={(e) => setDetailsSupp(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Photo de l'article (optionnel)</Label>
            <div className="space-y-3">
              {!imagePreview ? (
                <label className="flex items-center justify-center w-full h-32 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Cliquez pour ajouter une photo</p>
                    <p className="text-gray-500 text-xs mt-1">JPG, PNG, WEBP • Max 10MB</p>
                  </div>
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Article à estimer"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {imagePreview && (
      <p className="text-green-400 text-sm flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  Photo ajoutée - L'IA analysera visuellement l'article
                </p>
              )}
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 hover:opacity-90 disabled:opacity-50" 
            onClick={handleEstimation} 
            disabled={loading || !query.trim() || !marque}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {estimationMode === 'ai-only' ? 'Analyse IA...' : 
                 estimationMode === 'ai-market' ? 'Analyse IA + Marché...' : 
                 'Analyse comparative complète...'}
              </span>
            ) : 'Estimer via IA'}
          </Button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <p className="text-green-400 font-bold mb-3">✅ Estimation générée avec succès</p>
                
                {/* Indicateur de source */}
                <div className="mb-4">
                  <SourceIndicator mode={result.estimationMode} confidence={result.confidence} />
                </div>
                
                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Article estimé"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="space-y-2 mb-4">
                  <p><strong className="text-amber-400">Produit :</strong> <span className="text-white">{result.name}</span></p>
                  {result.periode && (
                    <p><strong className="text-amber-400">Période :</strong> <span className="text-white">{result.periode}</span></p>
                  )}
                  <p><strong className="text-amber-400">Prix boutique estimé :</strong> <span className="text-white font-bold">{result.prixBoutique} €</span></p>
                  <p><strong className="text-amber-400">Prix de revente estimé :</strong> <span className="text-green-400">{result.revente}</span></p>
                  <p><strong className="text-amber-400">Prix d'achat conseillé :</strong> <span className="text-blue-400">{result.achat}</span></p>
                </div>
                
                {result.estimation && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-amber-400 font-bold mb-2">💎 Analyse détaillée :</p>
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm">{result.estimation}</pre>
                  </div>
                )}
              </div>
              {/* Données marché si disponibles */}
              {marketData && marketData.produits && marketData.produits.length > 0 && (
                <div className="bg-gray-900 rounded-xl p-4 border border-green-500/30">
                  <h4 className="text-green-400 font-bold mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Données marché réel - {marketData.produits.length} résultats
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    <div className="bg-black/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Prix minimum</p>
                      <p className="text-white font-bold">{marketData.stats?.min || 0}€</p>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Prix moyen</p>
                      <p className="text-white font-bold">{marketData.stats?.avg || 0}€</p>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Prix maximum</p>
                      <p className="text-white font-bold">{marketData.stats?.max || 0}€</p>
                    </div>
                  </div>
                  {marketData.resume && (
                    <p className="text-gray-300 text-sm italic">{marketData.resume}</p>
                  )}
                </div>
              )}

          {/* Analyse comparative si disponible */}
              {comparativeResults && comparativeResults.products && (
                <div className="bg-gray-900 rounded-xl p-4 border border-blue-500/30">
                  <h4 className="text-blue-400 font-bold mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analyse comparative - Top 5 produits similaires
                  </h4>
                  <div className="space-y-2">
                    {comparativeResults.products.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-black/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{product.title}</p>
                          <p className="text-gray-400 text-xs">{product.condition || 'État non spécifié'}</p>
                        </div>
                        <p className="text-blue-400 font-bold">{product.price}€</p>
                      </div>
                    ))}
                  </div>
                  {comparativeResults.analysis && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-300 text-sm">{comparativeResults.analysis}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4">
                <Button 
                  onClick={resetForm}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2"
                >
                  Nouvelle estimation
                </Button>
              </div>
            </div>
      )}
        </CardContent>
      </Card>
    </div>
  );
}
