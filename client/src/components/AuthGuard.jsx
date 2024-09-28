import { useAuth } from '../context/auth'
import { Redirect } from 'wouter'

export default function AuthGuard({ children }) {
  const { auth } = useAuth()

  return auth ? children : <Redirect to='/login' />
}
