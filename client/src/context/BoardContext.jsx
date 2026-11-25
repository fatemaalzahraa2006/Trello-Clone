import { createContext, useContext, useState } from "react";
import { mockCards } from "../mockData";

const BoardContext = createContext(null);

// Give every card a position that matches its order inside its own list
function reindex(cards) {
  const counters = {};
  return cards.map((c) => {
    counters[c.listId] = (counters[c.listId] || 0) + 1;
    return { ...c, position: counters[c.listId] };
  });
}

export function BoardProvider({ children }) {
  const [cards, setCards] = useState(mockCards);

  function getCardsByList(listId) {
    return cards
      .filter((c) => c.listId === listId)
      .sort((a, b) => a.position - b.position);
  }

  function addCard(listId, title) {
    const newCard = {
      id: "c" + Date.now(),
      listId,
      title,
      position: cards.filter((c) => c.listId === listId).length + 1,
      labels: [],
      dueDate: null,
      assignees: [],
      commentCount: 0,
    };
    setCards([...cards, newCard]);
  }

  function updateCard(id, changes) {
    setCards(cards.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }

  function deleteCard(id) {
    setCards(cards.filter((c) => c.id !== id));
  }

  // The one function for every move: same list (reorder) or another list (move)
  function moveCard(cardId, toListId, newIndex) {
    setCards((prev) => {
      const card = prev.find((c) => c.id === cardId);
      if (!card) return prev;

      const others = prev.filter((c) => c.id !== cardId);
      const target = others
        .filter((c) => c.listId === toListId)
        .sort((a, b) => a.position - b.position);
      const rest = others.filter((c) => c.listId !== toListId);

      target.splice(newIndex, 0, { ...card, listId: toListId });
      return reindex([...rest, ...target]);
    });
  }

  const value = { cards, getCardsByList, addCard, updateCard, deleteCard, moveCard };
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  return useContext(BoardContext);
}