import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BoardProvider, useBoard } from "../context/BoardContext";
import { mockLists } from "../mockData";
import Card from "../components/Card";
import AddCard from "../components/AddCard";

function List({ list }) {
  const { getCardsByList, addCard, updateCard, deleteCard } = useBoard();
  const cards = getCardsByList(list.id);

  // Makes the list itself a drop target, so an empty list can receive cards
  const { setNodeRef } = useDroppable({ id: list.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: "#f1f2f4",
        width: 272,
        padding: 8,
        borderRadius: 12,
        alignSelf: "flex-start",
      }}
    >
      <h3 style={{ margin: "4px 8px 12px", fontSize: 14, color: "#172b4d", textAlign: "left" }}>
        {list.title}
      </h3>
      <SortableContext
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.map((c) => (
          <Card
            key={c.id}
            card={c}
            onClick={(id) => console.log("clicked", id)}
            onUpdate={updateCard}
            onDelete={deleteCard}
          />
        ))}
      </SortableContext>
      <AddCard onAdd={(title) => addCard(list.id, title)} />
    </div>
  );
}

function Board() {
  const { cards, moveCard, getCardsByList } = useBoard();
  const [activeId, setActiveId] = useState(null);
  const activeCard = cards.find((c) => c.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd({ active, over }) {
    setActiveId(null);
    if (!over) return;

    const overIsList = mockLists.some((l) => l.id === over.id);
    const overCard = cards.find((c) => c.id === over.id);
    const toListId = overIsList ? over.id : overCard?.listId;
    if (!toListId || active.id === over.id) return;

    const targetCards = getCardsByList(toListId);
    let newIndex = overIsList
      ? targetCards.length
      : targetCards.findIndex((c) => c.id === over.id);

    // Same list, moving down: account for the dragged card leaving its slot
    const activeCardData = cards.find((c) => c.id === active.id);
    if (activeCardData.listId === toListId && !overIsList) {
      const oldIndex = targetCards.findIndex((c) => c.id === active.id);
      newIndex = targetCards.findIndex((c) => c.id === over.id);
      if (oldIndex === newIndex) return;
    }

    moveCard(active.id, toListId, newIndex);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div style={{ display: "flex", gap: 16, margin: 40 }}>
        {mockLists.map((l) => (
          <List key={l.id} list={l} />
        ))}
      </div>
      <DragOverlay>
        {activeCard ? <Card card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default function CardTest() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}