import Follow from '@/api/follow'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Link } from 'wouter'

export const Followers = ({ nick }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followers'],
    queryFn: async () => await Follow.getFollowers(nick)
  })

  if (isLoading) {
    return <Loader2 className='animate-spin' />
  }

  if (error) {
    return <div>Error {error.message}</div>
  }

  return (
    <section className='mt-10 space-y-6'>
      {data?.data?.length === 0 && (
        <div className='text-center'>
          <p>You have no followers yet</p>
        </div>
      )}
      {data?.data?.map(({ _id, name, image, nick }) => (
        <div key={_id} className='flex justify-between px-20'>
          <Link
            to={`/user/${nick}/posts`}
            className='flex items-center gap-x-2'
          >
            <img src={image} alt={name} className='size-16 rounded-full' />
            <h3>{name}</h3>
          </Link>
        </div>
      ))}
    </section>
  )
}
