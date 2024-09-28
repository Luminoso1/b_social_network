export const Counter = ({ count }) => {
  return (
    <article className='flex justify-center gap-4 my-4 flex-col'>
      <div className='py-1.5 flex gap-x-2 items-center border pl-4 pr-6 rounded-md border-slate-500 text-sm'>
        <span className='bg-blue-600 text-white rounded-full size-6 grid place-content-center'>
          {count.posts}
        </span>
        Posts
      </div>
      <div className='py-1.5 flex gap-x-2 items-center border pl-4 pr-6 rounded-md border-slate-500 text-sm'>
        <span className='bg-blue-600 text-white rounded-full size-6 grid place-content-center'>
          {count.followers}
        </span>
        Followers
      </div>

      <div className='py-1.5 flex gap-x-2 items-center border pl-4 pr-6 rounded-md border-slate-500 text-sm'>
        <span className='bg-blue-600 text-white rounded-full size-6 grid place-content-center'>
          {count.following}
        </span>
        Following
      </div>
    </article>
  )
}
