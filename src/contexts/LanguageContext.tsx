import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    'app.title': 'easy',
    'nav.features': 'Features',
    'nav.demo': 'Demo',
    'nav.about': 'About',
    'hero.title': 'Discover Local Businesses with Semantic Search',
    'hero.subtitle': 'Find exactly what you\'re looking for with our innovative, AI-powered search engine.',
    'search.placeholder': 'Try \'cozy coffee shop with fast Wi-Fi\'',
    'feature.location.title': 'Precise Location Matching',
    'feature.location.description': 'Find businesses that are not just near you, but in the exact area you\'re interested in.',
    'feature.speed.title': 'Lightning-Fast Results',
    'feature.speed.description': 'Our vector database ensures quick and relevant search results every time.',
    'feature.explore.title': 'Intuitive Exploration',
    'feature.explore.description': 'Discover new local gems with our smart recommendation system.',
    'demo.title': 'See It in Action',
    'demo.description': 'Try these example searches to see how our semantic search works:',
    'demo.example1': 'Quiet bookstore with a reading nook',
    'demo.example2': 'Family-friendly restaurant with outdoor seating',
    'demo.example3': 'Eco-friendly clothing store with vintage options',
    'about.title': 'About easy',
    'about.description': 'easy is an innovative project that aims to revolutionize how people discover and connect with local businesses. Our semantic search engine uses advanced AI and a vector database to understand the context and intent behind your searches, providing more accurate and meaningful results.',
    'about.cta': 'Visit easy.co.il',
    'footer.copyright': '© 2023 easy. All rights reserved.',
  },
  he: {
    'app.title': 'איזי',
    'nav.features': 'תכונות',
    'nav.demo': 'הדגמה',
    'nav.about': 'אודות',
    'hero.title': 'גלה עסקים מקומיים עם חיפוש סמנטי',
    'hero.subtitle': 'מצא בדיוק את מה שאתה מחפש עם מנוע החיפוש החדשני שלנו, מופעל על ידי בינה מלאכותית.',
    'search.placeholder': 'נסה \'בית קפה נעים עם Wi-Fi מהיר\'',
    'feature.location.title': 'התאמת מיקום מדויקת',
    'feature.location.description': 'מצא עסקים שלא רק קרובים אליך, אלא באזור המדויק שמעניין אותך.',
    'feature.speed.title': 'תוצאות מהירות כברק',
    'feature.speed.description': 'מסד הנתונים הווקטורי שלנו מבטיח תוצאות חיפוש מהירות ורלוונטיות בכל פעם.',
    'feature.explore.title': 'חקירה אינטואיטיבית',
    'feature.explore.description': 'גלה אוצרות מקומיים חדשים עם מערכת ההמלצות החכמה שלנו.',
    'demo.title': 'ראה את זה בפעולה',
    'demo.description': 'נסה את החיפושים לדוגמה הבאים כדי לראות כיצד החיפוש הסמנטי שלנו עובד:',
    'demo.example1': 'חנות ספרים שקטה עם פינת קריאה',
    'demo.example2': 'מסעדה ידידותית למשפחה עם ישיבה בחוץ',
    'demo.example3': 'חנות בגדים ידידותית לסביבה עם אפשרויות וינטג\'',
    'about.title': 'אודות איזי',
    'about.description': 'איזי הוא פרויקט חדשני שמטרתו לשנות את האופן שבו אנשים מגלים ומתחברים לעסקים מקומיים. מנוע החיפוש הסמנטי שלנו משתמש בבינה מלאכותית מתקדמת ובמסד נתונים וקטורי כדי להבין את ההקשר והכוונה מאחורי החיפושים שלך, ומספק תוצאות מדויקות ומשמעותיות יותר.',
    'about.cta': 'בקר ב-easy.co.il',
    'footer.copyright': '© 2023 איזי. כל הזכויות שמורות.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};