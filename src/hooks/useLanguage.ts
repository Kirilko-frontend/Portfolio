import { useState, useEffect, useCallback } from 'react';
import i18n from '../../i18n';

export const useLanguage = () => {
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleChange = (lng: string) => setLanguage(lng);
    i18n.on('languageChanged', handleChange); // слушаем изменения языка
    return () => {
      i18n.off('languageChanged', handleChange);
    };
  }, []);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('app-language', lng); // сохраняем выбранный язык
  }, []);

  return { language, changeLanguage };
};
