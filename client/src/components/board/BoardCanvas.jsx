import { useState } from "react";
import List from "./List";

// TEMPORARY mock lists. Later: useBoardLists hook, then real data.
const initialLists = [
  { id: "l1", title: "To do", position: 1 },
  { id: "l2", title: "In progress", position: 2 },
  { id: "l3", title: "Done", position: 3 },
];

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
  const [lists] = useState(() =>
    initialLists.map((list) => ({ ...list, boardId }))
  );
  const sorted = [...lists].sort((a, b) => a.position - b.position);

  return (
    <div className="board-canvas">
      {sorted.map((list) => (
        <List key={list.id} list={list} cardCount={2}>
          {renderCards ? renderCards(list) : <DummyCards list={list} />}
        </List>
      ))}
    </div>
  );
}
