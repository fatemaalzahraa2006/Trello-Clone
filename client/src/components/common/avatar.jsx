
import './avatar.css'

function Avatar({
  name,
  imageUrl,
  size = 'medium',
}) {
  // Generate initials from the user's name
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : '?'

  return (
    <div className={`avatar avatar-${size}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={name || 'User avatar'} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export default Avatar
