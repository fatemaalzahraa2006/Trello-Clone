import List from "./List";
import AddListForm from "./addListForm";
import useBoardLists from "../../hooks/useBoardLists";
import "./board.css";

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
  const { lists, addList } = useBoardLists(boardId);

  return (
    <div className="board-canvas">
      {lists.map((list) => (
        <List key={list.id} list={list} cardCount={2}>
          {renderCards ? renderCards(list) : <DummyCards list={list} />}
        </List>
      ))}

      <div className="add-list-slot">
        <AddListForm onAdd={addList} />
      </div>
    </div>
  );
}
