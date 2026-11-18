
import './toast.css'

function Toast({ message, type = 'success', onClose }) {
  if (!message) {
    return null
  }

  return (
    <div className={`toast toast-${type}`} role="status">
      <span>{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
