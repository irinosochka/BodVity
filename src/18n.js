import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';
import ua from './locales/ua.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        pl: { translation: pl },
        ua: { translation: ua },
    },
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: 'v3',
});
