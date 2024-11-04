// src/contexts/ShoppingListContext.js
import { createContext, useEffect, useState } from "react";

// Vytvoření kontextu pro sdílení stavu nákupních seznamů
export const ShoppingListContext = createContext();

// Provider pro obalení aplikace a sdílení kontextu
export default function ShoppingListProvider({ children }) {
  useEffect(() => {
    setCurrentUserId(1);
    // Zde můžete načíst data ze serveru
  }, []);
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "Nákupní seznam 1",
      items: [
        {
          id: 1,
          name: "Item 1",
          isCompleted: false,
        },
        {
          id: 2,
          name: "Item 2",
          isCompleted: false,
        },
        {
          id: 3,
          name: "Item 3",
          isCompleted: true,
        },
      ],
      ownerId: 1,
      isArchived: false,
      members: [2],
    },
    {
      id: 2,
      title: "Nákupní seznam 2",
      items: [],
      ownerId: 2,
      isArchived: false,
      members: [],
    },
    {
      id: 3,
      title: "Nákupní seznam 3",
      items: [],
      ownerId: 1,
      isArchived: false,
      members: [],
    },
    {
      id: 4,
      title: "Nákupní seznam 4",
      items: [],
      ownerId: 1,
      isArchived: true,
      members: [],
    },
  ]);
  const [currentList, setCurrentList] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("active"); //active or archived
  const [currentUserId, setCurrentUserId] = useState();
  const [userList, setUserList] = useState([
    {
      id: 1,
      name: "Jan Novák",
    },
    {
      id: 2,
      name: "Marie Nováková",
    },
    {
      id: 3,
      name: "Pepa Kováč",
    },
  ]);

  // Funkce pro přidání nového seznamu
  function addList(newList) {
    setLists((current) => [
      ...current,
      { ...newList, id: Date.now(), isArchived: false },
    ]);
  }
  function toggleArchiveStatus(listId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, isArchived: !list.isArchived } : list
      )
    );
  }

  function getListById(id) {
    return lists.find((list) => list.id === id);
  }
  function updateStatusItem(listId, itemId) {
    setLists((current) =>
      current.map((list) => {
        if (list.id === listId) {
          list.items.map((item) => {
            if (item.id === itemId) {
              item.isCompleted = !item.isCompleted;
            }
            return item;
          });
        }
        return list;
      })
    );
  }
  // Funkce pro další logiku (např. odebrání seznamu, přidání položek apod.)
  // Například:
  function deleteList(id) {
    setLists((current) => current.filter((list) => list.id !== id));
  }
  function filterLists() {
    //doplnit members

    return lists.filter(
      (list) =>
        list.ownerId === currentUserId || list.members.includes(currentUserId)
    );
  }
  function changeNameOfList(id, newName) {
    setLists((current) =>
      current.map((list) => {
        if (list.id === id) {
          list.title = newName;
        }
        return list;
      })
    );
  }

  function deleteItemFromList(listId, itemId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  }

  function removeMemberFromList(listId, memberId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, members: list.members.filter((id) => id !== memberId) }
          : list
      )
    );
  }

  // Přidejte tuto funkci do ShoppingListContext
  function addItemToList(listId, newItem) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, items: [...list.items, { ...newItem, id: Date.now() }] }
          : list
      )
    );
  }
  function addMemberToList(listId, memberId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId && !list.members.includes(memberId)
          ? { ...list, members: [...list.members, memberId] }
          : list
      )
    );
  }
  // src/contexts/ShoppingListContext.js

  function filterListsArchive(showArchived) {
    const filterList = filterLists();
    return filterList.filter((list) => !list.isArchived || showArchived);
  }

  return (
    <ShoppingListContext.Provider
      value={{
        toggleArchiveStatus,
        deleteItemFromList,
        addMemberToList,
        removeMemberFromList,
        addItemToList,
        changeNameOfList,
        updateStatusItem,
        filterListsArchive,
        filterLists,
        userList,
        lists,
        currentList,
        currentFilter,
        currentUserId,
        setCurrentList,
        setCurrentFilter,
        setCurrentUserId,
        addList,
        deleteList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}
