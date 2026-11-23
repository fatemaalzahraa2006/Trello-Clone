// this is a modal component that can be used to display content in a modal window. It takes in the following props:
// isOpen: a boolean that determines whether the modal is open or closed
// onClose: a function that is called when the modal is closed
// title: a string that is displayed as the title of the modal
// children: the content to be displayed inside the modal
import './modal.css'

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  // Don't render anything if the modal is closed
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
