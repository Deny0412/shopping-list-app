import React, { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import AddMemberForm from "./AddMemberForm";
import { useRouter } from "next/router";

export default function ManageMembers({ members }) {
  const { userList, removeMemberFromList, currentList, currentUserId } =
    useContext(ShoppingListContext);
  const router = useRouter();

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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Správa členů</h1>

      {/* Zobrazení vlastníka seznamu */}
      {owner && (
        <div className="mb-4 p-3 bg-gray-200 rounded-lg">
          <p className="text-gray-700 font-medium">Vlastník: {owner.name}</p>
        </div>
      )}

      <ul className="space-y-4">
        {listMembers.map((member) => (
          <li
            key={member.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <p className="text-gray-700 font-medium">{member.name}</p>
            {(member.id === currentUserId ||
              currentList.ownerId === currentUserId) && (
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Odstranit
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <AddMemberForm listId={currentList.id}>
          <span className="text-blue-500 hover:text-blue-700 font-medium">
            Přidat člena
          </span>
        </AddMemberForm>
      </div>
    </div>
  );
}
