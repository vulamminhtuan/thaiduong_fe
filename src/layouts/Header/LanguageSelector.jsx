import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n} = useTranslation();


  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
  };
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm"
      >
        <Globe className="h-4 w-4" />
        <span>{i18n.language.toUpperCase()}</span>
      </button>
    </div>
  );
};

export default LanguageSelector;