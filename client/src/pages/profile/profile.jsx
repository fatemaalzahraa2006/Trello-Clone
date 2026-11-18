
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../../components/common/avatar'
import Button from '../../components/common/button'
import './profile.css'

function Profile() {
  const { currentUser } = useAuth()

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>
          <Link to="/profile/edit">
            <Button variant="primary">Edit Profile</Button>
          </Link>
        </div>

        <div className="profile-info">
          <Avatar
            name={currentUser?.name}
            imageUrl={currentUser?.avatar || currentUser?.imageUrl}
            size="large"
          />

          <div className="profile-details">
            <h2>{currentUser?.name || 'Your name'}</h2>
            <p>{currentUser?.email || 'No email available'}</p>
          </div>
        </div>

        <div className="profile-bio">
          <h3>About me</h3>
          <p>{currentUser?.bio || 'No bio added yet.'}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
