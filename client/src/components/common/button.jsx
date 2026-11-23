import './button.css'
// props: children, variant, size, type, disabled, onClick
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`} // this line dynamically sets the class names based on the variant and size props
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
