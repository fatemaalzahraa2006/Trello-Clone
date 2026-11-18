
import { createContext, useContext, useState } from 'react'
import Toast from '../components/common/toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  function showToast(message, type = 'success') {
    setToast({ message, type })
  }

  function closeToast() {
    setToast(null)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
