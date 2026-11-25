import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BoardProvider, useBoard } from "../context/BoardContext";
import Card from "../components/Card";
import AddCard from "../components/AddCard";

function TestList({ listId }) {
  const { getCardsByList, addCard, updateCard, deleteCard, moveCard } = useBoard();
  const cards = getCardsByList(listId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const newIndex = cards.findIndex((c) => c.id === over.id);
    moveCard(active.id, listId, newIndex);
  }

  return (
    <div style={{ background: "#f1f2f4", width: 272, padding: 8, margin: 40 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
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
      </DndContext>
      <AddCard onAdd={(title) => addCard(listId, title)} />
    </div>
  );
}

export default function CardTest() {
  return (
    <BoardProvider>
      <TestList listId="l1" />
    </BoardProvider>
  );
}