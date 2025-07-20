import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Lock, Phone, MapPin, DollarSign, Star, Crown,
  Shield, Award, Calendar, Settings, Edit, Save, X, Check,
  Instagram, Facebook, Twitter, Linkedin, Globe, Camera,
  CreditCard, Gift, Target, TrendingUp, Users, Bell
} from 'lucide-react';

const ComptesMembres = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Données du membre actuel (simulation)
  const [memberData, setMemberData] = useState({
    // Infos de base
    id: 'member_001',
    nom: 'Dupont',
    prenom: 'Alexandre',
    email: 'alexandre.dupont@luxe.com',
    telephone: '+33 6 12 34 56 78',
    dateNaissance: '1985-03-15',
    
    // Adresse
    adresse: '123 Avenue des Champs-Élysées',
    ville: 'Paris',
    codePostal: '75008',
    pays: 'France',
    
    // Business
    budget: '50000',
    activite: 'Revente luxe',
    experience: 'Expert (5+ ans)',
    specialites: ['Hermès', 'Chanel', 'Louis Vuitton'],
    
    // Réseaux sociaux
    instagram: '@alexandre_luxe',
    facebook: '',
    twitter: '',
    linkedin: 'alexandre-dupont-luxe',
    siteWeb: 'www.alexandre-luxury.com',
    
    // Abonnement
    plan: 'ULTIMATE',
    dateInscription: '2024-01-15',
    prochainePaiement: '2024-12-15',
    statutPaiement: 'Actif',
    
    // Stats
    estimationsUtilisees: 1247,
    economiesRealisees: 45600,
    margeTotal: 18.7,
    transactionsReussies: 89,
    
    // Préférences
    notifications: {
      email: true,
      sms: false,
      push: true,
      newsletter: true
    },
    
    // Avatar
    avatar: '👑',
    avatarUrl: null,
    
    // Statut
    verified: true,
    vipMember: true,
    memberSince: 2024
  });

  const [editData, setEditData] = useState({ ...memberData });

  // Plans d'abonnement
  const PLANS = {
    'STARTER': {
      nom: 'SELEZIONE STARTER',
      prix: '97€/mois',
      couleur: 'text-blue-400',
      badge: 'bg-blue-500/20 border-blue-500/30',
      features: ['100 estimations/mois', 'Agent IA Market', 'Academy (10 chapitres)', 'Support email']
    },
    'ULTIMATE': {
      nom: 'SELEZIONE ULTIMATE',
      prix: '297€/mois',
      couleur: 'text-amber-400',
      badge: 'bg-amber-500/20 border-amber-500/30',
      features: ['Estimations illimitées', 'Tous les Agents IA', 'Academy complète', 'Accès fournisseurs VIP', 'Support prioritaire']
    },
    'VIP': {
      nom: 'SELEZIONE VIP',
      prix: '2997€ unique',
      couleur: 'text-purple-400',
      badge: 'bg-purple-500/20 border-purple-500/30',
      features: ['Tout ULTIMATE à vie', 'Coaching 1-to-1', 'Fournisseurs directs', 'Groupe VIP exclusif']
    }
  };

  // Niveaux d'expérience
  const EXPERIENCE_LEVELS = [
    'Débutant (0-1 an)',
    'Intermédiaire (1-3 ans)', 
    'Avancé (3-5 ans)',
    'Expert (5+ ans)',
    'Master (10+ ans)'
  ];

  // Spécialités disponibles
  const SPECIALITES = [
    'Hermès', 'Chanel', 'Louis Vuitton', 'Gucci', 'Prada', 'Dior',
    'Bottega Veneta', 'Saint Laurent', 'Fendi', 'Cartier', 'Rolex',
    'Patek Philippe', 'Audemars Piguet', 'Van Cleef & Arpels'
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...memberData });
  };

  const handleSave = () => {
    setMemberData({ ...editData });
    setIsEditing(false);
    alert('✅ Profil mis à jour avec succès !');
  };

  const handleCancel = () => {
    setEditData({ ...memberData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecialiteToggle = (specialite) => {
    const specialites = editData.specialites || [];
    if (specialites.includes(specialite)) {
      setEditData(prev => ({
        ...prev,
        specialites: specialites.filter(s => s !== specialite)
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        specialites: [...specialites, specialite]
      }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateMembershipDuration = () => {
    const inscriptionDate = new Date(memberData.dateInscription);
    const now = new Date();
    const diffTime = Math.abs(now - inscriptionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl">
                {memberData.avatar}
              </div>
              {memberData.verified && (
                <Shield className="w-5 h-5 text-blue-400 absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-0.5" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                {memberData.prenom} {memberData.nom}
              </h1>
              <p className="text-gray-400 text-base flex items-center space-x-2">
                <span>{PLANS[memberData.plan]?.nom}</span>
                {memberData.vipMember && <Crown className="w-4 h-4 text-amber-400" />}
                {memberData.verified && <Shield className="w-4 h-4 text-blue-400" />}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`${PLANS[memberData.plan]?.couleur} font-bold text-xl`}>
              {memberData.plan}
            </div>
            <div className="text-gray-400 text-sm">
              Membre depuis {calculateMembershipDuration()} jours
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="flex overflow-x-auto">
          {[
            { id: 'profile', label: '👤 Profil', icon: User },
            { id: 'subscription', label: '💎 Abonnement', icon: Crown },
            { id: 'stats', label: '📊 Statistiques', icon: TrendingUp },
            { id: 'settings', label: '⚙️ Paramètres', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Onglet Profil */}
          {activeTab === 'profile' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <User className="w-6 h-6 mr-3 text-purple-400" />
                  Informations Personnelles
                </h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Sauvegarder</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Annuler</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations de base */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      value={isEditing ? editData.prenom : memberData.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      value={isEditing ? editData.nom : memberData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={isEditing ? editData.email : memberData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={isEditing ? editData.telephone : memberData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Business & Préférences */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Budget mensuel</label>
                    <input
                      type="text"
                      value={isEditing ? editData.budget : memberData.budget + '€'}
                      onChange={(e) => handleInputChange('budget', e.target.value.replace('€', ''))}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Activité</label>
                    <input
                      type="text"
                      value={isEditing ? editData.activite : memberData.activite}
                      onChange={(e) => handleInputChange('activite', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Niveau d'expérience</label>
                    <select
                      value={isEditing ? editData.experience : memberData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors disabled:opacity-50"
                    >
                      {EXPERIENCE_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Spécialités */}
                  <div>
                    <label className="block text-purple-400 font-medium mb-2">Spécialités</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {SPECIALITES.map(specialite => (
                          <label key={specialite} className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              checked={editData.specialites?.includes(specialite)}
                              onChange={() => handleSpecialiteToggle(specialite)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                            />
                            <span className="text-gray-300">{specialite}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {memberData.specialites?.map(specialite => (
                          <span key={specialite} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                            {specialite}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              {isEditing && (
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <h3 className="text-lg font-bold text-white mb-4">Réseaux Sociaux</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-purple-400 font-medium mb-2 flex items-center">
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={editData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="@votre_handle"
                        className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-purple-400 font-medium mb-2 flex items-center">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        value={editData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="votre-profil-linkedin"
                        className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-purple-400 font-medium mb-2 flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        Site Web
                      </label>
                      <input
                        type="url"
                        value={editData.siteWeb}
                        onChange={(e) => handleInputChange('siteWeb', e.target.value)}
                        placeholder="www.votre-site.com"
                        className="w-full p-3 rounded-lg bg-gray-900/50 text-white border border-gray-600/50 focus:border-purple-500/50 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Onglet Abonnement */}
          {activeTab === 'subscription' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Crown className="w-6 h-6 mr-3 text-amber-400" />
                Gestion de l'Abonnement
              </h2>

              {/* Plan actuel */}
              <div className={`${PLANS[memberData.plan]?.badge} border rounded-xl p-6 mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${PLANS[memberData.plan]?.couleur}`}>
                      {PLANS[memberData.plan]?.nom}
                    </h3>
                    <p className="text-gray-400">{PLANS[memberData.plan]?.prix}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">ACTIF</div>
                    <div className="text-gray-400 text-sm">Renouvelé le {formatDate(memberData.prochainePaiement)}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {PLANS[memberData.plan]?.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions d'abonnement */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-lg transition-opacity"
                >
                  <Crown className="w-5 h-5" />
                  <span>Upgrade Plan</span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Moyens de Paiement</span>
                </button>

                <button className="flex items-center justify-center space-x-2 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Gift className="w-5 h-5" />
                  <span>Codes Promo</span>
                </button>
              </div>
            </div>
          )}

          {/* Onglet Statistiques */}
          {activeTab === 'stats' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                Statistiques & Performance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-400 font-medium text-sm">Estimations</p>
                  <p className="text-white font-bold text-2xl">{memberData.estimationsUtilisees.toLocaleString()}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium text-sm">Économies</p>
                  <p className="text-white font-bold text-2xl">{memberData.economiesRealisees.toLocaleString()}€</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-amber-400 font-medium text-sm">Marge Moyenne</p>
                  <p className="text-white font-bold text-2xl">{memberData.margeTotal}%</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-purple-400 font-medium text-sm">Transactions</p>
                  <p className="text-white font-bold text-2xl">{memberData.transactionsReussies}</p>
                </div>
              </div>

              {/* Graphique de progression (simulé) */}
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-bold mb-4">Évolution des Économies (6 derniers mois)</h4>
                <div className="space-y-3">
                  {[
                    { mois: 'Juin', montant: 3200 },
                    { mois: 'Juillet', montant: 4800 },
                    { mois: 'Août', montant: 6100 },
                    { mois: 'Sept', montant: 7900 },
                    { mois: 'Oct', montant: 9600 },
                    { mois: 'Nov', montant: 13500 }
                  ].map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm w-16">{data.mois}</span>
                      <div className="flex-1 mx-4 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(data.montant / 15000) * 100}%` }}
                        />
                      </div>
                      <span className="text-green-400 font-bold w-20 text-right">{data.montant}€</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Onglet Paramètres */}
          {activeTab === 'settings' && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-gray-400" />
                Paramètres & Préférences
              </h2>

              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                
                {[
                  { key: 'email', label: 'Notifications par email', icon: Mail },
                  { key: 'sms', label: 'SMS pour alertes importantes', icon: Phone },
                  { key: 'push', label: 'Notifications push', icon: Bell },
                  { key: 'newsletter', label: 'Newsletter hebdomadaire', icon: Mail }
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <notif.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-white">{notif.label}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={memberData.notifications[notif.key]}
                        onChange={(e) => {
                          setMemberData(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [notif.key]: e.target.checked
                            }
                          }));
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              {/* Sécurité */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-bold text-white">Sécurité</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Lock className="w-5 h-5" />
                    <span>Changer le mot de passe</span>
                  </button>

                  <button className="flex items-center justify-center space-x-2 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Shield className="w-5 h-5" />
                    <span>Authentification 2FA</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar droite - Informations rapides */}
        <div className="space-y-6">
          {/* Badge de statut */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Statut du Compte</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Statut</span>
                <span className="text-green-400 font-bold">ACTIF</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Vérification</span>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400">Vérifié</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Membre VIP</span>
                <div className="flex items-center space-x-1">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400">Oui</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Inscription</span>
                <span className="text-white">{formatDate(memberData.dateInscription)}</span>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Actions Rapides</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <CreditCard className="w-4 h-4" />
                <span>Gérer Facturation</span>
              </button>

              <button className="w-full flex items-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                <span>Parrainer un Ami</span>
              </button>

              <button className="w-full flex items-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Gift className="w-4 h-4" />
                <span>Codes Promo</span>
              </button>

              <button className="w-full flex items-center space-x-2 p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                <Award className="w-4 h-4" />
                <span>Mes Récompenses</span>
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Besoin d'Aide ?</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Chat Support</span>
              </button>

              <button className="w-full flex items-center space-x-2 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
                <span>Envoyer un Email</span>
              </button>

              <button className="w-full flex items-center space-x-2 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span>Appel Téléphonique</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComptesMembres;