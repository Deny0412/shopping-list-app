import Link from "next/link";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { Button } from "@material-tailwind/react";

export default function ShoppingListItem({ item }) {
  const { currentUserId, toggleArchiveStatus, deleteList } =
    useContext(ShoppingListContext);

  // Funkce pro archivaci nebo aktivaci položky
  const handleArchiveToggle = () => {
    toggleArchiveStatus(item.id);
  };

  // Funkce pro smazání položky
  const handleDelete = () => {
    deleteList(item.id);
  };

  return (
    <div
      key={item.id}
      className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
    >
      <Link href={`/detail/${item.id}`}>
        <div className="text-lg font-semibold text-gray-800 cursor-pointer">
          {item.title}
        </div>
      </Link>

      <div className="flex space-x-4">
        {/* Tlačítko pro archivaci nebo aktivaci, zobrazuje se pouze vlastníkovi */}
        {item.ownerId === currentUserId && (
          <Button
            onClick={handleArchiveToggle}
            variant="text"
            color={item.isArchived ? "green" : "blue"}
            className={`${
              item.isArchived ? "text-green-500" : "text-blue-500"
            } underline hover:${
              item.isArchived ? "text-green-600" : "text-blue-600"
            }`}
          >
            {item.isArchived ? "Aktivovat" : "Archivovat"}
          </Button>
        )}

        {/* Tlačítko pro smazání (pouze pokud je aktuální uživatel vlastníkem) */}
        {item.ownerId === currentUserId && (
          <Button
            onClick={handleDelete}
            variant="text"
            color="red"
            className="text-red-500 underline hover:text-red-600"
          >
            Smazat
          </Button>
        )}
      </div>
    </div>
  );
}
