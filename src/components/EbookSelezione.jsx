import React, { useState } from 'react';
import { Book, Download, Share2, Eye, Star, Crown, Gem, Calendar, Users, Award, ChevronRight, ChevronDown } from 'lucide-react';

const EbookSelezione = ({ user }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const chapters = [
    {
      id: 0,
      title: "Table des Matières",
      icon: "📋",
      content: "table-content"
    },
    {
      id: 1,
      title: "L'Univers du Luxe",
      icon: "🏛️",
      content: "luxury-universe"
    },
    {
      id: 2,
      title: "SELEZIONE : Votre Partenaire Wholesale",
      icon: "💼",
      content: "selezione-partner"
    },
    {
      id: 3,
      title: "Les Différents Segments",
      icon: "🛍️",
      content: "segments"
    },
    {
      id: 4,
      title: "Guide Outlets Européens",
      icon: "🏪",
      content: "outlets",
      premium: true
    },
    {
      id: 5,
      title: "Collections N-1 et Déstockage",
      icon: "📅",
      content: "collections",
      premium: true
    },
    {
      id: 6,
      title: "Seconde Main de Luxe",
      icon: "💎",
      content: "second-hand",
      premium: true
    },
    {
      id: 7,
      title: "Plateformes de Revente",
      icon: "🌐",
      content: "platforms",
      premium: true
    },
    {
      id: 8,
      title: "Techniques Professionnelles",
      icon: "🎯",
      content: "techniques",
      premium: true
    },
    {
      id: 9,
      title: "Business Model",
      icon: "💰",
      content: "business",
      premium: true
    },
    {
      id: 10,
      title: "Tendances et Avenir",
      icon: "🔮",
      content: "trends",
      premium: true
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const downloadEbook = () => {
    window.open('/ebook-selezione.html', '_blank');
  };

  const shareEbook = () => {
    if (navigator.share) {
      navigator.share({
        title: 'L\'Art du Prêt-à-Porter de Luxe - Guide SELEZIONE',
        text: 'Découvrez les secrets du wholesale de luxe avec SELEZIONE',
        url: window.location.origin + '/ebook-selezione.html'
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/ebook-selezione.html');
      alert('Lien de l\'ebook copié dans le presse-papiers !');
    }
  };

  const renderTableOfContents = () => (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
          L'ART DU PRÊT-À-PORTER DE LUXE
        </h2>
        <p className="text-gray-400 text-lg">Guide Complet de l'Achat-Revente et du Wholesale Premium</p>
        <p className="text-amber-400 font-semibold mt-2">Par SELEZIONE • Édition 2025 • 35+ Pages</p>
      </div>

      <div className="grid gap-3">
        {chapters.slice(1).map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => setCurrentChapter(chapter.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
              chapter.premium && user?.role !== 'admin' && user?.role !== 'premium'
                ? 'border-gray-600 bg-gray-800/30 opacity-60'
                : 'border-gray-600 bg-gray-800/50 hover:border-amber-500 hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{chapter.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{chapter.title}</h3>
                  <p className="text-gray-400 text-sm">Chapitre {chapter.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {chapter.premium && user?.role !== 'admin' && user?.role !== 'premium' && (
                  <Crown className="w-5 h-5 text-amber-400" />
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
        <div className="text-center">
          <Crown className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Version Complète Premium</h3>
          <p className="text-gray-300 mb-4">
            Accédez à tous les chapitres, guides d'outlets européens, techniques professionnelles et analyses de marché
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={downloadEbook}
              className="flex items-center space-x-2 bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger PDF</span>
            </button>
            <button
              onClick={shareEbook}
              className="flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLuxuryUniverse = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
          🏛️ L'Univers du Luxe
        </h2>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('history')}
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-amber-400" />
            <span>Histoire du Prêt-à-Porter de Luxe</span>
          </h3>
          {expandedSections.history ? 
            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
            <ChevronRight className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.history && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Le prêt-à-porter de luxe naît au milieu du XXe siècle, révolutionnant l'industrie de la mode. 
              <span className="text-amber-400 font-semibold"> Gabrielle Chanel</span> libère la femme du corset, 
              <span className="text-amber-400 font-semibold"> Christian Dior</span> impose le New Look en 1947, et 
              <span className="text-amber-400 font-semibold"> Yves Saint Laurent</span> démocratise la haute couture.
            </p>
            
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Le Saviez-vous ?</span>
              </h4>
              <p className="text-gray-300">
                Le terme "prêt-à-porter" fut inventé par J.C. Weil en 1949, inspiré de l'expression américaine "ready-to-wear".
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('codes')}
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Gem className="w-6 h-6 text-amber-400" />
            <span>Codes et Savoir-vivre du Luxe</span>
          </h3>
          {expandedSections.codes ? 
            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
            <ChevronRight className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.codes && (
          <div className="mt-4">
            <p className="text-gray-300 mb-4">Le luxe obéit à des codes stricts qui définissent son univers :</p>
            <ul className="space-y-2">
              {[
                "Excellence artisanale : Savoir-faire traditionnel et innovation",
                "Matières premières nobles : Cuirs d'exception, soies, cachemires",
                "Exclusivité : Production limitée et distribution sélective",
                "Héritage : Histoire de la maison et transmission du savoir",
                "Service client premium : Expérience personnalisée"
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('brands')}
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <span>Marques Iconiques Mondiales</span>
          </h3>
          {expandedSections.brands ? 
            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
            <ChevronRight className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.brands && (
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <span>🇫🇷</span>
                <span>Maisons Françaises</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Louis Vuitton', 'Chanel', 'Hermès', 'Dior', 'Saint Laurent', 'Cartier'].map((brand) => (
                  <div key={brand} className="bg-gray-700/50 px-3 py-2 rounded-lg text-center">
                    <span className="text-amber-400 font-medium">{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <span>🇮🇹</span>
                <span>Excellence Italienne</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Prada', 'Gucci', 'Versace', 'Armani', 'Bottega Veneta', 'Dolce & Gabbana'].map((brand) => (
                  <div key={brand} className="bg-gray-700/50 px-3 py-2 rounded-lg text-center">
                    <span className="text-amber-400 font-medium">{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <span>🇬🇧</span>
                <span>Tradition Britannique</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Burberry', 'Alexander McQueen', 'Stella McCartney'].map((brand) => (
                  <div key={brand} className="bg-gray-700/50 px-3 py-2 rounded-lg text-center">
                    <span className="text-amber-400 font-medium">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSelezionePartner = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
          💼 SELEZIONE : Votre Partenaire Wholesale
        </h2>
      </div>

      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30 p-6 text-center">
        <Crown className="w-12 h-12 text-amber-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">SELEZIONE</h3>
        <p className="text-xl text-amber-400 font-semibold mb-4">
          Spécialiste du Wholesale de Nouvelles Collections
        </p>
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white">11</div>
            <div className="text-gray-400 text-sm">Ans d'Expertise</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">30+</div>
            <div className="text-gray-400 text-sm">Fournisseurs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">50%</div>
            <div className="text-gray-400 text-sm">Remises Max</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('history-selezione')}
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Notre Histoire</span>
          </h3>
          {expandedSections['history-selezione'] ? 
            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
            <ChevronRight className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections['history-selezione'] && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Fondée sur une passion pour l'excellence italienne, <span className="text-amber-400 font-semibold">SELEZIONE</span> 
              s'est imposée en <strong>11 années</strong> comme un acteur incontournable du wholesale 
              de prêt-à-porter de luxe.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Notre expertise, née au cœur de l'industrie textile italienne, nous permet aujourd'hui 
              de proposer à nos clients un accès privilégié aux plus belles collections européennes 
              à des conditions exceptionnelles.
            </p>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-semibold mb-3 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Nos Atouts</span>
              </h4>
              <ul className="space-y-2">
                {[
                  "11 ans d'expertise dans le wholesale de luxe",
                  "30+ fournisseurs partenaires sélectionnés",
                  "Remises jusqu'à 50% sur les nouvelles collections",
                  "Accompagnement personnalisé pour chaque client",
                  "Livraison internationale sécurisée"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('service-wholesale')}
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Users className="w-6 h-6 text-amber-400" />
            <span>Service Wholesale Exclusif</span>
          </h3>
          {expandedSections['service-wholesale'] ? 
            <ChevronDown className="w-5 h-5 text-gray-400" /> : 
            <ChevronRight className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections['service-wholesale'] && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-300">
              SELEZIONE révolutionne l'accès aux nouvelles collections en proposant un service 
              wholesale unique sur le marché européen.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-2">🎯 Collections Nouvelles à Prix Remisés</h4>
                <p className="text-gray-300">
                  Contrairement aux traditionnels déstockages de fins de série, nous proposons 
                  <span className="text-amber-400 font-semibold"> les dernières collections en cours</span> avec des remises 
                  exceptionnelles pouvant atteindre <strong>50%</strong> du prix de vente conseillé.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-2">📋 Processus d'Achat</h4>
                <div className="grid gap-3">
                  {[
                    { step: 1, title: "Sélection", desc: "Nos experts sélectionnent les meilleures pièces" },
                    { step: 2, title: "Négociation", desc: "Nous négocions les meilleurs prix auprès des producteurs" },
                    { step: 3, title: "Contrôle Qualité", desc: "Vérification systématique de chaque article" },
                    { step: 4, title: "Présentation", desc: "Catalogue exclusif pour nos clients wholesale" },
                    { step: 5, title: "Livraison", desc: "Expédition sécurisée dans toute l'Europe" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center space-x-3 bg-gray-700/30 p-3 rounded-lg">
                      <div className="w-8 h-8 bg-amber-500 text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-gray-400 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-4">Contactez SELEZIONE</h3>
        <div className="space-y-2 text-gray-300">
          <p><strong>Email :</strong> info@selezione-wholesale.com</p>
          <p><strong>Téléphone :</strong> +39 02 XXX XXXX</p>
          <p><strong>Siège :</strong> Milano, Italia</p>
        </div>
        <p className="text-amber-400 italic mt-4">"Votre succès est notre réussite"</p>
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
          🛍️ Les Différents Segments
        </h2>
      </div>

      <div className="grid gap-6">
        {[
          {
            title: "Haute Couture vs Prêt-à-Porter",
            icon: "👗",
            content: "Distinction entre l'excellence artisanale et la démocratisation du luxe"
          },
          {
            title: "Segmentation par Genre",
            icon: "👥",
            content: "Femme (65%), Homme (30%), Enfant (5%) - Spécificités de chaque marché"
          },
          {
            title: "Maroquinerie : Le Moteur du Luxe",
            icon: "👜",
            content: "Segment le plus rentable avec des marges pouvant atteindre 80%"
          },
          {
            title: "Bijouterie & Horlogerie",
            icon: "💍",
            content: "Joaillerie fine, montres de prestige et pièces de collection"
          },
          {
            title: "Parfumerie & Cosmétiques",
            icon: "🌸",
            content: "Grandes maisons, parfumerie de niche et cosmétiques premium"
          },
          {
            title: "Lingerie & Underwear",
            icon: "🌺",
            content: "Segment en forte croissance (+12% annuel), luxe et confort"
          }
        ].map((segment, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-500/50 transition-colors">
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{segment.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{segment.title}</h3>
                <p className="text-gray-300">{segment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center space-x-2">
          <Star className="w-6 h-6" />
          <span>Opportunités de Marché</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">150B€</div>
            <div className="text-gray-400">Marché Global</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">+5%</div>
            <div className="text-gray-400">Croissance Annuelle</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">35%</div>
            <div className="text-gray-400">Marge Moyenne</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPremiumContent = () => (
    <div className="text-center py-16">
      <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-white mb-4">Contenu Premium</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Ce chapitre est réservé aux utilisateurs Premium. 
        Découvrez les guides exclusifs, adresses d'outlets et techniques professionnelles.
      </p>
      <div className="space-y-3">
        <button className="block w-full bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
          Passer Premium
        </button>
        <button
          onClick={downloadEbook}
          className="block w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          Télécharger l'Ebook Complet
        </button>
      </div>
    </div>
  );

  const renderChapterContent = () => {
    const chapter = chapters[currentChapter];
    
    if (!chapter) return renderTableOfContents();

    if (chapter.premium && user?.role !== 'admin' && user?.role !== 'premium') {
      return renderPremiumContent();
    }

    switch (chapter.content) {
      case 'table-content':
        return renderTableOfContents();
      case 'luxury-universe':
        return renderLuxuryUniverse();
      case 'selezione-partner':
        return renderSelezionePartner();
      case 'segments':
        return renderSegments();
      default:
        return renderPremiumContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Book className="w-8 h-8 text-amber-400" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Ebook SELEZIONE
              </h1>
              <p className="text-gray-400">Guide Complet du Prêt-à-Porter de Luxe</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadEbook}
              className="flex items-center space-x-2 bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>PDF</span>
            </button>
            <button
              onClick={shareEbook}
              className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-4 sticky top-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Book className="w-5 h-5 text-amber-400" />
                <span>Chapitres</span>
              </h3>
              
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapter(chapter.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      currentChapter === chapter.id
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                        : chapter.premium && user?.role !== 'admin' && user?.role !== 'premium'
                        ? 'text-gray-500 hover:text-gray-400'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{chapter.icon}</span>
                        <div>
                          <div className="text-sm font-medium">{chapter.title}</div>
                          {chapter.id > 0 && (
                            <div className="text-xs opacity-60">Chapitre {chapter.id}</div>
                          )}
                        </div>
                      </div>
                      {chapter.premium && user?.role !== 'admin' && user?.role !== 'premium' && (
                        <Crown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
              {renderChapterContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookSelezione;