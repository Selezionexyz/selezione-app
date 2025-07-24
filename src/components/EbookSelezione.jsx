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
              <p>Le prêt-à-porter de luxe naît dans les années 1960 avec les révolutions d'Yves Saint Laurent et de Pierre Cardin. Cette innovation démocratise partiellement le luxe tout en conservant l'excellence artisanale.</p>
              
              <h3>🔑 Les Codes du Luxe</h3>
              <ul>
                <li><strong>Exclusivité :</strong> Production limitée et sélective</li>
                <li><strong>Savoir-faire :</strong> Artisanat traditionnel préservé</li>
                <li><strong>Matières nobles :</strong> Cuirs, soies, cachemires d'exception</li>
                <li><strong>Héritage :</strong> Histoire et légitimité de la marque</li>
              </ul>

              <h3>👑 Marques Iconiques Mondiales</h3>
              <div className="brands-grid">
                <div className="brand-card">
                  <h4>🇫🇷 Maisons Françaises</h4>
                  <p>Chanel, Dior, Hermès, Louis Vuitton, Yves Saint Laurent</p>
                </div>
                <div className="brand-card">
                  <h4>🇮🇹 Excellence Italienne</h4>
                  <p>Prada, Gucci, Versace, Armani, Bottega Veneta</p>
                </div>
                <div className="brand-card">
                  <h4>🌍 Acteurs Globaux</h4>
                  <p>Tom Ford, Balenciaga, Givenchy, Valentino</p>
                </div>
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

              <h3>🎯 Notre Expertise</h3>
              <p>Depuis 11 ans, SELEZIONE est le leader européen de l'importation et distribution de prêt-à-porter de luxe italien et européen.</p>
              
              <h3>🤝 Services Exclusifs</h3>
              <ul>
                <li><strong>Sourcing Premium :</strong> Accès direct aux meilleurs producteurs</li>
                <li><strong>Négociation :</strong> Prix exceptionnels grâce à nos volumes</li>
                <li><strong>Qualité garantie :</strong> Contrôle systématique des produits</li>
                <li><strong>Accompagnement :</strong> Support personnalisé pour votre croissance</li>
              </ul>

              <div className="contact-box">
                <h4>📞 Contactez SELEZIONE</h4>
                <p><strong>📧 Email :</strong> info@selezione-wholesale.com</p>
                <p><strong>📱 Téléphone :</strong> +39 02 8901 2345</p>
                <p><strong>🏢 Siège :</strong> Via Brera 15, 20121 Milano, Italia</p>
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