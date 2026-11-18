// import { Routes, Route, Navigate } from 'react-router-dom'

// import Login from './pages/auth/login'
// import Signup from './pages/auth/signup'

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" replace />} />

//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//     </Routes>
//   )
// }

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import ProfileEdit from './pages/profile/ProfileEdit'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Boards from './pages/boards/boards'
import Profile from './pages/profile/profile'

function App() {
  return (
    <Routes>
      {/* Public pages - no authentication required */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected pages - authentication required */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </Route>
      </Route>

      {/* Unknown URLs */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  )
}

export default App
