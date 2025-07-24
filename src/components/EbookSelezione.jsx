import React from 'react';

const EbookSelezione = () => {
  return (
    <div className="ebook-selezione-container">
      <style jsx>{`
        .ebook-selezione-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          color: #f5f5f5;
          background-color: #1a1a1a;
          border-radius: 15px;
        }

        .ebook-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem;
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #1a1a1a;
          border-radius: 15px;
        }

        .ebook-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: 'Playfair Display', serif;
        }

        .ebook-subtitle {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .ebook-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .stat-item {
          background: rgba(26, 26, 26, 0.2);
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          min-width: 120px;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .chapter-list {
          background: #2d2d2d;
          padding: 2rem;
          border-radius: 15px;
          margin: 2rem 0;
        }

        .chapter-list h3 {
          color: #D4AF37;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .chapter-item {
          background: rgba(212, 175, 55, 0.1);
          padding: 1rem;
          border-radius: 10px;
          border-left: 4px solid #D4AF37;
        }

        .chapter-number {
          color: #D4AF37;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .chapter-title {
          color: #f5f5f5;
          margin: 0.5rem 0;
          font-weight: 600;
        }

        .chapter-description {
          color: #888;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .feature-highlights {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(255, 215, 0, 0.05));
          padding: 2rem;
          border-radius: 15px;
          margin: 2rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .feature-card {
          background: rgba(45, 45, 45, 0.8);
          padding: 1.5rem;
          border-radius: 10px;
          text-align: center;
        }

        .feature-icon {
          font-size: 2rem;
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .feature-title {
          color: #f5f5f5;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .feature-description {
          color: #888;
          font-size: 0.9rem;
        }

        .selezione-info {
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #1a1a1a;
          padding: 2rem;
          border-radius: 15px;
          margin: 2rem 0;
          text-align: center;
        }

        .selezione-logo {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .selezione-tagline {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .selezione-details {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .detail-item {
          background: rgba(26, 26, 26, 0.2);
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
        }

        .download-section {
          background: #2d2d2d;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          margin: 2rem 0;
        }

        .download-title {
          color: #D4AF37;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .download-description {
          color: #f5f5f5;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .contact-item {
          background: rgba(212, 175, 55, 0.1);
          color: #D4AF37;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .ebook-title {
            font-size: 2rem;
          }
          
          .ebook-stats {
            gap: 1rem;
          }
          
          .chapters-grid {
            grid-template-columns: 1fr;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .selezione-details {
            flex-direction: column;
            gap: 1rem;
          }
          
          .contact-info {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      {/* Header */}
      <div className="ebook-header">
        <h1 className="ebook-title">
          L'ART DU PRÊT-À-PORTER DE LUXE
        </h1>
        <p className="ebook-subtitle">
          Guide Complet de l'Achat-Revente et du Wholesale Premium
        </p>
        <div className="ebook-stats">
          <div className="stat-item">
            <div className="stat-number">35+</div>
            <div className="stat-label">Pages</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10</div>
            <div className="stat-label">Chapitres</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2025</div>
            <div className="stat-label">Édition</div>
          </div>
        </div>
      </div>

      {/* Table des Matières */}
      <div className="chapter-list">
        <h3>📋 Table des Matières Complète</h3>
        <div className="chapters-grid">
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 1</div>
            <div className="chapter-title">L'Univers du Luxe</div>
            <div className="chapter-description">
              Histoire, codes, marques iconiques et calendrier fashion du luxe mondial
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 2</div>
            <div className="chapter-title">SELEZIONE : Votre Partenaire</div>
            <div className="chapter-description">
              11 ans d'expertise, 30+ fournisseurs, service wholesale exclusif
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 3</div>
            <div className="chapter-title">Les Différents Segments</div>
            <div className="chapter-description">
              Haute couture, prêt-à-porter, maroquinerie, bijouterie, parfumerie
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 4</div>
            <div className="chapter-title">Guide des Outlets Européens</div>
            <div className="chapter-description">
              180+ adresses premium : Italie, France, Allemagne, Angleterre...
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 5</div>
            <div className="chapter-title">Collections N-1 et Déstockage</div>
            <div className="chapter-description">
              Sourcing, négociation, analyse rentabilité des invendus de luxe
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 6</div>
            <div className="chapter-title">La Seconde Main de Luxe</div>
            <div className="chapter-description">
              Marché 7,8Md€, authentification, pricing, tendances 2025-2030
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 7</div>
            <div className="chapter-title">Plateformes de Revente</div>
            <div className="chapter-description">
              Vestiaire Collective, The RealReal, stratégies multi-canal
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 8</div>
            <div className="chapter-title">Techniques Professionnelles</div>
            <div className="chapter-description">
              Psychologie, storytelling, pricing, CRM, logistique premium
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 9</div>
            <div className="chapter-title">Business Model & Rentabilité</div>
            <div className="chapter-description">
              Structure coûts, KPIs, financement, aspects légaux et fiscaux
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Chapitre 10</div>
            <div className="chapter-title">Tendances et Avenir</div>
            <div className="chapter-description">
              IA, blockchain, sustainability, comportements Gen Z, crypto-luxe
            </div>
          </div>
          
          <div className="chapter-item">
            <div className="chapter-number">Annexes</div>
            <div className="chapter-title">Contacts et Ressources</div>
            <div className="chapter-description">
              Annuaire professionnel, formations, outils, événements secteur
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlights */}
      <div className="feature-highlights">
        <h3 style={{ textAlign: 'center', color: '#D4AF37', marginBottom: '1.5rem' }}>
          🌟 Points Forts de ce Guide
        </h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏭</div>
            <div className="feature-title">Sourcing Exclusif</div>
            <div className="feature-description">
              Accès privilégié aux producteurs italiens et européens
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <div className="feature-title">Stratégies de Prix</div>
            <div className="feature-description">
              Techniques avancées de pricing et négociation professionnelle
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <div className="feature-title">Guide Authentification</div>
            <div className="feature-description">
              Méthodes expertes pour détecter contrefaçons et garantir authenticité
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Business Intelligence</div>
            <div className="feature-description">
              KPIs, métriques, modèles financiers pour optimiser rentabilité
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <div className="feature-title">Tendances 2025-2030</div>
            <div className="feature-description">
              Vision prospective : IA, blockchain, sustainability, crypto-luxe
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <div className="feature-title">Ressources Complètes</div>
            <div className="feature-description">
              Contacts, formations, outils tech, calendrier événements secteur
            </div>
          </div>
        </div>
      </div>

      {/* SELEZIONE Info */}
      <div className="selezione-info">
        <div className="selezione-logo">👑 SELEZIONE</div>
        <div className="selezione-tagline">
          Spécialiste du Wholesale de Nouvelles Collections
        </div>
        <p>
          Leader européen avec 11 années d'expertise dans l'importation 
          et la distribution de prêt-à-porter de luxe italien et européen.
        </p>
        <div className="selezione-details">
          <div className="detail-item">11 ans d'expertise</div>
          <div className="detail-item">30+ fournisseurs</div>
          <div className="detail-item">Remises jusqu'à 50%</div>
          <div className="detail-item">Livraison Europe</div>
        </div>
      </div>

      {/* Download Section */}
      <div className="download-section">
        <h3 className="download-title">
          📖 Ebook Complet Maintenant Disponible
        </h3>
        <div className="download-description">
          <p>
            Ce guide de <strong>35+ pages</strong> contient maintenant tous les chapitres complets 
            avec des informations détaillées, des études de cas réels, et des stratégies 
            professionnelles éprouvées dans le secteur du luxe.
          </p>
          <p style={{ marginTop: '1rem', fontWeight: '600' }}>
            ✅ Contenu 100% complet • ✅ Expertise professionnelle • ✅ Stratégies éprouvées
          </p>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px' }}>
          <h4 style={{ color: '#D4AF37', marginBottom: '1rem' }}>
            💼 Pour les Professionnels et Entrepreneurs
          </h4>
          <p style={{ color: '#f5f5f5', marginBottom: '1rem' }}>
            Que vous soyez débutant ou expert, ce guide vous donne tous les outils 
            pour réussir dans l'achat-revente de luxe et le wholesale premium.
          </p>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            📧 info@selezione-wholesale.com
          </div>
          <div className="contact-item">
            📞 +39 02 8901 2345
          </div>
          <div className="contact-item">
            🌐 Milano, Italia
          </div>
        </div>
        
        <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#888' }}>
          "Votre expertise dans le luxe commence maintenant"
        </p>
      </div>
    </div>
  );
};

export default EbookSelezione;