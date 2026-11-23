
import './input.css'

function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
}) {
  const inputId = name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-mark"> *</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-invalid={Boolean(error)}
      />

      {error && <p className="input-error-message">{error}</p>}
    </div>
  )
}

export default Input
