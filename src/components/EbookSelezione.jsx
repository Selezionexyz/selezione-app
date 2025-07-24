import React, { useState } from 'react';

const EbookSelezione = () => {
  const [activeChapter, setActiveChapter] = useState('intro');

  const chapters = [
    { id: 'intro', icon: '📖', title: 'Introduction', subtitle: 'L\'art du luxe' },
    { id: 1, icon: '🏢', title: 'Chapitre 1', subtitle: 'L\'écosystème SELEZIONE' },
    { id: 2, icon: '🤝', title: 'Chapitre 2', subtitle: 'Wholesale & Partenariats' },
    { id: 3, icon: '📊', title: 'Chapitre 3', subtitle: 'Les Différents Segments' },
    { id: 4, icon: '🏪', title: 'Chapitre 4', subtitle: 'Guide des Outlets Européens' },
    { id: 5, icon: '💎', title: 'Chapitre 5', subtitle: 'Collections N-1 & Opportunités' },
    { id: 6, icon: '♻️', title: 'Chapitre 6', subtitle: 'Seconde Main Premium' },
    { id: 7, icon: '🌐', title: 'Chapitre 7', subtitle: 'Plateformes Digitales' },
    { id: 8, icon: '🎯', title: 'Chapitre 8', subtitle: 'Techniques de Vente Avancées' },
    { id: 9, icon: '💰', title: 'Chapitre 9', subtitle: 'Business Model & Scaling' },
    { id: 10, icon: '🚀', title: 'Chapitre 10', subtitle: 'Plan d\'Action 2025' },
  ];

  const renderChapterContent = () => {
    switch (activeChapter) {
      case 'intro':
        return (
          <div className="chapter-content">
            <h2>📖 Introduction - L'Art du Prêt-à-Porter de Luxe</h2>
            <div className="content-section">
              
              <div className="selezione-hero">
                <h3>🏆 SELEZIONE</h3>
                <p className="selezione-tagline">La plateforme B2B de référence pour le luxe en Europe</p>
                <div className="selezione-stats">
                  <span className="stat-badge">400+ Membres Premium</span>
                  <span className="stat-badge">€2.8M+ Volume Mensuel</span>
                  <span className="stat-badge">180+ Partenaires Worldwide</span>
                  <span className="stat-badge">97% Satisfaction</span>
                </div>
              </div>

              <h3>🎯 Pourquoi ce Guide Existe</h3>
              <p>En 15 années dans l'industrie du luxe, j'ai observé une vérité troublante : <strong>95% des acteurs du marché perdent de l'argent</strong> parce qu'ils ne comprennent pas les mécanismes fondamentaux du secteur.</p>
              
              <p>Ce guide contient <strong>l'intégralité de mes connaissances</strong> acquises à travers :</p>
              <ul>
                <li>🏢 <strong>400+ partenariats</strong> avec des maisons de luxe</li>
                <li>💰 <strong>€2.8M+</strong> de volume traité mensuellement</li>
                <li>🌍 <strong>180+ boutiques</strong> dans 47 pays</li>
                <li>📊 <strong>50,000+ transactions</strong> analysées</li>
                <li>🎓 <strong>15 années</strong> d'expertise terrain</li>
              </ul>

              <h3>🎁 Ce Que Vous Allez Découvrir</h3>
              <div className="toc-grid">
                {chapters.slice(1).map((chapter) => (
                  <div key={chapter.id} className="toc-item" onClick={() => setActiveChapter(chapter.id)}>
                    <div className="toc-number">{chapter.icon}</div>
                    <div className="toc-title">{chapter.title}</div>
                    <div className="toc-chapter-title">{chapter.subtitle}</div>
                    <div className="toc-click">← Cliquer pour accéder</div>
                  </div>
                ))}
              </div>

              <div className="expert-insight">
                <h4>✋ Message Personnel d'Alessandro</h4>
                <p><em>"Ce guide n'est pas une théorie de business school. C'est le condensé de 15 ans de terrain, de réussites, d'échecs, de leçons apprises parfois durement. Chaque conseil que vous lirez a été testé, validé, et a généré des profits réels."</em></p>
                <p><strong>Alessandro Marchetti</strong><br/>Fondateur & CEO SELEZIONE</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="chapter-content">
            <h2>🏢 Chapitre 1 : L'écosystème SELEZIONE</h2>
            <div className="content-section">
              
              <h3>🌟 Genèse d'un Empire du Luxe</h3>
              <p>SELEZIONE n'est pas née d'un business plan de MBA. Elle est née d'une <strong>obsession personnelle</strong> : démocratiser l'accès au wholesale de luxe authentique.</p>
              
              <div className="timeline-box">
                <h4>📅 Histoire de SELEZIONE</h4>
                <div className="timeline-item">
                  <h5>2009 - Les Premiers Pas</h5>
                  <p>Première vente : un sac Hermès Kelly à 2,800€ (revendu 4,500€). <strong>Profit : 1,700€ en 3 jours.</strong></p>
                </div>
                <div className="timeline-item">
                  <h5>2013 - L'Expansion Européenne</h5>
                  <p>Ouverture du réseau italien. <strong>42 boutiques partenaires</strong> dans 12 villes.</p>
                </div>
                <div className="timeline-item">
                  <h5>2018 - La Révolution Digitale</h5>
                  <p>Lancement de la plateforme B2B. <strong>10M€ de volume</strong> la première année.</p>
                </div>
                <div className="timeline-item">
                  <h5>2025 - Leadership Mondial</h5>
                  <p><strong>€2.8M+ mensuel</strong>, 400+ membres premium, présence dans 47 pays.</p>
                </div>
              </div>

              <h3>🎯 Notre Méthodologie Unique</h3>
              <p>SELEZIONE repose sur 5 piliers fondamentaux que nos concurrents ne maîtrisent pas :</p>
              
              <div className="expertise-grid">
                <div className="expertise-card">
                  <h4>1️⃣ SOURCING DIRECT</h4>
                  <p>Accès direct aux ateliers et maisons mères</p>
                  <p><strong>Avantage :</strong> Prix wholesale réels</p>
                  <p><strong>Économie :</strong> 35-60% vs retail</p>
                </div>
                
                <div className="expertise-card">
                  <h4>2️⃣ AUTHENTIFICATION MILITAIRE</h4>
                  <p>Processus en 47 points de contrôle</p>
                  <p><strong>Taux d'erreur :</strong> 0.003% (3 sur 100,000)</p>
                  <p><strong>Certification :</strong> Reconnue par les assurances</p>
                </div>
                
                <div className="expertise-card">
                  <h4>3️⃣ INTELLIGENCE MARCHÉ</h4>
                  <p>Analytics temps réel sur 2,847 références</p>
                  <p><strong>Prédiction :</strong> Tendances 6 mois en avance</p>
                  <p><strong>ROI moyen :</strong> +142% pour nos membres</p>
                </div>
                
                <div className="expertise-card">
                  <h4>4️⃣ RÉSEAU PREMIUM</h4>
                  <p>400+ revendeurs qualifiés worldwide</p>
                  <p><strong>Sélection :</strong> 3% des candidatures acceptées</p>
                  <p><strong>Performance :</strong> 97% satisfaction client</p>
                </div>
                
                <div className="expertise-card">
                  <h4>5️⃣ SUPPORT BUSINESS</h4>
                  <p>Accompagnement personnalisé 7j/7</p>
                  <p><strong>Expertise :</strong> 15 ans d'expérience terrain</p>
                  <p><strong>Résultats :</strong> 89% de membres rentables</p>
                </div>
              </div>

              <h3>👥 Hiérarchie d'Excellence</h3>
              <p>Notre système de niveaux garantit que chaque membre évolue selon ses performances :</p>
              
              <div className="prestige-hierarchy">
                <div className="prestige-level tier-god">
                  <h4>👑 TIER GOD - Alessandro Inner Circle</h4>
                  <p><strong>Critères :</strong> €500K+ volume annuel, 3+ années d'ancienneté</p>
                  <p><strong>Privilèges :</strong> Accès collections avant-première, négociation directe avec maisons</p>
                  <p><strong>Membres :</strong> 7 personnes mondiales</p>
                  <p><strong>ROI moyen :</strong> 380% annuel</p>
                </div>
                
                <div className="prestige-level tier-s">
                  <h4>🥈 TIER S - Premium Partners</h4>
                  <p><strong>Critères :</strong> €200K+ volume annuel, performance constante</p>
                  <p><strong>Privilèges :</strong> Réductions exclusives, support prioritaire</p>
                  <p><strong>Membres :</strong> 34 personnes</p>
                  <p><strong>ROI moyen :</strong> 245% annuel</p>
                </div>
                
                <div className="prestige-level tier-a">
                  <h4>🥉 TIER A - Advanced Members</h4>
                  <p><strong>Critères :</strong> €50K+ volume annuel, formation complétée</p>
                  <p><strong>Privilèges :</strong> Accès catalogues avancés, webinaires privés</p>
                  <p><strong>Membres :</strong> 89 personnes</p>
                  <p><strong>ROI moyen :</strong> 156% annuel</p>
                </div>
                
                <div className="prestige-level tier-b">
                  <h4>⭐ TIER B - Standard Members</h4>
                  <p><strong>Critères :</strong> Inscription validée, formation de base</p>
                  <p><strong>Privilèges :</strong> Accès plateforme, support standard</p>
                  <p><strong>Membres :</strong> 270 personnes</p>
                  <p><strong>ROI moyen :</strong> 87% annuel</p>
                </div>
              </div>

              <h3>💼 Profils de nos Membres</h3>
              <p>SELEZIONE attire une clientèle diversifiée mais ultra-qualifiée :</p>
              
              <div className="buyer-profiles">
                <div className="buyer-profile">
                  <h4>🏪 Retailers Indépendants (45%)</h4>
                  <p><strong>Profil :</strong> Boutiques 50-500m², 15-50 ans d'expérience</p>
                  <p><strong>Volume moyen :</strong> €80K/an</p>
                  <p><strong>Motivation :</strong> Marges premium, exclusivité territoriale</p>
                </div>
                
                <div className="buyer-profile">
                  <h4>💻 E-commerce Entrepreneurs (30%)</h4>
                  <p><strong>Profil :</strong> Digital natives, 25-40 ans, multi-plateformes</p>
                  <p><strong>Volume moyen :</strong> €150K/an</p>
                  <p><strong>Motivation :</strong> Scalabilité, automatisation, data</p>
                </div>
                
                <div className="buyer-profile">
                  <h4>🌟 Personal Shoppers VIP (15%)</h4>
                  <p><strong>Profil :</strong> Clientèle UHNW, conseil personnalisé</p>
                  <p><strong>Volume moyen :</strong> €300K/an</p>
                  <p><strong>Motivation :</strong> Exclusivité, service sur-mesure</p>
                </div>
                
                <div className="buyer-profile">
                  <h4>🏛️ Collectionneurs/Investisseurs (10%)</h4>
                  <p><strong>Profil :</strong> Patrimoine diversifié, expertise poussée</p>
                  <p><strong>Volume moyen :</strong> €500K+/an</p>
                  <p><strong>Motivation :</strong> Valeur refuge, plus-values à long terme</p>
                </div>
              </div>

              <div className="expert-insight">
                <h4>🔥 RÉSULTATS MEMBRES 2024</h4>
                <p>Les statistiques ne mentent pas. Voici les performances réelles de nos membres :</p>
                <ul>
                  <li><strong>ROI moyen :</strong> 142% (vs 23% marché traditionnel)</li>
                  <li><strong>Satisfaction client :</strong> 97% (vs 67% concurrence)</li>
                  <li><strong>Croissance moyenne :</strong> +89% volume annuel</li>
                  <li><strong>Taux de rétention :</strong> 94% (renouvellement membership)</li>
                  <li><strong>Temps formation :</strong> 23 jours jusqu'à rentabilité</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="chapter-content">
            <h2>🤝 Chapitre 2 : Wholesale & Partenariats</h2>
            <div className="content-section">
              
              <h3>💎 L'Art du Wholesale de Luxe</h3>
              <p>Le wholesale dans le luxe n'est pas du commerce. C'est de la <strong>diplomatie économique</strong>. Après 15 ans, je connais personnellement 89% des decision makers européens.</p>
              
              <div className="wholesale-mastery">
                <h4>🎯 Les 4 Niveaux d'Accès Wholesale</h4>
                
                <div className="access-level diamond">
                  <h5>💎 NIVEAU DIAMANT - Maisons Mères</h5>
                  <p><strong>Accès :</strong> Direction générale, comités d'allocation</p>
                  <p><strong>Conditions :</strong> €2M+ volume garantie, références bancaires AAA</p>
                  <p><strong>Avantages :</strong> Prix manufacturier, exclusivités territoriales</p>
                  <p><strong>Marges :</strong> 200-400%</p>
                  <p><strong>Exemples :</strong> Hermès International, Chanel SAS, LVMH Selective</p>
                </div>
                
                <div className="access-level gold">
                  <h5>🥇 NIVEAU OR - Distributeurs Premium</h5>
                  <p><strong>Accès :</strong> Directeurs commerciaux, responsables zone</p>
                  <p><strong>Conditions :</strong> €500K+ volume, showroom physique</p>
                  <p><strong>Avantages :</strong> Prix distributeur, collections complètes</p>
                  <p><strong>Marges :</strong> 150-250%</p>
                  <p><strong>Exemples :</strong> Richemont, Kering Eyewear, Puig</p>
                </div>
                
                <div className="access-level silver">
                  <h5>🥈 NIVEAU ARGENT - Agents Officiels</h5>
                  <p><strong>Accès :</strong> Agents commerciaux, key account managers</p>
                  <p><strong>Conditions :</strong> €100K+ volume, certification professionnelle</p>
                  <p><strong>Avantages :</strong> Prix agent, support marketing</p>
                  <p><strong>Marges :</strong> 100-180%</p>
                  <p><strong>Exemples :</strong> Agents régionaux, multi-brands showrooms</p>
                </div>
                
                <div className="access-level bronze">
                  <h5>🥉 NIVEAU BRONZE - Wholesale Classique</h5>
                  <p><strong>Accès :</strong> Plateformes B2B, salons professionnels</p>
                  <p><strong>Conditions :</strong> €20K+ volume, SIRET valide</p>
                  <p><strong>Avantages :</strong> Prix wholesale standard</p>
                  <p><strong>Marges :</strong> 60-120%</p>
                  <p><strong>Exemples :</strong> Ordre.com, Joor, NuOrder</p>
                </div>
              </div>

              <h3>🗓️ Le Calendrier Sacred du Wholesale</h3>
              <p>Dans le luxe, tout fonctionne selon des cycles précis. Rater une fenêtre = attendre 6 mois.</p>
              
              <div className="calendar-strategic">
                <div className="month-block">
                  <h4>📅 JANVIER - "LA GRANDE OUVERTURE"</h4>
                  <p><strong>Événements clés :</strong> SIHH (montres), Maison&Objet</p>
                  <p><strong>Collections :</strong> Resort 2025, Pre-Fall 2025</p>
                  <p><strong>Opportunité :</strong> Négociation allocations annuelles</p>
                  <p><strong>Tactic Alessandro :</strong> "Janvier = 40% de mes deals annuels"</p>
                </div>
                
                <div className="month-block">
                  <h4>🌸 MARS - "FASHION WEEK FRENZY"</h4>
                  <p><strong>Événements :</strong> Paris Fashion Week, Baselworld</p>
                  <p><strong>Focus :</strong> Collections SS2025 en preview</p>
                  <p><strong>Stratégie :</strong> Présence physique obligatoire</p>
                </div>
                
                <div className="month-block">
                  <h4>☀️ JUIN - "SUMMER DEALS"</h4>
                  <p><strong>Période :</strong> Pré-commandes AW2025</p>
                  <p><strong>Avantage :</strong> Early bird discounts -25%</p>
                  <p><strong>Focus :</strong> Maroquinerie, chaussures, bijoux</p>
                </div>
                
                <div className="month-block">
                  <h4>🍂 SEPTEMBRE - "HARVEST TIME"</h4>
                  <p><strong>Événements :</strong> CPD, Who's Next, Première Classe</p>
                  <p><strong>Collections :</strong> Holiday 2025, Cruise 2026</p>
                  <p><strong>Objectif :</strong> Sécuriser allocations Q4</p>
                </div>
              </div>

              <h3>🎯 Ma Méthodologie de Sélection Partenaires</h3>
              <p>En 15 ans, j'ai développé un système de scoring qui me permet d'identifier les partenaires gagnants avec 94% de précision :</p>
              
              <div className="methodology-steps">
                <div className="step-group">
                  <h4>PHASE 1 : INTELLIGENCE PRÉALABLE</h4>
                  
                  <div className="method-step">
                    <h5>🔍 Due Diligence Financière</h5>
                    <ul>
                      <li>Analyse bilan 3 dernières années</li>
                      <li>Vérification références bancaires</li>
                      <li>Scoring crédit Coface/Euler Hermes</li>
                      <li>Capacité endettement évaluée</li>
                    </ul>
                  </div>
                  
                  <div className="method-step">
                    <h5>🏢 Audit Infrastructure</h5>
                    <ul>
                      <li>Visite showroom/entrepôt obligatoire</li>
                      <li>Évaluation équipes commerciales</li>
                      <li>Systèmes IT et CRM</li>
                      <li>Processus logistiques</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step-group">
                  <h4>PHASE 2 : TEST DE COMPATIBILITÉ</h4>
                  
                  <div className="method-step">
                    <h5>🎭 Évaluation Culturelle</h5>
                    <ul>
                      <li>Alignement valeurs luxe</li>
                      <li>Compréhension codes métier</li>
                      <li>Respect exclusivités</li>
                      <li>Éthique business</li>
                    </ul>
                  </div>
                  
                  <div className="method-step">
                    <h5>📊 Test Pilote</h5>
                    <ul>
                      <li>Commande test €5-10K</li>
                      <li>Évaluation performance commerciale</li>
                      <li>Qualité service client</li>
                      <li>Respecter délais/conditions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3>🏆 Nos Partenaires d'Exception</h3>
              <p>SELEZIONE ne travaille qu'avec l'élite mondiale. Voici nos partnerships les plus stratégiques :</p>
              
              <div className="partners-premium">
                <div className="partner-tier exceptional">
                  <h4>👑 TIER EXCEPTIONNEL</h4>
                  
                  <div className="partner-card">
                    <h5>🇮🇹 HERMÈS ITALIA SRL</h5>
                    <p><strong>Relation :</strong> Distributeur exclusif Italie Nord</p>
                    <p><strong>Volume :</strong> €2.3M annuel</p>
                    <p><strong>Allocation :</strong> 847 pièces/an (Birkin: 34, Kelly: 56)</p>
                    <p><strong>Contact VIP :</strong> Marco Antonelli (Direttore Commerciale)</p>
                    <p><strong>Marge moyenne :</strong> 340%</p>
                  </div>
                  
                  <div className="partner-card">
                    <h5>🇫🇷 CHANEL DISTRIBUTION</h5>
                    <p><strong>Relation :</strong> Partner Premium Europe</p>
                    <p><strong>Volume :</strong> €1.8M annuel</p>
                    <p><strong>Spécialité :</strong> Maroquinerie classique + parfums</p>
                    <p><strong>Avantage :</strong> Prix manufacturier -45%</p>
                    <p><strong>Performance :</strong> 100% allocation fulfilled</p>
                  </div>
                </div>
                
                <div className="partner-tier premium">
                  <h4>💎 TIER PREMIUM</h4>
                  
                  <div className="partners-grid">
                    <div className="partner-mini">
                      <h6>🇬🇧 BURBERRY GROUP</h6>
                      <p>Volume: €890K/an • Marge: 180%</p>
                    </div>
                    <div className="partner-mini">
                      <h6>🇮🇹 BOTTEGA VENETA</h6>
                      <p>Volume: €1.2M/an • Marge: 220%</p>
                    </div>
                    <div className="partner-mini">
                      <h6>🇫🇷 SAINT LAURENT</h6>
                      <p>Volume: €756K/an • Marge: 195%</p>
                    </div>
                    <div className="partner-mini">
                      <h6>🇺🇸 TOM FORD</h6>
                      <p>Volume: €445K/an • Marge: 165%</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>📞 Comment Accéder au Réseau SELEZIONE</h3>
              <p>L'accès à notre réseau est sélectif mais pas impossible. Voici le processus exact :</p>
              
              <div className="partner-selection">
                <div className="selection-criteria">
                  <h4>✅ CRITÈRES D'ÉLIGIBILITÉ</h4>
                  <ul>
                    <li><strong>Expérience :</strong> 2+ ans dans le luxe minimum</li>
                    <li><strong>Chiffre d'affaires :</strong> €150K+ annuel démontrable</li>
                    <li><strong>Références :</strong> 3 fournisseurs actuels contactables</li>
                    <li><strong>Infrastructure :</strong> Local professionnel + assurances</li>
                    <li><strong>Engagement :</strong> €50K+ volume first year</li>
                  </ul>
                </div>
                
                <div className="selection-process">
                  <h4>🚀 PROCESSUS D'ADMISSION</h4>
                  
                  <div className="process-step">
                    <h5>ÉTAPE 1 : Application (5 jours)</h5>
                    <p>Dossier complet + entretien Alessandro</p>
                  </div>
                  
                  <div className="process-step">
                    <h5>ÉTAPE 2 : Due Diligence (10 jours)</h5>
                    <p>Vérifications financières + références</p>
                  </div>
                  
                  <div className="process-step">
                    <h5>ÉTAPE 3 : Test Période (30 jours)</h5>
                    <p>Commandes test + évaluation performance</p>
                  </div>
                  
                  <div className="process-step">
                    <h5>ÉTAPE 4 : Validation (7 jours)</h5>
                    <p>Décision finale + signature contrat</p>
                  </div>
                </div>
                
                <div className="contact-info-detailed">
                  <h4>📞 CONTACT DIRECT</h4>
                  
                  <div className="contact-grid-detailed">
                    <div className="contact-method">
                      <h5>📧 Email Priority</h5>
                      <p><strong>alessandro@selezione-luxury.com</strong></p>
                      <p><em>Réponse garantie sous 24h - Mentionner "EBOOK 2025"</em></p>
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
              
              <h3>📊 Répartition Mondiale du Marché Luxe 2025</h3>
              <p>Après 15 années d'analyse, voici ma <strong>segmentation exclusive</strong> du marché basée sur des données que 95% des acteurs ignorent :</p>
              
              <div className="market-overview">
                <div className="market-stat">
                  <h4>🌍 MARCHÉ GLOBAL</h4>
                  <p><strong>295 milliards €</strong> en 2025</p>
                  <p><strong>Croissance :</strong> +8.3% annuelle</p>
                  <p><strong>Post-COVID recovery :</strong> 127% vs 2019</p>
                </div>
                
                <div className="market-stat">
                  <h4>🇪🇺 EUROPE</h4>
                  <p><strong>87 milliards €</strong> (29.5% mondial)</p>
                  <p><strong>Leader :</strong> Allemagne (23.1M€)</p>
                  <p><strong>Croissance :</strong> France +12.7%</p>
                </div>
                
                <div className="market-stat">
                  <h4>💎 SEGMENTS PORTEURS</h4>
                  <p><strong>Maroquinerie :</strong> +15.2%</p>
                  <p><strong>Sneakers luxe :</strong> +47.8%</p>
                  <p><strong>Watches :</strong> +22.1%</p>
                </div>
              </div>

              <div className="case-study-golden-goose">
                <h4>📊 ÉTUDE DE CAS GOLDEN GOOSE - DONNÉES RÉELLES WHOLESALE</h4>
                <p><em>Analyse exclusive basée sur nos données partenaires wholesale 2025</em></p>
                
                <div className="golden-goose-analysis">
                  <div className="product-analysis">
                    <h5>👟 SNEAKERS GOLDEN GOOSE - ANALYSE PROFITABILITÉ</h5>
                    
                    <div className="gg-product-grid">
                      <div className="gg-product">
                        <h6>GMF00101F00683910317 - Super-Star Classic</h6>
                        <p><strong>Prix Wholesale (Achat) :</strong> €202/paire</p>
                        <p><strong>Cost Price (+20%) :</strong> €242/paire</p>
                        <p><strong>Prix Retail (Vente) :</strong> €485/paire</p>
                        <p><strong>Marge Brute :</strong> 140% par paire !</p>
                        <p><strong>Profit net :</strong> €283 par paire</p>
                      </div>
                      
                      <div className="gg-product">
                        <h6>GMF00101F00751683112 - Ball Star Leather</h6>
                        <p><strong>Prix Wholesale (Achat) :</strong> €214/paire</p>
                        <p><strong>Cost Price (+20%) :</strong> €257/paire</p>
                        <p><strong>Prix Retail (Vente) :</strong> €515/paire</p>
                        <p><strong>Marge Brute :</strong> 141% par paire !</p>
                        <p><strong>ROI Exceptionnel :</strong> €301 par paire</p>
                      </div>
                      
                      <div className="gg-product">
                        <h6>GMF00102F00218210803 - Premium Collection</h6>
                        <p><strong>Prix Wholesale (Achat) :</strong> €485/paire</p>
                        <p><strong>Cost Price (+20%) :</strong> €582/paire</p>
                        <p><strong>Prix Retail Estimé :</strong> €750-850/paire</p>
                        <p><strong>Marge Premium :</strong> 55-75%</p>
                        <p><strong>Segment :</strong> Ultra-luxury</p>
                      </div>
                    </div>
                    
                    <div className="gg-rtw-analysis">
                      <h5>👕 PRÊT-À-PORTER GOLDEN GOOSE</h5>
                      
                      <div className="gg-rtw-grid">
                        <div className="gg-rtw-item">
                          <h6>GWF01220F00100900 - T-Shirt Premium</h6>
                          <p><strong>Prix Wholesale (Achat) :</strong> €175</p>
                          <p><strong>Prix Retail (Vente) :</strong> €350-420</p>
                          <p><strong>Marge Brute :</strong> 100-140%</p>
                          <p><strong>ROI par pièce :</strong> €175-245</p>
                          <p><strong>Tailles Performantes :</strong> XS, S, M</p>
                        </div>
                        
                        <div className="gg-rtw-item">
                          <h6>GWF01220F00087910B3 - Collection T-Shirt</h6>
                          <p><strong>Prix Wholesale (Achat) :</strong> €175</p>
                          <p><strong>Prix Retail (Vente) :</strong> €330-400</p>
                          <p><strong>Marge Brute :</strong> 89-129%</p>
                          <p><strong>Stratégie Bundle :</strong> 3 pièces = Prix préférentiel</p>
                          <p><strong>Cross-selling :</strong> Avec sneakers +35% panier</p>
                          <p><strong>Saisonnalité :</strong> Forte demande mars-septembre</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="golden-goose-strategy">
                    <h5>🎯 STRATÉGIE TRANSFORMATION 1000€ → 3000€</h5>
                    <p><strong>Méthode SELEZIONE avec Golden Goose :</strong></p>
                    
                    <div className="transformation-steps">
                      <div className="step-transformation">
                        <h6>ÉTAPE 1 : ACHAT INITIAL (1000€)</h6>
                        <ul>
                          <li>5x Sneakers GMF00101F00683910317 à 202€ = 1010€</li>
                          <li><strong>Légèrement au-dessus budget mais ROI exceptionnel</strong></li>
                          <li><strong>Ciblage :</strong> Tailles 38-40 (rotation maximale)</li>
                        </ul>
                      </div>
                      
                      <div className="step-transformation">
                        <h6>ÉTAPE 2 : VENTE COST PRICE (Mois 1)</h6>
                        <ul>
                          <li>Vente rapide à 242€ × 5 = 1210€</li>
                          <li><strong>Bénéfice immédiat :</strong> 200€ (20%)</li>
                          <li>Capital sécurisé : 1210€</li>
                        </ul>
                      </div>
                      
                      <div className="step-transformation">
                        <h6>ÉTAPE 3 : VENTE RETAIL PREMIUM (Mois 2-3)</h6>
                        <ul>
                          <li>Vente retail optimale : 485€ × 5 = 2425€</li>
                          <li><strong>Profit net :</strong> 1415€ (140% marge !)</li>
                          <li><strong>Capital disponible :</strong> 2425€</li>
                        </ul>
                      </div>
                      
                      <div className="step-transformation">
                        <h6>ÉTAPE 4 : OBJECTIF 3000€+ (Mois 4-6)</h6>
                        <ul>
                          <li>Réinvestissement : 12 paires possible (2425/202)</li>
                          <li>Vente : 12 × 485€ = 5820€</li>
                          <li><strong>OBJECTIF 3000€ LARGEMENT DÉPASSÉ !</strong></li>
                          <li><strong>Scaling potentiel :</strong> 10,000€+ annuel</li>
                        </ul>
                      </div>
                    </div>

                    <div className="gg-success-secrets">
                      <h5>🔐 SECRETS DE RÉUSSITE GOLDEN GOOSE</h5>
                      
                      <div className="secret-box">
                        <h6>1️⃣ SIZING INTELLIGENCE</h6>
                        <p>Tailles 37-39 représentent 65% de la demande. Évitez 35 et 41+ (rotation lente).</p>
                      </div>
                      
                      <div className="secret-box">
                        <h6>2️⃣ COLOR STRATEGY</h6>
                        <p>Coloris Classic White/Black : rotation 3x plus rapide que coloris spéciaux.</p>
                      </div>
                      
                      <div className="secret-box">
                        <h6>3️⃣ BUNDLE PREMIUM</h6>
                        <p>Sneakers + T-shirt + accessoire = +35% panier moyen. Technique infaillible.</p>
                      </div>
                      
                      <div className="secret-box">
                        <h6>4️⃣ TIMING SAISONNIER</h6>
                        <p>Achat wholesale janvier-février. Peak vente mars-septembre. Stock clearance octobre.</p>
                      </div>
                    </div>

                    <div className="gg-testimonial">
                      <h6>🏆 TÉMOIGNAGE CLIENT SELEZIONE</h6>
                      <p><strong>Maria R., Milano (Partenaire depuis 2023) :</strong></p>
                      <p><em>"Avec la stratégie Golden Goose d'Alessandro, j'ai transformé 800€ en 4,200€ en 8 mois. La clé ? Suivre exactement ses conseils sur les tailles et les timings. Maintenant je gère un stock de 25K€ avec 85% de taux de rotation."</em></p>
                      <p><strong>Performance :</strong> ROI 425% • Rotation 8.5x/an • Satisfaction 100%</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>👜 SEGMENT 1 : MAROQUINERIE (45% du marché)</h3>
              <p><strong>132 milliards € • Le roi des segments</strong></p>
              
              <div className="segment-deep-dive">
                <div className="segment-analysis">
                  <h4>🔥 SOUS-SEGMENTS ULTRA-RENTABLES</h4>
                  
                  <div className="sub-segment">
                    <h5>1️⃣ HANDBAGS ICONIQUES (60% du segment)</h5>
                    <p><strong>Marge wholesale :</strong> 350-800%</p>
                    <p><strong>Rotation stock :</strong> 3.2x/an</p>
                    <p><strong>Top performers :</strong></p>
                    <ul>
                      <li>Hermès Birkin/Kelly : +15% à +200% value/an</li>
                      <li>Chanel 2.55/Boy : +8% à +25% value/an</li>
                      <li>Louis Vuitton Neverfull : Stable, volume élevé</li>
                      <li>Bottega Veneta Intrecciato : +12% tendance 2025</li>
                    </ul>
                    
                    <div className="pro-insight">
                      <h6>💡 INSIGHT ALESSANDRO :</h6>
                      <p><strong>"La règle des 3P :"</strong> Pour maximiser la rentabilité en maroquinerie, concentrez-vous sur les <strong>Pièces Patrimoniales Permanentes</strong>. Les sacs trendy rapportent moins que les iconiques. Un Birkin de 2010 vaut plus qu'un sac tendance de 2024.</p>
                    </div>
                  </div>
                  
                  <div className="sub-segment">
                    <h5>2️⃣ PETITE MAROQUINERIE (25% du segment)</h5>
                    <p><strong>Marge wholesale :</strong> 200-400%</p>
                    <p><strong>Rotation stock :</strong> 5.8x/an</p>
                    <p><strong>Points forts :</strong></p>
                    <ul>
                      <li>Portefeuilles : Cadeau homme #1</li>
                      <li>Porte-cartes : Micro-luxe accessible</li>
                      <li>Ceintures : Logomania forte demande</li>
                      <li>Key holders : Entry point jeune clientèle</li>
                    </ul>
                    
                    <div className="strategy-box">
                      <h6>🎯 STRATÉGIE GAGNANTE :</h6>
                      <p>La petite maroquinerie = <strong>porte d'entrée clients</strong>. Vendez un porte-cartes à 280€, créez la relation, vendez un sac à 1,800€ dans les 6 mois. Taux de conversion : 34%.</p>
                    </div>
                  </div>
                  
                  <div className="sub-segment">
                    <h5>3️⃣ TRAVEL GOODS (15% du segment)</h5>
                    <p><strong>Marge wholesale :</strong> 180-350%</p>
                    <p><strong>Saisonnalité :</strong> Peak mai-septembre</p>
                    <p><strong>Opportunités :</strong></p>
                    <ul>
                      <li>Valises rigides : Louis Vuitton Epi</li>
                      <li>Weekend bags : Goyard, Moynat</li>
                      <li>Business bags : Bottega Veneta, Berluti</li>
                      <li>Travel accessories : organisateurs, trousses</li>
                    </ul>
                  </div>
                </div>

                <div className="pricing-strategy">
                  <h4>💰 STRATÉGIE PRICING MAROQUINERIE</h4>
                  <table className="pricing-table">
                    <thead>
                      <tr>
                        <th>Catégorie</th>
                        <th>Prix Achat</th>
                        <th>Prix Vente</th>
                        <th>Marge %</th>
                        <th>Rotation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hermès Birkin 25</td>
                        <td>6,500€</td>
                        <td>12,000-15,000€</td>
                        <td>85-130%</td>
                        <td>0.8x/an</td>
                      </tr>
                      <tr>
                        <td>Chanel Classic Flap</td>
                        <td>3,200€</td>
                        <td>5,800-6,500€</td>
                        <td>81-103%</td>
                        <td>2.1x/an</td>
                      </tr>
                      <tr>
                        <td>LV Neverfull MM</td>
                        <td>850€</td>
                        <td>1,450-1,650€</td>
                        <td>71-94%</td>
                        <td>4.2x/an</td>
                      </tr>
                      <tr>
                        <td>Bottega Veneta Mini</td>
                        <td>1,200€</td>
                        <td>2,100-2,400€</td>
                        <td>75-100%</td>
                        <td>3.8x/an</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="expert-insight">
                <h4>💡 MASTER CLASS ALESSANDRO</h4>
                <p><strong>"La Règle du 60/30/10 pour Portfolio Optimal :"</strong></p>
                <ul>
                  <li><strong>60% CLASSIQUES :</strong> Produits intemporels, rotation sûre</li>
                  <li><strong>30% TENDANCES :</strong> Produits du moment, marge élevée</li>
                  <li><strong>10% PARIS :</strong> Nouveautés/tests, potentiel exceptionnel</li>
                </ul>
                <p><em>Cette répartition garantit stabilité ET croissance. Je l'applique depuis 15 ans avec 94% de réussite.</em></p>
                
                <div className="alessandro-advanced">
                  <h5>🎯 TECHNIQUE AVANCÉE : "LA MÉTHODE HERMÈS"</h5>
                  <p>Pour les clients premium, appliquez la psychologie Hermès même sur Golden Goose :</p>
                  <ul>
                    <li><strong>Rareté artificielle :</strong> "Il ne me reste que 2 paires en 38"</li>
                    <li><strong>Expertise technique :</strong> Expliquez la qualité cuir italien</li>
                    <li><strong>Storytelling :</strong> "Portées par Gigi Hadid la semaine dernière"</li>
                    <li><strong>Closing premium :</strong> "À ce prix, elles partiront demain"</li>
                  </ul>
                  <p><strong>Résultat :</strong> +40% closing rate • +25% panier moyen • 95% satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="chapter-content">
            <h2>💎 Chapitre 5 : Collections N-1 & Opportunités</h2>
            <div className="content-section">
              
              <h3>🔥 LE MARCHÉ CACHÉ DES COLLECTIONS N-1</h3>
              <p>Les collections N-1 représentent <strong>LA mine d'or cachée</strong> du luxe. 87% des revendeurs l'ignorent, ce qui crée des opportunités phénoménales pour les initiés.</p>
              
              <div className="n1-explanation">
                <h4>🎯 QU'EST-CE QUE LE N-1 EXACTEMENT ?</h4>
                <p><strong>Définition :</strong> Collections de la saison précédente vendues avec 40-80% de réduction par les maisons mères</p>
                <p><strong>Timing :</strong> Disponibles 3-6 mois après la fin de saison officielle</p>
                <p><strong>Qualité :</strong> 100% identique aux collections actuelles</p>
                <p><strong>Différence :</strong> Seule la saisonnalité change, pas la valeur intrinsèque</p>
              </div>

              <div className="n1-opportunities">
                <h4>💰 OPPORTUNITÉS PAR SEGMENT</h4>
                
                <div className="opportunity-tier diamond">
                  <h5>💎 TIER DIAMANT - ROI 300-800%</h5>
                  
                  <div className="opportunity-item">
                    <h6>👜 MAROQUINERIE ICONIQUE</h6>
                    <p><strong>Exemple concret :</strong> Chanel 2.55 Classic Flap</p>
                    <ul>
                      <li><strong>Prix retail current :</strong> €6,200</li>
                      <li><strong>Prix N-1 wholesale :</strong> €2,800</li>
                      <li><strong>Prix revente :</strong> €5,500-5,800</li>
                      <li><strong>Profit net :</strong> €2,700-3,000 (96-107% ROI)</li>
                    </ul>
                    <p><strong>Pourquoi ça marche :</strong> Les clients ne voient aucune différence entre N-1 et current</p>
                  </div>
                  
                  <div className="opportunity-item">
                    <h6>👠 CHAUSSURES PREMIUM</h6>
                    <p><strong>Exemple :</strong> Louboutin So Kate 120mm</p>
                    <ul>
                      <li><strong>Prix retail current :</strong> €795</li>
                      <li><strong>Prix N-1 wholesale :</strong> €380</li>
                      <li><strong>Prix revente :</strong> €650-720</li>
                      <li><strong>Profit net :</strong> €270-340 (71-89% ROI)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="opportunity-tier gold">
                  <h5>🥇 TIER OR - ROI 150-300%</h5>
                  
                  <div className="opportunity-categories">
                    <div className="category-n1">
                      <h6>👗 PRÊT-À-PORTER COUTURE</h6>
                      <p><strong>Marques phares :</strong> Saint Laurent, Dior, Valentino</p>
                      <p><strong>Réduction moyenne :</strong> 60-75%</p>
                      <p><strong>Marge typique :</strong> 180-250%</p>
                      <p><strong>Rotation :</strong> 2-3 mois</p>
                    </div>
                    
                    <div className="category-n1">
                      <h6>💍 BIJOUTERIE FINE</h6>
                      <p><strong>Marques :</strong> Cartier, Van Cleef, Bulgari</p>
                      <p><strong>Réduction :</strong> 45-65%</p>
                      <p><strong>Avantage :</strong> Intemporel (pas de saisonnalité)</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>📅 CALENDRIER STRATÉGIQUE N-1</h3>
              <p>Le timing est TOUT dans le N-1. Voici mon calendrier secret développé sur 15 ans :</p>
              
              <div className="n1-calendar">
                <div className="calendar-month premium">
                  <h4>🔥 FÉVRIER - "WINTER CLEARANCE GOLD RUSH"</h4>
                  <p><strong>Collections disponibles :</strong> AW 2024 (octobre-janvier)</p>
                  <p><strong>Réductions :</strong> 70-85% (liquidation maximale)</p>
                  <p><strong>Focus produits :</strong></p>
                  <ul>
                    <li>Manteaux luxe (Canada Goose, Moncler) : -80%</li>
                    <li>Boots premium (Saint Laurent, Bottega) : -75%</li>
                    <li>Knitwear cashmere (Brunello, Loro Piana) : -70%</li>
                  </ul>
                  <p><strong>Budget recommandé :</strong> 45% budget annuel</p>
                  <p><strong>ROI prévu :</strong> 200-400%</p>
                </div>
                
                <div className="calendar-month premium">
                  <h4>☀️ AOÛT - "SUMMER LIQUIDATION BONANZA"</h4>
                  <p><strong>Collections :</strong> SS 2025 (mars-juillet)</p>
                  <p><strong>Réductions :</strong> 60-80%</p>
                  <p><strong>Opportunités spéciales :</strong></p>
                  <ul>
                    <li>Robes soirée (Zimmermann, Self-Portrait) : -75%</li>
                    <li>Sandales luxe (Aquazzura, Gianvito Rossi) : -70%</li>
                    <li>Bikinis designer (Eres, La Perla) : -80%</li>
                  </ul>
                  <p><strong>Stratégie :</strong> Stock pour saison suivante</p>
                </div>
                
                <div className="calendar-month">
                  <h4>🍂 OCTOBRE - "PRE-SEASON PREVIEW"</h4>
                  <p><strong>Collections :</strong> SS 2025 early releases</p>
                  <p><strong>Avantage :</strong> Prix N-1 sur collections quasi-actuelles</p>
                  <p><strong>Réduction :</strong> 40-60% (encore acceptable pour maisons)</p>
                </div>
                
                <div className="calendar-month">
                  <h4>🎄 DÉCEMBRE - "HOLIDAY SPECIAL DEALS"</h4>
                  <p><strong>Opportunité unique :</strong> Cadeaux N-1 indétectables</p>
                  <p><strong>Focus :</strong> Petite maroquinerie, bijoux, parfums</p>
                  <p><strong>Margin boost :</strong> +300% sur période gifts</p>
                </div>
              </div>

              <h3>🎯 MES TECHNIQUES EXCLUSIVES D'ACHAT N-1</h3>
              
              <div className="n1-techniques">
                <div className="technique-master">
                  <h4>1️⃣ LA "BULK NEGOTIATION ALESSANDRO"</h4>
                  <p><strong>Principe :</strong> Négocier des lots entiers plutôt que pièce par pièce</p>
                  
                  <div className="technique-example">
                    <h5>📊 EXEMPLE RÉEL - SAINT LAURENT OCTOBRE 2024</h5>
                    <p><strong>Situation :</strong> 47 pièces RTW femme collection SS24</p>
                    <p><strong>Prix détail total :</strong> €89,340</p>
                    <p><strong>Prix proposé unitaire :</strong> €1,240/pièce = €58,280</p>
                    <p><strong>Ma négociation bulk :</strong> €35,000 pour le lot complet</p>
                    <p><strong>Réduction obtenue :</strong> 61% vs retail, 40% vs prix proposé</p>
                    <p><strong>Revente réalisée :</strong> €67,800</p>
                    <p><strong>Profit net :</strong> €32,800 (94% ROI)</p>
                  </div>
                  
                  <div className="technique-steps">
                    <h5>🎯 ÉTAPES DE LA NÉGOCIATION</h5>
                    <ol>
                      <li><strong>Analyse du lot :</strong> Identifier les pièces star vs filler</li>
                      <li><strong>Calcul valeur réelle :</strong> Prix revente probable total</li>
                      <li><strong>Offre stratégique :</strong> 40-50% de la valeur revente</li>
                      <li><strong>Argument temps :</strong> "Liquidation immédiate vs stock mort"</li>
                      <li><strong>Paiement comptant :</strong> Cash flow immédiat pour la marque</li>
                    </ol>
                  </div>
                </div>
                
                <div className="technique-master">
                  <h4>2️⃣ LA "ROTATION SAISONNIÈRE"</h4>
                  <p><strong>Concept :</strong> Acheter N-1 en contre-saison pour revendre en saison</p>
                  
                  <div className="rotation-example">
                    <h5>🔄 CYCLE OPTIMISÉ - MAILLOTS DE BAIN</h5>
                    <p><strong>Achat :</strong> Septembre N-1 (liquidation été)</p>
                    <p><strong>Prix :</strong> €45 wholesale (retail €180)</p>
                    <p><strong>Stockage :</strong> Octobre-avril (7 mois)</p>
                    <p><strong>Revente :</strong> Mai-juillet année suivante</p>
                    <p><strong>Prix vente :</strong> €140-160 (client voit prix actuel)</p>
                    <p><strong>ROI final :</strong> 211-256%</p>
                  </div>
                </div>
                
                <div className="technique-master">
                  <h4>3️⃣ LE "REBRANDING SUBTIL"</h4>
                  <p><strong>Technique avancée :</strong> Présenter le N-1 comme "édition précédente" premium</p>
                  
                  <div className="rebranding-strategy">
                    <h5>💼 STRATÉGIE DE PRÉSENTATION</h5>
                    <ul>
                      <li><strong>Terminologie :</strong> "Collection précédente" au lieu de "N-1"</li>
                      <li><strong>Avantage client :</strong> "Prix exceptionnel sur modèle iconique"</li>
                      <li><strong>Rareté :</strong> "Dernières pièces disponibles"</li>
                      <li><strong>Exclusivité :</strong> "Accès privilégié à notre réseau"</li>
                    </ul>
                    <p><strong>Résultat :</strong> 89% des clients acceptent sans négociation</p>
                  </div>
                </div>
              </div>

              <h3>🏆 CAS D'ÉTUDE : MON PLUS GROS COUP N-1</h3>
              
              <div className="mega-deal-study">
                <h4>💎 L'AFFAIRE HERMÈS KELLY - NOVEMBRE 2023</h4>
                
                <div className="deal-timeline">
                  <div className="deal-phase">
                    <h5>📞 PHASE 1 : L'OPPORTUNITÉ</h5>
                    <p><strong>Contact :</strong> Directeur Hermès Italie (relation 8 ans)</p>
                    <p><strong>Situation :</strong> 12 Kelly 28cm collection AW22 invendues</p>
                    <p><strong>Raison :</strong> Coloris "Vert Amande" jugés difficiles</p>
                    <p><strong>Prix retail :</strong> €9,100 × 12 = €109,200</p>
                  </div>
                  
                  <div className="deal-phase">
                    <h5>🧠 PHASE 2 : L'ANALYSE</h5>
                    <p><strong>Recherche marché :</strong> Vert Amande très demandé au Japon/Corée</p>
                    <p><strong>Prix seconde main :</strong> €7,500-8,200 (85-90% retail)</p>
                    <p><strong>Ma conviction :</strong> Coloris avant-gardiste, futur collector</p>
                  </div>
                  
                  <div className="deal-phase">
                    <h5>💰 PHASE 3 : LA NÉGOCIATION</h5>
                    <p><strong>Prix initial Hermès :</strong> €6,500/pièce (€78,000 total)</p>
                    <p><strong>Ma contre-offre :</strong> €5,200/pièce (€62,400 total)</p>
                    <p><strong>Argument :</strong> "Paiement immédiat + libération stock"</p>
                    <p><strong>Prix final :</strong> €5,500/pièce (€66,000 total)</p>
                  </div>
                  
                  <div className="deal-phase">
                    <h5>🚀 PHASE 4 : LA REVENTE</h5>
                    <p><strong>Canal 1 :</strong> 8 pièces via réseau asiatique (€8,100/pièce)</p>
                    <p><strong>Canal 2 :</strong> 4 pièces collectors européens (€8,400/pièce)</p>
                    <p><strong>Total revente :</strong> €98,400</p>
                    <p><strong>Profit net :</strong> €32,400 (49% ROI en 6 mois)</p>
                  </div>
                </div>
                
                <div className="deal-lessons">
                  <h5>🎓 LEÇONS APPRISES</h5>
                  <ul>
                    <li><strong>Vision long terme :</strong> Ce qui est "difficile" aujourd'hui peut être tendance demain</li>
                    <li><strong>Réseau global :</strong> Un coloris rejeté en Europe peut être adoré en Asie</li>
                    <li><strong>Relation supplier :</strong> 8 ans de confiance = accès aux meilleures opportunités</li>
                    <li><strong>Cash flow :</strong> Paiement immédiat = pouvoir de négociation maximal</li>
                  </ul>
                </div>
              </div>

              <h3>🌐 SOURCING N-1 : MES CONTACTS EXCLUSIFS</h3>
              
              <div className="sourcing-network">
                <div className="source-tier platinum">
                  <h4>🏆 TIER PLATINUM - ACCÈS DIRECT MAISONS</h4>
                  
                  <div className="source-contact">
                    <h5>🇫🇷 CHANEL FRANCE</h5>
                    <p><strong>Contact :</strong> Marie Dubois - Directrice Commercial B2B</p>
                    <p><strong>Email :</strong> marie.dubois@chanel.com</p>
                    <p><strong>Téléphone :</strong> +33 1 44 50 73 00</p>
                    <p><strong>Spécialité :</strong> Maroquinerie classique N-1</p>
                    <p><strong>Conditions :</strong> €200K+ volume annuel, références bancaires</p>
                    <p><strong>Réductions :</strong> 55-75% vs retail</p>
                  </div>
                  
                  <div className="source-contact">
                    <h5>🇮🇹 BOTTEGA VENETA</h5>
                    <p><strong>Contact :</strong> Marco Santini - Key Account Manager</p>
                    <p><strong>Email :</strong> marco.santini@bottegaveneta.com</p>
                    <p><strong>Mobile :</strong> +39 334 567 8901</p>
                    <p><strong>Spécialité :</strong> Cuir Intrecciato toutes catégories</p>
                    <p><strong>Minimum :</strong> €50K par commande</p>
                    <p><strong>Timing :</strong> Juin et décembre (2 liquidations/an)</p>
                  </div>
                </div>
                
                <div className="source-tier gold">
                  <h4>🥇 TIER GOLD - DISTRIBUTEURS PREMIUM</h4>
                  
                  <div className="distributors-grid">
                    <div className="distributor-card">
                      <h6>🇩🇪 LUXURY BRIDGE BERLIN</h6>
                      <p><strong>Spécialité :</strong> Marques allemandes premium</p>
                      <p><strong>Contact :</strong> Klaus Weber</p>
                      <p><strong>Réductions :</strong> 45-65%</p>
                    </div>
                    
                    <div className="distributor-card">
                      <h6>🇬🇧 LONDON LUXURY OUTLET</h6>
                      <p><strong>Focus :</strong> Marques britanniques</p>
                      <p><strong>Contact :</strong> James Morrison</p>
                      <p><strong>Avantage :</strong> Post-Brexit pricing</p>
                    </div>
                    
                    <div className="distributor-card">
                      <h6>🇪🇸 MADRID PREMIUM DISTRIBUTION</h6>
                      <p><strong>Spécialité :</strong> Cuir espagnol, Loewe N-1</p>
                      <p><strong>Contact :</strong> Carmen Rodriguez</p>
                      <p><strong>Volume :</strong> €1.2M+ disponible</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>📊 ANALYSE ROI : N-1 VS AUTRES STRATÉGIES</h3>
              
              <div className="roi-comparison">
                <div className="strategy-comparison">
                  <h4>💹 COMPARATIF PERFORMANCE (ROI 12 MOIS)</h4>
                  
                  <div className="comparison-table">
                    <div className="comparison-row header">
                      <div className="col-strategy">Stratégie</div>
                      <div className="col-investment">Investment</div>
                      <div className="col-roi">ROI %</div>
                      <div className="col-risk">Risque</div>
                      <div className="col-time">Temps</div>
                    </div>
                    
                    <div className="comparison-row winner">
                      <div className="col-strategy">🏆 Collections N-1</div>
                      <div className="col-investment">€100K</div>
                      <div className="col-roi">187%</div>
                      <div className="col-risk">Faible</div>
                      <div className="col-time">3-6 mois</div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="col-strategy">📈 Retail Classique</div>
                      <div className="col-investment">€100K</div>
                      <div className="col-roi">67%</div>
                      <div className="col-risk">Moyen</div>
                      <div className="col-time">6-12 mois</div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="col-strategy">🔄 Seconde Main</div>
                      <div className="col-investment">€100K</div>
                      <div className="col-roi">134%</div>
                      <div className="col-risk">Élevé</div>
                      <div className="col-time">2-8 mois</div>
                    </div>
                    
                    <div className="comparison-row">
                      <div className="col-strategy">🏪 Outlets</div>
                      <div className="col-investment">€100K</div>
                      <div className="col-roi">89%</div>
                      <div className="col-risk">Moyen</div>
                      <div className="col-time">1-4 mois</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-plan-n1">
                <h3>🎯 PLAN D'ACTION N-1 - DÉMARRAGE IMMÉDIAT</h3>
                
                <div className="action-steps">
                  <div className="action-step priority">
                    <h4>SEMAINE 1-2 : SETUP INITIAL</h4>
                    <ul>
                      <li>✅ Créer liste contacts fournisseurs N-1</li>
                      <li>✅ Définir budget allocation (recommandé : €50K minimum)</li>
                      <li>✅ Préparer références bancaires et garanties</li>
                      <li>✅ Étudier les cycles saisonniers de vos marques cibles</li>
                    </ul>
                  </div>
                  
                  <div className="action-step">
                    <h4>SEMAINE 3-4 : PREMIERS CONTACTS</h4>
                    <ul>
                      <li>📞 Appeler 5 contacts tier Gold minimum</li>
                      <li>📧 Envoyer dossier présentation (template fourni)</li>
                      <li>🏢 Programmer visites showrooms/entrepôts</li>
                      <li>📊 Négocier premiers lots test (€5-10K)</li>
                    </ul>
                  </div>
                  
                  <div className="action-step">
                    <h4>MOIS 2 : SCALING</h4>
                    <ul>
                      <li>🔥 Augmenter volumes sur suppliers performants</li>
                      <li>📈 Analyser ROI premiers lots</li>
                      <li>🎯 Identifier niches ultra-rentables</li>
                      <li>🌐 Développer réseau revente (online + offline)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="expert-insight">
                <h4>🔥 SECRET D'ALESSANDRO : LA "RÈGLE DES 5 SAISONS"</h4>
                <p><em>"Dans le N-1, ne pensez jamais à une seule saison. Quand j'achète du N-1 hiver, je pense déjà à l'hiver suivant. La rotation saisonnière multiplique les profits par 3."</em></p>
                
                <div className="five-seasons-rule">
                  <h5>🔄 APPLICATION PRATIQUE</h5>
                  <ul>
                    <li><strong>Saison -1 :</strong> Achat liquidation (février pour hiver)</li>
                    <li><strong>Saison 0 :</strong> Stockage stratégique (mars-octobre)</li>
                    <li><strong>Saison +1 :</strong> Lancement ventes (novembre)</li>
                    <li><strong>Saison +2 :</strong> Peak sales période (décembre-janvier)</li>
                    <li><strong>Saison +3 :</strong> Liquidation finale + réinvestissement</li>
                  </ul>
                  <p><strong>ROI final :</strong> 340% vs 140% en vente immédiate</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="chapter-content">
            <h2>♻️ Chapitre 6 : Seconde Main Premium</h2>
            <div className="content-section">
              
              <h3>🌟 LA RÉVOLUTION SECONDE MAIN LUXURY</h3>
              <p>Le marché de la seconde main luxury a explosé : <strong>+65% croissance annuelle</strong> depuis 2020. Mais 90% des acteurs font fausse route. Voici comment dominer ce segment.</p>
              
              <div className="market-revolution">
                <h4>📊 CHIFFRES CHOCS 2025</h4>
                <div className="stats-revolution">
                  <div className="stat-item">
                    <h5>💰 MARCHÉ GLOBAL</h5>
                    <p><strong>€47 milliards</strong> en 2025</p>
                    <p><strong>Projection 2030 :</strong> €89 milliards</p>
                    <p><strong>Croissance :</strong> +23% annuelle</p>
                  </div>
                  
                  <div className="stat-item">
                    <h5>👥 DEMOGRAPHICS</h5>
                    <p><strong>Millennials :</strong> 67% des acheteurs</p>
                    <p><strong>Gen Z :</strong> +127% adoption 2024</p>
                    <p><strong>UHNW :</strong> 34% achètent seconde main</p>
                  </div>
                  
                  <div className="stat-item">
                    <h5>🏆 TOP PERFORMERS</h5>
                    <p><strong>Hermès :</strong> +15% value/an</p>
                    <p><strong>Chanel :</strong> +12% value/an</p>
                    <p><strong>Rolex :</strong> +18% value/an</p>
                  </div>
                </div>
              </div>

              <h3>🎯 MA HIÉRARCHIE SECONDE MAIN</h3>
              <p>Tous les articles seconde main ne se valent pas. Voici ma classification exclusive :</p>
              
              <div className="secondhand-hierarchy">
                <div className="sh-tier god">
                  <h4>👑 TIER GOD - INVESTMENT GRADE</h4>
                  <p><strong>Critères :</strong> Appreciation +10%/an + Liquidité élevée</p>
                  
                  <div className="god-tier-items">
                    <div className="investment-item">
                      <h5>💎 HERMÈS BIRKIN/KELLY</h5>
                      <p><strong>Appreciation moyenne :</strong> +15-25%/an</p>
                      <p><strong>Conditions exigées :</strong> Excellent (A) minimum</p>
                      <p><strong>Couleurs premium :</strong> Noir, Gold, Gris Éléphant</p>
                      <p><strong>Tailles roi :</strong> 25cm (+premium), 30cm (liquide)</p>
                      <p><strong>ROI stratégie :</strong> Achat €8K → Revente €12K (2 ans)</p>
                    </div>
                    
                    <div className="investment-item">
                      <h5>⌚ ROLEX SPORTS MODELS</h5>
                      <p><strong>Stars absolues :</strong> Daytona, GMT-Master II, Submariner</p>
                      <p><strong>Appreciation :</strong> +18-35%/an selon modèle</p>
                      <p><strong>État minimum :</strong> Excellent avec papiers</p>
                      <p><strong>Exemple ROI :</strong> Daytona Panda €25K → €35K (18 mois)</p>
                    </div>
                    
                    <div className="investment-item">
                      <h5>👜 CHANEL TIMELESS</h5>
                      <p><strong>Modèles :</strong> 2.55, Boy, 19</p>
                      <p><strong>Appreciation :</strong> +8-15%/an</p>
                      <p><strong>Avantage :</strong> Prix retail en hausse constante</p>
                      <p><strong>Stratégie :</strong> Focus sur limited editions</p>
                    </div>
                  </div>
                </div>
                
                <div className="sh-tier s">
                  <h4>🥈 TIER S - STABLE LUXURY</h4>
                  
                  <div className="stable-categories">
                    <div className="stable-item">
                      <h5>👠 CHAUSSURES ICONIQUES</h5>
                      <p><strong>Marques :</strong> Louboutin, Manolo Blahnik, Jimmy Choo</p>
                      <p><strong>Modèles sûrs :</strong> So Kate, Pigalle, Hangisi</p>
                      <p><strong>Dépréciation :</strong> -20% max (vs -60% mode classique)</p>
                      <p><strong>Rotation :</strong> 3-6 mois</p>
                    </div>
                    
                    <div className="stable-item">
                      <h5>🧥 OUTERWEAR PREMIUM</h5>
                      <p><strong>Stars :</strong> Canada Goose, Moncler, Stone Island</p>
                      <p><strong>Saisonnalité :</strong> Achat été, vente hiver</p>
                      <p><strong>Marge typique :</strong> 40-80%</p>
                    </div>
                  </div>
                </div>
                
                <div className="sh-tier a">
                  <h4>🥉 TIER A - VOLUME BUSINESS</h4>
                  <p><strong>Principe :</strong> Marge faible mais rotation rapide</p>
                  <p><strong>Exemples :</strong> Golden Goose, Off-White, Balenciaga sneakers</p>
                  <p><strong>ROI :</strong> 25-50% mais turnover mensuel</p>
                </div>
              </div>

              <h3>🔍 L'ART DE L'AUTHENTIFICATION</h3>
              <p>Mon processus d'authentification en 47 points (taux d'erreur : 0.003%)</p>
              
              <div className="authentication-mastery">
                <div className="auth-category premium">
                  <h4>🏆 HERMÈS - NIVEAU EXPERT</h4>
                  
                  <div className="auth-points">
                    <div className="auth-detail">
                      <h5>🔍 CONTRÔLES VISUELS (15 points)</h5>
                      <ul>
                        <li><strong>Sangles :</strong> Symétrie parfaite, écartement 1.2mm exact</li>
                        <li><strong>Coutures :</strong> Point sellier 3.2mm, fil 100% lin</li>
                        <li><strong>Hardware :</strong> Palladium sans bulles, gravure nette</li>
                        <li><strong>Cuir :</strong> Grain naturel, pas de plastification</li>
                        <li><strong>Clochette :</strong> Poids 12g ±0.5g, son cristallin</li>
                      </ul>
                    </div>
                    
                    <div className="auth-detail">
                      <h5>📏 MESURES PRÉCISES (8 points)</h5>
                      <ul>
                        <li><strong>Birkin 30 :</strong> 30×22×16cm (tolérance ±2mm)</li>
                        <li><strong>Kelly 28 :</strong> 28×22×10cm exact</li>
                        <li><strong>Poids :</strong> Birkin 30 = 1,050g ±20g</li>
                        <li><strong>Poignées :</strong> Écartement 11.5cm exact</li>
                      </ul>
                    </div>
                    
                    <div className="auth-detail">
                      <h5>🔬 TESTS AVANCÉS (12 points)</h5>
                      <ul>
                        <li><strong>UV Light :</strong> Cuir authentique ne fluoresce pas</li>
                        <li><strong>Aimant :</strong> Hardware palladium non magnétique</li>
                        <li><strong>Odeur :</strong> Cuir naturel, pas de chimique</li>
                        <li><strong>Flexibility :</strong> Cuir souple mais résistant</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="auth-category">
                  <h4>⌚ ROLEX - PROTOCOLE TECHNIQUE</h4>
                  
                  <div className="rolex-auth">
                    <div className="auth-step">
                      <h5>🔧 TESTS MÉCANIQUES</h5>
                      <ul>
                        <li><strong>Mouvement :</strong> Balancier 28,800 A/h exact</li>
                        <li><strong>Couronne :</strong> Vissage sens horaire, 3.5 tours</li>
                        <li><strong>Remontage :</strong> 40 tours complets maximum</li>
                        <li><strong>Precision :</strong> -2/+2 sec/jour maximum</li>
                      </ul>
                    </div>
                    
                    <div className="auth-step">
                      <h5>👁️ DÉTAILS VISUELS</h5>
                      <ul>
                        <li><strong>Cyclope :</strong> Grossissement x2.5 exact</li>
                        <li><strong>Rehaut :</strong> Gravure ROLEX invisible sauf angle</li>
                        <li><strong>Aiguilles :</strong> Luminova Swiss Super-LumiNova</li>
                        <li><strong>Cadran :</strong> Index appliqués, pas imprimés</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3>💰 STRATÉGIES D'ACHAT SECONDE MAIN</h3>
              
              <div className="buying-strategies">
                <div className="strategy-master">
                  <h4>1️⃣ LA "SNIPER STRATEGY"</h4>
                  <p><strong>Principe :</strong> Cibler 5-10 pièces spécifiques et attendre LE deal parfait</p>
                  
                  <div className="sniper-example">
                    <h5>🎯 EXEMPLE : BIRKIN 30 NOIR TOGO</h5>
                    <p><strong>Prix marché :</strong> €12,000-15,000</p>
                    <p><strong>Mon prix max :</strong> €9,500 (cible 37% marge min)</p>
                    <p><strong>Temps d'attente :</strong> 3-8 mois pour la bonne affaire</p>
                    <p><strong>Résultat :</strong> Achat €8,900, revente €13,500 (52% ROI)</p>
                  </div>
                  
                  <div className="sniper-tools">
                    <h5>🛠️ OUTILS MONITORING</h5>
                    <ul>
                      <li><strong>Vestiaire Collective :</strong> Alertes prix + notifications</li>
                      <li><strong>Rebag :</strong> Section "Just In" surveillée 3x/jour</li>
                      <li><strong>The RealReal :</strong> Consignments preview</li>
                      <li><strong>1stDibs :</strong> Enchères finissantes</li>
                    </ul>
                  </div>
                </div>
                
                <div className="strategy-master">
                  <h4>2️⃣ LA "BULK ESTATE STRATEGY"</h4>
                  <p><strong>Concept :</strong> Acheter des collections entières (successions, divorces, déménagements)</p>
                  
                  <div className="estate-case-study">
                    <h5>💼 CAS RÉEL : ESTATE PARISIENNE 2024</h5>
                    <p><strong>Situation :</strong> Veuve 78 ans, collection 40 ans</p>
                    <p><strong>Contenu :</strong> 23 sacs Hermès, 47 pièces Chanel, bijoux</p>
                    <p><strong>Valeur estimée :</strong> €340,000</p>
                    <p><strong>Prix négocié :</strong> €180,000 (lot complet)</p>
                    <p><strong>Revente échelonnée :</strong> €387,000 (sur 18 mois)</p>
                    <p><strong>Profit net :</strong> €207,000 (115% ROI)</p>
                  </div>
                  
                  <div className="estate-sourcing">
                    <h5>🔍 SOURCES ESTATES</h5>
                    <ul>
                      <li><strong>Notaires luxe :</strong> Successions importantes</li>
                      <li><strong>Avocats divorces :</strong> Liquidations urgentes</li>
                      <li><strong>Déménageurs premium :</strong> Expatriations</li>
                      <li><strong>Personal shoppers :</strong> Clientes décédées</li>
                    </ul>
                  </div>
                </div>
                
                <div className="strategy-master">
                  <h4>3️⃣ LA "ARBITRAGE GÉOGRAPHIQUE"</h4>
                  <p><strong>Principe :</strong> Exploiter les écarts de prix entre pays/régions</p>
                  
                  <div className="geo-arbitrage">
                    <h5>🌍 ÉCARTS GÉOGRAPHIQUES TYPIQUES</h5>
                    <div className="geo-examples">
                      <div className="geo-example">
                        <h6>🇺🇸 USA → 🇪🇺 EUROPE</h6>
                        <p><strong>Avantage :</strong> Dollar faible + tax refund</p>
                        <p><strong>Produits :</strong> Hermès, Chanel (-15-25%)</p>
                        <p><strong>Coût logistique :</strong> 3-5% du prix</p>
                      </div>
                      
                      <div className="geo-example">
                        <h6>🇯🇵 JAPON → 🇪🇺 EUROPE</h6>
                        <p><strong>Spécialité :</strong> Vintage Hermès impeccables</p>
                        <p><strong>Avantage :</strong> Conservation parfaite + prix doux</p>
                        <p><strong>Écart :</strong> 20-40% sous prix européens</p>
                      </div>
                      
                      <div className="geo-example">
                        <h6>🇮🇹 ITALIE → 🇩🇪 ALLEMAGNE</h6>
                        <p><strong>Focus :</strong> Marques italiennes (Bottega, Gucci)</p>
                        <p><strong>Écart :</strong> 10-20% moins cher en Italie</p>
                        <p><strong>Transport :</strong> 2-3 jours, coût minimal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3>🏪 CANAUX DE REVENTE OPTIMISÉS</h3>
              
              <div className="resale-channels">
                <div className="channel-tier premium">
                  <h4>🏆 TIER PREMIUM - MARGES MAXIMALES</h4>
                  
                  <div className="premium-channel">
                    <h5>🤝 VENTE DIRECTE PRIVÉE</h5>
                    <p><strong>Clientèle :</strong> Réseau personnel, clients fidèles</p>
                    <p><strong>Marge :</strong> 60-150% (prix retail -10%)</p>
                    <p><strong>Volume :</strong> 30% de mon business</p>
                    <p><strong>Avantages :</strong> Pas de commission, relation long terme</p>
                    
                    <div className="private-client-profile">
                      <h6>👥 PROFIL CLIENTS PRIVÉS</h6>
                      <ul>
                        <li><strong>UHNW individuals :</strong> Discrétion + authenticité</li>
                        <li><strong>Épouses dirigeants :</strong> Luxe accessible</li>
                        <li><strong>Collectionneurs :</strong> Pièces rares/vintage</li>
                        <li><strong>Influenceurs :</strong> Contenus + réseaux</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="premium-channel">
                    <h5>🏬 SHOWROOM PRIVÉ</h5>
                    <p><strong>Concept :</strong> Boutique éphémère sur RDV</p>
                    <p><strong>Location :</strong> Via Brera 21, Milano (€2,500/mois)</p>
                    <p><strong>Clientèle :</strong> 150 clientes VIP actives</p>
                    <p><strong>CA mensuel :</strong> €85,000 moyenne</p>
                    <p><strong>Marge :</strong> 70-120% (pricing premium accepté)</p>
                  </div>
                </div>
                
                <div className="channel-tier professional">
                  <h4>💼 TIER PROFESSIONNEL - VOLUME & VITESSE</h4>
                  
                  <div className="professional-channels">
                    <div className="pro-channel">
                      <h5>🌐 VESTIAIRE COLLECTIVE</h5>
                      <p><strong>Commission :</strong> 18-23% selon statut</p>
                      <p><strong>Audience :</strong> 23M utilisateurs worldwide</p>
                      <p><strong>Rotation :</strong> 2-8 semaines moyenne</p>
                      <p><strong>Ma performance :</strong> 97% sell-through rate</p>
                    </div>
                    
                    <div className="pro-channel">
                      <h5>💎 THE REALREAL</h5>
                      <p><strong>Commission :</strong> 30-50% (mais service complet)</p>
                      <p><strong>Service :</strong> Photo, description, authentification</p>
                      <p><strong>Clientèle :</strong> UHNW américaine</p>
                      <p><strong>Spécialité :</strong> Hermès, montres, bijoux</p>
                    </div>
                    
                    <div className="pro-channel">
                      <h5>🏺 1STDIBS</h5>
                      <p><strong>Focus :</strong> Vintage et pièces rares</p>
                      <p><strong>Commission :</strong> 12-15%</p>
                      <p><strong>Audience :</strong> Collectionneurs sérieux</p>
                      <p><strong>Prix :</strong> Premium accepté (+20-30%)</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>📈 PRICING STRATEGY AVANCÉE</h3>
              
              <div className="pricing-mastery">
                <div className="pricing-method">
                  <h4>🧮 MA FORMULE PRICING EXCLUSIVE</h4>
                  
                  <div className="pricing-formula">
                    <h5>💡 FORMULE ALESSANDRO</h5>
                    <p><strong>Prix Vente = (Prix Achat × 1.8) + (État × €500) + (Rareté × €1000) + (Timing × 0.2)</strong></p>
                    
                    <div className="formula-breakdown">
                      <div className="factor">
                        <h6>📊 FACTEUR ÉTAT</h6>
                        <ul>
                          <li><strong>Neuf (A+) :</strong> Coefficient 1.0</li>
                          <li><strong>Excellent (A) :</strong> Coefficient 0.85</li>
                          <li><strong>Très bon (B+) :</strong> Coefficient 0.70</li>
                          <li><strong>Bon (B) :</strong> Coefficient 0.55</li>
                        </ul>
                      </div>
                      
                      <div className="factor">
                        <h6>🔥 FACTEUR RARETÉ</h6>
                        <ul>
                          <li><strong>Limited Edition :</strong> +€2,000</li>
                          <li><strong>Discontinued :</strong> +€1,500</li>
                          <li><strong>Coloris rare :</strong> +€1,000</li>
                          <li><strong>Taille rare :</strong> +€500</li>
                        </ul>
                      </div>
                      
                      <div className="factor">
                        <h6>⏰ FACTEUR TIMING</h6>
                        <ul>
                          <li><strong>Peak saison :</strong> +20%</li>
                          <li><strong>Normale :</strong> 0%</li>
                          <li><strong>Contre-saison :</strong> -15%</li>
                          <li><strong>Liquidation :</strong> -30%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pricing-examples">
                  <h4>📝 EXEMPLES PRICING RÉELS</h4>
                  
                  <div className="pricing-case">
                    <h5>💼 CAS 1 : BIRKIN 30 NOIR TOGO</h5>
                    <p><strong>Prix achat :</strong> €9,200</p>
                    <p><strong>État :</strong> Excellent (A) = coefficient 0.85</p>
                    <p><strong>Rareté :</strong> Standard = €0</p>
                    <p><strong>Timing :</strong> Peak (décembre) = +20%</p>
                    <p><strong>Calcul :</strong> (9,200 × 1.8 × 0.85) + 0 + 0 + (16,560 × 0.2)</p>
                    <p><strong>Prix final :</strong> €17,372 → <strong>€17,400</strong></p>
                    <p><strong>Marge :</strong> €8,200 (89% ROI)</p>
                  </div>
                  
                  <div className="pricing-case">
                    <h5>⌚ CAS 2 : ROLEX DAYTONA PANDA</h5>
                    <p><strong>Prix achat :</strong> €22,000</p>
                    <p><strong>État :</strong> Neuf (A+) = coefficient 1.0</p>
                    <p><strong>Rareté :</strong> Discontinued = +€1,500</p>
                    <p><strong>Timing :</strong> Normal = 0%</p>
                    <p><strong>Calcul :</strong> (22,000 × 1.8) + 1,500 + 0 + 0</p>
                    <p><strong>Prix final :</strong> €41,100</p>
                    <p><strong>Marge :</strong> €19,100 (87% ROI)</p>
                  </div>
                </div>
              </div>

              <div className="expert-insight">
                <h4>🔥 MES 3 RÈGLES D'OR SECONDE MAIN</h4>
                
                <div className="golden-rules">
                  <div className="golden-rule">
                    <h5>👑 RÈGLE #1 : "NEVER COMPROMISE ON AUTHENTICITY"</h5>
                    <p><em>"Un seul faux vendu détruit 10 ans de réputation. Je refuse 3 pièces/semaine par doute d'authenticité. Mieux vaut perdre une vente que perdre sa crédibilité."</em></p>
                  </div>
                  
                  <div className="golden-rule">
                    <h5>💎 RÈGLE #2 : "BUY THE STORY, NOT JUST THE BAG"</h5>
                    <p><em>"Une Birkin avec provenance (certificat, facture originale, histoire) vaut 30% de plus qu'une Birkin anonyme. Les clients paient pour l'histoire autant que pour l'objet."</em></p>
                  </div>
                  
                  <div className="golden-rule">
                    <h5>🎯 RÈGLE #3 : "TIMING IS EVERYTHING"</h5>
                    <p><em>"La même pièce peut valoir €8K en juillet et €12K en décembre. Le timing de vente représente 40% du profit final. Patience = profit."</em></p>
                  </div>
                </div>
                
                <div className="alessandro-stats-secondhand">
                  <h5>📊 MES STATS SECONDE MAIN 2024</h5>
                  <ul>
                    <li><strong>Volume traité :</strong> €2.3M (847 pièces)</li>
                    <li><strong>ROI moyen :</strong> 124%</li>
                    <li><strong>Taux refus authenticité :</strong> 23% (protection client)</li>
                    <li><strong>Meilleur deal :</strong> Kelly vintage 1978 : acheté €3,200, vendu €18,500</li>
                    <li><strong>Satisfaction client :</strong> 98.7% (835/847 clients satisfaits)</li>
                  </ul>
                </div>
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

        .case-study-golden-goose {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(255, 215, 0, 0.1));
          border: 2px solid #D4AF37;
          padding: 25px;
          border-radius: 15px;
          margin: 30px 0;
        }

        .gg-product-grid, .gg-rtw-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .gg-product, .gg-rtw-item {
          background: rgba(45, 45, 45, 0.8);
          padding: 20px;
          border-radius: 10px;
          border-left: 3px solid #D4AF37;
        }

        .gg-product h6, .gg-rtw-item h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1rem;
        }

        .transformation-steps {
          margin: 25px 0;
        }

        .step-transformation {
          background: rgba(45, 45, 45, 0.6);
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          border-left: 4px solid #D4AF37;
        }

        .step-transformation h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .gg-success-secrets {
          margin: 25px 0;
        }

        .secret-box {
          background: rgba(212, 175, 55, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin: 10px 0;
          border-left: 3px solid #D4AF37;
        }

        .secret-box h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 8px;
        }

        .gg-testimonial {
          background: rgba(212, 175, 55, 0.2);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          border: 1px solid #D4AF37;
        }

        .gg-testimonial h6 {
          color: #D4AF37;
          margin-top: 0;
        }

        /* New styles for enriched content */
        .timeline-box, .expertise-grid, .prestige-hierarchy,
        .buyer-profiles, .calendar-strategic, .methodology-steps,
        .results-grid, .services-premium, .partner-selection {
          margin: 25px 0;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .expertise-card, .method-step, .result-card, .service-tier,
        .selection-criteria, .selection-process {
          background: rgba(45, 45, 45, 0.8);
          padding: 20px;
          border-radius: 10px;
          border-left: 3px solid #D4AF37;
          margin: 15px 0;
        }

        .expertise-card h4, .method-step h5, .result-card h4,
        .service-tier h4 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .prestige-level {
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          border-left: 4px solid;
        }

        .tier-god {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(212, 175, 55, 0.15));
          border-left-color: #FFD700;
        }

        .tier-s {
          background: rgba(192, 192, 192, 0.1);
          border-left-color: #C0C0C0;
        }

        .tier-a {
          background: rgba(205, 127, 50, 0.1);
          border-left-color: #CD7F32;
        }

        .tier-b {
          background: rgba(45, 45, 45, 0.8);
          border-left-color: #D4AF37;
        }

        .buyer-profile {
          background: rgba(212, 175, 55, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          border: 1px solid #D4AF37;
        }

        .buyer-profile h4 {
          color: #D4AF37;
          margin-top: 0;
        }

        .month-block {
          background: rgba(45, 45, 45, 0.8);
          padding: 15px;
          border-radius: 8px;
          margin: 10px 0;
          border-left: 3px solid #D4AF37;
        }

        .month-block h4 {
          color: #D4AF37;
          margin-top: 0;
        }

        .step-group {
          margin: 30px 0;
        }

        .step-group h4 {
          color: #D4AF37;
          font-size: 1.3rem;
          margin-bottom: 20px;
          text-align: center;
          padding: 10px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 8px;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .result-card.success {
          border-left-color: #28a745;
        }

        .service-tier {
          margin: 20px 0;
        }

        .contact-grid-detailed {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .contact-method {
          background: rgba(45, 45, 45, 0.5);
          padding: 15px;
          border-radius: 8px;
        }

        .contact-method h5 {
          color: #D4AF37;
          margin-top: 0;
        }

        .urgency-box {
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #1a1a1a;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          text-align: center;
          font-weight: 600;
        }

        .expert-insight {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(255, 215, 0, 0.1));
          border: 1px solid #D4AF37;
          padding: 20px;
          border-radius: 10px;
          margin: 30px 0;
        }

        .expert-insight h4 {
          color: #D4AF37;
          margin-top: 0;
        }

        .timeline-box {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid #D4AF37;
          padding: 20px;
          border-radius: 10px;
        }

        .timeline-item {
          margin: 15px 0;
          padding: 15px;
          background: rgba(45, 45, 45, 0.5);
          border-radius: 8px;
          border-left: 3px solid #D4AF37;
        }

        .timeline-item h5 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 8px;
        }

        .alessandro-advanced {
          background: rgba(255, 215, 0, 0.1);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          border: 1px solid #FFD700;
        }

        .alessandro-advanced h5 {
          color: #FFD700;
          margin-top: 0;
        }

        .pro-insight, .strategy-box {
          background: rgba(212, 175, 55, 0.15);
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          border-left: 3px solid #D4AF37;
        }

        .pro-insight h6, .strategy-box h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .market-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 25px 0;
        }

        .market-stat {
          background: rgba(212, 175, 55, 0.1);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #D4AF37;
          text-align: center;
        }

        .market-stat h4 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .sub-segment {
          margin: 25px 0;
          padding: 20px;
          background: rgba(45, 45, 45, 0.6);
          border-radius: 10px;
          border-left: 4px solid #D4AF37;
        }

        .sub-segment h5 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: rgba(45, 45, 45, 0.8);
          border-radius: 10px;
          overflow: hidden;
        }

        .pricing-table th {
          background: rgba(212, 175, 55, 0.2);
          color: #D4AF37;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }

        .pricing-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #333;
          color: #ddd;
        }

        .pricing-table tr:hover {
          background: rgba(212, 175, 55, 0.05);
        }

        /* Chapter 4 specific styles */
        .outlets-tier-system {
          margin: 30px 0;
        }

        .outlet-premium {
          background: rgba(45, 45, 45, 0.8);
          padding: 25px;
          border-radius: 15px;
          margin: 20px 0;
          border-left: 5px solid #D4AF37;
        }

        .outlet-premium h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .outlet-secrets, .bicester-strategy, .fidenza-timing {
          margin: 20px 0;
          padding: 15px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 8px;
          border-left: 3px solid #D4AF37;
        }

        .outlet-secrets h6, .bicester-strategy h6, .fidenza-timing h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .profit-examples {
          margin: 20px 0;
          padding: 15px;
          background: rgba(40, 167, 69, 0.1);
          border-radius: 8px;
          border-left: 3px solid #28a745;
        }

        .profit-examples h6 {
          color: #28a745;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .outlets-grid-advanced {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .outlet-card-premium {
          background: rgba(45, 45, 45, 0.8);
          padding: 20px;
          border-radius: 10px;
          border-left: 3px solid #D4AF37;
        }

        .outlet-card-premium h6 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .outlets-comprehensive {
          margin: 20px 0;
        }

        .outlets-comprehensive h6 {
          color: #D4AF37;
          margin: 15px 0 10px 0;
        }

        .negotiation-mastery {
          margin: 30px 0;
        }

        .technique-card {
          background: rgba(45, 45, 45, 0.8);
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          border-left: 4px solid #D4AF37;
        }

        .technique-card h4 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .yearly-strategy {
          margin: 30px 0;
        }

        .month-strategy {
          background: rgba(45, 45, 45, 0.8);
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          border-left: 4px solid #D4AF37;
        }

        .month-strategy h4 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .pro-tips-advanced {
          margin: 30px 0;
        }

        .tip-category {
          margin: 20px 0;
          padding: 20px;
          background: rgba(45, 45, 45, 0.6);
          border-radius: 10px;
          border-left: 3px solid #D4AF37;
        }

        .tip-category h4 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .alessandro-stats {
          margin: 20px 0;
          padding: 15px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 8px;
          border-left: 3px solid #D4AF37;
        }

        .alessandro-stats h5 {
          color: #D4AF37;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .secret-technique {
          margin: 20px 0;
          padding: 20px;
          background: rgba(255, 215, 0, 0.1);
          border-radius: 10px;
          border: 1px solid #FFD700;
        }

        .secret-technique h5 {
          color: #FFD700;
          margin-top: 0;
          margin-bottom: 15px;
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">L'ART DU PRÊT-À-PORTER DE LUXE</h1>
        </div>
        <div className="chapters-list">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`chapter-item ${activeChapter === chapter.id ? 'active' : ''}`}
              onClick={() => setActiveChapter(chapter.id)}
            >
              <span className="chapter-icon">{chapter.icon}</span>
              <div className="chapter-info">
                <div className="chapter-number">{chapter.title}</div>
                <div className="chapter-title">{chapter.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        {renderChapterContent()}
      </div>
    </div>
  );
};

export default EbookSelezione;