import { useState } from 'react'
import { Link } from 'wouter'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import User from '../../api/user'
import CustomForm from '../form/CustomForm'
import { registerSchema } from '@/lib/schemas'
import CustomFormField from '../form/CustomFormField'

export default function Register() {
  const [error, setError] = useState()
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      lastName: '',
      nick: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data)
    try {
      const response = await User.register(data)
      if (!response.ok) {
        setError(response.message)
      }
      console.log(response)
    } catch (err) {
      console.error('An error occurred:', err)
    }
  })
  return (
    <div className='max-w-lg w-full mx-auto'>
      <CustomForm methods={form} onSubmit={onSubmit}>
        <div className='grid md:grid-cols-2 gap-x-2 gap-y-4'>
          <CustomFormField
            control={form.control}
            name='name'
            placeholder='juanito'
          />
          <CustomFormField
            control={form.control}
            name='lastName'
            placeholder='alimaña'
          />
          <CustomFormField
            control={form.control}
            name='nick'
            placeholder='juanito'
          />
          <CustomFormField
            type='email'
            control={form.control}
            name='email'
            placeholder='juanito@example.dev'
          />
          <CustomFormField
            type='password'
            control={form.control}
            name='password'
            placeholder='************'
          />
          <div className='grid items-end'>
            <Button type='submit' className='py-6 w-full font-semibold '>
              Submit
            </Button>
          </div>
        </div>
      </CustomForm>
      <div className='my-4'>
        <p>
          Already have an account?
          <Link to='/login' className='ml-2 text-blue-600 underline'>
            Login here
          </Link>
        </p>
      </div>
      <Separator className='my-10 bg-gray-300/60' />
      {/* <div className='flex gap-x-5'>
        <Button className='text-xs bg-black/55 font-semibold py-6 px-10 w-full flex items-center gap-x-4 mb-4'>
          <GoogleIcon stroke='#fff' />
          Login with Google
        </Button>
        <Button className='text-xs bg-black/55 font-semibold py-6 px-10 w-full flex items-center gap-x-4 mb-4'>
          <GithubIcon />
          Login with Github
        </Button>
      </div> */}
      <div className='errors'>{error && <p>{error}</p>}</div>
    </div>
  )
}
