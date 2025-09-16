import { Button as HeadlessButton } from '@headlessui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/src/lib/utils'

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-dark text-soft-white hover:bg-gray-800 focus:ring-primary-dark',
        secondary: 'bg-secondary-dark text-soft-white hover:bg-gray-800 focus:ring-gray-400',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <HeadlessButton
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
