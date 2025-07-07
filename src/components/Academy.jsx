import React, { useState } from 'react';
import { BookOpen, ArrowRight, ChevronRight } from 'lucide-react';

const Academy = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const modules = [
    {
      id: 1,
      title: 'Fondamentaux du Luxe',
      description: 'Bases complètes du prêt-à-porter de luxe',
      chapters: 6,
      duration: '4h',
      level: 'Débutant',
      color: 'blue',
      progress: 0,
      chapters_list: [
        { 
          id: 1, 
          title: 'Introduction au Luxe', 
          content: `# Introduction au Luxe\n\nLe luxe représente bien plus qu'un simple produit : c'est un univers d'exception.\n\n## Les 4 Piliers du Luxe\n\n### 1. L'Exclusivité\nLimitation volontaire de la production pour créer la rareté\n\n### 2. L'Héritage\nHistoire et tradition qui confèrent légitimité\n\n### 3. L'Excellence\nSavoir-faire artisanal et matériaux d'exception\n\n### 4. L'Émotion\nCapacité à faire rêver et créer du désir\n\n## Évolution Historique\n\nLe luxe moderne naît au XIXe siècle :\n- **1837** : Hermès révolutionne la sellerie\n- **1854** : Louis Vuitton innove en maroquinerie\n- **1910** : Chanel libère la femme moderne\n\n## Impact Économique 2025\n\nLe marché mondial représente **380 milliards d'euros**, porté par l'Asie et les millennials.`,
          quiz: [
            {
              question: "Quel est le pilier principal du luxe ?",
              options: ["Prix élevé", "Exclusivité", "Marketing", "Distribution"],
              correct: 1
            },
            {
              question: "En quelle année Hermès a-t-il été fondé ?",
              options: ["1837", "1854", "1910", "1900"],
              correct: 0
            }
          ]
        },
        { 
          id: 2, 
          title: 'Fonctionnement des Marques', 
          content: `# Stratégies des Marques de Luxe\n\n## Contrôle Total de la Chaîne\n\nLes grandes maisons contrôlent :\n- Création et design\n- Production artisanale\n- Distribution sélective\n- Communication premium\n\n## Exemples Concrets\n\n### Hermès\n- Listes d'attente volontaires\n- Production limitée Birkin/Kelly\n- Stratégie de rareté organisée\n\n### Chanel\n- Refus vente en ligne\n- Contrôle strict distribution\n- Expérience boutique préservée\n\n### LVMH\n- Portefeuille marques complémentaires\n- Synergie sans cannibalisation\n- Innovation préservant l'héritage`,
          quiz: [
            {
              question: "Quelle stratégie Hermès utilise pour ses Birkin ?",
              options: ["Vente libre", "Listes d'attente", "Promotions", "E-commerce"],
              correct: 1
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Authentification & Expertise',
      description: 'Techniques d\'authentification professionnelles',
      chapters: 4,
      duration: '3h',
      level: 'Intermédiaire',
      color: 'green',
      progress: 0,
      chapters_list: [
        {
          id: 1,
          title: 'Méthodes d\'Authentification',
          content: `# Authentification Professionnelle\n\n## Méthodes Principales\n\n### 1. Analyse Matériaux\n- Cuir : grain, souplesse, odeur\n- Métaux : composition, patine\n- Tissus : texture, tissage\n\n### 2. Examen Technique\n- Coutures : régularité, fil\n- Assemblage : précision\n- Finitions : qualité\n\n### 3. Codes et Marquages\n- Numéros de série\n- Hologrammes\n- Poinçons datation\n\n## Outils Modernes\n- Microscopes\n- Applications IA\n- Bases de données\n- Scanner authenticité`,
          quiz: [
            {
              question: "Quel est l'outil principal d'authentification moderne ?",
              options: ["Loupe", "IA + Database", "Expérience", "Prix"],
              correct: 1
            }
          ]
        }
      ]
    }
  ];

  const renderModuleList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modules.map((module) => (
        <div
          key={module.id}
          onClick={() => setSelectedModule(module)}
          className={`bg-black/60 backdrop-blur-sm rounded-xl border border-${module.color}-500/30 p-6 cursor-pointer hover:border-${module.color}-500/60 transition-all`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-${module.color}-500/20 flex items-center justify-center`}>
              <BookOpen className={`w-6 h-6 text-${module.color}-400`} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full bg-${module.color}-500/20 text-${module.color}-400`}>
              {module.level}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{module.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>{module.chapters} chapitres</span>
            <span>{module.duration}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`bg-${module.color}-500 h-2 rounded-full`} style={{width: `${module.progress}%`}}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Progression: {module.progress}%</p>
        </div>
      ))}
    </div>
  );

  const renderChapterList = () => {
    if (!selectedModule) return null;
    
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedModule(null)}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
          Retour aux modules
        </button>
        
        <div className={`bg-${selectedModule.color}-500/10 rounded-2xl p-6 border border-${selectedModule.color}-500/20`}>
          <h2 className="text-2xl font-bold text-white mb-2">{selectedModule.title}</h2>
          <p className="text-gray-400">{selectedModule.description}</p>
        </div>

        <div className="grid gap-4">
          {selectedModule.chapters_list?.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter)}
              className={`bg-black/60 backdrop-blur-sm rounded-xl border border-${selectedModule.color}-500/30 p-4 cursor-pointer hover:border-${selectedModule.color}-500/60 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Chapitre {chapter.id}: {chapter.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">Contenu professionnel + Quiz</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChapterContent = () => {
    if (!selectedChapter) return null;
    
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedChapter(null)}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
          Retour aux chapitres
        </button>

        <div className={`bg-${selectedModule.color}-500/10 rounded-2xl p-8 border border-${selectedModule.color}-500/20`}>
          <h2 className="text-3xl font-bold text-white mb-4">
            Chapitre {selectedChapter.id}: {selectedChapter.title}
          </h2>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 text-base leading-relaxed mb-8 whitespace-pre-line">
                {selectedChapter.content}
              </div>
              
              {/* Quiz Section */}
              <div className="mt-8 p-6 bg-gray-900 rounded-xl">
                <h3 className={`text-${selectedModule.color}-400 font-bold text-lg mb-4`}>
                  📚 Quiz de Validation
                </h3>
                <div className="space-y-4">
                  {selectedChapter.quiz?.map((question, qIdx) => (
                    <div key={qIdx} className="p-4 bg-black/60 rounded-xl">
                      <p className="text-white mb-3 font-medium">{qIdx + 1}. {question.question}</p>
                      <div className="space-y-2">
                        {question.options.map((option, oIdx) => (
                          <label key={oIdx} className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                            <input 
                              type="radio" 
                              name={`q${qIdx}`} 
                              className="mr-3" 
                              onChange={() => {}}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className={`bg-gradient-to-r from-${selectedModule.color}-500 to-${selectedModule.color}-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90`}>
                    Valider le Quiz (80% requis)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-emerald-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          🎓 SELEZIONE ACADEMY
        </h2>
        <p className="text-gray-400">Formation complète - De débutant à expert du luxe</p>
      </div>

      {selectedChapter ? renderChapterContent() : 
       selectedModule ? renderChapterList() : 
       renderModuleList()}
    </div>
  );
};

export default Academy;
