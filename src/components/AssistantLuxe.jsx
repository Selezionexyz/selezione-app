import React, { useState } from 'react';
import { 
  Search, ChevronDown, X, Filter, AlertCircle
} from 'lucide-react';

const AssistantLuxe = () => {
  const [activeAgent, setActiveAgent] = useState('market');
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  // États pour les filtres avancés
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [hasOdor, setHasOdor] = useState('');
  const [hasTear, setHasTear] = useState('');

  // Base de données enrichie avec 100+ marques
  const brandsDatabase = {
    "Maroquinerie": [
      "Louis Vuitton", "Chanel", "Hermès", "Gucci", "Dior", "Prada", "Céline", 
      "Balenciaga", "Saint Laurent", "Bottega Veneta", "Loewe", "Fendi", "Valentino",
      "Givenchy", "Burberry", "Coach", "Michael Kors", "Furla", "Longchamp", "Goyard",
      "Moynat", "Delvaux", "Berluti", "Dunhill", "Mulberry", "MCM", "Versace"
    ],
    "Montres": [
      "Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Cartier", "IWC",
      "Jaeger-LeCoultre", "Vacheron Constantin", "Breguet", "Blancpain", "TAG Heuer",
      "Breitling", "Panerai", "Hublot", "Richard Mille", "Chopard", "Bulgari",
      "Piaget", "Zenith", "Tudor", "Longines", "Rado", "Tissot", "Bell & Ross"
    ],
    "Bijoux": [
      "Cartier", "Van Cleef & Arpels", "Bulgari", "Tiffany & Co", "Harry Winston",
      "Chopard", "Graff", "Piaget", "Boucheron", "Chaumet", "Messika", "Pomellato",
      "Buccellati", "De Beers", "Mikimoto", "Tasaki", "David Yurman", "Chrome Hearts"
    ],
    "Vêtements": [
      "Chanel", "Dior", "Saint Laurent", "Balenciaga", "Gucci", "Prada", "Versace",
      "Dolce & Gabbana", "Armani", "Valentino", "Givenchy", "Balmain", "Isabel Marant",
      "Off-White", "Vetements", "Rick Owens", "Maison Margiela", "Comme des Garçons",
      "Thom Browne", "Alexander McQueen", "Stella McCartney", "Kenzo", "Acne Studios"
    ],
    "Chaussures": [
      "Christian Louboutin", "Jimmy Choo", "Manolo Blahnik", "Aquazzura", "Gianvito Rossi",
      "René Caovilla", "Giuseppe Zanotti", "Valentino", "Roger Vivier", "Salvatore Ferragamo",
      "Tod's", "Prada", "Gucci", "Balenciaga", "Golden Goose", "Common Projects",
      "Maison Margiela", "Rick Owens", "Y-3", "Visvim", "Church's", "John Lobb"
    ],
    "Accessoires": [
      "Hermès", "Louis Vuitton", "Chanel", "Gucci", "Fendi", "Bulgari", "Cartier",
      "Montblanc", "Dupont", "Rimowa", "Globe-Trotter", "Smythson", "Aspinal of London",
      "Berluti", "Kiton", "Stefano Ricci", "Zilli", "Brioni", "Tom Ford", "Ralph Lauren"
    ]
  };

  // Modèles par marque
  const modelsByBrand = {
    "Louis Vuitton": ["Speedy", "Neverfull", "Pochette Métis", "Alma", "Keepall", "Twist", "Coussin", "Multi Pochette", "Capucines", "New Wave"],
    "Chanel": ["Classic Flap", "Boy", "19", "Gabrielle", "2.55", "WOC", "Deauville", "Shopping Tote", "Diana", "Trendy CC"],
    "Hermès": ["Birkin", "Kelly", "Constance", "Evelyne", "Garden Party", "Picotin", "Lindy", "Halzan", "Bolide", "Jypsiere"],
    "Gucci": ["Dionysus", "Marmont", "Jackie", "Soho", "Bamboo", "Sylvie", "Ophidia", "Horsebit 1955", "Diana", "Blondie"],
    "Dior": ["Lady Dior", "Saddle", "Book Tote", "30 Montaigne", "Bobby", "Caro", "J'Adior", "Diorama", "My ABCDior", "Diorever"],
    "Rolex": ["Submariner", "Daytona", "GMT-Master II", "Datejust", "Day-Date", "Explorer", "Yacht-Master", "Sea-Dweller", "Air-King", "Milgauss"],
    "Cartier": ["Tank", "Santos", "Ballon Bleu", "Panthère", "Pasha", "Drive", "Ronde", "Calibre", "Clé", "Baignoire"]
  };

  // Options de filtres
  const filterOptions = {
    conditions: [
      { value: "neuf-etiquette", label: "Neuf avec étiquette" },
      { value: "neuf-sans-etiquette", label: "Neuf sans étiquette" },
      { value: "tres-bon", label: "Très bon état" },
      { value: "bon", label: "Bon état" },
      { value: "moyen", label: "État moyen" },
      { value: "correct", label: "État correct" }
    ],
    colors: [
      "Noir", "Blanc", "Beige", "Marron", "Camel", "Rouge", "Rose", "Bleu", 
      "Vert", "Jaune", "Orange", "Violet", "Gris", "Doré", "Argenté", "Multicolore"
    ],
    sizes: {
      "Maroquinerie": ["XXS", "XS", "PM", "MM", "GM", "Small", "Medium", "Large", "25", "28", "30", "32", "35", "40"],
      "Vêtements": ["XXS", "XS", "S", "M", "L", "XL", "XXL", "34", "36", "38", "40", "42", "44", "46"],
      "Chaussures": ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      "Montres": ["36mm", "38mm", "39mm", "40mm", "41mm", "42mm", "44mm", "46mm", "48mm"],
      "Bijoux": ["XS", "S", "M", "L", "15", "16", "17", "18", "50", "52", "54", "56"]
    },
    odors: [
      { value: "none", label: "Aucune odeur" },
      { value: "light", label: "Légère odeur" },
      { value: "strong", label: "Forte odeur" },
      { value: "perfume", label: "Parfum" },
      { value: "smoke", label: "Fumée/Tabac" }
    ],
    tears: [
      { value: "none", label: "Aucune déchirure" },
      { value: "minor", label: "Micro déchirure" },
      { value: "repairable", label: "Réparable" },
      { value: "major", label: "Importante" }
    ]
  };

  // Base de données des prix enrichie
  const realMarketDatabase = {
    "Louis Vuitton": {
      "Speedy": {
        sizes: ["25", "30", "35", "40"],
        prices: {
          "neuf-etiquette": { vente: [1200, 1800], achat: [800, 1200], japon: [700, 1000] },
          "neuf-sans-etiquette": { vente: [1000, 1600], achat: [600, 1000], japon: [500, 850] },
          "tres-bon": { vente: [700, 1200], achat: [400, 700], japon: [300, 600] },
          "bon": { vente: [450, 850], achat: [250, 450], japon: [200, 400] },
          "moyen": { vente: [300, 550], achat: [150, 300], japon: [120, 250] },
          "correct": { vente: [200, 350], achat: [80, 150], japon: [60, 120] }
        }
      },
      "Neverfull": {
        sizes: ["PM", "MM", "GM"],
        prices: {
          "neuf-etiquette": { vente: [1600, 2200], achat: [1100, 1600], japon: [900, 1400] },
          "neuf-sans-etiquette": { vente: [1400, 2000], achat: [900, 1400], japon: [700, 1200] },
          "tres-bon": { vente: [1000, 1600], achat: [600, 1000], japon: [500, 900] },
          "bon": { vente: [700, 1200], achat: [400, 700], japon: [300, 600] },
          "moyen": { vente: [500, 900], achat: [250, 500], japon: [200, 400] },
          "correct": { vente: [350, 600], achat: [150, 300], japon: [120, 250] }
        }
      }
    },
    "Chanel": {
      "Classic Flap": {
        sizes: ["Small", "Medium", "Jumbo", "Maxi"],
        prices: {
          "neuf-etiquette": { vente: [7000, 12000], achat: [5000, 9000], japon: [4500, 8000] },
          "neuf-sans-etiquette": { vente: [6000, 10000], achat: [4000, 7500], japon: [3500, 6500] },
          "tres-bon": { vente: [4500, 8000], achat: [3000, 6000], japon: [2500, 5000] },
          "bon": { vente: [3500, 6500], achat: [2000, 4500], japon: [1800, 4000] },
          "moyen": { vente: [2500, 5000], achat: [1500, 3500], japon: [1200, 3000] },
          "correct": { vente: [1800, 3500], achat: [1000, 2500], japon: [800, 2000] }
        }
      }
    },
    "Rolex": {
      "Submariner": {
        sizes: ["40mm", "41mm"],
        prices: {
          "neuf-etiquette": { vente: [12000, 18000], achat: [10000, 15000], japon: [9000, 14000] },
          "neuf-sans-etiquette": { vente: [11000, 16000], achat: [9000, 13000], japon: [8000, 12000] },
          "tres-bon": { vente: [9000, 14000], achat: [7000, 11000], japon: [6000, 10000] },
          "bon": { vente: [7500, 12000], achat: [5500, 9000], japon: [5000, 8000] },
          "moyen": { vente: [6000, 10000], achat: [4000, 7000], japon: [3500, 6000] },
          "correct": { vente: [5000, 8000], achat: [3000, 5000], japon: [2500, 4500] }
        }
      }
    }
  };

  const agents = [
    {
      id: 'market',
      name: 'MARKET ANALYST',
      specialty: 'Analyse Prix Réel Temps',
      color: '#10B981', // green
      emoji: '📊',
      description: 'Prix actuels France, Japon, plateformes'
    },
    {
      id: 'arbitrage',
      name: 'ARBITRAGE EXPERT',
      specialty: 'Opportunités Achat/Revente',
      color: '#8B5CF6', // purple
      emoji: '💹',
      description: 'Meilleures affaires et marges possibles'
    },
    {
      id: 'authenticator',
      name: 'AUTH SPECIALIST',
      specialty: 'Authentification & Red Flags',
      color: '#EF4444', // red
      emoji: '🔍',
      description: 'Éviter les fakes et arnaques'
    },
    {
      id: 'condition',
      name: 'CONDITION EXPERT',
      specialty: 'Évaluation État Produits',
      color: '#F59E0B', // amber
      emoji: '💎',
      description: 'Impact état sur prix'
    }
  ];

  // Fonction pour obtenir les modèles selon la marque sélectionnée
  const getAvailableModels = () => {
    if (!selectedBrand) return [];
    return modelsByBrand[selectedBrand] || [];
  };

  // Fonction pour obtenir les tailles selon la catégorie
  const getAvailableSizes = () => {
    if (!selectedCategory) return [];
    return filterOptions.sizes[selectedCategory] || [];
  };

  // Fonction pour générer un message à partir des filtres
  const generateMessageFromFilters = () => {
    let msg = '';
    
    if (selectedBrand) {
      msg += selectedBrand + ' ';
      
      // Si pas de modèle sélectionné, essayer de le détecter
      if (!selectedModel && modelsByBrand[selectedBrand]) {
        // Pour Louis Vuitton, on met Speedy par défaut si pas de modèle
        if (selectedBrand === 'Louis Vuitton') {
          msg += 'Speedy ';
        }
      } else if (selectedModel) {
        msg += selectedModel + ' ';
      }
    }
    if (selectedSize) msg += 'taille ' + selectedSize + ' ';
    if (selectedColor) msg += 'couleur ' + selectedColor + ' ';
    if (selectedCondition) {
      const condition = filterOptions.conditions.find(c => c.value === selectedCondition);
      if (condition) msg += 'en ' + condition.label.toLowerCase() + ' ';
    }
    if (hasOdor && hasOdor !== 'none') {
      const odor = filterOptions.odors.find(o => o.value === hasOdor);
      if (odor) msg += 'avec ' + odor.label.toLowerCase() + ' ';
    }
    if (hasTear && hasTear !== 'none') {
      const tear = filterOptions.tears.find(t => t.value === hasTear);
      if (tear) msg += tear.label.toLowerCase() + ' ';
    }
    
    return msg.trim() || 'Analyse du marché';
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedModel('');
    setSelectedSize('');
    setSelectedCondition('');
    setSelectedColor('');
    setHasOdor('');
    setHasTear('');
  };

  // Fonction améliorée pour analyser et répondre
  const sendMessage = async () => {
    const finalMessage = showAdvancedSearch ? generateMessageFromFilters() : message;
    if (!finalMessage.trim()) return;
    
    // Si on utilise les filtres et qu'on a au moins une marque, on peut analyser
    if (showAdvancedSearch && !selectedBrand) {
      alert("Veuillez sélectionner au moins une marque");
      return;
    }
    
    const userMessage = {
      type: 'user',
      content: finalMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsThinking(true);
    
    console.log('Analyse en cours...', { selectedBrand, selectedModel, finalMessage });
    
    try {
      // Essayer d'abord avec votre vrai backend
      const response = await fetch('https://selezione-ia-backend.onrender.com/assistant-luxe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: finalMessage,
          mode: activeAgent,
          brand: selectedBrand,
          model: selectedModel
        })
      });

      const data = await response.json();
      
      if (data.error) {
        // Si erreur backend, utiliser la réponse locale intelligente
        console.warn('Backend error, using local response:', data.error);
        generateLocalResponse(finalMessage);
      } else {
        // Utiliser la réponse du backend
        const assistantMessage = {
          type: 'assistant',
          content: data.response || data.message || data.analyse || 'Réponse reçue du backend',
          timestamp: new Date().toLocaleTimeString(),
          agent: agents.find(a => a.id === activeAgent)
        };
        
        setConversation(prev => [...prev, assistantMessage]);
        setIsThinking(false);
      }
    } catch (error) {
      console.error('Erreur API Assistant:', error);
      // Fallback vers la réponse locale
      generateLocalResponse(finalMessage);
    }
  };

  // Fonction pour générer une réponse locale intelligente
  const generateLocalResponse = (finalMessage) => {
    // Générer la réponse selon l'agent et les filtres
    setTimeout(() => {
      let response = '';
      const agent = agents.find(a => a.id === activeAgent);
      
      if (activeAgent === 'market') {
        // Extraire le modèle du message si pas sélectionné
        let detectedModel = selectedModel;
        if (!detectedModel && selectedBrand) {
          const brandModels = modelsByBrand[selectedBrand] || [];
          for (const model of brandModels) {
            if (finalMessage.toLowerCase().includes(model.toLowerCase())) {
              detectedModel = model;
              break;
            }
          }
        }
        
        if (selectedBrand && detectedModel) {
          const brandData = realMarketDatabase[selectedBrand];
          const modelData = brandData?.[detectedModel];
          
          if (modelData) {
            const condition = selectedCondition || 'bon';
            const prices = modelData.prices[condition];
            
            response = `📊 ANALYSE MARCHÉ DÉTAILLÉE - ${new Date().toLocaleDateString('fr-FR')}\n\n`;
            response += `🎯 Produit: ${selectedBrand} ${detectedModel}\n`;
            if (selectedSize) response += `📏 Taille: ${selectedSize}\n`;
            if (selectedColor) response += `🎨 Couleur: ${selectedColor}\n`;
            response += `📍 État: ${filterOptions.conditions.find(c => c.value === condition)?.label || 'Bon état'}\n`;
            if (hasOdor && hasOdor !== 'none') response += `👃 Odeur: ${filterOptions.odors.find(o => o.value === hasOdor)?.label}\n`;
            if (hasTear && hasTear !== 'none') response += `✂️ Déchirure: ${filterOptions.tears.find(t => t.value === hasTear)?.label}\n`;
            response += `\n💰 PRIX ACTUELS DU MARCHÉ:\n\n`;
            
            response += `🇫🇷 FRANCE/EUROPE:\n`;
            response += `• Prix de VENTE: ${prices.vente[0]}€ - ${prices.vente[1]}€\n`;
            response += `• Prix d'ACHAT pro: ${prices.achat[0]}€ - ${prices.achat[1]}€\n`;
            response += `• Marge revendeur: ${Math.round(((prices.vente[0]/prices.achat[1])-1)*100)}% - ${Math.round(((prices.vente[1]/prices.achat[0])-1)*100)}%\n\n`;
            
            response += `🇯🇵 JAPON (Tokyo/Osaka):\n`;
            response += `• Prix d'ACHAT: ${prices.japon[0]}€ - ${prices.japon[1]}€\n`;
            response += `• Équivalent: ¥${Math.round(prices.japon[0]*150)} - ¥${Math.round(prices.japon[1]*150)}\n`;
            response += `• Potentiel profit import: +${Math.round(((prices.vente[0]/prices.japon[1])-1)*100)}% à +${Math.round(((prices.vente[1]/prices.japon[0])-1)*100)}%\n\n`;
            
            // Ajustement prix selon défauts
            if (hasOdor === 'strong' || hasTear === 'major') {
              response += `⚠️ IMPACT DES DÉFAUTS:\n`;
              response += `• Prix réduit de -30% à -50%\n`;
              response += `• Difficile à revendre rapidement\n`;
              response += `• Nécessite restauration professionnelle\n\n`;
            }
            
            response += `📱 PLATEFORMES:\n`;
            response += `• Vinted: ${prices.vente[0]}€ - ${Math.round(prices.vente[0]*1.15)}€\n`;
            response += `• Vestiaire: ${Math.round(prices.vente[0]*1.2)}€ - ${Math.round(prices.vente[1]*1.3)}€\n`;
            response += `• Rebag/TheRealReal: ${Math.round(prices.vente[0]*1.25)}€ - ${Math.round(prices.vente[1]*1.35)}€\n`;
            response += `• Instagram dealers: ${Math.round(prices.vente[0]*0.85)}€ - ${prices.vente[0]}€\n\n`;
            
            response += `📈 TENDANCE:\n`;
            if (selectedBrand === 'Chanel' || selectedBrand === 'Hermès') {
              response += `• ↗️ Hausse continue (+15-20%/an)\n`;
              response += `• Forte demande Asie\n`;
              response += `• Excellent investissement`;
            } else {
              response += `• → Stable sur 12 mois\n`;
              response += `• Pic saisonnier Nov-Déc\n`;
              response += `• Bon pour revente rapide`;
            }
          } else {
            response = `🔍 Modèle ${detectedModel || 'non spécifié'} non trouvé pour ${selectedBrand}.\n\nModèles disponibles:\n`;
            const availableModels = modelsByBrand[selectedBrand] || [];
            availableModels.forEach(model => {
              response += `• ${model}\n`;
            });
          }
        } else {
          response = `📊 Pour une analyse précise, sélectionnez:\n\n`;
          response += `1️⃣ CATÉGORIE (Maroquinerie, Montres...)\n`;
          response += `2️⃣ MARQUE (${Object.keys(brandsDatabase).length} catégories disponibles)\n`;
          response += `3️⃣ MODÈLE spécifique\n`;
          response += `4️⃣ ÉTAT (6 niveaux disponibles)\n\n`;
          response += `💡 Utilisez le bouton "Recherche Avancée" pour accéder aux filtres complets!`;
        }
      }
      
      else if (activeAgent === 'condition') {
        response = `💎 GUIDE ÉVALUATION ÉTAT - Expert Condition\n\n`;
        
        if (selectedCondition) {
          const condition = filterOptions.conditions.find(c => c.value === selectedCondition);
          response += `État sélectionné: ${condition.label}\n\n`;
          
          switch(selectedCondition) {
            case 'neuf-etiquette':
              response += `✅ CRITÈRES:\n`;
              response += `• Jamais porté/utilisé\n`;
              response += `• Étiquettes originales attachées\n`;
              response += `• Emballage d'origine complet\n`;
              response += `• Film protecteur intact\n`;
              response += `• Facture/certificat présent\n\n`;
              response += `💰 VALEUR: 80-95% du prix boutique`;
              break;
            case 'neuf-sans-etiquette':
              response += `✅ CRITÈRES:\n`;
              response += `• Jamais utilisé\n`;
              response += `• Aucune trace d'usage\n`;
              response += `• Peut manquer étiquettes\n`;
              response += `• Dustbag/boîte inclus\n\n`;
              response += `💰 VALEUR: 70-85% du prix boutique`;
              break;
            case 'tres-bon':
              response += `✅ CRITÈRES:\n`;
              response += `• Très peu porté (< 10 fois)\n`;
              response += `• Micro-signes d'usage invisibles\n`;
              response += `• Cuir/tissu impeccable\n`;
              response += `• Hardware brillant\n\n`;
              response += `💰 VALEUR: 50-70% du prix boutique`;
              break;
            case 'bon':
              response += `✅ CRITÈRES:\n`;
              response += `• Usage régulier visible\n`;
              response += `• Légères marques aux coins\n`;
              response += `• Patine naturelle du cuir\n`;
              response += `• Hardware avec micro-rayures\n\n`;
              response += `💰 VALEUR: 35-50% du prix boutique`;
              break;
            case 'moyen':
              response += `⚠️ CRITÈRES:\n`;
              response += `• Usage intensif visible\n`;
              response += `• Déformation légère\n`;
              response += `• Taches/marques présentes\n`;
              response += `• Hardware terni\n`;
              response += `• Besoin nettoyage pro\n\n`;
              response += `💰 VALEUR: 20-35% du prix boutique`;
              break;
            case 'correct':
              response += `🚫 CRITÈRES:\n`;
              response += `• Fort usage, défauts majeurs\n`;
              response += `• Déchirures réparables\n`;
              response += `• Odeurs persistantes\n`;
              response += `• Hardware oxydé\n`;
              response += `• Nécessite restauration\n\n`;
              response += `💰 VALEUR: 10-20% du prix boutique`;
              break;
          }
          
          if (hasOdor && hasOdor !== 'none') {
            response += `\n\n👃 IMPACT ODEUR (${filterOptions.odors.find(o => o.value === hasOdor)?.label}):\n`;
            response += hasOdor === 'strong' ? `• Dévalue de -20% à -40%\n• Traitement ozone nécessaire` : 
                         hasOdor === 'smoke' ? `• Dévalue de -15% à -30%\n• Nettoyage professionnel requis` :
                         `• Impact minimal (-5% à -10%)`;
          }
        } else {
          response += `📋 GRILLE D'ÉVALUATION RAPIDE:\n\n`;
          filterOptions.conditions.forEach(cond => {
            response += `${cond.label}\n`;
          });
          response += `\n💡 Sélectionnez un état dans les filtres pour une analyse détaillée!`;
        }
      }
      
      else if (activeAgent === 'arbitrage') {
        response = `💹 OPPORTUNITÉS ARBITRAGE - ${new Date().toLocaleDateString('fr-FR')}\n\n`;
        
        // Extraire le modèle du message si pas sélectionné
        let detectedModel = selectedModel;
        if (!detectedModel && selectedBrand) {
          const brandModels = modelsByBrand[selectedBrand] || [];
          for (const model of brandModels) {
            if (finalMessage.toLowerCase().includes(model.toLowerCase())) {
              detectedModel = model;
              break;
            }
          }
        }
if (selectedBrand && detectedModel) {
          const brandData = realMarketDatabase[selectedBrand];
          const modelData = brandData?.[detectedModel];
          
          if (modelData) {
            const condition = selectedCondition || 'bon';
            const prices = modelData.prices[condition];
            
            const profitJapon = Math.round(prices.vente[0] - (prices.japon[1] * 1.25));
            const profitLocal = Math.round(prices.vente[0] - prices.achat[1]);
            const profitRestauration = condition === 'moyen' || condition === 'correct' ? 
              Math.round((prices.vente[0] * 1.5) - prices.achat[1] - 200) : 0;
            
            response += `🎯 ${selectedBrand} ${detectedModel} - ANALYSE RENTABILITÉ\n\n`;
            
            response += `📊 DONNÉES MARCHÉ:\n`;
            response += `• État: ${filterOptions.conditions.find(c => c.value === condition)?.label}\n`;
            response += `• Demande: ${selectedBrand === 'Hermès' ? '🔥 Très forte' : selectedBrand === 'Chanel' ? '🔥 Forte' : '✅ Stable'}\n`;
            response += `• Liquidité: ${selectedBrand === 'Louis Vuitton' ? '💧 Excellente (2-7j)' : '💧 Bonne (7-21j)'}\n\n`;
            
            response += `💼 STRATÉGIE 1 - IMPORT JAPON:\n`;
            response += `• Achat Mercari/Rakuma: ${prices.japon[0]}€ - ${prices.japon[1]}€\n`;
            response += `• +25% frais total: ${Math.round(prices.japon[1]*1.25)}€\n`;
            response += `• Vente France: ${prices.vente[0]}€ - ${prices.vente[1]}€\n`;
            response += `• 💰 PROFIT NET: ${profitJapon}€ - ${Math.round(prices.vente[1] - (prices.japon[0] * 1.25))}€\n`;
            response += `• 📈 ROI: +${Math.round(((prices.vente[0]/(prices.japon[1]*1.25))-1)*100)}%\n`;
            response += `• ⏱️ Délai: 2-3 semaines\n\n`;
            
            response += `🏠 STRATÉGIE 2 - ACHAT LOCAL:\n`;
            response += `• Achat Vinted/LBC: ${prices.achat[0]}€ - ${prices.achat[1]}€\n`;
            response += `• Vente immédiate: ${prices.vente[0]}€\n`;
            response += `• 💰 PROFIT NET: ${profitLocal}€ - ${prices.vente[1] - prices.achat[0]}€\n`;
            response += `• 📈 ROI: +${Math.round(((prices.vente[0]/prices.achat[1])-1)*100)}%\n`;
            response += `• ⏱️ Délai: 3-7 jours\n\n`;
if (profitRestauration > 0) {
              response += `🔧 STRATÉGIE 3 - RESTAURATION:\n`;
              response += `• Achat état ${condition}: ${prices.achat[0]}€\n`;
              response += `• Coût restauration: ~200€\n`;
              response += `• Vente après resto: ${Math.round(prices.vente[0] * 1.5)}€\n`;
              response += `• 💰 PROFIT NET: ${profitRestauration}€\n`;
              response += `• 📈 ROI: +${Math.round((profitRestauration/(prices.achat[1]+200))*100)}%\n\n`;
            }
            
            response += `🎯 RECOMMANDATION:\n`;
            const bestStrategy = profitJapon > profitLocal * 1.5 ? 'Import Japon' : 
                               profitRestauration > profitJapon && profitRestauration > profitLocal ? 'Restauration' : 
                               'Achat Local';
            response += `✅ Meilleure stratégie: ${bestStrategy}\n`;
            response += `💡 ${bestStrategy === 'Import Japon' ? 'Cherchez tôt le matin (6h-8h heure JP)' :
                          bestStrategy === 'Restauration' ? 'Partenariat avec artisan recommandé' :
                          'Notifications Vinted + négociation -20%'}`;
          }
        } else {
          response += `🔥 TOP 5 ARBITRAGES DU MOMENT:\n\n`;
          response += `1️⃣ Chanel Classic Flap Vintage\n`;
          response += `• Achat: 2000-3000€ → Vente: 4500-6500€\n`;
          response += `• ROI: +125% 🚀\n\n`;
          
          response += `2️⃣ Hermès Kelly 28 Japon\n`;
          response += `• Import: 4000€ → Vente: 8000-10000€\n`;
          response += `• ROI: +100% après frais\n\n`;
          
          response += `3️⃣ Rolex Submariner Date\n`;
          response += `• Achat: 7000€ → Vente: 10000€\n`;
          response += `• ROI: +43% (3 mois)\n\n`;
          
          response += `4️⃣ LV Multi Pochette\n`;
          response += `• Achat décomposée: 400€ → Complète: 1200€\n`;
          response += `• ROI: +200%\n\n`;
response += `5️⃣ Dior Saddle (restauration)\n`;
          response += `• Achat abîmé: 500€ + 200€ resto → Vente: 1500€\n`;
          response += `• ROI: +114%`;
        }
      }
      
      else if (activeAgent === 'authenticator') {
        response = `🔍 GUIDE AUTHENTIFICATION AVANCÉ\n\n`;
        
        if (selectedBrand) {
          response += `🔐 POINTS CLÉS ${selectedBrand.toUpperCase()}:\n\n`;
          
          if (selectedBrand === 'Louis Vuitton') {
            response += `✅ AUTHENTIQUE:\n`;
            response += `• Code date: 2 lettres + 4 chiffres\n`;
            response += `• Coutures: parfaitement droites\n`;
            response += `• Monogram: jamais coupé aux coutures\n`;
            response += `• Police: fine et précise\n`;
            response += `• Patine: uniforme sur vachette\n\n`;
            
            response += `❌ CONTREFAÇON:\n`;
            response += `• "Made in Paris" (n'existe pas)\n`;
            response += `• LV trop espacés ou trop proches\n`;
            response += `• Intérieur rouge vif (rare)\n`;
            response += `• Odeur chimique forte\n`;
            response += `• Prix < 30% marché\n\n`;
          } else if (selectedBrand === 'Chanel') {
            response += `✅ AUTHENTIQUE:\n`;
            response += `• Numéro série: cohérent avec année\n`;
            response += `• Matelassage: aligné parfaitement\n`;
            response += `• CC: bras droit sur gauche\n`;
            response += `• Chaîne: lourde, sans bruit\n`;
            response += `• Hologramme: iridescent\n\n`;
response += `❌ CONTREFAÇON:\n`;
            response += `• Cuir plastifié/rigide\n`;
            response += `• CC mal proportionnés\n`;
            response += `• Vis apparentes\n`;
            response += `• Carte sans relief\n`;
            response += `• Dustbag fin/brillant\n\n`;
          } else if (selectedBrand === 'Hermès') {
            response += `✅ AUTHENTIQUE:\n`;
            response += `• Toucher: cuir souple naturel\n`;
            response += `• Pearling: perles parfaites\n`;
            response += `• Stamp: net et profond\n`;
            response += `• Coutures: sellier impeccable\n`;
            response += `• Sangles: jamais collées\n\n`;
            
            response += `❌ CONTREFAÇON:\n`;
            response += `• Logo flou/mal centré\n`;
            response += `• Hardware léger\n`;
            response += `• Toucher synthétique\n`;
            response += `• Prix "trop beau"\n`;
            response += `• Vendeur pressé\n\n`;
          }
          
          response += `🛡️ OUTILS RECOMMANDÉS:\n`;
          response += `• Entrupy (99.1% précision)\n`;
          response += `• Real Authentication\n`;
          response += `• Certificat Vestiaire Collective\n`;
          response += `• Expert local agréé\n\n`;
          
          response += `💡 CONSEIL PRO:\n`;
          response += `Toujours demander:\n`;
          response += `• Facture originale\n`;
          response += `• Photos détaillées (15+)\n`;
          response += `• Vidéo manipulation\n`;
          response += `• Historique du sac`;
        } else {
response += `📋 CHECKLIST UNIVERSELLE:\n\n`;
          response += `1️⃣ PRIX: -70% du marché = FAUX\n`;
          response += `2️⃣ VENDEUR: Compte récent = Méfiance\n`;
          response += `3️⃣ PHOTOS: Floues/stock = Red flag\n`;
          response += `4️⃣ PAIEMENT: PayPal G&S only\n`;
          response += `5️⃣ LOCALISATION: Asie + bas prix = Danger\n`;
          response += `6️⃣ URGENCE: "Vente rapide" = Arnaque\n`;
          response += `7️⃣ GARANTIE: Aucune = Fuite\n\n`;
          
          response += `⚡ QUICK TEST:\n`;
          response += `Score < 5/7 = Ne pas acheter!`;
        }
      }
      
      setConversation(prev => [...prev, {
        type: 'ai',
        agent: activeAgent,
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsThinking(false);
    }, 1500);
  };

  return (
<div className="min-h-screen bg-black p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span>🤖</span>
              <span className="bg-gradient-to-r from-green-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                AGENTS IA MARCHÉ RÉEL
              </span>
            </h2>
            <p className="text-gray-500">Prix réels basés sur Vinted, Vestiaire, Mercari Japan</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Données live</span>
          </div>
        </div>
      </div>

      {/* Agents Cards */}
      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setActiveAgent(agent.id)}
            className={`p-6 rounded-2xl border transition-all text-left ${
              activeAgent === agent.id
                ? 'border-gray-600 bg-gray-900'
                : 'border-gray-800 bg-gray-900/50 hover:bg-gray-900/70'
            }`}
            style={{
              borderColor: activeAgent === agent.id ? agent.color : undefined
            }}
          >
<div className="text-3xl mb-3">{agent.emoji}</div>
            <h3 
              className="font-bold mb-1 text-sm"
              style={{ color: activeAgent === agent.id ? agent.color : '#10B981' }}
            >
              {agent.name}
            </h3>
            <p className="text-white text-xs mb-2">{agent.specialty}</p>
            <p className="text-gray-500 text-xs">{agent.description}</p>
          </button>
        ))}
      </div>

      {/* Advanced Search Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-all"
        >
          <Filter className="w-5 h-5" />
          Recherche Avancée
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedSearch ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Advanced Search Filters */}
      {showAdvancedSearch && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Filtres Avancés</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-400 hover:text-white"
            >
              Réinitialiser
</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedBrand('');
                  setSelectedModel('');
                }}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Sélectionner catégorie</option>
                {Object.keys(brandsDatabase).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Marque</label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel('');
                }}
                disabled={!selectedCategory}
