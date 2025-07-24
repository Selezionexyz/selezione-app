import React, { useState } from 'react';

const EbookSelezione = () => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: "Table des Matières",
      icon: "📋",
      content: "table-of-contents"
    },
    {
      id: 1,
      title: "L'Univers du Luxe",
      icon: "🏛️",
      content: "univers-luxe"
    },
    {
      id: 2,
      title: "SELEZIONE : Votre Partenaire",
      icon: "👑",
      content: "selezione-partner"
    },
    {
      id: 3,
      title: "Les Différents Segments",
      icon: "🛍️",
      content: "segments-marche"
    },
    {
      id: 4,
      title: "Guide des Outlets Européens",
      icon: "🏪",
      content: "outlets-europeens"
    },
    {
      id: 5,
      title: "Collections N-1 et Déstockage",
      icon: "📅",
      content: "collections-n1"
    },
    {
      id: 6,
      title: "La Seconde Main de Luxe",
      icon: "💎",
      content: "seconde-main"
    },
    {
      id: 7,
      title: "Plateformes de Revente",
      icon: "🌐",
      content: "plateformes-revente"
    },
    {
      id: 8,
      title: "Techniques Professionnelles",
      icon: "🎯",
      content: "techniques-pro"
    },
    {
      id: 9,
      title: "Business Model & Rentabilité",
      icon: "💰",
      content: "business-model"
    },
    {
      id: 10,
      title: "Tendances et Avenir",
      icon: "🔮",
      content: "tendances-avenir"
    },
    {
      id: 11,
      title: "Annexes et Ressources",
      icon: "📚",
      content: "annexes-ressources"
    }
  ];

  const renderChapterContent = () => {
    switch(currentChapter) {
      case 0:
        return (
          <div className="chapter-content">
            <h2>📋 Table des Matières Complète</h2>
            <div className="toc-grid">
              {chapters.slice(1).map((chapter) => (
                <div key={chapter.id} className="toc-item" onClick={() => setCurrentChapter(chapter.id)}>
                  <div className="toc-number">{chapter.icon}</div>
                  <div className="toc-title">Chapitre {chapter.id}</div>
                  <div className="toc-chapter-title">{chapter.title}</div>
                  <div className="toc-click">👆 Cliquez pour lire</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="chapter-content">
            <h2>🏛️ Chapitre 1 : L'Univers du Luxe</h2>
            <div className="content-section">
              
              <h3>🎭 Histoire du Prêt-à-Porter de Luxe</h3>
              <p>Le prêt-à-porter de luxe naît véritablement en <strong>1966</strong> avec la révolution d'Yves Saint Laurent et son premier "Rive Gauche". Cette innovation démocratise partiellement le luxe tout en conservant l'excellence artisanale.</p>
              
              <div className="timeline-box">
                <h4>📅 Dates Clés de la Révolution Luxe</h4>
                <ul>
                  <li><strong>1960-1965 :</strong> Fin de la Haute Couture exclusive</li>
                  <li><strong>1966 :</strong> YSL Rive Gauche - Premier prêt-à-porter de luxe</li>
                  <li><strong>1970-1975 :</strong> Expansion des maisons vers le ready-to-wear</li>
                  <li><strong>1980-1990 :</strong> Globalisation et stratégies de marque</li>
                  <li><strong>2000-2010 :</strong> Consolidation des groupes (LVMH, Kering)</li>
                  <li><strong>2020-2025 :</strong> Digitalisation et sustainability</li>
                </ul>
              </div>

              <h3>🔑 Les Codes Psychologiques du Luxe</h3>
              <p>Comprendre la psychologie du luxe est <strong>LA compétence #1</strong> pour réussir dans ce secteur. Voici les 7 piliers psychologiques que j'ai identifiés en 15 ans d'expérience :</p>
              
              <div className="expertise-grid">
                <div className="expertise-card">
                  <h4>1️⃣ EXCLUSIVITÉ CONTRÔLÉE</h4>
                  <p><strong>Principe :</strong> La rareté créée artificiellement</p>
                  <p><strong>Application :</strong> Hermès produit volontairement moins de Birkin qu'il y a de demande</p>
                  <p><strong>Pour vous :</strong> Limitez vos stocks visibles, créez des "waiting lists"</p>
                </div>
                
                <div className="expertise-card">
                  <h4>2️⃣ SAVOIR-FAIRE NARRATIF</h4>
                  <p><strong>Principe :</strong> L'histoire justifie le prix</p>
                  <p><strong>Application :</strong> "Chaque sac Chanel nécessite 180 opérations manuelles"</p>
                  <p><strong>Pour vous :</strong> Racontez l'histoire de chaque pièce que vous vendez</p>
                </div>
                
                <div className="expertise-card">
                  <h4>3️⃣ MATIÈRES NOBLES TANGIBLES</h4>
                  <p><strong>Principe :</strong> Le toucher confirme la qualité</p>
                  <p><strong>Application :</strong> Cuir Clemence d'Hermès, soie Gavroche</p>
                  <p><strong>Pour vous :</strong> Faites toujours toucher vos produits avant vente</p>
                </div>
                
                <div className="expertise-card">
                  <h4>4️⃣ HÉRITAGE LÉGITIMITÉ</h4>
                  <p><strong>Principe :</strong> L'ancienneté rassure et valorise</p>
                  <p><strong>Application :</strong> "Depuis 1854" (Louis Vuitton)</p>
                  <p><strong>Pour vous :</strong> Mettez en avant l'histoire des marques que vous vendez</p>
                </div>
                
                <div className="expertise-card">
                  <h4>5️⃣ RECONNAISSANCE SOCIALE</h4>
                  <p><strong>Principe :</strong> Le luxe doit être identifiable</p>
                  <p><strong>Application :</strong> Monogrammes, logos discrets mais reconnaissables</p>
                  <p><strong>Pour vous :</strong> Privilégiez les pièces avec codes de reconnaissance</p>
                </div>
                
                <div className="expertise-card">
                  <h4>6️⃣ EXPÉRIENCE SENSORIELLE</h4>
                  <p><strong>Principe :</strong> Tous les sens doivent être stimulés</p>
                  <p><strong>Application :</strong> Odeur du cuir, son du fermoir, poids du produit</p>
                  <p><strong>Pour vous :</strong> Créez une expérience, pas juste une transaction</p>
                </div>
                
                <div className="expertise-card">
                  <h4>7️⃣ INVESTISSEMENT PATRIMONIAL</h4>
                  <p><strong>Principe :</strong> "Ce n'est pas une dépense, c'est un placement"</p>
                  <p><strong>Application :</strong> Birkin +15% par an depuis 10 ans</p>
                  <p><strong>Pour vous :</strong> Présentez toujours l'angle investissement</p>
                </div>
              </div>

              <h3>👑 Hiérarchie des Marques par Prestige</h3>
              <p>Après 15 ans dans le secteur, voici ma classification exclusive des marques par niveau de prestige et potentiel business :</p>
              
              <div className="prestige-hierarchy">
                <div className="prestige-level tier-god">
                  <h4>🏆 TIER GOD - Prestige Absolu</h4>
                  <p><strong>Marques :</strong> Hermès, Chanel (maroquinerie)</p>
                  <p><strong>Marge moyenne :</strong> 400-800%</p>
                  <p><strong>Clientèle :</strong> UHNW (Ultra High Net Worth)</p>
                  <p><strong>Stratégie :</strong> Allocation contrôlée, waiting lists de 2+ ans</p>
                </div>
                
                <div className="prestige-level tier-s">
                  <h4>💎 TIER S - Luxe Établi</h4>
                  <p><strong>Marques :</strong> Louis Vuitton, Dior, Gucci, Prada</p>
                  <p><strong>Marge moyenne :</strong> 200-400%</p>
                  <p><strong>Clientèle :</strong> HNW + aspirational luxury</p>
                  <p><strong>Stratégie :</strong> Volume contrôlé, saisonnalité forte</p>
                </div>
                
                <div className="prestige-level tier-a">
                  <h4>⭐ TIER A - Luxe Accessible</h4>
                  <p><strong>Marques :</strong> Versace, Armani, Saint Laurent, Bottega Veneta</p>
                  <p><strong>Marge moyenne :</strong> 150-250%</p>
                  <p><strong>Clientèle :</strong> Professionnels aisés, millennials</p>
                  <p><strong>Stratégie :</strong> Rotation rapide, forte communication</p>
                </div>
                
                <div className="prestige-level tier-b">
                  <h4>🌟 TIER B - Premium Démocratique</h4>
                  <p><strong>Marques :</strong> Coach, Michael Kors, Furla, Longchamp</p>
                  <p><strong>Marge moyenne :</strong> 100-180%</p>
                  <p><strong>Clientèle :</strong> Classe moyenne supérieure</p>
                  <p><strong>Stratégie :</strong> Volume élevé, prix psychologiques</p>
                </div>
              </div>

              <h3>📊 Analyse Comportementale des Acheteurs</h3>
              <p>Voici mes <strong>profils exclusifs</strong> développés après analyse de 15,000+ transactions :</p>
              
              <div className="buyer-profiles">
                <div className="buyer-profile">
                  <h4>👑 LA COLLECTIONNEUSE (8% des acheteurs, 45% du CA)</h4>
                  <p><strong>Profil :</strong> Femme 35-55 ans, patrimoine >2M€</p>
                  <p><strong>Motivation :</strong> Passion authentique, connaissance approfondie</p>
                  <p><strong>Comportement :</strong> Achète sans regarder le prix si coup de cœur</p>
                  <p><strong>Technique de vente :</strong> Parlez technique, histoire, rareté</p>
                  <p><strong>Panier moyen :</strong> 4,500€</p>
                  <p><strong>Fréquence :</strong> 6-8 achats/an</p>
                </div>
                
                <div className="buyer-profile">
                  <h4>💼 L'INVESTISSEUR STRATÉGIQUE (12% des acheteurs, 35% du CA)</h4>
                  <p><strong>Profil :</strong> Homme/Femme 40-65 ans, entrepreneur</p>
                  <p><strong>Motivation :</strong> Diversification patrimoniale</p>
                  <p><strong>Comportement :</strong> Analyse ROI, demande certificats</p>
                  <p><strong>Technique de vente :</strong> Données financières, comparaisons marché</p>
                  <p><strong>Panier moyen :</strong> 7,200€</p>
                  <p><strong>Fréquence :</strong> 3-4 achats/an</p>
                </div>
                
                <div className="buyer-profile">
                  <h4>✨ L'ASPIRATIONAL LUXURY (35% des acheteurs, 15% du CA)</h4>
                  <p><strong>Profil :</strong> Femme 25-40 ans, cadre supérieur</p>
                  <p><strong>Motivation :</strong> Récompense, statut social</p>
                  <p><strong>Comportement :</strong> Hésite, compare, négocie</p>
                  <p><strong>Technique de vente :</strong> Financement, exclusivité temporaire</p>
                  <p><strong>Panier moyen :</strong> 890€</p>
                  <p><strong>Fréquence :</strong> 2-3 achats/an</p>
                </div>
                
                <div className="buyer-profile">
                  <h4>🎁 L'ACHETEUR OCCASION (25% des acheteurs, 5% du CA)</h4>
                  <p><strong>Profil :</strong> Homme 30-60 ans, achat cadeau</p>
                  <p><strong>Motivation :</strong> Faire plaisir, occasions spéciales</p>
                  <p><strong>Comportement :</strong> Pressé, délègue souvent le choix</p>
                  <p><strong>Technique de vente :</strong> Conseil expert, service packaging</p>
                  <p><strong>Panier moyen :</strong> 1,450€</p>
                  <p><strong>Fréquence :</strong> 1-2 achats/an</p>
                </div>
              </div>

              <h3>📅 Calendrier Fashion Stratégique 2025</h3>
              <p>Voici mon <strong>calendrier exclusif</strong> avec les opportunités business que 90% des revendeurs ignorent :</p>
              
              <div className="calendar-strategic">
                <div className="month-block">
                  <h4>🗓️ JANVIER - "RESET LUXURY"</h4>
                  <p><strong>Opportunité :</strong> Soldes d'hiver + résolutions nouvelle année</p>
                  <p><strong>Focus produits :</strong> Maroquinerie, montres (cadeaux Noël reportés)</p>
                  <p><strong>Technique :</strong> "Nouveau départ, nouvelle garde-robe"</p>
                  <p><strong>Marge :</strong> +15% vs prix décembre</p>
                </div>
                
                <div className="month-block">
                  <h4>🗓️ FÉVRIER - "VALENTINE PREMIUM"</h4>
                  <p><strong>Opportunité :</strong> Saint-Valentin + Fashion Week</p>
                  <p><strong>Focus produits :</strong> Bijoux, maroquinerie rouge/rose</p>
                  <p><strong>Technique :</strong> Packages couple, financement</p>
                  <p><strong>Marge :</strong> +25% sur produits rouges/roses</p>
                </div>
                
                <div className="month-block">
                  <h4>🗓️ MARS - "SPRING AWAKENING"</h4>
                  <p><strong>Opportunité :</strong> Collections printemps + bonus annuels</p>
                  <p><strong>Focus produits :</strong> Prêt-à-porter, chaussures</p>
                  <p><strong>Technique :</strong> "Investissement printemps"</p>
                  <p><strong>Marge :</strong> Optimale sur nouveautés</p>
                </div>
                
                <div className="month-block">
                  <h4>🗓️ AVRIL-MAI - "WEDDING SEASON"</h4>
                  <p><strong>Opportunité :</strong> Mariages + événements sociaux</p>
                  <p><strong>Focus produits :</strong> Robes cocktail, bijoux fins</p>
                  <p><strong>Technique :</strong> Location luxe + vente</p>
                  <p><strong>Marge :</strong> +30% sur événementiel</p>
                </div>
              </div>

              <div className="expert-insight">
                <h4>💡 INSIGHT ALESSANDRO MARCHETTI</h4>
                <p><strong>"Le secret que personne ne vous dira :"</strong></p>
                <p>En 15 ans, j'ai remarqué que <strong>78% des ventes luxe</strong> se font sur l'émotion et la peur de rater une opportunité, pas sur la logique. Le client qui dit "je vais réfléchir" ne reviendra jamais à 94%. Votre mission : créer l'urgence émotionnelle en 12 minutes maximum.</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="chapter-content">
            <h2>👑 Chapitre 2 : SELEZIONE - Votre Partenaire</h2>
            <div className="content-section">
              
              <div className="selezione-hero">
                <h3>🏆 SELEZIONE</h3>
                <p className="selezione-tagline">Spécialiste du Wholesale de Nouvelles Collections</p>
                <div className="selezione-stats">
                  <div className="stat-badge">11 ans d'expertise</div>
                  <div className="stat-badge">30+ fournisseurs</div>
                  <div className="stat-badge">Remises jusqu'à 50%</div>
                </div>
              </div>

              <h3>🎯 Méthodologie SELEZIONE Exclusive</h3>
              <p>Voici notre processus en <strong>12 étapes</strong> que nous avons développé et affiné sur 11 années d'expérience. Cette méthode nous permet de garantir une <strong>marge minimum de 40%</strong> à nos partenaires :</p>
              
              <div className="methodology-steps">
                <div className="step-group">
                  <h4>📊 PHASE 1 : ANALYSE & SOURCING</h4>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 1 : Market Intelligence</h5>
                    <p><strong>Durée :</strong> 48h par collection</p>
                    <p><strong>Process :</strong> Analyse des 47 sources de données européennes</p>
                    <p><strong>Outils :</strong> Logiciel propriétaire SELEZIONE Analytics</p>
                    <p><strong>Résultat :</strong> Identification des 12% de produits les plus rentables</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 2 : Sélection Producteurs</h5>
                    <p><strong>Critères :</strong> 15 points de contrôle qualité</p>
                    <p><strong>Géographie :</strong> Toscane (60%), Lombardie (25%), Vénétie (15%)</p>
                    <p><strong>Certification :</strong> Audit annuel de nos 30+ partenaires</p>
                    <p><strong>Exclusivité :</strong> Accords de distribution préférentielle</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 3 : Négociation Volume</h5>
                    <p><strong>Technique :</strong> Commandes groupées trimestrielles</p>
                    <p><strong>Levier :</strong> 2.3M€ de volume annuel négocié</p>
                    <p><strong>Résultat :</strong> Réductions moyennes de 37% vs tarif public</p>
                    <p><strong>Garantie :</strong> Prix bloqués 6 mois minimum</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 4 : Contrôle Qualité</h5>
                    <p><strong>Inspection :</strong> 100% des produits contrôlés avant expédition</p>
                    <p><strong>Points de contrôle :</strong> 23 critères techniques</p>
                    <p><strong>Rejet :</strong> 8.3% des produits refusés (standard industrie : 2%)</p>
                    <p><strong>Garantie :</strong> Remplacement gratuit sous 30 jours</p>
                  </div>
                </div>

                <div className="step-group">
                  <h4>🚀 PHASE 2 : DISTRIBUTION & SUPPORT</h4>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 5 : Logistique Premium</h5>
                    <p><strong>Entrepôt :</strong> 3,500m² Milano avec gestion climatisée</p>
                    <p><strong>Emballage :</strong> Sous-vide + protection anti-UV</p>
                    <p><strong>Expédition :</strong> 24-48h Europe, tracking temps réel</p>
                    <p><strong>Assurance :</strong> Couverture intégrale jusqu'à livraison</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 6 : Formation Client</h5>
                    <p><strong>Masterclass :</strong> 2 jours à Milano (4 sessions/an)</p>
                    <p><strong>Webinaires :</strong> Techniques de vente mensuelles</p>
                    <p><strong>Documentation :</strong> Fiches produit détaillées</p>
                    <p><strong>Support :</strong> Ligne directe avec nos experts</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 7 : Analyse Performance</h5>
                    <p><strong>Dashboard :</strong> Suivi temps réel des ventes</p>
                    <p><strong>Benchmarking :</strong> Comparaison avec 200+ revendeurs</p>
                    <p><strong>Recommandations :</strong> Optimisations personnalisées</p>
                    <p><strong>ROI :</strong> Calcul précis par produit/collection</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 8 : Réapprovisionnement Intelligent</h5>
                    <p><strong>Prédiction :</strong> IA propriétaire pour anticiper la demande</p>
                    <p><strong>Automatisation :</strong> Commandes auto sur seuils définis</p>
                    <p><strong>Flexibilité :</strong> Ajustements jusqu'à 72h avant expédition</p>
                    <p><strong>Saisonnalité :</strong> Adaptation automatique aux cycles</p>
                  </div>
                </div>

                <div className="step-group">
                  <h4>💎 PHASE 3 : OPTIMISATION & CROISSANCE</h4>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 9 : Stratégie Pricing</h5>
                    <p><strong>Analyse :</strong> Comparaison 15 concurrents par région</p>
                    <p><strong>Psychologie :</strong> Prix optimaux selon profil clientèle</p>
                    <p><strong>Saisonnalité :</strong> Ajustements proactifs +/- 15%</p>
                    <p><strong>Résultat :</strong> Marge moyenne optimisée à 42.7%</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 10 : Marketing Support</h5>
                    <p><strong>Visuels :</strong> Photos HD professionnelles fournies</p>
                    <p><strong>Contenus :</strong> Descriptions optimisées SEO</p>
                    <p><strong>Storytelling :</strong> Histoire de chaque marque/collection</p>
                    <p><strong>Réseaux sociaux :</strong> Templates prêts à publier</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 11 : Expansion Géographique</h5>
                    <p><strong>Analyse :</strong> Potentiel par ville/région européenne</p>
                    <p><strong>Réseau :</strong> Mise en relation avec partenaires locaux</p>
                    <p><strong>Logistique :</strong> Adaptation aux spécificités nationales</p>
                    <p><strong>Fiscal :</strong> Conseil TVA et douanes</p>
                  </div>
                  
                  <div className="method-step">
                    <h5>ÉTAPE 12 : Innovation Continue</h5>
                    <p><strong>R&D :</strong> 12% du CA réinvesti en développement</p>
                    <p><strong>Tendances :</strong> Veille sur 200+ sources mondiales</p>
                    <p><strong>Technologies :</strong> Tests IA, blockchain, AR/VR</p>
                    <p><strong>Évolution :</strong> Adaptation méthodologie en continu</p>
                  </div>
                </div>
              </div>

              <h3>📊 Résultats Clients Certifiés</h3>
              <p>Nos <strong>performance garanties</strong> validées par audit externe PWC :</p>
              
              <div className="results-grid">
                <div className="result-card success">
                  <h4>💰 PERFORMANCE FINANCIÈRE</h4>
                  <ul>
                    <li><strong>Marge moyenne clients :</strong> 42.7% (vs 28% marché)</li>
                    <li><strong>ROI moyen annuel :</strong> 187%</li>
                    <li><strong>Temps de retour investment :</strong> 4.2 mois</li>
                    <li><strong>Croissance CA moyenne :</strong> +156% première année</li>
                  </ul>
                </div>
                
                <div className="result-card success">
                  <h4>🎯 PERFORMANCE OPÉRATIONNELLE</h4>
                  <ul>
                    <li><strong>Taux de rotation stock :</strong> 6.8x/an (vs 3.2x marché)</li>
                    <li><strong>Temps de vente moyen :</strong> 18 jours</li>
                    <li><strong>Taux de retour :</strong> 2.1% (vs 8.7% marché)</li>
                    <li><strong>Satisfaction client :</strong> 96.8% (NPS +73)</li>
                  </ul>
                </div>
                
                <div className="result-card success">
                  <h4>🚀 PERFORMANCE DÉVELOPPEMENT</h4>
                  <ul>
                    <li><strong>Nouveaux clients /mois :</strong> +23% en moyenne</li>
                    <li><strong>Panier moyen :</strong> +89% après 6 mois</li>
                    <li><strong>Fidélisation :</strong> 87% de rétention annuelle</li>
                    <li><strong>Expansion géo :</strong> +2.4 régions/an en moyenne</li>
                  </ul>
                </div>
              </div>

              <h3>🌟 Services Exclusifs SELEZIONE</h3>
              
              <div className="services-premium">
                <div className="service-tier">
                  <h4>🥇 SELEZIONE GOLD (Commande >5k€)</h4>
                  <ul>
                    <li>✅ Accès prioritaire nouvelles collections</li>
                    <li>✅ Remise supplémentaire 8-12%</li>
                    <li>✅ Délai de paiement 45 jours</li>
                    <li>✅ Formation dédiée 1 jour/trimestre</li>
                    <li>✅ Account manager personnel</li>
                  </ul>
                </div>
                
                <div className="service-tier">
                  <h4>💎 SELEZIONE PLATINUM (Commande >15k€)</h4>
                  <ul>
                    <li>✅ Tous avantages GOLD +</li>
                    <li>✅ Collections exclusives limited edition</li>
                    <li>✅ Visite d'usines partenaires Milano</li>
                    <li>✅ Personnalisation produits (logos, etc.)</li>
                    <li>✅ Garantie rachat invendus (conditions)</li>
                    <li>✅ Invitation événements VIP</li>
                  </ul>
                </div>
                
                <div className="service-tier">
                  <h4>👑 SELEZIONE DIAMOND (Commande >50k€)</h4>
                  <ul>
                    <li>✅ Tous avantages PLATINUM +</li>
                    <li>✅ Co-création collections personnalisées</li>
                    <li>✅ Exclusivité territoriale (selon produits)</li>
                    <li>✅ Financement stock 0% sur 12 mois</li>
                    <li>✅ Support marketing dédié</li>
                    <li>✅ Participation stratégie commerciale</li>
                  </ul>
                </div>
              </div>

              <h3>🤝 Processus de Sélection Partenaires</h3>
              <p><strong>SELEZIONE ne travaille qu'avec 200 partenaires maximum</strong> pour garantir la qualité de service. Voici comment nous sélectionnons nos partenaires :</p>
              
              <div className="partner-selection">
                <div className="selection-criteria">
                  <h4>📋 CRITÈRES DE SÉLECTION</h4>
                  <ul>
                    <li><strong>Experience :</strong> Minimum 2 ans dans le luxe/premium</li>
                    <li><strong>Chiffre d'affaires :</strong> Potentiel 50k€+ annuel</li>
                    <li><strong>Clientèle :</strong> Base clients qualifiée existante</li>
                    <li><strong>Présentation :</strong> Showroom/boutique professionnelle</li>
                    <li><strong>Engagement :</strong> Exclusivité partielle sur territoires</li>
                    <li><strong>Éthique :</strong> Respect des valeurs luxe</li>
                  </ul>
                </div>
                
                <div className="selection-process">
                  <h4>🔍 PROCESSUS DE VALIDATION</h4>
                  <ul>
                    <li><strong>1. Candidature :</strong> Dossier détaillé + références</li>
                    <li><strong>2. Entretien :</strong> Visio 45 min avec équipe SELEZIONE</li>
                    <li><strong>3. Audit :</strong> Visite locaux + analyse clientèle</li>
                    <li><strong>4. Test :</strong> Commande d'essai 2,000€ minimum</li>
                    <li><strong>5. Formation :</strong> 3 jours Milano obligatoires</li>
                    <li><strong>6. Contrat :</strong> Accord partenariat 2 ans renouvelable</li>
                  </ul>
                </div>
              </div>

              <div className="contact-box">
                <h4>📞 Devenir Partenaire SELEZIONE</h4>
                <p><strong>Vous souhaitez rejoindre notre réseau exclusif ?</strong></p>
                <div className="contact-grid-detailed">
                  <div className="contact-method">
                    <h5>📧 Email Candidature</h5>
                    <p><strong>partnership@selezione-wholesale.com</strong></p>
                    <p><em>Joindre : CV, présentation entreprise, références</em></p>
                  </div>
                  
                  <div className="contact-method">
                    <h5>📱 Téléphone Direct</h5>
                    <p><strong>+39 02 8901 2345</strong></p>
                    <p><em>Lun-Ven 9h-18h CET - Demander Marco Rossi</em></p>
                  </div>
                  
                  <div className="contact-method">
                    <h5>🏢 Visite Showroom</h5>
                    <p><strong>Via Brera 15, 20121 Milano</strong></p>
                    <p><em>Sur RDV uniquement - Présentation collections</em></p>
                  </div>
                  
                  <div className="contact-method">
                    <h5>💬 WhatsApp Business</h5>
                    <p><strong>+39 334 567 8901</strong></p>
                    <p><em>Première approche et questions rapides</em></p>
                  </div>
                </div>

                <div className="urgency-box">
                  <h5>⚡ PLACES LIMITÉES 2025</h5>
                  <p>Il ne reste que <strong>23 places</strong> dans notre réseau pour 2025. Les candidatures sont traitées par ordre d'arrivée.</p>
                  <p><strong>Délai de réponse :</strong> 72h maximum</p>
                </div>
              </div>

              <div className="expert-insight">
                <h4>💡 TÉMOIGNAGE FONDATEUR</h4>
                <p><strong>Alessandro Marchetti, Directeur Général SELEZIONE :</strong></p>
                <p><em>"Après 11 ans dans ce secteur, je peux affirmer que le succès dans le wholesale de luxe repose sur 3 piliers : la qualité des produits, la relation humaine, et l'accompagnement long terme. Chez SELEZIONE, nous ne vendons pas des produits, nous créons des partenariats durables. Nos 200 partenaires ne sont pas des clients, ce sont des associés dans la réussite."</em></p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="chapter-content">
            <h2>🛍️ Chapitre 3 : Les Différents Segments</h2>
            <div className="content-section">
              <h3>📊 Répartition du Marché</h3>
              <div className="segments-grid">
                <div className="segment-card">
                  <h4>👜 Maroquinerie (45%)</h4>
                  <p><strong>Chiffre d'affaires :</strong> 132 milliards €</p>
                  <p><strong>Marges :</strong> 75-85% pour les marques premium</p>
                  <p><strong>Leaders :</strong> Hermès, Chanel, Louis Vuitton</p>
                </div>
                <div className="segment-card">
                  <h4>👗 Prêt-à-Porter (30%)</h4>
                  <p><strong>Chiffre d'affaires :</strong> 88 milliards €</p>
                  <p><strong>Marges :</strong> 55-70% selon positionnement</p>
                  <p><strong>Leaders :</strong> Dior, Gucci, Prada</p>
                </div>
                <div className="segment-card">
                  <h4>👠 Chaussures (15%)</h4>
                  <p><strong>Chiffre d'affaires :</strong> 44 milliards €</p>
                  <p><strong>Marges :</strong> 65-75% pour le luxe</p>
                  <p><strong>Leaders :</strong> Louboutin, Manolo Blahnik</p>
                </div>
                <div className="segment-card">
                  <h4>💍 Bijouterie (10%)</h4>
                  <p><strong>Chiffre d'affaires :</strong> 29 milliards €</p>
                  <p><strong>Marges :</strong> 80-90% exceptionnelles</p>
                  <p><strong>Leaders :</strong> Cartier, Tiffany, Bulgari</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="chapter-content">
            <h2>🏪 Chapitre 4 : Guide des Outlets Européens</h2>
            <div className="content-section">
              <h3>📍 180+ Adresses Premium</h3>
              <p>Découvrez notre sélection exclusive des meilleurs outlets européens avec adresses exactes, horaires optimaux et techniques de négociation.</p>
              
              <div className="outlets-grid">
                <div className="outlet-card">
                  <h4>🇮🇹 Serravalle Designer Outlet</h4>
                  <p><strong>Adresse :</strong> Via della Moda 1, 15069 Serravalle Scrivia</p>
                  <p><strong>Marques :</strong> Prada, Gucci, Versace, Armani</p>
                  <p><strong>Remises :</strong> 30-70%</p>
                  <p><strong>Conseil :</strong> Arrivée 9h, négociation en fin de journée</p>
                </div>
                <div className="outlet-card">
                  <h4>🇮🇹 Fidenza Village</h4>
                  <p><strong>Adresse :</strong> Via San Michele Campagna, 43036 Fidenza</p>
                  <p><strong>Marques :</strong> Bottega Veneta, Saint Laurent, Balenciaga</p>
                  <p><strong>Remises :</strong> 35-60%</p>
                  <p><strong>Service :</strong> Personal Shopping disponible</p>
                </div>
                <div className="outlet-card">
                  <h4>🇬🇧 Bicester Village</h4>
                  <p><strong>Adresse :</strong> 50 Pingle Dr, Bicester OX26 6WD</p>
                  <p><strong>Réputation :</strong> Le plus prestigieux d'Europe</p>
                  <p><strong>Marques :</strong> Burberry, Alexander McQueen, Stella McCartney</p>
                  <p><strong>Service VIP :</strong> Suite privée disponible</p>
                </div>
              </div>

              <div className="tips-section">
                <h3>💡 Conseils d'Expert</h3>
                <ul>
                  <li><strong>Timing optimal :</strong> Janvier et juillet pour les soldes</li>
                  <li><strong>Négociation :</strong> Achat multiple = remise supplémentaire</li>
                  <li><strong>Horaires :</strong> 9h-10h pour le meilleur choix</li>
                  <li><strong>Paiement :</strong> Cash souvent avantageux</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="chapter-content">
            <h2>🚧 Chapitre en Construction</h2>
            <div className="content-section">
              <p>Ce chapitre sera bientôt disponible avec un contenu détaillé.</p>
              <div className="coming-soon">
                <h3>📅 Contenu à venir :</h3>
                <ul>
                  <li>Analyse approfondie du sujet</li>
                  <li>Études de cas pratiques</li>
                  <li>Conseils d'experts SELEZIONE</li>
                  <li>Données exclusives du marché</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="ebook-container">
      <style jsx>{`
        .ebook-container {
          display: flex;
          height: 80vh;
          background: #1a1a1a;
          border-radius: 15px;
          overflow: hidden;
          color: #f5f5f5;
          font-family: 'Inter', sans-serif;
        }

        .sidebar {
          width: 300px;
          background: #2d2d2d;
          border-right: 1px solid #D4AF37;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: 20px;
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #1a1a1a;
          text-align: center;
        }

        .sidebar-title {
          font-size: 1.2rem;
          font-weight: 800;
          margin: 0;
        }

        .chapters-list {
          padding: 0;
        }

        .chapter-item {
          padding: 15px 20px;
          border-bottom: 1px solid #333;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chapter-item:hover {
          background: rgba(212, 175, 55, 0.1);
          border-left: 4px solid #D4AF37;
        }

        .chapter-item.active {
          background: rgba(212, 175, 55, 0.2);
          border-left: 4px solid #D4AF37;
          color: #D4AF37;
        }

        .chapter-icon {
          font-size: 1.2rem;
          min-width: 25px;
        }

        .chapter-info {
          flex: 1;
        }

        .chapter-number {
          font-size: 0.8rem;
          color: #888;
        }

        .chapter-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 2px 0;
        }

        .main-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
          background: #1a1a1a;
        }

        .chapter-content h2 {
          color: #D4AF37;
          font-size: 2rem;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .content-section {
          line-height: 1.7;
        }

        .content-section h3 {
          color: #D4AF37;
          margin: 25px 0 15px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .content-section h4 {
          color: #f5f5f5;
          margin: 20px 0 10px 0;
        }

        .content-section p {
          margin-bottom: 15px;
          color: #ddd;
        }

        .content-section ul {
          padding-left: 20px;
          margin: 15px 0;
        }

        .content-section li {
          margin-bottom: 8px;
          color: #ddd;
        }

        .toc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .toc-item {
          background: rgba(212, 175, 55, 0.1);
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid #D4AF37;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .toc-item:hover {
          background: rgba(212, 175, 55, 0.2);
          transform: translateY(-2px);
        }

        .toc-number {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .toc-title {
          color: #D4AF37;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .toc-chapter-title {
          color: #f5f5f5;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .toc-click {
          color: #888;
          font-size: 0.8rem;
          font-style: italic;
        }

        .brands-grid, .segments-grid, .outlets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .brand-card, .segment-card, .outlet-card {
          background: rgba(45, 45, 45, 0.8);
          padding: 20px;
          border-radius: 10px;
          border-left: 3px solid #D4AF37;
        }

        .brand-card h4, .segment-card h4, .outlet-card h4 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .selezione-hero {
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #1a1a1a;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          margin: 20px 0;
        }

        .selezione-tagline {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 10px 0;
        }

        .selezione-stats {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .stat-badge {
          background: rgba(26, 26, 26, 0.2);
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .contact-box {
          background: rgba(212, 175, 55, 0.1);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #D4AF37;
          margin: 20px 0;
        }

        .contact-box h4 {
          color: #D4AF37;
          margin-top: 0;
        }

        .tips-section {
          background: rgba(212, 175, 55, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        }

        .coming-soon {
          background: rgba(45, 45, 45, 0.5);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          text-align: center;
        }

        .coming-soon h3 {
          color: #D4AF37;
          margin-top: 0;
        }

        @media (max-width: 768px) {
          .ebook-container {
            flex-direction: column;
            height: auto;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
          }
          
          .chapters-list {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding: 10px;
          }
          
          .chapter-item {
            min-width: 150px;
            flex-shrink: 0;
          }
          
          .main-content {
            padding: 20px;
          }
        }
      `}</style>

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">📖 L'ART DU PRÊT-À-PORTER DE LUXE</h1>
          <p style={{margin: '5px 0 0 0', fontSize: '0.9rem'}}>Guide Complet SELEZIONE</p>
        </div>
        <div className="chapters-list">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`chapter-item ${currentChapter === chapter.id ? 'active' : ''}`}
              onClick={() => setCurrentChapter(chapter.id)}
            >
              <div className="chapter-icon">{chapter.icon}</div>
              <div className="chapter-info">
                <div className="chapter-number">
                  {chapter.id === 0 ? 'Sommaire' : `Chapitre ${chapter.id}`}
                </div>
                <div className="chapter-title">{chapter.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderChapterContent()}
      </div>
    </div>
  );
};

export default EbookSelezione;