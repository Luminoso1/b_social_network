import User from '@/api/user'
import { useQuery } from '@tanstack/react-query'

export const useProfile = (nick) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile', nick],
    queryFn: async () => await User.getProfile(nick)
  })

  return { data, isLoading, error }
}
