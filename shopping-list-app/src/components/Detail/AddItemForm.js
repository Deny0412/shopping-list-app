import { useState, useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";

export default function AddItemForm({ listId }) {
  const [itemName, setItemName] = useState("");
  const { addItemToList } = useContext(ShoppingListContext);

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
    <div className="p-4 bg-white rounded-lg shadow-md flex space-x-4 items-center mt-8">
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Název nové položky"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddItem}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Přidat položku
      </button>
    </div>
  );
}
