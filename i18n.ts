import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { languages } from './src/shared/config/languages';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    // Все языки грузятся сразу: StableText резервирует место под самый длинный перевод,
    // и переключение языка происходит мгновенно, без запроса
    preload: languages,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      bindI18n: 'languageChanged loaded',
    },
  });

export default i18n;
