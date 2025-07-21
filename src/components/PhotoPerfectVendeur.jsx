import React, { useState, useRef, useCallback } from 'react';
import { 
  Camera, Upload, Eye, Zap, Star, AlertCircle, CheckCircle,
  TrendingUp, Award, Target, Sparkles, RefreshCw, Download,
  Image, Sun, Moon, Aperture, Focus, Palette, Layout,
  ArrowUp, ArrowDown, RotateCw, Crop, Filter,
  ThumbsUp, ThumbsDown, Lightbulb, Play, Pause
} from 'lucide-react';

const PhotoPerfectVendeur = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('sacs');
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef(null);

  // CATÉGORIES DE PRODUITS AVEC TEMPLATES
  const PRODUCT_CATEGORIES = {
    sacs: {
      name: '👜 Sacs à Main',
      templates: [
        {
          id: 'sac_frontal',
          name: 'Vue Frontale Classique',
          description: 'Face complète, fond neutre, éclairage uniforme',
          score_boost: '+25%',
          example: 'https://images.unsplash.com/photo-1590874315438-1c7fb7be95b1?w=300&h=300&fit=crop'
        },
        {
          id: 'sac_details',
          name: 'Détails Premium',
          description: 'Gros plan sur logo, coutures, fermoirs',
          score_boost: '+35%',
          example: 'https://images.unsplash.com/photo-1591348811706-e81ca6f8e9c2?w=300&h=300&fit=crop'
        },
        {
          id: 'sac_lifestyle',
          name: 'Lifestyle Élégant',
          description: 'Porté naturel, ambiance luxe, éclairage doux',
          score_boost: '+45%',
          example: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop'
        }
      ],
      specific_tips: [
        '✨ Utilisez un fond blanc ou crème pour faire ressortir la couleur',
        '📐 Placez le sac bien centré, anses droites',
        '💡 Éclairage à 45° pour éviter les reflets sur le cuir',
        '🔍 Photo détail obligatoire du logo/serial number',
        '📏 Vue de profil pour montrer la forme et l\'épaisseur'
      ]
    },
    chaussures: {
      name: '👠 Chaussures',
      templates: [
        {
          id: 'shoes_pair',
          name: 'Paire Parfaite',
          description: 'Deux chaussures alignées, semelles visibles',
          score_boost: '+30%',
          example: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop'
        },
        {
          id: 'shoes_profile',
          name: 'Profil Élégant',
          description: 'Vue de côté, forme de la chaussure visible',
          score_boost: '+25%',
          example: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop'
        }
      ],
      specific_tips: [
        '🧹 Nettoyez les semelles avant la photo',
        '📐 Angle 3/4 pour montrer forme et hauteur',
        '💡 Éclairage latéral pour les textures',
        '🔍 Photo de la marque/taille à l\'intérieur'
      ]
    },
    vetements: {
      name: '👗 Vêtements',
      templates: [
        {
          id: 'flat_lay',
          name: 'Flat Lay Professionnel',
          description: 'À plat, bien étalé, forme naturelle',
          score_boost: '+20%',
          example: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop'
        },
        {
          id: 'mannequin_pro',
          name: 'Mannequin Studio',
          description: 'Sur buste, mise en forme parfaite',
          score_boost: '+40%',
          example: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop'
        }
      ],
      specific_tips: [
        '👗 Repassez ou défroissez avant la photo',
        '📐 Flat lay : étalez naturellement les manches',
        '💡 Éclairage doux pour les textures délicates',
        '🏷️ Photo de l\'étiquette composition/taille'
      ]
    },
    montres: {
      name: '⌚ Montres',
      templates: [
        {
          id: 'watch_wrist',
          name: 'Au Poignet Luxe',
          description: 'Portée naturellement, cadran visible',
          score_boost: '+50%',
          example: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop'
        },
        {
          id: 'watch_macro',
          name: 'Macro Détaillé',
          description: 'Gros plan cadran, reflets maîtrisés',
          score_boost: '+35%',
          example: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
        }
      ],
      specific_tips: [
        '✨ Nettoyez le verre et le boîtier',
        '💡 Éclairage indirect pour éviter reflets',
        '🔍 Photo du cadran + des aiguilles nettes',
        '📸 Vue de dos pour le fond/gravures'
      ]
    }
  };

  // SIMULATION IA ANALYSE PHOTO AVANCÉE
  const analyzePhoto = useCallback(async (imageData) => {
    setAnalyzing(true);
    
    // Simulation délai analyse IA
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      // Simulation analyse avancée (remplacer par vraie API Google Vision)
      const mockAnalysis = {
        global_score: Math.floor(Math.random() * 30) + 70, // 70-100
        technical_scores: {
          lighting: Math.floor(Math.random() * 25) + 75,
          composition: Math.floor(Math.random() * 30) + 70,
          sharpness: Math.floor(Math.random() * 20) + 80,
          background: Math.floor(Math.random() * 35) + 65,
          color_balance: Math.floor(Math.random() * 25) + 75
        },
        detected_objects: ['handbag', 'leather', 'logo'],
        brand_detected: Math.random() > 0.5 ? 'Hermès' : null,
        image_quality: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW',
        selling_potential: Math.floor(Math.random() * 40) + 60,
        
        // Détection automatique des problèmes
        issues_detected: [
          ...(Math.random() > 0.6 ? ['Éclairage trop sombre dans le coin inférieur gauche'] : []),
          ...(Math.random() > 0.7 ? ['Arrière-plan encombré - utiliser fond neutre'] : []),
          ...(Math.random() > 0.8 ? ['Angle légèrement incliné - redresser de 2°'] : []),
          ...(Math.random() > 0.5 ? ['Reflet sur le cuir - ajuster éclairage'] : [])
        ],
        
        // Suggestions d'amélioration
        improvements: [
          {
            type: 'LIGHTING',
            priority: 'HIGH',
            message: 'Augmenter l\'éclairage de 15% côté droit',
            impact: '+12 points'
          },
          {
            type: 'ANGLE',
            priority: 'MEDIUM', 
            message: 'Légèrement surélevé l\'angle de prise de vue',
            impact: '+8 points'
          },
          {
            type: 'BACKGROUND',
            priority: 'LOW',
            message: 'Fond plus neutre améliorerait le contraste',
            impact: '+5 points'
          }
        ],
        
        // Estimation impact ventes
        sales_impact: {
          views_increase: `+${Math.floor(Math.random() * 40) + 20}%`,
          click_rate_boost: `+${Math.floor(Math.random() * 25) + 15}%`,
          conversion_improvement: `+${Math.floor(Math.random() * 20) + 10}%`,
          price_premium: `+€${Math.floor(Math.random() * 100) + 50}`
        },
        
        // Recommandations spécifiques
        category_specific: PRODUCT_CATEGORIES[selectedCategory].specific_tips.slice(0, 3),
        
        analyzed_at: new Date().toISOString()
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Erreur analyse:', error);
    } finally {
      setAnalyzing(false);
    }
  }, [selectedCategory]);

  // GESTION UPLOAD IMAGES
  const handleImageUpload = (files) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            name: file.name,
            data: e.target.result,
            size: file.size,
            uploaded_at: new Date()
          };
          setUploadedImages(prev => [...prev, newImage]);
          
          // Auto-analyser la première image
          if (!selectedImage) {
            setSelectedImage(newImage);
            analyzePhoto(newImage.data);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // DRAG & DROP
  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // SÉLECTION IMAGE POUR ANALYSE
  const selectImageForAnalysis = (image) => {
    setSelectedImage(image);
    setAnalysis(null);
    analyzePhoto(image.data);
  };

  // COULEURS SCORES
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-yellow-400 bg-yellow-500/20';
    if (score >= 70) return 'text-orange-400 bg-orange-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'HIGH': 'text-red-400 bg-red-500/20',
      'MEDIUM': 'text-yellow-400 bg-yellow-500/20',
      'LOW': 'text-green-400 bg-green-500/20'
    };
    return colors[priority] || 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      
      {/* HEADER */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Photo Perfect Vendeur
              </h1>
              <p className="text-gray-400">IA Vision + Analyse Qualité + Templates Pro</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Layout className="w-4 h-4" />
              <span>Templates</span>
            </button>
          </div>
        </div>

        {/* SÉLECTEUR CATÉGORIE */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie de produit</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
          >
            {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
              <option key={key} value={key}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TEMPLATES SECTION */}
      {showTemplates && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
            <Sparkles className="w-6 h-6 mr-2" />
            Templates {PRODUCT_CATEGORIES[selectedCategory].name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {PRODUCT_CATEGORIES[selectedCategory].templates.map((template) => (
              <div key={template.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <img 
                  src={template.example}
                  alt={template.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                    {template.score_boost} ventes
                  </span>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                    Utiliser
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CONSEILS SPÉCIFIQUES */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <h4 className="text-white font-bold mb-3">💡 Conseils Spécifiques {PRODUCT_CATEGORIES[selectedCategory].name}</h4>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES[selectedCategory].specific_tips.map((tip, index) => (
                <li key={index} className="text-gray-300 text-sm">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ZONE UPLOAD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* UPLOAD SECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Upload className="w-6 h-6 mr-2 text-green-400" />
            Upload & Analyse
          </h2>
          
          {/* DROP ZONE */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-600 hover:border-green-500 rounded-xl p-8 text-center cursor-pointer transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg font-medium mb-2">
              Glissez vos photos ici ou cliquez pour sélectionner
            </p>
            <p className="text-gray-500 text-sm">
              JPG, PNG jusqu'à 10MB • Analyse IA instantanée
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
          />

          {/* IMAGES UPLOADÉES */}
          {uploadedImages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white">Photos uploadées ({uploadedImages.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => selectImageForAnalysis(image)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage?.id === image.id ? 'border-green-500' : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image.data}
                      alt={image.name}
                      className="w-full h-24 object-cover"
                    />
                    {selectedImage?.id === image.id && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1">
                      <p className="text-xs text-white truncate">{image.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ANALYSE RÉSULTATS */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Eye className="w-6 h-6 mr-2 text-blue-400" />
            Analyse IA Vision
          </h2>
          
          {analyzing && (
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Analyse IA en cours...</p>
              <p className="text-gray-500 text-sm mt-1">Vision AI • Qualité • Optimisation</p>
            </div>
          )}
          
          {analysis && selectedImage && (
            <div className="space-y-4">
              
              {/* IMAGE ANALYSÉE */}
              <div className="bg-gray-800/50 rounded-xl p-4">
                <img
                  src={selectedImage.data}
                  alt="Image analysée"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-white font-medium">{selectedImage.name}</h3>
              </div>

              {/* SCORE GLOBAL */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-2xl font-bold ${getScoreColor(analysis.global_score)}`}>
                    {analysis.global_score}/100
                  </div>
                  <p className="text-gray-300 mt-2">Score Photo Global</p>
                </div>
                
                {/* SCORES DÉTAILLÉS */}
                <div className="space-y-3">
                  {Object.entries(analysis.technical_scores).map(([key, score]) => {
                    const labels = {
                      lighting: '💡 Éclairage',
                      composition: '📐 Composition', 
                      sharpness: '🔍 Netteté',
                      background: '🖼️ Arrière-plan',
                      color_balance: '🎨 Couleurs'
                    };
                    
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-gray-300">{labels[key]}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                            {score}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PROBLÈMES DÉTECTÉS */}
              {analysis.issues_detected.length > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <h4 className="text-orange-400 font-bold mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Problèmes Détectés
                  </h4>
                  <ul className="space-y-2">
                    {analysis.issues_detected.map((issue, index) => (
                      <li key={index} className="text-orange-300 text-sm flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SUGGESTIONS D'AMÉLIORATION */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-blue-400 font-bold mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Suggestions d'Amélioration
                </h4>
                <div className="space-y-3">
                  {analysis.improvements.map((improvement, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(improvement.priority)}`}>
                          {improvement.priority}
                        </span>
                        <span className="text-green-400 font-medium text-sm">
                          {improvement.impact}
                        </span>
                      </div>
                      <p className="text-white text-sm">{improvement.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* IMPACT VENTES */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="text-green-400 font-bold mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Impact Prédictif Ventes
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-green-400 font-bold text-lg">{analysis.sales_impact.views_increase}</div>
                    <div className="text-gray-400 text-sm">Vues supplémentaires</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold text-lg">{analysis.sales_impact.click_rate_boost}</div>
                    <div className="text-gray-400 text-sm">Taux de clic</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-lg">{analysis.sales_impact.conversion_improvement}</div>
                    <div className="text-gray-400 text-sm">Conversion</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold text-lg">{analysis.sales_impact.price_premium}</div>
                    <div className="text-gray-400 text-sm">Premium prix</div>
                  </div>
                </div>
              </div>

              {/* ACTIONS RECOMMANDÉES */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <h4 className="text-purple-400 font-bold mb-3">🎯 Actions Recommandées</h4>
                <div className="space-y-2">
                  {analysis.category_specific.map((tip, index) => (
                    <div key={index} className="text-purple-300 text-sm">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!selectedImage && !analyzing && (
            <div className="bg-gray-800/50 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">Uploadez une photo pour commencer l'analyse</p>
              <p className="text-gray-500 text-sm mt-1">IA Vision analysera instantanément la qualité</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-6 border-t border-gray-700">
        <div className="flex items-center justify-center space-x-6 mb-2">
          <div className="text-green-400">🤖 IA Vision Active</div>
          <div className="text-blue-400">📊 Analyse Temps Réel</div>
          <div className="text-purple-400">📈 Prédictions Ventes</div>
        </div>
        <p className="text-gray-400 text-sm">
          Powered by Computer Vision AI • {uploadedImages.length} photos analysées
        </p>
      </div>
    </div>
  );
};

export default PhotoPerfectVendeur;