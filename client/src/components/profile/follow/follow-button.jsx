import Follow from '@/api/follow'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const FollowButton = ({ id, follow }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id) => {
      return follow ? await Follow.unFollow(id) : await Follow.follow(id)
    },
    onSuccess: () => {
      const action = follow ? 'Unfollowed' : 'Followed'
      toast({
        title: `${action} successfully!`,
        className: 'bg-green-200'
      })
      queryClient.invalidateQueries({ queryKey: ['followers'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      toast({
        title: 'Error!',
        description: error.message,
        className: 'bg-red-200'
      })
    }
  })

  const handleFollow = () => {
    mutation.mutate(id)
  }
  return (
    <Button onClick={handleFollow}>
      {follow === true ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
