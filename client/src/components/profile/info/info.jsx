import { formatDate } from '@/lib/utils'

export const UserInfo = ({ profile }) => {
  return (
    <article>
      <div className='size-40 mx-auto'>
        <img
          src={profile.image}
          alt='user avatar'
          className='w-full rounded-full'
        />
      </div>
      <h1 className='text-2xl capitalize'>
        {profile.name} {profile.last_name}
        <span className='block text-lg text-blue-600 underline'>
          @{profile.nick}
        </span>
      </h1>
      <h5 className='my-2 capitalize text-slate-500'>
        join {formatDate(profile.created_at)}
      </h5>
    </article>
  )
}
