import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

export default function OutilEstimationIA() {
  const [query, setQuery] = useState('');
  const [etat, setEtat] = useState('neuf');
  const [marque, setMarque] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'https://selezione-ia-backend.onrender.com';

  const handleEstimation = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      // Construire la description complète pour l'API
      const description = `${query} ${marque} état ${etat}`;
      
      const res = await fetch(`${API_BASE}/estimation-luxe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });
      
      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Adapter la réponse au format attendu par le composant
      if (data.estimation) {
        // Parser l'estimation pour extraire les prix
        const estimationText = data.estimation;
        const prixMatch = estimationText.match(/(\d+[\s\d]*)\s*€/g);
        const prix = prixMatch ? parseInt(prixMatch[0].replace(/\s/g, '').replace('€', '')) : 0;
        
        setResult({
          name: `${marque} ${query}`,
          prixBoutique: prix,
          revente: `${Math.round(prix * 0.7)}€ - ${Math.round(prix * 0.85)}€`,
          achat: `${Math.round(prix * 0.5)}€ - ${Math.round(prix * 0.6)}€`,
          estimation: data.estimation
        });
      }
    } catch (err) {
      console.error('Erreur estimation IA :', err);
      alert(`Erreur lors de l'estimation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-amber-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          💎 ESTIMATION IA TEMPS RÉEL
        </h2>
        <p className="text-gray-400">Powered by GPT-4 Turbo - Base de données 50M+ références</p>
      </div>

      <Card className="bg-black/60 backdrop-blur-sm border-amber-500/30 max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Produit à estimer</Label>
            <Input
              placeholder="Ex : Sac Chanel Classic Flap Caviar noir"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:border-amber-500"
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2 block text-amber-400 font-medium">Marque</Label>
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

          <Button 
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 hover:opacity-90 disabled:opacity-50" 
            onClick={handleEstimation} 
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyse IA en cours...
              </span>
            ) : 'Estimer via IA'}
          </Button>

          {result && (
            <div className="mt-6 space-y-2">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <p className="text-green-400 font-bold mb-3">✅ Estimation générée avec succès</p>
                
                <div className="space-y-2 mb-4">
                  <p><strong className="text-amber-400">Produit :</strong> <span className="text-white">{result.name}</span></p>
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
