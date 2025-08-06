import React from 'react';
import { Translations } from '../utils/translations';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  translations: Translations;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart, translations }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  let message = '';
  let emoji = '';
  let resultClass = '';
  
  if (percentage >= 90) {
    message = translations.excellent;
    emoji = '🏆';
    resultClass = 'result-excellent';
  } else if (percentage >= 70) {
    message = translations.good;
    emoji = '🎉';
    resultClass = 'result-good';
  } else if (percentage >= 50) {
    message = translations.average;
    emoji = '👍';
    resultClass = 'result-average';
  } else {
    message = translations.needs_improvement;
    emoji = '💪';
    resultClass = 'result-needs-improvement';
  }

  return (
    <div className="results-container">
      {/* Celebration Animation */}
      <div className="celebration-area">
        <div className="celebration-emoji">{emoji}</div>
        <div className="floating-particles">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}>✨</div>
          ))}
        </div>
      </div>
      
      {/* Score Circle */}
      <div className={`score-circle-container ${resultClass}`}>
        <div className="score-circle">
          <div className="score-ring">
            <svg className="progress-ring" width="200" height="200">
              <circle
                className="progress-ring-bg"
                cx="100"
                cy="100"
                r="85"
              />
              <circle
                className="progress-ring-fill"
                cx="100"
                cy="100"
                r="85"
                strokeDasharray={534.07}
                strokeDashoffset={534.07 * (1 - percentage / 100)}
              />
            </svg>
            <div className="score-content">
              <div className="score-percentage">{percentage}%</div>
              <div className="score-text">{score}/{totalQuestions}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Message */}
      <div className="result-message-container">
        <h2 className="result-title">{translations.finalScore}</h2>
        <p className={`result-message ${resultClass}`}>{message}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={onRestart}
          className="primary-action-btn"
        >
          <span className="btn-icon">🔄</span>
          <span className="btn-text">{translations.playAgain}</span>
        </button>
        
        <button
          onClick={() => window.location.href = '#'}
          className="secondary-action-btn"
        >
          <span className="btn-icon">🔍</span>
          <span className="btn-text">{translations.discoverMore}</span>
        </button>
      </div>

      {/* Performance Insights */}
      <div className="performance-insights">
        <div className="insight-card">
          <div className="insight-icon">📊</div>
          <div className="insight-content">
            <div className="insight-label">Score</div>
            <div className="insight-value">{percentage}%</div>
          </div>
        </div>
        
        <div className="insight-card">
          <div className="insight-icon">✅</div>
          <div className="insight-content">
            <div className="insight-label">Correctes</div>
            <div className="insight-value">{score}</div>
          </div>
        </div>
        
        <div className="insight-card">
          <div className="insight-icon">❌</div>
          <div className="insight-content">
            <div className="insight-label">Incorrectes</div>
            <div className="insight-value">{totalQuestions - score}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;