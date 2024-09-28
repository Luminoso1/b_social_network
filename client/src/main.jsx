import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/Auth.jsx'
import { Suspense, lazy } from 'react'
import LoadingPage from './components/LoadingPage.jsx'
import './index.css'
import { Toaster } from './components/ui/toaster.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const lazyWithDelay = (importFunc, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(importFunc())
    }, delay)
  })
}

const App = lazy(() => lazyWithDelay(() => import('./App.jsx'), 500))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 5, retryDelay: 1000, refetchOnWindowFocus: false }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Suspense fallback={<LoadingPage />}>
        <App />
      </Suspense>
      <Toaster position='top-right' richColors />
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
