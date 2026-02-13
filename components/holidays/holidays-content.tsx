"use client"

import React, { useState } from "react"
import { Plus, Calendar as CalendarIcon, Repeat, Pencil, Trash2, MapPin, Sparkles, Wrench, Clock, Palmtree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { holidays as allHolidays, labs } from "@/lib/mock-data"
import type { Holiday } from "@/lib/types"
import { HolidayFormDialog } from "./holiday-form-dialog"

const typeConfig: Record<string, { color: string; icon: any; label: string }> = {
  public: { color: "text-blue-600 border-blue-200 bg-blue-50", icon: CalendarIcon, label: "Public Holiday" },
  maintenance: { color: "text-amber-600 border-amber-200 bg-amber-50", icon: Wrench, label: "Maintenance" },
  special: { color: "text-foreground border-foreground/20 bg-foreground/5", icon: Sparkles, label: "Special Event" },
}

export function HolidaysContent() {
  const [holidaysList, setHolidaysList] = useState<Holiday[]>(allHolidays)
  const [formOpen, setFormOpen] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null)

  const handleCreate = (holiday: Holiday) => {
    setHolidaysList((prev) => [...prev, holiday])
    setFormOpen(false)
  }

  const handleUpdate = (updated: Holiday) => {
    setHolidaysList((prev) => prev.map((h) => (h.id === updated.id ? updated : h)))
    setEditingHoliday(null)
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    setHolidaysList((prev) => prev.filter((h) => h.id !== id))
  }

  const sortedHolidays = [...holidaysList].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  return (
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Holidays & Closures</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage lab closure dates and maintenance windows.
          </p>
        </div>
        <Button onClick={() => { setEditingHoliday(null); setFormOpen(true) }} className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Event
        </Button>
      </div>

      <div className="space-y-3 max-w-4xl">
        {sortedHolidays.map((holiday) => {
          const startDate = new Date(holiday.startDate + "T12:00:00")
          const endDate = new Date(holiday.endDate + "T12:00:00")
          const isSingleDay = holiday.startDate === holiday.endDate
          const affectedLabNames = holiday.affectedLabs.includes("all")
            ? "All Facilities"
            : holiday.affectedLabs.map((id) => labs.find((l) => l.id === id)?.name || id).join(", ")
          
          const config = typeConfig[holiday.type] || typeConfig.public

          return (
            <div key={holiday.id} className="group flex flex-col sm:flex-row bg-card rounded-lg border border-border hover:border-foreground/20 transition-colors overflow-hidden">
                {/* Date Stub */}
                <div className="flex-shrink-0 w-full sm:w-28 bg-muted/50 border-b sm:border-b-0 sm:border-r border-border flex flex-col items-center justify-center p-4 text-center">
                   <span className="text-[11px] text-muted-foreground uppercase">
                      {startDate.toLocaleDateString("en-US", { month: "short" })}
                   </span>
                   <span className="text-3xl font-semibold text-foreground leading-none mt-0.5">
                      {startDate.getDate()}
                   </span>
                   <span className="text-[11px] text-muted-foreground mt-1">
                      {startDate.toLocaleDateString("en-US", { weekday: "short" })}
                   </span>
                </div>

                <div className="flex-1 p-5 flex flex-col justify-center relative">
                  <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground" onClick={() => { setEditingHoliday(holiday); setFormOpen(true) }}>
                        <Pencil className="h-3.5 w-3.5" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-destructive" onClick={() => handleDelete(holiday.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                     </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className={`${config.color} text-[11px] font-medium px-1.5 py-0 rounded`}>
                        <config.icon className="mr-1 h-3 w-3" />
                        {config.label}
                    </Badge>
                    {holiday.recurring && (
                      <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0 rounded">
                        <Repeat className="mr-1 h-3 w-3" /> Yearly
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-sm font-medium text-foreground pr-16">{holiday.name}</h3>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {isSingleDay
                        ? "Full day"
                        : `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {affectedLabNames}
                    </span>
                  </div>
                  
                  {holiday.description && (
                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border leading-relaxed max-w-xl">{holiday.description}</p>
                  )}
                </div>
            </div>
          )
        })}
        {sortedHolidays.length === 0 && (
          <div className="py-16 text-center border border-dashed border-border rounded-lg">
             <CalendarIcon className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
             <p className="text-sm font-medium text-foreground">No events scheduled</p>
             <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">Add holidays or maintenance windows to block lab bookings.</p>
          </div>
        )}
      </div>

      <HolidayFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        holiday={editingHoliday}
        onSubmit={editingHoliday ? handleUpdate : handleCreate}
      />
    </div>
  )
}
