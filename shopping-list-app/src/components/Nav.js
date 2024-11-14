import Link from "next/link";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Nav() {
  const { userList, currentUserId, setCurrentUserId } =
    useContext(ShoppingListContext);
  const { theme, toggleTheme } = useTheme();

  const handleUserChange = (event) => {
    setCurrentUserId(Number(event.target.value));
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 flex items-center justify-between shadow-lg">
      <div className="flex space-x-4">
        <Link
          className="text-white dark:text-gray-300 font-semibold hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
      </div>
      <div>
        <button
          onClick={toggleTheme}
          className="text-white dark:text-gray-300 mr-4"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
        <select
          value={currentUserId}
          onChange={handleUserChange}
          className="bg-gray-700 text-white dark:bg-gray-600 dark:text-gray-300 px-4 py-2 rounded-md outline-none hover:bg-gray-600 dark:hover:bg-gray-500"
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
