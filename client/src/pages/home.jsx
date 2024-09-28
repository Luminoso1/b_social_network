import Post from '@/api/post'
import { useToast } from '@/hooks/use-toast'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { postSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Posts from '../components/posts/posts'
import NewPost from '@/components/posts/NewPost'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/auth'

export default function Home() {
  const { toast } = useToast()
  const { auth } = useAuth()
  const queryClient = useQueryClient()
  const { items, isLoading, isFetchingNextPage, error, scrollRef } =
    useInfiniteScroll({
      key: ['posts'],
      fn: (pageParam) => Post.getAll(pageParam)
    })

  // to create new post
  const mutation = useMutation({
    mutationFn: async (newPost) => await Post.create(newPost),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(['posts'])

      // cached data
      const previousData = queryClient.getQueriesData(['posts'])

      const optimisticData = {
        _id: Math.random().toString(36).substring(2, 9),
        text: newPost.get('text'),
        file: newPost.get('file')
          ? URL.createObjectURL(newPost.get('file'))
          : null,
        createdAt: new Date().toISOString(),
        user: {
          _id: '66d26d467c663a9e52137587',
          image: auth.image,
          last_name: auth.last_name,
          name: auth.name,
          nick: auth.nick
        }
      }
      queryClient.setQueryData(['posts'], (previous) => ({
        ...previous,
        pages: previous.pages.map((page, index) =>
          index === 0
            ? { ...page, posts: [optimisticData, ...page.posts] }
            : page
        )
      }))

      return { previousData }
    },
    onError: (error, newPost, context) => {
      queryClient.setQueryData(['posts'], context.previousData)
      toast({
        title: 'Oops!',
        description: (
          <pre className='mt-2  rounded-md bg-slate-950 p-4'>
            <code className='text-white text-wrap'>{error.message}</code>
          </pre>
        ),
        className: 'bg-red-200'
      })
    },
    onSuccess: () => {
      toast({
        title: 'Post created!',
        description: 'Your post was successfully submitted.',
        className: 'bg-green-400 w-92'
      })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const form = useForm({
    resolver: zodResolver(postSchema)
  })

  const onSubmit = form.handleSubmit(async (data) => {
    // to send files need a form data and append the file
    const formData = new FormData()

    if (data.file?.length) {
      formData.append('file', data.file[0])
    }

    formData.append('text', data.text)

    try {
      await mutation.mutateAsync(formData)
    } catch (error) {
      console.error(error)
    }
  })

  if (error) {
    return <div>Error al cargar los posts</div>
  }
  return (
    <div className='max-w-2xl mx-auto'>
      <div className='sticky top-28 z-20 bg-[#f5f5f5]/30 backdrop-blur-xl'>
        <NewPost form={form} onSubmit={onSubmit} />
      </div>

      <Posts
        data={items}
        loading={isLoading || isFetchingNextPage}
        scrollRef={scrollRef}
      />
    </div>
  )
}
