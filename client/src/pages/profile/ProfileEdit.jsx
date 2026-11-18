
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import Avatar from '../../components/common/avatar'
import Input from '../../components/common/input'
import Button from '../../components/common/button'

import './ProfileEdit.css'

function ProfileEdit() {
  const { currentUser, updateUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || currentUser?.imageUrl || '',
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2 MB.')
      return
    }

    setError('')

    const reader = new FileReader()

    reader.onload = () => {
      setFormData((previous) => ({
        ...previous,
        avatar: reader.result,
      }))
    }

    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Name is required.')
      return
    }

    updateUser({
      name: formData.name.trim(),
      bio: formData.bio.trim(),
      avatar: formData.avatar,
    })

    showToast('Profile updated successfully!', 'success')
    navigate('/profile')
  }

  return (
    <div className="profile-edit-page">
      <div className="profile-edit-card">
        <h1>Edit Profile</h1>
        <p className="profile-edit-subtitle">
          Update your personal information.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="profile-edit-avatar">
            <Avatar
              name={formData.name}
              imageUrl={formData.avatar}
              size="large"
            />

            <label className="avatar-upload">
              Change photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <div className="profile-edit-field">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself"
              rows={4}
              maxLength={250}
            />
            <span>{formData.bio.length}/250 characters</span>
          </div>

          {error && <p className="profile-edit-error">{error}</p>}

          <div className="profile-edit-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
