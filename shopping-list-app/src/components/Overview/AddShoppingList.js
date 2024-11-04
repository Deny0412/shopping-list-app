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
    });
    setTitle("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      className="mt-20 p-4 max-w-lg mx-auto bg-white rounded-lg shadow-xl border"
      backdrop="blur-sm bg-gray-800 bg-opacity-50" // Rozmazání a tmavé pozadí pro dialog
    >
      <DialogHeader className="text-2xl font-semibold text-gray-800">
        Přidat Nákupní Seznam
      </DialogHeader>
      <DialogBody className="mt-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Název seznamu:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Zadejte název seznamu"
            />
          </label>
        </form>
      </DialogBody>
      <DialogFooter className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:ring-2 focus:ring-green-400"
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
