import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Edit, Trash2, Phone, Mail, MapPin,
  Star, DollarSign, Package, Calendar, Filter, ExternalLink,
  CheckCircle, AlertCircle, TrendingUp, Eye, MessageCircle
} from 'lucide-react';

const CRMFournisseurs = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    specialites: [],
    statut: 'actif',
    fiabilite: 5,
    conditions_paiement: '',
    delai_livraison: '',
    prix_moyen: '',
    notes: ''
  });

  // Données fournisseurs simulées réalistes
  useEffect(() => {
    const fournisseursDemo = [
      {
        id: 1,
        nom: "Luxury Partners France",
        email: "contact@luxurypartners.fr",
        telephone: "+33 1 42 86 12 34",
        adresse: "16 rue de la Paix, 75002 Paris",
        specialites: ["Hermès", "Chanel", "Louis Vuitton"],
        statut: "actif",
        fiabilite: 9,
        conditions_paiement: "30 jours",
        delai_livraison: "2-3 jours",
        prix_moyen: "15000€",
        notes: "Excellent fournisseur, authentification garantie. Spécialiste sacs Hermès.",
        derniere_commande: "2025-01-15",
        total_commandes: 47,
        ca_annuel: "680000€",
        avatar: "🏆"
      },
      {
        id: 2,
        nom: "Milan Fashion House",
        email: "sales@milanfashion.it",
        telephone: "+39 02 7601 8899",
        adresse: "Via Montenapoleone 12, Milan",
        specialites: ["Gucci", "Prada", "Bottega Veneta"],
        statut: "actif",
        fiabilite: 8,
        conditions_paiement: "15 jours",
        delai_livraison: "5-7 jours",
        prix_moyen: "8500€",
        notes: "Très bon rapport qualité-prix. Délais parfois longs en haute saison.",
        derniere_commande: "2025-01-10",
        total_commandes: 23,
        ca_annuel: "195000€",
        avatar: "🇮🇹"
      },
      {
        id: 3,
        nom: "Swiss Premium Watches",
        email: "info@swisspremium.ch",
        telephone: "+41 22 908 7700",
        adresse: "Rue du Rhône 89, Genève",
        specialites: ["Rolex", "Patek Philippe", "Audemars Piguet"],
        statut: "actif",
        fiabilite: 10,
        conditions_paiement: "Comptant",
        delai_livraison: "1-2 jours",
        prix_moyen: "45000€",
        notes: "Fournisseur premium horlogerie. Certificats d'authenticité systématiques.",
        derniere_commande: "2025-01-12",
        total_commandes: 15,
        ca_annuel: "675000€",
        avatar: "⌚"
      },
      {
        id: 4,
        nom: "London Vintage Luxury",
        email: "vintage@londonlux.co.uk",
        telephone: "+44 20 7495 8800",
        adresse: "Bond Street 158, London W1S",
        specialites: ["Chanel Vintage", "Hermès Vintage", "Cartier"],
        statut: "en_attente",
        fiabilite: 7,
        conditions_paiement: "50% avance",
        delai_livraison: "7-10 jours",
        prix_moyen: "12000€",
        notes: "Spécialiste pièces vintage rares. Négociation possible sur gros volumes.",
        derniere_commande: "2024-12-28",
        total_commandes: 8,
        ca_annuel: "96000€",
        avatar: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
      },
      {
        id: 5,
        nom: "Tokyo Fashion Import",
        email: "business@tokyofashion.jp",
        telephone: "+81 3 5411 2200",
        adresse: "Ginza 4-6-16, Tokyo",
        specialites: ["Comme des Garçons", "Issey Miyake", "Yohji Yamamoto"],
        statut: "inactif",
        fiabilite: 6,
        conditions_paiement: "Virement bancaire",
        delai_livraison: "14-21 jours",
        prix_moyen: "3500€",
        notes: "Marques japonaises exclusives. Barrière de la langue parfois.",
        derniere_commande: "2024-11-15",
        total_commandes: 12,
        ca_annuel: "42000€",
        avatar: "🗾"
      }
    ];
    setFournisseurs(fournisseursDemo);
  }, []);

  // Filtrage
  const filteredFournisseurs = fournisseurs.filter(f => {
    const matchSearch = f.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       f.specialites.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = selectedStatus === 'all' || f.statut === selectedStatus;
    return matchSearch && matchStatus;
  });

  // Statistiques
  const stats = {
    total: fournisseurs.length,
    actifs: fournisseurs.filter(f => f.statut === 'actif').length,
    ca_total: fournisseurs.reduce((sum, f) => sum + parseInt(f.ca_annuel.replace(/[€,]/g, '')), 0),
    fiabilite_moyenne: (fournisseurs.reduce((sum, f) => sum + f.fiabilite, 0) / fournisseurs.length).toFixed(1)
  };

  // Fonctions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFournisseur) {
      // Mise à jour
      setFournisseurs(prev => prev.map(f => 
        f.id === selectedFournisseur.id 
          ? { ...f, ...formData }
          : f
      ));
    } else {
      // Nouveau fournisseur
      const newId = Math.max(...fournisseurs.map(f => f.id)) + 1;
      setFournisseurs(prev => [...prev, {
        id: newId,
        ...formData,
        avatar: '🆕',
        derniere_commande: 'Jamais',
        total_commandes: 0,
        ca_annuel: '0€'
      }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
      specialites: [],
      statut: 'actif',
      fiabilite: 5,
      conditions_paiement: '',
      delai_livraison: '',
      prix_moyen: '',
      notes: ''
    });
    setShowForm(false);
    setSelectedFournisseur(null);
  };

  const deleteFournisseur = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      setFournisseurs(prev => prev.filter(f => f.id !== id));
    }
  };

  const getStatusBadge = (statut) => {
    const styles = {
      'actif': 'bg-green-500/20 text-green-300 border-green-500/30',
      'en_attente': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'inactif': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return styles[statut] || styles.inactif;
  };

  const getFiabiliteColor = (score) => {
    if (score >= 9) return 'text-green-400';
    if (score >= 7) return 'text-yellow-400';
    if (score >= 5) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              CRM Fournisseurs Luxe
            </h1>
            <p className="text-gray-400 text-sm">
              Gestion contacts • Suivi performances • Négociation
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nouveau Fournisseur</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium text-sm">Total Fournisseurs</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-blue-400">{stats.total}</p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium text-sm">Fournisseurs Actifs</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-400">{stats.actifs}</p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium text-sm">CA Total Annuel</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400">{(stats.ca_total / 1000000).toFixed(1)}M€</p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium text-sm">Fiabilité Moyenne</span>
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-400">{stats.fiabilite_moyenne}/10</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par nom ou spécialité..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actifs</option>
              <option value="en_attente">En attente</option>
              <option value="inactif">Inactifs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des fournisseurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFournisseurs.map((fournisseur) => (
          <div key={fournisseur.id} className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all">
            
            {/* Header fournisseur */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{fournisseur.avatar}</div>
                <div>
                  <h3 className="font-bold text-white text-lg">{fournisseur.nom}</h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(fournisseur.statut)}`}>
                    {fournisseur.statut === 'actif' && 'Actif'}
                    {fournisseur.statut === 'en_attente' && 'En attente'}
                    {fournisseur.statut === 'inactif' && 'Inactif'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setSelectedFournisseur(fournisseur);
                    setFormData({...fournisseur, specialites: fournisseur.specialites || []});
                    setShowForm(true);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteFournisseur(fournisseur.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Informations contact */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${fournisseur.email}`} className="text-blue-400 hover:underline">
                  {fournisseur.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${fournisseur.telephone}`} className="text-gray-300">
                  {fournisseur.telephone}
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{fournisseur.adresse}</span>
              </div>
            </div>

            {/* Spécialités */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">Spécialités</p>
              <div className="flex flex-wrap gap-1">
                {fournisseur.specialites.map((spec, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Métriques */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400">Fiabilité</p>
                <div className="flex items-center space-x-1">
                  <span className={`font-bold ${getFiabiliteColor(fournisseur.fiabilite)}`}>
                    {fournisseur.fiabilite}/10
                  </span>
                  <Star className={`w-3 h-3 ${getFiabiliteColor(fournisseur.fiabilite)}`} />
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400">CA Annuel</p>
                <p className="text-green-400 font-bold text-sm">{fournisseur.ca_annuel}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400">Commandes</p>
                <p className="text-blue-400 font-bold text-sm">{fournisseur.total_commandes}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400">Prix moyen</p>
                <p className="text-amber-400 font-bold text-sm">{fournisseur.prix_moyen}</p>
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-1 text-xs text-gray-400 mb-4">
              <p><span className="text-white">Paiement:</span> {fournisseur.conditions_paiement}</p>
              <p><span className="text-white">Délai:</span> {fournisseur.delai_livraison}</p>
              <p><span className="text-white">Dernière commande:</span> {fournisseur.derniere_commande}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs flex items-center justify-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>Contact</span>
              </button>
              <button className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs flex items-center justify-center space-x-1">
                <Package className="w-3 h-3" />
                <span>Commander</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {selectedFournisseur ? 'Modifier le fournisseur' : 'Nouveau fournisseur'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData(prev => ({...prev, nom: e.target.value}))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData(prev => ({...prev, telephone: e.target.value}))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Statut</label>
                  <select
                    value={formData.statut}
                    onChange={(e) => setFormData(prev => ({...prev, statut: e.target.value}))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="actif">Actif</option>
                    <option value="en_attente">En attente</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Adresse</label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(e) => setFormData(prev => ({...prev, adresse: e.target.value}))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Conditions paiement</label>
                  <input
                    type="text"
                    value={formData.conditions_paiement}
                    onChange={(e) => setFormData(prev => ({...prev, conditions_paiement: e.target.value}))}
                    placeholder="ex: 30 jours"
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Délai livraison</label>
                  <input
                    type="text"
                    value={formData.delai_livraison}
                    onChange={(e) => setFormData(prev => ({...prev, delai_livraison: e.target.value}))}
                    placeholder="ex: 2-3 jours"
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Prix moyen</label>
                  <input
                    type="text"
                    value={formData.prix_moyen}
                    onChange={(e) => setFormData(prev => ({...prev, prix_moyen: e.target.value}))}
                    placeholder="ex: 15000€"
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Fiabilité (1-10)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.fiabilite}
                    onChange={(e) => setFormData(prev => ({...prev, fiabilite: parseInt(e.target.value)}))}
                    className="flex-1"
                  />
                  <span className={`font-bold ${getFiabiliteColor(formData.fiabilite)}`}>
                    {formData.fiabilite}/10
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                  rows="3"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Notes internes sur le fournisseur..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-400 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedFournisseur ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMFournisseurs;