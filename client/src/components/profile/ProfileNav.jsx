import { Link } from 'wouter'

export const ProfileNav = () => {
  return (
    <div className='relative'>
      <nav className='flex gap-x-4 text-center w-full'>
        <Link
          to='/posts'
          className={(isActive) =>
            isActive
              ? 'border-blue-600 border-b py-2 flex-auto'
              : 'py-2 flex-auto'
          }
        >
          Posts
        </Link>
        <Link
          to='/followers'
          className={(isActive) =>
            isActive
              ? 'border-blue-600 border-b py-2 flex-auto'
              : 'py-2 flex-auto'
          }
        >
          Followers
        </Link>
        <Link
          to='/following'
          className={(isActive) =>
            isActive
              ? 'border-blue-600 border-b py-2 flex-auto'
              : 'py-2 flex-auto'
          }
        >
          Following
        </Link>
      </nav>
    </div>
  )
}
