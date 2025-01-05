import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import các file ngôn ngữ
import en from './locales/en.json';
import vi from './locales/vi.json';

i18n
  .use(LanguageDetector) // Tự phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next) // Tích hợp với React
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi }
    },
    fallbackLng: 'en', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false // React tự động xử lý escape
    }
  });

export default i18n;
