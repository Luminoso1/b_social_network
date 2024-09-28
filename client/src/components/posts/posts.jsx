/* eslint-disable react/prop-types */
import PostArticle from '@/components/posts/Post'
import { Loader2 } from 'lucide-react'

export default function Posts({ data, loading, scrollRef }) {
  return (
    <section className='max-w-2xl mx-auto space-y-14'>
      {data?.map((post) => (
        <PostArticle key={post._id} post={post} />
      ))}
      <div ref={scrollRef}>
        {loading && <Loader2 className='animate-spin mx-auto' />}
        {!loading && data.length > 0 && <div>No more data</div>}
      </div>
    </section>
  )
}
