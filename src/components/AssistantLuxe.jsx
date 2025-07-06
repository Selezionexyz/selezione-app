import React, { useState } from 'react';
import axios from 'axios';

const AssistantLuxe = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [mode, setMode] = useState('default');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://selezione-ia-backend.onrender.com/assistant-luxe', {
        message: input,
        mode,
      });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("Erreur lors de la génération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Assistant Luxe IA</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Mode :</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="default">Conseiller général</option>
          <option value="marque">Spécialiste Marques</option>
          <option value="style">Conseiller Style</option>
        </select>
      </div>
      <textarea
        rows="5"
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="Pose ta question sur le luxe..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Chargement...' : 'Envoyer'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', background: '#f3f3f3', padding: '1rem' }}>
          <strong>Réponse IA :</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AssistantLuxe;
