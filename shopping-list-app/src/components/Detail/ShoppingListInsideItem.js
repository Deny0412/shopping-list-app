// src/components/ShoppingListInsideItem.js
import React from "react";

export default function ShoppingListInsideItem({
  item,
  onUpdateStatus,
  onDelete,
}) {
  return (
    <li
      key={item.id}
      className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm mb-2"
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{item.name}</span>
        <span
          className={`text-sm ${
            item.isCompleted ? "text-green-500" : "text-red-500"
          }`}
        >
          {item.isCompleted ? "(vyřešené)" : "(nevyřešené)"}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onUpdateStatus(item.id)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Změnit Status
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Smazat
        </button>
      </div>
    </li>
  );
}
