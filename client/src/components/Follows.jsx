import Follow from '@/api/follow'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'wouter'
import { Link } from 'wouter'

export default function Follows() {
  const router = useRouter()
  const [data, setData] = useState([])

  const getFollows = async () => {
    const res = await Follow.getFollow(router.base)
    console.log(res)
    setData(res.data)
    console.log('FOLLOW', res.data)
  }

  const query = useMutation({
    queryKey: ['follows']
  })

  useEffect(() => {
    getFollows()
  }, [router.base])

  // const follow = async (id) => {
  //   try {
  //     let updatedfollowers = data.count.followers
  //     if (data.followInfo.iFollow) {
  //       await Follow.unFollow(id)
  //       updatedfollowers -= 1
  //     } else {
  //       await Follow.follow({ id: id })
  //       updatedfollowers += 1
  //     }
  //     setData((prev) => ({
  //       ...prev,
  //       followInfo: {
  //         ...prev.followInfo,
  //         iFollow: !prev.followInfo.iFollow
  //       },
  //       count: {
  //         ...prev.count,
  //         followers: updatedfollowers
  //       }
  //     }))
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <section className='mt-10 space-y-6'>
      {data.map(({ _id, name, image, nick }) => (
        <div key={_id} className='flex justify-between px-20'>
          <Link
            to={`/user/${nick}/posts`}
            className='flex items-center gap-x-2'
          >
            <img src={image} alt={name} className='size-16 rounded-full' />
            <h3>{name}</h3>
          </Link>
          {/* <Button>Unfollow</Button> */}
        </div>
      ))}
    </section>
  )
}
