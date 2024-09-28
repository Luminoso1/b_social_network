import Follow from '@/api/follow'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const UnFollowButton = ({ id }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id) => await Follow.unFollow(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries(['following'])

      const previousData = queryClient.getQueriesData(['following'])

      console.log(previousData)

      if (previousData?.data) {
        queryClient.setQueryData(['following'], (previous) => ({
          ...previous,
          data: previous.data.filter((follower) => follower._id !== id)
        }))
      }

      return { previousData }
    },
    onError: (error, newdata, context) => {
      console.error('Error:', error)
      console.error('Context:', context)
      queryClient.setQueryData(['following'], context.previousData)
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
        title: 'Unfollowed successfully!',
        className: 'bg-green-200'
      })
      queryClient.invalidateQueries({ queryKey: ['following'] })
    }
  })

  const handleUnfollow = () => {
    console.log('holla')
    mutation.mutate(id)
  }
  return <Button onClick={handleUnfollow}>Follow</Button>
}
