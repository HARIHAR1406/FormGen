import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('app_lang', lng);
  };

  return (
    <div className="language-selector">
      <FiGlobe size={16} />
      <select 
        value={i18n.language} 
        onChange={(e) => changeLanguage(e.target.value)}
        className="lang-select"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="ta">தமிழ் (Tamil)</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
