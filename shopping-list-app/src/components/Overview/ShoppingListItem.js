import Link from "next/link";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@material-tailwind/react";

export default function ShoppingListItem({ item }) {
  const { currentUserId, toggleArchiveStatus, deleteList } =
    useContext(ShoppingListContext);
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Funkce pro archivaci nebo aktivaci položky
  const handleArchiveToggle = () => {
    toggleArchiveStatus(item.id);
  };

  // Funkce pro smazání položky
  const handleDelete = () => {
    deleteList(item.id);
  };

  // Překlady textů
  const translations = {
    cs: {
      activate: "Aktivovat",
      archive: "Archivovat",
      delete: "Smazat",
      itemCount: (count) => `${count} položky`,
    },
    en: {
      activate: "Activate",
      archive: "Archive",
      delete: "Delete",
      itemCount: (count) => `${count} items`,
    },
  };

  const t = translations[language];

  return (
    <div
      key={item.id}
      className={`p-4 rounded-lg shadow-md flex justify-between items-center transition ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      <Link href={`/detail/${item.id}`}>
        <div
          className={`text-lg font-semibold cursor-pointer ${
            theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
          }`}
        >
          {item.title}
          <span className="ml-2 text-sm text-gray-500">
            ({t.itemCount(item.items.length)})
          </span>
        </div>
      </Link>

      <div className="flex space-x-4">
        {/* Tlačítko pro archivaci nebo aktivaci */}
        {item.ownerId === currentUserId && (
          <Button
            onClick={handleArchiveToggle}
            variant="text"
            color={item.isArchived ? "green" : "blue"}
            className={`${
              item.isArchived
                ? theme === "dark"
                  ? "text-green-400 hover:text-green-300"
                  : "text-green-500 hover:text-green-600"
                : theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-500 hover:text-blue-600"
            }`}
          >
            {item.isArchived ? t.activate : t.archive}
          </Button>
        )}

        {/* Tlačítko pro smazání */}
        {item.ownerId === currentUserId && (
          <Button
            onClick={handleDelete}
            variant="text"
            color="red"
            className={`${
              theme === "dark"
                ? "text-red-400 hover:text-red-300"
                : "text-red-500 hover:text-red-600"
            }`}
          >
            {t.delete}
          </Button>
        )}
      </div>
    </div>
  );
}
