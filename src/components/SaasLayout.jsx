import React, { useState } from 'react';
import {
  Menu, X, Home, Brain, Calculator, TrendingUp, FileText,
  BookOpen, Bell, Diamond, Zap, Bot, GraduationCap, ShoppingCart,
  Package, Search, Star, MessageCircle, Settings, User
} from 'lucide-react';

// Import des composants existants
import OutilEstimationIA from '@/components/OutilEstimationIA';
import Marketplace from './Marketplace';

// Dashboard complet
const Dashboard = () => {
  const stats = [
    { label: 'Produits analysés', value: '2,547', icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Estimations IA', value: '1,234', icon: Calculator, color: 'from-purple-500 to-purple-600' },
    { label: 'Score moyen', value: '94%', icon: Star, color: 'from-amber-500 to-amber-600' },
    { label: 'Économies réalisées', value: '45,678€', icon: TrendingUp, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Dashboard Selezione
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <stat.icon className="w-10 h-10 text-white/50" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <div className="space-y-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Nouvelle estimation produit #{i}234</span>
                </div>
                <span className="text-xs text-gray-400">Il y a {i}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Performance IA</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Précision des estimations</span>
                <span className="text-sm font-bold">98%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '98%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Vitesse de traitement</span>
                <span className="text-sm font-bold">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Assistant IA Luxe
const AssistantLuxe = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis votre assistant IA spécialisé dans le luxe. Comment puis-je vous aider ?' }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { role: 'user', content: message }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Je traite votre demande concernant le luxe...' 
        }]);
      }, 1000);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Assistant Luxe IA
      </h1>
      
      <div className="flex-1 bg-gray-800 rounded-xl p-6 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg p-4 rounded-xl ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' 
                : 'bg-gray-700 text-gray-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Posez votre question sur le luxe..."
          className="flex-1 p-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-amber-500 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Outils IA
