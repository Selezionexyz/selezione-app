import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function OutilEstimationIA() {
  const [query, setQuery] = useState('');
  const [etat, setEtat] = useState('neuf');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEstimation = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/estimation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, etat })
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
          <Label className="mb-1 block">État</Label>
          <select
            className="w-full p-2 rounded bg-black border border-gray-600"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
          >
            <option value="neuf">Neuf avec boîte</option>
            <option value="tbe">Très bon état</option>
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
