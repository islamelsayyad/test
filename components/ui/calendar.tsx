
'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-6 bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm inline-block', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center mb-4',
        caption_label: 'text-sm font-black text-slate-900',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-10 w-10 bg-slate-50 p-0 text-slate-500 hover:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-xl border-2 border-slate-200 shadow-sm transition-all hover:scale-105'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-slate-400 rounded-xl w-10 font-black text-[0.7rem] uppercase tracking-widest',
        row: 'flex w-full mt-2 gap-1',
        cell: 'h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-xl [&:has([aria-selected].day-outside)]:bg-indigo-50/50 [&:has([aria-selected])]:bg-indigo-50 first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 p-0 font-bold aria-selected:opacity-100 rounded-xl hover:bg-slate-100 hover:text-slate-900 text-slate-600 transition-all hover:scale-110 border-2 border-transparent'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-700 hover:text-white shadow-lg shadow-indigo-200 scale-105 font-black border-indigo-600',
        day_today: 'bg-slate-100 text-slate-900 font-black border-slate-200',
        day_outside:
          'day-outside text-slate-300 aria-selected:bg-indigo-50/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-indigo-50 aria-selected:text-indigo-900',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
