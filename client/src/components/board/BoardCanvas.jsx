import { useState } from "react";
///////
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import DragNDropList from "./DragNDropList";

//////////////////////////////
import List from "./List";
import AddListForm from "./AddListForm";
import DeleteListModal from "./DeleteListModal";
import useBoardLists from "../../hooks/useBoardLists";
import "./board.css";
//////
import ListSkeleton from "./ListSkeleton";
import EmptyBoard from "./EmptyBoard";
//////

// TEMPORARY stand-in for M4's Card.
function DummyCards({ list }) {
  return (
    <>
      <div className="dummy-card">Example card in {list.title}</div>
      <div className="dummy-card">Another card</div>
    </>
  );
}

export default function BoardCanvas({ boardId, renderCards }) {
  const { lists , isLoading, addList, renameList, deleteList, reorderLists } =
    useBoardLists(boardId);
  const [listToDelete, setListToDelete] = useState(null);
  ////
  const [activeList, setActiveList] = useState(null); //if we are dragging a list, this is for keeping track of which list is being dragged; a copy of list
  
  const sensors = useSensors(
    // Mouse: drag starts after moving 6px, so plain clicks still work.
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    // Touch: press and hold briefly, so swiping still scrolls the board.
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  ////

  const confirmDelete = () => {
    deleteList(listToDelete.id);
    setListToDelete(null);
  };

  ////drag
  const handleDragStart = ({ active }) => {
    if (active.data.current?.type !== "list") return;
    setActiveList(lists.find((l) => l.id === active.data.current.listId) ?? null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveList(null);
    if (!over || active.id === over.id) return;
    // Cards (M4) will be handled here later, with type "card".
    if (active.data.current?.type !== "list") return;
    if (over.data.current?.type !== "list") return;
    reorderLists(active.data.current.listId, over.data.current.listId);
  };

  const cardsFor = (list) =>
    renderCards ? renderCards(list) : <DummyCards list={list} />;

  const actionsFor = (list, index) => ({
    onRename: renameList,
    onDeleteRequest: () => setListToDelete(list),
    onMoveLeft: () => reorderLists(list.id, lists[index - 1].id),
    onMoveRight: () => reorderLists(list.id, lists[index + 1].id),
    canMoveLeft: index > 0,
    canMoveRight: index < lists.length - 1,
  });
  //////


  /////
   if (isLoading) {
    return (
      <div className="board-canvas">
        <ListSkeleton />
        <ListSkeleton cards={3} />
        <ListSkeleton cards={1} />
      </div>
    );
  }
  /////

  return (
    <div className="board-canvas">
      {/* If there are no lists, show the empty board */}
      {lists.length === 0 && <EmptyBoard />}
      {/* ////////////// */}
    

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveList(null)}
      >
        <SortableContext
          items={lists.map((l) => `list-${l.id}`)}
          strategy={horizontalListSortingStrategy}
        >
          {lists.map((list, index) => (
            <DragNDropList
              key={list.id}
              list={list}
              cardCount={2}
              actions={actionsFor(list, index)}
            >
              {cardsFor(list)}
            </DragNDropList>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeList ? (
            <div className="list-overlay">
              <List list={activeList} cardCount={2}>
                {cardsFor(activeList)}
              </List>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      
      <div className="add-list-slot">
        <AddListForm onAdd={addList} />
      </div>

      <DeleteListModal
        list={listToDelete}
        isOpen={listToDelete !== null}
        onCancel={() => setListToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
