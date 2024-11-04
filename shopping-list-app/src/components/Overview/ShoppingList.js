import { useContext, useState, useEffect } from "react";
import ShoppingListItem from "./ShoppingListItem";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import AddShoppingList from "./AddShoppingList";
import FilterOptions from "./FilterOptions";
import { Button } from "@material-tailwind/react";

export default function ShoppingList() {
  const { currentUserId, addList, filterListsArchive, loading, error, ready } =
    useContext(ShoppingListContext);
  const [open, setOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const handleOpen = () => setOpen(!open);
  const toggleShowArchived = () => setShowArchived((prev) => !prev);

  // Get the filtered lists based on archive status
  const filteredLists = filterListsArchive(showArchived);

  useEffect(() => {
    if (loading) {
      console.log("Načítání...");
    } else if (error) {
      console.log(error);
    } else if (ready) {
      console.log("Data jsou připravena.");
    }
  }, [loading, error, ready]);

  return (
    <div
      className={`p-6 min-h-screen transition ${
        open ? "blur-sm" : "blur-none"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Seznam nákupů</h1>
          <Button
            onClick={handleOpen}
            variant="gradient"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Přidat seznam
          </Button>
        </div>
        <FilterOptions
          showArchived={showArchived}
          toggleShowArchived={toggleShowArchived}
        />
      </div>

      <AddShoppingList
        currentUserId={currentUserId}
        open={open}
        onClose={handleOpen}
        onAdd={addList}
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Načítání...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">{error}</p>
      ) : ready && filteredLists.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Nemáte žádné seznamy.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLists.map((element) => (
            <ShoppingListItem key={element.id} item={element} />
          ))}
        </div>
      )}
    </div>
  );
}
