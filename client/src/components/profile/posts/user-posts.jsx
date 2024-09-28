import Post from '@/api/post'
import { Loader2 } from 'lucide-react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import PostArticle from '@/components/posts/Post'

const UserPosts = ({ nick }) => {
  const { items, isLoading, isFetchingNextPage, error, scrollRef } =
    useInfiniteScroll({
      key: ['user-posts', nick],
      fn: (pageParam) => Post.getPostByNick(nick, pageParam),
      params: [nick]
    })

  if (isLoading && !isFetchingNextPage) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading posts. {error.message}</div>
  }

  return (
    <section className='max-w-md mx-auto mt-10 space-y-14'>
      <div className='space-y-10'>
        {items?.map((post) => (
          <PostArticle key={post._id} post={post} />
        ))}
      </div>
      <div ref={scrollRef}>
        {isLoading && <Loader2 className='animate-spin mx-auto' />}
        {!isLoading && items.length > 0 && <div>No more data</div>}
      </div>
    </section>
  )
}

export default UserPosts
