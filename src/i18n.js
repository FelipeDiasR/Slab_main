import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Permite carregar arquivos JSON
  .use(LanguageDetector) // Detecta o idioma do navegador
  .use(initReactI18next) // Integra com React
  .init({
    fallbackLng: 'en', // Idioma padrão
    debug: true, // Ativa logs para depuração
    interpolation: {
      escapeValue: false, // Não escapa os valores (necessário para React)
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // Caminho para os arquivos de tradução
    },
    interpolation: {
        escapeValue: false
      }
  });

export default i18n;
