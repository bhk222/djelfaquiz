import React from 'react';

interface LanguageSelectorProps {
  currentLanguage: 'ar' | 'fr';
  onLanguageChange: (language: 'ar' | 'fr') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="language-selector">
      <button
        onClick={() => onLanguageChange('ar')}
        className={`lang-btn ${currentLanguage === 'ar' ? 'active' : ''}`}
      >
        <span className="flag">🇩🇿</span>
        <span>العربية</span>
      </button>
      <button
        onClick={() => onLanguageChange('fr')}
        className={`lang-btn ${currentLanguage === 'fr' ? 'active' : ''}`}
      >
        <span className="flag">🇫🇷</span>
        <span>Français</span>
      </button>
    </div>
  );
};

export default LanguageSelector;
