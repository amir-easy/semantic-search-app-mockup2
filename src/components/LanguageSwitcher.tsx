import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
    >
      {language === 'en' ? 'עברית' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;