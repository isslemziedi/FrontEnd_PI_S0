'use client';

import React, { createContext, useContext, useState } from 'react';
import { translations } from '../app/locales';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr');

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        return path; // Retourne la clé si la traduction n'est pas trouvée
      }
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}