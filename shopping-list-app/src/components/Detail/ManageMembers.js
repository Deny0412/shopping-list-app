import React, { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import AddMemberForm from "./AddMemberForm";
import { useRouter } from "next/router";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ManageMembers({ members }) {
  const { userList, removeMemberFromList, currentList, currentUserId } =
    useContext(ShoppingListContext);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const router = useRouter();

  // Překlady
  const translations = {
    cs: {
      manageMembers: "Správa členů",
      owner: "Vlastník",
      remove: "Odstranit",
      addMember: "Přidat člena",
    },
    en: {
      manageMembers: "Manage Members",
      owner: "Owner",
      remove: "Remove",
      addMember: "Add Member",
    },
  };

  const t = translations[language];

  // Najdeme vlastníka seznamu
  const owner = userList.find((user) => user.id === currentList.ownerId);

  const listMembers = userList
    .filter((user) => members.includes(user.id))
    .map(({ id, name }) => ({ id, name }));

  const handleRemoveMember = (memberId) => {
    removeMemberFromList(currentList.id, memberId);
    if (memberId === currentUserId) router.push("/");
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">{t.manageMembers}</h1>

      {/* Zobrazení vlastníka seznamu */}
      {owner && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <p className="font-medium">
            {t.owner}: {owner.name}
          </p>
        </div>
      )}

      <ul className="space-y-4">
        {listMembers.map((member) => (
          <li
            key={member.id}
            className={`flex justify-between items-center p-3 rounded-lg ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="font-medium">{member.name}</p>
            {(member.id === currentUserId ||
              currentList.ownerId === currentUserId) && (
              <button
                onClick={() => handleRemoveMember(member.id)}
                className={`font-medium ${
                  theme === "dark"
                    ? "text-red-400 hover:text-red-500"
                    : "text-red-500 hover:text-red-700"
                }`}
              >
                {t.remove}
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <AddMemberForm listId={currentList.id}>
          <span
            className={`font-medium ${
              theme === "dark"
                ? "text-blue-400 hover:text-blue-500"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {t.addMember}
          </span>
        </AddMemberForm>
      </div>
    </div>
  );
}
