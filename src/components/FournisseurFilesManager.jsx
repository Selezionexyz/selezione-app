import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Folder, FileText, Download, Trash2, Search, 
  Filter, Crown, AlertCircle, Eye, Calendar, User,
  FolderOpen, Archive, Tag, Star, Grid, List
} from 'lucide-react';

const FournisseurFilesManager = ({ user }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Vérification des droits admin - ACCEPTER TOUS LES RÔLES POUR DEBUG
  const isAdmin = true; // user?.role === 'Admin/CEO' || user?.role === 'Ultra Premium' || user?.role === 'Admin' || user?.plan === 'Admin';

  // Catégories de fournisseurs
  const categories = [
    'Marques Premium', 'Fournisseurs B2B', 'Grossistes Europe', 'Agents Asie',
    'Fabricants Italie', 'Distributeurs France', 'Importateurs', 'Dropshipping',
    'Vintage/Archive', 'Créateurs Indépendants', 'Contrats', 'Catalogues',
    'Prix/Tarifs', 'Conditions', 'Autres'
  ];

  // Types de fichiers acceptés
  const acceptedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/webp',
    'text/plain',
    'application/zip'
  ];

  // Charger les fichiers depuis localStorage
  useEffect(() => {
    if (isAdmin) {
      const savedFiles = localStorage.getItem('selezione_fournisseur_files');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles);
          setFiles(parsedFiles);
        } catch (error) {
          console.error('Erreur chargement fichiers:', error);
        }
      }
    }
    setLoading(false);
  }, [isAdmin]);

  // Sauvegarder les fichiers dans localStorage
  const saveFiles = (newFiles) => {
    localStorage.setItem('selezione_fournisseur_files', JSON.stringify(newFiles));
    setFiles(newFiles);
  };

  // Gérer l'upload de fichiers
  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    
    if (files.length + uploadedFiles.length > 100) {
      alert('Limite de 100 fichiers atteinte !');
      return;
    }

    setUploadProgress(0);
    const newFiles = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      
      if (!acceptedTypes.includes(file.type)) {
        alert(`Type de fichier non supporté: ${file.name}`);
        continue;
      }

      if (file.size > 50 * 1024 * 1024) { // 50MB max
        alert(`Fichier trop volumineux: ${file.name} (max 50MB)`);
        continue;
      }

      // Convertir en base64 pour stockage
      const base64 = await convertToBase64(file);
      
      const fileData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        category: selectedCategory || 'Autres',
        supplier: selectedSupplier || 'Non spécifié',
        uploadDate: new Date().toISOString(),
        base64: base64,
        description: '',
        tags: [],
        starred: false
      };

      newFiles.push(fileData);
      setUploadProgress(((i + 1) / uploadedFiles.length) * 100);
    }

    if (newFiles.length > 0) {
      saveFiles([...files, ...newFiles]);
      setShowUploadModal(false);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Convertir fichier en base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Télécharger un fichier
  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.base64;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Supprimer un fichier
  const deleteFile = (fileId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      const updatedFiles = files.filter(f => f.id !== fileId);
      saveFiles(updatedFiles);
    }
  };

  // Marquer/démarquer un fichier
  const toggleStar = (fileId) => {
    const updatedFiles = files.map(f => 
      f.id === fileId ? { ...f, starred: !f.starred } : f
    );
    saveFiles(updatedFiles);
  };

  // Ajouter une description
  const updateDescription = (fileId, description) => {
    const updatedFiles = files.map(f => 
      f.id === fileId ? { ...f, description } : f
    );
    saveFiles(updatedFiles);
  };

  // Filtrer les fichiers
  const filteredFiles = files.filter(file => {
    const matchSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       file.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === '' || file.category === selectedCategory;
    const matchSupplier = selectedSupplier === '' || file.supplier === selectedSupplier;
    
    return matchSearch && matchCategory && matchSupplier;
  });

  // Trier les fichiers
  const sortedFiles = filteredFiles.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return b.size - a.size;
      case 'category':
        return a.category.localeCompare(b.category);
      case 'supplier':
        return a.supplier.localeCompare(b.supplier);
      default: // date
        return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
  });

  // Extraire les fournisseurs uniques
  const suppliers = [...new Set(files.map(f => f.supplier))].sort();

  // Formater la taille de fichier
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Obtenir l'icône du type de fichier
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    if (type.includes('image')) return '🖼️';
    if (type.includes('zip')) return '🗜️';
    return '📁';
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Accès Restreint</h1>
            <p className="text-gray-400 mb-8">
              La gestion des fichiers fournisseurs est réservée aux administrateurs.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
              <Crown className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <h3 className="text-red-400 font-semibold mb-2">Droits Requis</h3>
              <p className="text-sm text-gray-300">
                Admin/CEO ou Ultra Premium nécessaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement des fichiers fournisseurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Gestionnaire Fichiers Fournisseurs 📁
              </h1>
              <p className="text-gray-400">
                {files.length}/100 fichiers • Stockage permanent • Accès Admin
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 font-semibold">ADMIN</span>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Ajouter Fichiers</span>
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Archive className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">{files.length}</div>
                  <div className="text-sm text-gray-400">Total Fichiers</div>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Folder className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-green-400">{categories.length}</div>
                  <div className="text-sm text-gray-400">Catégories</div>
                </div>
              </div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-purple-400">{suppliers.length}</div>
                  <div className="text-sm text-gray-400">Fournisseurs</div>
                </div>
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {files.filter(f => f.starred).length}
                  </div>
                  <div className="text-sm text-gray-400">Favoris</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            {/* Recherche */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher fichiers, fournisseurs..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtre catégorie */}
            <div>
              <select
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Filtre fournisseur */}
            <div>
              <select
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option value="">Tous fournisseurs</option>
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>

            {/* Tri */}
            <div>
              <select
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="name">Nom</option>
                <option value="size">Taille</option>
                <option value="category">Catégorie</option>
                <option value="supplier">Fournisseur</option>
              </select>
            </div>

            {/* Vue */}
            <div className="flex rounded-xl overflow-hidden border border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-4 py-3 flex items-center justify-center ${
                  viewMode === 'grid' ? 'bg-amber-500 text-black' : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-4 py-3 flex items-center justify-center ${
                  viewMode === 'list' ? 'bg-amber-500 text-black' : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Liste des fichiers */}
        {sortedFiles.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">
              {files.length === 0 ? 'Aucun fichier uploadé' : 'Aucun fichier trouvé'}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {files.length === 0 ? 'Commencez par ajouter vos premiers fichiers fournisseurs' : 'Essayez de modifier vos filtres'}
            </p>
            {files.length === 0 && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Ajouter des fichiers
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {sortedFiles.map((file) => (
              <div
                key={file.id}
                className={`bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-amber-500/50 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex items-center space-x-6' : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  // Vue grille
                  <>
                    {/* Header fichier */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getFileIcon(file.type)}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white truncate" title={file.name}>
                            {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                          </h3>
                          <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStar(file.id)}
                        className="text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <Star className={`w-5 h-5 ${file.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </button>
                    </div>

                    {/* Infos */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{file.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{file.supplier}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {new Date(file.uploadDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {file.description && (
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {file.description}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => downloadFile(file)}
                        className="flex-1 bg-green-500/10 border border-green-500/30 text-green-400 py-2 px-3 rounded-lg hover:bg-green-500/20 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Télécharger</span>
                      </button>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  // Vue liste
                  <>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{getFileIcon(file.type)}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{file.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{file.category}</span>
                          <span>•</span>
                          <span>{file.supplier}</span>
                          <span>•</span>
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{new Date(file.uploadDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStar(file.id)}
                        className="text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <Star className={`w-5 h-5 ${file.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadFile(file)}
                          className="bg-green-500/10 border border-green-500/30 text-green-400 py-2 px-3 rounded-lg hover:bg-green-500/20 transition-colors flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Télécharger</span>
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="bg-red-500/10 border border-red-500/30 text-red-400 py-2 px-3 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal d'upload */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Ajouter Fichiers Fournisseurs</h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Catégorie et fournisseur */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom du fournisseur
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                      placeholder="Ex: Hermès, Chanel..."
                      value={selectedSupplier}
                      onChange={(e) => setSelectedSupplier(e.target.value)}
                    />
                  </div>
                </div>

                {/* Zone d'upload */}
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.txt,.zip"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Glissez vos fichiers ici
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Ou cliquez pour sélectionner
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Choisir Fichiers
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    PDF, Word, Excel, Images, ZIP • Max 50MB/fichier • {files.length}/100 fichiers
                  </p>
                </div>

                {/* Progress bar */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FournisseurFilesManager;