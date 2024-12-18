// src/components/FilterOptions.js
import React from "react";
import { Button } from "@material-tailwind/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FilterOptions({ showArchived, toggleShowArchived }) {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Překlady textů
  const translations = {
    cs: {
      showActive: "Zobrazit aktivní",
      showAll: "Zobrazit vše",
    },
    en: {
      showActive: "Show Active",
      showAll: "Show All",
    },
  };

  const t = translations[language];

  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        variant="gradient"
        className={`transition px-4 py-2 rounded-lg shadow-md text-sm font-semibold ${
          theme === "dark"
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={toggleShowArchived}
      >
        {showArchived ? t.showActive : t.showAll}
      </Button>
    </div>
  );
}
