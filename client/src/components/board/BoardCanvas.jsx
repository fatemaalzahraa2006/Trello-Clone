import { useState } from "react";
import List from "./List";
import AddListForm from "./AddListForm";
import DeleteListModal from "./DeleteListModal";
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
  const { lists, addList, renameList, deleteList, reorderLists } =
    useBoardLists(boardId);
  const [listToDelete, setListToDelete] = useState(null);

  const confirmDelete = () => {
    deleteList(listToDelete.id);
    setListToDelete(null);
  };

  return (
    <div className="board-canvas">
      {lists.map((list, index) => (
        <List
          key={list.id}
          list={list}
          cardCount={2}
          actions={{
            onRename: renameList,
            onDeleteRequest: () => setListToDelete(list),
            onMoveLeft: () => reorderLists(list.id, lists[index - 1].id),
            onMoveRight: () => reorderLists(list.id, lists[index + 1].id),
            canMoveLeft: index > 0,
            canMoveRight: index < lists.length - 1,
          }}
        >
          {renderCards ? renderCards(list) : <DummyCards list={list} />}
        </List>
      ))}

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
