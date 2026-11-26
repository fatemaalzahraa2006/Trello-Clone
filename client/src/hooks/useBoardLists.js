import { useEffect, useState } from "react";

// TEMPORARY mock lists. Replaced by real data when the backend exists.
const initialLists = [
  { id: "l1", title: "To do", position: 1 },
  { id: "l2", title: "In progress", position: 2 },
  { id: "l3", title: "Done", position: 3 },
];

export default function useBoardLists(boardId) {
  const [lists, setLists] = useState(() =>
    initialLists.map((list) => ({ ...list, boardId }))
  );
    // TEMPORARY: fake loading delay so the skeleton can be seen.
  // Remove this when real data comes from the backend.
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [boardId]);



  const sortedLists = [...lists].sort((a, b) => a.position - b.position);

  // Returns true if the list was added (empty titles are rejected).
  const addList = (title) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return false;
    setLists((prev) => {
      const nextPosition = prev.length
        ? Math.max(...prev.map((l) => l.position)) + 1
        : 1;
      return [
        ...prev,
        { id: `l${Date.now()}`, boardId, title: cleanTitle, position: nextPosition },
      ];
    });
    return true;
  };

  const renameList = (id, title) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return false;
    setLists((prev) =>
      prev.map((l) => (l.id === id ? { ...l, title: cleanTitle } : l))
    );
    return true;
  };

  const deleteList = (id) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  // Moves a list to the place of another one, then renumbers positions 1..n.
  const reorderLists = (activeId, overId) => {
    setLists((prev) => {
      const sorted = [...prev].sort((a, b) => a.position - b.position);
      const from = sorted.findIndex((l) => l.id === activeId);
      const to = sorted.findIndex((l) => l.id === overId);
      if (from < 0 || to < 0 || from === to) return prev;
      const [moved] = sorted.splice(from, 1);
      sorted.splice(to, 0, moved);
      return sorted.map((l, index) => ({ ...l, position: index + 1 }));
    });
  };

  return { lists: sortedLists,isLoading, addList, renameList, deleteList, reorderLists };
}