import React, { useState } from 'react';
import { Trophy, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState('beginner');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quizzes = {
    beginner: {
      title: 'Quiz Débutant - Bases du Luxe',
      description: 'Testez vos connaissances fondamentales',
      color: 'green',
      questions: [
        {
          question: "Quelle maison de luxe a été fondée en 1837 ?",
          options: ["Chanel", "Hermès", "Louis Vuitton", "Dior"],
          correct: 1,
          explanation: "Hermès a été fondée en 1837 par Thierry Hermès comme sellier-harnacheur."
        },
        {
          question: "Quel est le pilier principal du luxe ?",
          options: ["Prix élevé", "Exclusivité", "Marketing", "Célébrités"],
          correct: 1,
          explanation: "L'exclusivité est le pilier fondamental qui différencie le luxe du premium."
        },
        {
          question: "Que signifie 'Birkin' chez Hermès ?",
          options: ["Un type de cuir", "Un modèle de sac", "Une technique", "Un coloris"],
          correct: 1,
          explanation: "Le Birkin est le sac iconique d'Hermès, nommé d'après Jane Birkin."
        }
      ]
    },
    intermediate: {
      title: 'Quiz Intermédiaire - Authentification',
      description: 'Expertise en authentification',
      color: 'blue',
      questions: [
        {
          question: "Comment reconnaître un faux Chanel Classic Flap ?",
          options: ["Par le poids", "Par les coutures", "Par le numéro de série", "Toutes les réponses"],
          correct: 3,
          explanation: "L'authentification nécessite de vérifier plusieurs éléments : poids, coutures, numéro de série, hardware."
        },
        {
          question: "Quel cuir Hermès vieillit le mieux ?",
          options: ["Clemence", "Togo", "Box", "Epsom"],
          correct: 2,
          explanation: "Le cuir Box développe une patine exceptionnelle avec le temps."
        }
      ]
    },
    expert: {
      title: 'Quiz Expert - Marché & Investissement',
      description: 'Niveau professionnel',
      color: 'purple',
      questions: [
        {
          question: "Quel facteur influence le plus la valeur de revente ?",
          options: ["Rareté", "État", "Provenance", "Âge"],
          correct: 1,
          explanation: "L'état est le facteur le plus déterminant pour la valeur de revente."
        }
      ]
    }
  };

  const currentQuiz = quizzes[selectedQuiz];

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(Math.round((correctAnswers / currentQuiz.questions.length) * 100));
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const QuizSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(quizzes).map(([key, quiz]) => (
        <button
          key={key}
          onClick={() => setSelectedQuiz(key)}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            selectedQuiz === key
              ? `border-${quiz.color}-500 bg-${quiz.color}-500/10`
              : `border-gray-600 bg-black/50 hover:border-${quiz.color}-500/50`
          }`}
        >
          <div className={`w-12 h-12 rounded-xl bg-${quiz.color}-500/20 flex items-center justify-center mb-4`}>
            <Trophy className={`w-6 h-6 text-${quiz.color}-400`} />
          </div>
          <h3 className={`font-bold text-${quiz.color}-400 mb-2`}>{quiz.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{quiz.description}</p>
          <p className="text-gray-500 text-xs">{quiz.questions.length} questions</p>
        </button>
      ))}
    </div>
  );

  const QuizInterface = () => {
    if (showResults) {
      return (
        <div className="text-center space-y-6">
          <div className={`text-6xl mb-4 ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {score >= 80 ? '🏆' : score >= 60 ? '🥈' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-white">Quiz terminé !</h3>
          <div className={`text-4xl font-bold ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {score}%
          </div>
          <p className="text-gray-400">
            {score >= 80 ? 'Excellent ! Vous maîtrisez parfaitement le sujet.' :
             score >= 60 ? 'Bien joué ! Quelques points à améliorer.' :
             'Continuez à étudier, vous progresserez !'}
          </p>
          
          {/* Correction détaillée */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-left">
            <h4 className="text-white font-bold mb-4">📝 Correction détaillée</h4>
            <div className="space-y-4">
              {currentQuiz.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 bg-black/60 rounded-xl">
                  <p className="text-white font-medium mb-3">{qIndex + 1}. {question.question}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    {selectedAnswers[qIndex] === question.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={selectedAnswers[qIndex] === question.correct ? 'text-green-400' : 'text-red-400'}>
                      Votre réponse: {question.options[selectedAnswers[qIndex]] || 'Aucune réponse'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Bonne réponse: {question.options[question.correct]}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{question.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 flex items-center justify-center mx-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Refaire le quiz
          </button>
        </div>
      );
    }

    const question = currentQuiz.questions[currentQuestion];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className={`text-${currentQuiz.color}-400 font-bold text-lg`}>
            Question {currentQuestion + 1} / {currentQuiz.questions.length}
          </h3>
          <div className="text-gray-400 text-sm">
            Progression: {Math.round(((currentQuestion + 1) / currentQuiz.questions.length) * 100)}%
          </div>
        </div>

        <div className={`w-full bg-gray-700 rounded-full h-2`}>
          <div 
            className={`bg-${currentQuiz.color}-500 h-2 rounded-full transition-all duration-300`}
            style={{width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%`}}
          ></div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          <h4 className="text-white font-bold text-lg mb-6">{question.question}</h4>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? `border-${currentQuiz.color}-500 bg-${currentQuiz.color}-500/20`
                    : 'border-gray-600 bg-black/50 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? `border-${currentQuiz.color}-500 bg-${currentQuiz.color}-500`
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 disabled:opacity-50"
          >
            Précédent
          </button>
          
          {currentQuestion === currentQuiz.questions.length - 1 ? (
            <button
              onClick={calculateScore}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={`px-6 py-3 bg-gradient-to-r from-${currentQuiz.color}-500 to-${currentQuiz.color}-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50`}
            >
              Voir les résultats
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={`px-6 py-3 bg-gradient-to-r from-${currentQuiz.color}-500 to-${currentQuiz.color}-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50`}
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-yellow-500/20">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          🧠 QUIZ EXPERTISE LUXE
        </h2>
        <p className="text-gray-400">Testez et certifiez vos connaissances du luxe</p>
      </div>

      {currentQuestion === 0 && !showResults ? (
        <>
          <QuizSelection />
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <h3 className={`text-${currentQuiz.color}-400 font-bold text-lg mb-4`}>
              {currentQuiz.title}
            </h3>
            <p className="text-gray-300 mb-4">{currentQuiz.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                {currentQuiz.questions.length} questions • Durée estimée: {currentQuiz.questions.length * 2} min
              </span>
              <button
                onClick={() => setCurrentQuestion(0)}
                className={`bg-gradient-to-r from-${currentQuiz.color}-500 to-${currentQuiz.color}-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90`}
              >
                Commencer le quiz
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <QuizInterface />
        </div>
      )}
    </div>
  );
};

export default Quiz;
