
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import loginBg from '../../assets/login-img.jpg'
import trellologo from '../../assets/trello-logo.jpg'
import Input from '../../components/common/input'
import Button from '../../components/common/button'

import './login.css'

function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const { register } = useAuth()
const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

function handleSubmit(e) {
  e.preventDefault()

  const validationErrors = validateForm()
  setErrors(validationErrors)
  setMessage('')

  if (Object.keys(validationErrors).length === 0) {
    const userData = {
      name: formData.name.trim(),
      email: formData.email,
      bio: '',
      avatar: '',
    }
 
    register(userData, 'temporary-test-token')
    navigate('/profile')
  }
}

  return (
    <div
      className="auth-page"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="auth-card">
        <div className="auth-logo">
          <img
            src={trellologo}
            alt="Trello logo"
            style={{ height: 36, width: 'auto' }}
          />
          <span>Trello</span>
        </div>

        <h1>Sign up for Trello</h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

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
            placeholder="Create a password"
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" block>
            Sign up
          </Button>
        </form>

        {message && (
          <p className="auth-success-message">{message}</p>
        )}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
