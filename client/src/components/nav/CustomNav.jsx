import { HomeIcon } from 'lucide-react'

import { Link } from 'wouter'
import { cn } from '@/lib/utils'
import PopUser from './PopUser'

export default function CustomNav({ className }) {
  return (
    <div className={cn('flex items-center gap-x-6', className)}>
      <Link to='/' className={(isActive) => (isActive ? 'text-red-700' : '')}>
        <HomeIcon />
      </Link>
      <PopUser />
    </div>
  )
}
