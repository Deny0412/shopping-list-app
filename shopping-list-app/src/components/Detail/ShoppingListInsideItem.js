import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShoppingListInsideItem({
  item,
  onUpdateStatus,
  onDelete,
}) {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Překlady
  const translations = {
    cs: {
      completed: "(vyřešené)",
      uncompleted: "(nevyřešené)",
      changeStatus: "Změnit Status",
      delete: "Smazat",
    },
    en: {
      completed: "(completed)",
      uncompleted: "(not completed)",
      changeStatus: "Change Status",
      delete: "Delete",
    },
  };

  const t = translations[language];

  return (
    <li
      key={item.id}
      className={`flex items-center justify-between p-4 rounded-lg shadow-sm mb-2 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      } border`}
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{item.name}</span>
        <span
          className={`text-sm ${
            item.isCompleted
              ? theme === "dark"
                ? "text-green-400"
                : "text-green-500"
              : theme === "dark"
              ? "text-red-400"
              : "text-red-500"
          }`}
        >
          {item.isCompleted ? t.completed : t.uncompleted}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onUpdateStatus(item.id)}
          className={`px-3 py-1 text-sm rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-blue-600 text-gray-200 hover:bg-blue-500 focus:ring-blue-400"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
          }`}
        >
          {t.changeStatus}
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className={`px-3 py-1 text-sm rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-red-600 text-gray-200 hover:bg-red-500 focus:ring-red-400"
              : "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
          }`}
        >
          {t.delete}
        </button>
      </div>
    </li>
  );
}
