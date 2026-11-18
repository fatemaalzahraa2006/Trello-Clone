import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, ChevronDown, User, LogOut } from 'lucide-react'
import trellologo from '../../assets/trello-logo.jpg'
import Button from '../common/button'
import Avatar from '../common/avatar'
import './navbar.css'

function Navbar() {
//   const [isProfileOpen, setIsProfileOpen] = useState(false)

//   // Temporary user data until authentication is connected
//   const currentUser = {
//     name: 'Fatema Mohamed',
//     imageUrl: '',
//   }

const [isProfileOpen, setIsProfileOpen] = useState(false)

const { currentUser, logout } = useAuth()
const navigate = useNavigate()

function handleLogout() {
  logout()
  setIsProfileOpen(false)
  navigate('/login')
}

  return (
    <nav className="navbar">

{/* Logo */}
<Link
  to="/"
  className="navbar-logo"
  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, textDecoration: 'none' }}
>
  <img
    src={trellologo}
    alt=""
    style={{ height: 24, width: 'auto', display: 'block' }}
  />
  <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Trello</span>
</Link>

      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Boards
        </Link>
      </div>

      {/* Search slot - M6 will integrate search here */}
      <div className="navbar-search">
        <Search size={17} />
        <input
          type="text"
          placeholder="Search boards and cards..."
          disabled
        />
      </div>

      {/* Create button - M2 will integrate board creation */}
      <Button size="small">
        <Plus size={16} />
        Create
      </Button>

      {/* Profile menu */}
      <div className="navbar-profile">

        <button
          className="navbar-profile-button"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
<Avatar
  name={currentUser?.name || 'User'}
  imageUrl={currentUser?.avatar || currentUser?.imageUrl}
  size="small"
/>

          <ChevronDown size={15} />
        </button>

        {isProfileOpen && (
          <div className="profile-dropdown">

            <div className="profile-dropdown-user">
<Avatar
  name={currentUser?.name || 'User'}
  imageUrl={currentUser?.avatar || currentUser?.imageUrl}
  size="medium"
/>
              <div>
                <p>{currentUser?.name || 'User'}</p>
                <span>My account</span>
              </div>
            </div>

            <div className="profile-dropdown-divider" />

            <Link
              to="/profile"
              onClick={() => setIsProfileOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>

            <button onClick={handleLogout}>
              <LogOut size={16} />
              Log out
            </button>

          </div>
        )}

      </div>
    </nav>
  )
}


export default Navbar
