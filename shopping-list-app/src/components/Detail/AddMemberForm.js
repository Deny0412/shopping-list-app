import React, { useContext, useState } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";

export default function AddMemberForm({ listId }) {
  const { userList, addMemberToList, lists, currentUserId } =
    useContext(ShoppingListContext);
  const currentList = lists.find((list) => list.id === listId);

  // Filtruje dostupné uživatele, kteří nejsou ani členy, ani vlastníkem seznamu
  const availableMembers = userList.filter(
    (user) =>
      !currentList.members.includes(user.id) && user.id !== currentList.ownerId
  );

  const [selectedMember, setSelectedMember] = useState("");

  const handleAddMember = () => {
    if (selectedMember) {
      addMemberToList(listId, parseInt(selectedMember));
      setSelectedMember("");
    }
  };
  if (currentList.ownerId !== currentUserId) {
    return null; // Vlastník není aktuální uživatel, nevykreslí se nic
  }
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Přidat člena</h2>
      <div className="flex items-center space-x-4">
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          {currentList.ownerId === currentUserId && (
            <>
              <option value="">Vybrat uživatele</option>
              {availableMembers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </>
          )}
        </select>
        <button
          onClick={handleAddMember}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Přidat
        </button>
      </div>
    </div>
  );
}
