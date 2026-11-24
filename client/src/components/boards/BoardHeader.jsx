import { useAuth } from '../../context/AuthContext'
import { useState ,useEffect } from 'react'

function BoardHeader({ board, onUpdateTitle ,onAddMember,onRemoveMember,onDeleteBoard }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(board.title)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  //might remove this state if we don't need it
  const [isCancelling, setIsCancelling] = useState(false)
  const { currentUser } = useAuth()
  useEffect(() => {
  setTitle(board.title)
}, [board.title])
const isOwner = board.owner === currentUser.email
  const handleSave = () => {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    setTitle(board.title)
    setIsEditing(false)
    return
  }

  onUpdateTitle(trimmedTitle)
  setIsEditing(false)
}

  const handleBlur = () => {
  if (isCancelling) {
    setIsCancelling(false)
    return
  }

  handleSave()
}

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }

    if (e.key === 'Escape') {
  setIsCancelling(true)
  setTitle(board.title)
  setIsEditing(false)
}
  }
  const handleInvite = () => {
  const email = inviteEmail.trim().toLowerCase()

  if (!email) {
    alert('Please enter an email address')
    return
  }
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  alert('Please enter a valid email address')
  return
}
if (email === currentUser.email.toLowerCase()) {
  alert('You are already part of this board')
  return
}
  if (
  board.members.some(
    (member) => member.toLowerCase() === email.toLowerCase()
  )
) {
  alert('This person is already a member')
  return
}

  onAddMember(email)
  setInviteEmail('')
}
  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isEditing ? (
          <input
  autoFocus
  maxLength={50}
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  onBlur={handleBlur}
  onKeyDown={handleKeyDown}
/>
        ) : (
          <h1 onClick={() => {
  if (isOwner) {
    setIsEditing(true)
  }
}}>
            {board.title}
          </h1>
        )}

        <div style={{ display: 'flex', gap: '8px' }}>
          {board.members.map((member) => (
            <div
              key={member}
              title={member}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'white',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              {member[0].toUpperCase()}
            </div>
          ))}

          <button onClick={() => setIsShareOpen(true)}>
            Share
          </button>
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
  Settings
</button>
        </div>
      </header>
{isSettingsOpen && (
  <div>
    <h3>Board settings</h3>

    {isOwner && (
  <button
    onClick={() => setShowDeleteConfirm(true)}
    style={{
      backgroundColor: '#d32f2f',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
  >
    Delete board
  </button>
)}
  </div>
)}
{showDeleteConfirm && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: 'white',
        color: '#172b4d',
        padding: '24px',
        borderRadius: '10px',
        width: '350px',
        maxWidth: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <h2>Delete this board?</h2>

      <p>
        This action cannot be undone.
        Are you sure you want to delete this board?
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '24px',
        }}
      >
        <button
          onClick={() => setShowDeleteConfirm(false)}
        >
          Cancel
        </button>

        <button
          onClick={onDeleteBoard}
          style={{
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
      {isShareOpen && (
        <div>
          <h2>Share board</h2>
          <p>Invite people to collaborate on this board.</p>
          <h3>Board members ({board.members.length})</h3>

<div>
  {board.members.map((member) => (
    <div
  key={member}
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  }}
>
  <span>
  {member}
  {member === board.owner && ' (Owner)'}
</span>

  {isOwner && member !== board.owner && (
  <button
  onClick={() => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${member}?`
    )

    if (confirmed) {
      onRemoveMember(member)
    }
  }}
>
  Remove
</button>
)}
</div>
  ))}
</div>
          {isOwner && (
  <input
  type="email"
  placeholder="Enter email address"
  value={inviteEmail}
  onChange={(e) => setInviteEmail(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleInvite()
    }
  }}
/>
)}
{isOwner && (
  <button onClick={handleInvite}>
    Invite
  </button>
)}
          <button onClick={() => setIsShareOpen(false)}>
            Close
          </button>
        </div>
      )}
    </>
  )
}

export default BoardHeader
