/* eslint-disable react/prop-types */
import { Link } from 'wouter'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { formatDate } from '@/lib/utils'

export default function PostArticle({ post }) {
  return (
    <article className='bg-[#e1e3e5] px-5 py-4 rounded-sm'>
      <header className='flex justify-between items-center'>
        <Link to={`/user/${post?.user?.nick}/posts`}>
          <div className='flex items-center gap-x-1 '>
            <Avatar className='size-16 cursor-pointer'>
              <AvatarImage src={post?.user?.image} alt={post?.user?.name} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <h3 className='text-black/80 text-lg cursor-pointer capitalize'>
              {post?.user?.name}
            </h3>
          </div>
        </Link>
        <span className='text-black/50'>{formatDate(post?.created_at)}</span>
      </header>
      <Separator className='bg-black/20 my-2' />
      <div className='text-black/80  my-3'>
        <p>{post?.text}</p>
      </div>
      {post?.file && (
        <footer className=' rounded '>
          <img src={post?.file} alt='post file' className='rounded-sm' />
        </footer>
      )}
    </article>
  )
}
