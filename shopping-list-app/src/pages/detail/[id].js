import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import ShoppingListInsideItem from "../../components/Detail/ShoppingListInsideItem";
import AddItemForm from "../../components/Detail/AddItemForm";
import ManageMembers from "@/components/Detail/ManageMembers";

export default function ShoppingListDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [filter, setFilter] = useState("all"); // "all", "completed", or "uncompleted"

  function filterItemsInList() {
    if (filter === "completed") {
      return currentList.items.filter((item) => item.isCompleted);
    } else if (filter === "uncompleted") {
      return currentList.items.filter((item) => !item.isCompleted);
    }
    return currentList.items; // Všechny položky
  }

  const {
    currentUserId,
    lists,
    updateStatusItem,
    changeNameOfList,
    currentList,
    setCurrentList,
    deleteItemFromList,
  } = useContext(ShoppingListContext);

  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (lists && lists.length > 0 && id) {
      const list = lists.find((list) => list.id === parseInt(id));
      if (list) {
        setCurrentList(list);
        setNewTitle(list.title);
      } else {
        setCurrentList(null);
      }
    }
  }, [currentUserId, id, lists]);

  if (!currentUserId || !lists || !currentList) {
    return <p className="text-gray-500">Načítání dat...</p>;
  }
  if (
    currentList.ownerId !== currentUserId &&
    !currentList.members.includes(currentUserId)
  ) {
    return (
      <p className="text-red-500">
        Nemáte oprávnění k zobrazení tohoto seznamu.
      </p>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    changeNameOfList(currentList.id, newTitle);
    setIsEditing(false);
  };

  const handleDeleteItem = (itemId) => {
    deleteItemFromList(currentList.id, itemId);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Nový název seznamu"
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
              Uložit
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Upravit
            </button>
          ))}
      </div>

      <ManageMembers members={currentList.members} />

      <AddItemForm listId={currentList.id} />

      <div className="flex space-x-4 my-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Všechny položky
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Jen vyřešené
        </button>
        <button
          onClick={() => setFilter("uncompleted")}
          className={`px-4 py-2 rounded ${
            filter === "uncompleted"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Jen nevyřešené
        </button>
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
  );
}
