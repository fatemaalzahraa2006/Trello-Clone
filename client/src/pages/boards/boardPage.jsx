import BoardHeader from '../../components/boards/BoardHeader'
import { useParams } from 'react-router-dom'
//import mockBoards from '../../data/mockBoards'
import { useBoards } from '../../context/BoardsContext'
function BoardPage() {
    
  const { boardId } = useParams()
const { boards, setBoards } = useBoards()
  const board = boards.find(
    (board) => board.id === Number(boardId)
  )
const handleUpdateTitle = (newTitle) => {
  setBoards(
    boards.map((b) =>
      b.id === Number(boardId)
        ? { ...b, title: newTitle }
        : b
    )
  )
}
  if (!board) {
    return <h1>Board not found</h1>
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: board.background,
        padding: '24px',
        color: 'white'
      }}
    >
      <BoardHeader
  board={board}
  onUpdateTitle={handleUpdateTitle}
/>
    </div>
  )
}

export default BoardPage