import { useState } from 'react'
import { Link } from 'wouter'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useAuth } from '@/context/auth'
import CustomForm from '../form/CustomForm'
import { Redirect } from 'wouter'
import { Loader2 } from 'lucide-react'
import CustomFormField from '../form/CustomFormField'

const loginSchema = z.object({
  username: z.string().min(3, 'min 3 characters'),
  password: z.string().min(3, 'min 3 characters')
})

export default function Login() {
  const { auth, login } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true)
      setError(null)
      await login(data)
    } catch (error) {
      setError(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  })

  if (auth) {
    return <Redirect to='/' />
  }

  return (
    <div className='max-w-md w-full mx-auto'>
      <div className='mb-6 bg-red-100/80  rounded-md text-sm font-medium'>
        {error && <p className='py-4 px-3'>{error}</p>}
      </div>
      <CustomForm methods={form} onSubmit={onSubmit}>
        <CustomFormField
          name='username'
          control={form.control}
          placeholder='example@label.dev'
        />
        <CustomFormField
          type='password'
          name='password'
          control={form.control}
          placeholder='example@label.dev'
        />
        <Button type='submit' className='py-6 w-full font-semibold relative'>
          {loading && <Loader2 className='absolute left-1/3 animate-spin' />}
          Submit
        </Button>
      </CustomForm>

      <div className='my-4'>
        <p>
          Does no have an account?
          <Link to='/register' className='ml-2 text-blue-600 underline'>
            Register here
          </Link>
        </p>
      </div>
      <Separator className='my-6 bg-gray-300/70' />
    </div>
  )
}
