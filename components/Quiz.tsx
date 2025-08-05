import React, { useState, useEffect, useCallback } from 'react';
import type { Question } from '../types';
import { useSound } from '../hooks/useSound';
import { CORRECT_SOUND_BASE64, INCORRECT_SOUND_BASE64 } from '../assets/sounds';

interface QuizProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const TIMER_DURATION = 15;

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const CrossIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const Quiz: React.FC<QuizProps> = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);

  const playCorrectSound = useSound(CORRECT_SOUND_BASE64);
  const playIncorrectSound = useSound(INCORRECT_SOUND_BASE64);

  const goToNextQuestion = useCallback((isCorrect: boolean) => {
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  }, [onAnswer]);

  const handleAnswerClick = useCallback((isCorrect: boolean, index: number) => {
    if (isAnswered) return;

    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    setIsAnswered(true);
    setSelectedAnswer(index);
    goToNextQuestion(isCorrect);
  }, [isAnswered, goToNextQuestion, playCorrectSound, playIncorrectSound]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimer(TIMER_DURATION);
  }, [question]);

  useEffect(() => {
    if (isAnswered) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          handleAnswerClick(false, -1); // -1 for timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [question, isAnswered, handleAnswerClick]);

  
  const getButtonClass = (isCorrect: boolean, index: number) => {
    const baseClass = 'w-full p-4 rounded-md text-lg font-medium transition-all duration-300 ease-in-out transform flex items-center justify-center gap-4 border-b-4';
    if (!isAnswered) {
      return `${baseClass} bg-amber-100 border-amber-300 text-[#5c4033] hover:bg-amber-200 hover:scale-105`;
    }
    if (index === selectedAnswer) {
      return isCorrect 
        ? `${baseClass} bg-green-500 border-green-700 text-white scale-105 animate-pulse` 
        : `${baseClass} bg-red-500 border-red-700 text-white scale-105 animate-pulse`;
    }
    if (isCorrect) {
      return `${baseClass} bg-green-500 border-green-700 text-white`;
    }
    return `${baseClass} bg-stone-200 border-stone-400 opacity-60 cursor-default`;
  };

  const timerProgress = (timer / TIMER_DURATION) * 100;

  return (
    <div className="bg-[#f7f0e0] p-6 md:p-8 rounded-lg shadow-2xl w-full border-4 border-amber-800/10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-center items-center gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i < questionNumber -1 ? 'bg-[#c95b2c] w-4' : i === questionNumber - 1 ? 'bg-[#e7a254] w-6' : 'bg-stone-300 w-4'}`}></div>
            ))}
        </div>
        <div className="relative h-14 w-14">
          <svg className="h-full w-full" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d4c6a8" strokeWidth="3" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#c95b2c" strokeWidth="3" strokeDasharray={`${timerProgress}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)" style={{transition: 'stroke-dasharray 1s linear'}} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#5c4033]">{timer}</span>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-[#5c4033] mb-8 text-center min-h-[100px] flex items-center justify-center">
        {question.questionText}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer.correct, index)}
            disabled={isAnswered}
            className={getButtonClass(answer.correct, index)}
          >
             {isAnswered && index === selectedAnswer && (answer.correct ? <CheckIcon/> : <CrossIcon/>) }
             {isAnswered && index !== selectedAnswer && answer.correct && <CheckIcon/> }
            <span>{answer.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;