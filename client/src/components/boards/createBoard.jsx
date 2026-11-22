import { useState } from 'react'

function CreateBoardModal({ onClose,onCreate ,owner}) {

  const [title, setTitle] = useState('')
  const [background, setBackground] = useState('#0079BF')
const colors = [
  '#0079BF',
  '#D29034',
  '#519839',
  '#B04632',
  '#89609E',
  '#CD5A91',
  '#00AECC',
  '#838C91'
]
const handleCreate = () => {
  if (!title.trim()) {
  alert('Please enter a board title')
  return
}
  const newBoard = {
    id: Date.now(),
    title: title,
    background: background,
    owner: owner,
    members: [owner]
  }

  onCreate(newBoard)
}

  return (
    <div>
      <h2>Create board</h2>

      <input
        type="text"
        placeholder="Enter board title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
  <h3>Background</h3>

  <div style={{ display: 'flex', gap: '10px' }}>
    {colors.map((color) => (
      <button
        key={color}
        onClick={() => setBackground(color)}
        style={{
          backgroundColor: color,
          width: '40px',
          height: '40px',
          border: background === color ? '3px solid black' : 'none',
          cursor: 'pointer'
        }}
      />
    ))}
  </div>
</div>

      <button onClick={handleCreate}>Create</button>
<button onClick={onClose}>Cancel</button>
    </div>
  )
}

export default CreateBoardModal