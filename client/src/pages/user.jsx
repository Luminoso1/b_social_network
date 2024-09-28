import { Route } from 'wouter'
import { Suspense } from 'react'
import { useProfile } from '@/services/profile'
import { ProfileNav } from '@/components/profile/ProfileNav'
import UserPosts from '@/components/profile/posts/user-posts'
import { Following } from '@/components/profile/follow/following'
import { Followers } from '@/components/profile/follow/followers'
import LoadingPage from '@/components/LoadingPage'
import Profile from '@/components/profile/Profile'
import { useParams } from 'wouter'

export const UserPage = () => {
  const { nick } = useParams()

  const { data } = useProfile(nick)

  console.log(data)

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

export default UserPage
