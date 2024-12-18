import React, { useContext, useState } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AddMemberForm({ listId }) {
  const { userList, addMemberToList, lists, currentUserId } =
    useContext(ShoppingListContext);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const currentList = lists.find((list) => list.id === listId);

  // Filtruje dostupné uživatele, kteří nejsou ani členy, ani vlastníkem seznamu
  const availableMembers = userList.filter(
    (user) =>
      !currentList.members.includes(user.id) && user.id !== currentList.ownerId
  );

  const [selectedMember, setSelectedMember] = useState("");

  const translations = {
    cs: {
      title: "Přidat člena",
      placeholder: "Vybrat uživatele",
      addButton: "Přidat",
    },
    en: {
      title: "Add Member",
      placeholder: "Select a user",
      addButton: "Add",
    },
  };

  const t = translations[language];

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
    <div
      className={`p-6 rounded-lg shadow-lg transition ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">{t.title}</h2>
      <div className="flex items-center space-x-4">
        {/* Select Box */}
        <select
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400"
              : "border-gray-300 bg-gray-50 text-gray-800 focus:ring-blue-500"
          }`}
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="">{t.placeholder}</option>
          {availableMembers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleAddMember}
          className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-all focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
          }`}
        >
          {t.addButton}
        </button>
      </div>
    </div>
  );
}
