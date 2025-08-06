import React, { useState, useEffect, useCallback } from 'react';
import type { Question } from '../types';
import { useSound } from '../hooks/useSound';
import { modernSounds } from '../assets/modernSounds';
import { Translations } from '../utils/translations';
import { getQuestionText, getAnswerText } from '../utils/questionHelpers';

interface QuizProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  translations: Translations;
  language: 'ar' | 'fr';
}

const TIMER_DURATION = 15;

// Icônes simples
const CheckIcon = () => <span className="answer-icon correct">✓</span>;
const CrossIcon = () => <span className="answer-icon incorrect">✗</span>;


const Quiz: React.FC<QuizProps> = ({ question, onAnswer, questionNumber, totalQuestions, translations, language }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);

  const goToNextQuestion = useCallback((isCorrect: boolean) => {
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  }, [onAnswer]);

  const handleAnswerClick = useCallback((isCorrect: boolean, index: number) => {
    if (isAnswered) return;

    if (isCorrect) {
      modernSounds.playCorrect();
    } else {
      modernSounds.playIncorrect();
    }

    setIsAnswered(true);
    setSelectedAnswer(index);
    goToNextQuestion(isCorrect);
  }, [isAnswered, goToNextQuestion]);

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
          modernSounds.playTimeUp();
          handleAnswerClick(false, -1); // -1 for timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [question, isAnswered, handleAnswerClick]);

  
  const getAnswerClass = (isCorrect: boolean, index: number) => {
    let baseClass = 'answer-base';
    
    if (!isAnswered) {
      return `${baseClass} interactive`;
    }
    
    if (index === selectedAnswer) {
      return `${baseClass} ${isCorrect ? 'correct selected' : 'incorrect selected'}`;
    }
    
    if (isCorrect) {
      return `${baseClass} correct`;
    }
    
    return `${baseClass} disabled`;
  };

  const getTimerClass = () => {
    let baseClass = 'timer-circular';
    if (timer <= 5) return `${baseClass} timer-danger`;
    if (timer <= 10) return `${baseClass} timer-warning`;
    return baseClass;
  };

  return (
    <div className="quiz-container">
      {/* Progress Header */}
      <div className="quiz-header">
        <div className="progress-info">
          <div className="question-counter">
            <span className="current">{questionNumber}</span>
            <span className="separator">/</span>
            <span className="total">{totalQuestions}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="timer-container">
          <div className={getTimerClass()}>
            <svg className="timer-svg" viewBox="0 0 42 42">
              <circle
                className="timer-bg"
                cx="21"
                cy="21"
                r="15.5"
              />
              <circle
                className="timer-progress"
                cx="21"
                cy="21"
                r="15.5"
                strokeDasharray="97.4"
                strokeDashoffset={97.4 * (1 - timer / TIMER_DURATION)}
              />
            </svg>
            <div className="timer-text">{timer}</div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-card">
        <h2 className="question-text">
          {getQuestionText(question, language)}
        </h2>
      </div>
      
      {/* Answers Grid */}
      <div className="answers-grid">
        {question.answers.map((answer, index) => {
          const isCorrectAnswer = answer.correct;
          const isSelected = selectedAnswer === index;
          
          return (
            <div
              key={index}
              className={`answer-option ${getAnswerClass(isCorrectAnswer, index)} ${isAnswered ? 'answered' : ''}`}
              onClick={() => handleAnswerClick(isCorrectAnswer, index)}
            >
              <div className="answer-content">
                <div className="answer-letter">
                  {index + 1}
                </div>
                <div className="answer-text">
                  {getAnswerText(answer, language)}
                </div>
                <div className="answer-indicator">
                  {isAnswered && isCorrectAnswer && <CheckIcon />}
                  {isAnswered && isSelected && !isCorrectAnswer && <CrossIcon />}
                </div>
              </div>
              
              {/* Ripple effect pour l'interaction */}
              <div className="ripple-effect"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;