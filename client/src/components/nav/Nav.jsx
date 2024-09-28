import { Link } from 'wouter'
import { useAuth } from '@/context/auth'
import Search from './Search'
import CustomNav from './CustomNav'
import { Button } from '../ui/button'

export default function Nav() {
  const { auth } = useAuth()

  return (
    <div className='h-28 py-4 max-w-2xl bg-[#f5f5f5]/30 backdrop-blur-xl mx-auto grid items-center fixed top-0 left-0 right-0 z-20 px-4'>
      <nav>
        {auth && (
          <>
            <div className='flex justify-end gap-x-12'>
              <Search />
              <>
                <div className='hidden sm:flex items-center gap-x-10'>
                  <CustomNav />
                </div>
              </>
            </div>

            <div className='block sm:hidden bg-red-100 fixed left-0 right-0  bottom-0 z-10'>
              <CustomNav className='justify-around bg-white shadow-2xl shadow-primary' />
            </div>
          </>
        )}

        {!auth && (
          <div className='space-x-4 flex justify-end'>
            <Button asChild className='px-10 border-slate-400' variant='link'>
              <Link to='/login'>Login</Link>
            </Button>
            <Button asChild className='px-10'>
              <Link to='/register'>Register</Link>
            </Button>
          </div>
        )}
      </nav>
    </div>
  )
}
