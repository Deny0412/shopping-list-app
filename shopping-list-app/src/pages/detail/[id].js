import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ShoppingListInsideItem from "../../components/Detail/ShoppingListInsideItem";
import AddItemForm from "../../components/Detail/AddItemForm";
import ManageMembers from "@/components/Detail/ManageMembers";
import ItemStatsChart from "../../components/Detail/ItemStatsChart";

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
    cs: { title: "Detail Nákupního Seznamu", save: "Uložit", edit: "Upravit" },
    en: { title: "Shopping List Detail", save: "Save", edit: "Edit" },
  };

  const t = translations[language];
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (ready && lists && id) {
      const list = lists.find((list) => list.id === parseInt(id));
      setCurrentList(list || null);
      if (list) setNewTitle(list.title);
    }
  }, [id, lists, ready]);

  if (loading || !currentList) return <p>{t.loading}</p>;

  const completedItems = currentList.items.filter(
    (item) => item.isCompleted
  ).length;
  const uncompletedItems = currentList.items.filter(
    (item) => !item.isCompleted
  ).length;

  const handleSave = () => {
    changeNameOfList(currentList.id, newTitle);
    setIsEditing(false);
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
        {/* Flexní kontejner pro název, tlačítko a graf */}
        <div className="flex justify-between items-center mb-4">
          {/* Levá strana: název a tlačítko */}
          <div className="flex items-center space-x-4">
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
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className={`px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isEditing ? t.save : t.edit}
            </button>
          </div>

          {/* Pravá strana: zmenšený graf */}
          {currentList.items.length > 0 && (
            <div className="flex-shrink-0 w-32 h-24">
              <ItemStatsChart
                completed={completedItems}
                uncompleted={uncompletedItems}
                theme={theme}
              />
            </div>
          )}
        </div>

        {/* Správa členů a přidání položek */}
        <ManageMembers members={currentList.members} />
        <AddItemForm listId={currentList.id} />

        <ul className="space-y-4 mt-6">
          {currentList.items.map((item) => (
            <ShoppingListInsideItem
              key={item.id}
              item={item}
              onUpdateStatus={() => updateStatusItem(currentList.id, item.id)}
              onDelete={() => deleteItemFromList(currentList.id, item.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
