
'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-[2rem] group-[.toaster]:p-6 group-[.toaster]:items-start',
          description: 'group-[.toast]:text-slate-500 group-[.toast]:font-medium group-[.toast]:text-xs group-[.toast]:mt-1',
          actionButton:
            'group-[.toast]:bg-slate-900 group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-bold group-[.toast]:text-xs',
          cancelButton:
            'group-[.toast]:bg-slate-100 group-[.toast]:text-slate-600 group-[.toast]:rounded-xl group-[.toast]:font-bold group-[.toast]:text-xs group-[.toast]:border-2 group-[.toast]:border-slate-200',
          title: 'group-[.toast]:text-sm group-[.toast]:font-black group-[.toast]:text-slate-900',
          error: 'group-[.toast]:text-rose-600 group-[.toast]:border-rose-100',
          success: 'group-[.toast]:text-emerald-600 group-[.toast]:border-emerald-100',
          warning: 'group-[.toast]:text-amber-600 group-[.toast]:border-amber-100',
          info: 'group-[.toast]:text-blue-600 group-[.toast]:border-blue-100',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
