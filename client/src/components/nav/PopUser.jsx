import { Link } from 'wouter'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { User } from 'lucide-react'
import { Settings } from 'lucide-react'
import { useAuth } from '@/context/auth'

export default function PopUser() {
  const { auth, logout } = useAuth()
  const { name, image } = auth
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className='size-14' with={44}>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>LM</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='max-w-44'>
        <nav className='flex flex-col gap-y-7 py-2'>
          <Link to='/me/posts' className='flex items-center gap-x-4'>
            <User />
            Profile
          </Link>
          <Link to='/settings' className='flex items-center gap-x-4'>
            <Settings />
            Settings
          </Link>
          <Separator />
          <Button onClick={logout} className='flex items-center gap-x-4'>
            Logout
          </Button>
        </nav>
      </PopoverContent>
    </Popover>
  )
}
