import { useContext, useState, useEffect } from "react";
import ShoppingListItem from "./ShoppingListItem";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import AddShoppingList from "./AddShoppingList";
import FilterOptions from "./FilterOptions";
import { Button } from "@material-tailwind/react";

export default function ShoppingList() {
  const { currentUserId, addList, filterListsArchive, loading, error, ready } =
    useContext(ShoppingListContext);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const [open, setOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const handleOpen = () => setOpen(!open);
  const toggleShowArchived = () => setShowArchived((prev) => !prev);

  // Překlady textů podle jazyka
  const translations = {
    cs: {
      title: "Seznam nákupů",
      addList: "Přidat seznam",
      loading: "Načítání...",
      noLists: "Nemáte žádné seznamy.",
    },
    en: {
      title: "Shopping List",
      addList: "Add List",
      loading: "Loading...",
      noLists: "You have no lists.",
    },
  };

  const t = translations[language];

  // Get the filtered lists based on archive status
  const filteredLists = filterListsArchive(showArchived);

  useEffect(() => {
    if (loading) {
      console.log("Načítání...");
    } else if (error) {
      console.log(error);
    } else if (ready) {
      console.log("Data jsou připravena.");
    }
  }, [loading, error, ready]);

  return (
    <div
      className={`p-6 min-h-screen transition duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <Button
            onClick={handleOpen}
            className={`px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition duration-300 focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            }`}
          >
            {t.addList}
          </Button>
        </div>
        <FilterOptions
          showArchived={showArchived}
          toggleShowArchived={toggleShowArchived}
        />
      </div>

      <AddShoppingList
        currentUserId={currentUserId}
        open={open}
        onClose={handleOpen}
        onAdd={addList}
      />

      {loading ? (
        <p className="text-center mt-8">{t.loading}</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">{error}</p>
      ) : ready && filteredLists.length === 0 ? (
        <p className="text-center mt-8">{t.noLists}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLists.map((element) => (
            <ShoppingListItem key={element.id} item={element} />
          ))}
        </div>
      )}
    </div>
  );
}
