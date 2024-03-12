import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import enJson from "./locale/en.json"
import deJson from "./locale/de_DE.json"

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug:true,
    resources: {
        en: { ...enJson },
        de_DE: { ...deJson}
    },
    fallbackLng: "en"
})

export default i18n