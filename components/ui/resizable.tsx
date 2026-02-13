
'use client'

import * as React from 'react'
import { GripVertical } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

import { cn } from '@/lib/utils'

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className,
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-2 items-center justify-center bg-transparent transition-all hover:w-4 group',
      className,
    )}
    {...props}
  >
    <div className="h-full w-px bg-slate-200 group-hover:bg-indigo-400 transition-colors" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-8 w-4 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm transition-all group-hover:border-indigo-300 group-hover:shadow-md">
      <div className="h-4 w-1 rounded-full bg-slate-300 group-hover:bg-indigo-400" />
    </div>
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
