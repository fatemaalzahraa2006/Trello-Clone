import { useAuth } from '../../context/AuthContext'
import { useBoards } from '../../context/BoardsContext'
//import mockBoards from '../../data/mockBoards'
import BoardCard from '../../components/boards/BoardCard'
import { useState } from 'react'
import CreateBoardModal from '../../components/boards/createBoard'
function Boards() {
  //const [boards, setBoards] = useState(mockBoards)
  const { boards, setBoards } = useBoards()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { currentUser } = useAuth()

  const yourBoards = boards.filter(
    (board) => board.owner === currentUser.email
  )

  const sharedBoards = boards.filter(
    (board) =>
      board.owner !== currentUser.email &&
      board.members.includes(currentUser.email)
  )
  
  return (
    <div style={{ padding: '24px' }}>
      <h1>Your boards</h1>
      <button onClick={() => setIsModalOpen(true)}>
  Create new board
</button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {yourBoards.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
            background={board.background}
          />
        ))}
      </div>
      

      <h2>Shared with you</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {sharedBoards.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
            background={board.background}
          />
        ))}
      </div>
      {isModalOpen && (
  <CreateBoardModal
  onClose={() => setIsModalOpen(false)}
  owner={currentUser.email}
  onCreate={(newBoard) => {
    setBoards([...boards, newBoard])
    setIsModalOpen(false)
  }}
/>
)}
    </div>
  )
}

export default Boards