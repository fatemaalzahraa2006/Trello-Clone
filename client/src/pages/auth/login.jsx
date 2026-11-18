import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginBg from '../../assets/login-img.jpg'
import Input from '../../components/common/input'
import Button from '../../components/common/button'
import trellologo from '../../assets/trello-logo.jpg'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Login() {
    const { login } = useAuth()
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.password) {
  newErrors.password = 'Password is required'
} else if (formData.password.length < 6) {
  newErrors.password = 'Password must be at least 6 characters'
}

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)
    setMessage('')

    // if (Object.keys(validationErrors).length === 0) {
    //   setMessage('Form is valid. Backend login will be connected later.')
    // }
if (Object.keys(validationErrors).length === 0) {
  const userData = {
    name: formData.email.split('@')[0],
    email: formData.email,
    bio: '',
    avatar: '',
  }

  login(userData, 'temporary-test-token')
  navigate('/profile')
}



  }

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${loginBg})` }} >
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <img src={trellologo} alt="" style={{ height: 36, width: 'auto' }} />
          <span>Trello</span>
        </div>

        <h1>Log in to continue</h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            required
          />

          <label className="auth-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <Button type="submit" block>
            Continue
          </Button>
        </form>

        {message && <p className="auth-success-message">{message}</p>}

        <p className="auth-footer">
          
          <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login