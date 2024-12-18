// src/contexts/LanguageContext.js
import { createContext, useState, useContext } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("cs"); // Výchozí jazyk: čeština

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "cs" ? "en" : "cs"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
