import { useAuth } from '../../context/AuthContext'
import BoardHeader from '../../components/boards/BoardHeader'
import { useParams , useNavigate  } from 'react-router-dom'
//import mockBoards from '../../data/mockBoards'
import { useBoards } from '../../context/BoardsContext'
function BoardPage() {
    const { currentUser } = useAuth()
  const { boardId } = useParams()
  const navigate = useNavigate()
const { boards, setBoards } = useBoards()
  const board = boards.find(
    (board) => board.id === Number(boardId)
  )
 if (!board) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Board Not Found</h1>
      <p>This board doesn't exist or may have been deleted.</p>

      <button onClick={() => navigate('/boards')}>
        Back to Boards
      </button>
    </div>
  )
}

const hasAccess =
  board.owner === currentUser.email ||
  board.members.includes(currentUser.email)

if (!hasAccess) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Access Denied</h1>
      <p>You don't have permission to view this board.</p>

      <button onClick={() => navigate('/boards')}>
        Back to Boards
      </button>
    </div>
  )
}
const handleUpdateTitle = (newTitle) => {
  setBoards(
    boards.map((b) =>
      b.id === Number(boardId)
        ? { ...b, title: newTitle }
        : b
    )
  )
}
const handleAddMember = (email) => {
  setBoards(
    boards.map((b) =>
      b.id === Number(boardId)
        ? { ...b, members: [...b.members, email] }
        : b
    )
  )
}
const handleRemoveMember = (email) => {
  setBoards(
    boards.map((b) =>
      b.id === Number(boardId)
        ? {
            ...b,
            members: b.members.filter(
              (member) => member !== email
            ),
          }
        : b
    )
  )
}
const handleDeleteBoard = () => {
  setBoards(
    boards.filter((b) => b.id !== Number(boardId))
  )

  navigate('/boards')
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
  onAddMember={handleAddMember}
  onRemoveMember={handleRemoveMember}
  onDeleteBoard={handleDeleteBoard}
/>
    </div>
  )
}

export default BoardPage