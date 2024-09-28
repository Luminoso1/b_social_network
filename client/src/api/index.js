import { SERVER_URL } from '../constants/index'
import { toast } from 'sonner'

const setting = (method, body) => {
  const isFormData = body instanceof FormData

  return {
    method,
    headers: isFormData
      ? { Accept: 'application/json' } // Form Data
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json' //  JSON
        },
    credentials: 'include',
    body: isFormData ? body : JSON.stringify(body)
  }
}

export const fetchData = async (url, method, data) => {
  try {
    const res = await fetch(`${SERVER_URL}${url}`, setting(method, data))
    const body = await res.json()

    if (res.status === 401 && body.message === 'not authorized') {
      toast.error('Your session has expired. Please log in again.', {
        className: 'py-4 px-2'
      })
      localStorage.removeItem('user')
      setTimeout(() => {
        window.location.replace('/login')
      }, 2000)
      return
    }
    if (!res.ok) {
      throw new Error(body.message)
    }

    return body
  } catch (error) {
    console.error(`Error in API: ${error.message}`)
    // don't forget throw the error
    throw error
  }
}
