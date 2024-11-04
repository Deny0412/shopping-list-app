// src/components/ShoppingList.js
import { useContext, useState } from "react";
import ShoppingListItem from "./ShoppingListItem";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import AddShoppingList from "./AddShoppingList";
import { Button } from "@material-tailwind/react";
export default function ShoppingList() {
  const { lists, addList, currentUserId, filterLists } =
    useContext(ShoppingListContext);
  const [open, setOpen] = useState(false);

  // Funkce pro přepínání dialogu
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div onClick={() => console.log("Show Archive")}>Show Archive</div>
      {/* Tlačítko pro otevření dialogu */}
      <Button onClick={handleOpen} variant="gradient">
        Add List
      </Button>
      {/* Komponenta AddShoppingList jako dialog */}
      <AddShoppingList
        currentUserId={currentUserId}
        open={open}
        onClose={handleOpen}
        onAdd={addList}
      />
      {/* Seznam nákupních položek */}
      {filterLists().map((element) => (
        <ShoppingListItem key={element.id} item={element} />
      ))}
    </>
  );
}
