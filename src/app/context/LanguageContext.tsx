import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, ar: string) => string;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en');
  const t = (en: string, ar: string) => lang === 'ar' ? ar : en;
  const isAr = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isAr }}>
      <div dir={isAr ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}