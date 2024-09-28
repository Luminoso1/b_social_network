import { Switch, Route } from 'wouter'
import { lazy, Suspense } from 'react'

import AuthGuard from './components/AuthGuard'
import LoadingPage from './components/LoadingPage.jsx'
import NotFound from './pages/not-found'
import Nav from './components/nav/Nav'
import UserPage from './pages/user'

const Home = lazy(() => import('./pages/home'), 500)
const Login = lazy(() => import('./components/auth/Login'))
const Register = lazy(() => import('./components/auth/Register'))
const ProfilePage = lazy(() => import('./pages/profile'))

export default function App() {
  return (
    <div className='h-screen max-w-6xl px-2 mx-auto flex'>
      <Nav />
      <main className='flex-auto mt-36'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <AuthGuard path='/'>
            <Suspense fallback={<LoadingPage />}>
              <Home />
            </Suspense>
          </AuthGuard>

          <Route path='/me' nest>
            <AuthGuard>
              <Suspense fallback={<LoadingPage />}>
                <ProfilePage />
              </Suspense>
            </AuthGuard>
          </Route>

          <Route path='/user/:nick' nest>
            <AuthGuard>
              <Suspense fallback={<LoadingPage />}>
                <UserPage />
              </Suspense>
            </AuthGuard>
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>

      <footer className='py-10'></footer>
    </div>
  )
}
