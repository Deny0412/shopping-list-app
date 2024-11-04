// src/components/AddShoppingList.js
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function AddShoppingList({
  currentUserId,
  open,
  onClose,
  onAdd,
}) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({
      id: 0,
      title: title,
      items: [],
      ownerId: currentUserId,
      isArchived: false,
      members: [],
    }); // Přidání nového seznamu
    setTitle(""); // Reset formuláře
    onClose(); // Zavření dialogu
  };

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Přidat Nákupní Seznam</DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <label>
            Název seznamu:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border p-1 mt-2 w-full"
            />
          </label>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
