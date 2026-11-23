import { Link } from 'react-router-dom'

function BoardCard({ id, title, background }) {
  return (
    <Link
      to={`/boards/${id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          backgroundColor: background,
          padding: '20px',
          borderRadius: '8px',
          color: 'white',
          minHeight: '100px',
        }}
      >
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default BoardCard