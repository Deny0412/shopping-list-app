import Link from "next/link";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { SunIcon, MoonIcon, GlobeAltIcon } from "@heroicons/react/24/solid";

export default function Nav() {
  const { userList, currentUserId, setCurrentUserId } =
    useContext(ShoppingListContext);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const handleUserChange = (event) => {
    setCurrentUserId(Number(event.target.value));
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 p-4 flex items-center justify-between shadow-md transition duration-500 ease-in-out">
      <div className="flex space-x-4 items-center">
        <Link
          className="text-gray-800 dark:text-gray-300 font-semibold hover:text-gray-500 dark:hover:text-gray-400 transition duration-300"
          href="/"
        >
          {language === "cs" ? "Domů" : "Home"}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Přepínač mezi češtinou a angličtinou */}
        <div className="flex items-center">
          <GlobeAltIcon className="h-6 w-6 text-gray-800 dark:text-gray-300 mr-2" />
          <button
            onClick={toggleLanguage}
            className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            {language === "cs" ? "Čeština" : "English"}
          </button>
        </div>

        {/* Tlačítko pro přepínání Dark-Light režimu */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        >
          {theme === "light" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>

        {/* Dropdown pro výběr uživatele */}
        <select
          value={currentUserId}
          onChange={handleUserChange}
          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-md outline-none hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        >
          {userList.map((element) => (
            <option value={element.id} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
