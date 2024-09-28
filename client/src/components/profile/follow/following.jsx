import Follow from '@/api/follow'
import { useAuth } from '@/context/auth'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { UnFollowButton } from './button'

export const Following = ({ nick }) => {
  const { auth } = useAuth()

  const isCurrent = nick === auth.nick

  const { data, isLoading, error } = useQuery({
    queryKey: ['following'],
    queryFn: async () => await Follow.getFollowing(nick)
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error {error.message}</div>
  }

  return (
    <section className='mt-10 space-y-6'>
      {data?.data.length === 0 && (
        <div className='text-center'>
          <p>You are not following any user yet</p>
        </div>
      )}
      {data.data.map(({ _id, name, image, nick }) => (
        <div key={_id} className='flex justify-between px-20'>
          <Link
            to={`/user/${nick}/posts`}
            className='flex items-center gap-x-2'
          >
            <img src={image} alt={name} className='size-16 rounded-full' />
            <h3>{name}</h3>
          </Link>

          {isCurrent && <UnFollowButton nick={nick} id={_id} />}
        </div>
      ))}
    </section>
  )
}
