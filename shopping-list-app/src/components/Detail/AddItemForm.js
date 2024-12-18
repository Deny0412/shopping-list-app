import { useState, useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AddItemForm({ listId }) {
  const [itemName, setItemName] = useState("");
  const { addItemToList } = useContext(ShoppingListContext);
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Překlady textů podle jazyka
  const translations = {
    cs: {
      placeholder: "Název nové položky",
      addButton: "Přidat položku",
    },
    en: {
      placeholder: "New item name",
      addButton: "Add item",
    },
  };

  const t = translations[language];

  const handleAddItem = () => {
    if (itemName.trim() === "") return; // Zajistí, že prázdné položky se nepřidají

    const newItem = {
      name: itemName,
      isCompleted: false, // Můžete upravit výchozí hodnotu podle potřeby
    };

    addItemToList(listId, newItem); // Volá funkci z kontextu pro přidání položky
    setItemName(""); // Vyčistí vstupní pole po přidání položky
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md flex space-x-4 items-center mt-8 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder={t.placeholder}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
          theme === "dark"
            ? "border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400 placeholder-gray-400"
            : "border-gray-300 bg-gray-50 text-gray-800 focus:ring-blue-500 placeholder-gray-500"
        }`}
      />
      <button
        onClick={handleAddItem}
        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400"
            : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
        }`}
      >
        {t.addButton}
      </button>
    </div>
  );
}
