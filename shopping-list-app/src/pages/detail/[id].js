import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ShoppingListInsideItem from "../../components/Detail/ShoppingListInsideItem";
import AddItemForm from "../../components/Detail/AddItemForm";
import ManageMembers from "@/components/Detail/ManageMembers";

export default function ShoppingListDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [filter, setFilter] = useState("all");
  const {
    currentUserId,
    lists,
    updateStatusItem,
    changeNameOfList,
    currentList,
    setCurrentList,
    deleteItemFromList,
    loading,
    error,
    ready,
  } = useContext(ShoppingListContext);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const translations = {
    cs: {
      title: "Detail Nákupního Seznamu",
      loading: "Načítání dat...",
      error: "Chyba při načítání:",
      noAccess: "Nemáte oprávnění k zobrazení tohoto seznamu.",
      noLists: "Nemáte žádné seznamy.",
      all: "Všechny položky",
      completed: "Jen vyřešené",
      uncompleted: "Jen nevyřešené",
      save: "Uložit",
      edit: "Upravit",
    },
    en: {
      title: "Shopping List Detail",
      loading: "Loading data...",
      error: "Error loading data:",
      noAccess: "You do not have permission to view this list.",
      noLists: "You have no lists.",
      all: "All items",
      completed: "Only completed",
      uncompleted: "Only uncompleted",
      save: "Save",
      edit: "Edit",
    },
  };

  const t = translations[language];
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (ready && lists && lists.length > 0 && id) {
      const list = lists.find((list) => list.id === parseInt(id));
      if (list) {
        setCurrentList(list);
        setNewTitle(list.title);
      } else {
        setCurrentList(null);
      }
    }
  }, [currentUserId, id, lists, ready]);

  if (loading) return <p className="text-gray-500">{t.loading}</p>;
  if (error) return <p className="text-red-500">{`${t.error} ${error}`}</p>;
  if (!ready || !currentUserId || !lists || !currentList)
    return <p className="text-gray-500">{t.noLists}</p>;
  if (
    currentList.ownerId !== currentUserId &&
    !currentList.members.includes(currentUserId)
  )
    return <p className="text-red-500">{t.noAccess}</p>;

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    changeNameOfList(currentList.id, newTitle);
    setIsEditing(false);
  };
  const handleDeleteItem = (itemId) =>
    deleteItemFromList(currentList.id, itemId);
  const filterItemsInList = () => {
    if (filter === "completed")
      return currentList.items.filter((item) => item.isCompleted);
    if (filter === "uncompleted")
      return currentList.items.filter((item) => !item.isCompleted);
    return currentList.items;
  };

  return (
    <div
      className={`min-h-screen w-full py-8 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {isEditing ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.title}
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              currentList.title
            )}
          </h1>
          {currentList.ownerId === currentUserId &&
            (isEditing ? (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {t.save}
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                {t.edit}
              </button>
            ))}
        </div>

        <ManageMembers members={currentList.members} />

        <AddItemForm listId={currentList.id} />

        <div className="flex space-x-4 my-4">
          {["all", "completed", "uncompleted"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {t[type]}
            </button>
          ))}
        </div>

        <ul className="space-y-4 mt-6">
          {filterItemsInList().map((item) => (
            <ShoppingListInsideItem
              key={item.id}
              item={item}
              onUpdateStatus={(itemId) =>
                updateStatusItem(currentList.id, itemId)
              }
              onDelete={handleDeleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
