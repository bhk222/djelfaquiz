import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Difficulty, Question } from './types';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LanguageSelector from './components/LanguageSelector';
import { questions as allQuestions } from './data/questions';
import { shuffleArray } from './utils/shuffle';
import { registerSync } from './lib/syncManager';
import { getTranslation, Translations } from './utils/translations';
import { modernSounds } from './assets/modernSounds';
import { registerSW } from 'virtual:pwa-register';
const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [language, setLanguage] = useState<'ar' | 'fr'>('ar');
  const [translations, setTranslations] = useState<Translations>(getTranslation('ar'));

  // Mettre à jour les traductions quand la langue change
  useEffect(() => {
    setTranslations(getTranslation(language));
    // Mettre à jour la direction du texte
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Enregistrer le Service Worker pour le mode hors ligne
  useEffect(() => {
    registerSync();
    
    const updateSW = registerSW({
      onNeedRefresh() {
        console.log('Une mise à jour est disponible');
        // Optionnel : afficher une notification à l'utilisateur
        if (window.confirm('Une nouvelle version est disponible. Voulez-vous recharger ?')) {
          window.location.reload();
        }
      },
      onOfflineReady() {
        console.log('Application prête pour utilisation hors ligne');
      },
    });

    // Gérer les raccourcis depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      const difficultyMap = {
        'easy': Difficulty.Easy,
        'medium': Difficulty.Medium,
        'hard': Difficulty.Hard
      };
      startGame(difficultyMap[difficulty as keyof typeof difficultyMap]);
    }
  }, []);

  const startGame = useCallback((difficulty: Difficulty) => {
    const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = shuffleArray(filteredQuestions).slice(0, 10);

    const questionsWithShuffledAnswers = shuffled.map(q => ({
      ...q,
      answers: shuffleArray([...q.answers]),
    }));

    setQuestions(questionsWithShuffledAnswers);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState(GameState.Playing);
    
    // Jouer son de démarrage
    modernSounds.playStart();
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setCurrentQuestionIndex(prev => {
      const next = prev + 1;
      if (next < questions.length) {
        return next;
      } else {
        setGameState(GameState.Finished);
        return prev;
      }
    });
  }, [questions.length]);

  const restartGame = useCallback(() => {
    setGameState(GameState.Start);
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    modernSounds.playClick();
  }, []);

  const handleLanguageChange = useCallback((newLanguage: 'ar' | 'fr') => {
    setLanguage(newLanguage);
    modernSounds.playClick();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
    }}>
      {gameState === GameState.Start && (
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      )}
      <div className="container">
        {gameState === GameState.Start && (
          <StartScreen 
            onStart={startGame} 
            translations={translations}
          />
        )}
        {gameState === GameState.Playing && (
          <Quiz
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            translations={translations}
            language={language}
          />
        )}
        {gameState === GameState.Finished && (
          <Results 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={restartGame}
            translations={translations}
          />
        )}
      </div>
    </div>
  );
};

export default App;
