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

  const handleEstimation = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, etat, marque })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Erreur estimation IA :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto p-6">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">Estimation IA</h2>

        <div className="mb-4">
          <Label className="mb-1 block">Produit à estimer</Label>
          <Input
            placeholder="Ex : Sac Chanel Classic Flap Caviar noir"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
<div className="mb-4">
  <Label className="mb-1 block">Marque</Label>
  <select
    className="w-full p-2 rounded bg-black text-white border border-gray-600"
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
        <div className="mb-4">
          <Label className="mb-1 block">État</Label>
        <select
  className="w-full p-2 rounded bg-black border border-gray-600 text-white"
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

        <Button className="w-full" onClick={handleEstimation} disabled={loading}>
          {loading ? 'Chargement...' : 'Estimer via IA'}
        </Button>

        {result && (
          <div className="mt-6 space-y-2">
            <p><strong>Produit :</strong> {result.name}</p>
            <p><strong>Prix boutique estimé :</strong> {result.prixBoutique} €</p>
            <p><strong>Prix de revente estimé :</strong> {result.revente}</p>
            <p><strong>Prix d’achat conseillé :</strong> {result.achat}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
