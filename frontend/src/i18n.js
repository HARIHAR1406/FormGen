import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Templates": "Templates",
      "Favorites": "Favorites",
      "Recent Works": "Recent Works",
      "Profile": "Profile",
      "Log Out": "Log Out",
      "Total Projects": "Total Projects",
      "Biodatas": "Biodatas",
      "Resumes": "Resumes",
      "Welcome back": "Welcome back, {{name}} 👋",
      "Quick Create": "Quick Create",
      "Your Documents": "Your Documents",
      "Search documents": "Search documents...",
      "All Types": "All Types",
      "Biodatas Only": "Biodatas Only",
      "Resumes Only": "Resumes Only",
      "Last Modified": "Last Modified",
      "Creation Date": "Creation Date",
      "Alphabetical (A-Z)": "Alphabetical (A-Z)",
      "Create Document": "Create Document"
    }
  },
  hi: {
    translation: {
      "Dashboard": "डैशबोर्ड",
      "Templates": "टेम्पलेट्स",
      "Favorites": "पसंदीदा",
      "Recent Works": "हाल के कार्य",
      "Profile": "प्रोफ़ाइल",
      "Log Out": "लॉग आउट",
      "Total Projects": "कुल प्रोजेक्ट्स",
      "Biodatas": "बायोडाटा",
      "Resumes": "रेज़्यूमे",
      "Welcome back": "वापसी पर स्वागत है, {{name}} 👋",
      "Quick Create": "त्वरित बनाएँ",
      "Your Documents": "आपके दस्तावेज़",
      "Search documents": "दस्तावेज़ खोजें...",
      "All Types": "सभी प्रकार",
      "Biodatas Only": "केवल बायोडाटा",
      "Resumes Only": "केवल रेज़्यूमे",
      "Last Modified": "अंतिम संशोधित",
      "Creation Date": "निर्माण तिथि",
      "Alphabetical (A-Z)": "वर्णमाला के अनुसार (A-Z)",
      "Create Document": "दस्तावेज़ बनाएँ"
    }
  },
  ta: {
    translation: {
      "Dashboard": "முகப்புப்பலகை",
      "Templates": "வார்ப்புருக்கள்",
      "Favorites": "விருப்பமானவை",
      "Recent Works": "சமீபத்திய பணிகள்",
      "Profile": "சுயவிவரம்",
      "Log Out": "வெளியேறு",
      "Total Projects": "மொத்த திட்டங்கள்",
      "Biodatas": "பயோடேட்டாக்கள்",
      "Resumes": "ரெஸ்யூம்கள்",
      "Welcome back": "மீண்டும் வருக, {{name}} 👋",
      "Quick Create": "விரைவாக உருவாக்கு",
      "Your Documents": "உங்கள் ஆவணங்கள்",
      "Search documents": "ஆவணங்களைத் தேடுக...",
      "All Types": "அனைத்து வகைகள்",
      "Biodatas Only": "பயோடேட்டா மட்டும்",
      "Resumes Only": "ரெஸ்யூம்கள் மட்டும்",
      "Last Modified": "கடைசியாக மாற்றப்பட்டது",
      "Creation Date": "உருவாக்கிய தேதி",
      "Alphabetical (A-Z)": "அகர வரிசைப்படி (A-Z)",
      "Create Document": "ஆவணத்தை உருவாக்கு"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('app_lang') || 'en', // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