const EstimationLuxe = () => {
  const tools = [
    { 
      name: 'Analyseur de Prix', 
      desc: 'Analyse les prix du marché en temps réel',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Vérificateur Authenticité', 
      desc: 'Vérifie l\'authenticité des produits de luxe',
      icon: Search,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Calculateur de Valeur', 
      desc: 'Estime la valeur de revente',
      icon: Calculator,
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Comparateur Marché', 
      desc: 'Compare les prix entre vendeurs',
      icon: Package,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Outils IA Premium
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${tool.color} p-1 rounded-xl`}>
            <div className="bg-gray-900 p-6 rounded-xl h-full">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 bg-gradient-to-r ${tool.color} rounded-lg`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <p className="text-gray-400 text-sm">{tool.desc}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                Utiliser cet outil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Générateur de Fiches Produit
const FicheProduit = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    description: ''
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Générateur de Fiches Produit IA
      </h1>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nom du produit</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              placeholder="Ex: Sac Hermès Birkin"
              value={productData.name}
              onChange={(e) => setProductData({...productData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Marque</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              placeholder="Ex: Hermès"
              value={productData.brand}
              onChange={(e) => setProductData({...productData, brand: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <select
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              value={productData.category}
              onChange={(e) => setProductData({...productData, category: e.target.value})}
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="sacs">Sacs</option>
              <option value="montres">Montres</option>
              <option value="bijoux">Bijoux</option>
              <option value="vetements">Vêtements</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none h-32"
              placeholder="Décrivez le produit..."
              value={productData.description}
              onChange={(e) => setProductData({...productData, description: e.target.value})}
            />
          </div>
          
          <button
            type="button"
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Générer la fiche produit avec l'IA
          </button>
        </form>
      </div>
    </div>
  );
};

// Quiz Expert
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      question: "Quelle maison de luxe a créé le sac Birkin ?",
      options: ["Chanel", "Hermès", "Louis Vuitton", "Gucci"],
      correct: 1
    },
    {
      question: "En quelle année Rolex a-t-elle été fondée ?",
      options: ["1895", "1905", "1915", "1925"],
      correct: 1
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Quiz Expert Luxe
      </h1>
      
      <div className="bg-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
        {currentQuestion < questions.length ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Question {currentQuestion + 1}/{questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-600 h-2 rounded-full transition-all"
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h2>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === questions[currentQuestion].correct) {
                      setScore(score + 1);
                    }
                    setCurrentQuestion(currentQuestion + 1);
                  }}
                  className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
            <p className="text-4xl font-bold text-amber-400 mb-6">{score}/{questions.length}</p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
              }}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              Recommencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Analyseur de Marché
const ScraperVC = () => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Analyseur de Marché IA
      </h1>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">URL du produit à analyser</label>
            <div className="flex space-x-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemple.com/produit"
                className="flex-1 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  setAnalyzing(true);
                  setTimeout(() => setAnalyzing(false), 3000);
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:opacity-90 transition-opacity"
              >
                {analyzing ? 'Analyse...' : 'Analyser'}
              </button>
            </div>
          </div>
          
          {analyzing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
              <p className="mt-4 text-gray-400">Analyse en cours...</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Prix moyen marché</h3>
          <p className="text-2xl font-bold text-green-400">2,450€</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Tendance</h3>
          <p className="text-2xl font-bold text-blue-400">↑ +12%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Disponibilité</h3>
          <p className="text-2xl font-bold text-amber-400">Rare</p>
        </div>
      </div>
    </div>
  );
};

// Academy
const Academy = () => {
  const courses = [
    { title: 'Introduction au luxe', duration: '2h', level: 'Débutant', progress: 100 },
    { title: 'Authentification avancée', duration: '4h', level: 'Avancé', progress: 65 },
    { title: 'Stratégies de revente', duration: '3h', level: 'Intermédiaire', progress: 30 },
    { title: 'Tendances du marché', duration: '1h30', level: 'Débutant', progress: 0 }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
        Selezione Academy
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{course.duration} • {course.level}</p>
              </div>
              {course.progress === 100 && (
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Terminé
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-600 h-2 rounded-full"
                  style={{width: `${course.progress}%`}}
                ></div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              {course.progress === 0 ? 'Commencer' : course.progress === 100 ? 'Revoir' : 'Continuer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SaasLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState({
    name: 'Alexandre Dupont',
    avatar: '👑',
    level: 'Executive Member',
    credits: 99999,
    subscription: 'SELEZIONE ULTIMATE'
  });

  const views = {
    dashboard: <Dashboard />,
    agents: <AssistantLuxe />,
    outils: <EstimationLuxe />,
    fiche: <FicheProduit />,
    scraper: <ScraperVC />,
    quiz: <Quiz />,
    academy: <Academy />,
    marketplace: <Marketplace />,
    estimationia: <OutilEstimationIA />,
  };

  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'agents', label: 'Agents IA', icon: Bot },
      { id: 'outils', label: 'Outils IA', icon: Zap },
      { id: 'fiche', label: 'Fiche Produit', icon: FileText },
      { id: 'scraper', label: 'Analyseur Marché', icon: TrendingUp },
      { id: 'quiz', label: 'Quiz Expert', icon: Brain },
      { id: 'academy', label: 'Academy', icon: GraduationCap },
      { id: 'marketplace', label: 'Marketplace 🛍️', icon: ShoppingCart },
      { id: 'estimationia', label: 'Estimation IA 🔍', icon: Calculator },
    ];

    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/95 backdrop-blur-sm border-r border-amber-500/20 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto`}>
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Diamond className="w-8 h-8 text-amber-400" />
              <div>
                <h2 className="text-lg font-bold text-white">SELEZIONE</h2>
                <p className="text-amber-400 text-xs">Luxury Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-500/20">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-lg">
                {user.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-amber-400">{user.subscription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TopNav = () => (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-amber-500/20 px-4 py-3 lg:ml-64">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-white">
            {activeView === 'marketplace' && '🛍️ Ma Marketplace'}
            {activeView === 'dashboard' && '📊 Dashboard'}
            {activeView === 'agents' && '🤖 Agents IA'}
            {activeView === 'outils' && '⚡ Outils IA'}
            {activeView === 'estimationia' && '🔍 Estimation IA'}
            {activeView === 'fiche' && '📄 Fiche Produit'}
            {activeView === 'scraper' && '📈 Analyseur Marché'}
            {activeView === 'quiz' && '🧠 Quiz Expert'}
            {activeView === 'academy' && '🎓 Academy'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-amber-400">{user.level}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-lg">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  const BottomNav = () => {
    const bottomItems = [
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
      { id: 'outils', label: 'Outils IA', icon: Zap },
      { id: 'agents', label: 'Agents', icon: Bot },
      { id: 'estimationia', label: 'Estimation IA', icon: Calculator },
      { id: 'academy', label: 'Academy', icon: GraduationCap }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-amber-500/20 lg:ml-64">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar />
      <TopNav />

      <main className="lg:ml-64 pb-20 relative z-10 min-h-screen">
        {Object.entries(views).map(([key, component]) => (
          <div key={key} style={{ display: activeView === key ? 'block' : 'none' }}>
            {component}
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default SaasLayout;
