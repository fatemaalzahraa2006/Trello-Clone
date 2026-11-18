import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/auth/login'
import Signup from './pages/auth/signup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  )
}

export default App
