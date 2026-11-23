import List from "./List";

// The horizontal canvas that holds all lists.
// Later: the single DndContext for the board will wrap this (lists + cards).
export default function BoardCanvas({ lists, renderCards }) {
  return (
    <div className="board-canvas">
      {lists.map((list) => (
        <List key={list.id} list={list} cardCount={2}>
          {renderCards ? renderCards(list) : null}
        </List>
      ))}
    </div>
  );
}
