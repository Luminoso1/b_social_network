/* eslint-disable react/prop-types */
import { UserInfo } from './info/info'
import { Counter } from './info/counter'
import { useAuth } from '@/context/auth'
import { FollowButton } from './follow/follow-button'
import { EditProfile } from './edit/edit-profile'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userUpdateSchema } from '@/lib/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import User from '@/api/user'
import { useToast } from '@/hooks/use-toast'

const Profile = ({ data }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { auth } = useAuth()
  const isCurrent = auth.nick === data?.profile?.nick
  const iFollow = data?.followInfo?.iFollow

  const form = useForm({
    resolver: zodResolver(userUpdateSchema)
  })

  const mutation = useMutation({
    mutationFn: async (newData) => await User.update(newData),
    onSuccess: () => {
      toast({
        title: 'Profile successfully updated!',
        className: 'bg-green-200'
      })
      queryClient.invalidateQueries({ queryKey: ['profile', auth.nick] })
    }
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      console.log(data)
      mutation.mutate(data)
    } catch (error) {
      console.log(error)
    }
  })

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <section className='mx-2 rounded-md shadow-md p-4  relative'>
      {isCurrent && <EditProfile form={form} onSubmit={onSubmit} />}

      <UserInfo profile={data.profile} />
      <Counter count={data.count} />

      {!isCurrent && <FollowButton id={data?.profile?._id} follow={iFollow} />}
    </section>
  )
}

export default Profile
