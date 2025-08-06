import React from 'react';
import { Difficulty } from '../types';
import { Translations } from '../utils/translations';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
  translations: Translations;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, translations }) => {
  return (
    <div className="start-screen-container">
      {/* Hero Section avec illustration */}
      <div className="hero-section">
        <div className="hero-illustration">
          <div className="hero-circle primary"></div>
          <div className="hero-circle secondary"></div>
          <div className="hero-circle tertiary"></div>
          <div className="quiz-icon">🧠</div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            {translations.title}
          </h1>
          <p className="hero-subtitle">
            {translations.subtitle}
          </p>
        </div>
      </div>

      {/* Section des niveaux de difficulté */}
      <div className="difficulty-section">
        <h2 className="section-title">
          {translations.selectDifficulty}
        </h2>

        
        <div className="difficulty-cards">
          <div 
            className="difficulty-card easy-card"
            onClick={() => onStart(Difficulty.Easy)}
          >
            <div className="card-icon">🌱</div>
            <div className="card-content">
              <h3 className="card-title">{translations.easy}</h3>
              <p className="card-description">Questions de base sur Djelfa</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
          
          <div 
            className="difficulty-card medium-card"
            onClick={() => onStart(Difficulty.Medium)}
          >
            <div className="card-icon">⚡</div>
            <div className="card-content">
              <h3 className="card-title">{translations.medium}</h3>
              <p className="card-description">Connaissances intermédiaires</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
          
          <div 
            className="difficulty-card hard-card"
            onClick={() => onStart(Difficulty.Hard)}
          >
            <div className="card-icon">🔥</div>
            <div className="card-content">
              <h3 className="card-title">{translations.hard}</h3>
              <p className="card-description">Pour les experts de la région</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </div>
      </div>

      {/* Message d'encouragement */}
      <div className="encouragement-section">
        <div className="encouragement-card">
          <div className="encouragement-icon">🎯</div>
          <p className="encouragement-text">
            {translations.readyMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;