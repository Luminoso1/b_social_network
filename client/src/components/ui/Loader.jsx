import { cn } from "@/lib/utils"

export const LoadingSpinner = ({ className }) => {
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='52'
    height='52'
    viewBox='0 0 24 24'
    fill='red'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('animate-spin', className)}
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
}