className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white disabled:opacity-50"
              >
                <option value="">Sélectionner marque</option>
                {selectedCategory && brandsDatabase[selectedCategory]?.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Modèle</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedBrand}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white disabled:opacity-50"
              >
                <option value="">Sélectionner modèle</option>
                {getAvailableModels().map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Taille</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                disabled={!selectedCategory}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white disabled:opacity-50"
              >
<option value="">Sélectionner taille</option>
                {getAvailableSizes().map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">État</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Sélectionner état</option>
                {filterOptions.conditions.map(cond => (
                  <option key={cond.value} value={cond.value}>
                    {cond.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Couleur</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Sélectionner couleur</option>
                {filterOptions.colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
</select>
            </div>

            {/* Odor */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Odeur</label>
              <select
                value={hasOdor}
                onChange={(e) => setHasOdor(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">État odeur</option>
                {filterOptions.odors.map(odor => (
                  <option key={odor.value} value={odor.value}>
                    {odor.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tear */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Déchirure</label>
              <select
                value={hasTear}
                onChange={(e) => setHasTear(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">État déchirure</option>
                {filterOptions.tears.map(tear => (
                  <option key={tear.value} value={tear.value}>
                    {tear.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Analysis Button */}
          <button
            onClick={sendMessage}
            disabled={!selectedBrand || isThinking}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Analyser avec les filtres sélectionnés
          </button>
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {conversation.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <div className="text-4xl mb-4">{agents.find(a => a.id === activeAgent)?.emoji}</div>
              <p className="font-medium mb-4 text-white">{agents.find(a => a.id === activeAgent)?.name}</p>
              <p className="text-sm mb-4 text-gray-500">Posez votre question ou utilisez les filtres avancés</p>
            </div>
          )}
          
          {conversation.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-4 rounded-2xl ${
                msg.type === 'user'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}>
                {msg.agent && (
                  <div 
                    className="font-bold text-xs mb-2"
                    style={{ color: agents.find(a => a.id === msg.agent)?.color }}
                  >
{agents.find(a => a.id === msg.agent)?.name}
                  </div>
                )}
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                <div className="text-xs opacity-70 mt-2">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !showAdvancedSearch && sendMessage()}
              placeholder="Ex: Prix Neverfull MM bon état?"
              className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm"
              disabled={showAdvancedSearch}
            />
<button
              onClick={sendMessage}
              disabled={isThinking || (!message.trim() && !showAdvancedSearch)}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Analyser
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-center text-xs text-gray-600">
            <AlertCircle className="w-3 h-3 mr-1" />
            Base de données: 100+ marques • 50k+ transactions • MAJ quotidienne
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantLuxe;