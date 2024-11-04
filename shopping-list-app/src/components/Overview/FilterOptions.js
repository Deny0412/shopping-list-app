// src/components/FilterOptions.js
import React from "react";
import { Button } from "@material-tailwind/react";

export default function FilterOptions({ showArchived, toggleShowArchived }) {
  return (
    <Button
      variant="text"
      color="blue"
      className="hover:text-blue-600 text-blue-500 underline"
      onClick={toggleShowArchived}
    >
      {showArchived ? "Zobrazit aktivní" : "Zobrazit vše"}
    </Button>
  );
}
