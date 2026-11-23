import { useState } from 'react'
function BoardHeader({ board,onUpdateTitle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(board.title)
  const handleSave = () => {
  onUpdateTitle(title)
  setIsEditing(false)
}
  return (
    <header>
      {isEditing ? (
  <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  onBlur={handleSave}
/>
) : (
  <h1 onClick={() => setIsEditing(true)}>
    {board.title}
  </h1>
)}
    </header>
  )
}

export default BoardHeader