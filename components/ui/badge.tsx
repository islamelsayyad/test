
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border-2 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10',
        secondary:
          'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200',
        destructive:
          'border-transparent bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20',
        outline: 'text-slate-600 border-slate-200 bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
