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
    // MODULE 2: Authentification & Expertise
    {
      id: 2,
      title: 'Authentification & Expertise',
      description: 'Maîtrise des techniques d\'authentification avancées',
      chapters: 5,
      duration: '12h',
      level: 'Intermédiaire',
      color: 'green',
      progress: 0,
      icon: Target,
      chapters_list: [
        {
          id: 1,
          title: 'Méthodes Traditionnelles d\'Authentification',
          duration: '2h30',
          content: `# Méthodes Traditionnelles d'Authentification

## EXAMEN PHYSIQUE DÉTAILLÉ

### Coutures - Premier Indicateur
• **Hermès** : Coutures sellier, 2 fils, 28-30 points/pouce
• **Chanel** : Double piqûre parfaite, alignement millimétrique
• **Louis Vuitton** : Couture machine précise, fil jaune moutarde
• **Bottega Veneta** : Intrecciato parfait, régularité absolue

### Matériaux & Cuirs - Expertise Tactile
• **Cuir Hermès** : Grain naturel, souplesse, odeur cuir noble
• **Caviar Chanel** : Grain régulier, résistance aux rayures
• **Épi Louis Vuitton** : Nervures parallèles, brillance uniforme
• **Nappa Italien** : Douceur soyeuse, élasticité

### Hardware & Fermetures - Points Critiques
• **Hermès** : Palladium/Or, gravures profondes, poids conséquent
• **Chanel** : CC entrelacés parfaits, métal uniforme
• **Louis Vuitton** : Laiton doré, logo net, mécanisme fluide
• **YKK/Lampo** : Fermetures éclair haut de gamme exclusivement

## CODES SÉRIE & DATATION

### Système Hermès
• **Carré + Lettre** : 2015+ (Q=2015, R=2016, etc.)
• **Cercle + Lettre** : 1970-2014
• **Position** : Intérieur sac, sous rabat, discret

### Système Chanel  
• **Hologramme** : 8 chiffres depuis 2005
• **Format** : XXXXXXXX (année codée)
• **Position** : Intérieur, étiquette cuir cousue

### Système Louis Vuitton
• **Date code** : 2 lettres + 4 chiffres
• **Format** : LL####, semaine + année fabrication
• **Position** : Poche intérieure, étiquette cuir

## TECHNIQUES D'EXAMEN PROFESSIONNEL

### Éclairage & Loupe
• **UV 365nm** : Révèle colles, réparations cachées
• **Loupe x10** : Détails coutures, gravures, matériaux
• **Éclairage LED** : Couleurs vraies, défauts visibles

### Test Non-Destructifs
• **Aimant** : Hardware authentique (non magnétique)
• **Poids** : Référentiels par modèle (±50g tolérance)
• **Dimensions** : Mesures précises au mm près
• **Flexibilité** : Cuirs naturels vs synthétiques

### Points de Vigilance Critique
• **Symétrie** : Motifs, coutures, hardware alignés
• **Finitions** : Bords peints nets, pas de bavures
• **Proportions** : Rapports hauteur/largeur exacts
• **Cohérence** : Style/époque/matériaux concordants

## ERREURS FATALES À ÉVITER

### Fausses Certitudes
❌ "Le cuir sent bon donc c'est authentique"
❌ "Le prix élevé garantit l'authenticité"  
❌ "Acheté en boutique = forcément authentique"
❌ "Les papiers font l'authenticité"

### Vraies Méthodes
✅ Combinaison multiple critères
✅ Cohérence globale produit
✅ Expertise progressive/formation
✅ Doute = abstention vente

## EXERCICES PRATIQUES

### Cas d'École - Birkin vs Fake
**AUTHENTIQUE**
- Couture sellier irrégulière (fait main)
- Cuir Togo grain naturel variable
- Hardware lourd, gravures profondes
- Cadenas numéroté concordant

**CONTREFAÇON**
- Couture machine trop parfaite
- Cuir artificiel grain uniforme
- Hardware léger, gravures molles  
- Numéros incohérents/absents

### Auto-Évaluation
1. Examiner 10 sacs différents
2. Noter 5 critères par sac
3. Comparer avec références officielles
4. Calculer taux de réussite
5. Refaire jusqu'à 95%+ précision`,
          quiz: {
            questions: [
              {
                question: "Combien de points par pouce pour une couture Hermès sellier ?",
                options: ["20-25", "28-30", "35-40", "Variable"],
                correct: 1
              },
              {
                question: "Que révèle un test UV 365nm ?",
                options: ["Authenticité", "Colles et réparations", "Âge du cuir", "Provenance"],
                correct: 1
              },
              {
                question: "Format du code série Chanel moderne ?",
                options: ["6 chiffres", "8 chiffres", "2 lettres + 4 chiffres", "Variable"],
                correct: 1
              }
            ]
          }
        },
        {
          id: 2,
          title: 'Technologies IA & Scanning Moderne',
          duration: '3h',
          content: `# Technologies IA & Scanning Moderne

## ENTRUPY - RÉVOLUTION AUTHENTIFICATION

### Principe de Fonctionnement
• **Microscopie x260** : Analyse structure matériau
• **IA Propriétaire** : 98.5% précision certifiée
• **Base données** : 500M+ images authentiques
• **Temps analyse** : 30 secondes par produit

### Marques Supportées
• **Niveau 1** : Chanel, Louis Vuitton, Hermès, Gucci
• **Niveau 2** : Prada, Fendi, Balenciaga, YSL
• **Expansion** : +20 marques/an, bijoux, montres

### Coût & ROI
• **Device** : $999 achat, $299 location/mois
• **Analyse** : $2/scan ou forfait 500 scans/mois
• **ROI** : Rentable dès 50 authentifications/mois
• **Insurance** : Couverture erreur jusqu'à $5000

## APPLICATIONS MOBILES INNOVANTES

### Real Authentication (Gratuit)
• **Crowdsourcing** : Experts communauté
• **Temps** : 24-48h réponse moyenne
• **Précision** : 90-95% selon marque
• **Limite** : Subjectivité humaine

### Legitcheck ($4.99/scan)
• **IA + Humain** : Double validation
• **Temps** : 30min garantie
• **Garantie** : Remboursement si erreur
• **Avantage** : Rapidité + fiabilité

### CheckCheck App (Gratuit/Premium)
• **Sneakers focus** : Extension luxe récente
• **Technologie** : Computer vision avancée
• **Base** : Authentifications précédentes
• **Limite** : Catalogue marques limité

## TECHNOLOGIES ÉMERGENTES 2025

### Blockchain Authentication
• **Principe** : Certificat NFT inaltérable
• **Acteurs** : Aura (LVMH), VeChain, Arianee
• **Avantage** : Traçabilité complète
• **Limite** : Adoption lente maisons

### Spectroscopie Portable
• **Analyse moléculaire** : Composition exacte matériaux  
• **Devices** : SCiO, NeoSpectra, ASD LabSpec
• **Précision** : 99%+ sur cuirs/métaux
• **Coût** : $2000-5000 selon modèle

### IA Visuelle Avancée
• **Google Lens** : Reconnaissance basique gratuite
• **Amazon Rekognition** : API personnalisable
• **Solutions custom** : Développement sur-mesure
• **Formation** : Dataset propriétaire crucial

## OUTILS COMPLÉMENTAIRES PROFESSIONNELS

### Microscopes Numériques
• **Dino-Lite** : USB, x50-500, $200-1500
• **Applications** : Coutures, gravures, matériaux
• **Stockage** : Photos HD pour documentation
• **Partage** : Analyses collaboratives

### Détecteurs Matériaux
• **Aimants terres rares** : Hardware authentique
• **Testeur diamant** : Bijouterie de luxe
• **pH mètre** : Acidité cuirs naturels
• **Balance précision** : 0.1g, poids références

### Apps Measurement
• **Measure (iOS)** : Réalité augmentée
• **AR Ruler** : Précision millimétrique
• **CamToPlan** : Plans 2D automatiques
• **Usage** : Vérification dimensions exactes

## STRATÉGIE TECHNOLOGIQUE OPTIMALE

### Configuration Professionnelle
• **Base** : Entrupy device ($999)
• **Backup** : Legitcheck app (mensuel)
• **Support** : Microscope Dino-Lite ($400)
• **Documentation** : Photos HD systematic

### Workflow Type
1. **Photos générales** : 6 angles standard
2. **Scan Entrupy** : Zones critiques
3. **Microscope** : Détails douteux
4. **App backup** : Confirmation seconde opinion
5. **Documentation** : Rapport complet client

### ROI Calculation
• **Investissement initial** : $1500-2000
• **Coût opérationnel** : $200/mois
• **Break-even** : 100 authentifications/mois
• **Marge** : $10-50/authentification
• **Rentabilité** : Dès mois 3-6

## LIMITES ET PRÉCAUTIONS

### Limites Technologiques
• **IA learning** : Nouveaux fakes évoluent
• **Qualité images** : Éclairage/résolution critique
• **Mises à jour** : Abonnements requis
• **Faux positifs** : 1-2% erreur résiduelle

### Précautions Légales
• **Garantie limitée** : Pas de responsabilité absolue
• **Documentation** : Traçabilité analyses
• **Formation** : Certification utilisateur recommandée
• **Backup** : Toujours double validation

## FUTUR PROCHE 2026-2030

### Évolutions Attendues
• **IA générative** : Détection deepfakes matériaux
• **5G/Edge** : Analyses temps réel in-store
• **AR/VR** : Authentification immersive
• **IoT** : Puces intégrées produits authentiques

### Nouveaux Acteurs
• **Meta/Apple** : Plateformes authentification
• **Startups** : Solutions niche spécialisées  
• **Maisons luxe** : Outils propriétaires
• **Assurances** : Garanties technologiques`,
          quiz: {
            questions: [
              {
                question: "Quelle est la précision d'Entrupy ?",
                options: ["95%", "98.5%", "99.9%", "Variable"],
                correct: 1
              },
              {
                question: "Coût d'un scan Legitcheck ?",
                options: ["Gratuit", "$2", "$4.99", "$10"],
                correct: 2
              },
              {
                question: "Quelle technologie analyse la composition moléculaire ?",
                options: ["IA visuelle", "Microscope", "Spectroscopie", "Blockchain"],
                correct: 2
              }
            ]
          }
        },
        {
          id: 3,
          title: 'Contrefaçons Avancées - Super Fakes',
          duration: '3h30',
          content: `# Contrefaçons Avancées - Super Fakes

## ÉVOLUTION DE LA CONTREFAÇON

### Génération 1 (1990-2000) - "Fakes Évidents"
• **Matériaux** : Plastique, similicuir bas de gamme
• **Finitions** : Coutures irrégulières, logos approximatifs
• **Prix** : $20-50, marchés/rue
• **Détection** : Évidente au premier coup d'œil

### Génération 2 (2000-2010) - "Copies Améliorées" 
• **Matériaux** : Cuir véritable, hardware métallique
• **Finitions** : Attention aux détails, meilleure qualité
• **Prix** : $100-300, sites internet
• **Détection** : Examen attentif requis

### Génération 3 (2010-2020) - "Répliques AAA"
• **Matériaux** : Cuirs nobles, hardware qualité
• **Finitions** : Reproduction très fidèle
• **Prix** : $300-800, réseaux spécialisés
• **Détection** : Expertise technique nécessaire

### Génération 4 (2020+) - "Super Fakes"
• **Matériaux** : Identiques ou supérieurs original
• **Finitions** : Perfection industrielle parfois > authentique
• **Prix** : $800-2000, commandes personnalisées
• **Détection** : Microscope/technologie indispensable

## ANALYSE SUPER FAKE - CAS HERMÈS BIRKIN

### Points Forts Troublants
• **Cuir Togo authentique** : Même fournisseur probable
• **Coutures sellier** : Artisans formés techniques Hermès
• **Hardware** : Palladium véritable, gravures parfaites
• **Proportions** : Mesures exactes au millimètre
• **Odeur** : Cuir noble, même traitement

### Indices Détection Experte
• **Numérotation** : Algorithmes codes série déchiffrés
• **Cuir** : Grain microscopiquement différent (x500)
• **Coutures** : Régularité trop parfaite (machine assistée)
• **Patine** : Vieillissement artificiel détectable UV
• **Dust bag** : Papier/impression légèrement différents

### Coût Production Réel
• **Matériaux** : $200-400
• **Main d'œuvre** : $150-300 (artisans formés)
• **R&D/Reverse engineering** : Amortis
• **Marge** : 300-500% (prix vente $1500-2000)

## CAS D'ÉCOLE - CHANEL CLASSIC FLAP

### Super Fake Caractéristiques
• **Caviar authentique** : Même tannerie suspectée
• **Chaîne** : Poids correct, entrelacs parfait
• **Matelassé** : Proportion diamant exacte
• **CC Turn-lock** : Mécanisme fluide, alignement

### Révélateurs Techniques
• **Hologramme** : Impression offset vs laser
• **Serial** : Format correct mais séquence incohérente  
• **Doublure** : Burgundy nuance imperceptiblement différente
• **Edges** : Peinture synthétique vs naturelle
• **Aimant test** : Chaîne partiellement magnétique

### Évolution Inquiétante
• **Hologrammes** : Contrefaçons de plus en plus fidèles
• **Codes série** : Bases de données piratées
• **Matériaux** : Accès fournisseurs originaux
• **Savoir-faire** : Artisans transfuges

## RÉSEAUX SUPER FAKE - ORGANISATION

### Structure Industrielle
• **R&D** : Ingénierie inverse systématique
• **Approvisionnement** : Fournisseurs premiums
• **Production** : Ateliers spécialisés (Chine/Turquie)
• **Distribution** : Réseaux privés, commandes

### Profils Clients Type
• **Revendeurs** : Mélange authentique/fake
• **Particuliers aisés** : "Guilt-free luxury" 
• **Influenceurs** : Content création budget
• **Investisseurs naïfs** : Dupés sur l'authenticité

### Prix & Positionnement
• **Super Fake Birkin** : $1500-2500
• **Authentique occasion** : $8000-15000
• **Ratio** : 15-20% prix authentique
• **Rentabilité** : Attractive pour acheteurs

## TECHNIQUES DÉTECTION AVANCÉES

### Analyse Microscopique (x500+)
• **Structure cuir** : Pores, grain, fibres naturelles
• **Coutures** : Irrégularités main vs machine
• **Hardware** : Composition métallique précise
• **Colles** : UV révèle adhésifs modernes

### Tests Chimiques Non-Destructifs
• **Spectromètre** : Signature moléculaire exacte
• **pH Test** : Acidité cuirs tannage traditionnel
• **Magnétisme** : Hardware authentique non-magnétique
• **Densité** : Rapport poids/volume spécifique

### Documentation Forensique
• **Photos UV** : Révèle traitements chimiques
• **Macro 1:1** : Détails invisibles œil nu
• **Mesures précises** : Tolérances manufacturier
• **Historique** : Cohérence époque/collection

## ÉVOLUTIONS FUTURES - COURSE ARMEMENT

### Défis Croissants 2025+
• **IA Générative** : Optimisation fakes automatique
• **Impression 3D** : Hardware parfaitement copié
• **Biotech** : Cuirs synthétiques indistinguables
• **Supply Chain** : Infiltration fournisseurs légitimes

### Contre-Mesures Émergentes
• **Blockchain** : Traçabilité inaltérable
• **Puces RFID/NFC** : Identification électronique
• **ADN Artificiel** : Marqueurs moléculaires
• **IA Défensive** : Détection contrefaçons évolutive

### Enjeux Business
• **Marché secondaire** : Confiance ébranlée
• **Assurances** : Couvertures limitées/coûteuses
• **Plateformes** : Responsabilité authentification
• **Maisons luxe** : R&D anti-contrefaçon massive

## RECOMMANDATIONS STRATÉGIQUES

### Pour Revendeurs Professionnels
• **Formation continue** : Veille technologique permanente
• **Outils high-tech** : Investissement matériel indispensable
• **Réseau experts** : Seconde opinion systématique
• **Assurance** : Couverture erreur authentification

### Pour Acheteurs Particuliers
• **Sources fiables** : Boutiques, plateformes certifiées
• **Méfiance** : Prix "trop beaux", vendeurs anonymes
• **Expertise** : Authentification professionnelle obligatoire
• **Documentation** : Exiger certificats/preuves achat

### Signaux d'Alarme 2025
❌ **Prix cassés** : 50%+ sous marché = suspect
❌ **Perfection** : Trop parfait pour occasion = fake
❌ **Urgence** : Pression temporelle anormale
❌ **Évasion** : Refus expertise/questions techniques

## IMPACT FUTUR MARCHÉ LUXE

### Conséquences Probables
• **Polarisation** : Authentiques vs Super Fakes assumés
• **Technologisation** : Authentification high-tech obligatoire
• **Régulation** : Législation renforcée worldwide
• **Innovation** : Course anti-contrefaçon permanente

La maîtrise des super fakes devient l'expertise ultime du professionnel luxe 2025+. La technologie seule ne suffit plus : il faut combiner high-tech, expertise humaine et veille permanente pour rester compétitif dans ce marché en mutation accélérée.`,
          quiz: {
            questions: [
              {
                question: "Quel est le prix typique d'un Super Fake Birkin ?",
                options: ["$500-800", "$800-1500", "$1500-2500", "$2500+"],
                correct: 2
              },
              {
                question: "Quelle génération de fakes nécessite une expertise technique ?",
                options: ["Génération 1", "Génération 2", "Génération 3", "Toutes"],
                correct: 2
              },
              {
                question: "Quel test révèle les traitements chimiques cachés ?",
                options: ["Aimant", "pH", "UV 365nm", "Poids"],
                correct: 2
              }
            ]
          }
        },
        {
          id: 4,
          title: 'Certification Professionnelle & Accréditations',
          duration: '2h',
          content: `# Certification Professionnelle & Accréditations

## CERTIFICATIONS INTERNATIONALES RECONNUES

### ISA (International Society of Appraisers)
• **Domaine** : Personal Property Appraisal
• **Formation** : 2 ans, 4000h pratique minimum
• **Examen** : Écrit + oral, cas pratiques
• **Spécialisations** : Fine Arts, Decorative Arts, Jewelry
• **Reconnaissance** : Tribunaux, assurances, succession
• **Coût** : $3000-5000 formation complète
• **Renouvellement** : Formation continue 40h/2ans

### AAA (American Appraisers Association)
• **Prestige** : Fondée 1949, référence mondiale
• **Niveaux** : Member → Senior Member → Fellow
• **Requirements** : Diplôme + 5 ans expérience
• **Examens** : 8h écrit + défense orale
• **Spécialités** : Luxury Goods, Fine Arts, Collectibles
• **Salaire moyen** : $75,000-150,000/an
• **Network** : 5000+ professionnels mondiaux

### USPAP Compliance
• **Standard** : Uniform Standards Professional Appraisal
• **Obligation légale** : USA, Canada, adoption internationale
• **Formation** : 15h initiale + 7h/2ans maintenance
• **Enjeux** : Responsabilité légale, assurance E&O
• **Documentation** : Rapports standardisés obligatoires

## CERTIFICATIONS SPÉCIALISÉES LUXE

### Gemological Institute of America (GIA)
• **Graduate Gemologist** : Référence mondiale bijoux
• **Formation** : 6 mois campus ou 12 mois distance
• **Coût** : $21,000-28,000 programme complet
• **Spécialisations** : Diamonds, Colored Stones, Pearls
• **Tools training** : Microscope, spectroscope, etc.
• **Recognition** : Cartier, Tiffany, Bulgari hiring preference

### Swiss Gemmological Institute (SSEF)
• **European standard** : Équivalent européen GIA
• **Basel location** : Cœur industrie horlogerie suisse
• **Spécialités** : Coloured gemstones, treatments detection
• **Research focus** : Publications scientifiques référence
• **Industry ties** : Partenariats maisons suisses

### Horological Society of New York (HSNY)
• **Watchmaking** : Formation horlogerie complète
• **History focus** : Expertise montres vintage/antique  
• **Certification** : Certified Watch Appraiser (CWA)
• **Duration** : 18 mois formation intensive
• **Partnerships** : Patek Philippe, Rolex training access

## FORMATIONS MAISONS DE LUXE

### Hermès Petit H Workshop
• **Accès** : Sur invitation uniquement
• **Programme** : Immersion artisanat, histoire marque
• **Participants** : 20 max/session, professionnels sélectionnés
• **Bénéfice** : Réseau exclusif, expertise reconnue
• **Certification** : Attestation Hermès (valeur inestimable)

### LVMH Institut des Métiers d'Excellence
• **Objectif** : Transmission savoir-faire traditionnel
• **Formations** : Maroquinerie, joaillerie, horlogerie
• **Centres** : France, Suisse, Italie
• **Sélection** : Dossier + entretien rigoureux
• **Débouchés** : Recrutement prioritaire groupe

### Chanel Métiers d'Art
• **Focus** : Techniques artisanales d'exception
• **Ateliers** : Lesage, Massaro, Goossens, etc.
• **Programme** : Compagnonnage moderne
• **Reconnaissance** : UNESCO Intangible Heritage
• **Réseau** : Accès fournisseurs exclusifs

## BUSINESS CERTIFICATIONS COMPLÉMENTAIRES

### Certified Personal Property Appraiser (CPPA)
• **Focus** : Évaluation patrimoniale privée
• **Clientèle** : UHNW individuals, family offices
• **Formation** : 200h théorique + 1000h pratique
• **Spécialisations** : Collections, art, luxury goods
• **Revenus** : $500-2000/jour expertise

### ASA (American Society of Appraisers)
• **Business Valuation** : Certified in luxury retail
• **Applications** : M&A, succession, fiscalité
• **Requirements** : MBA/CPA + 5 ans expérience
• **Examens** : Financier + sectoriel luxe
• **Opportunités** : Conseil stratégique maisons

### FRP (Financial Risk Professional)
• **Risk Management** : Spécialisation luxury assets
• **Applications** : Assurance, investissement, hedge funds
• **Modules** : Market risk, operational risk, credit risk
• **Luxury focus** : Volatilité, liquidité, authentification
• **Career path** : Risk manager banques privées

## PROCESSUS CERTIFICATION TYPE

### Phase 1 : Prérequis (6-12 mois)
• **Formation initiale** : Histoire art/luxe, business
• **Expérience** : Stage/emploi secteur minimum 2 ans
• **Portfolio** : 50 évaluations supervisées minimum
• **Recommandations** : 3 professionnels reconnus

### Phase 2 : Formation Intensive (12-24 mois)
• **Cours théoriques** : 400h minimum selon certification
• **Travaux pratiques** : 200 évaluations complètes
• **Mémoire** : Recherche originale, soutenance
• **Réseau** : Participation conférences, associations

### Phase 3 : Examens & Validation
• **Écrit** : 8h, cas pratiques complexes
• **Oral** : Présentation expertise devant jury
• **Practical** : Évaluation en conditions réelles
• **Background check** : Intégrité, références

### Phase 4 : Maintien Certification
• **Formation continue** : 40h/2ans minimum
• **Pratique** : Volume minimum évaluations/an
• **Éthique** : Respect code déontologie strict
• **Peer review** : Évaluations croisées confrères

## BUSINESS MODEL CERTIFIÉ

### Tarification Professionnelle
• **Évaluation standard** : $200-500/pièce
• **Expertise complexe** : $500-2000/dossier  
• **Consulting** : $300-800/heure
• **Formation** : $2000-5000/jour
• **Testimony** : $500-1500/heure tribunal

### Clientèle Cible
• **Particuliers UHNW** : Collections privées
• **Assurances** : Expertise sinistres, souscription
• **Auction houses** : Catalogage, estimations
• **Law firms** : Divorces, successions, fraudes
• **Banks** : Collatéral luxury assets

### Développement Business
• **Spécialisation** : Focus 2-3 catégories maximum
• **Geographic** : Rayonnement régional/national
• **Partnerships** : Lawyers, insurers, dealers
• **Technology** : CRM, documentation digitale
• **Marketing** : Conférences, publications, media

## ÉVOLUTION CARRIÈRE CERTIFIÉE

### Junior Level (0-3 ans)
• **Salary** : $40,000-60,000
• **Role** : Assistant appraiser, researcher
• **Development** : Mentorship, certification prep
• **Skills** : Technical, software, communication

### Senior Level (3-8 ans)  
• **Salary** : $75,000-120,000
• **Role** : Independent appraiser, specialist
• **Business** : Client development, complex cases
• **Teaching** : Formation junior, conferences

### Expert Level (8+ ans)
• **Income** : $150,000-500,000+
• **Role** : Court expert, consultant, educator
• **Recognition** : Industry leader, media expert
• **Legacy** : Methodology development, next gen training

La certification professionnelle n'est pas juste un diplôme : c'est l'entrée dans un écosystème d'excellence où expertise, intégrité et réseau se combinent pour créer une carrière luxury distinctive et lucrative.`,
          quiz: {
            questions: [
              {
                question: "Quelle est la durée minimum de pratique pour l'ISA ?",
                options: ["2000h", "4000h", "6000h", "8000h"],
                correct: 1
              },
              {
                question: "Quel coût pour le programme GIA Graduate Gemologist ?",
                options: ["$15,000", "$21,000-28,000", "$35,000", "$50,000+"],
                correct: 1
              },
              {
                question: "Tarif horaire consulting expert certifié ?",
                options: ["$100-200", "$300-800", "$1000-1500", "$2000+"],
                correct: 1
              }
            ]
          }
        },
        {
          id: 5,
          title: 'Cas Pratiques & Exercices Réels',
          duration: '3h',
          content: `# Cas Pratiques & Exercices Réels

## EXERCICE 1 - BIRKIN AUTHENTICATION CHALLENGE

### Contexte
Client apporte Birkin 30 Togo Gold, prétendument 2019, acheté "boutique Hermès Monaco" pour 12,000€. Demande évaluation assurance 15,000€.

### Observations Initiales
• **Aspect général** : Excellent état apparent
• **Proportions** : 30cm exactement, proportions correctes
• **Cuir** : Togo authentique au toucher, grain naturel
• **Couleur** : Or classique Hermès, cohérente
• **Hardware** : Palladium, poids correct, gravures nettes

### Examen Détaillé - Points Suspects
• **Code série** : Y carré (2020) - Incohérence date achat
• **Coutures** : Trop parfaites, régularité machine
• **Dust bag** : Papier légèrement différent (brillance)
• **Box** : Coins usure artificielle, pas naturelle  
• **Facture** : Monaco store code incorrect format

### Tests Techniques
• **Microscope x100** : Grain cuir naturel confirmé
• **UV test** : Révèle traitement patine artificielle
• **Aimant** : Hardware non-magnétique ✓
• **Poids** : 850g (authentique = 820-880g) ✓
• **Entrupy scan** : INCONCLUSIVE (rare)

### Conclusion & Décision
**VERDICT** : Contrefaçon sophistiquée (super fake)
**Arguments décisifs** :
- Incohérence temporelle code/achat
- Coutures machine déguisées sellier
- Patine UV-visible artificielle
- Documentation douteuse

**Action** : Refus évaluation, conseil authentification officielle

### Analyse Post-Mortem
• **Coût fake** : Estimé $1800-2200
• **Qualité** : 95/100 vs authentique
• **Piège évité** : Évaluation erronée $15,000
• **Client** : Probablement dupé, pas fraudeur
• **Leçon** : Tests multiples indispensables

## EXERCICE 2 - CHANEL VINTAGE DILEMMA

### Situation
Succession familiale, Classic Flap Medium années 80, grand-mère achetée "Rue Cambon 1985". Héritiers vente estimation.

### Première Inspection
• **État** : Patine naturelle magnifique
• **Cuir** : Caviar vintage grain plus prononcé
• **Chaîne** : Dorée, entrelacs parfait, patine cohérente
• **Matelassé** : Proportions period-correct
• **CC lock** : Mécanisme fluide, alignement parfait

### Défis d'Authentification
• **Code série absent** : Normal avant 1986
• **Style évolution** : Proportions différentes actuelles
• **Usure naturelle** : vs détérioration/réparations
• **Documentation** : Aucune (normale époque)
• **Comparaison** : Références vintage rares

### Recherche Historique
• **Archives Chanel** : Contact service patrimoine
• **Period catalogs** : Vogue, Harper's Bazaar 1985
• **Collectors networks** : Expertise communauté
• **Auction records** : Comparables vendus
• **Family testimony** : Circonstances achat détaillées

### Éléments Authentification
✅ **Cuir caviar** : Grain period-appropriate
✅ **Hardware aging** : Patine naturelle dorée
✅ **Construction** : Techniques traditionelles
✅ **Proportions** : Exactes pour 1985
✅ **Wear patterns** : Cohérents usage 40 ans

### Estimation Complexe
• **État** : 7.5/10 malgré âge (excellent preservation)
• **Rareté** : Vintage authentique premium +30%
• **Demande** : Collectionneurs vintage forte
• **Comparables** : $4500-6500 selon état
• **Estimation finale** : $5800 (confidence 90%)

### Recommandations Famille
• **Conservation** : Climat contrôlé, dust bag
• **Vente** : Auction house spécialisé vintage
• **Documentation** : Photos HD, historique familial
• **Timing** : Marché vintage porteur 2025
• **Alternatives** : Conservation patrimoniale vs liquidité

## EXERCICE 3 - ROLEX SUBMARINER FORENSICS

### Cas Complexe
Submariner 16610 "1999", vendu comme "Full Set" papiers/box, prix 8500€. Acheteur méfiant demande expertise pre-purchase.

### Red Flags Immédiats
• **Prix** : 15-20% sous marché (red flag)
• **Photos** : Qualité faible, angles limités
• **Vendeur** : Nouveau compte, localisations floues
• **Urgence** : Pression temporelle anormale
• **Paiement** : Préférence cash uniquement

### Expertise Physique
• **Serial** : Y999999 (format correct 1999)
• **Case** : Poli excessif, lugs affinés (over-polished)  
• **Bracelet** : Stretch anormal, links usés
• **Dial** : Tritium dots patine incohérente
• **Movement** : Cal 3135, mais...

### Tests Approfondis
• **Loupe x10** : "ROLEX" coronet mal aligné
• **UV light** : Tritium response variable plots
• **Timing** : +15 sec/jour (service nécessaire)
• **Caseback** : Microscopic scratches tools non-Rolex
• **Papers** : Format correct mais papier suspect

### Discoveries Critiques
❌ **Service non-officiel** : Pièces aftermarket détectées
❌ **Dial refinished** : Original patine retirée
❌ **Hands replaced** : Non period-correct
❌ **Case polished** : Over-restoration majeure
❌ **Papers forged** : Watermark/impression différente

### Verdict Final
**STATUS** : Authentique mais excessivement modifiée
**Valeur** : 40-50% prix authentique préservée
**Issues** : Collector value détruite
**Recommendation** : Négociation 4500€ maximum
**Alternatives** : Chercher exemple preservé

### Learning Points
• **Preservation > restauration** : Patine = valeur
• **Service history** : Documentation cruciale
• **Market knowledge** : Prix = signal qualité
• **Patience** : Bon exemple vaut l'attente
• **Network** : Dealers réputés vs individus

## EXERCICE 4 - LOUIS VUITTON AUTHENTICITY MATRIX

### Challenge Multi-Pièces
Lot 10 pièces LV diverses époques, client liquidation rapide, demande évaluation globale express (2h).

### Stratégie Triage Rapide
1. **Visual screening** : Élimination fakes évidents
2. **Date codes** : Cohérence format/époque
3. **Priority ranking** : Valeur potentielle décroissante
4. **Detail focus** : 3 pièces highest value
5. **Batch pricing** : Estimation conservatrice ensemble

### Pièces Analysées
1. **Speedy 30 Monogram** : 1990s, bon état
2. **Neverfull MM Damier** : 2015, excellent
3. **Twist PM cuir** : 2018, neuf avec box
4. **Artsy GM Monogram** : 2012, usure normale
5. **Keepall 55** : Vintage 1980s, patine
6. **Wallet Zippy** : Damier, état moyen
7. **Scarf carré** : Édition limitée 2020
8. **Shoes sneakers** : Archlight 2019
9. **Belt reversible** : Damier/cuir 2021
10. **Keychain** : Bag charm récent

### Authentification Express
• **Codes cohérents** : 9/10 (1 suspect eliminé)
• **Construction** : Traditional LV quality ✓
• **Materials** : Toile/cuir authentiques ✓  
• **Hardware** : Laiton doré correct ✓
• **Patina** : Natural aging 5 oldest pieces ✓

### Évaluation Rapide
• **Speedy 30** : $450 (good condition)
• **Neverfull MM** : $650 (excellent + popular)
• **Twist PM** : $1200 (recent + box + rare)
• **Artsy GM** : $400 (used but functional)
• **Keepall 55** : $350 (vintage appeal)
• **Accessories** : $600 combined
• **TOTAL** : $3650 conservative estimate

### Time Management
• **2h deadline** : Respecté (115 minutes)
• **Efficiency** : Experience + methodology
• **Risk mitigation** : Conservative pricing
• **Client satisfaction** : Transparent process
• **Follow-up** : Detailed report next day

## EXERCICE 5 - INSURANCE CLAIM INVESTIGATION

### Scenario
Cambriolage domicile, vol 15 pièces luxe déclarées 85,000€. Assurance demande expertise contradictoire, soupçons fraude.

### Anomalies Déclaration
• **Timing** : Police souscrite 3 mois avant
• **Values** : Évaluations très optimistes
• **Documentation** : Photos floues, factures photocopies
• **Inventory** : Marques/modèles très précis
• **Behavior** : Nervosité client, détails changeants

### Investigation Protocol
1. **Photos analysis** : Metadata, resolution, backgrounds
2. **Purchase verification** : Boutiques contacted
3. **Previous appraisals** : Evaluateurs contactés
4. **Comparable research** : Market values actuelles
5. **Timeline construction** : Chronologie achats/vol

### Découvertes Troublantes
❌ **Fake photos** : Stock images internet identifiées
❌ **Inflated values** : 200-300% au-dessus marché
❌ **Phantom purchases** : Aucune trace boutiques
❌ **Timing suspect** : Augmentation couverture récente
❌ **Criminal record** : Antécédents fraude assurance

### Rapport d'Expertise
**CONCLUSION** : Tentative fraude caractérisée
**PREUVES** : 
- Photos falsifiées prouvées
- Achats inventés vérifiés
- Évaluations fantaisistes
- Pattern comportemental suspect

**RECOMMENDATION** : Rejet claim + signalement

### Impact Business
• **Honoraires** : $5000 investigation (24h)
• **Assureur** : $85,000 économisés
• **Réputation** : Expertise forensique reconnue
• **Network** : Collaborations assurances renforcées
• **Spécialisation** : Niche investigation developed

## MÉTHODOLOGIE GÉNÉRALE - LESSONS LEARNED

### Success Factors
1. **Systematic approach** : Checklist rigoureuse
2. **Technology integration** : Outils + expertise humaine
3. **Network leverage** : Experts, databases, resources
4. **Documentation** : Every step recorded
5. **Continuous learning** : Each case = experience

### Common Pitfalls
❌ **Rush judgment** : Première impression trompeuse
❌ **Single criterion** : Un détail ne suffit jamais
❌ **Overconfidence** : Doute = second opinion
❌ **Technology dependence** : Outils aids, not replacement
❌ **Client pressure** : Intégrité > relation commerciale

### Professional Standards
• **Integrity first** : Vérité avant profit
• **Competence boundaries** : Specialist referrals
• **Confidentiality** : Client information protected
• **Continuous education** : Skills maintenance
• **Peer collaboration** : Knowledge sharing

Ces cas pratiques illustrent la complexité croissante de l'authentification luxury et l'importance d'une approche méthodique, technologique et collaborative pour maintenir l'excellence professionnelle dans ce secteur en évolution rapide.`,
          quiz: {
            questions: [
              {
                question: "Dans l'exercice Birkin, quel était l'indice décisif ?",
                options: ["Code série incohérent", "Cuir synthétique", "Poids incorrect", "Prix trop bas"],
                correct: 0
              },
              {
                question: "Pour un Chanel vintage 1985, que faire si le code série est absent ?",
                options: ["Rejeter automatiquement", "C'est normal avant 1986", "Demander expertise", "Prix diminué -50%"],
                correct: 1
              },
              {
                question: "Dans l'enquête assurance, combien a été économisé ?",
                options: ["$15,000", "$45,000", "$85,000", "$125,000"],
                correct: 2
              }
            ]
          }
        }
      ]
    },
    // MODULE 3: Business & Monétisation
    {
      id: 3,
      title: 'Business & Monétisation',
      description: 'Transformer l\'expertise en revenus durables',
      chapters: 6,
      duration: '15h',
      level: 'Avancé',
      color: 'blue',
      progress: 0,
      icon: Briefcase,
      chapters_list: [
        {
          id: 1,
          title: 'Création d\'Entreprise Luxe - Cadre Juridique',
          duration: '2h30',
          content: `# Création d'Entreprise Luxe - Cadre Juridique

## CHOIX DE STRUCTURE JURIDIQUE

### SARL (Société à Responsabilité Limitée)
• **Capital minimum** : 1€ symbolique
• **Associés** : 2-100, responsabilité limitée aux apports
• **Gérance** : Gérant majoritaire ou minoritaire
• **Fiscalité** : Impôt Société (25%) ou option IR
• **Social** : Gérant majoritaire = TNS, minoritaire = salarié
• **Avantages** : Flexibilité, crédibilité, protection patrimoine
• **Inconvénients** : Formalités, comptabilité obligatoire

### EURL (Entreprise Unipersonnelle à Responsabilité Limitée)
• **Associé unique** : Personne physique ou morale
• **Capital** : 1€ minimum, libération immédiate
• **Gérance** : Gérant = associé unique généralement
• **Fiscalité** : IR par défaut, option IS possible
• **Social** : Gérant = TNS sauf option salariat
• **Evolution** : Transformation SARL facile
• **Idéal** : Démarrage activité solo

### SAS/SASU (Société par Actions Simplifiée)
• **Flexibilité statuts** : Organisation libre
• **Capital** : Pas de minimum, libération échelonnée
• **Dirigeant** : Président obligatoire, régime salarié
• **Associés** : Illimité, entrées/sorties facilitées
• **Fiscalité** : IS obligatoire, distributions flexibles
• **Avantages** : Statut social dirigeant, crédibilité
• **Usage** : Projets d'envergure, levées fonds futures

### Auto-Entrepreneur / Micro-Entreprise
• **Simplicité** : Déclaration en ligne, comptabilité minimale
• **Plafonds 2025** : 77,700€ prestations services
• **Charges** : 22% prestations intellectuelles
• **Franchise TVA** : Jusqu'aux plafonds
• **Limite** : Pas d'associés, croissance limitée
• **Idéal** : Test activité, complément revenus

## SPÉCIFICITÉS SECTEUR LUXE

### Activités Réglementées
• **Expert en objets d'art** : Formation/expérience obligatoire
• **Commissaire-priseur** : Monopole ventes judiciaires
• **Antiquaire** : Déclaration préfecture obligatoire
• **Bijoutier** : Déclaration matières précieuses
• **Horloger** : Réparation = activité artisanale

### Obligations Déclaratives
• **INPI** : Dépôt marques si création
• **Douanes** : Commerce international matières précieuses
• **TRACFIN** : Déclaration seuils (>10,000€)
• **Préfecture** : Objets d'art, antiquités
• **Chambre syndicale** : Adhésion recommandée

### Assurances Indispensables
• **RC Professionnelle** : Minimum 150,000€
• **RC Produit** : Défauts authentification
• **Assurance marchandises** : Transit, stockage
• **Protection juridique** : Litiges clients/fournisseurs
• **Cyber-assurance** : Données clients, e-commerce

## FISCALITÉ OPTIMISÉE LUXE

### TVA - Régimes Spéciaux
• **Marge bénéficiaire** : Objets d'art, antiquités
• **Taux réduit** : 5.5% œuvres d'art (conditions)
• **Import/Export** : Régimes suspensifs
• **Franchise** : Micro-entreprise jusqu'aux seuils
• **Intracommunautaire** : UE, déclarations DEB

### Impôts Sociétés - Optimisation
• **Taux réduit** : 15% jusqu'à 42,500€ bénéfice
• **Report déficits** : Pertes déductibles 10 ans
• **Provision** : Dépréciation stocks possible
• **Frais généraux** : Formations, salons, expertise
• **Véhicule société** : Amortissement limité luxe

### Charges Sociales - Stratégies
• **ACCRE/ACRE** : Réduction charges nouvelles entreprises
• **TNS vs Salarié** : Arbitrage coût/protection
• **Dividendes** : Flat tax 30% vs progressif IR
• **Retraite complémentaire** : Madelin, Article 83
• **Prévoyance** : Déductibilité majorée dirigeant

## FINANCEMENT SPÉCIALISÉ

### Apport Personnel Optimisé
• **Stock initial** : 10,000-50,000€ selon activité
• **Matériel expertise** : 5,000-15,000€
• **Fonds roulement** : 3-6 mois charges
• **Assurances** : 2,000-5,000€/an
• **Marketing** : 5,000-10,000€ lancement

### Prêts Bancaires Sectoriels
• **Prêt création** : Bpifrance, garanties partielles
• **Crédit équipement** : Matériel expertise, véhicule
• **Affacturage** : Préfinancement créances clients
• **Crédit stock** : Marchandises, garanties physiques
• **Découvert** : Trésorerie quotidienne

### Financements Alternatifs
• **Business angels** : Secteur luxe, apport réseau
• **Crowdfunding** : Projets innovants, communauté
• **Love money** : Famille/amis, cadre juridique
• **Partenariats** : Fournisseurs, clients, co-entreprise
• **Subventions** : Région, Europe, innovation

## PROTECTION JURIDIQUE AVANCÉE

### Propriété Intellectuelle
• **Dépôt marque** : Nom commercial, logo
• **Nom domaine** : Protection tous extensions
• **Droit auteur** : Méthodes, formations, contenus
• **Savoir-faire** : Clause confidentialité collaborateurs
• **Concurrence** : Clause non-concurrence cadres

### Contrats Types Essentiels
• **Conditions générales vente** : Protection maximale
• **Contrat expertise** : Limitations responsabilité
• **Accord confidentialité** : Clients, partenaires
• **Mandat vente** : Commission, exclusivité
• **Contrat travail** : Clauses spécialisées luxe

### Gestion Risques Juridiques
• **Responsabilité civile** : Limitation contractuelle
• **Pénal** : Recel, blanchiment, contrefaçon
• **Conformité RGPD** : Données clients, prospects
• **Droit consommation** : Garanties, rétractation
• **International** : Conventions, juridictions

## DÉVELOPPEMENT BUSINESS MODEL

### Streams de Revenus
• **Expertise/Authentification** : 50-500€/pièce
• **Formation professionnelle** : 1,000-5,000€/jour
• **Conseil stratégique** : 500-1,500€/heure
• **Vente commission** : 10-25% prix final
• **Abonnement veille** : 100-500€/mois

### Segmentation Clientèle
• **Particuliers fortunés** : Collections privées
• **Professionnels** : Antiquaires, galeries
• **Institutionnels** : Assurances, banques
• **Services publics** : Douanes, justice
• **International** : Expertise cross-border

### Stratégie Prix Value-Based
• **Expertise standard** : Coût + marge 50-100%
• **Urgence** : Majorations 50-200%
• **Complexité** : Facturation au temps passé
• **Volume** : Dégressivité 10-30%
• **Récurrence** : Fidélisation, contrats annuels

## SCALING & EXPANSION

### Growth Strategies
• **Géographique** : Autres régions/pays
• **Verticale** : Nouvelles catégories objets
• **Horizontale** : Services complémentaires
• **Partenariats** : Réseau experts, prescripteurs
• **Franchising** : Modèle réplicable

### Team Building Luxe
• **Profil co-fondateur** : Compétences complémentaires
• **Experts seniors** : Credibilité, formation juniors
• **Commerciaux spécialisés** : Réseau, négociation
• **Backoffice** : Juridique, comptable, digital
• **International** : Correspondants locaux

### Innovation Continue
• **Technologie** : IA, blockchain, AR/VR
• **Méthodes** : Expertise, formation, certification
• **Marchés** : Émergents, générations nouvelles
• **Produits** : Services premium, niches
• **Partnerships** : Startups, corporates, institutions

## SUCCESS METRICS & KPIs

### Financial KPIs
• **CA mensuel** : Croissance 15-25%/an
• **Marge brute** : >70% activité expertise
• **Coûts acquisition** : <20% lifetime value client
• **Cash flow** : Positif dès mois 6-12
• **ROI marketing** : >300% première année

### Operational KPIs
• **Taux expertise correcte** : >95%
• **Délai moyen** : <48h expertise standard
• **Satisfaction client** : >4.5/5
• **Taux récurrence** : >40% clients
• **Réseau prescripteurs** : 50+ professionnels

### Strategic KPIs
• **Part marché locale** : Leadership 3-5 ans
• **Recognition** : Media, associations professionnelles
• **Certification level** : Niveau expert reconnu
• **International** : Clients/partenaires étrangers
• **Innovation** : Brevets, méthodes propriétaires

La réussite entrepreneuriale dans le luxe combine excellence technique, business model robuste et vision long terme. Le cadre juridique solide constitue la fondation permettant la croissance durable et la création de valeur patrimoniale.`,
          quiz: {
            questions: [
              {
                question: "Capital minimum pour créer une SARL ?",
                options: ["1€", "1,000€", "7,500€", "37,000€"],
                correct: 0
              },
              {
                question: "Plafond auto-entrepreneur prestations services 2025 ?",
                options: ["32,900€", "77,700€", "176,200€", "Pas de plafond"],
                correct: 1
              },
              {
                question: "Marge brute cible activité expertise ?",
                options: [">50%", ">70%", ">80%", ">90%"],
                correct: 1
              }
            ]
          }
        },
        {
          id: 2,
          title: 'Sourcing & Approvisionnement Professionnel',
          duration: '3h',
          content: `# Sourcing & Approvisionnement Professionnel

## OUTLETS & VENTES PRIVÉES HERMÈS

### Accès aux Outlets Hermès
• **Localisation** : Pontet (84), Marne-la-Vallée (77)
• **Conditions** : Client Hermès historique, invitations
• **Fréquence** : 2-3 fois/an, dates confidentielles
• **Réductions** : 30-50% prix boutique
• **Stock** : Ancienne collection, pièces uniques, samples
• **Stratégie** : Relation SA, historique achats, patience

### Ventes Personnel Hermès
• **Access** : Employés actuels/anciens + famille
• **Timing** : Avant Noël généralement
• **Produits** : Toute gamme disponible
• **Réductions** : 40% employés, 30% famille
• **Limites** : Quotas par personne, pas de revente immédiate
• **Réseau** : Contacts internes précieux

### Hermès Sample Sales
• **Paris** : Rue Saint-Honoré, vente échantillons
• **Conditions** : Liste VIP, cooptation uniquement  
• **Produits** : Prototypes, modèles défilé
• **Prix** : 50-70% réduction prix public
• **Rareté** : Pièces uniques, collectors potentiels
• **Timing** : Post-défilés, clearance annuelle

## WHOLESALE LUXURY - CIRCUITS B2B

### Grossistes Maroquinerie
• **Italie** : Florence, Milano, contacts tanneries
• **France** : Région lyonnaise, traditions cuir
• **Turquie** : Istanbul, qualité croissante
• **Portugal** : Expertise artisanale reconnue
• **Conditions** : MOQ 50-100 pcs, paiement comptant

### Importateurs Exclusifs
• **Scandinavie** : Accès marques nordiques rares
• **Japon** : Import/export différentiels prix
• **USA** : Grey market, authentiques détaxés
• **Suisse** : Montres, duty-free advantages
• **Singapour** : Hub Asie, free trade zone

### Trade Shows Professionnels
• **Première Classe** : Paris, marques émergentes
• **Pitti Uomo** : Florence, excellence italienne  
• **BaselWorld** : Horlogerie, networking essentiel
• **Vicenzaoro** : Bijouterie, or, pierres précieuses
• **Who's Next** : Paris, prêt-à-porter luxe accessible

## CONTACTS PRIVILÉGIÉS - NETWORK BUILDING

### Développement Réseau Boutiques
• **Sales Associates** : Relations personnelles, info stock
• **Store managers** : Allocations privilégiées, previews
• **Regional managers** : Vision stratégique, opportunities
• **Brand ambassadors** : Accès événements, networking
• **Anciens employees** : Contacts industriels précieux

### Méthode Approche Professionnelle
• **Authenticity first** : Jamais mentir sur intentions
• **Value proposition** : Qu'apportez-vous en échange ?
• **Long term vision** : Relations durables vs opportunisme
• **Reciprocity** : Services mutuels, gagnant-gagnant
• **Discrétion** : Confidentialité absolue requise

### Maintenance Relations
• **Regular contact** : News secteur, félicitations
• **Gifts & invitations** : Attention personnalisée
• **Referrals** : Recommandations clients qualifiés
• **Market intelligence** : Partage info non-sensible
• **Professional development** : Formation, événements

## INTERNATIONAL ARBITRAGE OPPORTUNITIES

### Price Differentials by Region
• **Japan** : -15/25% vs Europe (VAT, forex)
• **USA** : -10/20% selon état, détaxe touriste
• **Hong Kong** : Duty free, prix attractifs Asie
• **Europe continentale** : Variations TVA 17-27%
• **UK post-Brexit** : Opportunities spécifiques

### Logistique Import/Export
• **Déclarations douanes** : Valeur réelle obligatoire
• **Assurance transport** : Coverage intégrale nécessaire
• **Documents** : Factures, certificats authenticity
• **Timing** : Délais incompressibles, planning
• **Costs structure** : Transport, assurance, douane, TVA

### Legal & Regulatory
• **Warranty transfert** : Conditions par marque
• **Taxes** : TVA, droits douane, déclarations
• **Compliance** : Règlementations import/export
• **Insurance** : Coverage internationale requise
• **Dispute resolution** : Juridictions, arbitrage

## VENTES AUX ENCHÈRES - SOURCING PROFESSIONNEL

### Auction Houses Strategies
• **Christie's** : Luxury goods, international reach
• **Sotheby's** : Fine arts, jewelry, wines
• **Bonhams** : Specialists, niche categories
• **Régionales** : Opportunities local, moins concurrence
• **Online** : Catawiki, LiveAuctioneers, accessibilité

### Pre-Auction Intelligence
• **Condition reports** : Expertise détaillée pré-vente
• **Provenance research** : Historique, authenticity
• **Market comparables** : Prix récents similaires
• **Reserve prices** : Négociation pré-vente possible
• **Buyer's premium** : 20-25%, impact budget

### Bidding Strategy Professional
• **Budget setting** : Prix max incluant frais
• **Condition assessment** : Facteur coût restauration
• **Competition analysis** : Profil autres bidders
• **Timing** : Online vs salle, stratégies différentes
• **Relationship building** : Specialists, consignors

## ESTATE SALES & SUCCESSIONS

### Access to Estate Sales
• **Notaires** : Relations, premières informations
• **Succession lawyers** : Clients liquidation
• **Estate sale companies** : Partnerships privilégiées
• **Private dealers** : Réseau professionnel établi
• **Word of mouth** : Réputation, recommandations

### Evaluation Process
• **Inventory assessment** : Catalogue rapide global
• **Authentication priority** : High value items first
• **Condition documentation** : Photos, état détaillé
• **Market research** : Prix actuels comparables
• **Negotiation strategy** : Lot vs individual pricing

### Legal Considerations
• **Succession rights** : Héritiers consensus requis
• **Tax implications** : Plus-values, droits succession
• **Documentation** : Factures, certificats, historique
• **Transport/insurance** : Responsabilité transfert
• **Payment terms** : Conditions, garanties requises

## DIGITAL SOURCING PLATFORMS

### Professional B2B Platforms
• **1stdibs PRO** : Dealers network, wholesale access
• **The RealReal Consignment** : Direct sourcing luxury
• **Vestiaire Collective PRO** : B2B program, bulk deals
• **Rebag Affiliate** : Wholesale opportunities
• **Fashionphile Trade** : Professional trading platform

### Direct Brand Programs
• **LVMH** : Professional relations program
• **Kering** : B2B initiatives sustainability
• **Richemont** : Certified pre-owned programs
• **Independent brands** : Direct relationships possible
• **Emerging designers** : Early partnerships valuable

### Technology Integration
• **Price monitoring** : Automated alerts opportunities
• **Authentication services** : API integrations possible
• **Inventory management** : Real-time tracking systems
• **CRM integration** : Source tracking, ROI analysis
• **Market intelligence** : Data-driven sourcing decisions

## FINANCIAL STRUCTURING & CREDIT

### Supplier Credit Terms
• **Payment terms** : 30-90 jours standard
• **Early payment discounts** : 2-5% si immédiat
• **Credit limits** : Construction progressive
• **Garanties** : Lettres credit, assurance-crédit
• **International** : Documentary credit, forex hedge

### Inventory Financing
• **Stock financing** : Garantie marchandises
• **Consignment deals** : Minimisation cash-flow impact
• **Sale or return** : Accords flexibles fournisseurs
• **Floor planning** : Financement rotation stock
• **Insurance** : Couverture intégrale obligatoire

### Working Capital Optimization
• **Cycle exploitation** : Minimisation besoin fonds
• **Rotation stock** : Accélération turn-over
• **Credit clients** : Limitation délais paiement
• **Trésorerie prévisionnelle** : Planning 12 mois
• **Lines of credit** : Flexibilité financement

## PERFORMANCE METRICS & OPTIMIZATION

### Sourcing KPIs
• **Cost of goods** : <40% prix vente final
• **Lead times** : Réduction délais approvisionnement
• **Quality rate** : >98% authenticity guarantee
• **Inventory turns** : >4x/an objectif minimum
• **Supplier reliability** : On-time delivery >95%

### Financial Performance
• **Gross margin** : >60% average category
• **Working capital** : <90 jours cycle exploitation
• **Cash conversion** : Optimisation flux trésorerie
• **ROI inventory** : Return on investment stock
• **Risk management** : Diversification fournisseurs

### Relationship Management
• **Supplier satisfaction** : Long term partnerships
• **Volume commitments** : Négociation prix/quantité
• **Exclusive arrangements** : Accès privilégié produits
• **Market intelligence** : Information sharing value
• **Innovation collaboration** : Développement produits

Le sourcing professionnel dans le luxe repose sur un équilibre subtil entre relations humaines, expertise technique et intelligence commerciale. La construction d'un réseau de qualité prend du temps mais constitue l'avantage concurrentiel décisif pour un approvisionnement privilégié et rentable.`,
          quiz: {
            questions: [
              {
                question: "Réductions typiques outlets Hermès ?",
                options: ["10-20%", "30-50%", "60-70%", "70-80%"],
                correct: 1
              },
              {
                question: "Différentiel prix Japon vs Europe ?",
                options: ["-5/10%", "-15/25%", "-30/40%", "-50%+"],
                correct: 1
              },
              {
                question: "Objectif rotation stock minimum ?",
                options: [">2x/an", ">4x/an", ">6x/an", ">8x/an"],
                correct: 1
              }
            ]
          }
        },
        {
          id: 3,
          title: 'Plateformes de Vente Optimisation Maximum',
          duration: '3h30',
          content: `# Plateformes de Vente - Optimisation Maximale

## VESTIAIRE COLLECTIVE - STRATÉGIE ADVANCED

### Optimisation Profil Vendeur
• **Professional account** : Demande statut pro (commission réduite)
• **Photo quality** : Studio setup, 10 angles minimum
• **Authentication fast-track** : Relations équipe authentification
• **Boutique branding** : Présentation cohérente, professionnelle
• **Performance metrics** : >98% satisfaction, délai <24h

### Pricing Strategy Advanced
• **Market analysis** : 30 items similaires, prix médian +10%
• **Seasonal timing** : Sacs été en mars, hiver en septembre
• **Promotion cycles** : Eviter periodes high competition
• **Bundle deals** : Lots multiples, marge préservée
• **Price testing** : A/B testing sur produits similaires

### Listings Optimization SEO
• **Keywords research** : Termes recherchés clients
• **Title optimization** : Marque + Modèle + Couleur + État
• **Description rich** : Histoire, détails, authenticity proof
• **Tags pertinents** : Toutes catégories applicables
• **Cross-referencing** : Liens entre vos produits

### Performance Maximization
• **Commission negotiation** : Volume deals possibles
• **Fast-track listings** : Relations équipe validation
• **Promoted listings** : ROI advertising 300%+
• **International shipping** : Marché global accessible
• **Analytics usage** : Data-driven optimization continue

## THE REALREAL - CONSIGNMENT MASTERY

### Consignment Strategy Elite
• **White Glove service** : Collection domicile gratuite >$5000
• **Authentication expertise** : Rapport détaillé inclus
• **Photography professional** : Studio in-house quality
• **Pricing optimization** : Algorithme + expertise humaine
• **Global reach** : Clientèle internationale active

### Revenue Optimization
• **Consignment rates** : 70-85% vous, négociation possible
• **Reserve prices** : Protection prix minimum
• **Promotion timing** : Coordination campaigns marketing
• **Fast payment** : Options accélération paiements
• **Volume bonuses** : Deals préférentiels gros consigners

### Category Specialization
• **Jewelry & Watches** : Expertise poussée, prix premium
• **Bags & Accessories** : Volume fort, rotation rapide
• **Designer Clothing** : Marges élevées pièces rare
• **Fine Art** : Segment ultra-premium expanding
• **Home & Décor** : Nouveaux clients, cross-selling

## REBAG - MODÈLE DISRUPTIF

### Infinite Program Leverage
• **Trade-in credits** : 10% bonus vs cash payout
• **Upgrade facilitation** : Clients récurrents programmes
• **Inventory access** : Rotation stock ultra-rapide
• **Price guarantees** : Engagement prix 7 jours
• **Authenticity certainty** : Processus propriétaire fiable

### B2B Opportunities
• **Wholesale program** : Accès inventory Rebag
• **Authentication services** : API integration possible
• **Market data** : Insights pricing, tendances
• **Corporate partnerships** : Employee benefits programs
• **Franchise model** : Expansion geographical possible

### Technology Integration
• **Mobile app** : Instant quotes, photo evaluation
• **AI pricing** : Algorithme propriétaire précision
• **Inventory tracking** : Real-time availability
• **Customer data** : Behavioral analysis, preferences
• **Omnichannel** : Online/offline expérience unified

## FARFETCH - LUXURY MARKETPLACE GLOBAL

### Boutique Partner Program
• **Application process** : Sélection rigoureuse qualité
• **Commission structure** : 25-35% platform fee
• **Global distribution** : 190 pays accessibles
• **Marketing support** : Campaigns promotionnelles incluses
• **Technology platform** : E-commerce solution complète

### Brand Relationships
• **Direct partnerships** : Accords marques officiels
• **Exclusive launches** : Premiers accès nouveautés
• **Authentication guarantee** : Processus certification
• **Customer service** : Support multi-langues 24/7
• **Returns handling** : Gestion simplifiée vendeurs

### Advanced Analytics
• **Sales performance** : Dashboards temps réel
• **Customer insights** : Demographics, behavior patterns
• **Inventory optimization** : Demand forecasting AI
• **Price positioning** : Competitive analysis automatique
• **Marketing ROI** : Attribution campagnes précise

## CHRONO24 - HORLOGERIE SPÉCIALISÉE

### Dealer Program Professional
• **Verification process** : Contrôle identité rigoureux
• **Commission structure** : 6.5% base + options premium
• **Global audience** : 500,000 visiteurs/jour worldwide
• **Authentication support** : Partenariat experts reconnus
• **Payment security** : Trusted Checkout protection intégrale

### Listing Optimization Watches
• **Photography standards** : 12 photos minimum, macro details
• **Technical specifications** : Mouvement, complications, références
• **Condition reporting** : Système notation standardisé
• **Provenance documentation** : Papiers, box, historique service
• **Price positioning** : Database 500,000+ montres comparables

### Market Intelligence
• **Price trends** : Analytics marché temps réel
• **Brand performance** : Évolution valeurs par modèle
• **Geographic insights** : Demande par région/pays
• **Seasonal patterns** : Cycles vente optimaux
• **Investment tracking** : ROI historique modèles

## 1STDIBS - ULTRA-HIGH-END POSITIONING

### Dealer Application Elite
• **Expertise verification** : Portfolio + références obligatoires
• **Inventory quality** : Standards élevés authentication
• **Customer service** : White glove service requis
• **Global shipping** : Logistique internationale maîtrisée
• **Insurance coverage** : Protection intégrale transit/stockage

### Premium Positioning Strategy
• **Price premium** : 20-40% vs autres plateformes
• **Clientèle UHNW** : Ultra-high net worth individuals
• **Curatorial approach** : Sélection éditoriale quality
• **Storytelling** : Narratives riches, provenances exceptionnelles
• **Exclusivity marketing** : Limited availability messaging

### Revenue Optimization Advanced
• **Commission rates** : 12-18% selon catégorie/volume
• **Featured listings** : Premium placement ROI élevé
• **Trade program** : B2B sales to decorators/designers
• **Auction integration** : Cross-selling opportunities
• **Concierge services** : Support clients ultra-premium

## LUXURY PROMISE - FRANCE FOCUS

### Local Market Advantage
• **French clientele** : Préférence plateforme nationale
• **Authentication locale** : Experts Paris-based
• **Shipping domestique** : Délais réduits, coûts moindres
• **Language localization** : Service client français natif
• **Tax optimization** : TVA française, simplicité fiscale

### Commission Structure Competitive
• **Base rates** : 15-20% selon volume
• **Volume discounts** : Négociables gros vendeurs
• **Fast payment** : 48h post-transaction
• **No listing fees** : Commission success-only
• **Marketing included** : Promotion products automatique

## MULTI-PLATFORM STRATEGY OPTIMIZATION

### Channel Mix Optimal
• **Vestiaire Collective** : 40% volume, brands accessible
• **The RealReal** : 25% value, pièces premium
• **Rebag** : 15% quick sales, inventory rotation
• **Chrono24** : 20% watches exclusively
• **Niche platforms** : Opportunités spécifiques segments

### Inventory Allocation
• **Price segmentation** : Platform par gamme prix
• **Geographic optimization** : Audiences par région
• **Category specialization** : Expertise par plateforme
• **Timing coordination** : Éviter cannibalisation
• **Performance tracking** : ROI par canal, optimization

### Operational Efficiency
• **Centralized photography** : Studio setup professional
• **Batch processing** : Listings multiples simultanées
• **Inventory management** : System unified tracking
• **Customer service** : Response templates, automation
• **Analytics consolidation** : Dashboard unique performance

## EMERGING PLATFORMS & OPPORTUNITIES

### Social Commerce Integration
• **Instagram Shopping** : Product tags, direct sales
• **Facebook Marketplace** : Local luxury opportunities
• **WhatsApp Business** : Direct client communication
• **WeChat** : Marché chinois access crucial
• **TikTok Shop** : Generation Z engagement

### Blockchain & NFT Platforms
• **Authentication certificates** : NFT proof ownership
• **Luxury NFTs** : Digital collectibles market
• **Crypto payments** : Bitcoin, stablecoins acceptance
• **Decentralized marketplaces** : OpenSea luxury categories
• **Smart contracts** : Automated escrow, royalties

### AI-Powered Platforms
• **Predictive pricing** : Machine learning optimization
• **Customer matching** : AI buyer-seller connections
• **Authentication automation** : Computer vision advances
• **Inventory optimization** : Demand forecasting AI
• **Personalization** : Customized shopping experiences

## PERFORMANCE METRICS & OPTIMIZATION

### Key Performance Indicators
• **Conversion rate** : Visits to sales >5%
• **Average selling price** : Premium vs comparables
• **Time to sale** : <30 jours objectif
• **Customer retention** : Repeat buyers >40%
• **Gross margin** : >60% after all fees

### Continuous Optimization Process
• **A/B testing** : Photos, descriptions, prix
• **Customer feedback** : Reviews analysis, improvements
• **Competition monitoring** : Price positioning, features
• **Platform updates** : Algorithm changes, adaptations
• **Technology integration** : Automation, efficiency gains

### ROI Maximization Strategies
• **Portfolio approach** : Diversification risk/reward
• **Reinvestment strategy** : Profits into inventory growth
• **Brand building** : Long-term value creation
• **Network effects** : Client base expansion organic
• **Innovation adoption** : Early mover advantages nouvelles plateformes

La maîtrise des plateformes de vente luxury requiert une approche scientifique combinant excellence opérationnelle, intelligence marketing et adaptation technologique continue. Le succès durable provient de l'optimisation systématique et de l'innovation constante dans un écosystème digital en évolution rapide.`,
          quiz: {
            questions: [
              {
                question: "Commission Vestiaire Collective compte professionnel ?",
                options: ["8-12%", "15-20%", "25-30%", "Réduite vs standard"],
                correct: 3
              },
              {
                question: "Taux consignation The RealReal ?",
                options: ["50-60%", "60-70%", "70-85%", "85-95%"],
                correct: 2
              },
              {
                question: "Objectif taux conversion visites/ventes ?",
                options: [">2%", ">5%", ">8%", ">10%"],
                correct: 1
              }
            ]
          }
        },
        // Continuer avec les autres chapitres du module 3...
      ]
    },
    // Ajouter les modules 4 et 5 également...
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