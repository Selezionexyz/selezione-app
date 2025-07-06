import { useState } from 'react';
import { getActusLuxe } from '../services/api';

const Dashboard = () => {
  const [sujet, setSujet] = useState('');
  const [type, setType] = useState('tendance');
  const [resultat, setResultat] = useState('');
  const [loading, setLoading] = useState(false);

  const lancerIA = async () => {
    if (!sujet) return;
    setLoading(true);
    try {
      const data = await getActusLuxe(sujet, type);
      setResultat(data.contenu);
    } catch (err) {
      setResultat("❌ Erreur IA : Veuillez réessayer.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-yellow-400">📰 Actu Luxe IA</h1>

      <input
        type="text"
        placeholder="Ex : Chanel, maroquinerie, tendance..."
        className="w-full px-4 py-2 text-black rounded"
        value={sujet}
        onChange={(e) => setSujet(e.target.value)}
      />

      <select
        className="w-full px-4 py-2 text-black rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="tendance">Tendance</option>
        <option value="anecdote">Anecdote</option>
        <option value="default">Actu</option>
      </select>

      <button
        onClick={lancerIA}
        className="bg-yellow-400 text-black w-full py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Générer'}
      </button>

      {resultat && (
        <div className="bg-white text-black p-4 rounded whitespace-pre-wrap mt-4">
          {resultat}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
