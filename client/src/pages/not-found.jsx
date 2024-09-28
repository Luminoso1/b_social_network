import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

function NotFound() {
  return (
    <div className='text-center'>
      <h2 className='text-7xl font-semibold'>404</h2>
      <p className='text-xl mt-2 mb-4'>Not Found page</p>
      <Button asChild className='bg-blue-400 hover:bg-blue-900'>
        <Link to='/'>Go Home</Link>
      </Button>
    </div>
  )
}

export default NotFound
