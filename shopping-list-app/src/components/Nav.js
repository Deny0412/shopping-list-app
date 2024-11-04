import Link from "next/link";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";

export default function Nav() {
  const { userList, currentUserId, setCurrentUserId } =
    useContext(ShoppingListContext);

  const handleUserChange = (event) => {
    setCurrentUserId(Number(event.target.value));
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between shadow-lg">
      <div className="flex space-x-4">
        <Link className="text-white font-semibold hover:text-gray-300" href="/">
          Home
        </Link>
      </div>
      <div>
        <select
          value={currentUserId}
          onChange={handleUserChange}
          className="bg-gray-700 text-white px-4 py-2 rounded-md outline-none hover:bg-gray-600"
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
