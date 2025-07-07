import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ComparateurLuxe = () => {
  const [activeTab, setActiveTab] = useState('acheter');

  const MarketplaceAcheter = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Chanel Classic Flap", brand: "Chanel", price: 8500, condition: "Excellent", image: "🖤" },
          { name: "Birkin 30 Togo", brand: "Hermès", price: 15900, condition: "Neuf", image: "🤎" },
          { name: "Lady Dior Medium", brand: "Dior", price: 4800, condition: "Très bon", image: "💗" },
          { name: "Speedy 30 Damier", brand: "Louis Vuitton", price: 1200, condition: "Bon", image: "🤎" },
          { name: "YSL Envelope Medium", brand: "Saint Laurent", price: 2400, condition: "Excellent", image: "🖤" },
          { name: "Bottega Veneta Jodie", brand: "Bottega Veneta", price: 3200, condition: "Neuf", image: "💚" }
        ].map((product, idx) => (
          <div key={idx} className="bg-gray-900 rounded-xl p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
            <div className="text-4xl text-center mb-3">{product.image}</div>
            <h3 className="font-bold text-white text-sm mb-1">{product.name}</h3>
            <p className="text-green-400 font-medium text-sm mb-1">{product.brand}</p>
            <p className="text-xl font-bold text-white mb-1">{product.price.toLocaleString()}€</p>
            <p className="text-gray-400 text-xs mb-3">État: {product.condition}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:opacity-90">
                Contacter
              </button>
              <button className="px-3 py-2 border border-gray-600 rounded-xl text-gray-300 hover:border-green-500/50 text-sm">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Filtres avancés */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
        <h3 className="text-green-400 font-bold text-lg mb-4">🔍 Filtres Avancés</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm">
            <option>Toutes marques</option>
            <option>Chanel</option>
            <option>Hermès</option>
            <option>Louis Vuitton</option>
            <option>Dior</option>
          </select>
          <select className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm">
            <option>Tous états</option>
            <option>Neuf</option>
            <option>Excellent</option>
            <option>Très bon</option>
            <option>Bon</option>
          </select>
          <select className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm">
            <option>Toutes catégories</option>
            <option>Sacs à main</option>
            <option>Chaussures</option>
            <option>Accessoires</option>
            <option>Bijoux</option>
          </select>
          <input 
            type="range" 
            min="0" 
            max="50000" 
            className="bg-gray-900 rounded-xl"
            placeholder="Prix max"
          />
        </div>
      </div>
    </div>
  );

  const MarketplaceVendre = () => (
    <div className="space-y-6">
      <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30 mb-6">
        <h3 className="text-purple-400 font-bold text-lg mb-2">💼 Vendre sur SELEZIONE Marketplace</h3>
        <p className="text-gray-300 text-sm">Accès exclusif aux professionnels vérifiés du luxe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Titre de l'annonce"
          className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm"
        />
        <select className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm">
          <option>Sélectionner marque</option>
          <option>Chanel</option>
          <option>Hermès</option>
          <option>Louis Vuitton</option>
          <option>Dior</option>
          <option>Saint Laurent</option>
          <option>Bottega Veneta</option>
          <option>Gucci</option>
          <option>Prada</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm">
          <option>État de l'article</option>
          <option>Neuf avec étiquettes</option>
          <option>Neuf sans étiquettes</option>
          <option>Excellent</option>
          <option>Très bon</option>
          <option>Bon</option>
        </select>
        <input
          type="number"
          placeholder="Prix demandé (€)"
          className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-sm"
        />
        <select className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm">
          <option>Catégorie</option>
          <option>Sacs à main</option>
          <option>Chaussures</option>
          <option>Vêtements</option>
          <option>Accessoires</option>
          <option>Bijoux</option>
        </select>
      </div>

      <textarea
        placeholder="Description détaillée de l'article (matériaux, dimensions, défauts éventuels...)"
        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 h-32 text-sm"
      />

      <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400 text-lg mb-2">Ajoutez jusqu'à 10 photos</p>
        <p className="text-gray-500 text-sm mb-4">Formats acceptés: JPG, PNG (max 5MB chacune)</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-800 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700">
        <h4 className="text-white font-medium mb-3">📋 Informations d'authenticité</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Numéro de série"
            className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 text-sm"
          />
          <input
            placeholder="Année d'achat"
            className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 text-sm"
          />
          <input
            placeholder="Lieu d'achat"
            className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 text-sm"
          />
          <select className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm">
            <option>Certificat d'authenticité</option>
            <option>Oui, disponible</option>
            <option>Non, pas disponible</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center text-gray-300">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">J'accepte les conditions de vente SELEZIONE</span>
        </label>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90">
        🚀 Publier l'annonce
      </button>

      <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
        <h4 className="text-amber-400 font-medium mb-2">ℹ️ Conseils pour optimiser votre vente</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Utilisez l'estimateur IA pour fixer le prix optimal</li>
          <li>• Photos en haute résolution avec éclairage naturel</li>
          <li>• Mentionnez tous les accessoires inclus (boîte, dustbag, cartes)</li>
          <li>• Soyez transparent sur l'état et les défauts éventuels</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-green-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          🏪 MARKETPLACE SELEZIONE
        </h2>
        <p className="text-gray-400">Plateforme B2B pour professionnels du luxe</p>
      </div>

      <div className="flex space-x-4">
        {['acheter', 'vendre'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
              activeTab === tab
                ? 'bg-gradient-to-r from-green-500 to-purple-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab === 'acheter' ? '🛒 Acheter' : '💰 Vendre'}
          </button>
        ))}
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
        {activeTab === 'acheter' ? <MarketplaceAcheter /> : <MarketplaceVendre />}
      </div>
    </div>
  );
};

export default ComparateurLuxe;
