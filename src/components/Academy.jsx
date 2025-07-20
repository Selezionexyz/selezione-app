import React, { useState } from 'react';
import { BookOpen, ArrowRight, ChevronRight, Star, Trophy, Target, Brain, Briefcase, TrendingUp, CheckCircle, XCircle, Award, Clock, Play } from 'lucide-react';

const Academy = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [completedChapters, setCompletedChapters] = useState(new Set());

  const modules = [
    {
      id: 1,
      title: 'Histoire de la Mode - Top 20 Marques',
      description: 'Maîtrisez l\'histoire et l\'évolution des grandes maisons de luxe',
      chapters: 4,
      duration: '8h',
      level: 'Débutant',
      color: 'amber',
      progress: 25,
      icon: Star,
      chapters_list: [
        { 
          id: 1, 
          title: 'Les 3 Géants - Hermès, Chanel, Louis Vuitton', 
          duration: '2h',
          content: `# Les 3 Géants du Luxe Mondial

## HERMÈS (1837) - L'Excellence Équestre
### Thierry Hermès - Le Visionnaire
• **1837** : Fondation comme sellier-harnacheur pour l'aristocratie parisienne
• **Révolution automobile** : Reconversion intelligente vers la maroquinerie
• **Philosophie** : "L'utilité avant tout, puis la beauté"
• **Savoir-faire** : Transmission artisanale de père en fils

### Évolutions Clés & Créations Iconiques
• **1900-1920** : Première maroquinerie, sac Haut à Courroies
• **1935** : Création du **Birkin** par Jane Birkin et Jean-Louis Dumas
• **1956** : Le **Kelly** popularisé par Grace Kelly
• **1961** : Première collection de prêt-à-porter
• **2024** : CA de 13 milliards €, marque la plus rentable au monde

### Codes ADN Hermès
• **Orange Hermès** : Couleur emblématique depuis 1949
• **Carrés de soie** : Plus de 2000 dessins depuis 1937
• **Cuirs exceptionnels** : Togo, Clemence, Epsom, Box Calf
• **Artisanat** : Un artisan = un sac, 18h pour un Birkin

---

## CHANEL (1910) - La Révolution Féminine
### Gabrielle "Coco" Chanel - La Libératrice
• **1910** : Ouverture 21 rue Cambon, Paris
• **Mission** : Libérer la femme des corsets et conventions
• **Code couleur** : Noir et blanc, couleurs de l'élégance
• **Innovation** : Jersey, matière révolutionnaire pour l'époque

### Révolutions Créatives Majeures
• **1921** : **N°5**, premier parfum de couturier
• **1926** : **Petite robe noire** (LBD), révolution Vogue
• **1955** : **Sac 2.55** avec chaîne dorée, révolutionnaire
• **1983** : **Karl Lagerfeld** relance spectaculairement la maison
• **2025** : **Virginie Viard** continue l'héritage avec modernité

### Empire Chanel Aujourd'hui
• **CA 2024** : 19,7 milliards € (+16% vs 2023)
• **Parfums** : 40% du CA total
• **Maroquinerie** : Croissance +25% annuelle
• **Joaillerie** : Expansion mondiale avec Place Vendôme

---

## LOUIS VUITTON (1854) - L'Innovation Technique
### Louis Vuitton - Le Malletier de Génie
• **1854** : Révolution avec la **malle plate** révolutionnaire
• **Innovation** : Toiles imperméables, fermetures perfectionnées
• **Clientèle** : Napoléon III, aristocratie européenne
• **Obsession** : Innovation technique avant tout

### Créations Iconiques & Évolutions
• **1896** : **Toile Monogram** pour lutter contre contrefaçon
• **1930** : **Sac Speedy** pour voyages rapides en automobile
• **1997** : **Marc Jacobs** modernise avec audace la maison
• **2025** : **Pharrell Williams**, nouveau directeur artistique homme

### Empire LVMH Aujourd'hui
• **Position** : N°1 mondial du luxe (75 milliards € CA)
• **Innovation** : Ateliers connectés, traçabilité blockchain
• **Expansion** : 4800 boutiques dans 70 pays
• **Diversification** : Mode, maroquinerie, spiritueux, montres

---

## Analyse Comparative - Forces & Stratégies

### Hermès - Stratégie de Rareté
• **Production limitée** volontaire (Birkin = 2 ans d'attente)
• **Artisanat pur** : Refus industrialisation massive
• **Prix** : +8% automatique chaque année
• **Clientèle** : Ultra-fortunés, passion > tendance

### Chanel - Equilibre Tradition/Modernité
• **Heritage** : Codes Coco préservés religieusement
• **Innovation** : Collaborations streetwear, digital
• **Distribution** : Contrôle strict, expérience premium
• **Prix** : Positionnement accessible/aspirationnel

### Louis Vuitton - Innovation & Volume
• **R&D** : 200M€/an en innovation
• **Collaborations** : Artistes, designers, streetwear
• **Digital** : Leader e-commerce luxe
• **Volume** : Production industrielle haut de gamme

---

## Points Clés pour Investisseurs/Revendeurs

### Hermès - Investissement Roi
• **ROI** : +20% annuel moyen (Birkin)
• **Liquidité** : Revente immédiate possible
• **Rareté** : Stock limité = prix soutenus

### Chanel - Valeur Sûre
• **Stabilité** : Prix secondaire prévisibles
• **Demande** : Constante mondiale
• **Authentification** : Codes série fiables

### Louis Vuitton - Volume & Accessibilité
• **Gamme** : Large choix prix/modèles
• **Disponibilité** : Stock plus important
• **Innovation** : Valeur technologique ajoutée`,
          quiz: {
            questions: [
              {
                question: "En quelle année Hermès a-t-il été fondé ?",
                options: ["1837", "1854", "1910", "1921"],
                correct: 0
              },
              {
                question: "Quel est le surnom de Gabrielle Chanel ?",
                options: ["Gigi", "Coco", "Gaby", "Gala"],
                correct: 1
              },
              {
                question: "Quelle innovation technique a révolutionné Louis Vuitton ?",
                options: ["Toile Monogram", "Malle plate", "Chaîne dorée", "Cuir Caviar"],
                correct: 1
              },
              {
                question: "Combien de temps faut-il pour fabriquer un sac Birkin ?",
                options: ["6 heures", "12 heures", "18 heures", "24 heures"],
                correct: 2
              }
            ]
          }
        },
        { 
          id: 2, 
          title: 'Maisons Italiennes - Gucci, Prada, Bottega Veneta', 
          duration: '2h',
          content: `# L'Excellence Italienne - Savoir-Faire & Innovation

## GUCCI (1921) - Renaissance Florentine
### Guccio Gucci - L'Artisan Visionnaire
• **1921** : Fondation à Florence, inspiration sellerie anglaise
• **Savoir-faire** : Maroquinerie artisanale toscane
• **Innovation** : Mors de cheval, bambou, toile GG
• **Période dorée** : 1950-1980 avec Aldo Gucci

### Révolution Tom Ford & Alessandro Michele
• **1994-2004** : Tom Ford ressuscite la marque
• **2015-2024** : Alessandro Michele, révolution maximalist
• **2024** : Sabato De Sarno, retour aux codes classiques
• **CA 2024** : 10,8 milliards € (Kering)

### Codes Iconiques
• **Bambou Handle** : Innovation 1947, toujours actuelle
• **Mors de cheval** : Héritage équestre florentin
• **Rouge Gucci** : Couleur signature depuis 1953
• **Double G** : Logo créé par Aldo Gucci en 1964

---

## PRADA (1913) - Minimalisme Luxueux
### Mario Prada - Maroquinier Royal
• **1913** : Fratelli Prada, fournisseur maison royale italienne
• **1978** : Miuccia Prada révolutionne la maison
• **Innovation** : Nylon technique transformé en luxe
• **Philosophie** : "Ugly chic" - beauté dans l'imperfection

### Révolution Nylon & Codes Modernes
• **1984** : **Sac nylon noir**, révolution anti-luxe
• **Minimalisme** : Esthétique épurée, anti-ostentation
• **Intellectualisme** : Mode conceptuelle, avant-garde
• **Miu Miu** : Ligne jeune, expérimentation créative

### Expansion & Performance
• **CA 2024** : 4,2 milliards € (+17% vs 2023)
• **Asie** : 65% du chiffre d'affaires total
• **Innovation** : Matériaux durables, Re-Nylon recyclé
• **Art** : Fondation Prada, mécénat culturel

---

## BOTTEGA VENETA (1966) - Discrétion Absolue
### "When Your Own Initials Are Enough"
• **1966** : Fondation Vicence, artisanat cuir vénitien
• **Philosophie** : Luxe discret, pas de logos
• **Savoir-faire** : Intrecciato, tissage cuir signature
• **Clientèle** : Connaisseurs, vieux argent

### Ère Daniel Lee - Révolution Silencieuse
• **2018-2021** : Daniel Lee révolutionne codes
• **Succès** : Pouch, Cassette, Puddle boots
• **Stratégie** : Anti-logo, craft supérieur
• **Prix** : Positionnement ultra-premium

### Renaissance Matthieu Blazy
• **2022** : Matthieu Blazy, continuité innovation
• **Codes** : Intrecciato réinventé, matières nobles
• **Performance** : +8% croissance 2024
• **Positionnement** : Discrétion maximale, qualité absolue

---

## Spécificités Italiennes vs Françaises

### Savoir-Faire Italien Unique
• **Régions** : Toscane (cuir), Vénétie (artisanat)
• **Techniques** : Intrecciato, patine manuelle
• **Matières** : Cuirs nobles, innovations textiles
• **Transmission** : Ateliers familiaux séculaires

### Approche Business Différenciante
• **Innovation** : Technique + esthétique
• **Famille** : Contrôle familial préservé longtemps
• **Art** : Intégration culture/patrimoine
• **Flexibilité** : Adaptation rapide aux tendances

---

## Investissement & Revente - Analyse Marché

### Gucci - Tendance & Accessibilité
• **Prix secondaire** : -30/50% vs neuf
• **Liquidité** : Bonne rotation, demande constante
• **Pièces investissement** : Bamboo, Dionysus vintage

### Prada - Valeur Technique
• **Nylon vintage** : +200% en 5 ans
• **Rééditions** : Valeur sûre long terme
• **Innovation** : Re-Nylon, valeur éthique ajoutée

### Bottega Veneta - Discrétion Premium
• **Daniel Lee era** : Pièces collectors
• **Intrecciato** : Valeur artisanale reconnue
• **Croissance** : +15% annuel marché secondaire`,
          quiz: {
            questions: [
              {
                question: "Quelle technique de tissage est emblématique de Bottega Veneta ?",
                options: ["Cannage", "Intrecciato", "Bamboo", "Caviar"],
                correct: 1
              },
              {
                question: "Qui a révolutionné Prada avec le nylon ?",
                options: ["Mario Prada", "Miuccia Prada", "Tom Ford", "Raf Simons"],
                correct: 1
              },
              {
                question: "Quel est le slogan historique de Bottega Veneta ?",
                options: ["Made in Italy", "When Your Own Initials Are Enough", "La Dolce Vita", "Bello e Impossibile"],
                correct: 1
              }
            ]
          }
        },
        { 
          id: 3, 
          title: 'Horlogerie Suisse - Rolex, Patek Philippe, AP', 
          duration: '2h',
          content: `# La Sainte Trinité Horlogère Suisse

## ROLEX (1905) - L'Excellence Accessible
### Hans Wilsdorf - Visionnaire Commercial
• **1905** : Fondation Londres, vision démocratisation
• **1926** : **Oyster**, première montre étanche monde
• **Innovation** : Mouvement automatique, précision certifiée
• **Marketing** : Ambassadeurs, exploits sportifs

### Modèles Iconiques & Investissement
• **Submariner** : Plongée professionnelle, 1953
• **GMT-Master** : Aviation commerciale, 1955
• **Daytona** : Course automobile, 1963
• **Datejust** : Innovation date, 1945

### Marché & Performance
• **Production** : 1M montres/an (contrôlée)
• **Listes d'attente** : 2-10 ans selon modèles
• **ROI** : +8-12% annuel moyen
• **Liquidité** : Revente immédiate possible

---

## PATEK PHILIPPE (1839) - Haute Horlogerie Pure
### Antoine Patek & Adrien Philippe
• **1839** : Genève, tradition horlogère suisse
• **Philosophie** : "You never actually own a Patek Philippe"
• **Complication** : Maîtres des fonctions complexes
• **Exclusivité** : 60,000 montres/an maximum

### Créations Légendaires
• **Calatrava** : Élégance pure, 1932
• **Nautilus** : Sport-chic révolutionnaire, 1976
• **Aquanaut** : Moderne accessible, 1997
• **Grand Complications** : Chefs-d'œuvre techniques

### Investissement Ultra-Premium
• **Nautilus** : +300% en 10 ans
• **Vintage** : Records aux enchères
• **Rareté** : Production ultra-limitée
• **Héritage** : Transmission familiale

---

## AUDEMARS PIGUET (1875) - Innovation Tradition
### Jules Audemars & Edward Piguet
• **1875** : Vallée de Joux, berceau horlogerie
• **Spécialité** : Complications mécaniques
• **1972** : **Royal Oak**, révolution acier de luxe
• **Philosophie** : "To break the rules, you must first master them"

### Royal Oak - Révolution Esthétique
• **Gérald Genta** : Design révolutionnaire 1972
• **Acier noble** : Luxe démocratisé premium
• **Vis apparentes** : Code esthétique unique
• **Offshore** : Version sport extrême, 1993

### Performance & Collectibilité
• **Production** : 50,000 montres/an
• **Royal Oak** : +250% valeur 15 ans
• **Complications** : Pièces d'exception collectors
• **Innovation** : Matériaux avant-garde

---

## Codes d'Investissement Horlogerie Suisse

### Critères Valeur/Rareté
• **Complication** : Plus = mieux (chronographe, GMT)
• **Matériau** : Or > Acier > autres
• **État** : Boîte/papiers indispensables
• **Série limitée** : Éditions numérotées premium

### Modèles Investissement 2025
**ROLEX**
• Submariner No-Date (114060)
• GMT-Master II Batman (126710BLNR)  
• Daytona acier cadran blanc (116500LN)

**PATEK PHILIPPE**
• Nautilus 5711A (discontinué = or)
• Aquanaut 5167A
• Calatrava 5196 or

**AUDEMARS PIGUET** 
• Royal Oak 15202 ultra-thin
• Royal Oak Offshore 26170ST
• Code 11.59 (opportunité future)

---

## Stratégies d'Achat & Revente

### Marché Primaire
• **Listes d'attente** : Relation AD cruciale
• **Historique achat** : Fidélité récompensée
• **Prix retail** : Base calcul ROI

### Marché Secondaire
• **Premium** : 20-300% selon modèles
• **Authenticité** : Expertise indispensable
• **Condition** : Impact majeur sur valeur
• **Timing** : Cycles marché à anticiper

### Nouvelles Tendances 2025
• **Montres connectées** : Impact limité haut de gamme
• **Durabilité** : Certifications écologiques
• **Blockchain** : Traçabilité, anti-contrefaçon
• **Métavers** : NFT montres, collectibilité digitale`,
          quiz: {
            questions: [
              {
                question: "Quelle Rolex a été créée pour l'aviation commerciale ?",
                options: ["Submariner", "GMT-Master", "Daytona", "Explorer"],
                correct: 1
              },
              {
                question: "Qui a conçu le design révolutionnaire de la Royal Oak ?",
                options: ["Gérald Genta", "Jean-Claude Biver", "Philippe Dufour", "Vianney Halter"],
                correct: 0
              },
              {
                question: "Combien Patek Philippe produit-il de montres par an maximum ?",
                options: ["30,000", "60,000", "100,000", "200,000"],
                correct: 1
              }
            ]
          }
        },
        { 
          id: 4, 
          title: 'Nouveaux Acteurs - Jacquemus, Bottega New Era, The Row', 
          duration: '2h',
          content: `# La Nouvelle Génération du Luxe (2010-2025)

## JACQUEMUS - Révolution Méditerranéenne
### Simon Porte Jacquemus - Prodige Français
• **2009** : Création à 19 ans, hommage à sa mère
• **Vision** : Luxe accessible, esthétique Sud de la France
• **Breakthrough** : 2015, reconnaissance internationale
• **Stratégie** : Digital-first, storytelling authentique

### Codes & Innovations Jacquemus
• **Minimalisme** : Lignes épurées, couleurs naturelles
• **Sacs iconiques** : Le Chiquito, Le Grand Bambino
• **Défilés** : Champs lavande, salins, décors naturels
• **Prix** : Accessibilité premium (500-2000€)

### Performance Business
• **CA 2024** : 150M€ (+35% vs 2023)
• **International** : 70% ventes hors France
• **Digital** : 40% CA e-commerce
• **Collaborations** : Nike, Barbie, succès mainstream

---

## THE ROW - Luxe Discret Ultime
### Mary-Kate & Ashley Olsen - Perfectionnistes
• **2006** : Création post-célébrité, focus craft
• **Philosophie** : "Perfect basics", qualité absolue
• **Prix** : Ultra-premium (1000-5000€ basiques)
• **Clientèle** : Connaisseurs, célébrités discrètes

### ADN The Row
• **Minimalisme** : Anti-logo, anti-tendance
• **Matières** : Cachemire exceptionnel, soies rares
• **Coupes** : Perfection technique, intemporalité
• **Distribution** : Boutiques rares, sélectivité extrême

### Positionnement Marché
• **Croissance** : +25% annuel depuis 2018
• **Influence** : Référence "quiet luxury"
• **Investissement** : Pièces collectors potentielles
• **Expansion** : Maroquinerie, chaussures premium

---

## BOTTEGA VENETA "New Era" - Renaissance
### Daniel Lee Revolution (2018-2021)
• **Arrivée** : Ex-Céline, vision moderne craft
• **Révolution** : Codes préservés, formes nouvelles
• **Succès** : Pouch bag, Puddle boots iconiques
• **Digital** : Stratégie anti-social media audacieuse

### Innovations Marquantes
• **The Pouch** : Minimalisme maximum, succès viral
• **Cassette** : Intrecciato réinventé, volumes nouveaux
• **Couleurs** : Palette signature, verts, roses
• **Silhouettes** : Proportions exagérées, modernité

### Matthieu Blazy Continuité (2022-)
• **Évolution** : Continuité innovation, codes préservés
• **Développement** : Prêt-à-porter, accessoires
• **Performance** : Maintien croissance +8% annuel
• **Vision** : Craft contemporain, discrétion moderne

---

## NOUVELLES GÉNÉRATIONS - Tendances 2025

### GANNI (Danemark)
• **Scandinavian cool** : Durabilité, modernité
• **Prix** : Accessible premium (200-800€)
• **Croissance** : +40% annuel, international

### STAUD (Los Angeles)
• **Instagram-ready** : Esthétique social media
• **Innovation** : Formes sculpturales, couleurs
• **Prix** : Entry luxury (300-1200€)

### BY FAR (Bulgarie)
• **Néo-vintage** : Références 90s, qualité moderne
• **Succès** : Chaussures, maroquinerie
• **Distribution** : Pure digital strategy

---

## CODES NOUVEAUX LUXE vs TRADITIONNEL

### Différenciateurs Nouvelle Génération
• **Digital First** : Instagram, TikTok natifs
• **Storytelling** : Authenticité, personnalité fondateur
• **Prix** : Accessible premium (vs inaccessible)
• **Flexibilité** : Adaptation rapide tendances
• **Durabilité** : Conscience écologique intégrée

### Stratégies Disruptives
• **Drop model** : Lancements limités, urgence
• **Collaborations** : Mainstream + luxury
• **Direct-to-consumer** : Marges préservées
• **Community building** : Engagement authentique

---

## INVESTISSEMENT - Nouveaux Collectibles

### Potentiel Collectibilité
**JACQUEMUS**
• Le Chiquito première édition
• Pièces défilés naturels iconiques
• Collaborations limitées Nike

**THE ROW**
• Manteaux signature première période
• Sacs minimalistes parfaits
• Pièces cachemire exceptionnelles

**BOTTEGA VENETA New Era**
• Pouch Daniel Lee toutes couleurs
• Puddle boots originales
• Cassette première version

### Critères Évaluation
• **Rareté** : Éditions limitées, discontinuées
• **Iconicité** : Pièces définissant marque
• **Qualité** : Matériaux, finitions exceptionnelles
• **Documentation** : Boîtes, authentificateurs
• **Tendance** : Cycles mode, retour vintage

---

## VISION FUTUR 2025-2030

### Évolutions Attendues
• **Maturité** : Codes stabilisés, reconnaissance
• **Expansion** : International, nouvelles catégories
• **Premium-isation** : Montée en gamme naturelle
• **Héritage** : Transmission, codes pérennes

### Opportunités Investissement
• **Early adopter advantage** : Avant mainstream
• **Développement international** : Expansion valeur
• **Collaborations** : Éditions limitées précieuses
• **Archive pieces** : Premières collections rares`,
          quiz: {
            questions: [
              {
                question: "À quel âge Simon Porte Jacquemus a-t-il créé sa marque ?",
                options: ["17 ans", "19 ans", "21 ans", "23 ans"],
                correct: 1
              },
              {
                question: "Quelle stratégie digitale Bottega Veneta a-t-il adopté sous Daniel Lee ?",
                options: ["Social media intensif", "Anti-social media", "Influenceurs uniquement", "Publicité classique"],
                correct: 1
              },
              {
                question: "Qui sont les fondatrices de The Row ?",
                options: ["Sœurs Kardashian", "Mary-Kate & Ashley Olsen", "Sœurs Williams", "Sœurs Hadid"],
                correct: 1
              }
            ]
          }
        }
      ]
    },
    // Continuer avec les autres modules...
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colorMap = {
      amber: type === 'bg' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'text-amber-600',
      green: type === 'bg' ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'text-emerald-600',
      blue: type === 'bg' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'text-blue-600',
      purple: type === 'bg' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'text-purple-600',
      indigo: type === 'bg' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'text-indigo-600',
    };
    return colorMap[color] || colorMap.blue;
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const submitQuiz = () => {
    const quiz = selectedChapter.quiz;
    let correct = 0;
    
    quiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });

    const percentage = Math.round((correct / quiz.questions.length) * 100);
    setQuizResults({
      correct,
      total: quiz.questions.length,
      percentage,
      passed: percentage >= 70
    });

    if (percentage >= 70) {
      setCompletedChapters(prev => new Set([...prev, selectedChapter.id]));
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizResults(null);
  };

  // Vue Quiz
  if (showQuiz && selectedChapter?.quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={resetQuiz}
            className="mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Retour au chapitre
          </button>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">
                Quiz - {selectedChapter.title}
              </h1>
              <div className="text-purple-300">
                {Object.keys(quizAnswers).length}/{selectedChapter.quiz.questions.length} réponses
              </div>
            </div>

            {!quizResults ? (
              <div className="space-y-6">
                {selectedChapter.quiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-black/30 rounded-xl p-6">
                    <h3 className="text-xl text-white mb-4 font-medium">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          className={`p-4 rounded-lg text-left transition-all ${
                            quizAnswers[qIndex] === oIndex
                              ? 'bg-purple-600 text-white border-2 border-purple-400'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-transparent'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < selectedChapter.quiz.questions.length}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  Valider le Quiz
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                  quizResults.passed ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {quizResults.passed ? (
                    <Trophy className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </div>

                <h2 className={`text-3xl font-bold mb-4 ${
                  quizResults.passed ? 'text-green-400' : 'text-red-400'
                }`}>
                  {quizResults.passed ? 'Félicitations !' : 'Presque !'}
                </h2>

                <p className="text-xl text-gray-300 mb-6">
                  Vous avez obtenu {quizResults.correct}/{quizResults.total} bonnes réponses
                  ({quizResults.percentage}%)
                </p>

                {quizResults.passed ? (
                  <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <p className="text-green-400 font-medium">
                      Chapitre terminé avec succès ! Vous maîtrisez maintenant ces concepts.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-6 mb-6">
                    <p className="text-red-400">
                      Score minimum requis : 70%. Relisez le chapitre et réessayez !
                    </p>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all"
                  >
                    Retour au chapitre
                  </button>
                  {!quizResults.passed && (
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizResults(null);
                      }}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all"
                    >
                      Réessayer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vue Chapitre avec contenu détaillé
  if (selectedChapter) {
    const isCompleted = completedChapters.has(selectedChapter.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedChapter(null)}
            className="mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Retour aux chapitres
          </button>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedChapter.title}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    {selectedChapter.duration}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-2 text-green-400">
                      <Award className="w-4 h-4" />
                      Terminé
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={startQuiz}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all"
              >
                <Play className="w-4 h-4" />
                Quiz
              </button>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed">
                <pre className="whitespace-pre-wrap font-sans text-base">
{selectedChapter.content}
                </pre>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">
                📚 Pour maîtriser ce chapitre
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h4 className="font-medium text-white mb-2">Ressources disponibles :</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Quiz d'évaluation interactif</li>
                    <li>• Exercices pratiques</li>
                    <li>• Cas d'études réels</li>
                    <li>• Support expert 24/7</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Objectifs d'apprentissage :</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Maîtrise des concepts clés</li>
                    <li>• Application pratique</li>
                    <li>• Score minimum 70% au quiz</li>
                    <li>• Certification de réussite</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Suite du code avec les autres vues...
  // [Le reste du code reste identique pour les vues module et principale]

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Retour aux modules
          </button>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-start gap-6">
              <div className={`p-4 rounded-2xl ${getColorClasses(selectedModule.color)}`}>
                <selectedModule.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedModule.title}
                </h1>
                <p className="text-gray-300 text-lg mb-4">
                  {selectedModule.description}
                </p>
                
                <div className="flex gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${getLevelBadgeColor(selectedModule.level)}`}>
                    {selectedModule.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                    {selectedModule.duration}
                  </span>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full">
                    {selectedModule.chapters} chapitres
                  </span>
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full">
                    {selectedModule.chapters_list?.filter(ch => completedChapters.has(ch.id)).length || 0} terminés
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {selectedModule.chapters_list?.map((chapter) => {
              const isCompleted = completedChapters.has(chapter.id);
              return (
                <div
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter)}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                          Chapitre {chapter.id}: {chapter.title}
                        </h3>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {chapter.duration}
                        </span>
                        {chapter.quiz && (
                          <span className="flex items-center gap-1 text-purple-400">
                            <Target className="w-4 h-4" />
                            Quiz inclus
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {chapter.content.slice(0, 150)}...
                      </p>
                    </div>
                    
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors ml-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎓 Selezione Academy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La formation la plus complète pour maîtriser le marché du luxe. 
            De débutant à expert en 6 mois.
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>{completedChapters.size} chapitres terminés</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Target className="w-4 h-4" />
              <span>Quiz interactifs</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const completedCount = module.chapters_list?.filter(ch => completedChapters.has(ch.id)).length || 0;
            const progress = module.chapters_list ? (completedCount / module.chapters_list.length) * 100 : 0;
            
            return (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(module.color)} group-hover:scale-110 transition-transform`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{module.id}</div>
                    <div className="text-sm text-gray-400">Module</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {module.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {module.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getLevelBadgeColor(module.level)}`}>
                    {module.level}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                    {module.duration}
                  </span>
                  <span className="px-2 py-1 text-xs bg-purple-600 text-white rounded-full">
                    {completedCount}/{module.chapters} terminés
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-300 font-medium">
                    {module.chapters} chapitres
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${getColorClasses(module.color)} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {progress > 0 && (
                  <div className="mt-2 text-xs text-center text-gray-400">
                    Progression: {Math.round(progress)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
            <Trophy className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Certification</h3>
            <p className="text-gray-300 text-sm">
              Obtenez votre certification Selezione reconnue par l'industrie du luxe.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/30">
            <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ressources</h3>
            <p className="text-gray-300 text-sm">
              Accès à vie aux ressources, mises à jour et communauté exclusive.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
            <Target className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Support</h3>
            <p className="text-gray-300 text-sm">
              Mentorat personnalisé et support expert 24/7 pour votre succès.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;