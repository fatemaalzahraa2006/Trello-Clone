
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore the user's session when the app starts or refreshes
  // useEffect is a React hook that runs a function after the component renders. In this case, it checks if there is a saved user and token in localStorage and restores them to the state if they exist. If there is an error, it clears the localStorage and sets loading to false.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user')
      const savedToken = localStorage.getItem('token')

      if (savedUser && savedToken) {
        setCurrentUser(JSON.parse(savedUser))
        setToken(savedToken)
      }
    } catch (error) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save the user and token after successful login or registration
  function login(userData, authToken) {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', authToken)

    setCurrentUser(userData)
    setToken(authToken)
  }

  // For now, registration establishes the same session as login
  function register(userData, authToken) {
    login(userData, authToken)
  }

  // Clear the session when the user logs out
  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    setCurrentUser(null)
    setToken(null)
  }

  // Update the user's information after editing their profile
  function updateUser(updatedData) {
    setCurrentUser((previousUser) => {
      const updatedUser = { ...previousUser, ...updatedData }

      localStorage.setItem('user', JSON.stringify(updatedUser))

      return updatedUser
    })
  }

  const value = {
    currentUser,
    token,
    isAuthenticated: Boolean(currentUser && token),
    loading,
    login,
    register,
    logout,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
