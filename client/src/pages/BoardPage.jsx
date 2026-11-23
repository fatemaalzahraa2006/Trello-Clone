import BoardCanvas from "../components/board/BoardCanvas";
import "../components/board/board.css";

// TEMPORARY: move these shapes into the shared mockData.js and tell the team.
const mockBoard = { id: "b1", title: "Web Project", background: "#0079bf" };
const mockLists = [
  { id: "l1", boardId: "b1", title: "To do", position: 1 },
  { id: "l2", boardId: "b1", title: "In progress", position: 2 },
  { id: "l3", boardId: "b1", title: "Done", position: 3 },
];

// TEMPORARY: stand-in for M4's Card component.
function DummyCards({ list }) {
  return (
    <>
      <div className="dummy-card">Example card in {list.title}</div>
      <div className="dummy-card">Another card</div>
    </>
  );
}

export default function BoardPage() {
  const lists = [...mockLists].sort((a, b) => a.position - b.position);

  return (
    <div className="board-page" style={{ background: mockBoard.background }}>
      {/* Header slot: M2's BoardHeader goes here */}
      <header className="board-header-slot">{mockBoard.title}</header>

      <BoardCanvas
        lists={lists}
        renderCards={(list) => <DummyCards list={list} />}
      />
    </div>
  );
}
