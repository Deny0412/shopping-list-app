import { createContext, useEffect, useState } from "react";

// Vytvoření kontextu pro sdílení stavu nákupních seznamů
export const ShoppingListContext = createContext();

// Provider pro obalení aplikace a sdílení kontextu
export default function ShoppingListProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false); // nový stav ready
  const [currentUserId, setCurrentUserId] = useState(1); // Default user

  // Mock function to simulate fetching lists from a server
  const mockFetchLists = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Nákupní seznam 1",
            items: [
              { id: 1, name: "Item 1", isCompleted: false },
              { id: 2, name: "Item 2", isCompleted: false },
              { id: 3, name: "Item 3", isCompleted: true },
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
      }, 1000);
    });
  };

  const [currentList, setCurrentList] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("active"); // active or archived
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

  const fetchLists = async () => {
    setLoading(true);
    setReady(false);
    try {
      const data = await mockFetchLists();
      setLists(data);
      setError(null);
      setReady(true);
    } catch (err) {
      setError("Failed to load lists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Funkce pro přidání nového seznamu
  const addList = async (newList) => {
    const mockAddList = (list) =>
      new Promise((resolve) => setTimeout(() => resolve(list), 500));

    try {
      setLoading(true);
      const addedList = await mockAddList({ ...newList, id: Date.now() });
      setLists((current) => [...current, addedList]);
      setReady(true);
    } catch (err) {
      setError("Failed to add list");
    } finally {
      setLoading(false);
    }
  };

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

  const deleteList = async (id) => {
    const mockDeleteList = (listId) =>
      new Promise((resolve) => setTimeout(() => resolve(listId), 500));

    try {
      setLoading(true);
      await mockDeleteList(id);
      setLists((current) => current.filter((list) => list.id !== id));
      setReady(true);
    } catch (err) {
      setError("Failed to delete list");
    } finally {
      setLoading(false);
    }
  };

  function filterLists() {
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

  function filterListsArchive(showArchived) {
    const filterList = filterLists();
    return filterList.filter((list) => !list.isArchived || showArchived);
  }

  return (
    <ShoppingListContext.Provider
      value={{
        loading,
        error,
        ready,
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
