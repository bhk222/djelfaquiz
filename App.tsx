
import React, { useState, useCallback } from 'react';
import { GameState, Difficulty } from './types';
import type { Question } from './types';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { questions as allQuestions } from './data/questions';
import { shuffleArray } from './utils/shuffle';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const startGame = useCallback((difficulty: Difficulty) => {
    const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
    const shuffledQuestions = shuffleArray([...filteredQuestions]);
    const gameQuestions = shuffledQuestions.slice(0, 10);
    
    // Pour chaque question, mélangez également ses réponses
    const questionsWithShuffledAnswers = gameQuestions.map(q => ({
      ...q,
      answers: shuffleArray([...q.answers]),
    }));

    setQuestions(questionsWithShuffledAnswers);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState(GameState.Playing);
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setGameState(GameState.Finished);
    }
  }, [currentQuestionIndex, questions.length]);

  const restartGame = useCallback(() => {
    setGameState(GameState.Start);
  }, []);
  
  const renderGameState = () => {
    switch (gameState) {
      case GameState.Playing:
        return (
          <Quiz
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        );
      case GameState.Finished:
        return <Results score={score} totalQuestions={questions.length} onRestart={restartGame} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden" style={{
        backgroundImage: 'url(/algeria-flag-waving.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
      <div className="absolute inset-0 bg-[#fdf6e3] bg-opacity-80 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-3xl mx-auto z-10">
        {renderGameState()}
      </div>
    </main>
  );
};

export default App;