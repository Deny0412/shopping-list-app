// src/components/AddShoppingList.js
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AddShoppingList({
  currentUserId,
  open,
  onClose,
  onAdd,
}) {
  const [title, setTitle] = useState("");
  const { theme } = useTheme();
  const { language } = useLanguage();

  const translations = {
    cs: {
      addListTitle: "Přidat Nákupní Seznam",
      listName: "Název seznamu:",
      placeholder: "Zadejte název seznamu",
      cancel: "Zrušit",
      confirm: "Potvrdit",
    },
    en: {
      addListTitle: "Add Shopping List",
      listName: "List Name:",
      placeholder: "Enter list name",
      cancel: "Cancel",
      confirm: "Confirm",
    },
  };

  const t = translations[language];

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
      className={`mt-20 p-4 max-w-lg mx-auto rounded-lg shadow-xl border ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
      backdrop="blur-sm bg-gray-800 bg-opacity-50"
    >
      <DialogHeader className="text-2xl font-semibold">
        {t.addListTitle}
      </DialogHeader>
      <DialogBody className="mt-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            {t.listName}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400 ${
                theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t.placeholder}
            />
          </label>
        </form>
      </DialogBody>
      <DialogFooter className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          {t.cancel}
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:ring-2 focus:ring-green-400"
        >
          {t.confirm}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
