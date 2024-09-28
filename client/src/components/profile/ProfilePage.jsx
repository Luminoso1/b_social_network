import { Suspense } from 'react'
import { ProfileNav } from './ProfileNav'
import LoadingPage from '../LoadingPage'
import Profile from './Profile'
import { useProfile } from '@/services/profile'
import { useParams } from 'wouter'
import { Route } from 'wouter'
import UserPosts from './posts/user-posts'
import { Following } from './follow/following'
import { Followers } from './follow/followers'

export const ProfilePage = () => {
  const { nick } = useParams()

  const { data } = useProfile(nick)

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 relative'>
      <Suspense fallback={<LoadingPage />}>
        <div className='text-center w-full mx-auto col-span-3 relative'>
          <Profile data={data} />
        </div>
      </Suspense>
      <div className='flex flex-col flex-auto col-span-9'>
        <ProfileNav />
        <>
          <Route path='/posts' nest>
            <UserPosts nick={nick} />
          </Route>

          <Route path='/following' nest>
            <Following nick={nick} />
          </Route>

          <Route path='/followers' nest>
            <Followers nick={nick} />
          </Route>
        </>
      </div>
    </div>
  )
}
