import { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import User from '../api/user'
import { useMemo } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) ?? null
    } catch {
      return null
    }
  })

  const saveUser = (userData) => {
    setAuth(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const login = async (data) => {
    const resBody = await User.login(data)
    saveUser(resBody.user)
    return resBody
  }

  const logout = async () => {
    await User.logout()
    setAuth(null)
    localStorage.removeItem('user')
  }
  const value = useMemo(() => ({ auth, login, logout }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('No aunt context found')
  }

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuth }
